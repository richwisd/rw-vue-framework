---
outline: deep
title: TagComp 标签组件
---

# TagComp 标签组件

动态标签管理组件，基于 Element Plus 的 `ElTag` 扩展，支持从键值对、接口、变量三种来源加载选项，并提供新增标签、折叠展示等能力。

## 引入

```ts
import { RwTagComp } from 'rw-vue-framework/controls'
```

## 基础用法

```vue
<script setup>
import { RwTagComp } from 'rw-vue-framework/controls'
const tag = RwTagComp.init('controls', 'tags', {
  optionFrom: 'keyValue',
  optionValues: [
    { label: '标签一', value: 1 },
    { label: '标签二', value: 2 },
    { label: '标签三', value: 3 }
  ],
  collapseNum: 2
})
</script>

<template>
  <RwTagComp.Template :control="tag" />
</template>
```

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

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type optionFromT = 'keyValue' | 'api' | 'variable' | ''

type OptionT = TagProps & TagEmits & baseT & {
  collapseNum: number          // 折叠展示的标签数量
  optionValues: optionValueI[] // 选项数据
  optionFrom: optionFromT      // 选项来源
  buttonIcon: string | Component
  buttonLabel: string
  popoverWidth: number
  labelKey: string
  valueKey: string
  placeholder: string
  showAddNewTag: boolean       // 是否显示新增标签按钮
}
```

## 注意事项

- `optionFrom` 为 `api` 时通过接口加载选项；为 `keyValue` 时直接使用 `optionValues`；为 `variable` 时使用变量。
- `collapseNum` 控制超出多少个标签后折叠为 popover 展开。
- `showAddNewTag` 为 `true` 时显示新增按钮，可动态添加标签。
