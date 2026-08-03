---
outline: deep
title: Watermark 水印
---

# Watermark 水印

水印组件，扩展自 Element Plus 的 `ElWatermark`，给页面或区域添加水印保护，兼容其全部属性。

## 引入

```ts
import { RwWatermark } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/watermarkDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/watermarkDemo.vue{vue}

## API

### init 参数

```ts
function init(
  modularName: string,
  name: string,
  options?: Partial<OptionT>
): Partial<OptionT>
```

| 参数        | 说明 | 类型 | 默认值 |
| ----------- | ---- | ---- | ------ |
| modularName | 模块名 | string | - |
| name        | 控件名 | string | - |
| options     | 选项对象 | Partial\<OptionT\> | - |

::: warning
该组件 init 第一个参数为 `modularName`（注意拼写）。
:::

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type OptionT = WatermarkProps & baseT & {
  modularName: string
  name: string
}
```

## 注意事项

- `content` 设置水印文本，支持数组多行。
- `font` / `gap` / `offset` / `rotate` 等属性与 Element Plus 一致。
