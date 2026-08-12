import { type SFCWithInstall, withInstall } from '../../utils'

import Progress from './progress.vue'

export const Template: SFCWithInstall<typeof Progress> = withInstall(Progress)

import type { ProgressProps } from 'element-plus'

import { type baseT } from '../../constants'

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
