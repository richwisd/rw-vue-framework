import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'

import { t } from '@rw-vue-framework/locale'

import Dropdown from './dropdown.vue'
import { ArrowDown } from '@element-plus/icons-vue'

export const Template: SFCWithInstall<typeof Dropdown> = withInstall(Dropdown)

import { dropdownProps, dropdownItemProps } from 'element-plus'
import { baseT } from '@rw-vue-framework/constants'
import { ExtractPropTypes, reactive, type Component } from 'vue'
import { RwButton } from '../button'

// 定义严格的尺寸类型
export type DropdownSize = '' | 'large' | 'default' | 'small'
export type DropdownType = '' | 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'text'
export type DropdownPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'
export type DropdownTrigger = 'hover' | 'click' | 'contextmenu'

// 重新定义 DropdownProps，保持类型严格性
export type DropdownProps = Omit<ExtractPropTypes<typeof dropdownProps>, 'size' | 'type' | 'placement' | 'trigger'> & {
  size?: DropdownSize
  type?: DropdownType
  placement?: DropdownPlacement
  trigger?: DropdownTrigger
}
export type DropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>

export type areaT = "form" | "search" | "operateButtons" | "tableButtons" | "tableLine" | "inForm" | "custom"

export type DropdownItemOptionT = DropdownItemProps & baseT &  {
  showCheck: boolean
  checked: boolean
  show: boolean

  click: (e: MouseEvent) => any | Promise<any>
}

// 使用更具体的函数类型定义
export type OptionT = DropdownProps & baseT & {
  default: any
  dropdown: any

  statusData: any

  click: (e: MouseEvent) => any
  command: (...args: any[]) => void
  visibleChange:(val: boolean) => void
  // 自定义
  items: Partial<DropdownItemOptionT & { showCheck: boolean, checked: boolean}>[]
  button: Partial<RwButton.OptionT>

  // 图标
  icon?:string | Component

  text: boolean
  id:string

  disabled: boolean

  addItem: (name: string, options?: Partial<DropdownItemOptionT>) => void
  // area: areaT
  setItemAttrib: (name:string ,attrib: any, value:any) => void

  refreshButton?: (options: any, data?: any) => Partial<OptionT>
}

export function init(moduleName:string, name: string, options?: Partial<OptionT> ): OptionT {
  /* 处理复杂的默认值 */
  // 处理多语言，placeholder
  const items = reactive(options?.items ?? [])
  const button = options?.button ?? RwButton.init(moduleName, name, { suffixIcon: ArrowDown, text: options?.text ?? false , disabled: options?.disabled ?? false, icon: options?.icon, label: options?.label ?? `${moduleName}.${name}` })
  const self = {
    id: `dropdown-${name}-${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    moduleName: moduleName,
    name: name,
    items,
    addItem: (name: string, options: Partial<DropdownItemOptionT> = {}) => {
      self.items.push({ ...options, name })
    },
    setItemAttrib: (name:string, attrib:any, value:any) =>{

      const findItem = self.items.find(item => item.name == name)

      if(findItem){
        (findItem as Record<string, any>)[attrib] = value
      }
    },
    ...options,
    button,
    controlType: "dropdown",
  } as OptionT
  return self
}

