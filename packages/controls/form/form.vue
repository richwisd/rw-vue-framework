<script lang="ts" setup>
import { ElForm, ElRow, ElCol, ElMessage, ElFormItem } from 'element-plus'
import { OptionT, batchProcessForm } from './form'
import { RwTabs } from '../tabs'
import { RwFormItems } from '../formItems'
import { RwButtonGroup } from '../buttonGroup'
import {
  ref,
  provide,
  computed,
  onMounted,
  reactive,
  watch,
  readonly,
  isReactive,
  inject,
  onUnmounted,
  onUpdated,
} from 'vue'
import { RwDialog } from '../dialog'
import { http, assignmentData, transDataToString, createFormData, FormDataKey } from '@rw-vue-framework/utils'
import { t } from '@rw-vue-framework/locale'
import { storeToRefs } from 'pinia'
import { useLocalSettingStore } from '@rw-vue-framework/stores'
import { debounce } from 'lodash-es'

const localSettingStore = useLocalSettingStore()
// 使用 storeToRefs 解构响应式引用
const { pageForm, pageFormDialog } = storeToRefs(localSettingStore)
const ruleFormRef = ref<InstanceType<typeof ElForm>>()
const props = defineProps<{ control: Partial<OptionT> }>()

// 注入dialog上下文
const dialogContext = inject(RwDialog.DIALOG_FORM_INJECTION_KEY, null) as any

// 简化后的调用（第21-25行）
const { rules: formRules, defaultData } = batchProcessForm(
  props.control.contents || [],
  {
    needRules: true,
    needDefaultData: true,
    userRules: props.control.formProps?.rules, // 直接传入用户规则
  },
)
//console.log('form: defaultData', JSON.parse(JSON.stringify(defaultData)))
const rules = reactive(formRules) // 这里已经是合并后的规则了

const localKey =
  props.control?.storageId ||
  `form_temp_${props.control?.struct?.name}-${props.control.type}-${props.control.idName}`

// 创建表单上下文并提供给子组件
const formData = createFormData(
  props.control.id || '',
  // assignmentData(JSON.parse(JSON.stringify(defaultData)), props.control.data),
  props.control.data || defaultData
)
provide(FormDataKey, formData)
// 创建一个初始值的变量
const initialValue = ref(defaultData)

const formValue = computed(() => formData.data)
// 新增：表单变更状态
const changed = ref(false)
const submitting = ref(false)

// 创建防抖的onChange调用
const debouncedOnChange = debounce((data: any) => {
  dialogContext?.formChanged(changed.value, submitting.value)
  if (props.control?.onChange && typeof props.control.onChange === 'function') {
    try {
      props.control.onChange(data)
    } catch (error) {
      console.error('onChange回调执行失败:', error)
    }
  }
}, 500) // 300ms防抖

watch(
  () => formData,
  (newData) => {
    changed.value = true

    debouncedOnChange({
      data: newData,
      changed: changed.value,
      timestamp: Date.now(),
    })
  },
  { deep: true },
)

// 保存到本地存储
const saveToLocal = () => {
  try {
    localStorage.setItem(localKey, JSON.stringify(formData.data))
    //console.log('表单数据已自动保存到本地')
  } catch (error) {
    console.error('保存到本地失败:', error)
  }
}

// 从本地存储加载临时数据
const loadFromLocal = (): Record<string, any> | null => {
  try {
    const localData = localStorage.getItem(localKey)
    return localData ? JSON.parse(localData) : null
  } catch (error) {
    console.error('从本地加载数据失败:', error)
    return null
  }
}

// 清除本地临时数据
const clearLocalData = () => {
  try {
    localStorage.removeItem(localKey)
  } catch (error) {
    console.error('清除本地数据失败:', error)
  }
}

// 临时保存功能
const tempSave = () => {
  saveToLocal()
  ElMessage({
    message: '数据已临时保存到本地',
    type: 'success',
  })
}

// 定义加载状态枚举
const LoadingState = {
  IDLE: '',
  LOADING: t('LOADING'),
  SUBMITTING: t('SUBMITTING'),
  RESETTING: t('RESETTING'),
} as const
// 状态变量
const loading = ref(false)
const loadingText = ref(LoadingState.LOADING)

// 设置加载状态的辅助函数
const setLoadingState = (state: string, isLoading: boolean = true) => {
  if(props.control.showLoading){
    loading.value = isLoading
    loadingText.value = state
  }
}

