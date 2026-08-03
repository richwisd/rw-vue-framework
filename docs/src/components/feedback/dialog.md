---
outline: deep
title: Dialog 对话框
---

# Dialog 对话框

对话框组件，扩展自 Element Plus 的 `ElDialog`，采用配置驱动方式，支持自动注册内部表单并提取表单按钮到 footer，实现表单弹窗的统一交互。

## 引入

```ts
import { RwDialog } from 'rw-vue-framework/controls'
```

## 基础用法

```ts
import { RwDialog } from 'rw-vue-framework/controls'

const dialog = RwDialog.init('editForm', MyFormComponent, undefined, {
  width: '50%'
})

// 打开（新增）
dialog.show = true
dialog.idValue = 0

// 打开（编辑）
dialog.show = true
dialog.idValue = 123
```

## API

### init 参数

```ts
function init(
  name: string,
  templateName: any,
  buttons?: RwButtonGroup.OptionT,
  options?: Partial<OptionT>
): OptionT
```

| 参数           | 说明                                | 类型                  | 默认值 |
| -------------- | ----------------------------------- | --------------------- | ------ |
| name           | 对话框名称                          | string                | -      |
| templateName   | 内容组件（通常为表单组件）          | any                   | -      |
| buttons        | 按钮组（不传则从内部表单自动提取）  | RwButtonGroup.OptionT | -      |
| options        | 选项对象                            | Partial\<OptionT\>    | -      |

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type OptionT = baseT & DialogProps & DialogEmits & {
  direction: 'rtl' | 'ltr' | 'ttb' | 'btt' | 'center'
  idValue: number
  params: Record<string, any>
  changed: boolean
  formChanged: boolean
  escClose: boolean
  height: string | number
  default: any
  header: any
  footer: any
  show: boolean
  loading: boolean
  buttons: RwButtonGroup.OptionT
  _autoFormButtons: {
    buttonGroup: RwButtonGroup.OptionT
    originalFormRef: any
    handleButtonClick: (buttonName: string, event: any) => void
  }
  _formRegistration: any
}
```

## 注意事项

- 当内容组件为 `RwForm` 时，对话框会自动注册表单，并将表单的 `submit` / `reset` / `close` 等按钮提取到 footer，无需手动配置 `buttons`。
- `changed` 表示是否需要刷新列表（提交成功后置为 `true`）。
- 关闭时若表单有改动，会弹出二次确认提示。
- 通常通过 `RwPageBase.pushDialog` 注册、`RwPageBase.showDialog` 打开。
