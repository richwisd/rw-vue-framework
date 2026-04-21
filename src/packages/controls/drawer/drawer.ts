import { type SFCWithInstall, withInstall } from '../../utils'
import { type baseT } from '../../constants'
import Drawer from './drawer.vue'
export const Template: SFCWithInstall<typeof Drawer> = withInstall(Drawer)
import type { DrawerProps, drawerEmits } from 'element-plus'
export type OptionT = DrawerProps & typeof drawerEmits & baseT & {
  default:any,
  header:any,
  footer:any,
  moduleName:string,
  name:string,
}
export function init(moduleName:string, name:string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    moduleName,
    name,
    ...options,
    controlType: 'drawer',
  }
}
