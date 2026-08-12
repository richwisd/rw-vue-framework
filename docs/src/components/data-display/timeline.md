---
outline: deep
title: Timeline 时间线
---

# Timeline 时间线

时间线组件，扩展自 Element Plus 的 `ElTimeline`，通过 `lists` 配置时间线项，兼容其全部属性。

## 引入

```ts
import { RwTimeline } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../demos/src/pages/controls/timelineDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/controls/timelineDemo.vue{vue}

## API

### init 参数

```ts
function init(
  moduleName: string,
  name: string,
  lists?: listT[],
  options?: Partial<OptionT>
): Partial<OptionT>
```

| 参数       | 说明 | 类型 | 默认值 |
| ---------- | ---- | ---- | ------ |
| moduleName | 模块名 | string | - |
| name       | 控件名 | string | - |
| lists      | 时间线项数组 | listT[] | [] |
| options    | 选项对象 | Partial\<OptionT\> | - |

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type listT = {
  value: string
  icon?: string | Component
  color?: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'normal' | 'large'
  hollow?: boolean
}

type OptionT = TimelineItemProps & baseT & {
  default: any
  moduleName: string
  name: string
  lists: listT[]
}
```

## 注意事项

- `lists` 是核心数据源，每项 `value` 为时间线内容，`type` 控制节点颜色。
- `timestamp` / `placement` 等属性与 Element Plus 一致。
