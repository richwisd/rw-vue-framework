# rw-vue-framework 文档完善计划

## Context

项目从 `rw-element-admin`（多包仓库）收敛为单一包 `rw-vue-framework`（tsdown 打包，13 个子路径导出）。docs 目录是 VitePress 文档站，但配置和内容仍是旧名 `rw-element-admin`，组件文档为空（仅 VitePress 模板）。playground 有 52 个 controls demo + 8 个页面/query demo。

**目标**：修改已有文档（改名）、为全部 67 个组件 + 8 个示例创建文档，以"渲染 + 源码"两者结合的方式引入 playground demo。

## 依赖链关键发现

- playground `main.ts` 注册：`ElementPlus`（rw-vue-framework/element-plus）、`store`（rw-vue-framework/stores，pinia）、`i18n`（playground/i18n，调用 rw-vue-framework/locale 的 `initi18n`）、`VueQueryPlugin`
- demo 的 `./langs` 调用 `mergeLocaleMessage`，依赖 i18n 已初始化
- demo 外部依赖仅：`rw-vue-framework/*`、`vue`、`@tanstack/vue-query`（仅 query demo）、`js-cookie`（i18n 初始化）
- docs 需在 theme 中初始化 i18n + pinia + ElementPlus 后才能渲染 demo

## 执行步骤

### 阶段 1：配置 docs 项目

1. **`pnpm-workspace.yaml`**：新增 `'docs'` 到 packages
2. **`docs/package.json`**：name 改 `@rw-vue-framework/docs`，移除所有 `@rw-element-admin/*`，添加 `rw-vue-framework: workspace:*`、`vue`、`@tanstack/vue-query`、`js-cookie`、`element-plus`、`vitepress`
3. **`docs/tsconfig.json`**：paths 改为 `rw-vue-framework` 指向 `../`
4. **`docs/.vitepress/config/index.mts`**：
   - 删除 `import cn from '@rw-element-admin/locale/lang/cn'`
   - 修复 `./nav.mjs` → `./nav.mts`
   - title/description 改 `rw-vue-framework`
   - 新增 `vite.server.fs.allow` 允许读取项目根
   - 新增 `vite.resolve.alias`：`@` → `../../playground/src`（demo 中可能用到）
   - socialLinks 更新为 gitee 仓库
5. **`docs/.vitepress/theme/index.ts`**（新建）：初始化 i18n（`initi18n` + `mergeLocaleMessages`）、注册 pinia store、ElementPlus、VueQueryPlugin、引入 `rw-vue-framework/style.css`
6. **`pnpm install`** 验证 workspace 链接

### 阶段 2：修改已有文档（改名）

7. `docs/src/index.md`：hero name 改名，actions link 改为 `/guide/` 和 `/guide/quickStart`
8. `docs/src/guide/index.md`：`rw-element-admin` → `rw-vue-framework`
9. `docs/src/guide/quickStart.md`：包名改、import 路径改 `rw-vue-framework/stores`、修复重复声明 bug
10. `docs/src/guide/locale.md`：`@rw-element-admin/locale` → `rw-vue-framework/locale`
11. `docs/src/guide/constraint.md`：补充最小正文
12. `docs/src/components/index.md`：重写为组件总览页

### 阶段 3：创建 DemoBlock 组件 + 样板验证

13. **`docs/src/components/DemoBlock.vue`**（新建）：接收 `comp` prop（Vue 组件），渲染 demo + 可折叠源码区
14. **样板 3 个**：`button.md`、`input.md`、`select.md`，格式：
    ```md
    <script setup>
    import Demo from '../../../../playground/src/pages/controls/buttonDemo.vue'
    </script>
    <Demo />
    <<< ../../../../playground/src/pages/controls/buttonDemo.vue
    ```
15. `pnpm --filter docs dev` 启动验证 3 个样板可渲染 + 源码展示

### 阶段 4：批量生成组件文档

16. 创建分类目录：`basic/`、`form/`、`form-container/`、`feedback/`、`navigation/`、`data-display/`、`page/`
17. 批量生成 67 个组件文档（47 个有 demo 用 import + `<<<`，20 个无 demo 手写最小示例）
18. 生成 2 个 pages 文档（appConfig、localSetting）+ 2 个 layout 文档
19. 生成 5 个 demos/pages 文档 + 3 个 demos/query 文档

### 阶段 5：侧边栏与收尾

20. **`docs/.vitepress/config/sidebar.mts`**（新建）：71 组件 + 8 demo 条目，按 8 个分组组织
21. `index.mts` 引入 sidebar
22. `nav.mts` 微调（"组件" → `/components/`）
23. 删除 `docs/src/TestIndex.vue`（未引用）

### 阶段 6：验证

24. `pnpm --filter docs dev` 全面验证：
    - 首页 hero、actions 正确
    - 4 个 guide 页无旧名
    - 组件文档 demo 可渲染 + 源码展示
    - 侧边栏所有 link 可达、无 404
25. 修复死链与渲染问题

## 文档模板（每个组件 md）

```md
---
outline: deep
title: Button 按钮
---
# Button 按钮
组件说明（1-2 句）。

## 引入
```ts
import { RwButton } from 'rw-vue-framework/controls'
```

## 基础用法
<script setup>
import Demo from '../../../../playground/src/pages/controls/buttonDemo.vue'
</script>
<Demo />
<<< ../../../../playground/src/pages/controls/buttonDemo.vue

## API
### init(moduleName, name, options?)
| 参数 | 说明 | 类型 | 默认值 |
### Template Props
| control | Partial<OptionT> | - |
### OptionT
```ts
type OptionT = ...（从源码 .ts 提取）
```
```

## 侧边栏分组（8 组）

| 分组 | 数量 | 代表组件 |
|---|---|---|
| 基础组件 | 7 | button, buttonGroup, text, divider, tag, tagComp, smallComp |
| 表单输入 | 18 | input, select, checkbox, radio, switch, slider, date, transfer... |
| 表单容器 | 3 | form, formItems, search |
| 反馈组件 | 13 | alert, message, dialog, drawer, notification, popconfirm... |
| 导航组件 | 8 | breadcrumb, dropdown, tabs, steps, backtop, affix, pagination |
| 数据展示 | 14 | table, descriptions, badge, avatar, card, carousel, timeline... |
| 页面组件 | 4 | pageBase, pageForm, pageTable, pageStruct |
| 页面级 | 2 | appConfig, localSetting |

## 风险与对策

| 风险 | 对策 |
|---|---|
| demo 依赖 i18n 已初始化 | theme/index.ts 中先 `initi18n()` + `mergeLocaleMessages` |
| 部分 demo 互相 import（buttonDemo→formDemo） | 相对路径自动解析，无需额外处理 |
| demo 用了 `@/` alias | vitepress 配置 `@` → playground/src |
| 20 个无 demo 组件 | 手写最小示例（参考源码 init 默认值） |
| `<<<` 引入 .vue 高亮 | 显式 `<<< path vue` |
