import { type SFCWithInstall, withInstall } from '../../utils'
import { type baseT, type RenderContentT } from '../../constants'
import Affix from './affix.vue'
export const Template: SFCWithInstall<typeof Affix> = withInstall(Affix)
import type { AffixProps, AffixEmits } from 'element-plus'

export type OptionT = AffixProps & AffixEmits & baseT & {
  default: RenderContentT
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