// 提取API请求逻辑为独立函数
const fetchDataFromAPI = async (
  postData: Record<string, any>,
): Promise<any> => {
  const apiURL =
    (props.control?.struct?.apiURLFront || '') +
    (props.control?.struct?.apis?.info || '')

  if (props.control.debug === true) {
    console.log(`Form-${props.control.id}请求数据：`, postData)
    console.log(
      'api：',
      `${props.control?.struct?.apiURLFront}${props.control?.struct?.apis?.info}`,
    )
  }

  try {
    const res = await http.post(apiURL, postData)

    if (props.control.debug === true) {
      console.log('响应数据：', res)
    }

    if (res.status === 0) {
      return res.data.info || res.data
    } else {
      throw new Error(`API请求失败: ${res.errorMsg || '未知错误'}`)
    }
  } catch (error) {
    console.error('API请求异常:', error)
    throw error
  }
}
// 优化后的loadInfo函数
const loadInfo = async () => {
  if (loading.value) return
  setLoadingState(LoadingState.LOADING)
  try {
    // 执行加载前钩子
    await props.control?.onLoadBefore?.()
    // TODO:存在的问题，嵌套数据合并的问题
    let data: any = formValue.value
    // 数据获取逻辑 - 按照优先级加载
    let initialData = initialValue.value
    // 3. 检查onLoad是否被重写
    if (props.control.onLoad) {
      // 使用自定义加载函数，与已有数据合并
      const loadedData = await props.control.onLoad()
      data = assignmentData(initialData, loadedData) //赋值数据，并且处理数组的赋值
    } else {
      // 4. 使用默认加载逻辑
      const currentData = formValue.value
      initialData = assignmentData(initialData, currentData)
      if (props.control.idValue === undefined || props.control.idValue === 0) {
        // 2. 查看是否有本地临时保存数据，与初始数据合并
        const localData = loadFromLocal()
        if (localData) {
          initialData = { ...initialData, ...props.control.params, ...localData }
        }
        data = initialData
      } else if (props.control?.struct?.apiURLFront) {
        // 编辑模式：从API获取数据，与初始数据合并
        const postData: Record<string, any> = {}
        if (props.control.idName) {
          postData[props.control.idName] = props.control?.idValue
        }
        const apiData = await fetchDataFromAPI(postData)
        data = assignmentData(initialData, apiData)
      }
    }
    initialValue.value = JSON.parse(JSON.stringify(data))
    // 处理获取到的数据
    if (data) {
      await loadAfter(data)
      changed.value = false
    } else {
      console.warn('loadInfo: 未获取到有效数据')
    }
  } catch (error) {
    console.error('加载表单数据失败:', error)
    ElMessage({
      message: `加载数据失败: ${error instanceof Error ? error.message : '未知错误'}`,
      type: 'error',
    })
  } finally {
    setLoadingState(LoadingState.IDLE, false)
  }
}

// 更新表单数据的统一方法 - 完整版
const updateFormData = (
  newData: Record<string, any>,
  options: {
    maintainReactivity?: boolean // 新增选项
  } = {},
) => {
  const { maintainReactivity = false } = options

  try {
    // 如果需要维持响应式且原数据是响应式的
    if (
      maintainReactivity &&
      props.control?.data &&
      isReactive(props.control.data)
    ) {
      // 重新建立与原始数据的绑定
      const originalData = props.control.data
      // 递归重建响应式绑定
      const rebindReactivity = (target: any, source: any, newValues: any) => {
        Object.keys(newValues).forEach((key) => {
          if (typeof newValues[key] === 'object' && newValues[key] !== null) {
            if (Array.isArray(newValues[key])) {
              // 如果是数组，直接创建新的响应式数组
              target[key] = reactive([...newValues[key]])
            } else {
              // 如果是普通对象，继续递归处理
              if (!target[key] || typeof target[key] !== 'object') {
                target[key] = reactive({})
              }
              rebindReactivity(target[key], source[key], newValues[key])
            }
          } else {
            target[key] = newValues[key]
          }
        })
      }

      rebindReactivity(formData.data, originalData, newData)
      return
    }

    // ... existing code ...
  } catch (error) {
    console.error('[updateFormData] 更新数据失败:', error)
    throw error
  }
}

/* 事件 */
// 加载后处理数据
// 在 loadAfter 函数中
async function loadAfter(data: Record<string, any>) {
  // 使用新的 updateFormData 方法
  updateFormData(JSON.parse(JSON.stringify(data)), { maintainReactivity: true })
  //console.log('formValue', formValue.value)
  return props.control?.onLoadAfter
    ? await props.control.onLoadAfter(data)
    : data
}

// 在 reset 函数中
const reset = () => {
  if (!ruleFormRef.value) return
  setLoadingState(LoadingState.RESETTING)

  try {
    // ruleFormRef.value.resetFields()
    changed.value = false
    let data = JSON.parse(JSON.stringify(initialValue.value))
    if (props.control?.onReset) {
      data = props.control.onReset(formData.data)
    }
    updateFormData(data, { maintainReactivity: true })
  } finally {
    setLoadingState(LoadingState.IDLE, false)
  }
}

