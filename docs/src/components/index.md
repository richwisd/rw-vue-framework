---
outline: deep
---

# 组件总览

rw-vue-framework 共提供 67 个控件、2 个页面组件、2 个布局模板，所有组件统一遵循 `RwXxx.init(moduleName, name, options?)` 工厂模式，并通过 `<RwXxx.Template :control="..." />` 渲染。

## 组件 API 模式

每个组件都遵循统一的 API 模式：

```ts
import { RwButton } from 'rw-vue-framework/controls'

// 1. 创建控件配置
const button = RwButton.init(moduleName, 'save', {
  // Element Plus 原生属性 + 框架扩展属性
  type: 'primary',
  default: '保存'
})

// 2. 渲染
<RwButton.Template :control="button" />
```

## 导入方式

```ts
// 框架控件
import { RwButton, RwInput, RwSelect } from 'rw-vue-framework/controls'

// Element Plus 原生组件 + 图标
import { ElMessage, Search } from 'rw-vue-framework/element-plus'

// Pinia 状态管理
import { createPinia, defineStore } from 'rw-vue-framework/pinia'

// 国际化
import { createI18n, useI18n } from 'rw-vue-framework/vue-i18n'
```

请通过左侧导航选择具体组件查看用法。
