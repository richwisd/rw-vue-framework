---
outline: deep
title: InputNumber 数字输入
---

# InputNumber 数字输入

数字输入框，扩展自 Element Plus 的 `ElInputNumber`，兼容其全部属性与事件。

## 引入

```ts
import { RwInputNumber } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../demos/src/pages/controls/inputNumberDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/controls/inputNumberDemo.vue{vue}

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
type OptionT = InputNumberProps & InputNumberEmits & baseT & {
  decreaseIcon: any
  increaseIcon: any
  prefix: any
  suffix: any
}
```

## 注意事项

- `min` / `max` / `step` / `precision` 等属性与 Element Plus 一致。
- 在表单中作为表单项使用时，`struct` 的 `min` / `max` 会自动生成对应校验规则。
