<template>
  <div class="publish-article" :style="{ background: `url(${bgImg}) no-repeat center/cover` }">发布文章登录</div>
</template>

<script setup lang="ts">
// const {
//   bgImg,
//   getBgImages
// } = usePublishArticleStore();
const store = usePublishArticleStore();
const { bgImg } = storeToRefs(store)
const { getBgImages } = store

onMounted(() => {
  getBgImages();
})
</script>


<style scoped lang="less">
.publish-article {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
</style>
