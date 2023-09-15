import { acceptHMRUpdate, defineStore } from "pinia"

/**
 * @param { string } key 开发环境env的token的key值
 * @param { string } api 开发环境env的url
 * @param { Require } require 封装请求数据的类
*/
const key = import.meta.env.VITE_TOKEN;
const api = import.meta.env.VITE_URL;
const require = new Require();

export const useSeeArticleStore = defineStore("seeArticle", () => {
  /**
   * @param { boolean } isSee 是否查看文章 false不查看 true查看
   * @param { string } _file_ 查看的文章路径
   * @param { string } _id_ 查看文章的id
   * @param { string } _title_ 文章标题
  */
  const isSee = ref<boolean>(false);
  const _file_ = ref<string>("");
  const _id_ = ref<string>("");
  const _title_ = ref<string>("");


  /**
   * @function
   * @description 修改isSee值为true 设置文章路径、id、标题
  */
  const isSeeTrue = (file: string, _id: string, title: string) => {
    isSee.value = true;
    _file_.value = file;
    _id_.value = _id;
    _title_.value = title
  };

  /**
 * @function
 * @description 修改isSee值为flash 清空文章路径、id、标题
*/
  const isSeeFlash = () => {
    isSee.value = false;
    _file_.value = "";
    _id_.value = "";
    _title_.value = "";
  };


  return {
    isSee, _file_, _id_, _title_,
    isSeeTrue, isSeeFlash
  }


})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSeeArticleStore, import.meta.hot))
}
