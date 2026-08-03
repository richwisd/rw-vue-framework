---
outline: deep
title: Popconfirm 气泡确认框
---

# Popconfirm 气泡确认框

气泡确认框，扩展自 Element Plus 的 `ElPopconfirm`，兼容其全部属性与事件，内部自动创建一个 `RwButton` 作为触发器。

## 引入

```ts
import { RwPopconfirm } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/popconfirmDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/popconfirmDemo.vue{vue}

## API

### init 参数

```ts
function init(
  moduleName: string,
  name: string,
  options?: Partial<OptionT>
): OptionT
```

| 参数       | 说明 | 类型 | 默认值 |
| ---------- | ---- | ---- | ------ |
| moduleName | 模块名 | string | - |
| name       | 控件名 | string | - |
| options    | 选项对象 | Partial\<OptionT\> | - |

::: tip
未传入 `label` 时，自动使用 `moduleName.name` 的多语言文案作为按钮文字。
:::

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type OptionT = PopconfirmProps & PopconfirmEmits & baseT & {
  reference: any
  actions: any
  button: Partial<RwButton.OptionT>   // 触发按钮配置
  text: boolean
  tag: string
  disabled: boolean
  refreshButton?: (options: any, data?: any) => Partial<OptionT>
}
```

## 注意事项

- 内部自动创建 `RwButton` 作为触发器，可通过 `button` 选项自定义按钮样式。
- `text: true` 时按钮渲染为文字按钮风格。
- 常用于列表行内的删除确认，由 `RwButtonGroup.addPopconfirm` 间接添加。
