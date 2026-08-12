---
outline: deep
title: Radio 单选框
---

# Radio 单选框

单选框组件，扩展自 Element Plus 的 `ElRadio` / `ElRadioGroup`，支持单个、组、按钮三种模式，支持接口加载选项与属性映射。

## 引入

```ts
import { RwRadio } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../demos/src/pages/controls/radioDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/controls/radioDemo.vue{vue}

## API

### init 参数

```ts
function init(
  moduleName: string,
  name: string,
  options?: Partial<OptionT>
): OptionT
```

| 参数       | 说明 | 类型 | 默认值 |
| ---------- | ---- | ---- | ------ |
| moduleName | 模块名 | string | - |
| name       | 控件名 | string | - |
| options    | 选项对象 | Partial\<OptionT\> | - |

### 模式说明

| mode   | 渲染效果 |
| ------ | -------- |
| single | 单个 Radio（默认，无 options 时） |
| group  | 标准 RadioGroup |
| button | 按钮形式 RadioGroup |

::: tip
未指定 `mode` 且传入 `options` 时，默认使用 `group` 模式。
:::

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type RadioMode = 'single' | 'group' | 'button'

type OptionT = baseT & RadioEventCallbacks & {
  mode?: RadioMode
  url?: string                    // 接口地址
  params?: Record<string, any>
  options?: RadioOption[]
  optionsKey?: string             // 默认 'rows'
  labelKey?: string               // 默认 'label'
  valueKey?: string               // 默认 'value'
  disabledKey?: string            // 默认 'disabled'
  label?: string | number | boolean
  disabled?: boolean
  border?: boolean
  size?: 'large' | 'default' | 'small'
  textColor?: string
  fill?: string
  tag?: string
  direction?: 'horizontal' | 'vertical'
  gap?: number
  default?: any
}
```

## 注意事项

- 设置 `url` 后会自动请求接口加载选项，配合 `labelKey` / `valueKey` 完成属性映射。
- `button` 模式下可通过 `textColor` / `fill` 自定义激活态颜色。
