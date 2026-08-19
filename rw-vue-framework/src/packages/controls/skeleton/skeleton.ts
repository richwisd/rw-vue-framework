import { type SFCWithInstall, withInstall } from '../../utils'

import Skeleton from './skeleton.vue'

export const Template: SFCWithInstall<typeof Skeleton> = withInstall(Skeleton)

import type { SkeletonProps } from 'element-plus'

import { type baseT, type RenderContentT } from '../../constants'

export type OptionT = SkeletonProps & baseT & {
  moduleName: string
  name: string
  default: RenderContentT
  template: RenderContentT
  loading?: boolean
}

export function init(moduleName: string, name:string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    moduleName,
    name,
    ...options
  }
}
