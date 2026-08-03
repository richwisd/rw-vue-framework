---
outline: deep
title: PageStruct 页面结构
---

# PageStruct 页面结构

页面结构组件，是整个框架的核心数据结构，描述一个业务模块的字段、接口、菜单、路由、子模块等元信息，驱动表单校验、表格列、多语言等。

## 引入

```ts
import { pageStruct } from 'rw-vue-framework/controls'
```

## 基础用法

```ts
import { pageStruct } from 'rw-vue-framework/controls'

const struct = pageStruct.init('user', '1', '/api/user', {
  apis: { index: '/list', add: '/add', edit: '/edit', delete: '/del' }
})

struct.addField('username', 'varchar', { title: '用户名', not_null: true, maxLength: 50 })
struct.addField('age', 'int', { title: '年龄', min: 0, max: 120 })
struct.addMenu('user', ['add', 'edit', 'delete'])
```

## API

### init 参数

```ts
function init(
  name: string,
  tableID: string,
  apiURLFront: string,
  options?: Partial<OptionT>
): OptionT
```

| 参数        | 说明                          | 类型               | 默认值 |
| ----------- | ----------------------------- | ------------------ | ------ |
| name        | 模块名（多语言前缀，需唯一）  | string             | -      |
| tableID     | 表 ID                         | string             | -      |
| apiURLFront | 接口前缀                      | string             | -      |
| options     | 选项对象                      | Partial\<OptionT\> | -      |

### 实例方法

| 方法名          | 说明                                          |
| --------------- | --------------------------------------------- |
| addField        | 添加字段（支持批量）                          |
| addMenu         | 添加菜单（name + 子菜单数组）                 |
| addRouter       | 添加路由                                      |
| addSubModule    | 添加子模块                                    |
| deleteSubModule | 删除子模块                                    |
| getField        | 按字段名查找字段（别名 `findField`）          |

### Template Props

`pageStruct` 是数据结构，不渲染 UI，无 `Template`。

### OptionT 类型

```ts
type tableTypeT = 'single' | 'master' | 'slave'

type ApisOPtions = {
  index: string
  info: string
  import: string
  export: string
  downloadURL: string
  add: string
  edit: string
  delete: string
  [key: string]: string
}

type OptionT = {
  name: string
  tableID?: string
  tableType?: tableTypeT          // 默认 'single'
  apiURLFront?: string
  apis: ApisOPtions
  fields?: tableStruct.OptionT[]
  fieldsMap?: Map<string, tableStruct.OptionT>
  subModules?: subModuleT[]
  menus: string[]
  routers: RouterT[]
  addMenu: (name: string, children?: string[]) => void
  addRouter: (name: string, path: string, component: () => {}, meta?: string) => void
  addField: (fieldName: string | string[], type: tableStruct.mysqlFieldTypeT, options?: Partial<tableStruct.OptionT>) => void
  addSubModule?: (name: string, rule: string, options: Partial<subModuleT>) => void
  deleteSubModule?: (name: string) => boolean
}
```

### 默认子模块

初始化时自带以下子模块：`add` / `deleteSelected` / `edit` / `delete` / `import` / `export` / `getDownloadURL`。

### 默认接口

```ts
{
  index: '/index',
  info: '/info',
  import: '/import',
  export: '/export',
  downloadURL: '/getDownloadURL',
  add: '/add',
  edit: '/edit',
  delete: '/del'
}
```

## 注意事项

- `name` 是多语言前缀，整个系统中需保持唯一，否则语言包会冲突。
- `addField` 添加的字段会自动驱动表单校验规则（`not_null` → 必填，`maxLength` → 最大长度，`min`/`max` → 范围等）。
- 字段未指定 `title` 时，自动使用 `name.fieldName` 作为多语言 key。
- `tableType` 为 `master` / `slave` 时用于主从表结构。
