<template>
  <div class="article">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="发布文章" name="first">
        <ADMINpublishArticle></ADMINpublishArticle>
      </el-tab-pane>
      <el-tab-pane label="管理文章" name="second">
        <ADMINmanageArticle></ADMINmanageArticle>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script setup lang="ts">
import ADMINpublishArticle from './ADMIN_publishArticle.vue';
import ADMINmanageArticle from "./ADMIN_manageArticle.vue";

const activeName = ref('first')
</script>

<style scoped lang="less">
:deep(.el-tabs__nav-wrap) {
  &::after {
    display: none !important;
  }
}

:deep(.el-tabs__content) {
  padding: 0 !important;
}
</style>
