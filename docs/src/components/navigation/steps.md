---
outline: deep
title: Steps 步骤条
---

# Steps 步骤条

步骤条组件，扩展自 Element Plus 的 `ElSteps`，兼容其全部属性与事件。

## 引入

```ts
import { RwSteps } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/stepsDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/stepsDemo.vue{vue}

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
type OptionT = StepsProps & StepsEmits & baseT & {
  default: any
  moduleName: string
  name: string
}
```

## 注意事项

- `active` 控制当前步骤，`process-status` / `finish-status` 控制各状态样式。
- `direction` 支持 `horizontal` / `vertical`。
