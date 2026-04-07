import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'
import { baseT } from '@rw-vue-framework/constants'
import Steps from './steps.vue'
export const Template: SFCWithInstall<typeof Steps> = withInstall(Steps)
import type { StepsProps, StepsEmits } from 'element-plus'
export type OptionT = StepsProps & StepsEmits & baseT & {
  default: any
  moduleName: string
  name: string
}

export function init(moduleName: string, name: string, options: Partial<OptionT> = {}):Partial<OptionT> {
  return {
    moduleName: moduleName,
    name: name,
    ...options,
  }
}
