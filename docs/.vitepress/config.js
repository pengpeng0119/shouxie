// VitePress 配置文件
// 详细配置文档: https://vitepress.dev/reference/site-config

import { defineConfig } from 'vitepress'
import { configureDiagramsPlugin } from "vitepress-plugin-diagrams";
export default defineConfig({
  // ===== 基础配置 =====
  title: "💻 VitePress 技术文档站点",
  description: "专业的前端技术知识库，涵盖前端、后端、网络工程、开发工具等技术领域",
  lang: "zh-CN",
  base: "/shouxie/",

  // ===== 头部配置 =====
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }],
    ["meta", { name: "theme-color", content: "#646cff" }],
    ["meta", { name: "keywords", content: "VitePress,前端,技术文档,JavaScript,Vue,React,Node.js" }],
    ["meta", { property: "og:title", content: "VitePress 技术文档站点" }],
    ["meta", { property: "og:description", content: "专业的前端技术知识库" }],
    ["meta", { property: "og:type", content: "website" }],
    // Fancybox 图片灯箱效果
    ["link", { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css" }],
    ["script", { src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js" }],
  ],

  // ===== 路由配置 =====
  cleanUrls: true,

  // ===== 主题配置 =====
  themeConfig: {
    // ----- 网站信息 -----
    logo: "/images/logo-mini.svg",
    siteTitle: "🚀 技术文档",

    // ----- 导航栏 -----
    nav: [
      {
        text: "🏠 首页",
        link: "/home",
        activeMatch: "^/home",
      },
      // {
      //   text: '👤 简历',
      //   link: '/'
      // },
      {
        text: "🎨 前端技术",
        activeMatch: "^/(frontEnd/|tools/questions/(handwrite|handwrite-practice))",
        items: [
          { text: "📝 HTML & CSS", link: "/frontEnd/css/dom", activeMatch: "^/frontEnd/css/" },
          { text: "⚡ JavaScript", link: "/frontEnd/javascript/", activeMatch: "^/frontEnd/javascript/" },
          { text: "✍️ JS 手写题", link: "/tools/questions/handwrite", activeMatch: "^/tools/questions/handwrite$" },
          { text: "💻 在线练习", link: "/tools/questions/handwrite-practice", activeMatch: "^/tools/questions/handwrite-practice$" },
          { text: "🖥️ 浏览器 API", link: "/frontEnd/window/properties", activeMatch: "^/frontEnd/window/" },
          { text: "🚀 现代框架", link: "/frontEnd/web/vue3-advanced", activeMatch: "^/frontEnd/web/" },
        ],
      },
      {
        text: "⚙️ 后端技术",
        activeMatch: "^/afterEnd/",
        items: [
          { text: "🟢 Node.js", link: "/afterEnd/node/", activeMatch: "^/afterEnd/node/" },
          { text: "🚂 Node 框架", link: "/afterEnd/express/express", activeMatch: "^/afterEnd/express/" },
          { text: "🗄️ 数据库", link: "/afterEnd/database/mysql", activeMatch: "^/afterEnd/database/" },
          { text: "🌐 服务器", link: "/afterEnd/server/nginx", activeMatch: "^/afterEnd/server/" },
        ],
      },
      {
        text: "🌐 网络工程",
        activeMatch: "^/network/",
        items: [
          { text: "📡 HTTP 协议", link: "/network/http/", activeMatch: "^/network/http/" },
          { text: "🔒 网络安全", link: "/network/httpSecure/https", activeMatch: "^/network/httpSecure/" },
          { text: "📨 网络请求", link: "/network/ajaxAndFetch/ajax", activeMatch: "^/network/ajaxAndFetch/" },
        ],
      },
      {
        text: "🛠️ 开发工具",
        activeMatch: "^/tools/",
        items: [
          { text: "📦 构建工具", link: "/tools/buildTools/vite", activeMatch: "^/tools/buildTools/" },
          { text: "📚 常用包", link: "/tools/package/lodash", activeMatch: "^/tools/package/" },
          { text: "📋 开发规范", link: "/tools/stardard/git", activeMatch: "^/tools/stardard/" },
          { text: "❓ 问题集合", link: "/tools/questions/handwrite", activeMatch: "^/tools/questions/" },
        ],
      },
      {
        text: "📱 跨端开发",
        activeMatch: "^/spanEnd/",
        items: [
          { text: "🎯 Taro", link: "/spanEnd/Taro/", activeMatch: "^/spanEnd/Taro/" },
          { text: "🦄 uni-app", link: "/spanEnd/uniapp/", activeMatch: "^/spanEnd/uniapp/" },
          { text: "💻 Electron", link: "/spanEnd/electron", activeMatch: "^/spanEnd/electron" },
        ],
      },
      {
        text: "⚡ 性能优化",
        link: "/performace/performace",
        activeMatch: "^/performace/",
      },
    ],

    // ----- 侧边栏 -----
    sidebar: {
      // 前端技术侧边栏
      "/frontEnd/": [
        {
          text: "🎨 CSS & HTML",
          collapsed: false,
          items: [
            { text: "📋 HTML 基础", link: "/frontEnd/css/html" },
            { text: "📄 DOM 操作", link: "/frontEnd/css/dom" },
            { text: "🎯 CSS 选择器", link: "/frontEnd/css/selector" },
            { text: "📐 CSS Layout 布局", link: "/frontEnd/css/layout" },
            { text: "🎭 CSS 函数", link: "/frontEnd/css/function" },
            { text: "🎬 CSS Animation 动画", link: "/frontEnd/css/animation" },
            { text: "🔄 CSS Transform 变换", link: "/frontEnd/css/transform" },
            { text: "📏 Less 预处理", link: "/frontEnd/css/less" },
            { text: "🎨 Sass 预处理", link: "/frontEnd/css/sass" },
            { text: "📝 At-Rules", link: "/frontEnd/css/atRules" },
          ],
        },
        {
          text: "⚡ JavaScript 核心",
          collapsed: false,
          items: [
            { text: "🏁 JavaScript 基础", link: "/frontEnd/javascript/" },
            { text: "🎯 JavaScript 对象", link: "/frontEnd/javascript/object" },
            { text: "🔗 Proxy 代理", link: "/frontEnd/javascript/proxy" },
            { text: "📝 RegExp 正则表达式", link: "/frontEnd/javascript/RegExp" },
            { text: "🔢 Set & Map 集合", link: "/frontEnd/javascript/setAndMap" },
            { text: "⚠️ Error 错误处理", link: "/frontEnd/javascript/Error" },
            { text: "🌍 Intl 国际化", link: "/frontEnd/javascript/Intl" },
            { text: "📊 JSON 处理", link: "/frontEnd/javascript/json" },
            { text: "💾 ArrayBuffer 二进制数据", link: "/frontEnd/javascript/ArrayBuffer" },
            { text: "🔒 Atomics 原子操作", link: "/frontEnd/javascript/Atomics" },
          ],
        },
        {
          text: "🖥️ 浏览器 API",
          collapsed: false,
          items: [
            { text: "🌐 Window 窗口属性", link: "/frontEnd/window/properties" },
            { text: "🎪 Window 事件", link: "/frontEnd/window/events" },
            { text: "🔧 Window 函数", link: "/frontEnd/window/function" },
            { text: "👀 Observer 观察者", link: "/frontEnd/window/observer" },
            { text: "📏 元素尺寸", link: "/frontEnd/window/offsetWidth" },
            { text: "🎨 Canvas 绘图", link: "/frontEnd/window/Canvas" },
            { text: "🔐 Crypto 加密 API", link: "/frontEnd/window/crypto" },
            { text: "🗄️ IndexedDB 数据库", link: "/frontEnd/window/indexedDB" },
            { text: "🧭 Navigator 浏览器属性", link: "/frontEnd/window/navigator" },
            { text: "🔧 Navigator 浏览器方法", link: "/frontEnd/window/navigatorFun" },
            { text: "💳 Payment 支付 API", link: "/frontEnd/window/payment" },
            { text: "📊 Performance 性能监控", link: "/frontEnd/window/Performance" },
            { text: "🎤 Speech 语音 API", link: "/frontEnd/window/speech" },
            { text: "🌊 Stream 流处理", link: "/frontEnd/window/stream" },
            { text: "🔗 Socket 通信", link: "/frontEnd/window/Socket" },
            { text: "🛠️ Service Worker", link: "/frontEnd/window/serviceWorker" },
            { text: "👷 Web Worker", link: "/frontEnd/window/webWorker" },
            { text: "🧩 Web Components", link: "/frontEnd/window/webComponents" },
            { text: "📹 Web RTC", link: "/frontEnd/window/webRTC" },
            { text: "🌐 Web API", link: "/frontEnd/window/webAPI" },
            { text: "🧭 Window 路由", link: "/frontEnd/window/route" },
          ],
        },
        {
          text: "🚀 现代框架",
          collapsed: false,
          items: [
            { text: "⚡ VitePress 静态站点", link: "/frontEnd/web/VitePress" },
            { text: "🔷 TypeScript 语言", link: "/frontEnd/web/TypeScript" },
            { text: "💚 Vue 3 高级开发指南", link: "/frontEnd/web/vue3-advanced" },
            { text: "🎭 Svelte 框架", link: "/frontEnd/web/svelte" },
            { text: "💎 jQuery 库", link: "/frontEnd/web/jQuery" },
            { text: "🚀 Nuxt.js 框架", link: "/frontEnd/web/nuxt" },
            { text: "🔧 Amis 低代码框架", link: "/frontEnd/web/lessCode" },
            { text: "🏗️ qiankun 微前端框架", link: "/frontEnd/web/qiankun" },
          ],
        },
      ],

      // 后端技术侧边栏
      "/afterEnd/": [
        {
          text: "🟢 Node.js",
          collapsed: false,
          items: [
            { text: "📦 Node.js 概述", link: "/afterEnd/node/" },
            { text: "📦 模块系统", link: "/afterEnd/node/module" },
            { text: "🌐 HTTP 模块", link: "/afterEnd/node/server" },
            { text: "🔧 实用工具", link: "/afterEnd/node/util" },
            { text: "📂 文件系统", link: "/afterEnd/node/fs" },
            { text: "📍 路径处理", link: "/afterEnd/node/path" },
            { text: "⚙️ 进程管理", link: "/afterEnd/node/process" },
            { text: "🔍 断言库", link: "/afterEnd/node/assert" },
            { text: "💾 缓冲区", link: "/afterEnd/node/buffer" },
            { text: "📡 事件系统", link: "/afterEnd/node/events" },
            { text: "🌊 流处理", link: "/afterEnd/node/stream" },
            { text: "🔗 查询字符串", link: "/afterEnd/node/querystring" },
            { text: "📝 读取行", link: "/afterEnd/node/readline" },
            { text: "🕷️ 网络爬虫", link: "/afterEnd/node/reptile" },
            { text: "🚀 HTTP/2", link: "/afterEnd/node/http2" },
            { text: "🧪 测试工具", link: "/afterEnd/node/test" },
          ],
        },
        {
          text: "🚂 Node 框架",
          collapsed: false,
          items: [
            { text: "🌐 Express 框架", link: "/afterEnd/express/express" },
            { text: "🥚 Egg.js 框架", link: "/afterEnd/express/egg" },
            { text: "🎯 Koa.js 框架", link: "/afterEnd/express/koa" },
          ],
        },
        {
          text: "🗄️ 数据库",
          collapsed: false,
          items: [
            { text: "🐬 MySQL 数据库", link: "/afterEnd/database/mysql" },
            { text: "🍃 MongoDB 数据库", link: "/afterEnd/database/mongoose" },
          ],
        },
        {
          text: "🌐 服务器",
          collapsed: false,
          items: [
            { text: "🌊 Nginx 服务器", link: "/afterEnd/server/nginx" },
            { text: "⚡ Nitro 服务器", link: "/afterEnd/server/nitro" },
          ],
        },
      ],

      // 网络工程侧边栏
      "/network/": [
        {
          text: "📡 HTTP 协议",
          collapsed: false,
          items: [
            { text: "🌐 HTTP 基础", link: "/network/http/" },
            { text: "📊 状态码", link: "/network/http/status" },
            { text: "🎭 MIME 类型", link: "/network/http/mime" },
            { text: "✅ Accept 协商", link: "/network/http/accept" },
            { text: "🔗 连接管理", link: "/network/http/connection" },
            { text: "📄 范围请求", link: "/network/http/range" },
            { text: "🏗️ OSI 模型", link: "/network/http/osi" },
          ],
        },
        {
          text: "🔒 网络安全",
          collapsed: false,
          items: [
            { text: "🔐 HTTPS 协议", link: "/network/httpSecure/https" },
            { text: "🛡️ 内容安全", link: "/network/httpSecure/contentSecurity" },
            { text: "🌍 跨域处理", link: "/network/httpSecure/crossOrigin" },
            { text: "🔑 权限管理", link: "/network/httpSecure/premission" },
            { text: "🛡️ 安全策略", link: "/network/httpSecure/secure" },
          ],
        },
        {
          text: "📨 网络请求",
          collapsed: false,
          items: [
            { text: "📡 Ajax 技术", link: "/network/ajaxAndFetch/ajax" },
            { text: "🚀 Fetch API", link: "/network/ajaxAndFetch/fetch" },
            { text: "📊 Axios 库", link: "/network/ajaxAndFetch/axios" },
          ],
        },
      ],

      // 开发工具侧边栏
      "/tools/": [
        {
          text: "📦 构建工具",
          collapsed: false,
          items: [
            { text: "⚡ Vite", link: "/tools/buildTools/vite" },
            { text: "📦 Webpack", link: "/tools/buildTools/webpack" },
            { text: "🔧 Rollup", link: "/tools/buildTools/rollup" },
            { text: "🌊 Gulp", link: "/tools/buildTools/gulp" },
            { text: "🏗️ 脚手架", link: "/tools/buildTools/scaffolder" },
            { text: "📦 NPM 包管理", link: "/tools/buildTools/npm" },
            { text: "🎯 Lerna 包管理", link: "/tools/buildTools/lerna" },
            { text: "🐳 Docker 容器", link: "/tools/buildTools/docker" },
            { text: "🚀 Jenkins 持续集成", link: "/tools/buildTools/Jenkins" },
            { text: "⚙️ GitHub Actions", link: "/tools/buildTools/actions" },
          ],
        },
        {
          text: "📚 常用包",
          collapsed: false,
          items: [
            { text: "🛠️ Lodash 工具库", link: "/tools/package/lodash" },
            { text: "📊 ECharts 数据可视化", link: "/tools/package/echarts" },
            { text: "📈 AntV 数据可视化", link: "/tools/package/antv" },
            { text: "📊 D3.js 数据可视化", link: "/tools/package/D3" },
            { text: "🎨 Iconfont 图标库", link: "/tools/package/iconfont" },
            { text: "🎭 Anime.js 动画库", link: "/tools/package/anime" },
            { text: "🎬 Lottie 动画库", link: "/tools/package/Lottie" },
            { text: "⚡ Velocity.js 动画库", link: "/tools/package/Velocity" },
            { text: "🎨 Bootstrap CSS 框架", link: "/tools/package/bootstrap" },
            { text: "🎨 Tailwind CSS 框架", link: "/tools/package/tailwindcss" },
            { text: "🎨 SortableJS 拖拽库", link: "/tools/package/sortablejs" },
            { text: "📊 vxe-grid 表格", link: "/tools/package/vxe-grid" },
            { text: "🌍 Cesium 地图", link: "/tools/package/Cesium" },
            { text: "📅 Day.js 日期处理", link: "/tools/package/dayjs" },
            { text: "🖼️ DomToImage 截图", link: "/tools/package/DomToImage" },
            { text: "🔍 Fuse.js 搜索", link: "/tools/package/fuse" },
            { text: "📱 Hybrid 混合开发", link: "/tools/package/hybrid" },
            { text: "🎭 Mock.js 模拟数据", link: "/tools/package/mockjs" },
            { text: "📊 Sentry 错误监控", link: "/tools/package/sentry" },
            { text: "🧩 SodaJS 模板引擎", link: "/tools/package/sodajs" },
            { text: "📚 Storybook 组件测试", link: "/tools/package/Storybook" },
            { text: "📝 TinyMCE 富文本编辑器", link: "/tools/package/TinyMCE" },
            { text: "🌍 Vue I18n 国际化", link: "/tools/package/vueI18n" },
            { text: "🍍 Pinia 状态管理", link: "/tools/package/pinia" },
            { text: "🧭 Vue Router 路由", link: "/tools/package/VueRouter" },
            { text: "💾 Vuex Persist 状态管理", link: "/tools/package/vuexPersist" },
            { text: "🔍 Whistle 代理", link: "/tools/package/whistle" },
            { text: "📋 Tasks 文件", link: "/tools/package/tasksfile" },
            { text: "🎬 animate.css 动画库", link: "/tools/package/animate" },
            { text: "📋 SignalR 实时通信", link: "/tools/package/SignalR使用指南" },
            { text: "📊 Mermaid 教程", link: "/tools/package/mermaid" },
            { text: "🌲 Cypress 测试框架", link: "/tools/package/test/Cypress" },
            { text: "🔍 FlexSearch 全文搜索", link: "/tools/package/FlexSearch" }
          ],
        },
        {
          text: "📋 开发规范",
          collapsed: false,
          items: [
            { text: "🔄 Git 版本控制", link: "/tools/stardard/git" },
            { text: "📝 Markdown 语法", link: "/tools/stardard/markdown" },
            { text: "✨ Prettier 代码格式化", link: "/tools/stardard/prettier" },
            { text: "🔍 ESLint 代码规范", link: "/tools/stardard/eslint" },
            { text: "💻 VS Code 编辑器", link: "/tools/stardard/vscode" },
            { text: "📖 命名规范", link: "/tools/stardard/naming" },
            { text: "📊 质量管控", link: "/tools/stardard/quality" },
          ],
        },
        {
          text: "❓ 问题集合",
          collapsed: false,
          items: [
            { text: "� 学习指南", link: "/tools/study" },
            { text: "✍️ 手写题汇总", link: "/tools/questions/handwrite" },
            { text: "💻 在线练习", link: "/tools/questions/handwrite-practice" },
            { text: "🧮 算法题解", link: "/tools/questions/algorithm" },
            { text: "🎨 设计模式", link: "/tools/questions/designMode" },
            { text: "🐞 调试技巧", link: "/tools/questions/debugging" },
            { text: "🔄 兼容性处理", link: "/tools/questions/compatibility" },
            { text: "📱 移动端适配", link: "/tools/questions/mobileFit" },
            { text: "🤖 机器人协议", link: "/tools/questions/robots" },
            { text: "🖨️ 代码输出", link: "/tools/questions/print" },
            { text: "💳 微信支付", link: "/tools/questions/wechatPay" },
            { text: "🏗️ 系统设计", link: "/tools/questions/system" },
            { text: "📊 Grafana 监控", link: "/tools/questions/Grafana" },
            { text: "🔍 NPM 私服", link: "/tools/questions/npmHub" },
            { text: "📄 LeetCode", link: "/tools/questions/leetCode" },
            { text: "❓ 综合问题", link: "/tools/questions/questions" },
          ],
        }
      ],

      // 跨端开发侧边栏
      "/spanEnd/": [
        {
          text: "🎯 Taro 框架",
          collapsed: false,
          items: [
            { text: "🏁 Taro 入门", link: "/spanEnd/Taro/" },
            { text: "⚙️ 基础配置", link: "/spanEnd/Taro/basic" },
            { text: "🔧 配置详解", link: "/spanEnd/Taro/config" },
            { text: "📊 API 使用", link: "/spanEnd/Taro/api" },
            { text: "📱 媒体组件", link: "/spanEnd/Taro/media" },
            { text: "📋 表单组件", link: "/spanEnd/Taro/form" },
            { text: "🧭 导航系统", link: "/spanEnd/Taro/navigator" },
            { text: "🌐 开放能力", link: "/spanEnd/Taro/open" },
            { text: "🧭 路由管理", link: "/spanEnd/Taro/router" },
            { text: "📦 容器视图", link: "/spanEnd/Taro/viewContrainer" },
            { text: "💚 Vue 集成", link: "/spanEnd/Taro/vue" },
            { text: "☁️ 云开发", link: "/spanEnd/Taro/cloud" },
          ],
        },
        {
          text: "🦄 uni-app",
          collapsed: false,
          items: [
            { text: "🏁 uni-app 入门", link: "/spanEnd/uniapp/" },
            { text: "📊 API 文档", link: "/spanEnd/uniapp/api" },
            { text: "🧩 组件库", link: "/spanEnd/uniapp/components" },
          ],
        },
        {
          text: "💻 桌面应用",
          collapsed: false,
          items: [{ text: "⚡ Electron", link: "/spanEnd/electron" }],
        },
      ],

      // 性能优化侧边栏
      "/performace/": [
        {
          text: "⚡ 性能优化",
          collapsed: false,
          items: [
            { text: "📊 性能分析", link: "/performace/performace" },
            { text: "🖼️ 图片优化", link: "/performace/image" },
            { text: "🌐 DNS 预解析", link: "/performace/dnsPrefetch" },
            { text: "📦 资源预加载", link: "/performace/prefetch" },
            { text: "🔍 SEO 优化", link: "/performace/seo" },
          ],
        },
      ],
    },

    // ----- 社交链接 -----
    socialLinks: [
      { icon: "github", link: "https://github.com/jinxi1334640772" },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>掘金</title><path d="M12 14.316l7.454-5.88-2.022-1.625L12 11.1l-.004.003-5.432-4.289-2.022 1.625L12 14.316z"/><path d="M12 0l12 9.5-2.518 2L12 4.5 2.518 11.5 0 9.5 12 0z"/></svg>',
        },
        link: "https://juejin.cn/user/1451011080204040",
      },
    ],

    // ----- 搜索配置 -----
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },

    // ----- 编辑链接 -----
    editLink: {
      pattern: "https://github.com/jinxi1334640772/jinxi1334640772.github.io/edit/master/docs/:path",
      text: "在 GitHub 上编辑此页面",
    },

    // ----- 页脚配置 -----
    footer: {
      message: '基于 <a href="https://vitepress.dev/" target="_blank">VitePress</a> 构建的技术文档站点',
      copyright: 'Copyright © 2024 <a href="https://github.com/jinxi1334640772" target="_blank">张进喜</a>',
    },

    // ----- 大纲配置 -----
    outline: {
      level: [2, 3],
      label: "页面导航",
    },

    // ----- 返回顶部 -----
    returnToTopLabel: "回到顶部",

    // ----- 深色模式切换 -----
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",

    // ----- 侧边栏 -----
    sidebarMenuLabel: "菜单",

    // ----- 外部链接图标 -----
    externalLinkIcon: true,

    // ----- 最后更新时间 -----
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    // ----- 文档页脚 -----
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
  },

  // ===== Markdown 配置 =====
  markdown: {
    config: (md) => {
      configureDiagramsPlugin(md, {
        diagramsDir: "docs/public/diagrams", // 可选：自定义 SVG 文件目录
        publicPath: "/diagrams", // 可选：自定义公共路径
      });
    },
    // 行号显示
    lineNumbers: true,
    anchor: {
      level: [2, 3],
      slugify: str => str.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      // permalink: true,
      permalinkSymbol: "#",
    },
    // 代码块主题
    theme: {
      light: "github-light",
      dark: "github-dark",
    },

    // 容器配置
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  // 可选地，可以传入MermaidConfig
  mermaid: {
    // 配置参考： https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults
  },
  // 可选地使用MermaidPluginConfig为插件本身设置额外的配置
  mermaidPlugin: {
    class: "mermaid my-class", // 为父容器设置额外的CSS类
  },

  // ===== 构建配置 =====
  vite: {
    // 静态资源处理
    assetsInclude: ["**/*.awebp"],

    // 服务器配置
    server: {
      port: 9000,
      open: false,
    },

    // 构建优化:放开会build失败
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          // entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  },

  // ===== 站点地图 =====
  sitemap: {
    hostname: "https://jinxi1334640772.github.io",
  },
});
