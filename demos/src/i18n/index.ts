import { i18n, mergeLocaleMessages,mergeLocaleMessage, type langInfoI, type langsI,initLangOptions,initi18n,t,n,d } from "rw-vue-framework/locale"

// 使用原生 cookie API 读取语言设置
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

initLangOptions.ClientLang = getCookie('ClientLang') || 'cn'
initLangOptions.fallbackLocale = 'cn'
initLangOptions.appLangs = ['cn', 'en', 'tw']
initi18n()
//创建多语言的时候，必须要有 当前本地语言，默认语言、需要开启的语言，需要合并的语言包
mergeLocaleMessages('', import.meta.glob("./langs/*.ts",{eager:true}))


export { i18n, mergeLocaleMessage,mergeLocaleMessages, langInfoI, langsI,initLangOptions,t,n,d }
