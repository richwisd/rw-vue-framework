---
outline: deep
title: Segmented 分段控制器
---

# Segmented 分段控制器

分段控制器，扩展自 Element Plus 的 `ElSegmented`，兼容其全部属性与事件。

## 引入

```ts
import { RwSegmented } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/segmentedDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/segmentedDemo.vue{vue}

## API

### init 参数

```ts
function init(
  moduleName: string,
  name: string,
  options?: Partial<OptionT>
): OptionT
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
type OptionT = SegmentedProps & SegmentedEmits & baseT & {
  default: any
  moduleName: string
  name: string
}
```

## 注意事项

- `options` 为选项数组，支持字符串 / 数字 / 对象（含 `value` / `label`）。
- `direction` 支持 `horizontal` / `vertical`。
