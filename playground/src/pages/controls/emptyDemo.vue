<script lang="ts" setup>
import { RwEmpty } from 'rw-vue-framework/controls'
import { moduleName } from './langs';

const empty1 = RwEmpty.init(moduleName, 'empty1', {
  description: '<span>This is an empty component</span>',
})
const empty2 = RwEmpty.init(moduleName, 'empty2', {
  image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
  imageSize: 100,
  description: '<button>This is a button</button>',
  default: '<span>This is an empty component</span>',
})
</script>

<template>
<RwEmpty.Template :control="empty1" />
<RwEmpty.Template :control="empty2" />
</template>
