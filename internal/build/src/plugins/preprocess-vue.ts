import type { Plugin } from 'rolldown'

export function PreprocessVuePlugin(): Plugin {
  return {
    name: 'preprocess-vue',
    async transform(code, id) {
      // 只处理 .vue 文件
      if (id.endsWith('.vue')) {
        // 这是一个简单的处理 - 移除样式块标签
        // 注意：这是一个非常基础的处理，可能不适合所有情况
        let result = code

        // 移除 <style> 标签及其内容
        result = result.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '')

        if (result !== code) {
          return {
            code: result,
            map: null,
          }
        }
      }
      return null
    },
  }
}
