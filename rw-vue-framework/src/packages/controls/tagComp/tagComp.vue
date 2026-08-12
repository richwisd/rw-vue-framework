<script lang="ts" setup>
import {  type OptionT } from './tagComp'
import { t } from '../../locale'
import { ElAutocomplete } from 'element-plus'
import { computed, ref, nextTick, watch } from 'vue'
import { RwButton } from '../button'
import { RwTag } from '../tag'

import { useFormValue } from "../../hooks";
import { useLocalSettingStore } from '../../stores'
import { http } from '../../utils'
// import { useParamListStore } from '@/stores/paramlist'
// const paramList=useParamListStore()
const localSetting = useLocalSettingStore()

const props = defineProps<{ control: OptionT, modelValue?: any  }>()
const emit = defineEmits(['update:modelValue'])

const { fieldValue } = useFormValue<OptionT>(
  'RwTagComp', // 组件名称
  props.control,   // 控件配置
)

const tagProps = computed(() => {
  const {
    collapseNum,
    optionValues,
    optionFrom,
    buttonIcon,
    buttonLabel,
    ...rest
  } = props.control
  return { closable: props.control.showAddNewTag, ...rest}
})

// 将 values 改为计算属性
const values = computed(() => {
  if (fieldValue.value) {
    // 先将中文逗号替换为英文逗号，再进行分割
    return fieldValue.value.toString().replace(/，/g, ',').split(',')
  }
  return []
})

// 将 showNumber 改为计算属性
const showNumber = computed(() => {
  return values.value.length > props.control.collapseNum
    ? props.control.collapseNum - 1
    : values.value.length
})

// 将 otherNumber 改为计算属性
const otherNumber = computed(() => {
  return values.value.length - showNumber.value
})

const optionsList = ref<any>([])

const keyword = ref('')

// 将 valueKeys 改为计算属性，基于 fieldValue.value 初始化
const valueKeys = computed({
  get: () => {
    if (fieldValue.value) {
      // 先将中文逗号替换为英文逗号，再进行分割
      return fieldValue.value.toString().replace(/，/g, ',').split(',')
    }
    return []
  },
  set: (val) => {
    fieldValue.value = val.join(',')
  }
})

const addButton = computed(() => {
  return RwButton.init(props.control.moduleName, 'addButton', {
    label: props.control.buttonLabel,
    icon: props.control.buttonIcon,
  })
})

// 获取数据
const getData = async (queryString: string, cb: (arg: any) => void) => {
  let suggestions: any[] = []

  switch (props.control.optionFrom) {
    case 'variable':
      // 对 variable 类型的数据进行过滤
      optionsList.value = props.control.optionValues || []
      suggestions = querySearch(queryString)
      break
    case 'keyValue':
      break
    case 'api':
      const paramName = props.control.optionValues.toString()
      const res = await http.post("?p=index&a=index&apiName=" + paramName, { pageSize: 99999, page: 1, searchList: [{ key: 'keyword', value: queryString, option: '=' }] })
      if (res.status == 0) {
        optionsList.value = res.data.rows
        suggestions = querySearch(queryString)
      }
      break
    default:
      suggestions = []
  }

  cb(suggestions)
}

const inputVisible = ref(false)

const InputRef = ref<any>()

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.focus()
  })
}

const handleInputConfirm = () => {
  inputVisible.value = false
  keyword.value = ''
}

const handleClose = (tag: string) => {
  const index = values.value.indexOf(tag)
  if (index > -1) {
    // 创建新的数组副本
    const newValueKeys = [...valueKeys.value]
    // 从 newValueKeys 中移除对应的值
    newValueKeys.splice(index, 1)
    // 更新 fieldValue
    valueKeys.value = newValueKeys
    // 注意：由于 values 是计算属性，它会自动更新
  }
}

interface ValueItem {
  key: string | number
  value: string
}

const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  // 确保每次输入都触发搜索
  getData(queryString, cb)
}

const querySearch = (queryString: string) => {
  // 处理 labelKey 映射
  const processedOptions = (optionsList.value || []).map((obj: any) => {
    if (obj.hasOwnProperty(props.control.labelKey)) {
      return {
        ...obj,
        value: obj[props.control.labelKey]
      }
    }
    return obj
  })

  // 使用queryString来过滤数据
  const results = queryString ? processedOptions.filter(createFilter(queryString)) : processedOptions

  // 调用回调并返回过滤后的数据
  return results
}

// 本地搜索
const createFilter = (queryString: string) => {
  return (suggestion: ValueItem) => {
    return (
      suggestion.value &&
      suggestion.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
    )
  }
}

const handleSelect = (item: Record<string, any>) => {
  // 获取要添加的值，优先使用valueKey，如果没有则使用item.value
  const valueToAdd = item[props.control.valueKey] || item.value

  // 确保值不为空
  if (valueToAdd && valueToAdd !== '') {
    // 创建新的数组副本
    const newValueKeys = [...valueKeys.value]
    // 将新值添加到 newValueKeys
    newValueKeys.push(valueToAdd)

    // 去重
    const uniqueValueKeys = newValueKeys.reduce((accumulator: any, currentValue: any) => {
      if (!accumulator.includes(currentValue)) {
        accumulator.push(currentValue)
      }
      return accumulator
    }, [])

    // 更新 fieldValue
    valueKeys.value = uniqueValueKeys

    // 注意：由于 values 是计算属性，它会根据 fieldValue 自动更新
  }
  inputVisible.value = false
  keyword.value = ''
}
</script>
<template>
  <div class="flex gap-1 flex-wrap" style="align-items: center;">
    <template v-for="(tabInfo, index) in values" :key="index">
      <RwTag.Template
        v-if="index < showNumber"
        :control="tagProps"
        @close="handleClose(tabInfo)"
        >{{ tabInfo }}</RwTag.Template
      >
    </template>
    <ElPopover
      placement="right"
      :width="control.popoverWidth"
      v-if="otherNumber > 0"
    >
      <template #reference>
        <RwTag.Template :control="{ ...tagProps, type: 'warning' }">
          {{ t('buttons.more') }}({{ otherNumber }})...
        </RwTag.Template>
      </template>
      <div class="gap-1 flex flex-wrap">
        <template v-for="(tabInfo, index) in values" :key="index">
          <RwTag.Template
            v-if="index >= showNumber"
            :control="tagProps"
            @close="handleClose(tabInfo)"
          >
            {{ tabInfo }}
          </RwTag.Template>
        </template>
      </div>
    </ElPopover>
    <span v-if="props.control.showAddNewTag">
      <ElAutocomplete
        :placeholder="t(control.placeholder)"
        v-if="inputVisible"
        v-model="keyword"
        class="w-50"
        ref="InputRef"
        clearable
        @select="handleSelect"
        @blur="handleInputConfirm"
        :fetch-suggestions="querySearchAsync"
      />
      <RwButton.Template :control="addButton" @click="showInput" v-else />
    </span>
  </div>
</template>
