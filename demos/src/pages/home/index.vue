<template>
  <div class="home-page">
    <div class="home-header">
      <h1>RW Vue Framework</h1>
      <p>基于 Vue 3 + Element Plus 的快速开发框架 — 组件演示总览</p>
    </div>

    <div class="search-bar">
      <ElInput
        v-model="searchQuery"
        placeholder="搜索组件名称或路径..."
        clearable
        size="large"
      >
        <template #prefix>
          <ElIcon><Search /></ElIcon>
        </template>
      </ElInput>
    </div>

    <div v-for="group in filteredRoutes" :key="group.name" class="route-group">
      <h2 class="group-title">
        <span class="group-badge">{{ group.items.length }}</span>
        {{ group.name }}
      </h2>
      <div class="card-grid">
        <div
          v-for="item in group.items"
          :key="item.path"
          class="route-card"
          @click="router.push(item.path)"
        >
          <div class="card-title">{{ item.title }}</div>
          <div class="card-path">{{ item.path }}</div>
        </div>
      </div>
    </div>

    <div v-if="filteredRoutes.length === 0" class="no-results">
      <p>未找到匹配的组件，请尝试其他关键词</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from 'rw-vue-framework/element-plus'

const router = useRouter()
const searchQuery = ref('')

// 从路由表构建分组数据（排除首页自身和 redirect 路由）
const groupedRoutes = computed(() => {
  const groupMap = new Map<string, { path: string; title: string }[]>()

  for (const route of router.options.routes) {
    if (route.path === '/' || route.redirect) continue
    const group = route.meta?.group as string
    const title = route.meta?.title as string
    if (!group || !title) continue

    if (!groupMap.has(group)) {
      groupMap.set(group, [])
    }
    groupMap.get(group)!.push({ path: route.path, title })
  }

  return Array.from(groupMap.entries()).map(([name, items]) => ({ name, items }))
})

// 根据搜索词过滤路由（匹配标题和路径）
const filteredRoutes = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return groupedRoutes.value

  return groupedRoutes.value
    .map(group => ({
      ...group,
      items: group.items.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.path.toLowerCase().includes(query)
      )
    }))
    .filter(group => group.items.length > 0)
})
</script>

<style lang="scss" scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}

.home-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;

  h1 {
    margin: 0 0 12px 0;
    font-size: 36px;
    color: var(--el-text-color-primary);
    background: linear-gradient(135deg, var(--el-color-primary), var(--el-color-success));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    margin: 0;
    font-size: 16px;
    color: var(--el-text-color-secondary);
  }
}

.search-bar {
  max-width: 600px;
  margin: 0 auto 30px;
}

.route-group {
  margin-bottom: 36px;
}

.group-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  color: var(--el-text-color-primary);
  margin: 0 0 18px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--el-color-primary-light-9);
}

.group-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  border-radius: 14px;
  background: var(--el-color-primary);
  color: var(--el-color-white);
  font-size: 13px;
  font-weight: normal;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.route-card {
  padding: 18px 20px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    border-color: var(--el-color-primary);
    box-shadow: 0 4px 16px var(--el-color-primary-light-9);
    transform: translateY(-2px);
  }

  .card-title {
    font-size: 15px;
    font-weight: 500;
    color: var(--el-text-color-primary);
    margin-bottom: 8px;
  }

  .card-path {
    font-size: 12px;
    color: var(--el-text-color-placeholder);
    font-family: 'Consolas', 'Monaco', monospace;
    word-break: break-all;
  }
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  color: var(--el-text-color-secondary);
  font-size: 14px;
}
</style>
