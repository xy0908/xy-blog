<template>
  <div class="publish">
    <div class="publish-wrap">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="发布文章" name="first">
          <articleWrap />
        </el-tab-pane>
        <el-tab-pane label="文章类型管理" name="second">
          <types />
        </el-tab-pane>
        <el-tab-pane label="动态管理" name="third">
          <newTrends />
        </el-tab-pane>
        <el-tab-pane label="推荐书籍" name="fourth">
          <recommendBooks />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import articleWrap from './publish/index.vue';
import types from "./type/index.vue";
import newTrends from "./newTrends/index.vue";
import recommendBooks from "./recommendedBook/index.vue";


const activeName = ref('first')

</script>

<style scoped lang="less">
.publish {
  z-index: 99;
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  .publish-wrap {
    width: 70%;
    height: 80%;
    background: #fff;
    border-radius: 15px;
    opacity: 0.9;
    box-shadow: 1px 0 6px #371e1e3d;

    :deep(.el-tabs) {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }

    // 设置 el-tabs__header的偏移值
    :deep(.el-tabs__nav-scroll) {
      padding-left: 50px;
    }

    // 设置 el-tabs__content 的内容
    :deep(.el-tabs__content) {
      overflow-y: scroll;
      flex-grow: 1 !important;
      padding-top: 10px;
      padding-left: 50px;
    }

    :deep(.el-tabs__content::-webkit-scrollbar) {
      display: none;
    }
  }
}
</style>
