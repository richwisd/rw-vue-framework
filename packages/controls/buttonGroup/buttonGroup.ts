import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'

import ButtonGroup from './buttonGroup.vue'

export const Template: SFCWithInstall<typeof ButtonGroup> =
  withInstall(ButtonGroup)

import { RwButton } from '../button'
import { RwPopconfirm } from '../popconfirm'
import { RwDropdown } from '../dropdown'

import { baseT } from '@rw-vue-framework/constants'
import { Component, markRaw, reactive } from 'vue'
import { useLocalSettingStore } from '@rw-vue-framework/stores'

// 定义控件类型枚举
export type ControlTypeEnum = 'button' | 'popconfirm' | 'dropdown'

// 组件映射表类型
type ComponentMapType = {
  button: typeof RwButton
  popconfirm: typeof RwPopconfirm
  dropdown: typeof RwDropdown
}

// 组件映射表
const componentMap: ComponentMapType = {
  button: RwButton,
  popconfirm: RwPopconfirm,
  dropdown: RwDropdown,
} as const

export type ControlT =
  | RwButton.OptionT
  | RwPopconfirm.OptionT
  | RwDropdown.OptionT

// 修复后的 buttonItemT 类型
type ButtonItemT = baseT & {
  moduleName: string
  name: string
  controlType: ControlTypeEnum
  Template: Component
  config: any // 改为 any 以避免类型实例化过深
  disabled?: boolean
}

// 为不同控件类型定义专门的选项类型
type ButtonOptions = Partial<RwButton.OptionT>
type PopconfirmOptions = Partial<RwPopconfirm.OptionT>
type DropdownOptions = Partial<RwDropdown.OptionT>
export type ButtonsAreaT = "form" | "search" | "operate" | "table" | "tableLine" | "custom"

export type OptionT = baseT & {
  size: 'large' | 'default' | 'small'
  type: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  isGroup: boolean
  controls: ButtonItemT[]
  default: any
  buttonsArea: ButtonsAreaT
  customized: boolean, // 是否是自定义的按钮,false表示是适配localSetting的
  verticalLocation: 'top' | 'bottom' | false // 按钮的位置

  // 类型安全的添加方法
  addButton: (name: string, options?: ButtonOptions) => ButtonItemT | null
  addPopconfirm: (name: string, options?: PopconfirmOptions) => ButtonItemT | null
  addDropdown: (name: string, options?: DropdownOptions) => ButtonItemT | null
  setAttrib: (name:string, attrib:any, value:any) => void
  changeButton: (name: string, options: any) => boolean
}

export function init(
  moduleName: string,
  options?: Partial<OptionT>,
): OptionT {
  const localSetting = useLocalSettingStore()
  const controls: ButtonItemT[] = reactive(options?.controls ?? [])
  const buttonsArea = options?.buttonsArea ?? 'custom'
  const isText = (localSetting.getButtonStyle(buttonsArea) === 'text')

  const self = {
    isGroup: true,
    moduleName,
    customized: false,
    buttonsArea,
    show: true,
    verticalLocation: false,
    ...options,
    controls,
    controlType: 'buttonGroup',

    addButton: (name: string, options: ButtonOptions = {}) =>
      createComponent('button', moduleName, name, { text: isText, ...options }, controls),

    addPopconfirm: (name: string, options: PopconfirmOptions = {}) =>
      createComponent('popconfirm', moduleName, name, { text: isText, ...options }, controls),

    addDropdown: (name: string, options: DropdownOptions = {}) =>
      createComponent('dropdown', moduleName, name, { text: isText, ...options }, controls),

    changeButton: (name: string, options: any) => {
      const item = self.controls.find((item) => item.name === name)
      if (item) {
        Object.assign(item.config, options)
        return true
      }
      return false
    },
    setAttrib: (name:string, attrib:any, value:any) =>{
      const findItem = self.controls.find(item => item.name == name)
      if(findItem){
        (findItem as Record<string, any>)[attrib] = value
      }
    },
  } as OptionT

  return self
}

// 重构的创建组件函数
export function createComponent<T extends ControlTypeEnum>(
  controlType: T,
  moduleName: string,
  name: string,
  options: T extends 'button' ? ButtonOptions :
           T extends 'popconfirm' ? PopconfirmOptions :
           T extends 'dropdown' ? DropdownOptions : ButtonOptions,
  items: ButtonItemT[]
): ButtonItemT | null {
  const ctrl = componentMap[controlType]

  if (!ctrl || typeof ctrl.init !== 'function') {
    console.warn(`Control "${controlType}" not found or invalid`)
    return null
  }

  // 修复：正确调用 init 函数
  const config = ctrl.init(moduleName, name, options)

  const controlConfig = {
    disabled: options.disabled ?? false,
    moduleName,
    name,
    controlType,
    Template: markRaw(ctrl.Template),
    config,
  } as ButtonItemT

  items.push(controlConfig)
  return controlConfig
}
