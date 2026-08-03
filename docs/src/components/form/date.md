---
outline: deep
title: DatePicker 日期选择
---

# DatePicker 日期选择

日期选择器，扩展自 Element Plus 的 `ElDatePicker`，兼容其全部属性，并自动生成多语言 placeholder。

## 引入

```ts
import { RwDate } from 'rw-vue-framework/controls'
```

## 基础用法

```vue
<script setup>
import { RwDate } from 'rw-vue-framework/controls'
const date = RwDate.init('controls', 'createTime', {
  type: 'daterange'
})
</script>

<template>
  <RwDate.Template :control="date" />
</template>
```

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
未传入 `placeholder` 时自动拼接为「请选择 + 字段名」；范围选择时自动设置 `start-placeholder` / `end-placeholder`。
:::

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type OptionT = baseT & DatePickerProps & {
  change: (val: string | number | Date | [Date, Date] | null) => void
  blur: (e: FocusEvent) => void
  focus: (e: FocusEvent) => void
  clear: () => void
  calendarChange: (val: [Date, null | Date]) => void
  panelChange: (date: Date | [Date, Date], mode: 'month' | 'year', view?: string) => void
  visibleChange: (visibility: boolean) => void
  default: any
  rangeSeparator: any
  prevMonth: any
  nextMonth: any
  prevYear: any
  nextYear: any
}
```

## 注意事项

- `type` 为 `datetimerange` / `daterange` / `monthrange` / `yearrange` 时绑定值为数组，在表单中会自动初始化为 `[]`。
- 在搜索区使用时，范围日期会被自动拆分为「>=」和「<」两个查询条件。
