---
layout: doc
navbar: true
sidebar: false
aside: true
editLink: true
footer: true
lastUpdated: true
title: 彭文豪 - 个人简历
description: 前端工程师 · 2年经验 · 专注于 Vue3/React/Vite/TypeScript 工程化开发
---

<div class="resume-header">

# 👨‍💻 彭文豪 - 个人简历

<div class="header-badge">
  <span class="badge">前端工程师</span>
  <span class="badge">2年经验</span>
  <span class="badge">Vue / React</span>
</div>

</div>

::: info 📞 联系方式
- 📱 **手机**: 13361717270
- 📧 **邮箱**: 13361717270@163.com
- 🔥 **掘金**: [掘金主页](https://juejin.cn/user/418265553705239)
:::

## 📊 个人信息概览

| 项目 | 信息 |
|------|------|
| **姓名** | 彭文豪 |
| **性别** | 男 |
| **年龄** | 24 岁 |
| **学历** | 本科 |
| **毕业院校** | 江西师范大学 |
| **专业** | 软件工程 |
| **工作经验** | 2年 |
| **求职意向** | 前端工程师 |



## 💻 专业技能

<div class="skills-section">

### 🚀 精通技术

<div class="skill-tags">

- **基础能力**: `HTML` · `CSS` · `JavaScript ES6+` · `TypeScript`
- **前端框架**: `Vue` · `Vue 3` · `React`
- **状态管理**: `Pinia` · `Zustand`
- **工程化工具**: `Vite` · `Webpack` · `Git` · `GitLab`
- **样式与规范**: `Sass` · `BEM` · `ESLint` · `Prettier`

</div>

### 🔧 熟练技术

<div class="skill-tags">

- **浏览器与网络**: `HTTP` · `浏览器渲染原理` · `Web 安全`
- **AI 与实时通信**: `SSE` · `WebSocket` · `AudioContext`
- **可视化与性能优化**: `Canvas API` · `SVG` · `虚拟列表` · `Web Worker`
- **工程规范**: `Commitizen` · `PR Checklist` · `Review Checklist`

</div>

### 📚 熟悉技术

<div class="skill-tags">

- **服务端**: `Node.js` · `Python` · `Django`
- **数据库**: `MySQL`
- **权限与鉴权**: `RBAC` · `Casdoor`
- **质量与监控**: `Sentry` · `Source Map` · `Session Replay`

</div>

</div>

## 💼 工作经历

### 🏢 格科微电子（上海）有限公司

**职位**: Web 前端开发  
**时间**: 2024.03 - 至今  

::: details 工作概述
主要参与公司内部项目管理平台、AI 智能对话系统以及 Wafer 可视化分析大屏等产品的前端设计与开发。
:::

**主要职责**:
- 参与 `GC-Team`、`智芯Chat`、`Wafer 可视化大屏` 等项目的前端开发
- 负责制定 `commitizen` 提交规范、小型 PR 规范和团队 Review Checklist
- 使用 Cursor Rules、MCP、Skills 提升团队研发一致性与开发效率
- 持续推进代码复用、性能优化以及构建链路升级
- 负责新项目工程配置，并推动老项目从 `Webpack` 迁移到 `Vite`

## 🎯 项目经历

### 📋 GC-Team 项目管理系统

**项目简介**: 日活 5000+ 的公司内部协作平台，涵盖项目管理、工时管理、任务管理、文件管理与协作文档等核心能力。

**技术栈**: `Vue 3` `Pinia` `Vite` `TypeScript`

**主要贡献**:
- 🎨 基于 `Movable` 与 `SVG` 实现图片标注功能，解决缩放下坐标映射和偏移问题
- 🔐 对接 `Casdoor` 完成单点登录和无感刷新凭证，落地企业级 `RBAC` 权限控制
- 📊 推动前端错误监控从自研 SDK 升级到 `Sentry`，线上问题定位效率显著提升
- 📤 设计并实现分片上传、秒传、断点续传的大文件上传系统
- ⚡ 负责性能优化，通过 chunk 拆分和无效分支消除将首页 `FCP` 从 `2.7s` 降到 `1.3s`

### 🤖 智芯 AI 智能对话

**项目简介**: 面向企业内部知识库的 AI 智能助手，支持多模态交互、上下文感知和个性化对话管理。

**技术栈**: `Vue 3` `TypeScript` `Vite` `Pinia`

**主要贡献**:
- 🌊 基于 `SSE` 实现流式响应，支持逐字渲染、请求中断和连接状态管理
- 🎤 集成 `AudioContext` 与 `WebSocket`，实现语音输入输出与 `VAD` 静音检测
- 🖼️ 结合 `Canvas API` 实现图片上传分析，构建多模态对话能力
- 🧵 使用 `Web Worker` 优化 Markdown 最终解析，提升流式渲染体验
- 🧩 设计多会话管理、导出分享、全文搜索和模板系统，提升知识复用效率

### 📊 Wafer 分析可视化大屏

**项目简介**: 芯片 Wafer 报表与可视化分析平台，包含报表中心、数据大屏和智能 BI 等模块。

**技术栈**: `React` `Zustand` `Vite` `TypeScript`

**主要贡献**:
- 📈 使用策略模式统一图表生成逻辑，并通过 `Zustand` 解耦数据管理
- 📐 采用 `sass + vw + Grid` 替换 `transform scale` 方案，解决大屏事件热区偏移问题
- 🔄 借助 `BFF` 服务聚合接口，并用 `SSE` 接收服务端推送实现动态数据更新
- 🚀 通过抽样、分块渲染、`Web Worker`、虚拟列表等手段优化密集图表性能

## 🎓 教育背景

### 🏫 本科教育

**学校**: 江西师范大学  
**专业**: 软件工程  
**时间**: 2020.09 - 2024.06  
**类型**: 本科

::: tip 荣誉与成绩
- 参与季度/年度技术分享，三个季度获得 A 绩效
- 中国计算机设计大赛国家三等奖
- 中国高校计算机网络技术挑战赛华中二等奖
- 米兰设计周省三
- 深圳国际金融科技大赛十强
:::

## 🎯 技能亮点

::: tip 核心优势
- 🚀 **工程化能力**: 能独立完成前端工程配置、构建优化和规范落地
- ⚡ **性能优化**: 具备首屏优化、大文件上传、图表性能调优等实战经验
- 🤖 **AI 产品经验**: 参与企业内部 AI Chat、多模态交互和流式渲染系统建设
- 🔍 **问题定位**: 熟悉错误监控、日志分析和线上问题快速排查
:::

## 💡 个人特色

- 🎯 **学习能力强**: 持续关注前端工程化、AI 应用和性能优化方向
- 🤝 **团队协作**: 习惯以规范、Checklist、技术分享推动团队协作效率
- 🔍 **问题解决**: 善于结合业务场景拆解复杂问题并持续优化
- 📝 **技术输出**: 有技术分享、规则沉淀与工具推广经验
- 🎨 **体验意识**: 重视交互细节、性能体验与可维护性

---

::: info 求职意向
目前正在寻找 **前端工程师** 相关岗位，希望继续深耕工程化建设、复杂业务系统与 AI 应用方向，在高质量交付中持续提升技术深度。
:::

---

<div class="resume-footer">
  <p class="thank-you">感谢您花时间阅读我的简历，期待与您的进一步交流！</p>
  <p class="update-time">最后更新时间: 2025年</p>
</div>

<style scoped>
/* 简历头部样式 */
.resume-header {
  text-align: center;
  padding: 2rem 0;
  border-bottom: 2px solid var(--vp-c-divider);
  margin-bottom: 2rem;
}

.vp-doc {
  width: 100%;
}

.header-badge {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.badge {
  display: inline-block;
  padding: 0.4rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  transition: transform 0.2s ease;
}

.badge:hover {
  transform: translateY(-2px);
}

/* 技能标签优化 */
.skills-section {
  margin: 2rem 0;
}

.skill-tags code {
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border: 1px solid var(--vp-c-brand);
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.skill-tags code:hover {
  background: linear-gradient(135deg, #667eea25 0%, #764ba225 100%);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
}

/* 项目经历增强 */
.vp-doc h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--vp-c-divider);
  margin-top: 2rem;
}

/* 公司简介样式 */
.vp-doc details {
  margin: 1rem 0;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 3px solid var(--vp-c-brand);
}

/* 列表项优化 */
.vp-doc li {
  margin: 0.5rem 0;
  line-height: 1.8;
}

/* 表格美化 */
.vp-doc table {
  table-layout: fixed;
}

.vp-doc table th,
.vp-doc table td {
  width: 50%;
}

.vp-doc table {
  width: 100%;
  margin: 1.5rem 0;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.vp-doc table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  padding: 1rem;
}

.vp-doc table td {
  padding: 0.8rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.vp-doc table tr:hover td {
  background: var(--vp-c-bg-soft);
}

/* 简历底部样式 */
.resume-footer {
  text-align: center;
  padding: 2rem 0;
  margin-top: 3rem;
  border-top: 2px solid var(--vp-c-divider);
}

.thank-you {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.update-time {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  opacity: 0.7;
}

/* 信息容器增强 */
.vp-doc .info.custom-block {
  border-left: 4px solid var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-radius: 8px;
}

.vp-doc .tip.custom-block {
  border-left: 4px solid #42b983;
  background: rgba(66, 185, 131, 0.1);
  padding: 1.5rem;
  border-radius: 8px;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .resume-header {
    padding: 1rem 0;
  }
  
  .header-badge {
    flex-direction: column;
    align-items: center;
  }
  
  .badge {
    font-size: 0.85rem;
    padding: 0.3rem 0.8rem;
  }
  
  .vp-doc table {
    font-size: 0.9rem;
  }
  
  .vp-doc table th,
  .vp-doc table td {
    padding: 0.6rem 0.8rem;
  }
}

/* 打印样式优化 */
@media print {
  .resume-header,
  .resume-footer {
    page-break-inside: avoid;
  }
  
  .badge {
    background: #667eea !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
