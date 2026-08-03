---
outline: deep
title: InfiniteScroll 无限滚动
---

# InfiniteScroll 无限滚动

无限滚动指令组件，扩展自 Element Plus 的 `ElInfiniteScroll`，用于列表无限加载更多内容。

## 引入

```ts
import { RwInfiniteScroll } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/infiniteScrollDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/infiniteScrollDemo.vue{vue}

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
type OptionT = baseT & {
  moduleName: string
  name: string
}
```

## 注意事项

- 通常作为指令使用，配合 `v-infinite-scroll` 绑定加载方法。
- `infinite-scroll-distance` / `infinite-scroll-disabled` / `infinite-scroll-immediate` 等属性与 Element Plus 一致。
