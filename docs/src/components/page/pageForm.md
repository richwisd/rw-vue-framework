---
outline: deep
title: PageForm 页面表单
---

# PageForm 页面表单

页面表单组件，封装了 `RwPageBase` + `RwForm`，提供完整的表单页面方案，自动初始化页面基础与表单实例。

## 引入

```ts
import { RwPageForm } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../demos/src/pages/pages/pageForm/test.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/pages/pageForm/test.vue{vue}

## API

### init 参数

```ts
function init(
  struct: pageStruct.OptionT,
  options?: {
    page?: Partial<RwPageBase.OptionT>
    form?: Partial<RwForm.OptionT>
  }
): OptionT
```

| 参数    | 说明                              | 类型                              | 默认值 |
| ------- | --------------------------------- | --------------------------------- | ------ |
| struct  | 页面结构对象                      | pageStruct.OptionT                | -      |
| options | 选项对象（含 page / form 子配置） | `{ page?, form? }`                | -      |

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type OptionT = {
  page: RwPageBase.OptionT
  form: RwForm.OptionT
  controlType: string
}
```

## 注意事项

- 内部自动创建 `RwPageBase`（type 为 `form`）与 `RwForm` 实例。
- 通过 `control.page` 访问页面基础能力（弹窗等），通过 `control.form` 访问表单能力（addFormItems 等）。
- 表单的具体内容通过 `control.form.addFormItems` / `addTabs` 添加。
