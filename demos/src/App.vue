<template>
  <ElConfigProvider
    :locale="localSettingData.elementPlusLocale()"
    :size="localSettingData.system.size as any"
  >
    <div class="app" :class="{ 'app--mobile': isMobile }">
      <header v-if="isMobile" class="app__header">
        <ElButton text @click="drawerVisible = !drawerVisible">
          <ElIcon :size="22"><Menu /></ElIcon>
        </ElButton>
        <span class="app__title" @click="router.push('/')">{{ appTitle }}</span>
      </header>

      <aside class="app__sidebar" :class="{ 'is-open': isMobile && drawerVisible }">
        <div v-if="!isMobile" class="app__logo" @click="router.push('/')">{{ appTitle }}</div>
        <ElMenu :default-active="route.path" router :default-openeds="openedMenus">
          <ElMenuItem index="/">首页</ElMenuItem>
          <ElSubMenu v-for="group in menuGroups" :key="group.key" :index="group.key">
            <template #title>{{ group.label }}</template>
            <ElMenuItem v-for="item in group.children" :key="item.key" :index="item.path">
              {{ item.title }}
            </ElMenuItem>
          </ElSubMenu>
        </ElMenu>
      </aside>

      <div v-if="isMobile && drawerVisible" class="app__overlay" @click="drawerVisible = false" />

      <main class="app__main">
        <router-view />
      </main>
    </div>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ElConfigProvider,
  ElButton,
  ElIcon,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  Menu,
} from 'rw-vue-framework/element-plus'
import { useLocalSettingStore } from 'rw-vue-framework/stores'
import { initLangOptions } from 'rw-vue-framework/locale'
import { useDevice } from 'rw-vue-framework/hooks'
import { buildMenuTree } from './router'

const appTitle = 'RW Framework 演示'

function getCookie(name: string): string | undefined {
  const m = document.cookie.match(new RegExp('(^|;\\s*)' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)'))
  return m ? decodeURIComponent(m[2]) : undefined
}
function setCookie(name: string, value: string): void {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/`
}

const localSettingData = useLocalSettingStore()
const route = useRoute()
const router = useRouter()
const { isMobile } = useDevice()
const drawerVisible = ref(false)
const menuGroups = buildMenuTree()
const openedMenus = menuGroups.map(g => g.key)

watch(() => route.path, () => { drawerVisible.value = false })

// 暗黑模式
const isDark = localSettingData.isDark()
watch(() => localSettingData.system.dark, v => { isDark.value = v })

// 语言同步 (store ↔ cookie ↔ i18n)
const syncLocale = (locale: string) => {
  setCookie('ClientLang', locale)
  initLangOptions.ClientLang = locale
}
syncLocale(localSettingData.system.locale)
watch(() => localSettingData.system.locale, syncLocale)

// 字号
const fontSizeMap: Record<string, string> = { small: '12px', default: '14px', large: '16px' }
watch(() => localSettingData.system.size, size => {
  document.documentElement.style.setProperty('--el-font-size-base', fontSizeMap[size] || '14px')
}, { immediate: true })
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  height: 100vh;
}

.app--mobile {
  flex-direction: column;
}

/* 侧边栏 */
.app__sidebar {
  width: 280px;
  flex-shrink: 0;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 1px solid var(--el-border-color-lighter);
  background: var(--el-bg-color);
  position: relative;
  scrollbar-width: none;
  scrollbar-color: transparent transparent;
  transition: scrollbar-color 0.2s ease;

  &::-webkit-scrollbar { width: 6px; height: 6px; }
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 3px;
    transition: background-color 0.2s ease;
  }
  &::-webkit-scrollbar-track { background: transparent; }

  &:hover {
    scrollbar-width: thin;
    scrollbar-color: var(--el-text-color-placeholder) transparent;
    &::-webkit-scrollbar-thumb { background: var(--el-text-color-placeholder); }
  }
}

html.dark .app__sidebar:hover {
  scrollbar-color: var(--el-text-color-secondary) transparent;
  &::-webkit-scrollbar-thumb { background: var(--el-text-color-secondary); }
}

.app--mobile .app__sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 2001;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}
.app--mobile .app__sidebar.is-open { transform: translateX(0); }

.app__overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.5);
}

.app__header {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 50px;
  padding: 0 8px;
  flex-shrink: 0;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.app__title {
  color: var(--el-color-primary);
  cursor: pointer;
  user-select: none;
}

.app__logo {
  padding: 20px;
  text-align: center;
  color: var(--el-color-primary);
  font-size: 18px;
  border-bottom: 1px solid var(--el-border-color-lighter);
  cursor: pointer;
  user-select: none;
  &:hover { background-color: var(--el-color-primary-light-9); }
}

/* ElMenu 样式 */
.app__sidebar :deep(.el-menu) {
  border-right: none;
  background: transparent;
  overflow: visible;
}

.app__sidebar :deep(.el-menu-item),
.app__sidebar :deep(.el-sub-menu__title) {
  border-radius: 4px;
  margin: 4px 8px;
  width: calc(100% - 16px);
}

.app__sidebar :deep(.el-menu-item:hover),
.app__sidebar :deep(.el-sub-menu__title:hover) {
  background-color: var(--el-fill-color-light) !important;
}

.app__sidebar :deep(.el-menu-item.is-active) {
  background-color: var(--el-color-primary-light-9) !important;
  color: var(--el-color-primary) !important;
  font-weight: 500;
}

html.dark .app__sidebar :deep(.el-menu-item.is-active) {
  background-color: var(--el-color-primary-dark-2) !important;
  color: #fff !important;
}

/* 主内容 */
.app__main {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: var(--el-bg-color-page);
}

.app--mobile .app__main {
  padding: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.app--mobile .app__main > * {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.app--mobile .app__main > *::-webkit-scrollbar {
  display: none;
}

*:focus, *:active {
  outline: none !important;
}
</style>
