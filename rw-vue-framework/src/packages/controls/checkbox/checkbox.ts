import { type SFCWithInstall, withInstall } from '../../utils'
import { type baseT } from '../../constants'
import type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxValueType,
  ComponentSize,
} from 'element-plus'
import Checkbox from './checkbox.vue'

export const Template: SFCWithInstall<typeof Checkbox> = withInstall(Checkbox)

// Checkbox 类型
export type CheckboxType = 'default' | 'button'

// Checkbox 选项数据类型
export type CheckboxOption = {
  label: CheckboxValueType
  value?: CheckboxValueType
  disabled?: boolean
  border?: boolean
  size?: ComponentSize
  name?: string
  checked?: boolean
  indeterminate?: boolean
  id?: string
  icon?: any
  description?: string
  [key: string]: any
}

// 事件回调类型
export type CheckboxEventCallbacks = {
  onChange?: (val) => void
  onInput?: (val) => void
}

// 组件配置类型 - 简化类型定义，避免联合类型复杂性
export type OptionT = baseT &
  CheckboxEventCallbacks &
  Omit<CheckboxProps, 'modelValue' | 'trueLabel' | 'falseLabel'> &
  Omit<CheckboxGroupProps, 'modelValue'> & {
    // === 模式配置 ===
    multiple?: boolean // 是否为多选模式（group），false 为单个 checkbox
    checkBoxType?: CheckboxType // checkbox 类型：default(标准) | button(按钮)，仅在 multiple=true 时生效

    // === 数据源配置 ===
    url?: string // 接口地址（仅 group 和 button 模式）
    params?: Record<string, any> // 接口参数
    options?: CheckboxOption[] // 直接提供的选项数据
    optionsKey?: string // 返回数据中的选项属性名，默认为 'rows'

    // === 选项属性映射 ===
    labelKey?: string // 选项标签属性名，默认 'label'
    valueKey?: string // 选项值属性名，默认 'value'
    disabledKey?: string // 选项禁用属性名，默认 'disabled'

    // === 单个复选框专用属性 ===
    trueValue?: CheckboxValueType // 替代废弃的 trueLabel
    falseValue?: CheckboxValueType // 替代废弃的 falseLabel

    // === 样式配置 ===
    direction?: 'horizontal' | 'vertical' // 排列方向（仅 group 和 button 模式）
    gap?: number // 选项间距，单位 px

    // === 功能配置 ===
    checkAll?: boolean // 是否显示全选功能（仅 group 模式）
    checkAllText?: string // 全选按钮文本

    // === 插槽内容 ===
    default?: any // 默认插槽内容
  }

// 初始化函数
export function init(
  moduleName: string,
  name: string,
  options: Partial<OptionT> = {},
): OptionT {
  const defaultOptions: Partial<OptionT> = {
    // 基础配置
    moduleName,
    name,

    // 模式配置
    multiple: false,
    checkBoxType: 'default',

    // 数据配置
    optionsKey: 'rows',

    // 选项属性映射
    labelKey: 'label',
    valueKey: 'value',
    disabledKey: 'disabled',

    // 样式配置
    direction: 'horizontal',
    gap: 0,
    size: 'default',

    // 功能配置
    checkAll: false,
    checkAllText: '全选',

    // Element Plus 默认配置
    validateEvent: true,
    border: false,
    disabled: false,
    indeterminate: false,
  }

  return {
    ...defaultOptions,
    ...options,
    controlType: 'Checkbox'
  } as OptionT
}

// 工具函数
export const getCheckboxAccept = (multiple: boolean): string => {
  return multiple ? 'array' : 'boolean'
}
