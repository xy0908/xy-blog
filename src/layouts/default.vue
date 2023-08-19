<template>
  <!-- 侧边栏 -->
  <sidebar :nav="nav" />
  <router-view />
</template>

<script setup lang="ts">
import sidebar from "~components/sidebar/index.vue"

const { nav } = useRouterStore()
</script>
