---
outline: deep
title: 页面示例
---

<script setup>
import PageTableDemo from '../../../demos/src/pages/pages/pageTable/index.vue'
import PageFormDemo from '../../../demos/src/pages/pages/pageForm/test.vue'
import PageBaseDemo from '../../../demos/src/pages/pages/pageBase/index.vue'
</script>

# 页面示例

本节展示 rw-vue-framework 在真实业务场景下的页面级用法。所有示例均直接引入 `demos` 目录中的源码，未额外制作 demo，所见即所用。

## 列表页面

完整列表页面方案，集成搜索区、操作按钮、表格、分页、新增 / 编辑弹窗、导入导出等能力。

<PageTableDemo />

源码详见 [PageTable 页面表格](/components/page/pageTable)。

## 表单页面

完整表单页面方案，封装 PageBase + Form，自动初始化页面与表单实例。

<PageFormDemo />

源码详见 [PageForm 页面表单](/components/page/pageForm)。

## 页面基础

页面基础布局，统一管理页面弹窗的注册与打开。

<PageBaseDemo />

源码详见 [PageBase 页面基础](/components/page/pageBase)。
