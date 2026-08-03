---
outline: deep
title: Tabs 标签页
---

# Tabs 标签页

标签页组件，扩展自 Element Plus 的 `ElTabs`，提供 `addTabPane` / `addTabPaneSimple` 方法动态组织标签页内容，支持嵌套 FormItems 与子 Tabs。

## 引入

```ts
import { RwTabs } from 'rw-vue-framework/controls'
```

## 基础用法

```ts
import { RwTabs } from 'rw-vue-framework/controls'
import { pageStruct } from 'rw-vue-framework/controls'

const struct = pageStruct.init('demo', '1', '/api/demo')

const tabs = RwTabs.init()
tabs.addTabPane('controls', 'basic', formItems1)   // 传入已创建的 FormItems
tabs.addTabPane('controls', 'adv', formItems2)
tabs.addTabPaneSimple('controls', 'desc')         // 自动创建空 FormItems
```

## API

### init 参数

```ts
function init(options?: Partial<OptionT>): OptionT
```

| 参数    | 说明     | 类型               | 默认值 |
| ------- | -------- | ------------------ | ------ |
| options | 选项对象 | Partial\<OptionT\> | -      |

::: tip
`RwTabs` 仅需 `options`，无需 `moduleName` / `name`。
:::

### 实例方法

| 方法名            | 说明                                          |
| ----------------- | --------------------------------------------- |
| addTabPane        | 添加标签页，传入内容（FormItems / Tabs / 数组）|
| addTabPaneSimple  | 添加一个自动创建空 FormItems 的标签页         |

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type OptionT = TabsProps & TabsEmits & baseT & {
  id: string
  inDialog: boolean
  tabPanes: RwTabPane.OptionT[]
  defaultValue: string | number
  addTabPaneSimple: (moduleName, name, options?) => any
  addTabPane: (moduleName, name, contents, options?) => any
}
```

## 注意事项

- `addTabPane` 的 `contents` 支持单个或数组形式的 `RwFormItems.OptionT` / `RwTabs.OptionT`，支持无限嵌套。
- 通常作为表单的内容分区，由 `RwForm.addTabs` 间接添加。
- `inDialog: true` 时标签页行为会适配弹窗场景。
