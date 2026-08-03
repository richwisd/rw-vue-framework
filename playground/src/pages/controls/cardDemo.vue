<script lang="ts" setup>
import { RwCard } from 'rw-vue-framework/controls'
import { moduleName } from './langs';

const card1 = RwCard.init(moduleName, 'card1',{
header: '<span>This is a card</span>',
footer: '<span>This is a footer</span>',
default: '<span>This is a card content</span>',
})
</script>

<template>
  <RwCard.Template  :control="card1">
  </RwCard.Template>
</template>
