<template>
  <div class="table-form-examples">
    <h1>RwTable 表格表单组件示例</h1>

    <!-- 基础示例 -->
    <section class="example-section">
      <h2>1. 基础表格表单</h2>
      <div class="example-content">
        <RwTable.Template
          :control="basicTableForm"
          v-model:default-data="basicTableData"
        />
      </div>
      <div class="example-info">
        <p>当前数据: {{ JSON.stringify(basicTableData, null, 2) }}</p>
      </div>
    </section>


  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RwTable } from 'rw-vue-framework/controls'

// 创建页面结构
const struct = {name:'test'}

// 基础表格表单配置
const basicTableForm = RwTable.init(struct, {
  showCheckAll: false,
  allForm: true,
  showIndex: true,
  showToolbar: true,
  height: 300,
  changeForm: (val, name, row) => {
    console.log(val, name, row)
    if(name === 'gender' && val === 'male'){
      row.status = true
    }
  }
})
console.log('basicTableForm', basicTableForm)
// 添加基础列
basicTableForm.addInput('name', {
  label: '姓名',
  width: 120,
  placeholder: '请输入姓名'
})

basicTableForm.addSelect('gender', {
  label: '性别',
  width: 100,
  lists: [
    { label: '男', value: 'male' },
    { label: '女', value: 'female' }
  ]
})

basicTableForm.addSwitch('status', {
  label: '状态',
  width: 80
})

// 基础表格数据
const basicTableData = ref([
  {
    id: 1,
    name: '',
    gender: '',
    age: 20,
    status: false
  },
  {
    id: 2,
    name: '',
    gender: '',
    age: 28,
    status: false
  },
  {
    id: 3,
    name: '',
    gender: '',
    age: 32,
    status: false
  }
])


</script>

<style scoped>
.table-form-examples {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.example-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background: #fff;
}

.example-section h2 {
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #409eff;
}

.example-content {
  margin-bottom: 20px;
}

.example-info {
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #409eff;
}

.example-info p {
  margin: 5px 0;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #606266;
  white-space: pre-wrap;
  word-break: break-all;
}

h1 {
  text-align: center;
  color: #303133;
  margin-bottom: 30px;
}
</style>
