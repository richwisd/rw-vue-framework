---
outline: deep
title: Transfer 穿梭框
---

# Transfer 穿梭框

穿梭框组件，扩展自 Element Plus 的 `ElTransfer`，兼容其全部属性与事件，并扩展了左右两栏的 footer 与空状态插槽。

## 引入

```ts
import { RwTransfer } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/transferDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/transferDemo.vue{vue}

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
type OptionT = TransferProps & TransferEmits & baseT & {
  moduleName: string
  name: string
  default: any
  leftFooter: string
  rightFooter: string
  leftEmpty: string
  rightEmpty: string
}
```

## 注意事项

- `leftFooter` / `rightFooter` 用于自定义左右栏底部内容。
- `leftEmpty` / `rightEmpty` 用于自定义左右栏空状态内容。
