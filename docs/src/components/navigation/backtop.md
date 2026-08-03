---
outline: deep
title: Backtop 回到顶部
---

# Backtop 回到顶部

回到顶部组件，扩展自 Element Plus 的 `ElBacktop`，兼容其全部属性与事件。

## 引入

```ts
import { RwBacktop } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/backtopDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/backtopDemo.vue{vue}

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
type OptionT = BacktopProps & BacktopEmits & baseT & {
  default: any
  moduleName: string
  name: string
}
```

## 注意事项

- `target` 指定触发滚动的元素（CSS 选择器）。
- `visibility-height` 控制按钮显示的滚动阈值。
