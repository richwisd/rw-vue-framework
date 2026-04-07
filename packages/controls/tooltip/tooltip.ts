import { type SFCWithInstall, withInstall } from "@rw-vue-framework/utils"
import { baseT } from "@rw-vue-framework/constants"
import Tooltip from './tooltip.vue'
export const Template: SFCWithInstall<typeof Tooltip> = withInstall(Tooltip)
import type { ElTooltipProps } from "element-plus"

export type OptionT = ElTooltipProps & baseT & {
  default: any,
  content: any,
  moduleName: string,
  name: string,
}

export function init(moduleName:string, name:string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    moduleName: moduleName,
    name: name,
    ...options,
  }
}
