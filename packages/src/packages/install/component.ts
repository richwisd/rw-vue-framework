import ElementPlus from 'element-plus'

import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

import { createPinia } from "pinia"

import { createI18n } from 'vue-i18n'

import  { type Plugin, reactive } from 'vue'

import cn from '../locale/langs/cn'

import en from '../locale/langs/en'

import tw from '../locale/langs/tw'

const store = createPinia().use(piniaPluginPersistedstate)

interface initLangOptionsI{
  ClientLang:string
  fallbackLocale:string
  appLangs:string[]
}

const initLangOptions:initLangOptionsI = reactive({
  ClientLang: 'cn',
  fallbackLocale: 'cn',
  appLangs: ['cn', 'en', 'tw']
})

const messages: Record<string, any> = {
  cn,
  en,
  tw
}

const i18n = createI18n({
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

export default [
    ElementPlus,
    store,
    i18n
] as Plugin[]