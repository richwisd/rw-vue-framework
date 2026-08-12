import { type SFCWithInstall, withInstall } from '../../utils'
import { type baseT } from '../../constants'

import { i18n } from '../../locale'
const { t } = i18n.global

import Autocomplete from './autocomplete.vue'

export const Template: SFCWithInstall<typeof Autocomplete> = withInstall(Autocomplete)

import type { AutocompleteProps, AutocompleteEmits } from 'element-plus'

export type OptionT = AutocompleteProps & AutocompleteEmits & baseT & {
  placeholder: string
  /* 插槽 */
  default: any
  loadingSlot: any
  prepend: any // 前置插槽
  append: any // 后置插槽
  prefix: any // 前缀插槽
  suffix: any // 后缀插槽
}

export function init(moduleName:string, name: string, options: Partial<OptionT> = {}): Partial<OptionT> {
  /* 处理复杂的默认值 */
  // 处理多语言，placeholder
  return {
    name,
    placeholder: t('controls.pleaseInput') + t(moduleName ? `${moduleName}.${name}` : name),
    ...options,
  }
}
