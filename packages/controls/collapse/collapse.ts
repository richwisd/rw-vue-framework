import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'
import { baseT } from '@rw-vue-framework/constants'
import Collapse from './collapse.vue'
export const Template: SFCWithInstall<typeof Collapse> = withInstall(Collapse)
import type { CollapseProps, CollapseEmits } from 'element-plus'

export type OptionT = CollapseProps & CollapseEmits & baseT & {
  default: any,
  moduleName: string,
  name: string,
}

export function init(moduleName: string, name:string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    moduleName: moduleName,
    name: name,
    ...options,
  }
}
