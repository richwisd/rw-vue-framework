
import path from 'path'
import { glob } from 'tinyglobby'
import {
  buildOutput,
  epPackage,
  epRoot,
  excludeFiles,
  getPackageDependencies,
  pkgRoot,
  projRoot,
} from '@rw-vue-framework/build-utils'
import { build } from 'rolldown'
import { dts } from 'rolldown-plugin-dts'
import { target } from '../build-info'

import type { BuildOptions } from 'rolldown'

const tsconfig = path.resolve(projRoot, 'tsconfig.web.json')
const epDeps = getPackageDependencies(epPackage)
const pkgExternal = Object.values(epDeps).flat()
const external = [/^@vue/, /^vue/, /^csstype/, ...pkgExternal]

export async function generateTypesDefinitions() {
  const input = excludeFiles(
    await glob(['**/index.ts', 'locale/lang/*.ts', '!**/style/index.ts'], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  )
  const options: BuildOptions = {
    input,
    external,
    tsconfig,
    transform: {
      target,
    },
    plugins: dts({
      parallel: true,
      tsconfig,
      eager: true,
      vue: true,
      emitDtsOnly: true,
      compilerOptions: {
        emitDeclarationOnly: true,
        declaration: true,
      },
    }),
    output: {
      preserveModules: true,
      preserveModulesRoot: epRoot,
      dir: path.resolve(buildOutput, 'types'),
    },
  }

  return build(options)
}




// import path from 'path'
// import { readFile, writeFile } from 'fs/promises'
// import glob from 'fast-glob'
// import { copy, emptyDir, remove } from 'fs-extra'
// import { buildOutput } from '@rw-vue-framework/build-utils'
// import { pathRewriter, run } from '../utils'

// export const generateTypesDefinitions = async () => {
//   await run(
//     'npx vue-tsc -p tsconfig.web.json --declaration --emitDeclarationOnly --declarationDir dist/types'
//   )
//   const typesDir = path.join(buildOutput, 'types', 'packages')
//   const filePaths = await glob(`**/*.d.ts`, {
//     cwd: typesDir,
//     absolute: true,
//   })
//   const rewriteTasks = filePaths.map(async (filePath) => {
//     const content = await readFile(filePath, 'utf8')
//     await writeFile(filePath, pathRewriter('esm')(content), 'utf8')
//   })
//   await Promise.all(rewriteTasks)
//   const sourceDir = path.join(typesDir, 'rw-vue-framework')
//   await copy(sourceDir, typesDir)
//   await emptyDir(sourceDir)
//   await remove(sourceDir)
// }
