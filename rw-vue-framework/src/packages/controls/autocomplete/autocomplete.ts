import { type SFCWithInstall, withInstall } from '../../utils'
import { type baseT, type RenderContentT } from '../../constants'

import { i18n } from '../../locale'
const { t } = i18n.global

import Autocomplete from './autocomplete.vue'

export const Template: SFCWithInstall<typeof Autocomplete> = withInstall(Autocomplete)

import type { AutocompleteProps, AutocompleteEmits } from 'element-plus'

export type OptionT = AutocompleteProps & AutocompleteEmits & baseT & {
  placeholder: string
  /* 插槽 */
  default: RenderContentT
  loadingSlot: RenderContentT
  prepend: RenderContentT // 前置插槽
  append: RenderContentT // 后置插槽
  prefix: RenderContentT // 前缀插槽
  suffix: RenderContentT // 后缀插槽
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
