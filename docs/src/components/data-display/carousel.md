---
outline: deep
title: Carousel 走马灯
---

# Carousel 走马灯

走马灯组件，扩展自 Element Plus 的 `ElCarousel`，兼容其全部属性与事件。

## 引入

```ts
import { RwCarousel } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../demos/src/pages/controls/carouselDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/controls/carouselDemo.vue{vue}

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
type OptionT = CarouselProps & CarouselEmits & baseT & {
  default: any
  moduleName: string
  name: string
}
```

## 注意事项

- `type` 支持 `card`，`direction` 支持 `horizontal` / `vertical`。
- `autoplay` / `interval` / `loop` 等属性与 Element Plus 一致。
