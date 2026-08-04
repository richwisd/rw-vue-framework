import { type SFCWithInstall, withInstall } from '../../utils'

import Input from './input.vue'

export const Template: SFCWithInstall<typeof Input> = withInstall(Input)

import type { InputProps, InputEmits } from 'element-plus'
import { type baseT } from '../../constants'

export type checkT = 'email'|'number'|'idcard'|'mobile'|'url'|'tel'|'password'|'username'|'text'

// 组件实例类型定义
export type InputInstance = {
  inputRef: any
  focus: () => void
  blur: () => void
  select: () => void
  clear: (event?: MouseEvent) => void
}

// 使用更具体的函数类型定义
export type OptionT = InputProps & InputEmits & baseT &  {
  prefix: any
  suffix: any
  prepend: any
  append: any
  check: checkT
  customPlaceholder: boolean
  instance: InputInstance | null

  //多语言
  mutiLang: boolean
  langTip: boolean
  langLable: 'icon' | 'text'

  // 回调函数方案：组件挂载时调用
  onMounted?: (inst:any) => void
}

export function init(moduleName: string, name: string, options?: Partial<OptionT>): OptionT {
  /* 处理复杂的默认值 */
  // 处理多语言，placeholder
  let instance: InputInstance = null

  return {
    moduleName,
    name,
    type: 'text', // 处理默认值
    check: 'text',
    clearable: true,
    showPassword: options?.type === 'password',
    customPlaceholder: false,
    mutiLang: false,
    langLable: 'icon',
    ...options,
    getInstance: () => instance,
    onMounted: (inst) => {
      instance = inst
      options?.onMounted?.(inst)
    },
    controlType: 'Input'
  } as OptionT
}

// // 工厂函数：创建带有实例管理的控件
// export function createInputWithRef(moduleName: string, name: string, options?: Partial<OptionT>) {
//   let instance: InputInstance | null = null

//   const control = init(moduleName, name, {
//     ...options,
//     onMounted: (inst) => {
//       instance = inst
//       options?.onMounted?.(inst)
//     }
//   })

//   return {
//     control,
//     getInstance: () => instance,
//     focus: () => instance?.focus(),
//     blur: () => instance?.blur(),
//     select: () => instance?.select(),
//     clear: () => instance?.clear(),
//     isReady: () => instance !== null
//   }
// }

