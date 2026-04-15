import { type SFCWithInstall, withInstall } from '../../utils'
import { type baseT } from '../../constants'
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
