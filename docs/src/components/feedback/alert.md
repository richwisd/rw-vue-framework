---
outline: deep
title: Alert 警告
---

# Alert 警告

警告提示组件，扩展自 Element Plus 的 `ElAlert`，兼容其全部属性与事件。

## 引入

```ts
import { RwAlert } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/alertDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/alertDemo.vue{vue}

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
type OptionT = AlertProps & AlertEmits & baseT & {
  default: any
  title: any
  icon: any
  moduleName: string
  name: string
}
```

## 注意事项

- `type` 支持 `success` / `warning` / `info` / `error`，与 Element Plus 一致。
- `default` 用于设置警告内容（支持字符串 / HTML / 组件）。
