<template>
  <!-- 文章查看 -->
  <div class="article-see">
    <ul class="table">
      <li v-for="(item, index) in tableData" :key="index" @click="changeKey(item.text)"
        :style="isActivation(item.isActivation)">{{ item.text }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Itable } from "~types/teaParty";

/**
 * @param { Array<Itable> } tableData 标签数据 父组件传递的数据
 * @param { defineEmits } emit 父组件传递的方法
*/
const { tableData } = defineProps<{
  tableData: Array<Itable> | null
}>();
const emit = defineEmits(["change"]);

/**
 * @function
 * @description 是否激活 切换table时判断是否激活
*/
const isActivation = (key: boolean) => {
  if (key) return "color: #08d9d6;background:#fff"
};

/**
 * @function
 * @description 改变key值 
*/
const changeKey = (key: string) => {
  emit("change", key)
};
</script>

<style scoped lang="less">
.article-see {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 150px;
  border-radius: 20px 20px 0 0;
  background-color: #B9E6E3;

  .table {
    display: flex;
    align-items: center;
    margin-top: 10px;
    width: 50%;
    height: 50px;
    user-select: none;

    li {
      box-sizing: border-box;
      padding: 5px 20px;
      margin-left: 20px;
      border-radius: 10px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
