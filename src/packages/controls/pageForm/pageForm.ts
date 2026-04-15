import { type SFCWithInstall, withInstall } from '../../utils'
import PageForm from './pageForm.vue'
import { RwPageBase } from '../pageBase'
import { RwForm } from '../'
import { pageStruct } from '../pageStruct'
import { reactive } from 'vue'

export const Template: SFCWithInstall<typeof PageForm> = withInstall(PageForm)

export type OptionT = {
  page: RwPageBase.OptionT
  form: RwForm.OptionT  // 改为完整类型，因为init方法返回的是完整对象
  controlType: string
}

export const init = (
  struct: pageStruct.OptionT,
  options?: {
    page?: Partial<RwPageBase.OptionT>
    form?: Partial<RwForm.OptionT>  // 输入参数保持Partial
  },
): OptionT => {
  const page = reactive(RwPageBase.init(struct.name, 'form'))
  const form = reactive(RwForm.init(struct, {
    ...options?.form,
  }))

  return {
    page,
    form,  // 这里返回的是完整的RwForm.OptionT对象
    controlType: 'pageForm'
  } as OptionT
}
