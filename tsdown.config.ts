import { defineConfig } from 'tsdown'
import vue from '@vitejs/plugin-vue'
import url from '@rollup/plugin-url'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  platform: 'browser',
  exports: true,
  dts: { vue: true },

  plugins: [
    vue({isProduction:true}),
    url({
      // 让 Vite/Rollup 把 .png 当作 URL 字符串处理，而不是内联 base64
      include: /\.(png|jpg|jpeg|gif|svg|webp|ico)$/,
      // 输出到 dist/assets 目录
      destDir: path.resolve(__dirname, 'dist/assets'),
    }),
  ],
  // 仅输出 ESM 格式
  format: ['esm'],
  clean: true,
  shims: false,
  // 入口配置
  entry: {
    "index": "./src/index.ts",
    "constants": "./src/packages/constants/index.ts",
    "controls": "./src/packages/controls/index.ts",
    "locale": "./src/packages/locale/index.ts",
    "stores": "./src/packages/stores/index.ts",
    "utils": "./src/packages/utils/index.ts",
    "hooks": "./src/packages/hooks/index.ts",
    "icons": "./src/packages/icons/index.ts",
    "pages": "./src/packages/pages/index.ts",
    "layout": "./src/packages/layout/index.ts",
    "element-plus": "./src/element-plus.ts",
    "pinia": "./src/pinia.ts",
    "vue-i18n": "./src/vue-i18n.ts",
  },
  // 强制打包第三方库，使消费方无需自行安装这些包
  deps: {
    alwaysBundle: [
      'element-plus',
      '@element-plus/icons-vue',
      'pinia',
      'pinia-plugin-persistedstate',
      'vue-i18n',
    ],
    // normalize-wheel-es 是 element-plus 内部 .d.ts 的类型依赖，
    // 运行时不需要，保持 external 避免 MISSING_EXPORT 报错
    neverBundle: ['normalize-wheel-es'],
    // 关闭 onlyBundle 提示，保持当前打包行为（alwaysBundle 依赖及其子依赖全打包）
    onlyBundle: false,
  },
  // 关闭插件耗时提示
  inputOptions: {
    checks: {
      pluginTimings: false,
    },
  },
  rollupOptions: {
    output: {
      exports: 'named',
      assetFileNames: 'assets/[name].[ext]',
    },
  },
})
