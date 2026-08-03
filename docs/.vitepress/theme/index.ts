import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import * as ElementPlusNS from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { store } from 'rw-vue-framework/stores'
import {
  i18n,
  initi18n,
  initLangOptions,
  mergeLocaleMessages
} from 'rw-vue-framework/locale'
import 'rw-vue-framework/style.css'

// ---- SSR 环境兜底 ----
// 框架的 pinia store 使用了 persist: { storage: localStorage }，
// VitePress 在 Node 端做 SSR 时 localStorage / document / window 不存在，
// 会导致 store 初始化抛错，进而使依赖 store 的 demo（table/form/pageTable 等）无法渲染。
// 这里在 SSR 阶段注入一个内存版 Storage，保证 store 初始化不报错。
declare global {
  interface Window { localStorage: Storage }
}

if (typeof window === 'undefined') {
  const memoryStorage = (() => {
    const map = new Map<string, string>()
    return {
      get length() { return map.size },
      key(i: number) { return Array.from(map.keys())[i] ?? null },
      getItem(k: string) { return map.has(k) ? map.get(k)! : null },
      setItem(k: string, v: string) { map.set(k, String(v)) },
      removeItem(k: string) { map.delete(k) },
      clear() { map.clear() },
    }
  }) as unknown as Storage

  ;(globalThis as any).localStorage = (globalThis as any).localStorage ?? memoryStorage
  ;(globalThis as any).sessionStorage = (globalThis as any).sessionStorage ?? memoryStorage
  ;(globalThis as any).document = (globalThis as any).document ?? {}
  ;(globalThis as any).window = (globalThis as any).window ?? globalThis
}

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
