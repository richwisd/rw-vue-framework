---
outline: deep
title: Divider 分割线
---

# Divider 分割线

分割线组件，扩展自 Element Plus 的 `ElDivider`，用于区隔内容区块，兼容其全部属性。

## 引入

```ts
import { RwDivider } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../demos/src/pages/controls/dividerDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/controls/dividerDemo.vue{vue}

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
type OptionT = DividerProps & baseT & {
  default: any
  text: string
}
```

## 注意事项

- `text` 用于设置分割线上的文字内容，配合 `content-position` 控制位置。
- 其余属性（`direction`、`borderStyle` 等）与 Element Plus `ElDivider` 一致。
