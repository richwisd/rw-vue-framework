---
outline: deep
title: Between 范围选择
---

# Between 范围选择

范围选择组件，用于在搜索区选择区间值（如价格区间、数量区间），需要绑定到一个 `pageStruct` 上下文中使用。

## 引入

```ts
import { RwBetween } from 'rw-vue-framework/controls'
```

## 基础用法

`RwBetween` 通常通过搜索区 `addBetween` 方法间接添加，也可以单独创建：

```ts
import { RwBetween } from 'rw-vue-framework/controls'
import { pageStruct } from 'rw-vue-framework/controls'

const struct = pageStruct.init('demo', '1', '/api/demo')
const between = RwBetween.init(struct, {})
```

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
type OptionT = baseT & {}
```

## 注意事项

- 该组件主要在搜索区使用，配合 `RwSearch.addBetween` 添加。
- 范围值会被转换为「>=」与「<」的查询条件参与搜索。
