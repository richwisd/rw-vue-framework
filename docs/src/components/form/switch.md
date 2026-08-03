---
outline: deep
title: Switch 开关
---

# Switch 开关

开关组件，扩展自 Element Plus 的 `ElSwitch`，兼容其全部属性与事件，并扩展了切换时回调数据处理的能力。

## 引入

```ts
import { RwSwitch } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/switchDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/switchDemo.vue{vue}

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

::: tip
返回值为 `reactive` 包装的响应式对象。
:::

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type OptionT = SwitchProps & SwitchEmits & baseT & {
  moduleName: string
  name: string
  activeAction: any
  inactiveAction: any
  loading?: boolean
  changeData?: (control: OptionT, val: any) => void
}
```

## 注意事项

- `changeData` 回调在切换时触发，可在此处同步更新其它控件的数据。
- `activeAction` / `inactiveAction` 用于配置开启 / 关闭时的附加行为。
