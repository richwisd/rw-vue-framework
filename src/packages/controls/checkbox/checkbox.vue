<script setup lang="ts">
import {
  ElCheckbox,
  ElCheckboxGroup,
  ElCheckboxButton,
  ElButton,
  ElIcon,
  type CheckboxValueType,
} from 'element-plus'
import { Loading, Warning, Refresh } from '@element-plus/icons-vue'
import { computed, onMounted, ref, watch } from 'vue'
import { http } from '../../utils'
import { useFormValue } from '../../hooks'
import { type OptionT, type CheckboxOption } from './checkbox'
import { t } from '../../locale'
defineOptions({ name: 'RwCheckbox' })

// 组件属性
type Props = {
  control: OptionT
  modelValue?: any // 添加modelValue属性支持v-model
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
// 表单值管理
const { fieldValue } = useFormValue<OptionT>('RwCheckbox', props.control)

// 响应式数据
const optionsData = ref<CheckboxOption[]>([])
const isLoading = ref(false)
const error = ref<string>('')
const checkboxGroupRef = ref()

// 计算属性
const isSingleMode = computed(() => !props.control.multiple)
const isMultipleMode = computed(() => Boolean(props.control.multiple))
const isDefaultType = computed(
  () => props.control.checkBoxType === 'default' || !props.control.checkBoxType,
)
const isButtonType = computed(() => props.control.checkBoxType === 'button')

// 过滤掉自定义属性，只传递 Element Plus 支持的属性
const checkboxProps = computed(() => {
  const {
    // 过滤掉自定义属性
    multiple,
    checkBoxType,
    url,
    params,
    options,
    optionsKey,
    labelKey,
    valueKey,
    disabledKey,
    trueValue,
    falseValue,
    direction,
    gap,
    checkAll,
    checkAllText,
    onChange,
    onInput,
    default: defaultSlot,
    // 基础属性也要过滤
    moduleName,
    name,
    ...elementPlusProps
  } = props.control

  return elementPlusProps
})

// 获取选项的显示标签
const getOptionLabel = (option: CheckboxOption): string => {
  const labelKey = props.control.labelKey || 'label'
  return String(option[labelKey] || option.label || '')
}

// 获取选项的值
const getOptionValue = (option: CheckboxOption): CheckboxValueType => {
  const valueKey = props.control.valueKey || 'value'
  return option[valueKey] !== undefined ? option[valueKey] : option.label
}

// 获取选项的禁用状态
const getOptionDisabled = (option: CheckboxOption): boolean => {
  const disabledKey = props.control.disabledKey || 'disabled'
  return Boolean(option[disabledKey] || option.disabled)
}

// 处理的选项数据
const processedOptions = computed(() => {
  return optionsData.value.map((option) => ({
    ...option,
    label: getOptionLabel(option),
    value: getOptionValue(option),
    disabled: getOptionDisabled(option),
  }))
})

// 全选状态
const isCheckAll = computed(() => {
  if (!isMultipleMode.value || !props.control.checkAll) return false
  if (!Array.isArray(fieldValue.value) || processedOptions.value.length === 0)
    return false

  const enabledOptions = processedOptions.value.filter(
    (option) => !option.disabled,
  )
  return (
    enabledOptions.length > 0 &&
    enabledOptions.every((option) =>
      (fieldValue.value as CheckboxValueType[]).includes(option.value),
    )
  )
})

// 半选状态
const isIndeterminate = computed(() => {
  if (!isMultipleMode.value || !props.control.checkAll) return false
  if (!Array.isArray(fieldValue.value) || processedOptions.value.length === 0)
    return false

  const enabledOptions = processedOptions.value.filter(
    (option) => !option.disabled,
  )
  const checkedCount = enabledOptions.filter((option) =>
    (fieldValue.value as CheckboxValueType[]).includes(option.value),
  ).length

  return checkedCount > 0 && checkedCount < enabledOptions.length
})

// 容器样式
const containerStyle = computed(() => {
  const styles: Record<string, any> = {}

  if (isMultipleMode.value) {
    if (props.control.direction === 'vertical') {
      styles.flexDirection = 'column'
      styles.alignItems = 'flex-start'
    } else {
      styles.flexDirection = 'row'
      styles.flexWrap = 'wrap'
    }

    if (props.control.gap) {
      styles.gap = `${props.control.gap}px`
    }
  }

  return styles
})

// 加载选项数据
const loadOptions = async (): Promise<void> => {
  if (!isMultipleMode.value || !props.control.url) {
    console.warn('RwCheckbox: url is only available for group and button modes')
    return
  }

  const { url, params, optionsKey } = props.control

  if (!url) {
    console.warn('RwCheckbox: url is required for loading options')
    return
  }

  try {
    isLoading.value = true
    error.value = ''

    const result = await http.post(url, params || {})

    if (result.status === 0 || result.data) {
      const dataKey = optionsKey || 'rows'
      optionsData.value =
        result.data?.[dataKey] ?? result.data?.rows ?? result.data ?? []
    } else {
      error.value = result.message || '加载数据失败'
      optionsData.value = []
    }
  } catch (e) {
    console.error('RwCheckbox loadOptions error:', e)
    error.value = e instanceof Error ? e.message : '网络请求失败'
    optionsData.value = []
  } finally {
    isLoading.value = false
  }
}

// 事件处理
const handleChange = (value: CheckboxValueType | CheckboxValueType[]): void => {
  fieldValue.value = value

  // 触发自定义事件
  if (props.control.onChange) {
    props.control.onChange(value)
  }
}

// 全选/取消全选
const handleCheckAllChange = (checked: boolean): void => {
  if (!isMultipleMode.value) return

  const enabledOptions = processedOptions.value.filter(
    (option) => !option.disabled,
  )

  if (checked) {
    // 全选：添加所有未选中的启用选项
    const currentValues = Array.isArray(fieldValue.value)
      ? fieldValue.value
      : []
    const newValues = [
      ...new Set([
        ...currentValues,
        ...enabledOptions.map((option) => option.value),
      ]),
    ]
    fieldValue.value = newValues
  } else {
    // 取消全选：移除所有启用选项
    const currentValues = Array.isArray(fieldValue.value)
      ? fieldValue.value
      : []
    const enabledValues = enabledOptions.map((option) => option.value)
    fieldValue.value = currentValues.filter(
      (value) => !enabledValues.includes(value),
    )
  }
}

// 监听控件配置变化，重新加载数据
watch(
  () => [props.control.url, props.control.params],
  () => {
    if (isMultipleMode.value && props.control.url) {
      loadOptions()
    }
  },
  { deep: true },
)

// 初始化选项数据
const initializeOptions = () => {
  if (isMultipleMode.value) {
    if (props.control.url) {
      loadOptions()
    } else if (props.control.options) {
      // 如果直接提供了选项数据
      optionsData.value = props.control.options
    }
  }
}

// 监听 options 变化
watch(
  () => props.control.options,
  (newOptions) => {
    if (isMultipleMode.value && newOptions && !props.control.url) {
      optionsData.value = newOptions
    }
  },
  { immediate: true, deep: true },
)

// 组件挂载时加载数据
onMounted(() => {
  initializeOptions()

  // 初始化单个模式的默认值
  if (isSingleMode.value && fieldValue.value === undefined) {
    fieldValue.value = false
  }

  // 初始化多选模式的默认值
  if (isMultipleMode.value && !Array.isArray(fieldValue.value)) {
    fieldValue.value = []
  }
})

// 暴露方法给父组件
defineExpose({
  checkboxGroupRef,
  loadOptions,
  optionsData,
  processedOptions,
  isCheckAll,
  isIndeterminate,
  handleCheckAllChange,
})
</script>

<template>
  <div class="rw-checkbox-container">
    <!-- 单个复选框模式 -->
    <ElCheckbox
      v-if="isSingleMode"
      v-model="fieldValue"
      v-bind="checkboxProps"
      @change="handleChange"
    >
      <slot>{{ control.label || control.default }}</slot>
    </ElCheckbox>

    <!-- 多选模式 -->
    <div v-else-if="isMultipleMode" class="rw-checkbox-multiple">
      <!-- 加载状态 -->
      <div v-if="isLoading" class="rw-checkbox-loading">
        <ElIcon class="is-loading">
          <Loading />
        </ElIcon>
        <span>{{ t('LOADING') }}...</span>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="rw-checkbox-error">
        <ElIcon>
          <Warning />
        </ElIcon>
        <span>{{ error }}</span>
        <ElButton size="small" type="primary" @click="loadOptions">
          <ElIcon><Refresh /></ElIcon>
          {{ t('Refresh') }}
        </ElButton>
      </div>

      <!-- 选项列表 -->
      <div v-else class="rw-checkbox-options" :style="containerStyle">
        <!-- 全选功能 -->
        <ElCheckbox
          v-if="
            isDefaultType && control.checkAll && processedOptions.length > 0
          "
          :model-value="isCheckAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
          class="rw-checkbox-check-all"
        >
          {{ control.checkAllText ?? t('selectAll') }}
        </ElCheckbox>

        <!-- 复选框组 -->
        <ElCheckboxGroup
          v-if="isDefaultType"
          ref="checkboxGroupRef"
          v-model="fieldValue"
          v-bind="checkboxProps"
          @change="handleChange"
          class="rw-checkbox-group"
          :style="containerStyle"
        >
          <ElCheckbox
            v-for="(option, index) in processedOptions"
            :key="`${option.value}-${index}`"
            :label="option.label ?? option.value"
            :value="option.value"
            :disabled="option.disabled"
            :border="option.border || control.border"
            :size="option.size || control.size"
            :name="option.name || control.name"
            :checked="option.checked"
            :indeterminate="option.indeterminate"
            :validate-event="control.validateEvent"
            :tabindex="control.tabindex"
            :id="option.id"
          >
            <slot name="option" :option="option">
              {{ option.label }}
            </slot>
          </ElCheckbox>
        </ElCheckboxGroup>

        <!-- 按钮组 -->
        <ElCheckboxGroup
          v-else-if="isButtonType"
          ref="checkboxGroupRef"
          v-model="fieldValue"
          v-bind="checkboxProps"
          @change="handleChange"
          class="rw-checkbox-button-group"
          :style="containerStyle"
        >
          <ElCheckboxButton
            v-for="(option, index) in processedOptions"
            :key="`${option.value}-${index}`"
            :label="option.label ?? option.value"
            :value="option.value"
            :disabled="option.disabled"
            :size="option.size || control.size"
            :name="option.name || control.name"
            :checked="option.checked"
            :validate-event="control.validateEvent"
            :tabindex="control.tabindex"
          >
            <slot name="option" :option="option">
              {{ option.label }}
            </slot>
          </ElCheckboxButton>
        </ElCheckboxGroup>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rw-checkbox-container {
  width: 100%;

  .rw-checkbox-multiple {
    width: 100%;
  }

  .rw-checkbox-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    color: #909399;

    .el-icon {
      margin-right: 8px;
      font-size: 16px;
    }
  }

  .rw-checkbox-error {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    color: #f56c6c;

    .el-icon {
      margin-bottom: 8px;
      font-size: 24px;
    }

    span {
      margin-bottom: 12px;
    }
  }

  .rw-checkbox-options {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;

    .rw-checkbox-check-all {
      margin-bottom: 12px;
      font-weight: 500;

      &.is-checked {
        color: var(--el-color-primary);
      }
    }

    .rw-checkbox-group,
    .rw-checkbox-button-group {
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      .el-checkbox,
      .el-checkbox-button {
        margin-right: 0;
        margin-bottom: 0;
      }
    }
  }
}


.rw-checkbox-options[style*='flex-direction: column'] {
  .rw-checkbox-group,
  .rw-checkbox-button-group {
    flex-direction: column;
    align-items: flex-start;
  }
}


@media (max-width: 768px) {
  .rw-checkbox-container {
    .rw-checkbox-options {
      .rw-checkbox-group,
      .rw-checkbox-button-group {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
}
</style>
