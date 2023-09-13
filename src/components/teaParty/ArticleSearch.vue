<template>
  <!-- 文章搜索 -->
  <div class="article-search">
    <div class="search">
      <input class="input" type="text" placeholder="请输入搜索内容">
      <button>
        <i class="iconfont icon-sousuo"></i>
      </button>
    </div>
    <ul class="table">
      <li v-for="(item, index) in tableData" :key="index" @click="changeArticle(item.text)"
        :style="isActivation(item.isActivation)">{{ item.text }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Itable } from "~types/teaParty"
const api = import.meta.env.VITE_URL;
const require = new Require();
const tableData = ref<null | Array<Itable>>(null);

const isActivation = (key: boolean) => {
  if (key) return "color: #08d9d6;background:#fff"
}

// 改变
const changeArticle = (key: string) => {
  tableData.value?.forEach(item => {
    item.isActivation = false;
    if (item.text === key) {
      item.isActivation = true
    }
  })
}

onMounted(async () => {
  let { data } = await require.get(api + "/teaParty/table");
  tableData.value = data
})
</script>

<style scoped lang="less">
.article-search {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 500px;
  border-radius: 20px 20px 0 0;
  background-color: #B9E6E3;

  .search {
    display: flex;
    width: 50%;
    height: 50px;

    .input {
      box-sizing: border-box;
      flex-grow: 1;
      padding: 0 10px;
      border: none;
      outline: none;
      border-radius: 8px 0 0 8px;
      opacity: 0.4;
    }

    button {
      width: 50px;
      height: 50px;
      border-radius: 0 8px 8px 0;
      background: #00FFFF;

      i {
        font-size: 24px;
        font-weight: bold;
        color: #fff;
      }
    }
  }

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
