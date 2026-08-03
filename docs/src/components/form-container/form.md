---
outline: deep
title: Form 表单
---

# Form 表单

表单容器组件，扩展自 Element Plus 的 `ElForm`，采用配置驱动方式，通过 `struct` + `addFormItems` / `addTabs` 组织内容，并自动生成校验规则、默认数据与按钮区。

## 引入

```ts
import { RwForm } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../playground/src/pages/controls/formDemo.vue'
</script>

<Demo />

## 源码

<<< ../../../../playground/src/pages/controls/formDemo.vue{vue}

## API

### init 参数

```ts
function init(
  struct: pageStruct.OptionT,
  options?: Partial<OptionT>
): OptionT
```

| 参数    | 说明                          | 类型               | 默认值 |
| ------- | ----------------------------- | ------------------ | ------ |
| struct  | 页面结构对象                  | pageStruct.OptionT | -      |
| options | 选项对象                      | Partial\<OptionT\> | -      |

### 实例方法

| 方法名        | 说明                                          |
| ------------- | --------------------------------------------- |
| addFormItems  | 添加一组表单项（RwFormItems）                 |
| addTabs       | 添加标签页（RwTabs）                          |
| findItem      | 按 name 查找表单控件（O(1) Map 查找）         |
| changeItem    | 按 name 修改表单控件配置                      |
| changeButton  | 按 name 修改按钮配置                          |
| initDialog    | 以弹窗模式初始化表单（设置 idValue / params） |

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type FormChangeEvent = {
  newData: any
  oldData?: any
  changed: boolean
  formId: string
  field?: string
  timestamp: number
}

type OptionT = FormEmits & baseT & {
  parentObject: any
  id: string
  type: 'form' | 'search'
  formProps: Partial<Mutable<FormProps>>
  data: any                       // 表单数据
  inDialog: boolean               // 是否在弹窗中
  dialogOptions: { width, height, inDialog }
  initDialog: (idValue, params?, idName?) => any
  params: Record<string, any>
  width: number | string
  height: number | string
  idName: string                  // 主键名称
  idValue: number
  struct: pageStruct.OptionT
  contents: Array<RwFormItems.OptionT | RwTabs.OptionT>
  contentsMap: Map<string, any>
  customizedDisabled: boolean
  buttons: RwButtonGroup.OptionT
  buttonsPosition: 'top' | 'bottom' | 'both'
  buttonLocation: 'start' | 'center' | 'end'
  hideSubmitClose: boolean
  hideReset: boolean
  hideSubmit: boolean
  hideClose: boolean
  loading: boolean
  changed: boolean
  showLoading: boolean
  submiting: boolean
  onChange: (event: FormChangeEvent) => void | Promise<void>
  autoSaveLocal: boolean
  storageId: string
  findItem: (name: string) => any
  changeItem: (name: string, options: any) => boolean
  addFormItems: (struct, options?) => any
  addTabs: (options?) => any
  changeButton: (name: string, options: any) => boolean
  debug: boolean
  onReset: (data: any) => any
  onSubmitBefore: (data: any) => any
  onSubmit: (data: any) => any
  onSubmitAfter: (data: any) => any
  onLoadBefore: () => any
  onLoad: () => any
  onLoadAfter: (data: any) => any
}
```

## 注意事项

- 表单默认带有 `submit` / `tempSave` / `reset` 按钮；`inDialog: true` 时会额外添加 `close` 按钮。
- 校验规则与默认数据由 `batchProcessForm` 自动生成，无需手动维护。
- `autoSaveLocal` 为 `true` 时表单数据会自动缓存到本地，避免刷新丢失。
- `findItem` 内部使用 Map 进行 O(1) 查找，并自动缓存结果。
