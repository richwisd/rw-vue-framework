<script setup lang="ts">
import { type OptionT } from './dialog'
import { RwButtonGroup } from '../buttonGroup'
import { ElDrawer, ElDialog } from 'element-plus'
import { isComponent, isHTML } from '../../utils'
import {
  computed,
  markRaw,
  ref,
  provide,
  onMounted,
  reactive,
  onUnmounted,
} from 'vue'
import { DIALOG_FORM_INJECTION_KEY } from './dialog'
import { t } from '../../locale'
import { storeToRefs } from 'pinia'
import { useLocalSettingStore } from '../../stores'
const localSettingStore = useLocalSettingStore()
// 使用 storeToRefs 解构响应式引用
const { pageFormDialog } = storeToRefs(localSettingStore)

const props = defineProps<{ control: OptionT }>()
const emits = defineEmits(['refreshData'])

// Form组件引用
const formRef = ref()

const initData = reactive({
  width: '50%',
  height: 'auto',
  label: '',
})
const subLabel = ref(t('messages.nullTitle'))
// 提供form引用给子组件
provide('dialogFormRef', formRef)

const comProps = computed(() => {
  const {
    default: _default,
    header,
    footer,
    open,
    opened,
    close,
    closed,
    openAutoFocus,
    closeAutoFocus,
    _autoFormButtons,
    buttons,
    _formRegistration,
    ...rest
  } = props.control
  return rest
})

const comType = computed(() => {
  return props.control.direction === 'center'
    ? markRaw(ElDialog)
    : markRaw(ElDrawer)
})
const changed = ref(false)
const submitting = ref(false)
// 自动按钮组配置
const autoFormButtons = computed(() => {
  // return props.control._autoFormButtons
  const buttons = props.control._autoFormButtons?.buttonGroup.controls || []
  const newControls = buttons.map((btn) => {
    let disabled = btn.config?.disabled || false

    // 根据changed状态控制按钮可用性
    if (['submit', 'submitClose', 'reset', 'tempSave'].includes(btn.name)) {
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
        text: pageFormDialog.value.buttons.buttonStyle === 'text',
      },
    }
  })

  return {
    ...props.control._autoFormButtons,
    buttonGroup: {
      ...props.control._autoFormButtons?.buttonGroup,
      isGroup: pageFormDialog.value.buttons?.groupType ?? false,
      controls: newControls,
    } as RwButtonGroup.OptionT,
  }
})
const showTopButtons = computed(() => {
  return (
    (props.control?.buttons || autoFormButtons.value) &&
    pageFormDialog.value.buttons.verticalLocation !== 'bottom'
  )
})

const showBottomButtons = computed(() => {
  return (
    (props.control?.buttons || autoFormButtons.value) &&
    pageFormDialog.value.buttons.verticalLocation !== 'top'
  )
})

const btnsStyle = computed(() => ({
  'justify-content': pageFormDialog.value.buttons.location ?? 'flex-start',
}))

const label = computed(() => {
  return props.control.label ?? initData.label
})

// 自动处理按钮点击
const handleAutoButtonClick = (buttonName: string, event: any) => {
  if (autoFormButtons.value?.handleButtonClick) {
    // 更新form引用
    if (
      formRef.value &&
      autoFormButtons.value.originalFormRef !== formRef.value
    ) {
      autoFormButtons.value.originalFormRef = formRef.value
    }
    autoFormButtons.value.handleButtonClick(buttonName, event)
  }
}

/* 事件 */
const handleOpen = () => {
  props.control.loading = true
  console.log('props.control.idValue', props.control.idValue)
  dialogInit(props.control.idValue ?? 0, props.control.params ?? {})
  if (props.control.name === 'addForm' || props.control.name === 'editForm') {
    subLabel.value =
      props.control.name == 'addForm' ? t('buttons.append') : t('buttons.edit')
    // changeButtons()
  }
  props.control.open?.()
  console.log('dialog Open:', Date.now())
}

const handleClosed = () => {
  props.control.closed?.()
  if (props.control.changed) {
    emits('refreshData')
    props.control.changed = false
  }
}

