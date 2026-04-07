import Form from './form.vue'
import { type SFCWithInstall, withInstall } from '@rw-vue-framework/utils'
import type * as RwFormNS from './form'
import * as RwFormBase from './form'
const Template: SFCWithInstall<typeof Form> = withInstall(Form)

export const RwForm = Object.assign({}, RwFormBase, { Template }) as typeof RwFormBase & { Template: SFCWithInstall<typeof Form> }
export namespace RwForm {
  export type OptionT = RwFormNS.OptionT
}
