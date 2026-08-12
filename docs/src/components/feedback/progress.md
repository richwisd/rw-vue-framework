---
outline: deep
title: Progress 进度条
---

# Progress 进度条

进度条组件，扩展自 Element Plus 的 `ElProgress`，兼容其全部属性。

## 引入

```ts
import { RwProgress } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../demos/src/pages/controls/progressDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/controls/progressDemo.vue{vue}

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
type OptionT = ProgressProps & baseT & {
  moduleName: string
  name: string
  default: any
  percentage?: number
}
```

## 注意事项

- `percentage` 控制进度（0~100）。
- `status` 支持 `success` / `exception` / `warning`。
- `type` 支持 `line` / `circle` / `dashboard`。
