import { defineConfig } from 'tsdown'
import vue from '@vitejs/plugin-vue'
import url from '@rollup/plugin-url'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  platform: 'neutral',
  exports: true,
  dts: { vue: true },
  plugins: [
    vue(),
    url({
      // 让 Vite/Rollup 把 .png 当作 URL 字符串处理，而不是内联 base64
      include: /\.(png|jpg|jpeg|gif|svg|webp|ico)$/,
      // 输出到 dist/assets 目录
      destDir: path.resolve(__dirname, 'dist/assets'),
    }),
  ],
  format: ['esm', 'cjs'],
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
  },
  // 去掉 chunk 的 hash
  rollupOptions: {
    output: {
      exports: 'named',
      entryFileNames: '[name].[format].[ext]',
      chunkFileNames: '[name].[format].[ext]',
      assetFileNames: '[name].[ext]',
    },
  },
})
