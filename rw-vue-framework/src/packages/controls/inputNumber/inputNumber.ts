import { type SFCWithInstall, withInstall } from '../../utils'
import { type baseT, type RenderContentT } from '../../constants'

import InputNumber from './inputNumber.vue'

export const Template: SFCWithInstall<typeof InputNumber> = withInstall(InputNumber)

import type { InputNumberProps, InputNumberEmits } from 'element-plus'

export type OptionT = InputNumberProps & InputNumberEmits & baseT & {
  decreaseIcon: RenderContentT
  increaseIcon: RenderContentT
  prefix: RenderContentT
  suffix: RenderContentT
}

export function init(moduleName:string, name: string, options: Partial<OptionT> = {}): Partial<OptionT> {
  /* 处理复杂的默认值 */
  // 处理多语言，placeholder
  return {
    moduleName,
    name,
    ...options,
    controlType: 'inputNumber'
  }
}
