// Element Plus 完整样式（含暗色主题变量）
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

// re-export Element Plus 的所有命名导出（ElButton、ElMessage 等）
export * from 'element-plus'
// 显式 re-export default 导出为命名导出 ElementPlus（export * 不会转发 default）
// 这样用户可以 `import { ElementPlus } from 'rw-vue-framework/element-plus'` 来获取插件对象
export { default as ElementPlus } from 'element-plus'
// re-export 所有图标
export * from '@element-plus/icons-vue'
