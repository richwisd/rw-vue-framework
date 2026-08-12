<script lang="ts" setup>

import { RwTable } from 'rw-vue-framework/controls'

import struct from './index'

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

const tableC = RwTable.init(struct, {})
tableC.addText('date',{width: '150px', sortable: true})
tableC.addText('name',{width: '150px'})
tableC.addText('address')
tableC.addSwitch('selected',{
  inactiveValue: false,
  activeValue: true,
})
</script>

<template>
  <div style="display: flex; flex-direction: column; flex: 1;">
    <h3 style="margin-bottom: 40px;">表格数据</h3>
    <RwTable.Template :control="tableC" :default-data="tableData"/>
  </div>
</template>

<style lang="scss" scoped>

</style>
