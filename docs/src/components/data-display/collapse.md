---
outline: deep
title: Collapse 折叠面板
---

# Collapse 折叠面板

折叠面板组件，扩展自 Element Plus 的 `ElCollapse`，兼容其全部属性与事件。

## 引入

```ts
import { RwCollapse } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/collapseDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/collapseDemo.vue{vue}

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
type OptionT = CollapseProps & CollapseEmits & baseT & {
  default: any
  moduleName: string
  name: string
}
```

## 注意事项

- `accordion` 为 `true` 时每次只展开一个面板。
- `v-model` 绑定当前展开的面板 name 数组。
