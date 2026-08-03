---
outline: deep
title: TabPane 标签面板
---

# TabPane 标签面板

标签面板项，扩展自 Element Plus 的 `ElTabPane`，作为 `RwTabs` 的子项，提供 `addFormItems` / `addTabs` 方法组织面板内容。

## 引入

```ts
import { RwTabPane } from 'rw-vue-framework/controls'
```

## 基础用法

通常由 `RwTabs.addTabPane` 间接创建，无需手动实例化。单独使用时：

```ts
import { RwTabPane } from 'rw-vue-framework/controls'
import { pageStruct } from 'rw-vue-framework/controls'

const struct = pageStruct.init('demo', '1', '/api/demo')

const pane = RwTabPane.init('controls', 'basic')
pane.addFormItems(struct, { labelWidth: '100px' })
```

## API

### init 参数

```ts
function init(
  moduleName: string,
  name: string,
  options?: Partial<OptionT>
): OptionT
```

| 参数       | 说明 | 类型 | 默认值 |
| ---------- | ---- | ---- | ------ |
| moduleName | 模块名 | string | - |
| name       | 控件名 | string | - |
| options    | 选项对象 | Partial\<OptionT\> | - |

### 实例方法

| 方法名        | 说明                              |
| ------------- | --------------------------------- |
| addFormItems  | 添加一组表单项                    |
| addTabs       | 添加子标签页                      |

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type OptionT = TabPaneProps & baseT & {
  id: string
  inDialog: boolean
  contents: Array<RwFormItems.OptionT | RwTabs.OptionT>
  tabPaneProps: Partial<TabPaneProps>
  addFormItems: (struct: pageStruct.OptionT, options?: Partial<RwFormItems.OptionT>) => void
  addTabs: (options?: Partial<RwTabs.OptionT>) => void
}
```

## 注意事项

- 推荐通过 `RwTabs.addTabPane` 间接创建，避免手动维护 `contents` 数组。
- `contents` 中可混合 `FormItems` 与子 `Tabs`，实现复杂分区布局。
