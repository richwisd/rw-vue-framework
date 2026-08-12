
<script lang="ts" setup>
import { RwMergeSelect } from 'rw-vue-framework/controls'
import { ref } from 'vue'
import { moduleName } from './langs'

// 基本使用示例
const selectValue = ref('')
const multiSelectValue = ref([])
const radioValue = ref('')
const checkboxValue = ref([])
const switchValue = ref('')
const treeSelectValue = ref('')

// 基础选项数据
const basicOptions = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
  { value: 'option4', label: '选项4' },
  { value: 'option5', label: '选项5' },
  { value: 'option6', label: '选项6' },
]

// 开关选项数据
const switchOptions = [
  { value: true, label: '开启' },
  { value: false, label: '关闭' },
]

// 树形选项数据
const treeOptions = [
  {
    value: 'parent1',
    label: '父节点1',
    children: [
      { value: 'child1-1', label: '子节点1-1' },
      { value: 'child1-2', label: '子节点1-2' },
    ],
  },
  {
    value: 'parent2',
    label: '父节点2',
    children: [
      { value: 'child2-1', label: '子节点2-1' },
      { value: 'child2-2', label: '子节点2-2' },
    ],
  },
]

// 创建各种类型的控件配置
const selectControl = RwMergeSelect.init(
  moduleName,
  'basicSelect',
  'variable',
  basicOptions,
  {
    placeholder: '请选择一个选项',
  }
)

const multiSelectControl = RwMergeSelect.init(
  moduleName,
  'multiSelect',
  'variable',
  basicOptions,
  {
    placeholder: '请选择多个选项',
    multiple: true,
    showCheckAll: true,
  }
)

const radioControl = RwMergeSelect.init(
  moduleName,
  'radioSelect',
  'variable',
  basicOptions.slice(0, 4),
  {
    type: 'radio',
  }
)

const radioButtonControl = RwMergeSelect.init(
  moduleName,
  'radioButtonSelect',
  'variable',
  basicOptions.slice(0, 4),
  {
    type: 'radio',
    checkBoxType: true,
  }
)

const checkboxControl = RwMergeSelect.init(
  moduleName,
  'checkboxSelect',
  'variable',
  basicOptions.slice(0, 4),
  {
    type: 'checkbox',
    multiple: true,
  }
)

const checkboxButtonControl = RwMergeSelect.init(
  moduleName,
  'checkboxButtonSelect',
  'variable',
  basicOptions.slice(0, 4),
  {
    type: 'checkbox',
    multiple: true,
    checkBoxType: true,
  }
)

const switchControl = RwMergeSelect.init(
  moduleName,
  'switchSelect',
  'variable',
  switchOptions,
  {
    type: 'switch',
  }
)

const treeSelectControl = RwMergeSelect.init(
  moduleName,
  'treeSelect',
  'variable',
  treeOptions,
  {
    type: 'treeSelect',
    nodeKey: 'value',
    editId: 0,
  }
)

// 远程搜索示例
const remoteSelectValue = ref('')
const remoteSelectControl = RwMergeSelect.init(
  moduleName,
  'remoteSelect',
  'api',
  [],
  {
    placeholder: '输入关键词搜索',
    // remote: true,
    remoteParamKey: 'query',
    // 实际项目中应该使用真实的API地址
    url: '/api/options',
    // filterable: true,
  }
)
// 远程搜索示例
const remoteSelectValue1 = ref('')
const remoteSelectControl1 = RwMergeSelect.init(
  moduleName,
  'remoteSelect',
  'api',
  [],
  {
    placeholder: '输入关键词搜索',
    remote: true,
    remoteParamKey: 'query',
    // 实际项目中应该使用真实的API地址
    url: '/api/options',
    filterable: true,
  }
)

// 自定义模板示例
const templateSelectValue = ref('')
const templateSelectControl = RwMergeSelect.init(
  moduleName,
  'templateSelect',
  'variable',
  basicOptions.map(item => ({
    ...item,
    description: `这是${item.label}的描述信息`
  })),
  {
    optionTemplate: '<div style="display:flex;"><strong>{{item.label}}</strong><div style="font-size: 12px; color: #999;">{{item.description}}</div></div>',
  }
)
</script>

<template>
  <div class="merge-select-demo">
    <h2>MergeSelect 组件示例</h2>

    <section>
      <h3>基础选择器</h3>
      <div class="demo-item">
        <RwMergeSelect.Template
          :control="selectControl"
          v-model="selectValue"
        />
        <div class="demo-value">当前值: {{ selectValue }}</div>
      </div>
    </section>

    <section>
      <h3>多选选择器</h3>
      <div class="demo-item">
        <RwMergeSelect.Template
          :control="multiSelectControl"
          v-model="multiSelectValue"
        />
        <div class="demo-value">当前值: {{ multiSelectValue }}</div>
      </div>
    </section>

    <section>
      <h3>单选按钮组</h3>
      <div class="demo-item">
        <RwMergeSelect.Template
          :control="radioControl"
          v-model="radioValue"
        />
        <div class="demo-value">当前值: {{ radioValue }}</div>
      </div>
    </section>

    <section>
      <h3>按钮样式单选</h3>
      <div class="demo-item">
        <RwMergeSelect.Template
          :control="radioButtonControl"
          v-model="radioValue"
        />
        <div class="demo-value">当前值: {{ radioValue }}</div>
      </div>
    </section>

    <section>
      <h3>复选框组</h3>
      <div class="demo-item">
        <RwMergeSelect.Template
          :control="checkboxControl"
          v-model="checkboxValue"
        />
        <div class="demo-value">当前值: {{ checkboxValue }}</div>
      </div>
    </section>

    <section>
      <h3>按钮样式复选框</h3>
      <div class="demo-item">
        <RwMergeSelect.Template
          :control="checkboxButtonControl"
          v-model="checkboxValue"
        />
        <div class="demo-value">当前值: {{ checkboxValue }}</div>
      </div>
    </section>

    <section>
      <h3>开关选择器</h3>
      <div class="demo-item">
        <RwMergeSelect.Template
          :control="switchControl"
          v-model="switchValue"
        />
        <div class="demo-value">当前值: {{ switchValue }}</div>
      </div>
    </section>

    <section>
      <h3>树形选择器</h3>
      <div class="demo-item">
        <RwMergeSelect.Template
          :control="treeSelectControl"
          v-model="treeSelectValue"
        />
        <div class="demo-value">当前值: {{ treeSelectValue }}</div>
      </div>
    </section>

    <section>
      <h3>远程搜索</h3>
      <div class="demo-item">
        <RwMergeSelect.Template
          :control="remoteSelectControl"
          v-model="remoteSelectValue"
        />
        <div class="demo-value">当前值: {{ remoteSelectValue }}</div>
      </div>
    </section>

    <section>
      <h3>远程搜索可筛选</h3>
      <div class="demo-item">
        <RwMergeSelect.Template
          :control="remoteSelectControl1"
          v-model="remoteSelectValue1"
        />
        <div class="demo-value">当前值: {{ remoteSelectValue1 }}</div>
      </div>
    </section>

    <section>
      <h3>自定义模板</h3>
      <div class="demo-item">
        <RwMergeSelect.Template
          :control="templateSelectControl"
          v-model="templateSelectValue"
        />
        <div class="demo-value">当前值: {{ templateSelectValue }}</div>
      </div>
    </section>
  </div>
</template>

<style scoped>
h2, h3 {
  margin-bottom: 16px;
}

.merge-select-demo {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.demo-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.demo-value {
  margin-top: 10px;
  padding: 8px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-family: monospace;
}
</style>
