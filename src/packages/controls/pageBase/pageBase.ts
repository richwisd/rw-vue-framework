import { type SFCWithInstall, withInstall } from "../../utils"
import PageBase from './pageBase.vue'
import { RwButtonGroup, RwDialog } from "../"
import { reactive } from "vue"


export const Template: SFCWithInstall<typeof PageBase> = withInstall(PageBase)

/** 需要扩展，请在此添加对应的内容 */
export type typeT="table"|"form"|"info"|"query"|"customize"

export type OptionT ={
  name:string
  type:typeT
  dialogs: RwDialog.OptionT[]
  pushDialog:(name: string,templateName:any, buttons?: RwButtonGroup.OptionT, options?: Partial<RwDialog.OptionT>) => void
  showDialog:(name: string, id?: number, params?: Record<string, any>) => void
}

export const init=(name:string,pageType:typeT,options?:Partial<OptionT>): OptionT => {
  const dialogs = reactive<RwDialog.OptionT[]>([])
  return {
    name:name,
    type:pageType,
    dialogs,
    ...options,
    pushDialog:(name: string, templateName:any, buttons?: RwButtonGroup.OptionT, options: Partial<RwDialog.OptionT> = {}) => {
      dialogs.push(RwDialog.init(
        name,
        templateName,
        buttons,
        options
      ))
    },
    showDialog:(name: string, id: number = 0, params?: Record<string, any>) => {
      const dialog = dialogs.find(dialog => dialog.name === name)
      if(dialog){
        dialog.show = true
        dialog.idValue = id
        // console.log('dialog.show', dialog.show, dialog.idValue)
        // 传递参数
        if (params) {
          dialog.params = params
        }
      }
    }
  } as OptionT
}
