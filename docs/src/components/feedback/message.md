---
outline: deep
title: Message 消息提示
---

# Message 消息提示

消息提示组件，扩展自 Element Plus 的 `ElMessage`，兼容其全部属性与事件。

## 引入

```ts
import { RwMessage } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../demos/src/pages/controls/messageDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/controls/messageDemo.vue{vue}

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
type OptionT = MessageProps & MessageEmits & baseT & {
  moduleName: string
  name: string
}
```

## 注意事项

- `type` 支持 `success` / `warning` / `info` / `error`。
- 通常作为全局方法调用，配置驱动模式下通过 `control` 触发。
