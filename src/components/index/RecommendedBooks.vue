<template>
  <div class="recommended-books">
    <Title :title="`推荐书籍`"></Title>
    <ul class="main">
      <li v-for="(item, index) in recommendedBooksData" :key="index" @click="seeCurrentRecommendedBooks(item)">
        <img :src="item.img" alt="">
        <div class="info">
          <h4>{{ item.bookName }}</h4>
          <span>{{ item.time }}</span>
        </div>
      </li>
    </ul>


    <!-- 查看推荐书籍 -->
    <el-dialog v-model="dialogVisible" :title="currentRecommendedBooks.bookName" width="30%" :before-close="handleClose">
      <div style="display: flex; border-bottom: 1px solid #EAEAEA;">
        <!-- 图片 -->
        <img :src="currentRecommendedBooks.img" alt="" style="width: 100px;">
        <!-- 理由 -->
        <div style="margin-left: 20px; font-family: weizhi; ">{{ currentRecommendedBooks.reason }}</div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Require } from "~/composables/require"

type books = {
  bookName: string;
  time: string;
  img: string;
  reason: string;
  _id: string
}
const api = import.meta.env.VITE_URL;
const require = new Require()
const recommendedBooksData = ref<null | books[]>(null)
const currentRecommendedBooks = ref<books>({
  bookName: "",
  time: "",
  img: "",
  reason: "",
  _id: ""
});
const dialogVisible = ref(false);

/**
 * @function
 * @description 查看当前动态
 * 
 * @param { string } time 时间
 * @param { string } title 内容
*/
const seeCurrentRecommendedBooks = (item: books) => {
  dialogVisible.value = true
  currentRecommendedBooks.value = {
    ...item
  }
}


/**
 * @function
 * @description 关闭对话框
*/
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('是否关闭当前窗口?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}



onMounted(async () => {
  let { data } = await require.get(api + "/recommendBooks/getBooks");
  recommendedBooksData.value = data.data
  console.log(data);

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
      cursor: pointer;

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
