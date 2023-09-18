<template>
  <div class="new-trends">
    <Title :title="`最新动态`"></Title>
    <ul class="main">
      <li v-for="(item, index) in newTrendsData" :key="index" @click="seeCurrentTrendsContent(item.time, item.title)">
        <h4>{{ item.title }}</h4>
        <span>{{ item.time }}</span>
      </li>
    </ul>


    <!-- 查看最新动态 -->
    <el-dialog v-model="dialogVisible" :title="currentTrendsContent.time" width="30%" :before-close="handleClose">
      <span>{{ currentTrendsContent.title }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { InewTrends } from "~types/index"

/**
 * @param { Require } require 封装请求的类
 * @param { string } api 开发环境
 * @param { Array<InewTrends> } newTrendsData 最新动态
 * @param { boolean } dialogVisible 对话框显隐值
 * @param { InewTrends } currentTrendsContent 当前动态内容
*/
const require = new Require();
const api = import.meta.env.VITE_URL;
const newTrendsData = ref<null | Array<InewTrends>>(null);
const dialogVisible = ref(false);
const currentTrendsContent = ref<InewTrends>({
  time: "",
  title: ""
})

/**
 * @function
 * @description 查看当前动态
 * 
 * @param { string } time 时间
 * @param { string } title 内容
*/
const seeCurrentTrendsContent = (time: string, title: string) => {
  dialogVisible.value = true
  currentTrendsContent.value = {
    time,
    title
  }
}

/**
 * @function
 * @description 关闭对话框
*/
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

onMounted(async () => {
  let { data } = await require.get(api + '/index/NewTrends')
  newTrendsData.value = data
  console.log(data);

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
      cursor: pointer;
      transition: all 0.5s;

      &:hover {
        box-shadow: 6px 4px 6px #371e1e3d;
      }

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
