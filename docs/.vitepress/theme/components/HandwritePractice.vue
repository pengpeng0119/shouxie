<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { handwriteQuestions, questionCategories } from "../data/handwriteQuestions";

const STORAGE_PREFIX = "handwrite-practice:";
const RUN_TIMEOUT = 4000;

const difficultyLabelMap = {
  easy: "基础",
  medium: "中等",
  hard: "困难",
};

const selectedCategory = ref(questionCategories[0]?.key || "function");
const selectedQuestionId = ref("");
const code = ref("");
const editorReady = ref(false);
const running = ref(false);
const showSolution = ref(false);
const runResult = ref({
  error: "",
  logs: [],
  results: [],
  duration: 0,
});
const editorHost = ref(null);

let editorView = null;
let suppressEditorSync = false;

const questionsByCategory = computed(() =>
  questionCategories.map((category) => ({
    ...category,
    count: handwriteQuestions.filter((item) => item.category === category.key).length,
  })),
);

const filteredQuestions = computed(() =>
  handwriteQuestions.filter((item) => item.category === selectedCategory.value),
);

const currentQuestion = computed(
  () => handwriteQuestions.find((item) => item.id === selectedQuestionId.value) || filteredQuestions.value[0],
);

const currentQuestionIndex = computed(() =>
  currentQuestion.value
    ? handwriteQuestions.findIndex((item) => item.id === currentQuestion.value.id)
    : -1,
);

const currentQuestionProgress = computed(() =>
  currentQuestionIndex.value >= 0 ? `${currentQuestionIndex.value + 1}/${handwriteQuestions.length}` : "",
);

const hasPrevQuestion = computed(() => currentQuestionIndex.value > 0);

const hasNextQuestion = computed(
  () => currentQuestionIndex.value >= 0 && currentQuestionIndex.value < handwriteQuestions.length - 1,
);

const descriptionBlocks = computed(() =>
  (currentQuestion.value?.description || "")
    .split(/\n\s*\n/g)
    .map((item) => item.trim())
    .filter(Boolean),
);

const passCount = computed(
  () => runResult.value.results.filter((item) => item.status === "passed").length,
);

function getStorageKey(id) {
  return `${STORAGE_PREFIX}${id}`;
}

function loadSavedCode(question) {
  if (typeof window === "undefined" || !question) {
    return question?.starterCode || "";
  }
  return window.localStorage.getItem(getStorageKey(question.id)) || question.starterCode;
}

function saveCurrentCode(questionId, value) {
  if (typeof window === "undefined" || !questionId) {
    return;
  }
  window.localStorage.setItem(getStorageKey(questionId), value);
}

function setRunResult(payload = {}) {
  runResult.value = {
    error: payload.error || "",
    logs: payload.logs || [],
    results: payload.results || [],
    duration: payload.duration || 0,
  };
}

function syncEditorContent(nextCode) {
  if (!editorView) {
    return;
  }
  const current = editorView.state.doc.toString();
  if (current === nextCode) {
    return;
  }
  suppressEditorSync = true;
  editorView.dispatch({
    changes: {
      from: 0,
      to: editorView.state.doc.length,
      insert: nextCode,
    },
  });
  suppressEditorSync = false;
}

async function initEditor() {
  if (!editorHost.value || editorView) {
    return;
  }

  const [{ EditorView, basicSetup }, { javascript }, { oneDark }] = await Promise.all([
    import("codemirror"),
    import("@codemirror/lang-javascript"),
    import("@codemirror/theme-one-dark"),
  ]);

  const updateListener = EditorView.updateListener.of((update) => {
    if (!update.docChanged || suppressEditorSync) {
      return;
    }
    code.value = update.state.doc.toString();
  });

  editorView = new EditorView({
    doc: code.value,
    parent: editorHost.value,
    extensions: [
      basicSetup,
      javascript(),
      oneDark,
      EditorView.lineWrapping,
      updateListener,
      EditorView.theme({
        "&": {
          minHeight: "420px",
          fontSize: "14px",
        },
        ".cm-scroller": {
          overflow: "auto",
          fontFamily:
            '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
        },
      }),
    ],
  });

  editorReady.value = true;
}

