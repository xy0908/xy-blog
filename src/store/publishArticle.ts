import { acceptHMRUpdate, defineStore } from "pinia"

const require = new Require();

export const usePublishArticleStore = defineStore("index", () => {
  /**
   * @description 发布文章 定义的一些的数据
   * @param { string } bgImages 背景图片
   */
  const bgImg = ref<string | null>(null);


  /**
   * @function
   * @description 获取发布文章组件的背景图片
   */
  const getBgImages = async () => {
    let { data } = await require.get('/api' + "/publishArticle/publishArticleBackground");
    bgImg.value = data
  }

  return {
    bgImg,
    getBgImages
  }

})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePublishArticleStore, import.meta.hot))
}
