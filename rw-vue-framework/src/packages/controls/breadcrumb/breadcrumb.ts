import { type SFCWithInstall, withInstall } from "../../utils";
import { type baseT, type RenderContentT } from '../../constants'
import Breadcrumb from './breadcrumb.vue'

export const Template: SFCWithInstall<typeof Breadcrumb> = withInstall(Breadcrumb)

import type { BreadcrumbProps } from "element-plus"

export type OptionT = BreadcrumbProps & baseT & {
  default: RenderContentT
  moduleName: string
  name: string
}

export function init(moduleName: string, name:string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    moduleName: moduleName,
    name: name,
    ...options,
  }
}
