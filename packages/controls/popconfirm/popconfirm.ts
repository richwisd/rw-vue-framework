import { type SFCWithInstall, withInstall } from "@rw-vue-framework/utils";
import { baseT } from "@rw-vue-framework/constants";
import Popconfirm from './popconfirm.vue'
export const Template: SFCWithInstall<typeof Popconfirm> = withInstall(Popconfirm)
import type { PopconfirmProps, PopconfirmEmits } from "element-plus";
import { t } from "@rw-vue-framework/locale";
import { RwButton } from '../button'

export type OptionT = PopconfirmProps & PopconfirmEmits & baseT & {
  reference: any
  actions : any

  button: Partial<RwButton.OptionT>
  text:boolean
  tag:string
  disabled: boolean

  refreshButton?: (options: any, data?: any) => Partial<OptionT>
  // type: ''  // 确定，取消，删除type: ask、delete
}
export function init(moduleName: string, name: string, options: Partial<OptionT> = {}): OptionT {
  const label = options?.label ?? t(`${moduleName}.${name}`)
  const button = options?.button ?? RwButton.init(moduleName, name, { text: options?.text ?? false, label: label , icon: options?.icon, disabled: options?.disabled ?? false })
  return {
    moduleName: moduleName,
    label,
    name: name,
    ...options,
    button,
    controlType: "popconfirm",
  } as OptionT;
}
