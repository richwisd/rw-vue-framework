---
outline: deep
title: Search 搜索区
---

# Search 搜索区

搜索区组件，用于列表页面的搜索条件区域，内部封装了 `RwFormItems` 与按钮组（搜索 / 重置），并提供 `getSearchData` 将搜索条件转换为查询条件数组。

## 引入

```ts
import { RwSearch } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../demos/src/pages/controls/searchDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/controls/searchDemo.vue{vue}

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

| 方法名          | 说明                       |
| --------------- | -------------------------- |
| add             | 通用添加（指定 controlType）|
| addInput        | 输入框                     |
| addSelect       | 选择器                     |
| addDate         | 日期选择                   |
| addSwitch       | 开关                       |
| addBetween      | 范围选择                   |
| addMergeSelect  | 合并选择器                 |
| getSearchData   | 将数据转为查询条件数组     |

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type OptionT = baseT & {
  struct?: pageStruct.OptionT
  labelWidth?: string | number
  formItems: RwFormItems.OptionT
  buttons?: RwButtonGroup.OptionT
  complex: complexT
  defaultData: Record<string, any>
  getSearchData: (data: any) => Record<string, any>
  add: (type, name, complex, options?) => RwFormItems.OptionT | null
  addInput: (name, complex, options?) => RwFormItems.OptionT | null
  addSelect: (name, complex, options?) => RwFormItems.OptionT | null
  addDate: (name, complex, options?) => RwFormItems.OptionT | null
  addSwitch: (name, complex, options?) => RwFormItems.OptionT | null
  addBetween: (name, complex, options?) => RwFormItems.OptionT | null
  addMergeSelect: (name, complex, optionFrom, optionValues, options?) => RwFormItems.OptionT | null
}
```

## 注意事项

- 默认带有「搜索」和「重置」按钮，分别对应 `search` / `reset`。
- `complex` 指定查询匹配方式（如 `like` / `=` / `>=` / `<` 等）。
- 日期范围类型会被 `getSearchData` 自动拆分为「>=」与「<」两个条件。
- 通常由 `RwPageTable` 内部创建，无需手动实例化。
