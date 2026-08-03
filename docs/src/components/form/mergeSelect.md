---
outline: deep
title: MergeSelect 合并选择器
---

# MergeSelect 合并选择器

合并选择器是框架的核心控件之一，能够根据选项数量自动决定渲染为 `select` / `radio` / `checkbox` / `switch` / `treeSelect`，支持从键值对、接口、变量三种来源加载选项。

## 引入

```ts
import { RwMergeSelect } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/mergeSelectDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/mergeSelectDemo.vue{vue}

## API

### init 参数

```ts
function init(
  moduleName: string,
  name: string,
  optionFrom: optionFromT,
  optionValues: optionValuesT | string,
  options?: Partial<OptionT>
): Partial<OptionT>
```

| 参数         | 说明                                   | 类型                              | 默认值 |
| ------------ | -------------------------------------- | --------------------------------- | ------ |
| moduleName   | 模块名                                 | string                            | -      |
| name         | 控件名                                 | string                            | -      |
| optionFrom   | 选项来源                               | `'keyValue' \| 'api' \| 'variable'` | -      |
| optionValues | 选项数据；传字符串时作为接口 url       | `optionValuesT \| string`         | -      |
| options      | 选项对象                               | Partial\<OptionT\>                | -      |

### 自动类型推断规则

当未显式指定 `options.type` 且 `optionValues` 存在时，按选项数量自动选择控件类型：

| 选项数量 | multiple=false | multiple=true |
| -------- | -------------- | ------------- |
| 1        | switch         | switch        |
| 2~5      | radio          | checkbox      |
| >5       | select         | select        |

::: tip
设置 `showCheckAll: true` 时强制使用 `select` 类型。
:::

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type optionFromT = "keyValue" | "api" | "variable"

type OptionT = (treeSelectT | RwSelect.OptionT) & {
  type: 'select' | 'radio' | 'checkbox' | 'switch' | 'treeSelect'
  checkBoxType: boolean
  optionFrom: optionFromT
  optionValues: optionValuesT
  url: string
  valueKey: string
  labelKey: string
  editId: string | number
  nodeKey: string
  remoteParamKey: string
  showCheckAll: boolean
  optionTemplate: any
  tagTemplate: any
  labelShow: boolean
  isModel: boolean
  params: any
  showImage: boolean
  showOpsTemplate: boolean
  opsTemplateHeight: string
  opsTemplateWidth: string
  onChange?: (val: any) => any
}
```

## 注意事项

- `optionFrom: 'api'` 时通过接口加载，`optionValues` 传入接口地址字符串。
- `optionFrom: 'keyValue'` 时直接使用 `optionValues` 数组。
- 自动类型推断让表单在不同数据量下获得最佳交互体验，无需手动切换组件。
