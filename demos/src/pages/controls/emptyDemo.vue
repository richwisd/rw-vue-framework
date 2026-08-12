<script lang="ts" setup>
import { RwEmpty } from 'rw-vue-framework/controls'
import { moduleName } from './langs';

const empty1 = RwEmpty.init(moduleName, 'empty1', {
  description: '<span>This is an empty component</span>',
})
const empty2 = RwEmpty.init(moduleName, 'empty2', {
  image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMTgwIiB2aWV3Qm94PSIwIDAgMzAwIDE4MCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzQwOWVmZiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzY3YzIzYSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjZykiIHdpZHRoPSIzMDAiIGhlaWdodD0iMTgwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmYiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjIyIiBmb250LXdlaWdodD0iYm9sZCI+56S65L6L5Zu+54mHPC90ZXh0Pjwvc3ZnPg==',
  imageSize: 100,
  description: '<button>This is a button</button>',
  default: '<span>This is an empty component</span>',
})
</script>

<template>
<RwEmpty.Template :control="empty1" />
<RwEmpty.Template :control="empty2" />
</template>
