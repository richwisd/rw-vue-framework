import { type SFCWithInstall, withInstall } from "../../utils"
import SmallComp from './smallComp.vue'
export const Template: SFCWithInstall<typeof SmallComp> = withInstall(SmallComp)
