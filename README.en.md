# rw-vue-framework

A monorepo Vue 3 admin dashboard example based on Vite + TypeScript + Pinia + Vue Router.

## Directory Structure

- `internal`: Shared configurations.
- `packages/controls`：Components.
- `pnpm-workspace.yaml`：pnpm workspace configuration.
- `tsconfig.base.json`：Root TypeScript configuration.
- `.eslintrc.cjs`：ESLint configuration.

## Quick Start

```bash
pnpm install
pnpm dev --filter app
```

## Build

```bash
pnpm build --filter app
```
