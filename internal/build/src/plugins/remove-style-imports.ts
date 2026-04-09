import type { Plugin } from 'rolldown'

export function RemoveStyleImportsPlugin(): Plugin {
  return {
    name: 'remove-style-imports',
    resolveId(id) {
      // 完全排除样式块 ID
      if (typeof id === 'string' && id.includes('?vue&type=style')) {
        return {
          id: id,
          external: true, // 标记为外部模块，这样 rolldown 就不会尝试打包它
        }
      }
    },
    transform(code, id) {
      // 额外的安全措施：如果 transform 得到一个样式块，返回空代码
      if (id.includes('?vue&type=style')) {
        return {
          code: '// style removed',
          map: null,
        }
      }

      // 对于其他文件，移除所有对样式块的导入
      if (code && code.includes('?vue&type=style')) {
        const styleImportRegex = /import\s+[^;]*from\s+['\"][^'\"]*\?vue&type=style[^'\"]*['\"];?\n?/g
        const newCode = code.replace(styleImportRegex, '/* style import removed */')
        if (newCode !== code) {
          return {
            code: newCode,
            map: null,
          }
        }
      }

      return null
    },
  }
}
