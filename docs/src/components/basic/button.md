---
outline: deep
title: Button 按钮
---

# Button 按钮

常用的操作按钮，扩展自 Element Plus 的 `ElButton`，兼容其全部属性。

## 引入

```ts
import { RwButton } from 'rw-vue-framework/controls'
```

## 基础用法

通过 `RwButton.init(moduleName, name, options)` 创建控件描述对象，再以 `<RwButton.Template :control="..." />` 渲染。

<script setup>
import Demo from '../../../../demos/src/pages/controls/buttonDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/controls/buttonDemo.vue{vue}

## API

### init 参数

```ts
function init(
  moduleName: string,
  name: string,
  options?: Partial<OptionT>
): Partial<OptionT>
```

| 参数       | 说明                          | 类型                | 默认值 |
| ---------- | ----------------------------- | ------------------- | ------ |
| moduleName | 模块名（用于多语言/接口前缀）| string              | -      |
| name       | 控件名（用于多语言/事件）     | string              | -      |
| options    | 选项对象                      | Partial\<OptionT\>  | -      |

### Template Props

| 名称    | 说明         | 类型               | 默认值 |
| ------- | ------------ | ------------------ | ------ |
| control | 控件描述对象 | Partial\<OptionT\> | -      |

### Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| click  | 点击按钮时触发 | (e: any) |

### OptionT 类型

```ts
type OptionT = Mutable<ButtonProps> & baseT & {
  default: any
  loadingSlot: any
  iconSlot: any
  moduleName: string
  name: string
  customized: boolean        // 是否是自定义的按钮
  suffixIcon: any | string | Component
  tag: any
  separator: boolean         // 组内分割线（竖线）
  click: (e: any) => any | Promise<any>
  refreshButton?: (options: any, data?: any) => Partial<OptionT>
}
```

## 注意事项

- `control.separator` 为 `true` 时渲染为竖向分割线，不响应点击。
- `control.default` 支持字符串、HTML 字符串、Vue 组件三种形态。
- `control.customized` 为 `false` 表示适配 localSetting 的按钮。
