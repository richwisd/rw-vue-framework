import { baseT } from '@rw-vue-framework/constants'

import { withInstall, type SFCWithInstall } from '@rw-vue-framework/utils'

import { DialogProps, DialogEmits, ElMessageBox } from 'element-plus'

import { RwButtonGroup } from '../buttonGroup'
import Dialog from './dialog.vue'
import { reactive } from 'vue'
import { t } from '@rw-vue-framework/locale'

export type OptionT = baseT & DialogProps & DialogEmits & {
  direction: 'rtl' | 'ltr' | 'ttb' | 'btt' | 'center'
  idValue: number
  params: Record<string, any>

  changed: boolean
  formChanged: boolean
  escClose: boolean

  height: string | number
  default: any
  header: any
  footer: any
  show: boolean
  loading: boolean
  buttons: RwButtonGroup.OptionT
  // 自动提取的form按钮配置
  _autoFormButtons: {
    buttonGroup: RwButtonGroup.OptionT
    originalFormRef: any
    handleButtonClick: (buttonName: string, event: any) => void
  }
  _formRegistration: any
}

export const Template: SFCWithInstall<typeof Dialog> = withInstall(Dialog)

// 创建按钮点击处理函数
function createButtonClickHandler(formRef: any, dialogControl: OptionT) {
  return (buttonName: any, event: any) => {
    switch(buttonName.name) {
      case 'submit':
        formRef?.submit?.().then((success: boolean) => {
          if (success) {
            dialogControl.changed = true // 提交成功，设置为已修改
            dialogControl.formChanged = false
            closeDialog(dialogControl)
          }
        })
        break
      case 'submitClose':
        formRef?.submit?.().then((success: boolean) => {
          if (success) {
            dialogControl.show = false
          }
        })
        break
      case 'reset':
        formRef?.reset?.()
        break
      case 'tempSave':
        formRef?.tempSave?.()
        dialogControl.formChanged = false
        dialogControl.changed = false
        break
      case 'close':
        // 如果修改，添加提示
        if (formRef.changed.value) {
          dialogControl.formChanged = true
        }
        closeDialog(dialogControl)
        break
      default:
        // 处理自定义按钮
        if (formRef?.checkButtons) {
          formRef.checkButtons(buttonName, event)
        }
        break
    }
  }
}

const closeDialog = (dialogControl: OptionT, done?: () => void ) => {
  // 处理关闭对话框的函数
  const handleClose = () => {
    if(!done) {
      dialogControl.show = false
    } else {
      done()
    }
  }

  if(dialogControl.formChanged) {
    // 使用 Promise 处理确认框
    ElMessageBox.confirm(
      t('common.formCloseTips'),
      t('common.tips'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'warning',
      }
    )
      .then(() => {
        handleClose()
        dialogControl.formChanged = false
      })
      .catch(() => {
        // 用户取消关闭操作
      })
  } else {
    handleClose()
  }
}

// 在 dialog.ts 中添加
export const DIALOG_FORM_INJECTION_KEY = Symbol('dialog-form')

// 修改 init 函数
export function init(name: string,templateName:any, buttons?: RwButtonGroup.OptionT, options: Partial<OptionT> = {}): OptionT {
  const dialogControl = reactive({
    name,
    buttons,
    // showClose: false,
    show: false,
    default: templateName,
    direction: 'center',
    idValue: 0,
    changed: false, // 判断是否需要刷新
    escClose: true,
    draggable: true,
    ...options,
    // 添加form注册回调
    _formRegistration: {
      onFormMounted: (formInstance: any) => {
        if (formInstance?.buttons) {
          // 动态提取按钮配置
          const buttonConfig = {
            ...formInstance.buttons.value,
            controls: formInstance.buttons.value.controls.map((btn: any) => ({
              ...btn,
              config: {
                ...btn.config,
                class: `dialog-form-button ${btn.config?.class || ''}`.trim()
              }
            }))
          }

          // 设置自动按钮配置
          dialogControl._autoFormButtons = {
            buttonGroup: buttonConfig,
            originalFormRef: formInstance,
            handleButtonClick: createButtonClickHandler(formInstance, dialogControl)
          }

          // 自动设置footer
          if (!options.footer) {
            dialogControl.footer = 'auto-form-buttons'
          }
        }
        dialogControl.label = `${formInstance.struct.name}.TITLE`
      },
      onFormUnmounted: () => {
        dialogControl._autoFormButtons = {
          buttonGroup: {} as RwButtonGroup.OptionT,
          originalFormRef: null,
          handleButtonClick: () => {}
        }
        dialogControl._formRegistration.registeredForm = null
      },
      registeredForm: null as any
    },
    beforeClose: (done: () => void) => {
      if (dialogControl._formRegistration.registeredForm?.changed) {
        dialogControl.formChanged = true
      }
      closeDialog(dialogControl, done)
    },
    controlType: 'dialog',
  }) as OptionT

  return dialogControl
}


