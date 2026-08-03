---
outline: deep
title: Tree 树形控件
---

# Tree 树形控件

树形控件，扩展自 Element Plus 的 `ElTree`，支持接口加载数据、属性映射、复选框、拖拽、懒加载等增强功能。

## 引入

```ts
import { RwTree } from 'rw-vue-framework/controls'
```

## 基础用法

```vue
<script setup>
import { RwTree } from 'rw-vue-framework/controls'
const tree = RwTree.init('controls', 'menu', {
  data: [
    { id: 1, label: '一级 1', children: [
      { id: 11, label: '二级 1-1' }
    ] }
  ],
  showCheckbox: true,
  defaultExpandAll: true
})
</script>

<template>
  <RwTree.Template :control="tree" />
</template>
```

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

### OptionT 类型

```ts
interface OptionT extends baseT, TreeEventCallbacks {
  // 数据源
  url?: string                     // 接口地址
  params?: Record<string, any>
  data?: TreeNode[]
  optionsKey?: string              // 默认 'rows'
  checkKey?: string
  // 节点属性映射
  children?: string                // 默认 'children'
  label?: string                   // 默认 'label'
  value?: string                   // 默认 'value'
  disabled?: string                // 默认 'disabled'
  // 功能
  multiple?: boolean
  showCheckbox?: boolean
  nodeKey?: string
  // 展开/选择
  highlightCurrent?: boolean       // 默认 true
  expandOnClickNode?: boolean      // 默认 false
  defaultExpandAll?: boolean       // 默认 false
  defaultExpandedKeys?: (string | number)[]
  defaultCheckedKeys?: (string | number)[]
  checkStrictly?: boolean
  // 交互
  accordion?: boolean
  indent?: number                  // 默认 18
  // 拖拽
  draggable?: boolean
  allowDrag?: AllowDragMethod
  allowDrop?: AllowDropMethod
  // 过滤/懒加载
  filterNodeMethod?: FilterNodeMethod
  lazy?: boolean
  load?: (node, resolve) => void
  // 样式
  emptyText?: string               // 默认 '暂无数据'
  empty?: any
  default?: any
}
```

## 注意事项

- 设置 `url` 后会自动请求接口加载节点数据，配合 `optionsKey` 取返回数据中的列表。
- `checkStrictly: true` 时父子节点不联动。
- `lazy: true` 配合 `load` 实现懒加载子节点。
- `draggable: true` 开启拖拽，配合 `allowDrag` / `allowDrop` 控制可拖拽与可放置节点。
