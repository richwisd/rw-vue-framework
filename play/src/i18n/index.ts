import { i18n, mergeLocaleMessages,mergeLocaleMessage, type langInfoI, type langsI,initLangOptions,initi18n,t,n,d } from "rw-vue-framework"
import Cookies from "js-cookie"


initLangOptions.ClientLang=Cookies.get('ClientLang') || 'cn'
initLangOptions.fallbackLocale = 'cn'
initLangOptions.appLangs = ['cn', 'en', 'tw']
initi18n()
//创建多语言的时候，必须要有 当前本地语言，默认语言、需要开启的语言，需要合并的语言包
mergeLocaleMessages('', import.meta.glob("./langs/*.ts",{eager:true}))


export { i18n, mergeLocaleMessage,mergeLocaleMessages, langInfoI, langsI,initLangOptions,t,n,d }

