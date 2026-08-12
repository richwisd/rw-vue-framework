---
outline: deep
title: InputTag 输入标签
---

# InputTag 输入标签

输入标签组件，扩展自 Element Plus 的 `ElInputTag`，用于输入并生成标签数组，默认开启去重并限制最大数量。

## 引入

```ts
import { RwInputTag } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../demos/src/pages/controls/inputTagDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/controls/inputTagDemo.vue{vue}

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
type OptionT = InputTagProps & InputTagEmits & baseT & {
  prefix: any
  suffix: any
  tag: any
  unique: boolean   // 是否去重
}
```

## 注意事项

- 默认 `unique: true`（标签去重）、`max: 10`（最多 10 个标签），可在 `options` 中覆盖。
- 绑定值为字符串数组 `string[]`。
