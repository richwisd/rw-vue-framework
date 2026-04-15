import { type SFCWithInstall, withInstall } from '../../utils'
import { type baseT } from '../../constants'
import Message from './message.vue'
export const Template: SFCWithInstall<typeof Message> = withInstall(Message)
import type { MessageProps, MessageEmits } from 'element-plus'
export type OptionT = MessageProps & MessageEmits & baseT & {
  moduleName:string
  name:string
}
export function init(moduleName:string, name:string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    moduleName: moduleName,
    name: name,
    ...options,
  }
}
