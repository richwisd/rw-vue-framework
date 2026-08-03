---
title: 项目约束
---

# 项目约束

使用 rw-vue-framework 开发项目时，需要遵循以下约束，以确保框架的正常运行和团队协作的一致性。

## 初始化约束

1. **全局配置初始化**：必须在应用启动时调用 `useAppConfigStore().getFromRemote(url)` 初始化全局配置。
2. **本地设置初始化**：必须调用 `useLocalSettingStore().init()` 并配合 `ElConfigProvider` 完成主题、语言、尺寸的初始化。
3. **国际化初始化**：必须在使用任何组件前完成 i18n 的初始化（`initi18n()` + `mergeLocaleMessages()`）。

## 命名规范

1. **语言包命名**：遵循 `moduleName + name` 命名规范，`moduleName` 在系统中保持唯一，避免语言包冲突。
2. **控件命名**：每个控件通过 `RwXxx.init(moduleName, name, options)` 初始化，`name` 在同一 `moduleName` 下保持唯一。

## 目录结构约束

1. **pages 目录**：每个页面模块下必须包含 `langs` 目录，用于存放该模块的多语言文件。
2. **langs 目录**：每个 `langs` 下的 `index.ts` 结构保持一致，统一通过 `mergeLocaleMessage` 注册语言包。

## 组件使用约束

1. **统一导入**：组件统一从 `rw-vue-framework/controls` 导入，Element Plus 组件从 `rw-vue-framework/element-plus` 导入。
2. **配置驱动**：所有控件通过 `init` 函数创建配置对象，再通过 `<RwXxx.Template :control="..." />` 渲染，不直接在模板中硬编码属性。
3. **图标使用**：图标从 `rw-vue-framework/element-plus` 导入，并使用 `markRaw` 包装以避免响应式开销。
