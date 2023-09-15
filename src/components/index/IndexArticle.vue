<template>
  <div class="index-article">
    <div class="index-article-box" v-for="(item, index) in indexArticleData" :key="index">
      <!-- 封面展示 -->
      <div class="cover-show" :style="{ background: `url(${item.backgroundImages}) center /cover` }">
        <div class="article-info">
          <ul class="table">
            <li v-for="table in item.table" :key="table">{{ table }}</li>
          </ul>
          <h4 class="title">{{ item.title }}</h4>
        </div>
        <!-- hover显示 -->
        <div class="hover-message">{{ item.message }}</div>
      </div>
      <!-- 附加信息 -->
      <ul class="additional-info">
        <li>
          <i :class="item.time.icon"></i>
          <span>{{ item.time.text }}</span>
        </li>
        <li>
          <i :class="item.author.icon"></i>
          <span>{{ item.author.text }}</span>
        </li>
        <li>
          <i :class="item.browse.icon"></i>
          <span>{{ Math.floor(item.browse.text / 2) }}</span>
        </li>
        <div class="read" @click="read(item.file, item._id, item.title)">点击阅读👻</div>
      </ul>
    </div>

  </div>
</template>

<script setup lang="ts">
import { IindexArticle } from "~types/index";

/**
 * @param { emit } emit 父组件传递的方法
 * @param { string } api vite环境变量配置的url值
 * @param { Require } require 封装请求的类
 * @param { Array<IindexArticle> } indexArticleData 首页文章数据
 * @param { Store } seeArticleStore 查看文章的仓库
*/
const api = import.meta.env.VITE_URL;
const require = new Require();
const indexArticleData = ref<null | Array<IindexArticle>>(null);
const seeArticleStore = useSeeArticleStore();

/**
 * @function 
 * @description 阅读文章
*/
const read = (file: string, _id: string, title: string) => {
  seeArticleStore.isSeeTrue(file, _id, title)
}


onMounted(async () => {
  let { data } = await require.get(api + 'index/indexArticle')
  indexArticleData.value = data.data
})
</script>

<style scoped lang="less">
.index-article {
  overflow-y: scroll;
  width: 100%;
  height: calc(100vh + 100px);

  .index-article-box {
    overflow: hidden;
    margin-bottom: 20px;
    width: 100%;
    height: 350px;
    border-radius: 20px;
    box-shadow: 1px 0 6px #371e1e3d;
    background-color: #fff;

    .cover-show {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 300px;
      transition: all 1s;
      cursor: pointer;

      &:hover {
        .article-info {
          display: none;
        }

        .hover-message {
          display: flex;
        }

        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: #000;
          transition: all 1s;
          opacity: 0.3;
        }
      }

      .article-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;

        .table {

          li {
            box-sizing: border-box;
            padding: 3px 8px;
            font-size: 15px;
            color: #fff;
            background-color: #FF006C;
            border-radius: 5px;
          }
        }

        .title {
          margin-top: 20px;
          font-size: 40px;
          font-family: weizhi;
          color: #c59c9c;
        }
      }

      .hover-message {
        display: none;
        font-size: 40px;
        font-family: weizhi;
        color: #f17a7a;
      }
    }

    .additional-info {
      position: relative;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 0 20px;
      width: 100%;
      height: 50px;

      .read {
        position: absolute;
        right: 25px;
        font-size: 15px;
        transition: all .4s;
        text-decoration: underline;
        color: #FF006C;
        cursor: pointer;

        &:hover {
          font-size: 18px;
        }
      }

      li {
        display: flex;
        align-items: center;
        margin: 0 10px;
        height: 100%;
        color: #777;

        i {
          font-size: 18px;
        }

        span {
          margin-left: 5px;
          font-size: 15px;
        }
      }
    }
  }
}

.index-article::-webkit-scrollbar {
  display: none !important;
}
</style>
