import App from './App.vue'

import { ViteSSG } from "vite-ssg"

import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

import "uno.css";
import "~/style/mian.css"
import "@unocss/reset/tailwind-compat.css"

// 标题组件
import Title from "~components/public/Title.vue"

/**
 * 将我们pinia注册 单独抽离了出来
 * 解决了在hooks中使用pinia 未定义先使用的bug
*/
import { setupStore } from "./store/main"

const routes = setupLayouts(generatedRoutes)
const url = "/api"

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, initialState }) => {
    // 挂载pinia
    setupStore(app);

    // 把代理变量 挂载到全局
    app.config.globalProperties.$url = url;

    // 全局注册标题组件
    app.component("Title",Title)
  }
)
