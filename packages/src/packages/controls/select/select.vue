
<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { ElCheckbox, ElOptionGroup, ElSelect, ElOption } from 'element-plus'
import type { CheckboxValueType } from 'element-plus'
import type { OptionT, listT } from "./select"
import { i18n } from '../../locale'
import { isComponent, isHTML, renderTemplate } from '../../utils'
import { useFormValue } from '../../hooks';
import { http } from '../../utils'

const { t } = i18n.global

const props = defineProps<{ control: OptionT, modelValue?: any }>()

// 使用计算属性获取各个属性，保持响应性
const lists = computed(() => props.control?.lists || [])
const showCheckAll = computed(() => props.control?.showCheckAll || false)
const groupBy = computed(() => props.control?.groupBy || '')
const remoteUrl = computed(() => props.control?.remoteUrl || '')
const propLoading = computed(() => props.control?.loading || false)

// 提取其他属性
const selectProps = computed(() => {
  const { lists, showCheckAll, groupBy, remoteUrl, loading, optionTemplate, tagTemplate, empty, prefix, ...rest } = props.control || {}
  return rest
})

const emit = defineEmits(['update:modelValue'])
const { fieldValue } = useFormValue<OptionT>(
  'RwSelect', // 组件名称
  props.control,   // 控件配置
)

const placeholder = computed(() => {
  const { placeholder, label, moduleName, name } = props.control
  if (placeholder) return t(`${moduleName}.${placeholder}`)

  const fieldName = label ?? t(`${moduleName}.${name}`)
  return t('controls.pleaseSelect') + fieldName
})

// 使用lists属性
const optionsList = computed(() => lists.value)

const loadingState = ref(false)
const remoteOptions = ref<listT[]>([])
const query = ref('')

//过滤后的选项列表
const filteredList = computed(() => {
  if (props.control.remote) {
    return remoteOptions.value.length > 0 ? remoteOptions.value : optionsList.value
  }

  if (props.control.filterable && query.value) {
    return optionsList.value.filter((item: any) =>
      String(item.label).toLowerCase().includes(query.value.toLowerCase()),
    )
  }

  return optionsList.value
})

// 分组相关
const hasGroups = computed(() => !!groupBy.value && groupBy.value.length > 0)
const groupedOptions = computed(() => {
  if (!hasGroups.value) return []

  const groups: Record<string, any> = {}
  optionsList.value.forEach((item: any) => {
    const groupKey = item[groupBy.value as keyof typeof item] || t('common.others')
    if (!groups[groupKey]) {
      groups[groupKey] = {
        label: groupKey,
        options: [],
      }
    }
    groups[groupKey].options.push(item)
  })

  return Object.values(groups)
})

// 全选相关
const isAllSelected = ref(false)
const isIndeterminate = ref(false)

const updateCheckAllStatus = () => {
  if (!Array.isArray(fieldValue.value)) return

  const allValues = lists.value
    .filter((item: any) => !item.disabled)
    .map((item: any) => item.value)
  const selectedCount = fieldValue.value.filter((v) => allValues.includes(v)).length

  isAllSelected.value =
    selectedCount === allValues.length && allValues.length > 0
  isIndeterminate.value = selectedCount > 0 && selectedCount < allValues.length
}

const handleCheckAllChange = (val: CheckboxValueType) => {
  const allValues = lists.value
    .filter((item: any) => !item.disabled)
    .map((item: any) => item.value)
  fieldValue.value = val ? [...allValues] : []
  isIndeterminate.value = false
}

// 远程搜索
const remoteMethod = (queryString: string) => {
  // console.log('queryString', queryString)
  if (queryString === '') {
    remoteOptions.value = []
    return
  }

  loadingState.value = true

  // 方式1：使用传入的 remoteMethod 方法
  if (props.control?.remoteMethod) {
    // 由于 remoteMethod 的类型是 void，我们直接调用它并假设它可能返回 Promise
    const result: any = props.control?.remoteMethod(queryString)
    // 检查 result 是否存在且有 then 方法（即是否为 Promise）
    if (result && typeof result.then === 'function') {
      result
        .then((data: any) => {
          loadingState.value = false
          remoteOptions.value = data
        })
        .catch(() => {
          loadingState.value = false
          console.error('远程搜索方法执行失败')
        })
    } else {
      loadingState.value = false
      // 如果没有返回 Promise，我们假设调用已经处理了结果
      // 可能需要根据实际实现调整这里的逻辑
    }
    return
  }

  // 方式2：使用传入的 URL 通过接口获取
  if (remoteUrl.value) {
    // 构建请求URL，添加查询参数
    // const url = remoteUrl.value.includes('?')
    //   ? `${remoteUrl.value}&query=${encodeURIComponent(queryString)}`
    //   : `${remoteUrl.value}?query=${encodeURIComponent(queryString)}`

    // 构建请求参数
    const params = {
      [props.control.paramName || 'query']: queryString,
    }

    http.post(remoteUrl.value, params)
      .then((data) => {
        loadingState.value = false
        // 假设返回的数据格式为 { data: [...] }，如果格式不同，需要调整
        const resultData = Array.isArray(data)
          ? data
          : data.data || data.result || data.items || data.lists || []
        remoteOptions.value = resultData.map((item: any, index: number) => {
          // 尝试适配不同的数据结构
          return {
            label: item.label || item.name || item.title || item.text || item,
            value: props.control.valueKey ? item : item.value || item.id || item.key || item,
            id: item.id || item.key || `${props.control.name}index`,
          }
        })
      })
      .catch((error) => {
        loadingState.value = false
        console.error('远程数据获取失败:', error)
        remoteOptions.value = []
      })
    return
  }
}

