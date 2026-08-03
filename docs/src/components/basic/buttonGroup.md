---
outline: deep
title: ButtonGroup 按钮组
---

# ButtonGroup 按钮组

按钮组容器，扩展自 Element Plus 的 `ElButtonGroup`，用于统一管理一组按钮（按钮 / 气泡确认 / 下拉菜单），并自动适配 `localSetting` 的按钮风格。

## 引入

```ts
import { RwButtonGroup } from 'rw-vue-framework/controls'
```

## 基础用法

通过 `RwButtonGroup.init(moduleName, options)` 创建按钮组，再用 `addButton` / `addPopconfirm` / `addDropdown` 动态追加按钮。

<script setup>
import Demo from '../../../../playground/src/pages/controls/buttonGroupDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/buttonGroupDemo.vue{vue}

## API

### init 参数

```ts
function init(
  moduleName: string,
  options?: Partial<OptionT>
): OptionT
```

| 参数       | 说明                          | 类型               | 默认值 |
| ---------- | ----------------------------- | ------------------ | ------ |
| moduleName | 模块名（用于多语言/接口前缀）| string             | -      |
| options    | 选项对象                      | Partial\<OptionT\> | -      |

### 实例方法

| 方法名        | 说明                                        | 返回值        |
| ------------- | ------------------------------------------- | ------------- |
| addButton     | 添加普通按钮                                | ButtonItemT \| null |
| addPopconfirm | 添加气泡确认按钮                            | ButtonItemT \| null |
| addDropdown   | 添加下拉菜单按钮                            | ButtonItemT \| null |
| changeButton  | 按 name 修改按钮配置                        | boolean       |
| setAttrib     | 按 name 修改按钮项属性（disabled/show 等）  | void          |

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type ControlTypeEnum = 'button' | 'popconfirm' | 'dropdown'

type ButtonsAreaT = "form" | "search" | "operate" | "table" | "tableLine" | "custom"

type OptionT = baseT & {
  size: 'large' | 'default' | 'small'
  type: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  isGroup: boolean
  controls: ButtonItemT[]
  default: any
  buttonsArea: ButtonsAreaT
  customized: boolean                 // 是否是自定义的按钮
  verticalLocation: 'top' | 'bottom' | false
  addButton: (name: string, options?: ButtonOptions) => ButtonItemT | null
  addPopconfirm: (name: string, options?: PopconfirmOptions) => ButtonItemT | null
  addDropdown: (name: string, options?: DropdownOptions) => ButtonItemT | null
  setAttrib: (name: string, attrib: any, value: any) => void
  changeButton: (name: string, options: any) => boolean
}
```

## 注意事项

- `buttonsArea` 决定按钮风格（文字 / 按钮），由 `localSetting` 的按钮样式配置驱动。
- `customized` 为 `false` 时按钮风格跟随 `localSetting`；为 `true` 时使用自定义风格。
- 内部按钮项 `ButtonItemT.controlType` 决定渲染为 `button` / `popconfirm` / `dropdown`。
