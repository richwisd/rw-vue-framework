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
    <transition name="el-fade-in-linear">
      <div v-show="show" class="transition-box">.fade-in-linear</div>
    </transition>
  </div>
</template>

