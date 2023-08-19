<template>
  <div class="sidebar">
    <div class="sidebar-title">
      <img :src="logoImg" alt="">
    </div>
    <ul>
      <li></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import logoImg from "~asset/logo.png"

// 接收父组件传递的值
const props = defineProps({
  nav: String
})

</script>

<style scoped lang="less">
.sidebar {
  position: fixed;
  left: 0;
  width: 200px;
  height: 100vh;
  background-color: #fff;
}
</style>
