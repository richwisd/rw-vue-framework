<script lang="ts" setup>
import { computed, ref, watch, onMounted, nextTick } from 'vue'
import {
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElTreeSelect,
} from 'element-plus'
import type { CheckboxGroupValueType } from 'element-plus'

import { RwSelect } from '../select'
import { RwSwitch } from '../switch'
import { RwImage } from '../image'
import type { OptionT, optionValuesT } from './mergeSelect'
import { http, isComponent, isHTML } from '../../utils'
import { useFormValue } from '../../hooks'
import { storeToRefs } from 'pinia'
import { useLocalSettingStore } from '../../stores'

const localSettingStore = useLocalSettingStore()
const { system } = storeToRefs(localSettingStore)

// 组件属性定义
const props = defineProps<{ control: OptionT; modelValue?: any }>()
// 组件状态
const indeterminate = ref(false)
const loading = ref(false)
const optionsList = ref<optionValuesT>([])
const dataCache = ref<Record<string, optionValuesT>>({})

const emit = defineEmits(['update:modelValue'])

const { fieldValue } = useFormValue<OptionT>(
  'RwMergeSelect', // 组件名称
  props.control, // 控件配置
)

// 添加计算属性来处理类型断言
const fieldValueAsStringOrNumber = computed({
  get: () => fieldValue.value as string | number,
  set: (value) => {
    fieldValue.value = value as any
    emit('update:modelValue', value)
  }
})

const fieldValueAsCheckboxGroup = computed({
  get: () => fieldValue.value as CheckboxGroupValueType,
  set: (value) => {
    fieldValue.value = value as any
    emit('update:modelValue', value)
  }
})

const fieldValueAsStringOrNumberOrBoolean = computed({
  get: () => fieldValue.value as string | number | boolean,
  set: (value) => {
    fieldValue.value = value as any
    emit('update:modelValue', value)
  }
})

const fieldValueAsStringOrNumberOrArray = computed({
  get: () => fieldValue.value as string | number | (string | number)[],
  set: (value) => {
    fieldValue.value = value as any
    emit('update:modelValue', value)
  }
})

// 计算属性
const editId = computed(() => props.control.editId)
const valueKey = computed(() => props.control.valueKey || 'value')
const labelKey = computed(() => props.control.labelKey || 'label')
const cacheKey = computed(
  () => `${props.control.url || ''}_${props.control.optionFrom || ''}`,
)

// 提取API请求逻辑为独立函数
// const fetchDataFromAPI = async (url: string, ): Promise<any> => {
//   try {
//     const res = await http.post(url, postData)

//     if (res.status === 0) {
//       return res.data.info || res.data
//     } else {
//       throw new Error(`API请求失败: ${res.errorMsg || '未知错误'}`)
//     }
//   } catch (error) {
//     console.error('API请求异常:', error)
//     throw error
//   }
// }

// 加载数据方法
const loadOptions = async (forceRefresh = false) => {
  // 检查缓存
  if (!forceRefresh && dataCache.value[cacheKey.value]) {
    optionsList.value = dataCache.value[cacheKey.value]
    return
  }

  loading.value = true
  try {
    switch (props.control.optionFrom) {
      case 'variable':
        optionsList.value = props.control.optionValues || []
        break
      case 'keyValue':
        if (props.control.url) {
          const result = await http.get(
            props.control.url,
            props.control.optionValues?.toString() || '',
          )
          optionsList.value = result.map((item: any) => ({
            ...item,
            label: item[props.control.labelKey || 'label'],
            value: item[props.control.valueKey || 'value'].toString(),
          })) as optionValuesT
          // 缓存结果
          dataCache.value[cacheKey.value] = optionsList.value
        }
        break
      case 'api':
        // console.log(
        //   'api',
        //   props.control.url,
        //   props.control?.params
        //     ? JSON.parse(JSON.stringify(props.control.params))
        //     : { pageSize: 99999, page: 1, searchList: [] },
        // )
        if (props.control.url) {
          const result = await http.post(
            props.control.url,
            props.control?.params
              ? JSON.parse(JSON.stringify(props.control.params))
              : { pageSize: 99999, page: 1, searchList: [] },
          )
          // console.log('result', result)
          const data = result?.data || result.data?.rows || result.data?.data
          const processedResult = (
            props.control.nodeKey !== undefined && editId.value !== 0
              ? setTreeIdDisabled(data)
              : data
          ) as optionValuesT
          optionsList.value = processedResult.map((item) => ({
            ...item,
            label: item[props.control.labelKey || 'label'],
            value: item[props.control.valueKey || 'value'].toString(),
          }))

          // 缓存结果
          dataCache.value[cacheKey.value] = optionsList.value
        }
        break
      default:
        console.warn(`未知的选项来源类型: ${props.control.optionFrom}`)
        break
    }
  } catch (error) {
    console.error('加载选项数据失败:', error)
    optionsList.value = []
  } finally {
    loading.value = false
  }
}

