<template>
  <img :src="bg" alt="" class="z--1 pos-fixed top--40px">
</template>

<script setup lang="ts">
// @ts-ignore
const { proxy } = getCurrentInstance()

const require = new Require()

// 背景图片
const bg = proxy.$url + "/backgroundImages/index.png"

onMounted(async()=>{
  let r = await require.get("https://v.api.aa1.cn/api/yiyan/index.php")
  console.log(r);
  
})
</script>
