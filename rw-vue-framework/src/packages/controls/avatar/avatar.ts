import { type SFCWithInstall, withInstall } from '../../utils'

import Avatar from './avatar.vue'

export const Template: SFCWithInstall<typeof Avatar> = withInstall(Avatar)

import type { AvatarProps, AvatarEmits } from 'element-plus'

import { type baseT, type RenderContentT } from '../../constants'

export type OptionT = AvatarProps & AvatarEmits & baseT & {
  moduleName: string
  name: string
  default: RenderContentT
}

export function init (moduleName: string, name:string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    moduleName: moduleName,
    name: name,
   ...options
  }
}
