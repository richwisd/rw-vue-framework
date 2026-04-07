import { type SFCWithInstall, withInstall } from "@rw-vue-framework/utils"
import { baseT } from '@rw-vue-framework/constants'
import Notification from "./notification.vue"
export const Template: SFCWithInstall<typeof Notification> = withInstall(Notification)
import type { NotificationProps, NotificationEmits } from "element-plus"
export type OptionT = NotificationProps & NotificationEmits & baseT & {
  moduleName: string,
  name: string,
}
export function init(moduleName: string, name: string, options: Partial<OptionT> = {}): Partial<OptionT> {
  return {
    moduleName: moduleName,
    name: name,
    ...options,
  }
}
