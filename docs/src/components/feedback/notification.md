---
outline: deep
title: Notification 通知
---

# Notification 通知

通知组件，扩展自 Element Plus 的 `ElNotification`，兼容其全部属性与事件。

## 引入

```ts
import { RwNotification } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/notificationDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/notificationDemo.vue{vue}

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
type OptionT = NotificationProps & NotificationEmits & baseT & {
  moduleName: string
  name: string
}
```

## 注意事项

- `position` 控制通知出现位置（`top-right` / `top-left` / `bottom-right` / `bottom-left`）。
- `duration` 控制显示时长，设为 `0` 则不自动关闭。
