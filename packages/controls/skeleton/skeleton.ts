import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'

import Skeleton from './skeleton.vue'

export const Template: SFCWithInstall<typeof Skeleton> = withInstall(Skeleton)

import type { SkeletonProps } from 'element-plus'

import { baseT } from '@rw-vue-framework/constants'

export type OptionT = SkeletonProps & baseT & {
  moduleName: string
  name: string
  default: any
  template: any
  loading?: boolean
}

export function init(moduleName: string, name:string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    moduleName,
    name,
    ...options
  }
}
