import cn from "./cn"
import en from "./en"
/** 设置语言 */

import {mergeLocaleMessage} from 'rw-vue-framework/locale'
import type { langsI } from 'rw-vue-framework/locale'
const langs:langsI={cn:cn,en:en}

const moduleName = "pageTable"; //仅用于模块标注，在系统中最好唯一，否则语言包会有冲突
mergeLocaleMessage(moduleName,langs)
export { moduleName }
