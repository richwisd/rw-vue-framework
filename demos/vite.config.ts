import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

const frameworkNodeModules = path.resolve(import.meta.dirname, '../rw-vue-framework/node_modules')

/**
 * 自定义 Vite 插件：将 element-plus / @element-plus/icons-vue / pinia 的
 * 所有子路径导入重定向到 rw-vue-framework 的 node_modules。
 *
 * 原因：demos 项目通过 pnpm workspace 引用 rw-vue-framework，
 * element-plus 等依赖只安装在 rw-vue-framework/node_modules 中。
 * 用 resolve.alias 对子路径（如 element-plus/dist/index.css）支持不佳，
 * 改用此插件直接按文件系统路径解析，并自动补全扩展名。
 */
function resolveFrameworkDeps() {
  const packages = ['element-plus', '@element-plus/icons-vue', 'pinia']

  function tryResolve(baseDir: string, rest: string): string | null {
    const candidates = [
      path.resolve(baseDir, rest),
      path.resolve(baseDir, rest + '.mjs'),
      path.resolve(baseDir, rest + '.js'),
      path.resolve(baseDir, rest + '.ts'),
      path.resolve(baseDir, rest + '.css'),
      path.resolve(baseDir, rest + '/index.mjs'),
      path.resolve(baseDir, rest + '/index.js'),
      path.resolve(baseDir, rest + '/index.ts'),
      path.resolve(baseDir, rest + '/index.css'),
    ]
    for (const c of candidates) {
      if (fs.existsSync(c)) return c
    }
    return null
  }

  return {
    name: 'resolve-framework-deps',
    enforce: 'pre' as const,
    async resolveId(source: string) {
      // @ 别名
      if (source.startsWith('@/')) {
        return path.resolve(import.meta.dirname, 'src' + source.slice(1))
      }

      for (const pkg of packages) {
        if (source === pkg || source.startsWith(pkg + '/')) {
          let rest = source.slice(pkg.length)
          if (rest.startsWith('/')) rest = rest.slice(1)
          const baseDir = path.resolve(frameworkNodeModules, pkg)
          if (!rest) {
            // 精确匹配包名，返回包目录（让 Vite 解析 package.json）
            return baseDir
          }
          const resolved = tryResolve(baseDir, rest)
          if (resolved) return resolved
          // 回退：返回裸路径
          return path.resolve(baseDir, rest)
        }
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    resolveFrameworkDeps(),
  ],
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
    ],
  },
  resolve: {
    dedupe: ['vue', 'pinia'],
    alias: [
      {
        find: '@',
        replacement: path.resolve('./src')
      },
    ]
  }
})