function useQuestion(question) {
  if (!question) {
    return;
  }
  selectedQuestionId.value = question.id;
  code.value = loadSavedCode(question);
  showSolution.value = false;
  setRunResult();
  nextTick(() => syncEditorContent(code.value));
}

function switchCategory(categoryKey) {
  if (categoryKey === selectedCategory.value) {
    return;
  }
  selectedCategory.value = categoryKey;
  useQuestion(
    handwriteQuestions.find((item) => item.category === categoryKey) || filteredQuestions.value[0],
  );
}

function goToQuestion(targetQuestion) {
  if (!targetQuestion) {
    return;
  }
  selectedCategory.value = targetQuestion.category;
  useQuestion(targetQuestion);
}

function goToSiblingQuestion(offset) {
  if (currentQuestionIndex.value < 0) {
    return;
  }
  const targetQuestion = handwriteQuestions[currentQuestionIndex.value + offset];
  goToQuestion(targetQuestion);
}

function resetCode() {
  if (!currentQuestion.value) {
    return;
  }
  code.value = currentQuestion.value.starterCode;
  saveCurrentCode(currentQuestion.value.id, code.value);
  syncEditorContent(code.value);
  setRunResult();
}

function fillSolution() {
  if (!currentQuestion.value) {
    return;
  }
  code.value = currentQuestion.value.solution;
  saveCurrentCode(currentQuestion.value.id, code.value);
  syncEditorContent(code.value);
  showSolution.value = true;
}

function createRunnerWorker() {
  const workerCode = `
    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

    function formatValue(value) {
      if (typeof value === "string") return value;
      try {
        return JSON.stringify(value);
      } catch (error) {
        return String(value);
      }
    }

    function deepEqual(a, b) {
      if (Object.is(a, b)) return true;
      if (typeof a !== typeof b) return false;
      if (typeof a !== "object" || a === null || b === null) return false;
      if (Array.isArray(a) !== Array.isArray(b)) return false;
      if (Array.isArray(a)) {
        if (a.length !== b.length) return false;
        return a.every((item, index) => deepEqual(item, b[index]));
      }
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);
      if (aKeys.length !== bKeys.length) return false;
      return aKeys.every((key) => deepEqual(a[key], b[key]));
    }

    function assert(condition, message) {
      if (!condition) {
        throw new Error(message || "断言失败");
      }
    }

    function assertEqual(actual, expected, message) {
      if (!Object.is(actual, expected)) {
        throw new Error(message || "期望 " + formatValue(expected) + "，实际得到 " + formatValue(actual));
      }
    }

    function assertDeepEqual(actual, expected, message) {
      if (!deepEqual(actual, expected)) {
        throw new Error(message || "深比较失败");
      }
    }

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    self.onmessage = async (event) => {
      const { code, testCases } = event.data;
      const logs = [];
      const mockConsole = {
        log: (...args) => logs.push({ type: "log", text: args.map(formatValue).join(" ") }),
        info: (...args) => logs.push({ type: "info", text: args.map(formatValue).join(" ") }),
        warn: (...args) => logs.push({ type: "warn", text: args.map(formatValue).join(" ") }),
        error: (...args) => logs.push({ type: "error", text: args.map(formatValue).join(" ") }),
      };

      const results = [];
      const startedAt = Date.now();

      try {
        for (const testCase of testCases) {
          try {
            const runner = new AsyncFunction(
              "console",
              "assert",
              "assertEqual",
              "assertDeepEqual",
              "sleep",
              code + "\\n" + testCase.code,
            );
            await runner(mockConsole, assert, assertEqual, assertDeepEqual, sleep);
            results.push({ name: testCase.name, status: "passed" });
          } catch (error) {
            results.push({
              name: testCase.name,
              status: "failed",
              error: error instanceof Error ? error.message : String(error),
            });
          }
        }

        self.postMessage({
          logs,
          results,
          error: "",
          duration: Date.now() - startedAt,
        });
      } catch (error) {
        self.postMessage({
          logs,
          results,
          error: error instanceof Error ? error.message : String(error),
          duration: Date.now() - startedAt,
        });
      }
    };
  `;

  const blob = new Blob([workerCode], { type: "text/javascript" });
  return new Worker(URL.createObjectURL(blob));
}

