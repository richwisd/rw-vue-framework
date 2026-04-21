import { type SFCWithInstall, withInstall } from '../../utils'
import { type baseT } from '../../constants'
import MessageBox from './messageBox.vue'
export const Template: SFCWithInstall<typeof MessageBox> = withInstall(MessageBox)
import type { ElMessageBoxOptions } from 'element-plus'

export type OptionT = ElMessageBoxOptions & baseT & {
  modduleName: string
  name: string
}

export function init(moduleName: string, name: string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    modduleName: moduleName,
    name: name,
    ...options,
  }
}
