<template>
  <div class="title">
    <span>{{ propsData.title }}</span>
  </div>
</template>

<script setup lang="ts">
// 接受传递的参数
const propsData = defineProps<{
  title: string
}>()
</script>

<style scoped lang="less">
.title {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 15px;
  width: 100%;
  height: 40px;
  color: #777;
  border-bottom: 1px solid #e8e8e8;

  span {
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid red;
  }
}
</style>
