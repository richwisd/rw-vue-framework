---
outline: deep
title: Table 表格
---

# Table 表格

表格组件，扩展自 Element Plus 的 `ElTable`，采用配置驱动方式，通过 `addXxx` 方法快速添加各类列，并集成行按钮、表头按钮、排序、分页查询等能力。

## 引入

```ts
import { RwTable } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/tableDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/tableDemo.vue{vue}

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

| 方法名           | 说明                       |
| ---------------- | -------------------------- |
| add              | 通用添加（指定 controlType）|
| addInput         | 输入框列                   |
| addMobile        | 手机号列                   |
| addText          | 文本列                     |
| addImage         | 图片列                     |
| addDate          | 日期列                     |
| addTag           | 标签列                     |
| addNumber        | 数字列                     |
| addSwitch        | 开关列                     |
| addTextMultiLang | 多语言文本列               |
| addSelect        | 选择器列                   |
| addUpload        | 上传列                     |
| addMergeSelect   | 合并选择器列               |

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type OptionT = baseT & TableProps<any> & {
  indexWidth: number
  selectionWidth: number
  showIndex: boolean
  showCheckAll: boolean
  lineButtons: RwButtonGroup.OptionT        // 行操作按钮
  headerLineButtons: RwButtonGroup.OptionT  // 表头行按钮
  allForm: boolean
  changeForm?: (val: any, name: string, scope) => void
  otherButtons: RwButtonGroup.OptionT
  lineButtonWidth?: string | number
  columns: columns.OptionT[]
  clickRow: infoI
  selectionRows: infoI[]
  loading: boolean
  struct: pageStruct.OptionT
  showEdit: boolean
  debug: boolean
  canSort: boolean
  sortField: string
  sortOrder: string
  loadLast: (data: infoI[]) => infoI[]
  onLoad: (loadData: {
    queryPage: { page: number; pageSize: number }
    queryOrder: { orderBy?: string; isDescending: boolean }
    searchList: any[]
    [key: string]: any
  }) => any
  add: (type, name, options?, isModel?) => columns.OptionT | null
  addInput: (name, options?) => columns.OptionT | null
  addMobile: (name, options?) => columns.OptionT | null
  addText: (name, options?) => columns.OptionT | null
  addImage: (name, options?) => columns.OptionT | null
  addDate: (name, options?) => columns.OptionT | null
  addTag: (name, options?) => columns.OptionT | null
  addNumber: (name, options?) => columns.OptionT | null
  addSwitch: (name, options?) => columns.OptionT | null
  addTextMultiLang: (name, options?) => columns.OptionT | null
  addSelect: (name, options?) => columns.OptionT | null
  addUpload: (name, options?) => columns.OptionT | null
  addMergeSelect: (name, optionFrom, optionValues, options?) => columns.OptionT | null
}
```

## 注意事项

- `showEdit` 为 `true` 时自动添加「编辑」行按钮；`allForm` 为 `true` 时改为在表头添加「新增」按钮。
- `onLoad` 是核心加载回调，接收分页、排序、搜索条件，应返回数据列表。
- `showIndex` / `showCheckAll` 控制序号列与全选框。
- `canSort` 开启列拖拽排序，配合 `sortField` / `sortOrder` 实现服务端排序。
- 通常由 `RwPageTable` 内部创建，无需手动实例化。
