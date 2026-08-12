import { defineConfig } from 'vitepress'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { nav } from './nav.mts'
import { sidebar } from './sidebar.mts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const frameworkRoot = path.resolve(__dirname, '../../../rw-vue-framework')

// 将 rw-vue-framework 的子路径解析重定向到 dist 或 src
const frameworkSubPaths: Record<string, string> = {
  'rw-vue-framework': path.resolve(frameworkRoot, 'src/index.ts'),
  'rw-vue-framework/stores': path.resolve(frameworkRoot, 'src/packages/stores/index.ts'),
  'rw-vue-framework/locale': path.resolve(frameworkRoot, 'src/packages/locale/index.ts'),
  'rw-vue-framework/element-plus': path.resolve(frameworkRoot, 'src/element-plus.ts'),
  'rw-vue-framework/icons': path.resolve(frameworkRoot, 'src/packages/icons/index.ts'),
  'rw-vue-framework/style.css': path.resolve(frameworkRoot, 'src/style.css'),
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh',
  base: '/',
  srcDir: 'src',
  cleanUrls: true,
  title: 'rw-vue-framework',
  description: 'rw-vue-framework 是基于 Element Plus 的 Vue3 快速开发框架',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },
    nav,
    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://gitee.com/richwisd/rw-vue-framework' }
    ],
    footer: {
      copyright: 'Copyright © 2025 richwisd'
    }
  },

  vite: {
    server: {
      fs: {
        allow: [path.resolve(__dirname, '../../..')]
      }
    },
    resolve: {
      dedupe: ['vue', 'element-plus', 'pinia']
    },
    ssr: {
      // 将框架模块内部化，确保 theme/index.ts 中的 ssr-polyfill 在所有框架代码之前执行
      noExternal: ['rw-vue-framework', 'element-plus', '@element-plus/icons-vue', 'pinia', 'pinia-plugin-persistedstate']
    },
    plugins: [
      // 自定义插件：处理所有框架内部模块的路径解析
      {
        name: 'resolve-framework-modules',
        async resolveId(source: string) {
          // rw-vue-framework 子路径
          if (source in frameworkSubPaths) {
            return frameworkSubPaths[source]
          }
          // 需要解析的包前缀
          const packages = ['element-plus', '@element-plus/icons-vue', 'pinia']
          for (const pkg of packages) {
            if (source === pkg || source.startsWith(pkg + '/')) {
              let rest = source.slice(pkg.length)
              // 去掉开头的 "/"，否则 path.resolve 会把它当作绝对路径
              if (rest.startsWith('/')) rest = rest.slice(1)
              const baseDir = path.resolve(frameworkRoot, 'node_modules/' + pkg)
              // 如果 rest 为空，直接返回包目录（交给 Vite 解析 package.json）
              if (!rest) return baseDir
              // 尝试直接拼接带扩展名的路径
              const candidates = [
                path.resolve(baseDir, rest),
                path.resolve(baseDir, rest + '.mjs'),
                path.resolve(baseDir, rest + '.js'),
                path.resolve(baseDir, rest + '.ts'),
                path.resolve(baseDir, rest + '/index.mjs'),
                path.resolve(baseDir, rest + '/index.js'),
                path.resolve(baseDir, rest + '/index.ts'),
                path.resolve(baseDir, rest + '/index.css'),
                path.resolve(baseDir, rest + '.css'),
              ]
              for (const candidate of candidates) {
                if (fs.existsSync(candidate)) {
                  return candidate
                }
              }
              // 回退：返回裸路径让 Vite 继续尝试
              return path.resolve(baseDir, rest)
            }
          }
          // @ 别名
          if (source.startsWith('@/')) {
            return path.resolve(__dirname, '../../../demos/src' + source.slice(1))
          }
        }
      }
    ]
  }
})
