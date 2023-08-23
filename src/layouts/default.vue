<template>
  <div class="default">
    <!-- 侧边栏 -->
    <sidebar :nav="nav" />
    <div class="route">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import sidebar from "~components/sidebar/index.vue"

const { nav } = useRouterStore()
</script>


<style scoped lang="less">
.default {
  display: flex;
  width: 100%;

  .route {
    flex-grow: 1;
  }
}
</style>
