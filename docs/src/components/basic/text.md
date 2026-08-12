---
outline: deep
title: Text 文本
---

# Text 文本

文本显示组件，扩展自 Element Plus 的 `ElText`，支持多语言显示、内容提示等功能，常用于表格列与详情展示。

## 引入

```ts
import { RwText } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../demos/src/pages/controls/textDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/controls/textDemo.vue{vue}

## API

### init 参数

```ts
function init(
  moduleName: string,
  name: string,
  options?: Partial<OptionT>
): OptionT
```

| 参数       | 说明           | 类型               | 默认值 |
| ---------- | -------------- | ------------------ | ------ |
| moduleName | 模块名         | string             | -      |
| name       | 控件名         | string             | -      |
| options    | 选项对象       | Partial\<OptionT\> | -      |

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type OptionT = TextProps & baseT & {
  default: any
  multiLang?: boolean   // 在表格中会用到
  lang?: string         // 显示哪些语言
  showTips: boolean     // 显示提示
}
```

## 注意事项

- `multiLang` 为 `true` 时，文本可按多语言切换显示，常用于表格多语言字段。
- `showTips` 控制内容超出时是否以 tooltip 形式展示完整内容。
