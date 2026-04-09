
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { glob } from 'tinyglobby'
import { rolldown } from 'rolldown'
import {
  epRoot,
  excludeFiles,
  execCommand,
  pkgRoot,
} from '@rw-vue-framework/build-utils'
import { generateExternal, writeBundles } from '../utils'
import { RwFrameworkAlias } from '../plugins/rw-vue-framework-alias'
import { buildConfigEntries } from '../build-info'
import { SupplyValidator } from '../plugins/supply-validator'
import { SvgPlugin } from '../plugins/svg-plugin'
import { RemoveStyleImportsPlugin } from '../plugins/remove-style-imports'
import { PreprocessVuePlugin } from '../plugins/preprocess-vue'

import type { OutputOptions, Plugin } from 'rolldown'

const plugins: Plugin[] = [
  PreprocessVuePlugin(),
  RemoveStyleImportsPlugin() as Plugin,
  RwFrameworkAlias(),
  vue({
    isProduction: true,
    template: {
      compilerOptions: {
        hoistStatic: true,
      },
    },
  }) as Plugin,
  vueJsx() as Plugin,
  SvgPlugin(),
  SupplyValidator(),
]

async function buildModulesComponents() {
  const input = excludeFiles(
    await glob(['**/*.{js,ts,vue}', '!**/style/(index|css).{js,ts,vue}'], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  )
  const bundle = await rolldown({
    input,
    plugins,
    external: generateExternal({ full: false }),
    treeshake: { moduleSideEffects: false },
    moduleTypes: {
      '.css': 'js',
      '.scss': 'js',
      '.sass': 'js',
      '.less': 'js',
    },
  })

  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: epRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
      }
    })
  )
}

async function buildModulesStyles() {
  const input = excludeFiles(
    await glob('**/style/index.ts', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  )

  // 如果没有样式文件，跳过这个任务
  if (!input || input.length === 0) {
    console.log('No style files found, skipping buildModulesStyles')
    return
  }

  const bundle = await rolldown({
    input,
    plugins,
    treeshake: false,
    moduleTypes: {
      '.css': 'js',
      '.scss': 'js',
      '.sass': 'js',
      '.less': 'js',
    },
  })

  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: path.resolve(config.output.path, 'components'),
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: epRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`,
      }
    })
  )
}

export const buildModules = () =>
  Promise.all([
    execCommand(buildModulesComponents),
    execCommand(buildModulesStyles),
])



// import * as path from 'path'
// import { series } from 'gulp'
// import { rollup } from 'rollup'
// import VueMacros from 'unplugin-vue-macros/rollup'
// import { nodeResolve } from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs'
// import esbuild from 'rollup-plugin-esbuild'
// import postcss from 'rollup-plugin-postcss'
// import json from '@rollup/plugin-json'
// import * as fastGlob from 'fast-glob'
// import { epRoot, excludeFiles, pkgRoot } from '@rw-vue-framework/build-utils'
// import { generateExternal, withTaskName, writeBundles } from '../utils'
// import { RwFrameworkAlias } from '../plugins/rw-vue-framework-alias'
// import { buildConfigEntries, target } from '../build-info'
// import type { TaskFunction } from 'gulp'

// import type { OutputOptions, Plugin } from 'rollup'

// // 添加处理图片的插件
// import url from '@rollup/plugin-url'

// // 使用 require 动态加载模块
// const vue = require('@vitejs/plugin-vue').default;
// const vueJsx = require('@vitejs/plugin-vue-jsx').default;
// const sass = require('sass');

// const plugins: Plugin[] = [
//   RwFrameworkAlias(),
//   VueMacros({
//     setupComponent: false,
//     setupSFC: false,
//     plugins: {
//       vue: vue({
//         isProduction: true,
//         template: {
//           compilerOptions: {
//             hoistStatic: false,
//             cacheHandlers: false,
//           },
//         },
//         style: {
//           postcssPlugins: [] // 如果需要添加 PostCSS 插件
//         }
//       }),
//       vueJsx: vueJsx(),
//     },
//   }) as unknown as Plugin, // 添加类型断言
//   nodeResolve({
//     extensions: ['.mjs', '.js', '.json', '.ts'],
//     mainFields: ['browser', 'module', 'main']  // ← 关键！优先使用
//   }),
//   commonjs(),
//   json(),
//   // 添加处理图片文件的插件
//   url({
//     include: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
//     limit: 1024 * 1024 * 10, // 限制为1KB，小于该大小的图片将被转换为base64
//     emitFiles: false,
//     // publicPath: './assets/', // 使用相对路径
//     // destDir: path.resolve(__dirname, '../../../../dist/rw-vue-framework/assets/') // 指向最终输出目录
//   }),
//   postcss({
//     extensions: ['.css', '.scss', '.sass', '.less'],
//     extract: false,
//     minimize: false,
//     use: {
//       sass: sass, // 确保使用现代 API
//       stylus: null,
//       less: null
//     }
//   }),
//   esbuild({
//     sourceMap: true,
//     target,
//     loaders: {
//       '.vue': 'ts',
//     },
//   }),
// ]

// async function buildModulesComponents() {
//   const input = excludeFiles(
//     await fastGlob.default(['**/*.{js,ts,vue}', '!**/style/(index|css).{js,ts,vue}'], {
//       cwd: pkgRoot,
//       absolute: true,
//       onlyFiles: true,
//     })
//   )
//   const bundle = await rollup({
//     input,
//     plugins,
//     external: await generateExternal({ full: false }),
//     treeshake: { moduleSideEffects: false },
//   })

//   await writeBundles(
//     bundle,
//     buildConfigEntries.map(([module, config]): OutputOptions => {
//       return {
//         format: config.format,
//         dir: config.output.path,
//         exports: module === 'cjs' ? 'named' : undefined,
//         preserveModules: true,
//         preserveModulesRoot: epRoot,
//         sourcemap: true,
//         entryFileNames: `[name].${config.ext}`,
//       }
//     })
//   )
// }

// async function buildModulesStyles() {
//   const input = excludeFiles(
//     await fastGlob.default('**/style/index.ts', {
//       cwd: pkgRoot,
//       absolute: true,
//       onlyFiles: true,
//     })
//   )
//   if (input.length === 0) {
//     console.log('No style files found, skipping buildModulesStyles')
//     return
//   }
//   const bundle = await rollup({
//     input,
//     plugins: [nodeResolve(), postcss({
//       extract: true,
//       use: {
//         sass: sass, // 确保使用现代 API
//         stylus: null,
//         less: null
//       }
//     })],
//     external: await generateExternal({ full: false }),
//   })
//   await writeBundles(
//     bundle,
//     buildConfigEntries.map(([module, config]): OutputOptions => {
//       return {
//         format: config.format,
//         dir: path.resolve(config.output.path, 'style'),
//         exports: module === 'cjs' ? 'named' : undefined,
//         preserveModules: true,
//         preserveModulesRoot: pkgRoot,
//         sourcemap: true,
//         entryFileNames: `[name].${config.ext}`,
//       }
//     })
//   )
// }

// export const buildModules: TaskFunction = series(
//   withTaskName('buildModulesComponents', buildModulesComponents),
//   withTaskName('buildModulesStyles', buildModulesStyles)
// )
