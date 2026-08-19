import { createApp } from 'vue'
import './style.css'

import RwVueFramework from 'rw-vue-framework'
import 'rw-vue-framework/style.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { i18n } from "./i18n"

import App from './App.vue'
import router from './router'

const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL  || '/',
  privateKey: '',
  i18n,
}

createApp(App).use(RwVueFramework, config).use(router).mount('#app')
