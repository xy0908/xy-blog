<template>
  <div class="type">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="创建文章的类型" name="first">
        <publishType></publishType>
      </el-tab-pane>
      <el-tab-pane label="管理文章的类型" name="second">
        <manageType></manageType>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import publishType from './publishType.vue';
import manageType from './manageType.vue';

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
