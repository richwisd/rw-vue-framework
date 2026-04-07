import { type Mutable, PathUtils } from '@rw-vue-framework/utils'
import { baseT } from '@rw-vue-framework/constants'
import { pageStruct } from '@rw-vue-framework/pages'
import {
  type FormProps,
  type FormEmits,
} from 'element-plus'

import { t } from '@rw-vue-framework/locale'
import { RwButtonGroup } from '../buttonGroup'
import { RwTabs } from '../tabs'
import { RwFormItems } from '../formItems'
import type { FormItemRule, FormRules } from "element-plus"
import { Select, RefreshLeft, CloseBold, Bottom } from '@element-plus/icons-vue'
import { isReactive, markRaw, reactive, ref } from 'vue'



// 表单
// 定义onChange回调的参数类型
export type FormChangeEvent = {
  newData: any
  oldData?: any
  changed: boolean
  formId: string
  field?: string // 具体变化的字段
  timestamp: number
}

// 更新OptionT类型
export type OptionT = FormEmits &
  baseT & {
    parentObject:any //父对象
    id: string
    type: 'form' | 'search' // | 'formDialog' 表单类型

    formProps: Partial<Mutable<FormProps>>
    data: any // 表单数据
    //后面给dialog使用
    inDialog: boolean // 是否在弹窗中
    dialogOptions: {
      width: number | string,
      height: number | string,
      inDialog: boolean
    }
    initDialog: (idValue: number,params?: Record<string, any>, idName?: string) => any
    params: Record<string, any> // 传递的表单参数

    width: number | string
    height: number | string

    //判断表单是添加、修改
    idName: string // 主键名称
    idValue: number

    struct: pageStruct.OptionT // 数据
    contents: Array<RwFormItems.OptionT | RwTabs.OptionT> // 表单内容
    contentsMap: Map<string, any> //后面要去掉

    //按钮区的属性
    customizedDisabled: boolean
    buttons: RwButtonGroup.OptionT
    buttonsPosition: 'top' | 'bottom' | 'both',
    buttonLocation: 'start' | 'center' | 'end',
    // 默认按钮,后面尽量不用，可以使用类型之类的，现在暂不动
    hideSubmitClose: boolean
    hideReset: boolean
    hideSubmit: boolean
    hideClose: boolean
    loading: boolean //加载数据时使用
    changed: boolean //
    showLoading: boolean // 是否显示加载状态
    submiting: boolean //提交 中使用，后面未必使用，暂时先留着，
    onChange: (event: FormChangeEvent) => void | Promise<void>

    autoSaveLocal: boolean
    storageId: string   //这个一般程序员不用写

    // 寻找基础控件
    findItem: (name:string) => any
    // 修改基础控件
    changeItem: (name: string, options: any) => boolean
    // 初始化方法
    addFormItems: (struct: pageStruct.OptionT, options?: Partial<RwFormItems.OptionT>) => any
    addTabs: (options?: Partial<RwTabs.OptionT>) => any

    changeButton: (name: string, options: any) => boolean

    debug: boolean // 是否开启调试模式 默认false
    // 表单操作方法
    onReset: (data: any) => any // 重置表单

    // validate: (formRef: any) => any // 验证表单

    onSubmitBefore: (data: any) => any // 提交前
    onSubmit: (data: any) => any // 提交表单
    onSubmitAfter: (data: any) => any // 提交后

    onLoadBefore: () => any // 加载前
    onLoad: () => any // 加载表单
    onLoadAfter: (data: any) => any // 加载后
  }

