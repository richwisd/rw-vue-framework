import { type SFCWithInstall, withInstall } from '../../utils'

import Empty from './empty.vue'

export const Template: SFCWithInstall<typeof Empty> = withInstall(Empty)

import type { EmptyProps } from 'element-plus'

import { type baseT, type RenderContentT } from '../../constants'

export type OptionT = EmptyProps & baseT & {
  moduleName: string
  name: string
  default: RenderContentT
  image: RenderContentT
  description: RenderContentT
}

export function init(moduleName:string, name:string, options:Partial<OptionT> = {}):Partial<OptionT> {
  return {
    moduleName,
    name,
    ...options,
  }
}
