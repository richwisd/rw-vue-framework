import { type SFCWithInstall, withInstall } from "../../utils"
import { type baseT } from "../../constants"
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
