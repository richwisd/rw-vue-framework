# Monorepo 结构改造方案

## Context（背景）

当前项目根目录身兼二职：既是 pnpm workspace root，又是库项目本身（src/）。这导致：

1. **根 package.json 职责混淆**——库发布字段（name/exports/files）与 workspace 管理职责混杂
2. **工具链碎片化**——根项目用 vite 8 + ts 6，playground 用 vite 6 + ts 5.7，docs 用 vitepress 1.x（vite 5），三个项目版本不一致
3. **esbuild 被拖入**——playground 的 vite 6 和 docs 的 vitepress 各自硬依赖 esbuild，与库的打包链路（tsdown/rolldown）无关却污染了依赖树
4. **pnpm-workspace.yaml 配置损坏**——`allowBuilds` 字段值还是占位符 `"set this to true or false"`，旧的废弃字段 `onlyBuiltDependencies` 仍在

目标：把库源码移到 `packages/core/`，根目录纯 workspace 管理，三个项目（packages/core、playground、docs）结构平等。本次只做**结构迁移**，工具链版本统一和 pnpm catalog 留作后续阶段。

## 目标结构

```
rw-vue-framework/                    ← 纯 workspace root (private: true)
├── packages/
│   └── core/                        ← 库项目 (name: rw-vue-framework)
│       ├── src/                     ← 原 src/ 原样移入
│       ├── tsconfig.json            ← 原根 tsconfig.json
│       ├── tsdown.config.ts         ← 原根 tsdown.config.ts（不改内容）
│       └── package.json             ← 新建（从原根 package.json 拆出）
├── playground/                      ← 不移动，不改结构
├── docs/                            ← 不移动，微调 tsconfig.json + package.json
├── .vscode/settings.json            ← 更新 i18n-ally 路径
├── .gitignore                       ← 补充条目
├── package.json                     ← 重写为 workspace root
├── pnpm-workspace.yaml              ← 更新
├── vite.config.ts                   ← 留根目录（vitest 用），不改
├── tsconfig.json                    ← 新建（简单占位）
└── pnpm-lock.yaml                   ← 删除后重新生成
```

## 实施步骤

### 步骤 1：创建 packages/core 并移动文件

移动以下文件/目录到 `packages/core/`：
- `src/` → `packages/core/src/`（含 env.d.ts、index.ts、element-plus.ts、pinia.ts、vue-i18n.ts、packages/ 子目录）
- `tsconfig.json` → `packages/core/tsconfig.json`
- `tsdown.config.ts` → `packages/core/tsdown.config.ts`

**不需要改内容**：tsdown.config.ts 的 entry（`./src/...`）和 destDir（`path.resolve(__dirname, 'dist/assets')`）都基于 `__dirname` 相对解析，移动后自动指向 packages/core 下的路径。tsconfig.json 的 `include: ["src"]`、`declarationDir: "./dist"` 同理。

**不要移动**：`vite.config.ts`（留根目录给 vitest 用）、`dist/`（旧产物，重新构建）。

### 步骤 2：创建 packages/core/package.json

从原根 package.json 拆出库相关字段。完整保留 exports（14 个子路径）、dependencies（17 个包）、peerDependencies。

关键 devDependencies（不能遗漏）：
- `@vitejs/plugin-vue` — tsdown.config.ts 第 2 行直接 import
- `vue-tsc` — `dts: { vue: true }` 调用它生成 .d.ts
- `typescript` — dts 生成需要
- `@types/node` — tsdown.config.ts 用 path/url，tsconfig 有 `types: ["node"]`
- `bumpp` — release 脚本需要
- `vue` — peer dep + dts 生成需要
- `@rollup/plugin-url`、`@tsdown/css`、`@types/crypto-js`、`@types/js-cookie`、`sass` — 构建需要

scripts: `build`、`dev`、`typecheck`、`release`、`prepublishOnly`。

### 步骤 3：重写根 package.json

```jsonc
{
  "name": "rw-vue-framework-monorepo",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "pnpm -r build",
    "build:core": "pnpm --filter rw-vue-framework build",
    "dev": "pnpm --filter rw-vue-framework dev",
    "play": "pnpm --filter @rw-vue-framework/play dev",
    "docs": "pnpm --filter @rw-vue-framework/docs dev",
    "test": "vitest",
    "typecheck": "pnpm --filter rw-vue-framework typecheck",
    "release": "pnpm --filter rw-vue-framework release"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.7",
    "@vitest/browser-playwright": "^4.1.9",
    "@types/node": "^26.1.0",
    "playwright": "^1.61.1",
    "typescript": "^6.0.3",
    "vite": "^8.1.3",
    "vitest": "^4.1.9",
    "vue": "^3.5.39"
  },
  "engines": { "node": ">=22.0.0" },
  "packageManager": "pnpm@11.9.0"
}
```

