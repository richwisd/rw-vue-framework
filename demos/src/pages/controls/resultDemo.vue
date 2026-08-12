<script lang="ts" setup>
import { RwResult } from 'rw-vue-framework/controls'
import { moduleName } from './langs';

const result1 = RwResult.init(moduleName, 'result1', {
  icon:'',
  title: '<span>成功</span>',
  subTitle: '<span>这是一条成功消息</span>',
  extra:'<span>额外信息</span>'
})

const result2 = RwResult.init(moduleName, 'result2', {
  icon:'<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMTgwIiB2aWV3Qm94PSIwIDAgMzAwIDE4MCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzQwOWVmZiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzY3YzIzYSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjZykiIHdpZHRoPSIzMDAiIGhlaWdodD0iMTgwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmYiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjIyIiBmb250LXdlaWdodD0iYm9sZCI+56S65L6L5Zu+54mHPC90ZXh0Pjwvc3ZnPg=="></img>',
  title: '<span>失败</span>',
  subTitle: '<span>这是一条失败消息</span>',
  extra:'<button style="background: #ff4757;color: white;">Back</button>'
})
</script>

<template>
  <RwResult.Template :control="result1" />
  <RwResult.Template :control="result2" />
</template>
