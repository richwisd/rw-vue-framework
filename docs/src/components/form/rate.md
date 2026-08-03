---
outline: deep
title: Rate 评分
---

# Rate 评分

评分组件，扩展自 Element Plus 的 `ElRate`，兼容其全部属性与事件。

## 引入

```ts
import { RwRate } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/rateDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/rateDemo.vue{vue}

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
type OptionT = RateProps & RateEmits & baseT & {
  moduleName: string
  name: string
}
```

## 注意事项

- `max` / `allow-half` / `show-text` / `show-score` 等属性与 Element Plus 一致。
