---
outline: deep
title: Image 图片
---

# Image 图片

图片组件，扩展自 Element Plus 的 `ElImage`，兼容其全部属性与事件，并默认开启大图预览（`preview-teleported`）。

## 引入

```ts
import { RwImage } from 'rw-vue-framework/controls'
```

## 基础用法

```vue
<script setup>
import { RwImage } from 'rw-vue-framework/controls'
const img = RwImage.init('controls', 'cover', {
  src: 'https://example.com/cover.png',
  fit: 'cover'
})
</script>

<template>
  <RwImage.Template :control="img" />
</template>
```

## API

### init 参数

```ts
function init(
  modularName: string,
  name: string,
  options?: Partial<OptionT>
): OptionT
```

| 参数        | 说明 | 类型 | 默认值 |
| ----------- | ---- | ---- | ------ |
| modularName | 模块名 | string | - |
| name        | 控件名 | string | - |
| options     | 选项对象 | Partial\<OptionT\> | - |

::: warning
该组件 init 第一个参数为 `modularName`（注意拼写），与其它组件的 `moduleName` 不同。
:::

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type OptionT = baseT & ImageProps & ImageEmits & {
  isPreview: boolean   // 是否开启大图预览
  placeholder: any
  error: any
  viewer: any
  progress: any
  toolbar: any
}
```

## 注意事项

- 默认 `isPreview: true`、`preview-teleported: true`，开启大图预览并传送至 body。
- 当 `preview-src-list` 为空数组时，自动将当前 `src` 加入预览列表。
- `fit` 支持 `fill` / `contain` / `cover` / `none` / `scale-down`。