说明：
- `build`/`typecheck` 用 `pnpm -r`（拓扑顺序全量执行）
- `dev`/`play`/`docs`/`release` 用 `--filter`（精确指定单个包）
- 根 devDeps 只留 vitest/playwright/vite/typescript 等共享 dev 工具

### 步骤 4：更新 pnpm-workspace.yaml

```yaml
packages:
  - 'packages/*'
  - 'playground'
  - 'docs'

allowBuilds:
  '@parcel/watcher': true
  esbuild: true
  vue-demi: true
```

关键纠正（pnpm 11 官方确认）：
- `allowBuilds` 是 pnpm v11 的**正确**字段（包名→布尔值映射）
- `onlyBuiltDependencies` 在 v11 中**已被移除**，必须删除
- 把占位符 `"set this to true or false"` 改成 `true`

### 步骤 5：更新 docs 配置

**docs/package.json**：删除第 6-9 行错误的 `onlyBuiltDependencies` 字段（这是 workspace 级配置，不应出现在子包）。

**docs/tsconfig.json**：更新 paths 指向新库位置：
```jsonc
"paths": {
  "rw-vue-framework": ["../packages/core"],
  "rw-vue-framework/*": ["../packages/core/*"]
}
```
原 `["../"]` 指向根目录（旧库位置），迁移后库在 `packages/core/`。

### 步骤 6：更新 .vscode/settings.json

i18n-ally 路径前缀 `src/packages/` → `packages/core/src/packages/`：
```jsonc
{
  "i18n-ally.localesPaths": [
    "playground/src/langs",
    "packages/core/src/packages/locale",
    "packages/core/src/packages/locale/langs",
    "packages/core/src/packages/pages/appConfig/langs",
    "packages/core/src/packages/pages/localSetting/langs"
  ]
}
```

### 步骤 7：新建根 tsconfig.json（简单占位）

原 tsconfig.json 已移到 packages/core/，根目录新建一个简单的：
```jsonc
{
  "files": [],
  "include": []
}
```
不使用 project references（composite），避免与 `noUnusedLocals` 等选项冲突。各子包用自己的 tsconfig。

### 步骤 8：更新 .gitignore

补充 monorepo 相关条目：
```
node_modules
dist
*.log
.DS_Store
.tsbuildinfo
*.tsbuildinfo
coverage
docs/.vitepress/cache
docs/.vitepress/dist
```
现有 `node_modules`/`dist` 已递归匹配，新增条目是补充保护。

### 步骤 9：删除 lock 并重新安装

```bash
# 删除 lock 和所有 node_modules
Remove-Item -Force pnpm-lock.yaml
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force packages/core/node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force playground/node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force docs/node_modules -ErrorAction SilentlyContinue
# 删除旧 dist
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
# 重新安装
pnpm install
```

必须删除 lock：拓扑结构根本性变化（根从库变为 workspace root、新增 packages/core 包），增量更新可能残留幽灵依赖。

## 不需要修改的文件（确认清单）

- `packages/core/tsdown.config.ts` — 路径全基于 `__dirname`，自动适配
- `packages/core/tsconfig.json` — `include: ["src"]` 相对路径，自动适配
- `packages/core/src/` 下所有源码 — 无外部相对路径引用
- `playground/package.json` — `rw-vue-framework: workspace:*` 自动解析到 packages/core
- `playground/vite.config.ts` — alias 和 optimizeDeps 不变
- `playground/src/` 下所有文件 — `rw-vue-framework/*` 导入不变
- `docs/.vitepress/config/index.mts` — `__dirname` 相对路径不变
- `docs/.vitepress/theme/index.ts` — `rw-vue-framework/*` 通过 workspace 解析
- `docs/src/` 下所有 .md/.vue — 引用 playground 的相对路径不变
- `vite.config.ts`（根）— `root: './playground'` 不变

## 验证步骤

按以下顺序验证：

1. **安装**：`pnpm install` 无错误，无 `[ERR_PNPM_IGNORED_BUILDS]`
2. **构建库**：`pnpm build:core` — 检查 `packages/core/dist/` 生成完整（index.js、style.css、assets/、各子入口 .d.ts）
3. **类型检查**：`pnpm typecheck` — 无错误
4. **启动 playground**：`pnpm play` — 浏览器能打开，页面正常，`rw-vue-framework/*` 导入解析正确
5. **启动 docs**：`pnpm docs` — VitePress 启动，demo 组件渲染正常，playground 示例引入正常
6. **测试**：`pnpm test` — vitest 正常运行

## 不在本次范围内（后续阶段）

- **工具链版本统一**：playground 的 vite 6→8、ts 5.7→6、vue-tsc 2→3 升级
- **pnpm catalog**：统一 vue/element-plus/typescript 等共享依赖版本
- **playground 补 tsconfig.json**：当前靠 vite 处理，无 tsconfig 也能跑，补它是改善 IDE 体验的可选项
- **VitePress 2.x 升级**：从根本上移除 esbuild 依赖
