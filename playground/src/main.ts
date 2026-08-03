import { createApp } from 'vue'
import './style.css'
import { ElementPlus } from 'rw-vue-framework/element-plus'
import 'rw-vue-framework/style.css'
import { i18n } from "./i18n"
// import { i18n } from "rw-vue-framework/locale"
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import { store } from "rw-vue-framework/stores"

createApp(App).use(ElementPlus).use(store).use(i18n).use(VueQueryPlugin).mount('#app')
