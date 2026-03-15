import handwriteSource from "../../../tools/questions/handwrite.md?raw";

export const questionCategories = [
  { key: "function", label: "函数实现" },
  { key: "array", label: "数组方法" },
  { key: "async", label: "异步编程" },
  { key: "pattern", label: "设计模式" },
  { key: "util", label: "工具函数" },
  { key: "structure", label: "数据结构" },
  { key: "string", label: "字符串处理" },
];

const categoryTitleMap = {
  "## 🔧 函数实现类": "function",
  "## 📚 数组方法实现": "array",
  "## 🚀 异步编程实现": "async",
  "## 🎨 设计模式实现": "pattern",
  "## 🌐 工具函数实现": "util",
  "## 🧮 数据结构实现": "structure",
  "## 🔍 字符串处理": "string",
};

function trimBlock(text) {
  return text.replace(/^\s+|\s+$/g, "");
}

function stripExamples(code) {
  const lines = code.split("\n");
  const exampleIndex = lines.findIndex((line) => line.trim().startsWith("// 🧪"));
  const cleaned = exampleIndex >= 0 ? lines.slice(0, exampleIndex) : lines;
  return trimBlock(cleaned.join("\n"));
}

function parseQuestionsFromMarkdown(source) {
  const lines = source.split("\n");
  const items = [];
  let currentCategory = null;
  let currentTitle = "";
  let currentLines = [];

  function flush() {
    if (!currentCategory || !currentTitle || currentLines.length === 0) {
      return;
    }
    const content = currentLines.join("\n");
    const codeBlocks = [...content.matchAll(/```javascript\n([\s\S]*?)```/g)].map((match) =>
      stripExamples(match[1]),
    );
    const description = trimBlock(content.replace(/```javascript[\s\S]*?```/g, "").trim());
    items.push({
      title: currentTitle,
      category: currentCategory,
      description,
      solution: codeBlocks.filter(Boolean).join("\n\n"),
    });
  }

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      currentTitle = "";
      currentLines = [];
      currentCategory = categoryTitleMap[line] || null;
      continue;
    }

    if (line.startsWith("### ")) {
      flush();
      currentLines = [];
      currentTitle = line.replace(/^### \d+\.\s*/, "").replace(/\s*[🟢🟡🔴]+$/, "").trim();
      continue;
    }

    if (currentTitle) {
      currentLines.push(line);
    }
  }

  flush();
  return new Map(items.map((item) => [item.title, item]));
}

const sourceMap = parseQuestionsFromMarkdown(handwriteSource);

