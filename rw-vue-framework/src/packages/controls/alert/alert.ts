import { type SFCWithInstall, withInstall } from '../../utils'
import { type baseT, type RenderContentT } from '../../constants'
import Alert from './alert.vue'
export const Template: SFCWithInstall<typeof Alert> = withInstall(Alert)
import type { AlertProps, AlertEmits } from 'element-plus'
export type OptionT = AlertProps & AlertEmits & baseT & {
  default: RenderContentT
  title: RenderContentT
  icon: RenderContentT
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
