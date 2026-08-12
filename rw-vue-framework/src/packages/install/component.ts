import ElementPlus from 'element-plus'

import { createI18n } from 'vue-i18n'

import  { reactive } from 'vue'

import cn from '../locale/langs/cn'

import en from '../locale/langs/en'

import tw from '../locale/langs/tw'

/** Pinia 实例（复用 stores 模块导出的同一实例，确保 useXxxStore 能正确激活） */
export { store as pinia } from '../stores'

const initLangOptions = reactive({
  ClientLang: 'cn',
  fallbackLocale: 'cn',
  appLangs: ['cn', 'en', 'tw']
})

const messages: Record<string, any> = {
  cn,
  en,
  tw
}

/** 框架内置 i18n 实例 */
export const i18n = createI18n({
  locale: initLangOptions.ClientLang,
  allowComposition: true,
  messages: messages,
  globalInjection: true,
  legacy: false,
  fallbackLocale: initLangOptions.fallbackLocale,
  missing: (locale, key) => {
    return key
  },
})

/** Element Plus */
export const elementPlus = ElementPlus
