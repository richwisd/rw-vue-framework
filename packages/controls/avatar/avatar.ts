import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'

import Avatar from './avatar.vue'

export const Template: SFCWithInstall<typeof Avatar> = withInstall(Avatar)

import type { AvatarProps, AvatarEmits } from 'element-plus'

import { baseT } from '@rw-vue-framework/constants'

export type OptionT = AvatarProps & AvatarEmits & baseT & {
  moduleName: string
  name: string
  default: any
}

export function init (moduleName: string, name:string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    moduleName: moduleName,
    name: name,
   ...options
  }
}
