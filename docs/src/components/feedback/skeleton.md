---
outline: deep
title: Skeleton 骨架屏
---

# Skeleton 骨架屏

骨架屏组件，扩展自 Element Plus 的 `ElSkeleton`，用于在数据加载完成前展示占位图形，兼容其全部属性。

## 引入

```ts
import { RwSkeleton } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../demos/src/pages/controls/seletonDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/controls/seletonDemo.vue{vue}

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
type OptionT = SkeletonProps & baseT & {
  moduleName: string
  name: string
  default: any
  template: any
  loading?: boolean
}
```

## 注意事项

- `loading` 为 `true` 时显示骨架屏，为 `false` 时显示 `default` 内容。
- `rows` / `animated` / `count` 等属性与 Element Plus 一致。
