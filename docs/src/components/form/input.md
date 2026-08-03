---
outline: deep
title: Input 输入框
---

# Input 输入框

输入框组件，扩展自 Element Plus 的 `ElInput`，支持自动校验、多语言输入等增强功能。

## 引入

```ts
import { RwInput } from 'rw-vue-framework/controls'
```

## 基础用法

通过 `RwInput.init(moduleName, name, options)` 创建控件，设置 `type` 后自动启用对应校验规则。

<script setup>
import Demo from '../../../../playground/src/pages/controls/inputDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/inputDemo.vue{vue}

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

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### checkT 校验类型

设置 `check` 属性后，组件自动启用对应的校验规则：

| 值        | 说明         |
| --------- | ------------ |
| email     | 邮箱校验     |
| number    | 数字校验     |
| idcard    | 身份证校验   |
| mobile    | 手机号校验   |
| url       | URL 校验     |
| tel       | 电话号码校验 |
| password  | 密码         |
| username  | 用户名       |
| text      | 普通文本（默认）|

### OptionT 类型

```ts
type OptionT = InputProps & InputEmits & baseT & {
  prefix: any
  suffix: any
  prepend: any
  append: any
  check: checkT
  customPlaceholder: boolean
  instance: InputInstance | null
  mutiLang: boolean           // 多语言输入
  langTip: boolean
  langLable: 'icon' | 'text'
  onMounted?: (inst: any) => void
}
```

## 注意事项

- 设置 `type: 'password'` 时自动启用 `showPassword`。
- `mutiLang` 为 `true` 时，输入框支持多语言输入切换。
- `check` 属性会自动设置对应的 `type` 和校验规则。
