---
outline: deep
title: Autocomplete 自动补全
---

# Autocomplete 自动补全

自动补全输入框，扩展自 Element Plus 的 `ElAutocomplete`，兼容其全部属性与事件，并扩展了多语言 placeholder。

## 引入

```ts
import { RwAutocomplete } from 'rw-vue-framework/controls'
```

## 基础用法

```vue
<script setup>
import { RwAutocomplete } from 'rw-vue-framework/controls'
const restaurants = [
  { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
  { value: 'Hot honey 首尔炸鸡', address: '上海市浦东新区' }
]
const auto = RwAutocomplete.init('controls', 'shop', {
  fetchSuggestions: (queryString: string, cb: any) => {
    cb(queryString
      ? restaurants.filter(r => r.value.includes(queryString))
      : restaurants)
  }
})
</script>

<template>
  <RwAutocomplete.Template :control="auto" />
</template>
```

## API

### init 参数

```ts
function init(
  moduleName: string,
  name: string,
  options?: Partial<OptionT>
): Partial<OptionT>
```

| 参数       | 说明 | 类型 | 默认值 |
| ---------- | ---- | ---- | ------ |
| moduleName | 模块名 | string | - |
| name       | 控件名 | string | - |
| options    | 选项对象 | Partial\<OptionT\> | - |

::: tip
未传入 `placeholder` 时，组件会自动拼接为「请输入 + 多语言字段名」。
:::

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type OptionT = AutocompleteProps & AutocompleteEmits & baseT & {
  placeholder: string
  default: any
  loadingSlot: any
  prepend: any   // 前置插槽
  append: any    // 后置插槽
  prefix: any    // 前缀插槽
  suffix: any    // 后缀插槽
}
```

## 注意事项

- `fetchSuggestions` 是核心属性，用于提供补全数据源，签名与 Element Plus 一致。
- placeholder 默认根据 `moduleName.name` 自动生成多语言文案。
