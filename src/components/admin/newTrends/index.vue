<template>
  <div class="new-trends">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="发布动态" name="first">
        <publishTrends />
      </el-tab-pane>
      <el-tab-pane label="管理动态" name="second">
        <manageTrends />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import publishTrends from './publishTrends.vue';
import manageTrends from './manageTrends.vue';

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