// 树形数据处理函数
function setTreeIdDisabled(result: any[]) {
  if (!Array.isArray(result)) return []

  return result.map((item) => {
    const newItem = { ...item, disabled: false }

    if (props.control.nodeKey && item[props.control.nodeKey] === editId.value) {
      newItem.disabled = true
      if (newItem.children) {
        newItem.children = setAllChildrenDisabled(newItem.children)
      }
    } else if (newItem.children && newItem.children.length > 0) {
      newItem.children = setTreeIdDisabled(newItem.children)
    }

    return newItem
  })
}

function setAllChildrenDisabled(items: any[]) {
  if (!Array.isArray(items)) return []

  return items.map((item) => {
    const newItem = { ...item, disabled: true }

    if (newItem.children) {
      newItem.children = setAllChildrenDisabled(newItem.children)
    }

    return newItem
  })
}

// 事件处理函数
function changeData(value: any) {
  // console.log('name', props.control.name, value)
  nextTick(() => {
    props.control.change?.(value)
    props.control.onChange?.(value)
  })
}

// 远程搜索方法
const remoteMethod = async (query: string) => {
  if (!query) {
    optionsList.value = []
    return []
  }

  // 检查缓存
  const queryCacheKey = `${cacheKey.value}_${query}`
  if (dataCache.value[queryCacheKey]) {
    return dataCache.value[queryCacheKey]
  }

  indeterminate.value = false
  loading.value = true

  try {
    if (props.control.url) {
      // 构建查询参数
      const params =
        props.control.remote && props.control.remoteParamKey
          ? { [props.control.remoteParamKey]: query }
          : { query }
      console.log('url', props.control.url, params)
      // const result = await http.get(props.control.url, params)
      // const processedResult = (props.control.nodeKey !== undefined && editId.value !== 0
      //   ? setTreeIdDisabled(result)
      //   : result) as optionValuesT

      // // 缓存结果
      // dataCache.value[queryCacheKey] = processedResult

      // return processedResult
      const result = [
        { value: '1', label: '张三' },
        { value: '2', label: '李四' },
        { value: '3', label: '王五' },
        { value: '4', label: '赵六' },
      ]
      const processedResult = result.filter((item) =>
        item.label.includes(query),
      )
      dataCache.value[queryCacheKey] = processedResult
      return processedResult
    }
    return []
  } catch (error) {
    console.error('远程搜索数据获取失败:', error)
    return []
  } finally {
    loading.value = false
  }
}

// 失焦处理
const blurMethod = () => {
  if (props.control.remote) {
    indeterminate.value = false
  }
}

const showTrans = (item: any, value: any) => {
  if (!props.control.showOpsTemplate || !item.template) {
    return false;
  }
  // if (value === fieldValue.value) {
  //   return true;
  // }
  // if (Array.isArray(fieldValue.value)) {
  //   return fieldValue.value.includes(value);
  // }
  return true;
}

// 监听 URL 变化，重新加载数据
watch(
  () => props.control.url,
  () => {
    if (!props.control.remote) {
      loadOptions(true)
    }
  },
)

// 监听 optionFrom 变化，重新加载数据
watch(
  () => props.control.optionFrom,
  () => {
    if (!props.control.remote) {
      loadOptions(true)
    }
  },
)

// 组件挂载时加载数据
onMounted(() => {
  if (!props.control.remote) {
    loadOptions()
  }
})
</script>

