---
outline: deep
title: Badge 徽章
---

# Badge 徽章

徽章组件，扩展自 Element Plus 的 `ElBadge`，用于图标右上角的数字或文字提示，兼容其全部属性。

## 引入

```ts
import { RwBadge } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../demos/src/pages/controls/badgeDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/controls/badgeDemo.vue{vue}

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
type OptionT = BadgeProps & baseT & {
  default: any
  content: any
  moduleName: string
  name: string
}
```

## 注意事项

- `value` / `max` / `is-dot` / `hidden` 等属性与 Element Plus 一致。
- `default` 用于设置徽章包裹的内容。
