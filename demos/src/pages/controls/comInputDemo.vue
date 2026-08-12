
<script lang="ts" setup>
import { RwMergeInput } from 'rw-vue-framework/controls'
import { onMounted, ref } from 'vue'
import { moduleName } from './langs'

const value1 = ref('')
const testInput1 = RwMergeInput.init(moduleName, 'username', {
  inputType: 'input',
  type: 'text',
  change: (val) => {
    console.log('change', val)
    return true
  }
})

const value2 = ref(0)
const testInput2 = RwMergeInput.init(moduleName, 'password', {
  inputType: 'inputNumber',
})

const value3 = ref([])
const testInput3 = RwMergeInput.init(moduleName, 'username',{
  inputType: 'inputTag',
  change: (val) => {
    console.log('change',val)
    return !!val
  }
})

interface RestaurantItem {
  value: string
  link: string
}

interface RestaurantItem {
  value: string
  link: string
}

const value4 = ref('')
const restaurants = ref<RestaurantItem[]>([])
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // call callback function to return suggestions
  cb(results)
}
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ]
}


const testInput4 = RwMergeInput.init<'autocomplete'>(moduleName, 'username',{
  inputType: 'autocomplete',
  fetchSuggestions: querySearch,
  select: (val) => {
    console.log('change',val)
    return !!val
  }
})


// 添加表单提交处理函数
const handleSubmit = (e: { preventDefault: () => void }) => {
  e.preventDefault() // 阻止表单默认提交行为
  console.log('表单提交', { username: value1.value, password: value2.value })
}

onMounted(() => {
  restaurants.value = loadAll()
})
</script>

<template>
  <!-- 将输入框包裹在表单中 -->
  <form @submit="handleSubmit">
    <RwMergeInput.Template :control="testInput1" v-model="value1" />
    <RwMergeInput.Template :control="testInput2" v-model="value2" />
    <RwMergeInput.Template :control="testInput3" v-model="value3" />
    <RwMergeInput.Template :control="testInput4" v-model="value4" />
    <!-- 可选：添加提交按钮 -->
    <button type="submit" style="margin-top: 10px;">提交</button>
  </form>
</template>
