<template>
  <div class="recommended-books">
    <Title :title="`推荐书籍`"></Title>
    <ul class="main">
      <li v-for="(item, index) in recommendedBooksData" :key="index">
        <img :src="item.img" alt="">
        <div class="info">
          <h4>{{ item.bookName }}</h4>
          <span>{{ item.time }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Require } from "~/composables/require"

type books = {
  bookName: string;
  time: string;
  img: string;
  _id: string
}

const api = import.meta.env.VITE_URL;
const require = new Require()
const recommendedBooksData = ref<null | books[]>(null)

onMounted(async () => {
  let { data } = await require.get(api + "/recommendBooks/getBooks");
  recommendedBooksData.value = data.data
})
</script>

<style scoped lang="less">
.recommended-books {
  margin-top: 20px;
  border-radius: 15px;
  box-shadow: 1px 0 6px #371e1e3d;
  background-color: #fff;

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;

    li {
      display: flex;
      margin: 10px 0;
      width: 80%;

      img {
        width: 50px;
        height: 70px;
        transition: all 0.5s;

        &:hover {
          transform: scale(1.3);
        }
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 10px;
        font-family: weizhi;

        h4 {
          font-size: 16px;
          color: #000;
        }

        span {
          font-size: 14px;
          color: #777;
        }
      }
    }
  }
}
</style>
