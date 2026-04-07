import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'

import Empty from './empty.vue'

export const Template: SFCWithInstall<typeof Empty> = withInstall(Empty)

import type { EmptyProps } from 'element-plus'

import { baseT } from '@rw-vue-framework/constants'

export type OptionT = EmptyProps & baseT & {
  moduleName: string
  name: string
  default: any
  image: any
  description: any
}

export function init(moduleName:string, name:string, options:Partial<OptionT> = {}):Partial<OptionT> {
  return {
    moduleName,
    name,
    ...options,
  }
}
