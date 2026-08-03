---
outline: deep
title: Dropdown 下拉菜单
---

# Dropdown 下拉菜单

下拉菜单组件，扩展自 Element Plus 的 `ElDropdown`，内部自动创建 `RwButton` 作为触发器，并提供 `addItem` 动态追加菜单项。

## 引入

```ts
import { RwDropdown } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/dropdownDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/dropdownDemo.vue{vue}

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

::: tip
未传入 `label` 时，自动使用 `moduleName.name` 的多语言文案作为触发按钮文字。默认带箭头图标 `ArrowDown`。
:::

### 实例方法

| 方法名         | 说明                              |
| -------------- | --------------------------------- |
| addItem        | 添加下拉菜单项                    |
| setItemAttrib  | 按 name 修改菜单项属性            |

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type DropdownItemOptionT = DropdownItemProps & baseT & {
  showCheck: boolean
  checked: boolean
  show: boolean
  click: (e: MouseEvent) => any | Promise<any>
}

type OptionT = DropdownProps & baseT & {
  default: any
  dropdown: any
  statusData: any
  click: (e: MouseEvent) => any
  command: (...args: any[]) => void
  visibleChange: (val: boolean) => void
  items: Partial<DropdownItemOptionT>[]
  button: Partial<RwButton.OptionT>   // 触发按钮配置
  icon?: string | Component
  text: boolean
  id: string
  disabled: boolean
  addItem: (name: string, options?: Partial<DropdownItemOptionT>) => void
  setItemAttrib: (name: string, attrib: any, value: any) => void
  refreshButton?: (options: any, data?: any) => Partial<OptionT>
}
```

## 注意事项

- 内部自动创建 `RwButton` 作为触发器，可通过 `button` 选项自定义。
- `trigger` 支持 `hover` / `click` / `contextmenu`。
- 常用于导入 / 导出等一组相关操作，由 `RwButtonGroup.addDropdown` 间接添加。
