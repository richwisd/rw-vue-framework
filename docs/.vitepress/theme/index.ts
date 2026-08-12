import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import * as ElementPlusNS from 'rw-vue-framework/element-plus'
import * as ElementPlusIconsVue from 'rw-vue-framework/icons'
import { store } from 'rw-vue-framework/stores'
import {
  i18n,
  initi18n,
  initLangOptions,
  mergeLocaleMessages
} from 'rw-vue-framework/locale'
import 'rw-vue-framework/style.css'

// 初始化国际化（demo 中的 mergeLocaleMessage 依赖 i18n 已初始化）
initLangOptions.ClientLang = 'cn'
initLangOptions.fallbackLocale = 'cn'
initLangOptions.appLangs = ['cn', 'en', 'tw']
initi18n()
mergeLocaleMessages('', import.meta.glob('./langs/*.ts', { eager: true }))

// 解析 ElementPlus 插件对象。
// Vite 预打包 element-plus 时，`import ElementPlus from 'element-plus'` 可能拿到
// 被包装的 namespace 对象（{ default: { install, ... }, ... }），导致 install 丢失。
// 这里兼容两种情况：优先取 .default.install，否则直接用 namespace。
function resolveEP(ns: any): { install: Function } | null {
  if (ns && typeof ns.install === 'function') return ns
  if (ns && ns.default && typeof ns.default.install === 'function') return ns.default
  return null
}

const ep = resolveEP(ElementPlusNS)

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(store)
    if (ep) {
      app.use(ep)
    }
    // 注册所有 Element Plus 图标为全局组件（框架组件中 <ElIcon> 依赖全局注册）
    for (const [name, comp] of Object.entries(ElementPlusIconsVue)) {
      app.component(name, comp as any)
    }
    app.use(i18n)
  }
} satisfies Theme
