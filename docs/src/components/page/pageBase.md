---
outline: deep
title: PageBase 页面基础
---

# PageBase 页面基础

页面基础组件，提供列表 / 表单 / 详情等页面的基础布局，统一管理页面弹窗（Dialog）的注册与打开。

## 引入

```ts
import { RwPageBase } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../demos/src/pages/pages/pageBase/index.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/pages/pageBase/index.vue{vue}

## API

### init 参数

```ts
function init(
  name: string,
  pageType: typeT,
  options?: Partial<OptionT>
): OptionT
```

| 参数     | 说明                          | 类型                              | 默认值 |
| -------- | ----------------------------- | --------------------------------- | ------ |
| name     | 页面名称                      | string                            | -      |
| pageType | 页面类型                      | `'table' \| 'form' \| 'info' \| 'query' \| 'customize'` | -      |
| options  | 选项对象                      | Partial\<OptionT\>                | -      |

### 实例方法

| 方法名      | 说明                                                  |
| ----------- | ----------------------------------------------------- |
| pushDialog  | 注册弹窗（name + 内容组件 + 按钮 + 选项）             |
| showDialog  | 打开弹窗（name + id + params）                        |

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type typeT = "table" | "form" | "info" | "query" | "customize"

type OptionT = {
  name: string
  type: typeT
  dialogs: RwDialog.OptionT[]
  pushDialog: (name: string, templateName: any, buttons?: RwButtonGroup.OptionT, options?: Partial<RwDialog.OptionT>) => void
  showDialog: (name: string, id?: number, params?: Record<string, any>) => void
}
```

## 注意事项

- `pushDialog` 注册弹窗后，`showDialog` 按 name 打开并传入 `id`（0 为新增，非 0 为编辑）与 `params`。
- 是 `RwPageTable` / `RwPageForm` 的基础，通常不单独使用。
