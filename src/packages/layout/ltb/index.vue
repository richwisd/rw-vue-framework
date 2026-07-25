<script setup lang="ts">
</script>
<template>
  <!-- 多种布局的时候，需要在此处处理 -->
  <el-container>
     <slot name="layoutMenus"></slot>
    
    <el-container>
      <el-header class="header_wrapper" >
      <slot name="layoutHeader"></slot>
    </el-header>
      <!-- <el-container style="flex-wrap: wrap;"> -->
        <el-header  v-if="$slots.layoutTabs"  class="tabs_wrapper">
          <slot name="layoutTabs"></slot> p
        </el-header>
        <el-main class="main-wrapper">
          <slot name="layoutMain"></slot>
        </el-main>
      </el-container>

  </el-container>

</template>

<style scoped lang="scss">
.tabs_wrapper {
  min-width: calc(100vw - 200px);
  height: 34px;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
}

.main-wrapper {
  height: calc(100vh - 84px);
}
</style>
