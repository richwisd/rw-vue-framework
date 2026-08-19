import { type SFCWithInstall, withInstall } from '../../utils'
import { type baseT, type RenderContentT } from '../../constants'
import Radio from './radio.vue'

export const Template: SFCWithInstall<typeof Radio> = withInstall(Radio)

// Radio 选项数据类型
export interface RadioOption {
  label: string | number | boolean
  value?: string | number | boolean
  disabled?: boolean
  border?: boolean
  size?: 'large' | 'default' | 'small'
  name?: string
  icon?: RenderContentT
  description?: string
  [key: string]: any
}

// Radio 模式类型
export type RadioMode = 'single' | 'group' | 'button'

// 事件回调类型
export interface RadioEventCallbacks {
  onChange?: (value: any) => void
  onInput?: (value: any) => void
}

// 组件配置类型 - 继承 Element Plus Radio 和 RadioGroup 的所有属性
export type OptionT = baseT & RadioEventCallbacks & {
  // === 模式配置 ===
  mode?: RadioMode // radio 模式：single(单个) | group(组) | button(按钮组)

  // === 数据源配置 ===
  url?: string // 接口地址（仅 group 和 button 模式）
  params?: Record<string, any> // 接口参数
  options?: RadioOption[] // 直接提供的选项数据
  optionsKey?: string // 返回数据中的选项属性名，默认为 'rows'

  // === 选项属性映射 ===
  labelKey?: string // 选项标签属性名，默认 'label'
  valueKey?: string // 选项值属性名，默认 'value'
  disabledKey?: string // 选项禁用属性名，默认 'disabled'

  // === Element Plus Radio 单个单选框属性 ===
  // 基础属性
  label?: string | number | boolean // 选中状态的值（仅单个模式）
  disabled?: boolean // 是否禁用
  border?: boolean // 是否显示边框
  size?: 'large' | 'default' | 'small' // 尺寸
  validateEvent?: boolean // 输入时是否触发表单的校验
  tabindex?: string | number // 输入框的 tabindex
  id?: string // input id

  // === Element Plus RadioGroup 组属性 ===
  // 组配置
  textColor?: string // 按钮形式的 Radio 激活时的文本颜色
  fill?: string // 按钮形式的 Radio 激活时的填充色和边框色
  tag?: string // 单选框组元素的标签

  // === 样式配置 ===
  direction?: 'horizontal' | 'vertical' // 排列方向（仅 group 和 button 模式）
  gap?: number // 选项间距，单位 px

  // === 插槽内容 ===
  default?: RenderContentT // 默认插槽内容
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

    // 模式配置 - 根据是否有 options 来判断默认模式
    mode: options.options && options.options.length > 0 ? 'group' : 'single',

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

    // Element Plus 默认配置
    validateEvent: true,
    border: false,
    disabled: false,
  }

  return {
    ...defaultOptions,
    ...options,
    controlType: 'Radio',
  } as OptionT
}
