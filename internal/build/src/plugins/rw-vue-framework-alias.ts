import { PKG_NAME, PKG_PREFIX } from '@rw-vue-framework/build-constants'

import type { Plugin } from 'rolldown'

export function RwFrameworkAlias(): Plugin {
  const themeChalk = 'theme-chalk'
  const sourceThemeChalk = `${PKG_PREFIX}/${themeChalk}` as const
  const bundleThemeChalk = `${PKG_NAME}/${themeChalk}` as const

  return {
    name: 'element-plus-alias-plugin',
    resolveId: {
      filter: {
        id: /^@element-plus\/theme-chalk/,
      },
      handler(id) {
        return {
          id: id.replaceAll(sourceThemeChalk, bundleThemeChalk),
          external: 'absolute',
        }
      },
    },
  }
}
