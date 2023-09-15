<template>
  <div class="recommended-books">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="创建推荐的书籍" name="first">
        <ADMINpublishBooks></ADMINpublishBooks>
      </el-tab-pane>
      <el-tab-pane label="管理推荐的书籍" name="second">
        <ADMINmanageBooks></ADMINmanageBooks>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script setup lang="ts">
import ADMINpublishBooks from "./ADMIN_publishBooks.vue";
import ADMINmanageBooks from "./ADMIN_manageBooks.vue";

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
