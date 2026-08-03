---
outline: deep
title: Empty 空状态
---

# Empty 空状态

空状态组件，扩展自 Element Plus 的 `ElEmpty`，兼容其全部属性。

## 引入

```ts
import { RwEmpty } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/emptyDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/emptyDemo.vue{vue}

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
type OptionT = EmptyProps & baseT & {
  moduleName: string
  name: string
  default: any
  image: any
  description: any
}
```

## 注意事项

- `image` 可设置为自定义图片地址，或使用 `image-size` 控制图片大小。
- `description` 用于设置描述文字。
