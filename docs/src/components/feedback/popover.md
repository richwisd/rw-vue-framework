---
outline: deep
title: Popover 气泡卡片
---

# Popover 气泡卡片

气泡卡片组件，扩展自 Element Plus 的 `ElPopover`，兼容其全部属性与事件。

## 引入

```ts
import { RwPopover } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/popoverDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/popoverDemo.vue{vue}

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
type OptionT = PopoverProps & PopoverEmits & baseT & {
  default: any
  reference: any
  modularName: string   // 注意：源码中字段名为 modularName
  name: string
}
```

::: warning
源码中模块名字段为 `modularName`，使用时请注意。
:::

## 注意事项

- `trigger` 支持 `click` / `focus` / `hover` / `contextmenu`。
- `default` 用于设置气泡内容（支持字符串 / HTML / 组件）。
