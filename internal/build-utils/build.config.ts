import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  declaration: true,
  externals: [
    // Avoid bundling type-only package which has only .d.ts exports
    '@pnpm/types',
    // Keep workspace package external as well
    '@pnpm/find-workspace-packages',
  ],
  rollup: {
    emitCJS: true,
  },
})
