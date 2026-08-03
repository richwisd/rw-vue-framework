---
outline: deep
title: ColorPicker 颜色选择器
---

# ColorPicker 颜色选择器

颜色选择器，扩展自 Element Plus 的 `ElColorPicker`，兼容其全部属性与事件。

## 引入

```ts
import { RwColorPicker } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/colorPickerDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/colorPickerDemo.vue{vue}

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
type OptionT = ColorPickerProps & ColorPickerEmits & baseT & {
  moduleName: string
  name: string
}
```

## 注意事项

- `show-alpha` / `color-format` / `predefine` 等属性与 Element Plus 一致。
