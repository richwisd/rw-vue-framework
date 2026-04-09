import { epPackage, getPackageDependencies } from '@rw-vue-framework/build-utils'

import type { OutputOptions, RolldownBuild } from 'rolldown'

export const generateExternal = (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getPackageDependencies(epPackage)

  // Node.js 内置模块列表
  const nodeBuiltins = [
    'assert', 'buffer', 'child_process', 'cluster', 'console', 'constants',
    'crypto', 'dgram', 'dns', 'domain', 'events', 'fs', 'http', 'https',
    'module', 'net', 'os', 'path', 'perf_hooks', 'process', 'punycode',
    'querystring', 'readline', 'repl', 'stream', 'string_decoder', 'sys',
    'timers', 'tls', 'tty', 'url', 'util', 'v8', 'vm', 'wasi', 'worker_threads', 'zlib'
  ]

  return (id: string) => {
    // 排除样式块
    if (id.includes('?vue&type=style')) {
      return true
    }

    // 排除 CSS 文件
    if (id.endsWith('.css')) {
      return true
    }

    // 排除 Node.js 内置模块
    if (nodeBuiltins.includes(id)) {
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