// 表单验证
async function validate (){
  let ischecked = await new Promise<boolean>((resolve) => {
    ruleFormRef.value!.validate((valid, fields) => {
      // if(valid){
      //   data = formData.data.formatData(formData.data.items, data, "toString")
      // }
      resolve(valid)
    })
  })
  return ischecked
}

// 提交前数据校验和处理
async function submitBefore(
  data: Record<string, any>,
): Promise<Record<string, any> | false> {
  if (!ruleFormRef.value) return false
  let ischecked = await validate()

  if (ischecked == false) {
    submitting.value = false
    dialogContext?.formChanged(changed.value, submitting.value)
    return false
  }
  //console.log('data', data)
  const newData = transDataToString(data)
  if (!props.control?.onSubmitBefore) return newData

  const result = await props.control.onSubmitBefore(newData)
  return result === false ? false : (result as Record<string, any>)
}

// 提交表单数据
const submit = async (reloadData: boolean = false) => {
  if (loading.value || submitting.value) return false

  submitting.value = true
  dialogContext?.formChanged(changed.value, submitting.value)
  setLoadingState(LoadingState.SUBMITTING)
  try {
    // 深拷贝表单数据
    const form_data = JSON.parse(JSON.stringify(formData.data))

    // 提交前处理
    const submitBeforeResult = await submitBefore(form_data)
    if (!submitBeforeResult) return false

    let processedFormData = submitBeforeResult

    // 自定义提交处理
    if (props.control?.onSubmit) {
      await props.control.onSubmit(processedFormData)
    } else {
      // 默认提交处理
      const methodName =
        props.control.idValue !== 0
          ? props.control.struct?.apis?.edit || 'edit'
          : props.control.struct?.apis.add || 'add'

      processedFormData = { ids: props.control.idValue, ...processedFormData }
      if (props.control?.debug) {
        console.log('提交请求', processedFormData)
        console.log('api', methodName)
      }
      try {
        const res = await http.post(
          props.control.struct!.apiURLFront + methodName,
          processedFormData,
          { repeatPost: true },
        )
        if (!handleSubmitResponse(res))
          return false
      } catch {
        return false
      }
    }

    // 提交成功后的处理
    changed.value = false

    // 清除本地临时数据
    clearLocalData()

    // 提交后处理
    props.control?.onSubmitAfter?.(processedFormData)

    return true
  } finally {
    submitting.value = false
    setLoadingState(LoadingState.IDLE, false)
    dialogContext?.formChanged(changed.value, submitting.value)
  }
}

// 处理表单提交响应
function handleSubmitResponse(
  res: any
): boolean {
  if (props.control?.debug) {
    console.log('提交响应', res)
  }

  if (res.status === 0) {
    ElMessage({ message: res.errorMsg, type: 'success' })
    return true
  }

  if (res.errorMsg) {
    ElMessage({ message: res.errorMsg, type: 'error' })
  }
  return false
}

//
function checkButtons(event: any) {
  //console.log('event.name', event)
  if (event.click) {
    event.click()
  } else {
    switch (event.name) {
      case 'submit':
        submit(true)
        break
      // case "submitClose":
      //   submit().then((success) => {
      //     if (success) {
      //       executeClose()
      //     }
      //   })
      //   break
      case 'tempSave':
        tempSave()
        break
      case 'reset':
        reset()
        break
      case 'close':
        // 如果开启了自动保存到本地，则保存数据
        if (
          changed.value &&
          props.control.autoSaveLocal &&
          localSettingStore.pageForm?.autoSaveLocal
        ) {
          saveToLocal()
        }
        // handleClose() // 如果是
        break
    }
  }
}

// 根据 type 选择配置源
const currentPageConfig = computed(() => {
  return inDialog.value ? pageFormDialog.value : pageForm.value
})

/* 按钮相关 */
const btnsStyle = computed(() => ({
  'justify-content':
    props.control.buttonLocation ??
    currentPageConfig.value.buttons.location ??
    'flex-start',
}))

// 修改 buttonOptions 计算属性，添加按钮状态控制
const buttonOptions = computed(() => {
  const buttons = props.control?.buttons?.controls || []
  const newControls = buttons.map((btn) => {
    let disabled =  btn.config?.disabled ?? btn.disabled ?? false
    // 根据changed状态控制按钮可用性
    if (!props.control.customizedDisabled && ['submit', 'submitClose', 'reset', 'tempSave'].includes(btn.name)) {
      disabled = !changed.value
    }

    // 提交中时禁用所有按钮
    if (submitting.value) {
      disabled = true
    }
    return {
      ...btn,
      disabled,
      config: {
        ...btn.config,
        disabled,
        text: currentPageConfig.value.buttons.buttonStyle === 'text',
      },
    }
  })

  return {
    ...props.control?.buttons,
    isGroup: currentPageConfig.value.buttons?.groupType ?? false,
    controls: newControls,
  } as RwButtonGroup.OptionT
})

