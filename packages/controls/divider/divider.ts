import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'
import { baseT } from '@rw-vue-framework/constants'
import Alert from './divider.vue'
export const Template: SFCWithInstall<typeof Alert> = withInstall(Alert)
import type { DividerProps } from 'element-plus'

export type OptionT = DividerProps & baseT & {
  default: any
  text: string
}
export function init(moduleName: string, name: string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    moduleName,
    name,
    // text: t(`${moduleName}.${name}`),
    ...options,
    controlType: 'divider',
  }
}
