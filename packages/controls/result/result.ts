import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'

import Result from './result.vue'

export const Template: SFCWithInstall<typeof Result> = withInstall(Result)

import type { ResultProps } from 'element-plus'

import { baseT } from '@rw-vue-framework/constants'

export type OptionT = ResultProps & baseT & {
  moduleName: string
  name: string
  icon: any
  title: any
  subTitle: any
  extra: any
}

export function init( moduleName: string, name: string, options:Partial<OptionT>={}) :Partial<OptionT> {
  return {
    moduleName,
    name,
    ...options
  }
}
