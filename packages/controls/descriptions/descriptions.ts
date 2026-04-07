import { type SFCWithInstall, withInstall } from "@rw-vue-framework/utils"
import { baseT } from '@rw-vue-framework/constants'
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
