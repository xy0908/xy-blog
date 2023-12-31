<template>
  <div class="index">
    <!-- 上半部分内容:轮播图 和 图片区 -->
    <div class=" index-top">
      <!-- 轮播图 -->
      <el-carousel :interval="5000" height="600px" arrow="always">
        <el-carousel-item v-for="(item, index) in carousel" :key="index">
          <img :src="item.img" alt="carousel">
          <div class="info">{{ item.title }}</div>
          <button class="button" @click="seeArticle_AND_pageJump(item.file, item._id, item.title)">READ MORE</button>
        </el-carousel-item>
      </el-carousel>
      <!-- 图片区 -->
      <div class="picture">
        <div v-for="(item, index) in  picture " :key="index" :style="{ background: `url( ${item} )` }">
        </div>
      </div>
    </div>

    <!-- 下半部分内容 -->
    <div class="index-bottom">
      <!-- 左侧内容 -->
      <div class="left-aside">
        <!-- 博客信息 -->
        <BlogInfo />
        <!-- 最新动态 -->
        <NewTrends />
        <!-- 推荐书籍 -->
        <RecommendedBooks />
      </div>
      <!-- 中间内容 -->
      <div class="main">
        <!-- 首页文章 -->
        <template v-if="!seeArticleStore.isSee">
          <IndexArticle />
        </template>
        <!-- 查看首页文章 -->
        <template v-else>
          <seeArticle />
        </template>
      </div>
      <!-- 右侧内容 -->
      <div class="right-aside">
        <!-- 关于我 -->
        <AboutMe />
        <!-- 我的技术栈 -->
        <MySkills />
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">

/**
 * @param { Component } BlogInfo 博客信息
 * @param { Component } NewTrends 最新动态
 * @param { Component } RecommendedBooks 推荐书籍
 * @param { Component } AboutMe 关于我
 * @param { Component } MySkills 我的技术栈
 * @param { Component } IndexArticle 首页文章
 * @param { Component } seeArticle 查看文章
 * @param { IcarouselType } IcarouselType 轮播图数据结构
 * @param { Ipicture } Ipicture 图片区数据结构
*/
import BlogInfo from "~components/index/BlogInfo.vue";
import NewTrends from "~components/index/NewTrends.vue";
import RecommendedBooks from "~components/index/RecommendedBooks.vue";
import AboutMe from "~components/index/AboutMe.vue";
import MySkills from "~components/index/MySkills.vue";
import IndexArticle from "~components/index/IndexArticle.vue";
import seeArticle from "~components/index/seeArticle.vue";
import { IcarouselType, Ipicture } from "~/types/index";



/**
 * @param { string } api 挂载在vite环境的请求地址
 * @param { Require } require 请求封装的类
 * @param { Array<IcarouselType> } carousel 轮播图数据
 * @param { Array<Ipicture> } picture 图片区数据
 * @param { Store } seeArticleStore 查看文章的仓库
 * @param { Router } router vue路由
*/
const api = import.meta.env.VITE_URL;
const require = new Require();
const carousel = ref<null | IcarouselType[]>(null);
const picture = ref<null | Ipicture[]>(null);
const seeArticleStore = useSeeArticleStore();
const router = useRouter();


/**
 * 查看文章和页面跳转
*/
const seeArticle_AND_pageJump = (file: string, _id: string, title: string) => {
  seeArticleStore.isSeeTrue(file, _id, title);
  router.push({
    name: "teaParty",
  })
}


onMounted(async () => {
  // 获取轮播图数据
  {
    let { data } = await require.get(api + "/index/carousel");
    carousel.value = data
  }

  // 获取图片区数据
  {
    let { data } = await require.get(api + '/index/picture')
    picture.value = data
  }
});

</script>

<style lang="less" scoped>
.index {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 100%;
  height: 100%;

  .index-top {
    display: flex;

    // 轮播图
    .el-carousel {
      overflow: hidden;
      width: 70%;
      border-radius: 40px;

      .el-carousel__item {

        &:hover {
          .button {
            left: 80px;
          }
        }

        img {
          width: 100%;
          height: 100%;
        }

        .info {
          position: absolute;
          bottom: 100px;
          left: 80px;
          font-size: 30px;
          color: #fff;

          &::after {
            content: "推荐文章";
            display: flex;
            position: absolute;
            top: -40px;
            left: 10px;
            font-size: 17px;
          }

          &::before {
            content: "";
            position: absolute;
            left: -25px;
            top: -40px;
            width: 0px;
            height: 0px;
            border-left: 15px solid transparent;
            border-right: 15px solid #FF2E63;
            border-bottom: 15px solid transparent;
            transform: rotate(45deg);
          }
        }

        .button {
          box-sizing: border-box;
          position: absolute;
          bottom: 40px;
          left: -150px;
          padding: 10px 20px;
          color: #fff;
          border-radius: 20px;
          border: none;
          background-image: linear-gradient(90deg, #08D9D6, #EAEAEA, #08D9D6);
          background-size: 300%;
          animation: buttonBG 8s linear infinite;
          transition: all 1s;
          cursor: pointer;
        }

        // button动画
        @keyframes buttonBG {
          0% {
            background-position: 0%;
          }

          100% {
            background-position: 300%;
          }
        }
      }
    }

    // 图片区域
    .picture {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      margin-left: 40px;
      height: 100%;

      div {
        margin: 10px 0;
        background-position-y: center !important;
        background-size: cover !important;
        border-radius: 30px;

        @keyframes moveBG {
          0% {
            background-position-x: 5%;
          }

          25% {
            background-position-x: 25%;
          }

          50% {
            background-position-x: 50%;
          }

          75% {
            background-position-x: 75%;

          }

          100% {
            background-position-x: 100%;
          }
        }

        &:nth-child(1) {
          width: 100%;
          height: 70%;
          animation: moveBG 8s linear infinite reverse;
        }

        &:nth-child(2) {
          width: 100%;
          height: 30%;
        }
      }
    }
  }

  .index-bottom {
    display: flex;
    margin: 50px auto;
    width: 85%;

    // 左侧
    .left-aside {
      width: 250px;
    }

    // 中间
    .main {
      overflow: hidden;
      flex-grow: 1;
      margin: 0 20px;
      width: 60%;
    }

    // 右侧
    .right-aside {
      width: 250px;
    }
  }
}

// 屏幕最小宽度为1500px的时候  【轮播图宽度为100%】 【隐藏图片区域】 【下半部分宽度由85%更改为100%】
@media screen and (max-width:1500px) {
  .el-carousel {
    width: 100% !important;
  }

  .picture {
    display: none !important;
  }

  .index-bottom {
    width: 100% !important;
  }
}
</style>
