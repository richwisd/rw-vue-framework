---
outline: deep
title: Affix 固钉
---

# Affix 固钉

固钉组件，扩展自 Element Plus 的 `ElAffix`，将页面元素固定在可视范围内，兼容其全部属性与事件。

## 引入

```ts
import { RwAffix } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/affixDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/affixDemo.vue{vue}

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
type OptionT = AffixProps & AffixEmits & baseT & {
  default: any
  moduleName: string
  name: string
}
```

## 注意事项

- `position` 支持 `top` / `bottom`，`offset` 控制偏移量。
- `target` 指定触发滚动的父容器。