//合并属性
const mergedProps = computed(() => {
  return {
    ...selectProps.value,
    loading: loadingState.value || propLoading.value,
    remoteMethod: remoteMethod,
  }
})

watch(
  () => fieldValue.value,
  () => {
    if (showCheckAll.value && Array.isArray(fieldValue.value)) {
      // console.log('fieldValue.value', fieldValue.value)
      updateCheckAllStatus()
    }
  },
  { immediate: true, deep: true },
)

// 根据值获取对应的选项
const getItemByValue = (val: any) => {
  // 处理不同的参数类型
  const actualValue =
    typeof val === 'object' ? val.tag || val.value || val : val

  return (
    lists.value.find((item: any) => item.value === actualValue) || {
      label: actualValue,
      value: actualValue,
    }
  )
}
</script>

<template>
  <ElSelect
    v-model="fieldValue"
    v-bind="mergedProps"
    :placeholder="placeholder"
    @visible-change="(visible) => control['visible-change']?.(visible)"
    @change="(val) => { control.change?.(val) ; }"
    @remove-tag="(val) => control['remove-tag']?.(val)"
    @clear="() => control.clear?.()"
    @focus="(val) => control.focus?.(val)"
    @blur="(val) => control.blur?.(val)"
    @popup-scroll="(data) => control['popup-scroll']?.(data)"
  >
    <!-- 全选选项 -->
    <template v-if="showCheckAll && mergedProps.multiple" #header>
      <el-checkbox
        v-model="isAllSelected"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
      >
        {{ t('buttons.selectAll') }} </el-checkbox>
    </template>

    <!-- 分组选项 -->
    <template v-if="hasGroups">
      <el-option-group
        v-for="group in groupedOptions"
        :key="group.label"
        :label="group.label"
      >
        <ElOption
          v-for="item in group.options"
          :key="item.id || item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled ?? false"
        >
          <template v-if="$slots['option-template']" #default="scope">
            <slot name="option-template" v-bind="{ item, scope }"></slot>
          </template>
          <template v-else-if="control?.optionTemplate" #default="scope">
            <component :is="control.optionTemplate" v-if="isComponent(control.optionTemplate) && !isHTML(control.optionTemplate)" v-bind="{ item, scope }" />
            <div v-else-if="typeof control.optionTemplate === 'string' && isHTML(control.optionTemplate)" v-html="renderTemplate(control.optionTemplate, { item, scope })"></div>
            <span v-else>{{ control.optionTemplate }}</span>
          </template>
        </ElOption>
      </el-option-group>
    </template>

    <!-- 普通选项 -->
    <template v-else>
      <ElOption
        v-for="item in filteredList"
        :key="item.id || item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled ?? false"
      >
        <template v-if="$slots['option-template']" #default="scope">
          <slot name="option-template" v-bind="{ item, scope }"></slot>
        </template>
        <template v-else-if="control?.optionTemplate" #default="scope">
            <component :is="control.optionTemplate" v-if="isComponent(control.optionTemplate) && !isHTML(control.optionTemplate)" v-bind="{ item, scope }" />
            <div v-else-if="typeof control.optionTemplate === 'string' && isHTML(control.optionTemplate)" v-html="renderTemplate(control.optionTemplate, { item, scope })"></div>
            <span v-else>{{ control.optionTemplate }}</span>
        </template>
      </ElOption>
    </template>

    <!-- 无数据展示 -->
    <template v-if="$slots['empty']" #empty>
      <slot name="empty"></slot>
    </template>
    <template v-else-if="control?.empty" #empty>
      <component :is="control.empty" v-if="isComponent(control.empty) && !isHTML(control.empty)" />
      <div v-else-if="typeof control.empty === 'string' && isHTML(control.empty)" v-html="control.empty"></div>
      <span v-else>{{ control.empty }}</span>
    </template>

    <!-- 前缀图标 -->
    <template v-if="$slots['prefix']" #prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-else-if="control?.prefix" #prefix>
      <component :is="control.prefix" v-if="isComponent(control.prefix) && !isHTML(control.prefix)" />
      <div v-else-if="typeof control.prefix === 'string' && isHTML(control.prefix)" v-html="control.prefix"></div>
      <span v-else>{{ control.prefix }}</span>
    </template>

    <!-- 自定义标签模板 -->
    <template v-if="$slots['tag-template']" #tag="scope">
      <slot name="tag-template" v-bind="{ item: getItemByValue(scope), scope }"></slot>
    </template>
    <template v-else-if="control?.tagTemplate" #tag="scope">
      <component :is="control.tagTemplate" v-if="isComponent(control.tagTemplate) && !isHTML(control.tagTemplate)" v-bind="{ item: getItemByValue(scope), scope }" />
      <div v-else-if="typeof control.tagTemplate === 'string' && isHTML(control.tagTemplate)" v-html="renderTemplate(control.tagTemplate, { item: getItemByValue(scope), scope })"></div>
      <span v-else>{{ control.tagTemplate }}</span>
    </template>
  </ElSelect>
</template>

<style>
.el-select-dropdown__item {
  display: flex;
  align-items: center;
}
</style>
