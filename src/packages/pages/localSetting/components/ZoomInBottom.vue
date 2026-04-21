<script setup lang="ts">
import { useMouse } from '../../../hooks'
import './transition.scss'
const { show, handleMouseEnter, handleMouseLeave } = useMouse()
</script>

<template>
  <div
    class="fa-box"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <transition name="el-zoom-in-bottom">
      <div v-show="show" class="transition-box">.zoom-in-bottom</div>
    </transition>
  </div>
</template>

