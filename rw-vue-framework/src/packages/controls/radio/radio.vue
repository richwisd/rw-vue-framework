<script setup lang="ts">
import {
  ElRadio,
  ElRadioGroup,
  ElRadioButton,
  ElButton,
  ElIcon
} from 'element-plus'
import { Loading, Warning, Refresh } from '@element-plus/icons-vue'
import { computed, onMounted, ref, watch } from 'vue'
import { http } from '../../utils'
import { useFormValue } from '../../hooks'
import { type OptionT, type RadioOption } from './radio'

defineOptions({ name: 'RwRadio' })

// 显式声明插槽类型，避免 vue-tsc 推导出引用 vue-router / vue-i18n 等不可移植类型的虚拟变量
defineSlots<{
  default?(): any
  option?(props: { option: RadioOption }): any
}>()

// 组件属性
interface Props {
  control: OptionT
  modelValue?: any // 添加modelValue属性支持v-model
}

const props = defineProps<Props>()
  const emit = defineEmits(['update:modelValue'])
// 表单值管理
const { fieldValue } = useFormValue<OptionT>('RwRadio', props.control)

// 默认插槽内容（显式标注 any 以避免 vue-tsc 推导出引用 vue-router/vue-i18n 的不可移植类型）
const defaultSlotContent = computed<any>(() => props.control.label ?? props.control.default)

// 响应式数据
const optionsData = ref<RadioOption[]>([])
const isLoading = ref(false)
const error = ref<string>('')
const radioGroupRef = ref()

// 计算属性
const isSingleMode = computed(() => props.control.mode === 'single')
const isGroupMode = computed(() => props.control.mode === 'group')
const isButtonMode = computed(() => props.control.mode === 'button')

const isMultipleMode = computed(() => isGroupMode.value || isButtonMode.value)

// 过滤掉自定义属性，只传递 Element Plus 支持的属性
const radioProps = computed<Record<string, any>>(() => {
  const {
    // 过滤掉自定义属性
    mode,
    url,
    params,
    options,
    optionsKey,
    labelKey,
    valueKey,
    disabledKey,
    direction,
    gap,
    onChange,
    onInput,
    // 基础属性
    moduleName,
    name,
    ...elementPlusProps
  } = props.control

  return elementPlusProps
})

// 获取选项的显示标签
const getOptionLabel = (option: RadioOption): string => {
  const labelKey = props.control.labelKey || 'label'
  return String(option[labelKey] || option.label || '')
}

// 获取选项的值
const getOptionValue = (option: RadioOption): any => {
  const valueKey = props.control.valueKey || 'value'
  return option[valueKey] !== undefined ? option[valueKey] : option.label
}

// 获取选项的禁用状态
const getOptionDisabled = (option: RadioOption): boolean => {
  const disabledKey = props.control.disabledKey || 'disabled'
  return Boolean(option[disabledKey] || option.disabled)
}

