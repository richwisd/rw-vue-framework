---
outline: deep
title: MessageBox 弹框
---

# MessageBox 弹框

弹框组件，扩展自 Element Plus 的 `ElMessageBox`，兼容其全部属性与事件。

## 引入

```ts
import { RwMessageBox } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../demos/src/pages/controls/messageBoxDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/controls/messageBoxDemo.vue{vue}

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
type OptionT = ElMessageBoxOptions & baseT & {
  modduleName: string   // 注意：源码中为 modduleName（历史拼写）
  name: string
}
```

::: warning
源码中该组件的模块名字段为 `modduleName`（多了一个 d），使用时请注意。后续版本可能修正。
:::

## 注意事项

- 支持 `confirm` / `alert` / `prompt` 三种调用形式。
- 通常用于删除确认、操作二次确认等场景。
