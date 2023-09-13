<template>
  <div class="blog-info">
    <!-- 博客背景 -->
    <div class="blog-info-bg" :style="{ background: `url(${blogInfo?.backgroundImg}) center/cover` }">
      {{ nowTime }}
    </div>

    <!-- 信息 -->
    <div class="info">
      <h3 class="title">XiaoYang Blog</h3>
      <div class="message">动漫、前端编程，这是博主的俩大标签。本站推荐博主喜欢的动漫、自己所总结的知识，也会分享一些日常心得~</div>
    </div>

    <!-- 具体信息 -->
    <ul class="specific-info">
      <li>
        <span>文章</span>
        <span>{{ blogInfo?.article }}</span>
      </li>
      <li>
        <span>留言</span>
        <span>{{ blogInfo?.message }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Time from "~/composables/time"
import { IblogInfo } from "~/types/index"

const api = import.meta.env.VITE_URL;

const time = new Time();
const require = new Require();

const blogInfo = ref<null | IblogInfo>(null)
const nowTime = ref<string>("");
let timer: any = null;

timer = setInterval(() => {
  nowTime.value = time.getNowTime();
}, 1000)

onMounted(async () => {
  let { data } = await require.get(api + 'index/bolgInfo')
  blogInfo.value = data
})

// 销毁定时器
onUnmounted(() => {
  timer = null
})
</script>

<style scoped lang="less">
.blog-info {
  overflow: hidden;
  width: 100%;
  border-radius: 15px;
  box-shadow: 1px 0 6px #371e1e3d;
  background: #fff;

  //博客背景
  .blog-info-bg {
    position: relative;
    height: 135px;
    text-align: center;
    line-height: 135px;
    font-size: 50px;
    font-family: weizhi;
    font-weight: bold;
    text-shadow: 0.8px 0 5px #333;
    color: #fff;
    user-select: none;

    &:hover {
      transition: all 1s;

      &::after {
        display: inline-block;
      }
    }

    &::after {
      content: "";
      display: none;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .3);
    }
  }

  // 信息
  .info {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-bottom: 1px solid #eee;

    .title {
      font-size: 18px;
      font-weight: 600;
      color: #08D9D6;
    }

    .message {
      margin-top: 10px;
      font-size: 15px;
    }
  }

  // 具体信息
  .specific-info {
    display: flex;

    li {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      width: 50%;
      border-right: 1px solid #eee;

      span {
        margin: 3px 0;
        font-size: 14px;
      }

      &:nth-child(2) {
        border-right: none;
      }
    }
  }
}
</style>
