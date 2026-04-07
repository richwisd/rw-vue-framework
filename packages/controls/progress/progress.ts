import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'

import Progress from './progress.vue'

export const Template: SFCWithInstall<typeof Progress> = withInstall(Progress)

import type { ProgressProps } from 'element-plus'

import { baseT } from '@rw-vue-framework/constants'

export type OptionT = ProgressProps & baseT & {
  moduleName: string
  name: string
  default: any
  percentage ?: number
}

export function init(moduleName: string, name: string, options: Partial<OptionT>={}): Partial<OptionT> {
  return {
    moduleName,
    name,
    ...options
  }
}
