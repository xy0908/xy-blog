import { acceptHMRUpdate, defineStore } from "pinia"

/**
 * @param { string } key 开发环境env的token的key值
 * @param { string } api 开发环境env的url
 * @param { Require } require 封装请求数据的类
*/
const key = import.meta.env.VITE_TOKEN;
const api = import.meta.env.VITE_URL;
const require = new Require();

export const useAdminStore = defineStore("admin", () => {

  /**
   * @function
   * @description 获取时间的时候补零
   * @param { string } key 需要补零的数据
   * @returns { string }
  */
  function addZero(key: number): string {
    if (key >= 1 && key <= 9) return `0${key}`
    else return `${key}`
  }

  /**
   * @function
   * @description 发布文章时,携带的时间
   * @returns { string }
  */
  function getTime(): string {
    /**
     * @param { Dtae } date 当前的时间戳
     * @param { number } year 年
     * @param { number } month 月
     * @param { number } day 日
     * @param { number } hour 时
     * @param { number } minutes 分
     * @param { number } seconds 秒
    */
    let date = new Date();
    let year = date.getFullYear() // 年
    let month = date.getMonth() + 1; // 月
    let day = date.getDate(); // 日
    let hour = date.getHours(); // 时
    let minutes = date.getMinutes(); // 分
    let seconds = date.getSeconds() //秒

    return `${year}-${month}-${day} ${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)}  `
  }


  return {
    getTime
  }

})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot))
}
