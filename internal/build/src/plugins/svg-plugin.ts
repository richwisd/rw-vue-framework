import type { Plugin } from 'rolldown'

export function SvgPlugin(): Plugin {
  return {
    name: 'svg-plugin',
    resolveId: {
      filter: {
        id: /\.svg$/,
      },
      handler(id) {
        return {
          id,
          external: 'absolute',
        }
      },
    },
    load(id) {
      if (id.endsWith('.svg')) {
        // 返回一个导出 SVG URL 的模块
        return {
          code: 'export default "";',
          map: null,
        }
      }
    },
  }
}
