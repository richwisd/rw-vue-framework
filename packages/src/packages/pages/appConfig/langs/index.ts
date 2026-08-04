import cn from "./cn"
import en from "./en"
import tw from "./tw"
/** 设置语言 */
import {mergeLocaleMessage} from '../../../locale'
import type { langsI } from '../../../locale'
const langs:langsI={cn:cn, en:en, tw:tw}
const moduleName = "appConfig"; //仅用于模块标注，在系统中最好唯一，否则语言包会有冲突
mergeLocaleMessage(moduleName,langs)
export { moduleName }
