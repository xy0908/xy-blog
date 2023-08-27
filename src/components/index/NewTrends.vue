<template>
  <div class="new-trends">
    <Title :title="`最新动态`"></Title>
    <ul class="main">
      <li v-for="(item, index) in newTrendsData" :key="index">
        <h4>{{ item.title }}</h4>
        <span>{{ item.time }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { InewTrends } from "~types/index"

// 类 请求
const require = new Require();
// @ts-ignore
const { proxy } = getCurrentInstance();
// 最新动态
const newTrendsData = ref<null | Array<InewTrends>>(null)

onMounted(async () => {
  let { data } = await require.get(proxy.$url + '/index/NewTrends')
  newTrendsData.value = data
})
</script>

<style scoped lang="less">
.new-trends {
  margin-top: 20px;
  box-shadow: 1px 0 6px #371e1e3d;
  border-radius: 15px;
  background-color: #fff;

  .main {
    display: flex;
    flex-direction: column;

    li {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10px 20px;

      h4 {
        overflow: hidden;
        width: 90%;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 16px;
        color: #000;
      }

      span {
        font-size: 13px;
        color: #777
      }
    }
  }
}
</style>
