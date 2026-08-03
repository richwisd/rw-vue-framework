---
outline: deep
title: Tag 标签
---

# Tag 标签

标签组件，扩展自 Element Plus 的 `ElTag`，用于标记和选择，兼容其全部属性与事件。

## 引入

```ts
import { RwTag } from 'rw-vue-framework/controls'
```

## 基础用法

通过 `RwTag.init(moduleName, name, options)` 创建标签，`default` 可设置标签文本内容。

```vue
<script setup>
import { RwTag } from 'rw-vue-framework/controls'
const tag = RwTag.init('controls', 'status', {
  type: 'success',
  default: '已启用'
})
</script>

<template>
  <RwTag.Template :control="tag" />
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

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type OptionT = TagProps & TagEmits & baseT & {
  default: any
}
```

## 注意事项

- `type` 支持 `primary` / `success` / `info` / `warning` / `danger`，与 Element Plus 一致。
- `default` 支持字符串或 Vue 组件，用于设置标签内容。
- 需要动态管理标签（增删、折叠）时请使用 [TagComp](./tagComp)。
