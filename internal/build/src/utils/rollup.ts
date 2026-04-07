import { epPackage, getPackageDependencies } from '@rw-vue-framework/build-utils'

import type { OutputOptions, RollupBuild } from 'rollup'

export const generateExternal = async (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getPackageDependencies(epPackage)

  // Node.js 内置模块列表
  const nodeBuiltins = [
    'assert', 'buffer', 'child_process', 'cluster', 'console', 'constants',
    'crypto', 'dgram', 'dns', 'domain', 'events', 'fs', 'http', 'https',
    'module', 'net', 'os', 'path', 'perf_hooks', 'process', 'punycode',
    'querystring', 'readline', 'repl', 'stream', 'string_decoder', 'sys',
    'timers', 'tls', 'tty', 'url', 'util', 'v8', 'vm', 'wasi', 'worker_threads', 'zlib'
  ]

  // 需要排除的 Node.js 专用包
  const nodeOnlyPackages = [
    'form-data', 'combined-stream', 'delayed-stream'
  ]

  return (id: string) => {
    const packages: string[] = [...peerDependencies]
    if (!options.full) {
      packages.push('@vue', ...dependencies)
    }

    // 检查是否是 Node.js 内置模块
    const isNodeBuiltin = nodeBuiltins.some(
      (builtin) => id === builtin || id.startsWith(`${builtin}/`)
    )

    // 检查是否是 Node.js 专用包
    const isNodeOnlyPackage = nodeOnlyPackages.some(
      (pkg) => id === pkg || id.startsWith(`${pkg}/`)
    )

    // 检查是否是 npm 包
    const isNpmPackage = [...new Set(packages)].some(
      (pkg) => id === pkg || id.startsWith(`${pkg}/`)
    )

    return isNodeBuiltin || isNodeOnlyPackage || isNpmPackage
  }
}

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

export function formatBundleFilename(
  name: string,
  minify: boolean,
  ext: string
) {
  return `${name}${minify ? '.min' : ''}.${ext}`
}