<template>
  <!-- <div class="rw-merge-select"> -->
  <!-- Select 组件 -->
  <RwSelect.Template
    v-if="control.type === 'select'"
    :control="
      ({
        ...control,
        loading,
        lists: optionsList as RwSelect.listT[],
        remoteMethod: control.remoteMethod || remoteMethod,
      } as RwSelect.OptionT)
    "
    v-model="fieldValueAsStringOrNumberOrArray"
    @blur="blurMethod"
  />

  <ElTreeSelect
    v-else-if="control.type === 'treeSelect'"
    v-model="fieldValue"
    v-bind="control"
    :data="optionsList"
    :loading="loading"
    @change="changeData"
  />

  <!-- Switch 组件 -->
  <RwSwitch.Template
    v-else-if="control.type === 'switch'"
    v-model="fieldValueAsStringOrNumber"
    :control="({
      disabled: control.disabled,
      activeValue: optionsList[0]?.[valueKey],
      inactiveValue: optionsList[1]?.[valueKey],
      activeText: optionsList[0]?.[labelKey],
      inactiveText: optionsList[1]?.[labelKey],
    } as RwSwitch.OptionT)"
    @change="changeData"
  />

  <!-- Checkbox/Radio 组件 -->
  <template v-else-if="control.type === 'checkbox' || control.type === 'radio'">
    <!-- 多选模式 -->
    <ElCheckboxGroup
      v-if="control.multiple"
      v-model="fieldValueAsCheckboxGroup"
      :disabled="control.disabled"
      :multiple-limit="control.multipleLimit"
      @change="changeData"
    >
      <!-- 按钮样式 -->
      <template v-if="control.checkBoxType || system.checkBox === 'button'">
        <ElCheckboxButton
          v-for="(item, index) in optionsList"
          :key="item[valueKey]"
          :value="item[valueKey]"
          :disabled="item.disabled"
        >
          <template v-if="control?.optionTemplate">
            <component
              :is="control.optionTemplate"
              v-if="
                isComponent(control.optionTemplate) &&
                !isHTML(control.optionTemplate)
              "
              v-bind="{ item, index }"
            />
            <div
              v-else-if="
                typeof control.optionTemplate === 'string' &&
                isHTML(control.optionTemplate)
              "
              v-html="control.optionTemplate"
            ></div>
            <span v-else>{{ control.optionTemplate }}</span>
          </template>
          <template v-else>
            <div class="label-item">
              <RwImage.Template v-if="control?.showImage && item?.image" :control="{ src: item?.image } as RwImage.OptionT" />
              <div v-if="showTrans(item, item[valueKey])" style="width:200px; height:100px;">
                <component :is="item.template" />
              </div>
              <div>{{ item[labelKey] }}</div>
            </div>
          </template>
        </ElCheckboxButton>
      </template>

      <!-- 普通样式 -->
      <template v-else>
        <ElCheckbox
          v-for="(item, index) in optionsList"
          :key="item[valueKey]"
          :value="item[valueKey]"
          :disabled="item?.disabled"
          style="padding-bottom: 10px;"
        >
          <template v-if="control?.optionTemplate">
            <component
              :is="control.optionTemplate"
              v-if="
                isComponent(control.optionTemplate) &&
                !isHTML(control.optionTemplate)
              "
              v-bind="{ item, index }"
            />
            <div
              v-else-if="
                typeof control.optionTemplate === 'string' &&
                isHTML(control.optionTemplate)
              "
              v-html="control.optionTemplate"
            ></div>
            <span v-else>{{ control.optionTemplate }}</span>
          </template>
          <template v-else>
            <div class="label-item">
              <RwImage.Template v-if="control?.showImage && item?.image" :control="{ src: item?.image } as RwImage.OptionT" />
              <div v-if="showTrans(item, item[valueKey])" :style="{ width: control?.opsTemplateWidth ?? '200px', height: control?.opsTemplateHeight ?? '100px' }">
                <component :is="item.template" />
              </div>
              <div>{{ item[labelKey] }}</div>
            </div>
          </template>
        </ElCheckbox>
      </template>
    </ElCheckboxGroup>

    <!-- 单选模式 -->
    <ElRadioGroup
      v-else
      v-model="fieldValueAsStringOrNumberOrBoolean"
      :disabled="control.disabled"
      @change="changeData"
    >
      <!-- 按钮样式 -->
      <template v-if="control.checkBoxType || system.checkBox === 'button'">
        <ElRadioButton
          v-for="(item, index) in optionsList"
          :key="item[valueKey]"
          :value="item[valueKey]"
          :disabled="item.disabled"
        >
          <template v-if="control?.optionTemplate">
            <component
              :is="control.optionTemplate"
              v-if="
                isComponent(control.optionTemplate) &&
                !isHTML(control.optionTemplate)
              "
              v-bind="{ item, index }"
            />
            <div
              v-else-if="
                typeof control.optionTemplate === 'string' &&
                isHTML(control.optionTemplate)
              "
              v-html="control.optionTemplate"
            ></div>
            <span v-else>{{ control.optionTemplate }}</span>
          </template>
          <template v-else>
            <div class="label-item">
              <RwImage.Template v-if="control?.showImage && item?.image" :control="{ src: item?.image } as RwImage.OptionT" />
              <div v-if="showTrans(item, item[valueKey])" style="width:200px; height:100px;">
                <component :is="item.template" />
              </div>
              <div>{{ item[labelKey] }}</div>
            </div>
          </template>
        </ElRadioButton>
      </template>

      <!-- 普通样式 -->
      <template v-else>
        <ElRadio
          v-for="(item, index) in optionsList"
          :key="item[valueKey]"
          :value="item[valueKey]"
          :disabled="item.disabled"
          style="padding-bottom: 10px;"
        >
          <template v-if="control?.optionTemplate">
            <component
              :is="control.optionTemplate"
              v-if="
                isComponent(control.optionTemplate) &&
                !isHTML(control.optionTemplate)
              "
              v-bind="{ item, index }"
            />
            <div
              v-else-if="
                typeof control.optionTemplate === 'string' &&
                isHTML(control.optionTemplate)
              "
              v-html="control.optionTemplate"
            ></div>
            <span v-else>{{ control.optionTemplate }}</span>
          </template>
          <template v-else>
            <div class="label-item">
              <RwImage.Template v-if="control?.showImage && item?.image" :control="{ src: item?.image } as RwImage.OptionT" />
              <div v-if="showTrans(item, item[valueKey])" style="width:200px; height:100px;">
                <component :is="item.template" />
              </div>
              <div>{{ item[labelKey] }}</div>
            </div>
          </template>
        </ElRadio>
      </template>
    </ElRadioGroup>
  </template>
</template>

<style scoped>
.label-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.el-radio, .el-checkbox {
  height: unset !important;
}
</style>
