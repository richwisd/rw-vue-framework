import { defineConfig } from 'vitepress'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { nav } from './nav.mts'
import { sidebar } from './sidebar.mts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
        // 允许 VitePress 读取项目根目录下的 playground 文件
        allow: [path.resolve(__dirname, '../..')]
      }
    },
    resolve: {
      // 关键：去重 vue / element-plus，避免框架源码与 VitePress 加载两份实例
      // 否则框架组件模板中的 resolveComponent('ElInput') 等会找不到全局注册的组件
      dedupe: ['vue', 'element-plus'],
      alias: {
        // playground demo 中可能使用 @/ 别名
        '@': path.resolve(__dirname, '../../playground/src')
      }
    }
  }
})
