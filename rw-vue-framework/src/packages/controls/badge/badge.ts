import { type SFCWithInstall, withInstall } from '../../utils'

import Badge from './badge.vue'

export const Template: SFCWithInstall<typeof Badge> = withInstall(Badge)

import type { BadgeProps } from 'element-plus'

import { type baseT, type RenderContentT } from '../../constants'


export type OptionT = BadgeProps & baseT & {
  default: RenderContentT
  content: RenderContentT
  moduleName: string
  name: string
}

export function init(moduleName: string, name: string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    moduleName: moduleName,
    name: name,
    ...options,
  }
}
