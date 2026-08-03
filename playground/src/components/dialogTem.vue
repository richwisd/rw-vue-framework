<template>
  <div>
    <RwText.Template :control="text" />
    <RwText.Template :control="text" />
    <RwText.Template :control="text" />
    <RwText.Template :control="text" />
    <RwText.Template :control="text" />
    <RwText.Template :control="text" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import { RwText } from 'rw-vue-framework/controls'

const text = reactive(
  RwText.init('', '文字', {
    size: 'large',
    type: 'warning',
  }),
)
</script>

<style scoped></style>
