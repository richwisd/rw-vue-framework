---
outline: deep
title: Tooltip 文字提示
---

# Tooltip 文字提示

文字提示组件，扩展自 Element Plus 的 `ElTooltip`，兼容其全部属性。

## 引入

```ts
import { RwTooltip } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../demos/src/pages/controls/tooltipDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/controls/tooltipDemo.vue{vue}

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
type OptionT = ElTooltipProps & baseT & {
  default: any
  content: any
  moduleName: string
  name: string
}
```

## 注意事项

- `content` 用于设置提示内容（支持字符串 / HTML / 组件）。
- `placement` 控制提示出现位置，与 Element Plus 一致。
