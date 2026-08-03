---
outline: deep
title: Drawer 抽屉
---

# Drawer 抽屉

抽屉组件，扩展自 Element Plus 的 `ElDrawer`，兼容其全部属性与事件，并扩展了 `header` / `footer` / `default` 插槽。

## 引入

```ts
import { RwDrawer } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/drawerDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/drawerDemo.vue{vue}

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
type OptionT = DrawerProps & typeof drawerEmits & baseT & {
  default: any
  header: any
  footer: any
  moduleName: string
  name: string
}
```

## 注意事项

- `direction` 控制抽屉方向（`rtl` / `ltr` / `ttb` / `btt`）。
- `header` / `footer` / `default` 均支持字符串 / HTML / Vue 组件。
