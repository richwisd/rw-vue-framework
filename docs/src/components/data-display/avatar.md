---
outline: deep
title: Avatar 头像
---

# Avatar 头像

头像组件，扩展自 Element Plus 的 `ElAvatar`，兼容其全部属性与事件。

## 引入

```ts
import { RwAvatar } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/avatarDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/avatarDemo.vue{vue}

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
type OptionT = AvatarProps & AvatarEmits & baseT & {
  moduleName: string
  name: string
  default: any
}
```

## 注意事项

- `shape` 支持 `circle` / `square`，`size` 支持 `large` / `default` / `small` / 数字。
- `src` 设置图片地址，`icon` 设置图标。
