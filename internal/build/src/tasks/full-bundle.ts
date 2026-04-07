import * as path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { rollup } from 'rollup'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import VueMacros from 'unplugin-vue-macros/rollup'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import postcss from 'rollup-plugin-postcss'
import json from '@rollup/plugin-json'
import url from '@rollup/plugin-url'
import { parallel } from 'gulp'
import * as fastGlob from 'fast-glob'
import { camelCase, upperFirst } from 'lodash-unified'
import {
  PKG_BRAND_NAME,
  PKG_CAMELCASE_LOCAL_NAME,
  PKG_CAMELCASE_NAME,
} from '@rw-vue-framework/build-constants'
import { epOutput, epRoot, localeRoot } from '@rw-vue-framework/build-utils'
import { version } from '../../../../packages/rw-vue-framework/version'
import { RwFrameworkAlias } from '../plugins/rw-vue-framework-alias'
import {
  formatBundleFilename,
  generateExternal,
  withTaskName,
  writeBundles,
} from '../utils'
import { target } from '../build-info'
import type { TaskFunction } from 'gulp'
import type { Plugin } from 'rollup'

// 使用 require 动态加载模块
const vue = require('@vitejs/plugin-vue').default;
const vueJsx = require('@vitejs/plugin-vue-jsx').default;
const polyfillNode = require('rollup-plugin-polyfill-node');

const banner = `/*! ${PKG_BRAND_NAME} v${version} */\n` +
  `var process = typeof process !== 'undefined' ? process : { env: { NODE_ENV: 'production' } };\n` +
  `if (typeof zlib !== 'undefined') { zlib.constants = zlib.constants || { Z_SYNC_FLUSH: 2, Z_FINISH: 4, Z_NO_FLUSH: 0, Z_FULL_FLUSH: 3 }; }\n`

async function buildFullEntry(minify: boolean) {
  const plugins: Plugin[] = [
    RwFrameworkAlias(),
    VueMacros({
      setupComponent: false,
      setupSFC: false,
      plugins: {
        vue: vue({
          isProduction: true,
          template: {
            compilerOptions: {
              hoistStatic: false,
              cacheHandlers: false,
            },
          },
        }),
        vueJsx: vueJsx(),
      },
    }) as unknown as Plugin, // 添加类型断言
    polyfillNode({
      include: ['util', 'process', 'zlib']
    }),
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts'],
      mainFields: ['browser', 'module', 'main']  // ← 关键！优先使用 browser 字段
    }),
    url({
      include: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp'],
      limit: 1024 * 1024 * 10, // 总是复制文件而不是内联为 data URL
      emitFiles: false,
      // publicPath: './assets/', // 使用相对路径
      // destDir: path.resolve(__dirname, '../../../../dist/rw-vue-framework/assets/') // 指向最终输出目录
    }),
    commonjs(),
    json(),
    postcss({
      extensions: ['.css', '.scss', '.sass', '.less'],
      extract: false,
      minimize: minify,
      use: {
        sass: null,
        stylus: null,
        less: null
      }
    }),
    esbuild({
      exclude: [],
      sourceMap: minify,
      target,
      loaders: {
        '.vue': 'ts',
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env': JSON.stringify({}),
        'process': JSON.stringify({ env: { NODE_ENV: 'production' } }),
      },
      treeShaking: true,
      legalComments: 'eof',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ]
  if (minify) {
    plugins.push(
      minifyPlugin({
        target,
        sourceMap: true,
      })
    )
  }

  const bundle = await rollup({
    input: path.resolve(epRoot, 'index.ts'),
    plugins,
    external: await generateExternal({ full: true }),
    treeshake: true,
  })
  await writeBundles(bundle, [
    {
      format: 'umd',
      file: path.resolve(
        epOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'js')
      ),
      exports: 'named',
      name: PKG_CAMELCASE_NAME,
      globals: {
        vue: 'Vue',
        util: 'util',
        stream: 'stream',
        path: 'path',
        http: 'http',
        https: 'https',
        url: 'url',
        fs: 'fs',
        crypto: 'crypto',
        assert: 'assert',
        tty: 'tty',
        os: 'os',
        zlib: 'zlib',
        events: 'events',
        'follow-redirects': 'follow-redirects',
        'http2': 'http2',
        'process': 'process',
      },
      sourcemap: minify,
      banner,
    },
    {
      format: 'esm',
      file: path.resolve(
        epOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'mjs')
      ),
      sourcemap: minify,
      banner,
    },
  ])
}

async function buildFullLocale(minify: boolean) {
  const files = await fastGlob.default(`**/*.ts`, {
    cwd: path.resolve(localeRoot, 'lang'),
    absolute: true,
  })
  return Promise.all(
    files.map(async (file) => {
      const filename = path.basename(file, '.ts')
      const name = upperFirst(camelCase(filename))
      const bundle = await rollup({
        input: file,
        plugins: [
          polyfillNode({
            include: ['util', 'process', 'zlib']
          }),
          nodeResolve({
            extensions: ['.mjs', '.js', '.json', '.ts'],
            mainFields: ['browser', 'module', 'main']  // ← 关键！优先使用 browser 字段
          }),
          url({
            include: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp'],
            limit: 1024 * 1024 * 10, // 总是复制文件而不是内联为 data URL
            emitFiles: false,
            // publicPath: './assets/', // 使用相对路径
            // destDir: path.resolve(__dirname, '../../../../dist/rw-vue-framework/assets/') // 指向最终输出目录
          }),
          commonjs(),
          esbuild({
            minify,
            target,
            sourceMap: minify,
            define: {
              'process.env.NODE_ENV': JSON.stringify('production'),
              'process.env': JSON.stringify({}),
              'process': JSON.stringify({ env: { NODE_ENV: 'production' } }),
            },
          }),
          replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
          }),
        ],
        external: await generateExternal({ full: true }),
        treeshake: true,
      })
      await writeBundles(bundle, [
        {
          format: 'umd',
          file: path.resolve(
            epOutput,
            'dist',
            formatBundleFilename(`locale.${filename}`, minify, 'js')
          ),
          exports: 'default',
          name: `${PKG_CAMELCASE_NAME}.${name}`,
          sourcemap: minify,
          banner,
        },
        {
          format: 'esm',
          file: path.resolve(
            epOutput,
            'dist',
            formatBundleFilename(`locale.${filename}`, minify, 'mjs')
          ),
          sourcemap: minify,
          banner,
        },
      ])
    })
  )
}

export const buildFullBundle: TaskFunction = parallel(
  () => buildFullEntry(false),
  () => buildFullEntry(true),
  () => buildFullLocale(false),
  () => buildFullLocale(true)
)
