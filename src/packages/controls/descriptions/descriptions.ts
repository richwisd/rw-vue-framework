import { type SFCWithInstall, withInstall } from "../../utils"
import { type baseT } from '../../constants'
import Descriptions from "./descriptions.vue"
export const Template: SFCWithInstall<typeof Descriptions> = withInstall(Descriptions)
import type { DescriptionProps } from "element-plus"

export type OptionT = DescriptionProps & baseT & {
  default: any,
  title: any,
  extra: any,
  moduleName: string,
  name: string,
}

export function init(moduleName: string, name: string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    moduleName: moduleName,
    name: name,
    ...options,
  }
}
