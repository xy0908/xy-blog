<template>
  <div class="about">
    <ul class="about-bg" v-for="(item, index) in aboutBg" :key="index">
      <!-- 背景 -->
      <div class="bg" :style="{ background: `url(${item.bg}) no-repeat center/cover` }">
        <h4 class="title">{{ item.title }}</h4>
      </div>
      <!-- info -->
      <ul class="info">
        <li v-for="(info, index) in item.info" :key="index">{{ info }}</li>
      </ul>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Iabout } from "~types/about"
// @ts-ignore
const { proxy } = getCurrentInstance();
const require = new Require();
const aboutBg = ref<Array<Iabout> | null>(null);

onMounted(async () => {
  let { data } = await require.get(proxy.$url + "/about/aboutInfo");
  aboutBg.value = data
})
</script>

<style scoped lang="less">
.about {
  width: 100%;
  height: 100vh;

  .about-bg {
    width: 100%;
    height: 100vh;

    // 背景
    .bg {
      overflow: hidden;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 75vh;
      background-attachment: fixed !important;

      .title {
        font-size: 60px;
        text-shadow: 1px 2px 6px #000;
        color: #fff;
      }
    }

    // info
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 25vh;
      font-size: 16px;
      color: #777;
      background: #1E1E1E;

      li {
        margin: 3px;
      }
    }
  }
}
</style>
