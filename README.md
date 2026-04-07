# rw-vue-framework

单仓结构 Vue3 管理后台示例，基于 Vite + TypeScript + Pinia + Vue Router。

## 目录结构

- `docs`：文档源代码。
- `play`：测试和演示场地。
- `scripts`: 自定义脚本，如清理、部署等。
- `internal`: 共享配置。
- `packages/controls`：组件。
- `pnpm-workspace.yaml`：pnpm 工作区配置。
- `tsconfig.base.json`：根 TypeScript 配置。
- `.eslintrc.cjs`：ESLint 配置。

## 快速开始

```bash
pnpm install
pnpm dev --filter app
```

## 构建

```bash
pnpm build --filter app
```
