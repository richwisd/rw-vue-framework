---
outline: deep
title: Result 结果
---

# Result 结果

结果组件，扩展自 Element Plus 的 `ElResult`，用于反馈一系列操作任务的处理结果，兼容其全部属性。

## 引入

```ts
import { RwResult } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/resultDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/resultDemo.vue{vue}

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
type OptionT = ResultProps & baseT & {
  moduleName: string
  name: string
  icon: any
  title: any
  subTitle: any
  extra: any
}
```

## 注意事项

- `icon` 支持 `success` / `warning` / `info` / `error` 四种预设图标类型。
- `extra` 用于设置底部额外内容（通常是操作按钮）。
