import { type SFCWithInstall, withInstall } from '../../utils'

import Result from './result.vue'

export const Template: SFCWithInstall<typeof Result> = withInstall(Result)

import type { ResultProps } from 'element-plus'

import { type baseT, type RenderContentT } from '../../constants'

export type OptionT = ResultProps & baseT & {
  moduleName: string
  name: string
  icon: RenderContentT
  title: RenderContentT
  subTitle: RenderContentT
  extra: RenderContentT
}

export function init( moduleName: string, name: string, options:Partial<OptionT>={}) :Partial<OptionT> {
  return {
    moduleName,
    name,
    ...options
  }
}
