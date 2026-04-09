import { defineConfig } from 'vitepress'
import {nav} from "./nav.mjs"
// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh",
  base: '/',
  srcDir: 'src',
  cleanUrls: true,
  title: "rw-vue-framework",
  description: "rw-vue-framework  是使用基于Element plus 的快速开发框架",
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

    sidebar:
      {
        "/guide/":[{
        text: '指南',
        items: [
          { text: '什么是 rw-vue-framework', link: '/guide/' },
          { text: '快速开始', link: '/guide/quickStart.md' },
          { text: '自带国际化', link: '/guide/locale.md' },
          { text: '项目约束', link: '/guide/constraint.md' },

        ]
        }],
        "/components/":[{
          text: '组件',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
        }],
        "/demos/":[{
          text: '示例',
          items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
          ]
       }],
      }
    ,

    socialLinks: [
      { icon: 'github', link: '#' }
    ],
    footer: {
      copyright: 'Copyright © 2026'
    }
  }
})
