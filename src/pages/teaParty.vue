<template>
  <!-- 茶话会:文章搜索 -->
  <div class="tea-party">
    <ArticleSearch :tableData="tableData" @change="change"></ArticleSearch>

    <template v-if="!isSee">
      <ArticleShow :article="article" @isSeeTrue="isSeeTrue"></ArticleShow>
    </template>

    <template v-else>
      <div class="see">
        <seeArticle :_id_="_id_" :_file_="_file_" :_title_="_title_" @isSeeFlash="isSeeFlash" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Itable } from "~types/teaParty";
import { IseekArticle } from "~types/teaParty";
import ArticleSearch from '~components/teaParty/ArticleSearch.vue';
import ArticleShow from '~components/teaParty/ArticleShow.vue';

/**
 * @param { string } api vite的环境变量设置了请求地址
 * @param { Require } require 封装请求的类
 * @param { Array<Itable> } tableData 标签数据 【传递给子组件】
 * @param { Array<IseekArticle> } article 所有文章 【传递给子组件】
 * @param { string } key 请求获取文章的key值 根据key值获取文章
 * @param { boolean } isSee 是否查看文章 false不查看 true查看
 * @param { string } _file_ 查看的文章路径
 * @param { string } _id_ 查看文章的id
*/
const api = import.meta.env.VITE_URL;
const require = new Require();
const tableData = ref<null | Array<Itable>>(null);
const article = ref<null | Array<IseekArticle>>(null)
const KEY = ref<string>("全部");
const isSee = ref<boolean>(false);
const _file_ = ref<string>("");
const _id_ = ref<string>("");
const _title_ = ref<string>("");

/**
 * @function
 * @description 改变table标签 改变key值 清空文章 获取文章数据  【传递给子组件】
*/
const change = (key: string) => {
  tableData.value?.forEach(item => {
    item.isActivation = false;
    if (item.text === key) {
      item.isActivation = true
    }
  });
  article.value = [];
  KEY.value = key;
  getArticle(KEY.value)
};

/**
 * @function
 * @description 获取文章
*/
const getArticle = async (k?: string) => {
  let { data } = await require.post(api + "/teaParty/seekArticle", { key: KEY.value });
  article.value = data.data;
}

/**
 * @function
 * @description 修改isSee值为true 设置文章路径、id、标题
*/
const isSeeTrue = (file: string, _id: string, title: string) => {
  isSee.value = true;
  _file_.value = file;
  _id_.value = _id;
  _title_.value = title
}

/**
 * @function
 * @description 修改isSee值为flash 清空文章路径、id、标题
*/
const isSeeFlash = () => {
  isSee.value = false;
  _file_.value = "";
  _id_.value = "";
  _title_.value = "";
}

/**
 * @description 页面挂载时请求数据 获取标签数据
*/
onMounted(async () => {
  let { data } = await require.get(api + "/teaParty/table");
  tableData.value = data

  getArticle();
});
</script>

<style scoped lang="less">
.tea-party {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;

  .see {
    margin-top: 20px;
    width: 50%;
    height: 100vh;
  }
}
</style>
