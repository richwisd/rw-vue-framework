import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

// 导出pinia持久化
export {
    piniaPluginPersistedstate
}

// 创建并配置 Pinia 实例
export const store = createPinia().use(piniaPluginPersistedstate)

// 导出各个 store 模块
export * from './columnsSetting'
export * from './localSetting'
export * from './appConfig'
export * from "./error"
export * from "pinia"