// 处理的选项数据
const processedOptions = computed(() => {
  return optionsData.value.map(option => ({
    ...option,
    label: getOptionLabel(option),
    value: getOptionValue(option),
    disabled: getOptionDisabled(option)
  }))
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
  const { url, params, optionsKey } = props.control

  if (!url) {
    console.warn('RwRadio: url is required for loading options')
    return
  }

  try {
    isLoading.value = true
    error.value = ''

    const result = await http.post(url, params || {})

    if (result.status === 0 || result.data) {
      optionsData.value = (optionsKey ? result.data?.[optionsKey] : undefined) ?? result.data?.rows ?? result.data ?? []
    } else {
      error.value = result.message || '加载数据失败'
      optionsData.value = []
    }
  } catch (e) {
    console.error('RwRadio loadOptions error:', e)
    error.value = e instanceof Error ? e.message : '网络请求失败'
    optionsData.value = []
  } finally {
    isLoading.value = false
  }
}

// 事件处理
const handleChange = (value: any): void => {
  fieldValue.value = value

  // 触发自定义事件
  if (props.control.onChange) {
    props.control.onChange(value)
  }
}

const handleInput = (value: any): void => {
  // 触发自定义事件
  if (props.control.onInput) {
    props.control.onInput(value)
  }
}

// 监听控件配置变化，重新加载数据
watch(
  () => [props.control.url, props.control.params],
  () => {
    if (props.control.url && isMultipleMode.value) {
      loadOptions()
    }
  },
  { deep: true }
)

// 组件挂载时加载数据
onMounted(() => {
  if (props.control.url && isMultipleMode.value) {
    loadOptions()
  } else if (props.control.options && isMultipleMode.value) {
    // 如果直接提供了选项数据
    optionsData.value = props.control.options
  }

  // 初始化单个模式的默认值
  if (isSingleMode.value && fieldValue.value === undefined) {
    fieldValue.value = props.control.label || false
  }
})

// 暴露方法给父组件
defineExpose({
  radioGroupRef,
  loadOptions,
  optionsData,
  processedOptions,
})
</script>

<template>
  <div class="rw-radio-container">
    <!-- 单个单选框模式 -->
    <ElRadio
      v-if="isSingleMode"
      v-model="fieldValue"
      v-bind="radioProps"
      @change="handleChange"
      @input="handleInput"
    >
      <slot>{{ defaultSlotContent }}</slot>
    </ElRadio>

    <!-- 多选模式 -->
    <div v-else-if="isMultipleMode" class="rw-radio-multiple">
      <!-- 加载状态 -->
      <div v-if="isLoading" class="rw-radio-loading">
        <ElIcon class="is-loading">
          <Loading />
        </ElIcon>
        <span>加载中...</span>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="rw-radio-error">
        <ElIcon>
          <Warning />
        </ElIcon>
        <span>{{ error }}</span>
        <ElButton size="small" type="primary" @click="loadOptions">
          <ElIcon><Refresh /></ElIcon>
          重试
        </ElButton>
      </div>

      <!-- 选项列表 -->
      <div v-else class="rw-radio-options" :style="containerStyle">
        <!-- 单选框组 -->
        <ElRadioGroup
          v-if="isGroupMode"
          ref="radioGroupRef"
          v-model="fieldValue"
          v-bind="radioProps"
          @change="handleChange"
          @input="handleInput"
          class="rw-radio-group"
          :style="containerStyle"
        >
          <ElRadio
            v-for="option in processedOptions"
            :key="option.value"
            :label="option.value"
            :disabled="option.disabled"
            :border="option.border || control.border"
            :size="option.size || control.size"
            :name="option.name || control.name"
          >
            <slot name="option" :option="option">
              {{ option.label }}
            </slot>
          </ElRadio>
        </ElRadioGroup>

        <!-- 按钮组 -->
        <ElRadioGroup
          v-else-if="isButtonMode"
          ref="radioGroupRef"
          v-model="fieldValue"
          v-bind="radioProps"
          @change="handleChange"
          @input="handleInput"
          class="rw-radio-button-group"
          :style="containerStyle"
        >
          <ElRadioButton
            v-for="option in processedOptions"
            :key="option.value"
            :label="option.value"
            :disabled="option.disabled"
            :size="option.size || control.size"
            :name="option.name || control.name"
          >
            <slot name="option" :option="option">
              {{ option.label }}
            </slot>
          </ElRadioButton>
        </ElRadioGroup>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rw-radio-container {
  width: 100%;

  .rw-radio-multiple {
    width: 100%;
  }

  .rw-radio-loading {
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

  .rw-radio-error {
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

  .rw-radio-options {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;

    .rw-radio-group,
    .rw-radio-button-group {
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      .el-radio,
      .el-radio-button {
        margin-right: 0;
        margin-bottom: 0;
      }
    }
  }
}


.rw-radio-options[style*="flex-direction: column"] {
  .rw-radio-group,
  .rw-radio-button-group {
    flex-direction: column;
    align-items: flex-start;
  }
}


@media (max-width: 768px) {
  .rw-radio-container {
    .rw-radio-options {
      .rw-radio-group,
      .rw-radio-button-group {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
}
</style>
