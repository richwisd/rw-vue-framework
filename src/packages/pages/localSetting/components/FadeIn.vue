<script setup lang="ts">

import './transition.scss'

import { useMouse } from '../../../hooks'

const { show, handleMouseEnter, handleMouseLeave } = useMouse()

</script>

<template>
  <div
    class="fa-box"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <transition name="el-fade-in">
      <div v-show="show" class="transition-box">.fade-in</div>
    </transition>
  </div>
</template>

