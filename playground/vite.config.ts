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
      'lodash-es',
      '@vueuse/core',
      'rw-vue-framework/element-plus',
      'rw-vue-framework/pinia',
      'rw-vue-framework/locale',
      'rw-vue-framework/stores',
      'rw-vue-framework/controls',
    ],
    force: true
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
  resolve: {
    dedupe: ['vue'],
    // alias:{
    //   '@': path.resolve('./src'),
    //   'zlib': path.resolve('./src/zlib.js'),
    //   'pinia': path.resolve('./node_modules/pinia/dist/pinia.mjs'),
    //   '/(?:\.\.\/)+node_modules\/\.pnpm\/pinia@[^\/]+\/node_modules\/pinia\/dist\/pinia\.(?:mjs|js)$/':
    //   path.resolve('./node_modules/pinia/dist/pinia.mjs')
    // }，
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
