<template>
  <div class="publish-article-button" @click="pageJump">
    <span>发布文章</span>
    <i class="iconfont icon-fabu"></i>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["pageJump"])

const pageJump = () => {
  emit("pageJump")
}
</script>

<style scoped lang="less">
.publish-article-button {
  box-sizing: border-box;
  display: flex;
  padding-left: 15px;
  margin-top: 20px;
  height: 40px;
  color: #777;
  cursor: pointer;
  background-color: #fff;
  border-radius: 15px 15px 0 0;
  box-shadow: 1px 0 6px #371e1e3d;
  transition: all 0.5s;

  &:hover {
    color: #313131;
    box-shadow: 4px 3px 6px #402f2f3d;

    .iconfont {
      margin-left: 10px;
    }
  }

  span {
    line-height: 40px;
    border-bottom: 2px solid red;
  }

  .iconfont {
    font-size: 25px;
    font-weight: bold;
    line-height: 40px;
    border-bottom: 2px solid red;
    transition: all 0.5s;
  }
}
</style>
