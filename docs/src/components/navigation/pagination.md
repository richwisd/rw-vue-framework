---
outline: deep
title: Pagination 分页
---

# Pagination 分页

分页组件，扩展自 Element Plus 的 `ElPagination`，兼容其全部属性与事件，并默认初始化 `page` / `pageSize` / `total`。

## 引入

```ts
import { RwPagination } from 'rw-vue-framework/controls'
```

## 基础用法

```ts
import { RwPagination } from 'rw-vue-framework/controls'

const pagination = RwPagination.init('demo', {
  pageSize: 20,
  total: 100
})
```

## API

### init 参数

```ts
function init(
  name: string,
  options?: Partial<OptionT>
): OptionT
```

| 参数    | 说明                          | 类型               | 默认值 |
| ------- | ----------------------------- | ------------------ | ------ |
| name    | 控件名                        | string             | -      |
| options | 选项对象                      | Partial\<OptionT\> | -      |

::: tip
仅需 `name` 与 `options`。未传时 `currentPage` / `page` 默认 `1`，`pageSize` 默认 `10`，`total` 默认 `0`。
:::

### Template Props

| 名称    | 说明         | 类型    | 默认值 |
| ------- | ------------ | ------- | ------ |
| control | 控件描述对象 | OptionT | -      |

### OptionT 类型

```ts
type OptionT = PaginationProps & PaginationEmits & baseT & {
  total: number
  page: number
  pageSize: number
  currentPage: number
}
```

## 注意事项

- `page-size` / `page-sizes` / `layout` 等属性与 Element Plus 一致。
- 通常由 `RwPageTable` 内部创建，无需手动实例化。
