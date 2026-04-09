import type { Plugin } from 'rolldown'

export function StyleBlockPlugin(): Plugin {
  return {
    name: 'style-block-plugin',
    // 只在 load 阶段处理已知的样式块 ID
    load(id) {
      // 如果这是一个样式块文件的请求，返回空模块
      if (id.includes('?vue&type=style')) {
        return {
          code: '// style block removed',
          map: null,
        }
      }
    },
  }
}
