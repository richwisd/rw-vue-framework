<script setup lang="ts">
import { useAppConfigStore, useLocalSettingStore } from '@rw-vue-framework/stores';
import TLRTemplate from "./tlr/index.vue"
import { computed } from 'vue';
const appConfig=useAppConfigStore()
const localSetting=useLocalSettingStore()
const userTemplate=computed(()=>{
  if (appConfig.layout.userCanChange){
     return localSetting.layout.layout
  }else{
    return appConfig.layout.layout
  }

})

</script>

<template>
<TLRTemplate v-if="userTemplate=='tlr'" />
</template>