export const init = (
  struct: pageStruct.OptionT,
  options: Partial<OptionT> = {},
): OptionT => {
  // 为每个表单实例创建独立的控件数组
  // 创建表单实例
  const formId = options.id || `form-${struct.name}-${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const contents: Array<RwFormItems.OptionT | RwTabs.OptionT> = reactive([])
  const data = (() => {
    if (options?.data && isReactive(options.data)) {
      // 直接在原响应式对象上添加属性
      return options.data
    } else {
      // 创建新的响应式对象
      return reactive({ ...options?.data })
    }
  })()
  // 添加Map用于快速查找控件
  const contentsMap = reactive(new Map<string, any>())

  const customizedDisabled = options?.customizedDisabled ?? false
  //初始化按钮组
  const buttons = reactive(RwButtonGroup.init(struct.name, { isGroup: true }))
  buttons.addButton('submit',{ label: 'buttons.save', nativeType: "button", icon: markRaw(Select), disabled: !customizedDisabled})
  // 新增临时保存按钮
  buttons.addButton('tempSave',{label: 'buttons.tempSave', nativeType: "button", icon: markRaw(Bottom), disabled: !customizedDisabled})
  buttons.addButton('reset',{label: 'buttons.reset', nativeType: "button", icon: markRaw(RefreshLeft)})

  const dialogOptions = reactive({
    width: options.width ?? '50%',
    height: options.height ?? 'auto',
    inDialog: false
  })
  if(options.inDialog) {
    buttons.addButton('close',{ label: 'buttons.close', type: "danger", nativeType: "button", icon: markRaw(CloseBold) })
  }

  const formProps = {
    labelWidth: '125px',
    rules:{},
    ...options?.formProps
  }
  const type = options?.type ?? 'form'

  const formInstance = reactive({
    id: formId,
    idName: 'ids',
    params: {},
    contents,
    struct,
    inDialog: false,
    changed: false,
    autoSaveLocal: true,
    debug:true,
    idValue: 0,
    showLoading: true,
    ...options,
    customizedDisabled,
    dialogOptions,
    contentsMap, // 添加Map属性
    data,
    type,
    formProps,
    buttons,

    // 优化后的查找方法 - 使用Map进行O(1)查找
    findItem: (name: string) => {
      // 首先在Map中查找
      if (contentsMap.has(name)) {
        return contentsMap.get(name)
      }
      // 如果Map中没有，则遍历contents进行深度查找并更新Map
      const findInContents = (items: Array<RwFormItems.OptionT | RwTabs.OptionT>): any => {
        for (const item of items) {
          if (item.controlType === 'tab') {
            // 处理标签页
            const tabs = item as RwTabs.OptionT
            for (const pane of tabs.tabPanes) {
              const found = findInContents(pane.contents)
              if (found) return found
            }
          } else if (item.controlType === 'formItems') {
            // 处理表单项
            const formItems = item as RwFormItems.OptionT
            for (const formItem of formItems.formItems) {
              if (formItem.name === name) {
                // 找到后添加到Map中以便下次快速查找
                contentsMap.set(name, formItem)
                return formItem
              }
            }
          }
        }
        return null
      }
      return findInContents(contents)
    },
    // 优化后的修改方法
    changeItem: (name: string, options: any) => {
      const item = formInstance.findItem(name)
      if (item) {
        // 分离 hide 属性和其他属性
        const { hide, disabled, ...otherOptions } = options

        // 如果有 hide 属性，直接合并到 item 对象上
        if (hide !== undefined) {
          Object.assign(item, { hide })
        }

        // 如果有 disabled 属性，直接合并到 item 对象上
        if (disabled !== undefined) {
          Object.assign(item, { disabled })
        }

        // 其他属性合并到 item.init 对象上
        if (Object.keys(otherOptions).length > 0) {
          Object.assign(item.init, otherOptions)
        }

        // 更新Map中的引用
        contentsMap.set(name, item)
        return true
      }
      return false
    },
    addFormItems: (struct: pageStruct.OptionT, options: Partial<RwFormItems.OptionT> = {},) => {
      const formItems = RwFormItems.init(struct, {...options, type})
      contents.push(formItems)
      // 将新添加的表单项添加到Map中,先留着
      formItems.formItems.forEach(item => {
        contentsMap.set(item.name, item)
      })
      return formItems
    },
    addTabs: (options: Partial<RwTabs.OptionT> = {}) => {
      contents.push(RwTabs.init(options))
    },
    changeButton: (name: string, options: any) => {
      const item = buttons.controls.find((item) => item.name === name)
      if (item) {
        Object.assign(item.config, options)
        return true
      }
      return false
    },
    initDialog: (idValue: number, params: Record<string, any> = {}, idName: string = 'ids') => {
      formInstance.idValue = idValue
      formInstance.idName = idName
      formInstance.inDialog = true
      formInstance.params = params
      // formInstance.model = idValue == 0 ? "add" : "edit"
      const item = buttons.controls.find((item) => item.name === 'close')
      if(!item) buttons.addButton('close',{ label: 'buttons.close', type: "danger", nativeType: "button", icon: markRaw(CloseBold) })
      dialogOptions.inDialog = true
      const dialogResult = {
        label: t(struct.name + ".TITLE"),
        width: dialogOptions.width,
        height: dialogOptions.height
      }
      return dialogResult
    }

  }) as any
  // TODO 去掉会导致dialog的表单无法监听idValue
  return formInstance
}



/* 辅助函数 */
// 获取验证触发方式
function getValidationTrigger(controlType: string): string | string[] {
  switch (controlType) {
    case 'input':
    case 'inputNumber':
    case 'textarea':
      return 'blur';
    case 'select':
    case 'mergeSelect':
    case 'radio':
    case 'checkbox':
    case 'switch':
      return 'change';
    default:
      return 'blur';
  }
}

// 表单控件处理器类型定义
export type formProcessor = {
  // 处理单个表单控件
  processControl?: (control: any, context: any) => void
  // 处理表单项组
  processFormItems?: (formItems: RwFormItems.OptionT, context: any) => void
  // 处理标签页
  processTabs?: (tabs: RwTabs.OptionT, context: any) => void
  // 跳过的控件类型
  skipControlTypes?: string[]
}

// 通用表单遍历器
export class FormTraverser {
  private processor: formProcessor
  private context: any

  constructor(processor: formProcessor, context: any = {}) {
    this.processor = processor
    this.context = context
  }

  // 遍历表单结构
  traverse(items: Array<RwFormItems.OptionT | RwTabs.OptionT>) {
    this.processItems(items)
    return this.context
  }

  private processItems(items: Array<RwFormItems.OptionT | RwTabs.OptionT>) {
    items.forEach((item) => {
      // 处理标签页
      if (item.controlType === "tabs" || item.controlType === "tab") {
        const tabs = item as RwTabs.OptionT
        // 调用自定义标签页处理器
        this.processor.processTabs?.(tabs, this.context)
        // 递归处理标签页内容
        tabs.tabPanes.forEach((pane) => {
          this.processItems(pane.contents)
        })
        return
      }
      // 处理表单项组
      if (item.controlType === "formItems") {
        const formItems = item as RwFormItems.OptionT
        // 调用自定义表单项组处理器
        this.processor.processFormItems?.(formItems, this.context)
        // 处理每个表单控件
        formItems.formItems.forEach((control) => {
          // 跳过指定的控件类型
          if (this.processor.skipControlTypes?.includes(control.init?.controlType ?? '1111')) {
            return
          }
          this.processor.processControl?.(control, this.context)
        })
      }
    })
  }
}

// 批量表单处理结果
export type BatchFormProcessResult = {
  rules: FormRules
  defaultData: Record<string, any>
  formattedData?: Record<string, any>
}

// 批量处理表单配置
// 修改 batchProcessForm 函数签名，添加 userRules 参数
export function batchProcessForm(
  items: Array<RwFormItems.OptionT | RwTabs.OptionT>,
  options: {
    needRules?: boolean
    needDefaultData?: boolean
    formatData?: { data: Record<string, any>, method?: "toArray" | "toString" }
    userRules?: FormRules // 新增：用户传入的规则
  } = {}
): BatchFormProcessResult {
  const result: BatchFormProcessResult = {
    rules: {},
    defaultData: {}
  }

  if (options.formatData) {
    result.formattedData = { ...options.formatData.data }
  }

  const processor: formProcessor = {
    processControl: (control, context) => {
      // 处理默认数据 - 使用 PathUtils.setValue 支持嵌套结构
      if (options.needDefaultData) {
        if (control.controlType === 'Table' || (control.init?.multiple && ['MergeSelect', 'Select', 'Checkbox'].includes(control.controlType)) || (control.controlType === 'Date' && ['datetimerange', 'daterange', 'monthrange', 'yearrange'].includes(control.init.type))){
          PathUtils.setValue(context.defaultData, control.name, [])
        } else if (control.field?.default !== undefined)
          PathUtils.setValue(context.defaultData, control.name, control.field.default)
      } else if (control.field?.default === undefined) {
        PathUtils.setValue(context.defaultData, control.name, '')
        console.warn(control.name, "没有在struct中出现，请检查struct")
      }

      // 处理验证规则
      if (options.needRules) {
        const systemRules: Array<FormItemRule> = []

        // 必填验证
        if (control.formItemProps?.required || control.field?.not_null) {
          systemRules.push({
            required: true,
            message: t(`${control.moduleName}.${control.name}`) + '不能为空',
            trigger: getValidationTrigger(control.controlType)
          })
        }

        // 控件特定验证
        switch (control.controlType) {
          case 'input': // 当为input时，通过check属性判断数据类型
            addInputValidation(systemRules, control, control.init?.check || 'text')
            break
          case 'inputNumber':
            addNumberValidation(systemRules, control)
            break
          case 'select':
          case 'mergeSelect':
            addSelectValidation(systemRules, control)
            break
        }

        // 获取用户为该字段定义的规则
        const userFieldRules = options.userRules?.[control.name]

        // 合并系统规则和用户规则
        const mergedRules = mergeFieldRules(
          systemRules,
          userFieldRules ? (Array.isArray(userFieldRules) ? userFieldRules : [userFieldRules]) : []
        )

        if (mergedRules.length > 0) {
          context.rules[control.name] = mergedRules
        }
      }

    },
    skipControlTypes: ['divider']
  }

  const traverser = new FormTraverser(processor, result)
  const processedResult = traverser.traverse(items)

  // 处理用户规则中系统未处理的字段（即用户为不存在的字段添加的规则）
  if (options.needRules && options.userRules) {
    Object.keys(options.userRules).forEach(fieldName => {
      if (!processedResult.rules[fieldName]) {
        const userFieldRules = options.userRules![fieldName]
        processedResult.rules[fieldName] = Array.isArray(userFieldRules) ? userFieldRules : [userFieldRules]
      }
    })
  }

  return processedResult
}

// 合并字段验证规则的辅助函数
function mergeFieldRules(
  systemRules: Array<FormItemRule>,
  userRules: Array<FormItemRule>
): Array<FormItemRule> {
  if (userRules.length === 0) {
    return systemRules
  }

  // 创建一个Map来跟踪规则类型，用于去重
  const ruleTypeMap = new Map<string, FormItemRule>()

  // 首先添加系统规则
  systemRules.forEach(rule => {
    const ruleKey = getRuleKey(rule)
    ruleTypeMap.set(ruleKey, rule)
  })

  // 然后添加用户规则，如果有相同类型则覆盖系统规则
  userRules.forEach(rule => {
    const ruleKey = getRuleKey(rule)
    ruleTypeMap.set(ruleKey, rule)
  })

  return Array.from(ruleTypeMap.values())
}

// 获取规则的唯一标识键
function getRuleKey(rule: FormItemRule): string {
  // 根据规则的主要属性生成唯一键
  if (rule.required) return 'required'
  if (rule.type) return `type-${rule.type}`
  if (rule.pattern) return 'pattern'
  if (rule.min !== undefined && rule.max !== undefined) return 'range'
  if (rule.min !== undefined) return 'min'
  if (rule.max !== undefined) return 'max'
  if (rule.validator) return `validator-${rule.validator.toString()}`

  // 如果无法确定类型，使用规则的字符串表示作为键
  return JSON.stringify(rule)
}


//  规则
// 数字输入验证
function addNumberValidation(rules: Array<FormItemRule>, control: any) {
  const field = control.field;

  // 最小值验证
  if (field?.min !== undefined) {
    rules.push({
      type: 'number',
      min: field.min,
      message: t(`${control.moduleName}.${control.name}`)+`${t('CanNotLessThan')}${field.min}`,
      trigger: 'blur'
    });
  }

  // 最大值验证
  if (field?.max !== undefined) {
    rules.push({
      type: 'number',
      max: field.max,
      message: t(`${control.moduleName}.${control.name}`)+`${t('CanNotMoreThan')}${field.max}`,
      trigger: 'blur'
    });
  }
}

// 选择框验证
function addSelectValidation(rules: Array<FormItemRule>, control: any) {
  const field = control.field;

  // 多选最少选择数量
  if (control.multiple && field?.minSelect) {
    rules.push({
      type: 'array',
      min: field.minSelect,
      message: t(`${control.moduleName}.${control.name}`)+`${t('MinimumSelection')}${field.minSelect}${t('Items')}`,
      trigger: 'change'
    });
  }

  // 多选最多选择数量
  if (control.multiple && field?.maxSelect) {
    rules.push({
      type: 'array',
      max: field.maxSelect,
      message: t(`${control.moduleName}.${control.name}`)+`${t('MaximumSelection')}${field.maxSelect}${t('Items')}`,
      trigger: 'change'
    });
  }
}

// 输入框验证
function addInputValidation(rules: Array<FormItemRule>, control: any, type: string) {
  const validationRules: Record<string, any> = {
    email: {
      type: 'email',
      message: t(`${control.moduleName}.${control.name}`)+`${t('ErrorFormat')}`,
      trigger: 'blur'
    },
    phone: {
      pattern: /^1[3-9]\d{9}$/,
      message: t(`${control.moduleName}.${control.name}`)+`${t('ErrorFormat')}`,
      trigger: 'blur'
    },
    url: {
      type: 'url',
      message: t(`${control.moduleName}.${control.name}`)+`${t('ErrorFormat')}`,
      trigger: 'blur'
    }
  };

  if (type in validationRules) {
    rules.push(validationRules[type]);
  }

  const field = control.field;
  // 最小长度验证
  if (field?.minLength) {
    rules.push({
      min: field.minLength,
      message: t(`${control.moduleName}.${control.name}`)+`${t('LimitMin')}${field.minLength}${t('Unit')+t('Character')}`,
      trigger: 'blur'
    });
  }

  // 最大长度验证
  if (field?.maxLength) {
    rules.push({
      max: field.maxLength,
      message: t(`${control.moduleName}.${control.name}`)+`${t('LimitMax')}${field.maxLength}${t('Unit')+t('Character')}`,
      trigger: 'blur'
    });
  }

  // 正则表达式验证
  if (field?.pattern) {
    rules.push({
      pattern: new RegExp(field.pattern),
      message: field.patternMessage || t(`${control.moduleName}.${control.name}`)+`${t('ErrorFormat')}`,
      trigger: 'blur'
    });
  }
}
