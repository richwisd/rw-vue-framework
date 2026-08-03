---
outline: deep
title: Slider 滑块
---

# Slider 滑块

滑块组件，扩展自 Element Plus 的 `ElSlider`，兼容其全部属性与事件，并扩展了切换时回调数据处理的能力。

## 引入

```ts
import { RwSlider } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/sliderDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/sliderDemo.vue{vue}

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

::: tip
返回值为 `reactive` 包装的响应式对象。
:::

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type OptionT = SliderProps & SliderEmits & baseT & {
  moduleName: string
  name: string
  changeData?: (control: OptionT, val: any) => void
}
```

## 注意事项

- `changeData` 回调在值变化时触发，可在此处联动更新其它控件数据。
- `range` 模式下绑定值为数组。