async function runTests() {
  if (!currentQuestion.value || running.value) {
    return;
  }

  running.value = true;
  showSolution.value = false;
  saveCurrentCode(currentQuestion.value.id, code.value);

  const worker = createRunnerWorker();

  try {
    const result = await new Promise((resolve) => {
      const timeoutId = window.setTimeout(() => {
        worker.terminate();
        resolve({
          error: `执行超时，已在 ${RUN_TIMEOUT / 1000} 秒后中止`,
          logs: [],
          results: [],
          duration: RUN_TIMEOUT,
        });
      }, RUN_TIMEOUT);

      worker.onmessage = (event) => {
        window.clearTimeout(timeoutId);
        worker.terminate();
        resolve(event.data);
      };

      worker.onerror = (event) => {
        window.clearTimeout(timeoutId);
        worker.terminate();
        resolve({
          error: event.message || "运行时发生未知错误",
          logs: [],
          results: [],
          duration: 0,
        });
      };

      worker.postMessage({
        code: code.value,
        testCases: currentQuestion.value.testCases,
      });
    });

    setRunResult(result);
  } finally {
    running.value = false;
  }
}

watch(
  () => selectedQuestionId.value,
  (questionId) => {
    const question = handwriteQuestions.find((item) => item.id === questionId);
    if (!question) {
      return;
    }
    code.value = loadSavedCode(question);
    showSolution.value = false;
    setRunResult();
    nextTick(() => syncEditorContent(code.value));
  },
);

watch(
  () => code.value,
  (value) => {
    if (currentQuestion.value) {
      saveCurrentCode(currentQuestion.value.id, value);
    }
  },
);

onMounted(async () => {
  useQuestion(filteredQuestions.value[0]);
  await nextTick();
  await initEditor();
});

onBeforeUnmount(() => {
  if (editorView) {
    editorView.destroy();
    editorView = null;
  }
});
</script>