const dialogInit = (idValue: number, params: Record<string, any> = {}) => {
  const result = formRef.value?.dialogInit(idValue, params)
  console.log('result', result)
  initData.width = result.width
  initData.height = result.height
  initData.label = t(result.label)
}

// 组件挂载后更新form引用
onMounted(() => {
  if (autoFormButtons.value && formRef.value) {
    autoFormButtons.value.originalFormRef = formRef.value
  }
})

// 提供dialog上下文给子组件
provide(DIALOG_FORM_INJECTION_KEY, {
  registerForm: (formInstance: any) => {
    if (props.control._formRegistration?.onFormMounted) {
      props.control._formRegistration.onFormMounted(formInstance)
      props.control._formRegistration.registeredForm = formInstance
    }
  },
  unregisterForm: () => {
    if (props.control._formRegistration?.onFormUnmounted) {
      props.control._formRegistration.onFormUnmounted()
    }
  },
  formChanged: (changedType: boolean, submittingType: boolean) => {
    changed.value = changedType
    submitting.value = submittingType
  },
})

// ESC键关闭事件处理
const handleEscClose = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.control.show) {
    props.control.close?.()
  }
}

// 组件挂载时添加ESC键监听
onMounted(() => {
  if (autoFormButtons.value && formRef.value) {
    autoFormButtons.value.originalFormRef = formRef.value
  }
  if (props.control.escClose) {
    window.addEventListener('keydown', handleEscClose)
  }
})

// 组件销毁时清理事件监听
onUnmounted(() => {
  window.removeEventListener('keydown', handleEscClose)
  // 执行表单注销
  if (props.control._formRegistration?.onFormUnmounted) {
    props.control._formRegistration.onFormUnmounted()
  }
})
</script>

<template>
  <component
    :is="comType"
    v-model="control.show"
    v-bind="comProps"
    @open="handleOpen"
    @opened="() => control.opened?.()"
    @close="() => control.close?.()"
    @closed="handleClosed"
    @open-auto-focus="() => control.openAutoFocus?.()"
    @close-auto-focus="() => control.closeAutoFocus?.()"
  >
    <template v-if="$slots.default" #default>
      <slot name="default"></slot>
    </template>
    <template #default v-else-if="control?.default">
      <component
        :is="markRaw(control.default)"
        v-if="isComponent(control.default) && !isHTML(control.default)"
        ref="formRef"
        :in-dialog="true"
      />
      <div
        v-else-if="
          typeof control.default === 'string' && isHTML(control.default)
        "
        v-html="control.default"
      ></div>
      <span v-else>{{ control.default }}</span>
    </template>

    <template #header>
      <h3>{{ t(label) }} {{ subLabel }}</h3>
      <div
        class="dialog-auto-form-buttons"
        v-if="showTopButtons"
        :style="btnsStyle"
      >
        <RwButtonGroup.Template
          :control="control?.buttons || autoFormButtons?.buttonGroup"
          @click="handleAutoButtonClick"
        />
      </div>
    </template>

    <template #footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
    <template #footer v-else-if="showBottomButtons">
      <div class="dialog-auto-form-buttons" :style="btnsStyle">
        <RwButtonGroup.Template
          :control="control?.buttons || autoFormButtons!.buttonGroup"
          @click="handleAutoButtonClick"
        />
      </div>
    </template>
    <template #footer v-else-if="control?.footer">
      <component
        :is="control.footer"
        v-if="isComponent(control.footer) && !isHTML(control.footer)"
      />
      <div
        v-else-if="typeof control.footer === 'string' && isHTML(control.footer)"
        v-html="control.footer"
      ></div>
      <span v-else>{{ control.footer }}</span>
    </template>
  </component>
</template>

<style>
.dialog-auto-form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 24px;
}

.dialog-auto-form-buttons ::v-deep(.dialog-form-button) {
  min-width: 80px;
}

/* 确保dialog中的按钮样式适配 */
.dialog-auto-form-buttons ::v-deep(.el-button) {
  margin-left: 8px;
}

.dialog-auto-form-buttons ::v-deep(.el-button:first-child) {
  margin-left: 0;
}

.el-dialog__header.show-close {
  padding-right: 0 !important;
}
</style>
