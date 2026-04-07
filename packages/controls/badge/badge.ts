import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'

import Badge from './badge.vue'

export const Template: SFCWithInstall<typeof Badge> = withInstall(Badge)

import type { BadgeProps } from 'element-plus'

import { baseT } from '@rw-vue-framework/constants'


export type OptionT = BadgeProps & baseT & {
  default: any
  content: any
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
