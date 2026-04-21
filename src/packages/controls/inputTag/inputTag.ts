import { type SFCWithInstall, withInstall } from '../../utils'

import { i18n } from '../../locale'
const { t } = i18n.global

import InputTag from './inputTag.vue'

export const Template: SFCWithInstall<typeof InputTag> = withInstall(InputTag)

import type { InputTagProps,InputTagEmits } from 'element-plus'
import { type baseT } from '../../constants'

export type OptionT = InputTagProps & InputTagEmits & baseT & {
  prefix: any
  suffix: any
  tag: any

  unique: boolean
}

export function init(moduleName:string, name: string, options: Partial<OptionT> = {}): Partial<OptionT> {
  /* 处理复杂的默认值 */
  // 处理多语言，placeholder
  return {
    moduleName,
    name,
    unique: true,
    max: 10,
    ...options,
    controlType: 'inputTag'
  }
}
