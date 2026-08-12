---
outline: deep
title: PageTable 页面表格
---

# PageTable 页面表格

页面表格组件，封装了 `RwPageBase` + `RwSearch` + `RwTable` + `RwPagination` + 操作按钮组，提供完整的列表页面方案，自动初始化所有子组件并串联交互。

## 引入

```ts
import { RwPageTable } from 'rw-vue-framework/controls'
```

## 基础用法

<script setup>
import Demo from '../../../../demos/src/pages/pages/pageTable/index.vue'
</script>

<Demo />

## 源码

<<< ../../../../demos/src/pages/pages/pageTable/index.vue{vue}

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

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type OptionT = {
  struct: pageStruct.OptionT
  operateButtons: RwButtonGroup.OptionT   // 操作区按钮（新增/删除/刷新/批量拖拽）
  tableButtons: RwButtonGroup.OptionT     // 表格区按钮（导入/导出）
  table: RwTable.OptionT
  pagination: RwPagination.OptionT
  search: RwSearch.OptionT | false
  page: RwPageBase.OptionT
  editName: object                         // 编辑弹窗的内容组件
  searchBefore: (data: any) => any
  showRefresh: boolean
}
```

## 注意事项

- 设置 `editName` 后会自动注册「新增」「编辑」弹窗，并添加「新增」操作按钮与表格「编辑」行按钮。
- 自动添加「删除选中」「刷新」「批量拖拽」「保存拖拽」「取消拖拽」等操作按钮。
- 自动添加「导入」「导出」下拉菜单到表格区。
- 通过 `control.search.addXxx` 添加搜索条件，`control.table.addXxx` 添加表格列。
- `searchBefore` 可在搜索前对查询条件进行预处理。