<template>
  <div class="handwrite-practice">
    <div class="handwrite-practice__header">
      <div>
        <p class="handwrite-practice__eyebrow">前端手写题在线练习</p>
        <h1 class="handwrite-practice__title">边写边跑，直接验证实现是否完整</h1>
        <p class="handwrite-practice__intro">
          当前已接入 {{ handwriteQuestions.length }} 道题，题干来自现有文档，代码会自动保存在本地浏览器。
        </p>
      </div>
      <div class="handwrite-practice__summary">
        <span>当前分类 {{ filteredQuestions.length }} 题</span>
        <span v-if="runResult.results.length">最近一次通过 {{ passCount }}/{{ runResult.results.length }}</span>
      </div>
    </div>

    <div class="handwrite-practice__categories">
      <button
        v-for="category in questionsByCategory"
        :key="category.key"
        class="handwrite-practice__tab"
        :class="{ 'is-active': category.key === selectedCategory }"
        @click="switchCategory(category.key)"
      >
        {{ category.label }}
        <span>{{ category.count }}</span>
      </button>
    </div>

    <div class="handwrite-practice__toolbar">
      <label class="handwrite-practice__field">
        <span>选择题目</span>
        <select id="handwrite-question-select" name="handwrite-question-select" v-model="selectedQuestionId">
          <option
            v-for="question in filteredQuestions"
            :key="question.id"
            :value="question.id"
          >
            {{ question.order }}. {{ question.title }}
          </option>
        </select>
      </label>

      <div class="handwrite-practice__meta" v-if="currentQuestion">
        <span class="handwrite-practice__badge">{{ questionCategories.find((item) => item.key === currentQuestion.category)?.label }}</span>
        <span class="handwrite-practice__badge" :class="`is-${currentQuestion.difficulty}`">
          {{ difficultyLabelMap[currentQuestion.difficulty] }}
        </span>
      </div>
    </div>

    <div class="handwrite-practice__content">
      <section class="handwrite-practice__panel handwrite-practice__panel--question" v-if="currentQuestion">
        <div class="handwrite-practice__panel-header">
          <div>
            <p class="handwrite-practice__order">第 {{ currentQuestion.order }} 题</p>
            <h2>{{ currentQuestion.title }}</h2>
          </div>
        </div>

        <div class="handwrite-practice__description">
          <p
            v-for="(block, index) in descriptionBlocks"
            :key="`${currentQuestion.id}-block-${index}`"
            class="handwrite-practice__description-block"
          >
            {{ block }}
          </p>
        </div>

        <div class="handwrite-practice__tests">
          <h3>测试点</h3>
          <ul>
            <li v-for="testCase in currentQuestion.testCases" :key="testCase.name">
              {{ testCase.name }}
            </li>
          </ul>
        </div>
      </section>

      <section class="handwrite-practice__panel handwrite-practice__panel--editor">
        <div class="handwrite-practice__panel-header">
          <div>
            <h2>代码编辑区</h2>
            <p>支持 JavaScript 语法高亮，运行前会自动保存当前代码。</p>
          </div>
          <div class="handwrite-practice__header-tools">
            <div class="handwrite-practice__question-nav">
              <button
                class="handwrite-practice__button is-secondary"
                :disabled="!hasPrevQuestion"
                @click="goToSiblingQuestion(-1)"
              >
                上一题
              </button>
              <span class="handwrite-practice__progress" v-if="currentQuestionProgress">
                {{ currentQuestionProgress }}
              </span>
              <button
                class="handwrite-practice__button is-secondary"
                :disabled="!hasNextQuestion"
                @click="goToSiblingQuestion(1)"
              >
                下一题
              </button>
            </div>
            <div class="handwrite-practice__actions">
            <button class="handwrite-practice__button is-secondary" @click="resetCode">重置代码</button>
            <button class="handwrite-practice__button is-secondary" @click="showSolution = !showSolution">
              {{ showSolution ? "隐藏答案" : "查看答案" }}
            </button>
            <button class="handwrite-practice__button is-secondary" @click="fillSolution">填入答案</button>
            <button class="handwrite-practice__button is-primary" :disabled="running" @click="runTests">
              {{ running ? "运行中..." : "运行测试" }}
            </button>
            </div>
          </div>
        </div>

        <div class="handwrite-practice__editor-shell">
          <div ref="editorHost" class="handwrite-practice__editor" />
          <textarea
            v-if="!editorReady"
            v-model="code"
            id="handwrite-editor-fallback"
            name="handwrite-editor-fallback"
            class="handwrite-practice__textarea"
            spellcheck="false"
          />
        </div>

        <div v-if="showSolution && currentQuestion" class="handwrite-practice__solution">
          <div class="handwrite-practice__solution-header">
            <h3>参考答案</h3>
            <span>来自原始文档中的核心实现，已自动去掉示例代码</span>
          </div>
          <pre><code>{{ currentQuestion.solution }}</code></pre>
        </div>

        <div class="handwrite-practice__result-grid">
          <div class="handwrite-practice__result-panel">
            <div class="handwrite-practice__result-header">
              <h3>测试结果</h3>
              <span v-if="runResult.duration">耗时 {{ runResult.duration }} ms</span>
            </div>
            <p v-if="runResult.error" class="handwrite-practice__runtime-error">
              {{ runResult.error }}
            </p>
            <ul v-if="runResult.results.length" class="handwrite-practice__result-list">
              <li
                v-for="result in runResult.results"
                :key="result.name"
                class="handwrite-practice__result-item"
                :class="`is-${result.status}`"
              >
                <span>{{ result.name }}</span>
                <span>{{ result.status === "passed" ? "通过" : "失败" }}</span>
                <p v-if="result.error">{{ result.error }}</p>
              </li>
            </ul>
            <p v-else class="handwrite-practice__empty">点击“运行测试”后在这里查看结果。</p>
          </div>

          <div class="handwrite-practice__result-panel">
            <div class="handwrite-practice__result-header">
              <h3>Console 输出</h3>
              <span>{{ runResult.logs.length }} 条日志</span>
            </div>
            <ul v-if="runResult.logs.length" class="handwrite-practice__console-list">
              <li v-for="(log, index) in runResult.logs" :key="`${log.type}-${index}`">
                <span>[{{ log.type }}]</span>
                <code>{{ log.text }}</code>
              </li>
            </ul>
            <p v-else class="handwrite-practice__empty">运行过程中产生的日志会显示在这里。</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
