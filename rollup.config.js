import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  plugins: [
    nodeResolve({
      preferBuiltins: true,
      mainFields: ['module', 'main'],
    }),
    commonjs(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
      'typeof process': JSON.stringify('undefined')
    })
  ],
  external: [
    'util',
    'stream',
    'path',
    'http',
    'https',
    'url',
    'fs',
    'crypto',
    'assert',
    'tty',
    'os',
    'zlib',
    'events',
    'follow-redirects',
    'http2',
    "process",
    "pinia",
    "pinia-plugin-persistedstate",
  ],
}
