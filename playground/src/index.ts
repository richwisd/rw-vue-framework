import { createApp } from 'vue'

import App from './App.vue'

import './style.css'

import { ElIcon } from 'element-plus'

const app = createApp(App)

// if (!app.component('ElIcon')) {
//   app.component('ElIcon', ElIcon)
// }

app.mount('#app')

