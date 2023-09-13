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
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot))
}
