---
outline: deep
title: Select 选择器
---

# Select 选择器

下拉选择器，扩展自 Element Plus 的 `ElSelect`，支持分组、全选、远程接口加载等增强功能。

## 引入

```ts
import { RwSelect } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/selectDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/selectDemo.vue{vue}

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

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type OptionT = SelectProps & SelectEmits & baseT & {
  lists: listT[]              // 选项列表
  showCheckAll: boolean       // 全选（需 multiple 为 true）
  groupBy: string             // 分组字段
  remoteUrl: string           // 远程接口地址
  paramName: string           // 远程接口参数名（默认 'query'）
  isModel: boolean
  optionTemplate: any         // 选项插槽
  tagTemplate: any            // 标签插槽
  empty: any                  // 空内容插槽
  prefix: any                 // 前缀插槽
}

type listT = {
  value: string | number | boolean | object
  label?: string | number
  disabled?: boolean
  [key: string]: any
}
```

## 注意事项

- 使用远程接口时，设置 `remoteUrl` 属性自动加载选项。
- 使用分组时，设置 `groupBy` 属性按字段分组。
- 使用全选时，需同时设置 `showCheckAll: true` 和 `multiple: true`。
