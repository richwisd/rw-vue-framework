---
outline: deep
title: MergeInput 合并输入
---

# MergeInput 合并输入

合并输入组件，通过 `inputType` 在 `input` / `inputNumber` / `autocomplete` / `inputTag` 之间切换，内部委托对应控件的 `init` 函数，类型安全。

## 引入

```ts
import { RwMergeInput } from 'rw-vue-framework/controls'
```

## 基础用法

```vue
<script setup>
import { RwMergeInput } from 'rw-vue-framework/controls'

// 渲染为数字输入框
const num = RwMergeInput.init('controls', 'age', {
  inputType: 'inputNumber',
  min: 0,
  max: 120
})

// 渲染为标签输入
const tags = RwMergeInput.init('controls', 'keywords', {
  inputType: 'inputTag'
})
</script>

<template>
  <RwMergeInput.Template :control="num" />
  <RwMergeInput.Template :control="tags" />
</template>
```

## API

### init 参数

```ts
function init<T extends InputTypeT = 'input'>(
  moduleName: string,
  name: string,
  options?: Partial<OptionT<T>>
): Partial<OptionT<T>>
```

| 参数       | 说明 | 类型 | 默认值 |
| ---------- | ---- | ---- | ------ |
| moduleName | 模块名 | string | - |
| name       | 控件名 | string | - |
| options    | 选项对象（须含 `inputType`） | Partial\<OptionT\> | - |

### inputType 取值

| 值            | 说明                       | 绑定值类型 |
| ------------- | -------------------------- | ---------- |
| input         | 普通输入框（默认）         | string     |
| inputNumber   | 数字输入框                 | number     |
| autocomplete  | 自动补全                   | string     |
| inputTag      | 标签输入                   | string[]   |

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type InputTypeT = 'input' | 'inputNumber' | 'autocomplete' | 'inputTag'

type OptionT<T extends InputTypeT = 'input'> = BaseOptionT & InputTypeProps[T]

type BaseOptionT = {
  inputType: InputTypeT
}
```

::: tip
`OptionT` 是条件类型，根据 `inputType` 动态组合对应输入控件的属性，类型安全。
:::

## 注意事项

- `inputType` 决定底层委托的控件，未传时默认 `'input'`。
- 其余属性与对应输入控件（RwInput / RwInputNumber / RwAutocomplete / RwInputTag）一致。
