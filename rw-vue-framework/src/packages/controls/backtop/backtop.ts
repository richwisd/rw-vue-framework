import { type SFCWithInstall, withInstall } from "../../utils"
import { type baseT, type RenderContentT } from '../../constants'
import Backtop from './backtop.vue'

export const Template: SFCWithInstall<typeof Backtop> = withInstall(Backtop)

import type { BacktopProps,BacktopEmits } from "element-plus"

export type OptionT = BacktopProps & BacktopEmits & baseT & {
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
