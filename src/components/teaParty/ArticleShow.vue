<template>
  <ul class="article-show">
    <template v-if="article?.length !== 0">
      <li v-for="(item, index) in article" :key="index" @click="see(item.file, item._id, item.title)">
        <!-- 封面 -->
        <div class="cover" :style="{ background: `url(${item.backgroundImages}) center/cover` }"></div>
        <!-- 信息 -->
        <div class="info">
          <!-- 文章信息 -->
          <div class="article-info">
            <h4>{{ item.title }}</h4>
            <span>{{ item.message }}</span>
          </div>
          <!-- 附加信息 -->
          <div class="additional-info">
            <div class="additional-info-div">
              <i :class="item.time.icon"></i>
              <span>{{ item.time.text }}</span>
            </div>
            <div class="additional-info-div">
              <i :class="item.author.icon"></i>
              <span>{{ item.author.text }}</span>
            </div>
          </div>
        </div>
      </li>
    </template>
    <template v-else>
      <el-empty :image-size="200" />
    </template>
  </ul>
</template>

<script setup lang="ts">
import { IseekArticle } from "~types/teaParty";

/**
 * @param { Array<IseekArticle> } article 所有文章 【父组件传递的数据】
*/
const { article } = defineProps<{
  article: Array<IseekArticle> | null
}>();
const emit = defineEmits(["isSeeTrue"])


const see = (file: string, id: string, title: string) => {
  emit("isSeeTrue", file, id, title)
}
</script>

<style scoped lang="less">
.article-show {
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  li {
    box-sizing: border-box;
    display: flex;
    margin: 20px 0;
    padding: 10px;
    width: 50%;
    border-radius: 15px;
    box-shadow: 1px 0 6px #371e1e3d;
    background-color: #fff;
    transition: all .4s;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }

    .cover {
      width: 250px;
      height: 150px;
      border-radius: 15px;
    }

    .info {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 20px;

      .article-info {
        display: flex;
        flex-direction: column;

        h4 {
          font-size: 25px;
          color: #000;
        }

        span {
          margin-top: 10px;
          font-size: 15px;
          color: #777;
        }
      }

      .additional-info {
        display: flex;
        flex-wrap: nowrap;

        .additional-info-div {
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: center;
          margin: 0 10px;
          color: #777;

          &:nth-child(1) {
            margin-left: 0px;
          }

          i {
            font-size: 20px;
          }

          span {
            margin-left: 10px;
            font-size: 15px;
          }
        }
      }
    }
  }
}

.article-show::-webkit-scrollbar {
  display: none;
}
</style>
