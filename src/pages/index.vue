<template>
  <img :src="bg" alt="" class="
    z--1
    pos-fixed top--40px
  ">
  
</template>

<script setup lang="ts">
// @ts-ignore
const { proxy } = getCurrentInstance()

// 背景图片
const bg = proxy.$url + "/backgroundImages/index.png"
</script>
