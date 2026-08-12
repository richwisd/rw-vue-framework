---
outline: deep
title: Breadcrumb 面包屑
---

# Breadcrumb 面包屑

面包屑导航组件，扩展自 Element Plus 的 `ElBreadcrumb`，兼容其全部属性。

## 引入

```ts
import { RwBreadcrumb } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../demos/src/pages/controls/breadcrumbDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/controls/breadcrumbDemo.vue{vue}

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
type OptionT = BreadcrumbProps & baseT & {
  default: any
  moduleName: string
  name: string
}
```

## 注意事项

- `separator` / `separator-icon` 控制分隔符，与 Element Plus 一致。
