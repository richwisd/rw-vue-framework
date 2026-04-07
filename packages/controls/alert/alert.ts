import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'
import { baseT } from '@rw-vue-framework/constants'
import Alert from './alert.vue'
export const Template: SFCWithInstall<typeof Alert> = withInstall(Alert)
import type { AlertProps, AlertEmits } from 'element-plus'
export type OptionT = AlertProps & AlertEmits & baseT & {
  default:any
  title:any
  icon:any
  moduleName:string
  name:string
}
export function init(moduleName: string, name: string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    moduleName: moduleName,
    name: name,
    ...options,
  }
}
