---
outline: deep
title: Descriptions 描述列表
---

# Descriptions 描述列表

描述列表组件，扩展自 Element Plus 的 `ElDescriptions`，用于展示列表形式的信息，兼容其全部属性。

## 引入

```ts
import { RwDescriptions } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/descriptionsDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/descriptionsDemo.vue{vue}

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
type OptionT = DescriptionProps & baseT & {
  default: any
  title: any
  extra: any
  moduleName: string
  name: string
}
```

## 注意事项

- `direction` 支持 `horizontal` / `vertical`。
- `border` 控制是否显示边框。
- `column` 控制每行显示的字段数量。
