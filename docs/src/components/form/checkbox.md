---
outline: deep
title: Checkbox 多选框
---

# Checkbox 多选框

多选框组件，扩展自 Element Plus 的 `ElCheckbox` / `ElCheckboxGroup`，支持单个、组、按钮三种模式，支持接口加载选项、全选、属性映射等增强功能。

## 引入

```ts
import { RwCheckbox } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/checkboxDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/checkboxDemo.vue{vue}

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

| multiple | checkBoxType | 渲染效果 |
| -------- | ------------ | -------- |
| false    | -            | 单个 Checkbox |
| true     | default      | 标准 CheckboxGroup |
| true     | button       | 按钮形式的 CheckboxGroup |

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type CheckboxType = 'default' | 'button'

type OptionT = baseT & CheckboxEventCallbacks &
  Omit<CheckboxProps, 'modelValue' | 'trueLabel' | 'falseLabel'> &
  Omit<CheckboxGroupProps, 'modelValue'> & {
    multiple?: boolean              // 是否多选模式
    checkBoxType?: CheckboxType     // 类型，仅 multiple=true 生效
    url?: string                    // 接口地址
    params?: Record<string, any>    // 接口参数
    options?: CheckboxOption[]      // 直接选项
    optionsKey?: string             // 返回数据选项属性名，默认 'rows'
    labelKey?: string               // 默认 'label'
    valueKey?: string               // 默认 'value'
    disabledKey?: string            // 默认 'disabled'
    trueValue?: CheckboxValueType
    falseValue?: CheckboxValueType
    direction?: 'horizontal' | 'vertical'
    gap?: number
    checkAll?: boolean              // 是否显示全选
    checkAllText?: string
    default?: any
  }
```

## 注意事项

- `multiple: false` 时为单个 Checkbox，绑定值为 `boolean`；`multiple: true` 时绑定值为数组。
- 设置 `url` 后会自动请求接口加载选项，配合 `labelKey` / `valueKey` 完成属性映射。
- `checkAll: true` 仅在 group 模式下生效。