const inDialog = computed(() => {
  return props.control.inDialog || props.control?.dialogOptions?.inDialog
})
// showTopButtons 和 showBottomButtons 使用动态配置
const showTopButtons = computed(() => {
  if ((inDialog.value && dialogContext) || props.control?.buttons.verticalLocation === 'bottom') return false // 在dialog中隐藏form的按钮
  return (
    props.control?.buttons &&
    currentPageConfig.value.buttons.verticalLocation !== 'bottom'
  )
})

const showBottomButtons = computed(() => {
  if ((inDialog.value && dialogContext) || props.control?.buttons.verticalLocation === 'top') return false // 在dialog中隐藏form的按钮
  return (
    props.control?.buttons &&
    currentPageConfig.value.buttons.verticalLocation !== 'top'
  )
})
watch(
  () => props.control?.idValue,
  () => {
    loadInfo()
  },
)
onMounted(() => {
  setTimeout(() => {
    loadInfo()
  }, 1)
  document.addEventListener('keydown', handleKeydown)
})
onUpdated(() => {
  if (dialogContext && inDialog.value) {
    const formInstance = {
      buttons: buttonOptions,
      submit,
      reset,
      tempSave,
      checkButtons,
      formData: formData?.data,
      changed: readonly(changed),
      submitting: readonly(submitting),
      struct: props.control.struct,
    }
    dialogContext.registerForm(formInstance)
  }
})
// 组件卸载时取消注册
onUnmounted(() => {
  if (dialogContext && inDialog.value) {
    dialogContext.unregisterForm()
  }
  document.removeEventListener('keydown', handleKeydown)
})
// 添加外部控制 loading 的方法
const setExternalLoading = (isLoading: boolean, text?: string) => {
  loading.value = isLoading
  if (text) {
    loadingText.value = text
  } else {
    loadingText.value = isLoading ? LoadingState.LOADING : LoadingState.IDLE
  }
}

// 监听回车事件触发提交
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    // 查找提交按钮并触发点击
    const submitBtn = buttonOptions.value.controls.find(
      (btn) => btn.name === 'submit' && !btn.disabled,
    )
    if (submitBtn && inDialog.value && dialogContext.show) {
      checkButtons(submitBtn)
    } else if (submitBtn && !inDialog.value) {
      checkButtons(submitBtn)
    }
  }
}

// 暴露给父组件
defineExpose({
  formData,
  validate,
  submit,
  submitBefore,
  reset,
  loadInfo,
  updateFormData,
  setExternalLoading,
  tempSave,
  changed: readonly(changed), // 暴露changed状态（只读）
  submitting: readonly(submitting), // 暴露submitting状态（只读）
})
</script>

<template>
  <ElForm
    class="rw-form"
    v-bind="control?.formProps"
    :model="formValue"
    :data-form-id="control.id"
    ref="ruleFormRef"
    v-loading="loading"
    :element-loading-text="loadingText"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :rules="rules"
  >
    <el-form-item
      v-if="control.buttons && showTopButtons && control.buttons.show"
      class="form-buttons"
      :style="btnsStyle"
    >
      <ElRow>
        <ElCol>
          <RwButtonGroup.Template
            :control="buttonOptions"
            :onclick="submit"
            @click="checkButtons"
          />
        </ElCol>
      </ElRow>
    </el-form-item>

    <template
      v-for="item in control.contents"
      :key="item.id"
    >
      <RwTabs.Template
        v-if="item.controlType === 'tab'"
        :control="{ ...item, inDialog } as RwTabs.OptionT"
      />
      <RwFormItems.Template
        v-else-if="item.controlType === 'formItems'"
        :control="{ ...item, inDialog } as RwFormItems.OptionT"
      />
    </template>
    <el-form-item
      v-if="control.buttons && showBottomButtons && control.buttons.show"
      class="form-buttons"
      :style="btnsStyle"
    >
      <ElRow>
        <ElCol>
          <RwButtonGroup.Template
            :control="buttonOptions"
            :onclick="submit"
            @click="checkButtons"
          />
        </ElCol>
      </ElRow>
    </el-form-item>
  </ElForm>
</template>

<style lang="scss" scoped>
.rw-form {
  padding: 10px;
}
/* 表单底部按钮组样式优化 */
.form-buttons {
  :deep(.el-form-item__content) {
    flex: none;
    margin-left: 0 !important;
  }
}

/* 关闭确认对话框样式 */
:global(.form-close-dialog) {
  .el-message-box__btns {
    .el-button--primary {
      background-color: #409eff;
    }
    .el-button--default {
      background-color: #f56c6c;
      border-color: #f56c6c;
      color: #fff;
    }
  }
}
</style>
