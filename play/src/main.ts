import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "element-plus/theme-chalk/dark/css-vars.css"
import 'rw-vue-framework/theme-chalk/index.css'
import { i18n } from "./i18n"
// import { i18n } from "rw-vue-framework"
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import { store } from "rw-vue-framework"

createApp(App).use(ElementPlus).use(store).use(i18n).use(VueQueryPlugin).mount('#app')
