<script lang="ts" setup>
import { RwAvatar } from 'rw-vue-framework/controls';
import { moduleName } from './langs';
import { UserFilled } from 'rw-vue-framework/element-plus'
const avatar = RwAvatar.init( moduleName, 'avatarDemo',{
    size: 40,
    src:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    fit: 'cover',
})

const avatar1 = RwAvatar.init( moduleName, 'avatarDemo1',{
  // default:'user'
  icon:UserFilled,
})
const avatar2 = RwAvatar.init( moduleName, 'user',{})
</script>

<template>
  <RwAvatar.Template :control="avatar" />
  <p/>
  <RwAvatar.Template :control="avatar1" />
  <p/>
  <RwAvatar.Template :control="avatar2" />
</template>
