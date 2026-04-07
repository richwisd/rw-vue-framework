import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'
import { baseT } from '@rw-vue-framework/constants'
import Affix from './affix.vue'
export const Template: SFCWithInstall<typeof Affix> = withInstall(Affix)
import type { AffixProps, AffixEmits } from 'element-plus'

export type OptionT = AffixProps & AffixEmits & baseT & {
  default: any
  moduleName: string
  name: string
}

export function init(moduleName: string, name: string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    moduleName: moduleName,
    name: name,
    ...options,
  }
}
