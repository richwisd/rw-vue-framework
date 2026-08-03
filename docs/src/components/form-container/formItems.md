---
outline: deep
title: FormItems 表单项
---

# FormItems 表单项

表单项容器，用于管理一组表单控件，提供丰富的 `addXxx` 方法快速添加各类控件。通常由 `RwForm.addFormItems` 间接创建，也可单独使用。

## 引入

```ts
import { RwFormItems } from 'rw-vue-framework/controls'
```

## 基础用法

```ts
import { RwFormItems } from 'rw-vue-framework/controls'
import { pageStruct } from 'rw-vue-framework/controls'

const struct = pageStruct.init('demo', '1', '/api/demo')

const formItems = RwFormItems.init(struct, { labelWidth: '100px' })
formItems.addInput('name', { check: 'username' })
formItems.addSelect('status', { lists: [{ label: '启用', value: 1 }] })
formItems.addDate('createTime')
formItems.addSwitch('enabled')
formItems.addDivider('divider1')
formItems.addNull(12)  // 占位
```

## API

### init 参数

```ts
function init(
  struct: pageStruct.OptionT,
  options?: Partial<OptionT>
): OptionT
```

| 参数    | 说明                          | 类型               | 默认值 |
| ------- | ----------------------------- | ------------------ | ------ |
| struct  | 页面结构对象                  | pageStruct.OptionT | -      |
| options | 选项对象                      | Partial\<OptionT\> | -      |

### addXxx 方法

| 方法名            | 说明                          |
| ----------------- | ----------------------------- |
| add               | 通用添加（指定 controlType）  |
| addText           | 文本                          |
| addInput          | 输入框                        |
| addInputTag       | 标签输入                      |
| addTag            | 动态标签（TagComp）           |
| addSwitch         | 开关                          |
| addDivider        | 分割线                        |
| addSelect         | 选择器                        |
| addMergeSelect    | 合并选择器                    |
| addSlider         | 滑块                          |
| addDate           | 日期选择                      |
| addMap            | 地图                          |
| addUpload         | 上传                          |
| addTree           | 树形控件                      |
| addComponent      | 自定义组件                    |
| addTable          | 表格                          |
| addTextMultiLang  | 多语言文本                    |
| addNull           | 空占位（指定 span）           |
| findItem          | 按 name 查找表单项            |

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type OptionT = baseT & {
  id: string
  type: 'form' | 'search'
  inDialog: boolean
  labelWidth: string | number
  formItems: FormItemT[]
  rowProps: Partial<Mutable<RowProps>>
  change: (value: any, changeName: string, data: any) => void
  findItem: (name: string) => FormItemT | null
  add: (type: string, name: string, options?: Partial<ExtendedControlOptionT>) => FormItemT | null
  addText: (name, options?) => FormItemT | null
  addInput: (name, options?) => FormItemT | null
  addInputTag: (name, options?) => FormItemT | null
  addTag: (name, optionFrom, optionValues, options?) => FormItemT | null
  addSwitch: (name, options?) => FormItemT | null
  addDivider: (name, options?) => FormItemT | null
  addSelect: (name, options?) => FormItemT | null
  addMergeSelect: (name, optionFrom, optionValues, options?) => FormItemT | null
  addSlider: (name, options?) => FormItemT | null
  addDate: (name, options?) => FormItemT | null
  addMap: (name, options?) => FormItemT | null
  addUpload: (name, options?) => FormItemT | null
  addTree: (name, options?) => FormItemT | null
  addComponent: (name, component, options?) => FormItemT | null
  addTable: (name, tableForm, options?) => FormItemT | null
  addTextMultiLang: (name, options?) => FormItemT | null
  addNull: (span: number) => FormItemT | null
  model?: Record<string, any>
  'onUpdate:model'?: (value: Record<string, any>) => void
}
```

## 注意事项

- 推荐通过 `RwForm.addFormItems` 间接创建，以便自动注册到表单的 `contentsMap` 中实现快速查找。
- 每个表单项的 `span` 控制栅格宽度（24 栅格制）。
- `addNull(span)` 用于在表单中插入空占位，实现布局对齐。
