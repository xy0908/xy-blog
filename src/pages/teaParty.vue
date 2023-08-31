<template>
  <!-- 茶话会:文章搜索 -->
  <div class="tea-party">
    <ArticleSearch></ArticleSearch>
    <ArticleShow></ArticleShow>
  </div>
</template>

<script setup lang="ts">
import ArticleSearch from '~components/teaParty/ArticleSearch.vue';
import ArticleShow from '~components/teaParty/ArticleShow.vue';
</script>

<style scoped lang="less">
.tea-party {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}
</style>
