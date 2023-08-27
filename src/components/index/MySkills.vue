<template>
  <div class="my-skills">
    <Title :title="`我的技术栈`"></Title>
    <ul class="main">
      <li v-for="(item, index) in mySkillsData" :key="index">
        <div class="front-bg-color" :style="{ background: `${item.color}` }"></div>
        <span class="text">{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>


<script setup lang="ts">
const mySkillsData = useIndexStore().mySkillsData
</script>

<style scoped lang="less">
.my-skills {
  margin-top: 20px;
  border-radius: 15px;
  box-shadow: 1px 0 6px #371e1e3d;
  background-color: #fff;

  .main {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    li {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3px 8px;
      margin: 10px;
      border: 1px solid #eee;

      .front-bg-color {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }

      .text {
        margin-left: 5px;
        font-size: 14px;
        color: #777;
      }
    }
  }
}
</style>
