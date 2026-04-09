<template>
  <div class="container">
      <h2>RW Vue Framework 演示</h2>
      <ul>
        <li><h2>Basic基础组件</h2></li>
        <li v-for="route in routes.slice(0,6)" :key="route.path">
          <a
            :href="'#' + route.path"
            :class="{ active: currentPath === route.path }"
            @click="navigateTo(route.path)"
          >
            {{ route.name }}
          </a>
        </li>
      </ul>
  </div>
  <div class="content-container">
    <component :is="currentComponent" />
  </div>
</template>

<script setup lang="ts">

import { ref, shallowRef, onMounted, onUnmounted, watch } from 'vue'

import Button from './pages/controls/buttonDemo.vue'

// 定义路由
const routes = [

  { path: '/controls/button-demo', name: 'Button 组件演示', component: Button },

]

// 当前路径和组件
const currentPath = ref('/')
const currentComponent = shallowRef(routes[0].component)

// 导航方法
const navigateTo = (path: string) => {
  currentPath.value = path
  window.location.hash = path
  updateCurrentComponent()
}

// 更新当前组件
const updateCurrentComponent = () => {
  const route = routes.find(r => r.path === currentPath.value) || routes[0]
  currentComponent.value = route.component
}

// 监听 hash 变化
const handleHashChange = () => {
  const hash = window.location.hash.slice(1) || '/'
  currentPath.value = hash
  updateCurrentComponent()
}

// 初始化
onMounted(() => {
  handleHashChange()
  window.addEventListener('hashchange', handleHashChange)
})

// 卸载时移除事件监听器
onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange)
})

</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  left: 0;
  top: 0;
  bottom: 0;
  width: 300px;
  overflow-y: auto;

  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #409eff;
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 10px;

      a {
        display: block;
        padding: 10px;
        color: #606266;
        text-decoration: none;
        border-radius: 4px;
        transition: all 0.3s;
        text-align: center;

        &:hover {
          background-color: #ecf5ff;
          color: #409eff;
        }

        &.active {
          background-color: #409eff;
          color: white;
        }
      }
    }
  }
}

.content-container {
  flex: 1;
  padding: 50px;
  overflow-y: auto;
  height: 100vh;
}

*:focus,
*:active {
  outline: none !important;
}
::deep(.el-button:focus) {
    outline: none !important;
}
</style>
