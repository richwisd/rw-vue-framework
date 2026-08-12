---
outline: deep
title: Calendar 日历
---

# Calendar 日历

日历组件，扩展自 Element Plus 的 `ElCalendar`，兼容其全部属性与事件，并扩展了 `dateCell` 自定义单元格插槽。

## 引入

```ts
import { RwCalendar } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../demos/src/pages/controls/calendarDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/controls/calendarDemo.vue{vue}

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
type OptionT = CalendarProps & CalendarEmits & baseT & {
  dateCell: any
  header: string
  moduleName: string
  name: string
}
```

## 注意事项

- `dateCell` 用于自定义日期单元格内容（支持字符串 / HTML / 组件）。
- `v-model` 绑定当前选中的日期。
