import { type SFCWithInstall, withInstall } from "../../utils"
import { type baseT, type RenderContentT } from '../../constants'
import Popover from './popover.vue'
export const Template: SFCWithInstall<typeof Popover> = withInstall(Popover)
import type { PopoverProps, PopoverEmits } from "element-plus"

export type OptionT = PopoverProps & PopoverEmits & baseT & {
  default: RenderContentT,
  reference: RenderContentT,
  modularName: string,
  name: string,
}

export function init(moduleName: string, name: string, options: Partial<OptionT> = {}): Partial<OptionT>{
  return {
    modularName: moduleName,
    name: name,
    ...options,
  }
}
