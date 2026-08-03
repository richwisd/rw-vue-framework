<script lang="ts" setup>

import struct  from './index'

import { RwPageTable } from 'rw-vue-framework/controls'

const pageTableC = RwPageTable.init(struct, {})

// 搜索框

pageTableC.search.addInput('address','like', {labelShow: false, value: ''})

pageTableC.search.addInput('name','like', {labelShow: false, value: ''})

// 表格

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    selected: true,
  },
  {
    date: '2016-05-02',
    name: 'Andy',
    address: 'No. 189, Grove St, Los Angeles',
    selected: false,
  },
  {
    date: '2016-05-04',
    name: 'Jim',
    address: 'No. 189, Grove St, Los Angeles',
    selected: true,
  },
  {
    date: '2016-05-01',
    name: 'Jhon',
    address: 'No. 189, Grove St, Los Angeles',
    selected: false,
  },
]

pageTableC.table.data = tableData
pageTableC.table.addText('date',  { width: "200px" })
pageTableC.table.addText('name',  { width: "100px" })
pageTableC.table.addText('address')
pageTableC.table.addSwitch('selected')

// 页码
pageTableC.pagination.total = 4
pageTableC.pagination.pageSize = 1

</script>

<template>
  <RwPageTable.Template :control="pageTableC"/>
</template>
