import { reactive,  watch } from 'vue'
import { createI18n,type I18n } from 'vue-i18n'
import Cookies from "js-cookie"

/** 语言包结构 */
export interface langInfoI {
  /** 必须要有页面标题 */
  // TITLE?: any
  [key: string]: string|langInfoI
}

/** 系统语言包集 */
export interface langsI {
  /** 中文语言包必填 */
  cn: langInfoI
  /** 其他语言包可选 */
  en: langInfoI
  tw: langInfoI
  [key: string]: langInfoI
}


//设置语言包必要参数
export interface initLangOptionsI{
  ClientLang:string
  fallbackLocale:string
  appLangs:string[]
}


export const initLangOptions:initLangOptionsI = reactive({
  ClientLang: 'cn',
  fallbackLocale: 'cn',
  appLangs: ['cn', 'en', 'tw']
})
// 手动导入语言文件
import cn from './langs/cn'
import en from './langs/en'
import tw from './langs/tw'

// 手动导入图片文件
// import cnImage from './imgs/cn.svg'
// import enImage from './imgs/en.svg'
// import twImage from './imgs/tw.svg'

const messages: Record<string, any> = {
  cn,
  en,
  tw
}
const localeOptions: Array<{ label: string; value: string; image: any }> = [
  { label: messages.cn.langs?.cn || 'CN', value: 'cn', image: '' },
  { label: messages.en.langs?.en || 'EN', value: 'en', image: '' },
  { label: messages.tw.langs?.tw || 'TW', value: 'tw', image: '' }
]

// 确保localeOptions按特定顺序排序（cn, en, tw优先）
localeOptions.sort((a, b) => {
  const aIndex = initLangOptions.appLangs.indexOf(a.value)
  const bIndex = initLangOptions.appLangs.indexOf(b.value)
  if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
  if (aIndex !== -1) return -1
  if (bIndex !== -1) return 1
  return a.value.localeCompare(b.value)
})

export { localeOptions, messages }


//创建i18n实例
export const i18n = createI18n({
  locale: initLangOptions.ClientLang,
  allowComposition: true,
  messages: messages,
  globalInjection: true,
  legacy: false,
  fallbackLocale: initLangOptions.fallbackLocale,
  missing: (locale, key) => {
    return key // 例如返回 "TITLE" 而不是警告
  },
})
//监听客户端语言修改
watch(()=>initLangOptions.ClientLang,(newVal)=>{
  i18n.global.locale.value=newVal
  // console.log(i18n.global.messages.value)
})
// 添加明确的语言切换函数
export function setLanguage(lang: string) {
  // 确保语言代码有效
  if (!['cn', 'en', 'tw'].includes(lang)) {
    console.warn(`Invalid language code: ${lang}`)
    return
  }

  // 更新响应式状态
  initLangOptions.ClientLang = lang

  // 直接更新 i18n 实例
  i18n.global.locale.value = lang

  Cookies.set('ClientLang', lang)
  console.log(`Language changed to: ${lang};; ${Cookies.get('ClientLang')}`)
}

export const initi18n=()=>{
  i18n.global.locale.value=initLangOptions.ClientLang
  i18n.global.fallbackLocale.value=initLangOptions.fallbackLocale
}

export function mergeLocaleMessages(moduleName:string,langs:any){
  const localeMessages:Record<string, any> = {}
  Object.entries(langs).forEach(([path, module]: [string, any])  => {
    const fileName:any = path.split('/').pop()?.replace('.ts', '')
    // console.log(fileName)
    if (initLangOptions.appLangs.includes(fileName) && module.default) {
      localeMessages[fileName]=module.default
    }
  })

 mergeLocaleMessage(moduleName,localeMessages as unknown as langsI,i18n)

}


export function mergeLocaleMessage(moduleName: string = '', langs: langsI, targetI18n?: I18n) {
  const i18nInstance = targetI18n || i18n

  // 处理空moduleName的情况
  if (!moduleName.trim()) {
    // 如果没有提供moduleName，直接将语言包合并到根命名空间
    Object.entries(langs).forEach(([langCode, langData]) => {
      if (langData) {
        i18nInstance.global.mergeLocaleMessage(langCode, langData)
      }
    })
  }else{
// 正常处理有moduleName的情况
  Object.entries(langs).forEach(([langCode, langData]) => {
    if (langData) {
      const moduleLang: Record<string, any> = {}
      moduleLang[moduleName] = langData
      i18nInstance.global.mergeLocaleMessage(langCode, moduleLang)
    }
  })
  }
}

export const { locale } = i18n.global

export const t = (key: string, values?: any) => {
  return i18n.global.t(key, values)
}

export const n = (key: number, values?: any) => {
  return i18n.global.n(key, values)
}

export const d = (key: string, values?: any) => {
  return i18n.global.d(key, values)
}


