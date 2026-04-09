import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    nodePolyfills({
      include: ["url", "path", "stream", "util", "process"],
      exclude: ["zlib"]
    }),
  ],
  define: {
    "process.env": {},
  },
  server: {
    fs: {
      allow: ['..']
    },
    watch: {
      ignored: ['**/node_modules/**', '**/.git/**']
    }
  },
  optimizeDeps: {
    include: [
      'vue',
      'element-plus',
      'lodash-es',
      '@vueuse/core',
      'pinia',
      'pinia-plugin-persistedstate'
    ],
    force: true
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
  resolve: {
    dedupe: ['vue', 'element-plus'],
    alias: [
      {
        find: '@',
        replacement: path.resolve('./src')
      },
      {
        find: 'zlib',
        replacement: path.resolve('./src/zlib.js')
      },
    ]
  }
})
