import { epPackage, getPackageDependencies } from '@rw-vue-framework/build-utils'

import type { OutputOptions, RolldownBuild } from 'rolldown'

export const generateExternal = (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getPackageDependencies(epPackage)

  return (id: string) => {
    // 排除样式块
    if (id.includes('?vue&type=style')) {
      return true
    }

    // 排除 CSS 文件
    if (id.endsWith('.css')) {
      return true
    }

    const packages: string[] = [...peerDependencies]
    if (!options.full) {
      packages.push('@vue', ...dependencies)
    }

    return [...new Set(packages)].some(
      (pkg) => id === pkg || id.startsWith(`${pkg}/`)
    )
  }
}

export function writeBundles(bundle: RolldownBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

export function formatBundleFilename(
  name: string,
  minify: boolean,
  ext: string
) {
  return `${name}${minify ? '.min' : ''}.${ext}`
}