const metadata = [
  {
    id: "my-new",
    title: "手写 new 操作符",
    difficulty: "easy",
    category: "function",
    starterCode: `function myNew(constructor, ...args) {
  // 1. 校验构造函数
  // 2. 创建并关联原型
  // 3. 执行构造函数
  // 4. 处理返回值
}`,
    testCases: [
      {
        name: "支持创建实例并继承原型",
        code: `function Person(name) {
  this.name = name;
}
Person.prototype.say = function() {
  return this.name;
};
const person = myNew(Person, "张三");
assert(person instanceof Person, "实例原型链不正确");
assertEqual(person.say(), "张三", "实例属性或原型方法不正确");`,
      },
      {
        name: "支持返回对象的构造函数",
        code: `function Factory(name) {
  this.name = name;
  return { custom: name };
}
const value = myNew(Factory, "结果");
assertDeepEqual(value, { custom: "结果" }, "返回对象时应直接返回该对象");`,
      },
    ],
  },
  {
    id: "my-call",
    title: "手写 call 方法",
    difficulty: "easy",
    category: "function",
    starterCode: `Function.prototype.myCall = function(context, ...args) {
  // 改变 this 指向并立即执行
};`,
    testCases: [
      {
        name: "可以修改 this 并透传参数",
        code: `function greet(prefix, suffix) {
  return prefix + this.name + suffix;
}
const result = greet.myCall({ name: "李四" }, "你好，", "！");
assertEqual(result, "你好，李四！", "myCall 结果不正确");`,
      },
      {
        name: "null 上下文回退到全局对象",
        code: `globalThis.cityName = "北京";
function readCity() {
  return this.cityName;
}
assertEqual(readCity.myCall(null), "北京", "null 上下文应回退到全局对象");
delete globalThis.cityName;`,
      },
    ],
  },
  {
    id: "my-apply",
    title: "手写 apply 方法",
    difficulty: "easy",
    category: "function",
    starterCode: `Function.prototype.myApply = function(context, argsArray) {
  // 使用数组参数执行函数
};`,
    testCases: [
      {
        name: "支持数组参数调用",
        code: `function sum(a, b, c) {
  return a + b + c;
}
assertEqual(sum.myApply(null, [1, 2, 3]), 6, "myApply 计算结果不正确");`,
      },
      {
        name: "可以绑定对象上下文",
        code: `function getValue(extra) {
  return this.base + extra;
}
assertEqual(getValue.myApply({ base: 10 }, [5]), 15, "myApply this 指向不正确");`,
      },
    ],
  },
  {
    id: "my-bind",
    title: "手写 bind 方法",
    difficulty: "medium",
    category: "function",
    starterCode: `Function.prototype.myBind = function(context, ...presetArgs) {
  // 返回一个绑定后的新函数
};`,
    testCases: [
      {
        name: "支持普通函数绑定和柯里化参数",
        code: `function add(a, b) {
  return this.base + a + b;
}
const bound = add.myBind({ base: 1 }, 2);
assertEqual(bound(3), 6, "普通绑定场景不正确");`,
      },
      {
        name: "作为构造函数调用时忽略绑定对象",
        code: `function Person(name) {
  this.name = name;
}
Person.prototype.say = function() {
  return this.name;
};
const BoundPerson = Person.myBind({ name: "外部" });
const person = new BoundPerson("内部");
assert(person instanceof Person, "构造调用时原型链不正确");
assertEqual(person.say(), "内部", "构造调用时 this 不应指向绑定对象");`,
      },
    ],
  },
  {
    id: "my-instanceof",
    title: "手写 instanceof 操作符",
    difficulty: "easy",
    category: "function",
    starterCode: `function myInstanceof(left, right) {
  // 沿着原型链向上查找
}`,
    testCases: [
      {
        name: "支持普通对象和数组",
        code: `assertEqual(myInstanceof([], Array), true, "数组判断失败");
assertEqual(myInstanceof({}, Object), true, "对象判断失败");`,
      },
      {
        name: "基础类型返回 false",
        code: `assertEqual(myInstanceof("hello", String), false, "基础类型应返回 false");
assertEqual(myInstanceof(null, Object), false, "null 应返回 false");`,
      },
    ],
  },
  {
    id: "my-object-create",
    title: "手写 Object.create",
    difficulty: "medium",
    category: "function",
    starterCode: `function myObjectCreate(proto, propertiesObject) {
  // 创建指定原型的新对象
}`,
    testCases: [
      {
        name: "支持原型继承",
        code: `const proto = {
  say() {
    return "hello";
  },
};
const obj = myObjectCreate(proto);
assertEqual(Object.getPrototypeOf(obj), proto, "原型设置失败");
assertEqual(obj.say(), "hello", "原型方法不可用");`,
      },
      {
        name: "支持属性描述符",
        code: `const obj = myObjectCreate({}, {
  name: { value: "张三", enumerable: true },
});
assertEqual(obj.name, "张三", "属性描述符未生效");`,
      },
    ],
  },
  {
    id: "my-foreach",
    title: "手写 forEach",
    difficulty: "easy",
    category: "array",
    starterCode: `Array.prototype.myForEach = function(callback, thisArg) {
  // 遍历数组并执行回调
};`,
    testCases: [
      {
        name: "按顺序遍历每一项",
        code: `const result = [];
[1, 2, 3].myForEach((item, index) => {
  result.push(item + "-" + index);
});
assertDeepEqual(result, ["1-0", "2-1", "3-2"], "遍历顺序或参数不正确");`,
      },
      {
        name: "支持 thisArg",
        code: `const context = { sum: 0 };
[1, 2, 3].myForEach(function(item) {
  this.sum += item;
}, context);
assertEqual(context.sum, 6, "thisArg 未生效");`,
      },
    ],
  },
  {
    id: "my-map",
    title: "手写 map",
    difficulty: "easy",
    category: "array",
    starterCode: `Array.prototype.myMap = function(callback, thisArg) {
  // 返回映射后的新数组
};`,
    testCases: [
      {
        name: "返回新数组",
        code: `const result = [1, 2, 3].myMap((item) => item * 2);
assertDeepEqual(result, [2, 4, 6], "map 结果不正确");`,
      },
      {
        name: "跳过稀疏数组空位",
        code: `const arr = [1, , 3];
const result = arr.myMap((item) => item * 2);
assertEqual(1 in result, false, "稀疏数组空位不应被映射");`,
      },
    ],
  },
  {
    id: "my-filter",
    title: "手写 filter",
    difficulty: "easy",
    category: "array",
    starterCode: `Array.prototype.myFilter = function(callback, thisArg) {
  // 返回过滤后的新数组
};`,
    testCases: [
      {
        name: "按条件过滤数组",
        code: `const result = [1, 2, 3, 4].myFilter((item) => item % 2 === 0);
assertDeepEqual(result, [2, 4], "filter 结果不正确");`,
      },
      {
        name: "支持 thisArg",
        code: `const result = [1, 2, 3].myFilter(function(item) {
  return item > this.min;
}, { min: 1 });
assertDeepEqual(result, [2, 3], "thisArg 条件过滤失败");`,
      },
    ],
  },
  {
    id: "my-reduce",
    title: "手写 reduce",
    difficulty: "medium",
    category: "array",
    starterCode: `Array.prototype.myReduce = function(callback, initialValue) {
  // 累积计算并返回结果
};`,
    testCases: [
      {
        name: "支持初始值",
        code: `const result = [1, 2, 3].myReduce((sum, item) => sum + item, 10);
assertEqual(result, 16, "带初始值的 reduce 不正确");`,
      },
      {
        name: "未传初始值时取首个有效元素",
        code: `const result = [1, 2, 3].myReduce((sum, item) => sum + item);
assertEqual(result, 6, "不带初始值的 reduce 不正确");`,
      },
    ],
  },
  {
    id: "my-find",
    title: "手写 find",
    difficulty: "easy",
    category: "array",
    starterCode: `Array.prototype.myFind = function(callback, thisArg) {
  // 找到第一个满足条件的元素
};`,
    testCases: [
      {
        name: "返回首个命中的元素",
        code: `const result = [1, 3, 4, 6].myFind((item) => item % 2 === 0);
assertEqual(result, 4, "find 返回结果不正确");`,
      },
      {
        name: "未命中时返回 undefined",
        code: `const result = [1, 3, 5].myFind((item) => item % 2 === 0);
assertEqual(result, undefined, "未命中时应返回 undefined");`,
      },
    ],
  },
  {
    id: "array-flat",
    title: "数组扁平化（flat）",
    difficulty: "medium",
    category: "array",
    starterCode: `function flattenRecursive(arr, depth = 1) {
  // 递归按层级拍平
}

function flattenDeep(arr) {
  // 完全拍平数组
}`,
    testCases: [
      {
        name: "支持指定层级拍平",
        code: `const result = flattenRecursive([1, [2, 3], [4, [5]]], 1);
assertDeepEqual(result, [1, 2, 3, 4, [5]], "指定层级拍平失败");`,
      },
      {
        name: "支持完全拍平",
        code: `const result = flattenDeep([1, [2, [3, [4]]]]);
assertDeepEqual(result, [1, 2, 3, 4], "完全拍平失败");`,
      },
    ],
  },
  {
    id: "array-unique",
    title: "数组去重",
    difficulty: "easy",
    category: "array",
    starterCode: `function uniqueWithSet(arr) {
  // 普通数组去重
}

function uniqueByProperty(arr, key) {
  // 对象数组按属性去重
}`,
    testCases: [
      {
        name: "普通数组去重",
        code: `assertDeepEqual(uniqueWithSet([1, 2, 2, 3, 3]), [1, 2, 3], "普通数组去重失败");`,
      },
      {
        name: "对象数组按字段去重",
        code: `const result = uniqueByProperty([
  { id: 1, name: "A" },
  { id: 1, name: "B" },
  { id: 2, name: "C" },
], "id");
assertEqual(result.length, 2, "对象数组去重数量不正确");
assertEqual(result[1].id, 2, "对象数组去重顺序不正确");`,
      },
    ],
  },
  {
    id: "my-promise",
    title: "手写 Promise",
    difficulty: "hard",
    category: "async",
    starterCode: `class MyPromise {
  constructor(executor) {
    // 初始化状态和值
  }

  then(onFulfilled, onRejected) {
    // 返回新的 Promise
  }

  catch(onRejected) {
    // 复用 then
  }

  finally(onFinally) {
    // 无论成功失败都执行
  }

  static resolve(value) {}
  static reject(reason) {}
  static all(promises) {}
  static race(promises) {}
  static allSettled(promises) {}
}`,
    testCases: [
      {
        name: "支持 then 链式调用",
        code: `const result = await new MyPromise((resolve) => resolve(1)).then((value) => value + 1);
assertEqual(result, 2, "then 链式调用失败");`,
      },
      {
        name: "支持 Promise.all",
        code: `const result = await MyPromise.all([1, MyPromise.resolve(2), new MyPromise((resolve) => resolve(3))]);
assertDeepEqual(result, [1, 2, 3], "Promise.all 结果不正确");`,
      },
    ],
  },
  {
    id: "debounce-throttle",
    title: "防抖和节流",
    difficulty: "medium",
    category: "async",
    starterCode: `function debounce(func, delay, immediate = false) {
  // 返回防抖函数
}

function throttle(func, delay, options = {}) {
  // 返回节流函数
}`,
    testCases: [
      {
        name: "debounce 在连续触发后只执行一次",
        code: `let count = 0;
const fn = debounce(() => {
  count += 1;
}, 30);
fn();
fn();
fn();
await sleep(80);
assertEqual(count, 1, "debounce 执行次数不正确");`,
      },
      {
        name: "throttle 限制单位时间执行次数",
        code: `let count = 0;
const fn = throttle(() => {
  count += 1;
}, 30);
fn();
fn();
await sleep(10);
fn();
await sleep(60);
assert(count >= 1 && count <= 3, "throttle 执行次数不符合预期");`,
      },
    ],
  },
  {
    id: "concurrency-control",
    title: "并发控制",
    difficulty: "hard",
    category: "async",
    starterCode: `async function concurrencyControl(tasks, limit) {
  // 控制并发上限并保持结果顺序
}`,
    testCases: [
      {
        name: "限制最大并发数",
        code: `let running = 0;
let maxRunning = 0;
const tasks = [40, 20, 10, 30].map((delayValue, index) => async () => {
  running += 1;
  maxRunning = Math.max(maxRunning, running);
  await sleep(delayValue);
  running -= 1;
  return index;
});
const result = await concurrencyControl(tasks, 2);
assertEqual(maxRunning, 2, "并发上限未生效");
assertDeepEqual(result, [0, 1, 2, 3], "结果顺序应与任务顺序一致");`,
      },
    ],
  },
  {
    id: "observer-pattern",
    title: "观察者模式",
    difficulty: "medium",
    category: "pattern",
    starterCode: `class Observer {
  constructor(name) {
    this.name = name;
  }

  update(message) {
    // 收到通知时执行
  }
}

class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {}
  removeObserver(observer) {}
  notify(message) {}
}`,
    testCases: [
      {
        name: "可以通知所有观察者",
        code: `const messages = [];
class TestObserver extends Observer {
  update(message) {
    messages.push(this.name + ":" + message);
  }
}
const subject = new Subject();
subject.addObserver(new TestObserver("A"));
subject.addObserver(new TestObserver("B"));
subject.notify("hello");
assertDeepEqual(messages, ["A:hello", "B:hello"], "通知观察者失败");`,
      },
      {
        name: "支持移除观察者",
        code: `const messages = [];
class TestObserver extends Observer {
  update(message) {
    messages.push(this.name + ":" + message);
  }
}
const subject = new Subject();
const target = new TestObserver("A");
subject.addObserver(target);
subject.removeObserver(target);
subject.notify("hello");
assertEqual(messages.length, 0, "移除观察者失败");`,
      },
    ],
  },
  {
    id: "event-emitter",
    title: "发布订阅模式",
    difficulty: "medium",
    category: "pattern",
    starterCode: `class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {}
  once(eventName, callback) {}
  off(eventName, callback) {}
  emit(eventName, ...args) {}
  listenerCount(eventName) {}
}`,
    testCases: [
      {
        name: "支持订阅与发布",
        code: `const emitter = new EventEmitter();
const received = [];
emitter.on("test", (value) => received.push(value));
emitter.emit("test", 1);
emitter.emit("test", 2);
assertDeepEqual(received, [1, 2], "on/emit 功能异常");`,
      },
      {
        name: "once 只触发一次",
        code: `const emitter = new EventEmitter();
let count = 0;
emitter.once("test", () => count += 1);
emitter.emit("test");
emitter.emit("test");
assertEqual(count, 1, "once 应只执行一次");`,
      },
    ],
  },
  {
    id: "singleton-pattern",
    title: "单例模式",
    difficulty: "easy",
    category: "pattern",
    starterCode: `class Singleton {
  constructor(name) {
    // 保证只存在一个实例
  }

  getName() {}
}

const SingletonClosure = (function() {
  let instance;

  function createInstance(name) {
    return {
      name,
      getName() {
        return this.name;
      },
    };
  }

  return {
    getInstance(name) {
      // 返回唯一实例
    },
  };
})();`,
    testCases: [
      {
        name: "类实现的单例只创建一次",
        code: `const a = new Singleton("实例1");
const b = new Singleton("实例2");
assert(a === b, "类单例应返回同一个实例");`,
      },
      {
        name: "闭包实现的单例只创建一次",
        code: `const a = SingletonClosure.getInstance("A");
const b = SingletonClosure.getInstance("B");
assert(a === b, "闭包单例应返回同一个实例");
assertEqual(a.getName(), "A", "首次实例值应被保留");`,
      },
    ],
  },
  {
    id: "factory-pattern",
    title: "工厂模式",
    difficulty: "medium",
    category: "pattern",
    starterCode: `class Product {
  constructor(name) {
    this.name = name;
  }

  use() {
    return this.name;
  }
}

class ProductA extends Product {}
class ProductB extends Product {}

class ProductFactory {
  static createProduct(type) {
    // 根据类型返回不同产品
  }
}`,
    testCases: [
      {
        name: "根据类型创建不同产品",
        code: `const a = ProductFactory.createProduct("A");
const b = ProductFactory.createProduct("B");
assert(a instanceof ProductA, "A 类型产品创建失败");
assert(b instanceof ProductB, "B 类型产品创建失败");`,
      },
      {
        name: "未知类型应抛错",
        code: `let error = null;
try {
  ProductFactory.createProduct("C");
} catch (err) {
  error = err;
}
assert(!!error, "未知产品类型应抛出异常");`,
      },
    ],
  },
  {
    id: "deep-clone",
    title: "深拷贝",
    difficulty: "medium",
    category: "util",
    starterCode: `function deepClone(obj, hash = new WeakMap()) {
  // 处理基础类型、数组、对象、特殊对象和循环引用
}`,
    testCases: [
      {
        name: "支持普通对象深拷贝",
        code: `const source = { name: "张三", nested: { age: 18 }, list: [1, 2] };
const cloned = deepClone(source);
assert(cloned !== source, "应返回新对象");
assert(cloned.nested !== source.nested, "嵌套对象应深拷贝");
assertDeepEqual(cloned, source, "深拷贝结果不正确");`,
      },
      {
        name: "支持循环引用",
        code: `const source = { name: "循环" };
source.self = source;
const cloned = deepClone(source);
assert(cloned !== source, "循环引用对象应返回新对象");
assert(cloned.self === cloned, "循环引用关系未保留");`,
      },
    ],
  },
  {
    id: "type-utils",
    title: "类型判断",
    difficulty: "easy",
    category: "util",
    starterCode: `function getType(value) {
  // 返回精确类型字符串
}

const typeUtils = {
  isString(value) {},
  isNumber(value) {},
  isBoolean(value) {},
  isFunction(value) {},
  isObject(value) {},
  isArray(value) {},
  isDate(value) {},
  isRegExp(value) {},
  isNull(value) {},
  isUndefined(value) {},
  isNullOrUndefined(value) {},
  isEmpty(value) {},
  isPlainObject(value) {},
};`,
    testCases: [
      {
        name: "getType 返回精确类型",
        code: `assertEqual(getType([]), "array", "数组类型判断失败");
assertEqual(getType(null), "null", "null 类型判断失败");`,
      },
      {
        name: "typeUtils 提供常用判断方法",
        code: `assertEqual(typeUtils.isArray([1]), true, "isArray 判断失败");
assertEqual(typeUtils.isEmpty({}), true, "isEmpty 判断失败");
assertEqual(typeUtils.isPlainObject({ a: 1 }), true, "isPlainObject 判断失败");`,
      },
    ],
  },
  {
    id: "curry",
    title: "函数柯里化",
    difficulty: "medium",
    category: "util",
    starterCode: `function curry(fn, ...args) {
  // 基础柯里化
}

function advancedCurry(fn, ...args) {
  // 支持占位符的柯里化
}

advancedCurry.placeholder = Symbol("placeholder");`,
    testCases: [
      {
        name: "基础柯里化支持分批传参",
        code: `function add(a, b, c) {
  return a + b + c;
}
assertEqual(curry(add)(1)(2)(3), 6, "基础柯里化失败");
assertEqual(curry(add, 1)(2, 3), 6, "预置参数柯里化失败");`,
      },
      {
        name: "高级柯里化支持占位符",
        code: `const _ = advancedCurry.placeholder;
function add(a, b, c, d) {
  return a + b + c + d;
}
const curried = advancedCurry(add);
assertEqual(curried(1, _, 3)(2, 4), 10, "占位符柯里化失败");`,
      },
    ],
  },
  {
    id: "template-parser",
    title: "字符串模板解析",
    difficulty: "medium",
    category: "util",
    starterCode: `function parseTemplate(template, data) {
  // 解析 {{key}} 模板
}

function advancedParseTemplate(template, data) {
  // 解析表达式模板
}`,
    testCases: [
      {
        name: "基础模板替换",
        code: `const result = parseTemplate("Hello {{name}}", { name: "张三" });
assertEqual(result, "Hello 张三", "基础模板替换失败");`,
      },
      {
        name: "支持表达式模板",
        code: `const result = advancedParseTemplate("{{age + 1}}", { age: 18 });
assertEqual(result, "19", "表达式模板替换失败");`,
      },
    ],
  },
  {
    id: "url-utils",
    title: "URL 参数解析",
    difficulty: "easy",
    category: "util",
    starterCode: `const urlUtils = {
  parseParams(url) {
    // 解析查询参数
  },

  stringifyParams(params) {
    // 生成查询字符串
  },

  updateParams(params, url) {
    // 更新 URL 参数
  },
};`,
    testCases: [
      {
        name: "解析 URL 参数",
        code: `const url = "https://example.com?name=张三&hobby=读书&hobby=游泳";
const result = urlUtils.parseParams(url);
assertEqual(result.name, "张三", "URL 参数解析失败");
assertDeepEqual(result.hobby, ["读书", "游泳"], "重复参数处理失败");`,
      },
      {
        name: "更新 URL 参数",
        code: `const result = urlUtils.updateParams({ age: 20 }, "https://example.com?name=张三");
assert(result.includes("age=20"), "URL 参数更新失败");`,
      },
    ],
  },
  {
    id: "stack",
    title: "栈（Stack）",
    difficulty: "easy",
    category: "structure",
    starterCode: `class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {}
  pop() {}
  peek() {}
  isEmpty() {}
  size() {}
  clear() {}
  toArray() {}
}`,
    testCases: [
      {
        name: "栈满足后进先出",
        code: `const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
assertEqual(stack.pop(), 3, "出栈顺序错误");
assertEqual(stack.peek(), 2, "栈顶查看错误");`,
      },
      {
        name: "size 和 clear 正常工作",
        code: `const stack = new Stack();
stack.push(1);
stack.push(2);
assertEqual(stack.size(), 2, "栈大小错误");
stack.clear();
assertEqual(stack.isEmpty(), true, "清空后应为空");`,
      },
    ],
  },
  {
    id: "queue",
    title: "队列（Queue）",
    difficulty: "easy",
    category: "structure",
    starterCode: `class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {}
  dequeue() {}
  front() {}
  isEmpty() {}
  size() {}
  clear() {}
  toArray() {}
}`,
    testCases: [
      {
        name: "队列满足先进先出",
        code: `const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
assertEqual(queue.dequeue(), 1, "出队顺序错误");
assertEqual(queue.front(), 2, "队首查看错误");`,
      },
      {
        name: "size 和 clear 正常工作",
        code: `const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
assertEqual(queue.size(), 2, "队列大小错误");
queue.clear();
assertEqual(queue.isEmpty(), true, "清空后应为空");`,
      },
    ],
  },
  {
    id: "linked-list",
    title: "链表（LinkedList）",
    difficulty: "medium",
    category: "structure",
    starterCode: `class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insert(index, val) {}
  append(val) {}
  prepend(val) {}
  removeAt(index) {}
  indexOf(val) {}
  get(index) {}
  toArray() {}
  getSize() {}
  isEmpty() {}
}`,
    testCases: [
      {
        name: "支持插入和转数组",
        code: `const list = new LinkedList();
list.append(1);
list.append(3);
list.insert(1, 2);
assertDeepEqual(list.toArray(), [1, 2, 3], "链表插入失败");`,
      },
      {
        name: "支持删除和查找",
        code: `const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
assertEqual(list.removeAt(1), 2, "链表删除失败");
assertEqual(list.indexOf(3), 1, "链表查找失败");`,
      },
    ],
  },
  {
    id: "lru-cache",
    title: "LRU 缓存",
    difficulty: "hard",
    category: "structure",
    starterCode: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {}
  put(key, value) {}
  getAll() {}
  size() {}
  clear() {}
}`,
    testCases: [
      {
        name: "访问后会刷新最近使用顺序",
        code: `const lru = new LRUCache(2);
lru.put(1, "one");
lru.put(2, "two");
assertEqual(lru.get(1), "one", "读取缓存失败");
lru.put(3, "three");
assertEqual(lru.get(2), -1, "最久未使用项应被淘汰");`,
      },
      {
        name: "更新已有键值不会扩容",
        code: `const lru = new LRUCache(2);
lru.put(1, "one");
lru.put(1, "ONE");
assertEqual(lru.size(), 1, "更新已有键不应增加容量");
assertEqual(lru.get(1), "ONE", "更新后的值不正确");`,
      },
    ],
  },
  {
    id: "string-reverse",
    title: "字符串反转",
    difficulty: "easy",
    category: "string",
    starterCode: `const stringReverse = {
  method1(str) {
    // 使用内置方法
  },
  method2(str) {
    // 使用循环
  },
  method3(str) {
    // 使用递归
  },
  method4(str) {
    // 使用双指针
  },
};`,
    testCases: [
      {
        name: "多种方法都能正确反转字符串",
        code: `assertEqual(stringReverse.method1("abc"), "cba", "method1 结果错误");
assertEqual(stringReverse.method2("hello"), "olleh", "method2 结果错误");
assertEqual(stringReverse.method4("world"), "dlrow", "method4 结果错误");`,
      },
      {
        name: "递归方法处理单字符",
        code: `assertEqual(stringReverse.method3("a"), "a", "method3 单字符处理错误");`,
      },
    ],
  },
  {
    id: "palindrome",
    title: "回文字符串检测",
    difficulty: "easy",
    category: "string",
    starterCode: `function isPalindrome(s) {
  // 忽略大小写和非字母数字字符
}

function longestPalindrome(s) {
  // 返回最长回文子串
}`,
    testCases: [
      {
        name: "判断回文字符串",
        code: `assertEqual(isPalindrome("A man, a plan, a canal: Panama"), true, "回文判断失败");
assertEqual(isPalindrome("race a car"), false, "非回文判断失败");`,
      },
      {
        name: "返回最长回文子串",
        code: `const result = longestPalindrome("babad");
assert(result === "bab" || result === "aba", "最长回文子串结果不正确");`,
      },
    ],
  },
  {
    id: "string-compress",
    title: "字符串压缩",
    difficulty: "medium",
    category: "string",
    starterCode: `function compressString(str) {
  // 对连续字符进行计数压缩
}

function decompressString(str) {
  // 将压缩字符串还原
}`,
    testCases: [
      {
        name: "压缩字符串",
        code: `assertEqual(compressString("aabcccccaaa"), "a2b1c5a3", "字符串压缩失败");`,
      },
      {
        name: "解压缩字符串",
        code: `assertEqual(decompressString("a2b1c5a3"), "aabcccccaaa", "字符串解压失败");`,
      },
    ],
  },
];

export const handwriteQuestions = metadata.map((item, index) => {
  const sourceItem = sourceMap.get(item.title);
  return {
    order: index + 1,
    ...item,
    description: sourceItem?.description || "",
    solution: sourceItem?.solution || item.starterCode,
  };
});

export function getQuestionById(id) {
  return handwriteQuestions.find((item) => item.id === id);
}
