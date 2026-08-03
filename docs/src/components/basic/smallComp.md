---
outline: deep
title: SmallComp 小组件
---

# SmallComp 小组件

小型组件容器，用于在表单/表格中嵌入紧凑布局的自定义内容。它仅暴露 `Template`，不提供 `init` 工厂函数，作为通用插槽容器使用。

## 引入

```ts
import { RwSmallComp } from 'rw-vue-framework/controls'
```

## 基础用法

`RwSmallComp.Template` 直接作为包裹容器使用，内部通过默认插槽渲染内容。

```vue
<script setup>
import { RwSmallComp } from 'rw-vue-framework/controls'
</script>

<template>
  <RwSmallComp.Template>
    <span>紧凑布局内容</span>
  </RwSmallComp.Template>
</template>
```

## API

### Template Props

该组件为纯容器组件，无 `control` 配置对象，通过插槽接收内容。

### 插槽

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义渲染内容 |

## 注意事项

- 该组件不遵循 `init` 工厂模式，直接使用 `Template` 即可。
- 适用于需要在表单项、表格列等配置驱动场景中插入自定义小块内容的场合。
