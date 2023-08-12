import { acceptHMRUpdate, defineStore } from "pinia"

export const useRouterStore = defineStore("router", () => {
    // 路由数据
    const nav = reactive([
        {
            name:"index",
            text:"首页",
            isActivation:true
        },
        {
            name:"article",
            text:"文章",
            isActivation:false
        },
        {
            name:"treasureBox",
            text:"百宝箱",
            isActivation:false
        },
        {
            name:"messageBoard",
            text:"留言板",
            isActivation:false
        },
        {
            name:"aboutMe",
            text:"我的",
            isActivation:false
        },
        {
            name:"lgoo",
            text:"登录",
            isActivation:false
        }
    ]);

    // 判断当前路由是否激活
    const isActivation = (data: boolean) => {
        if (data) return "color:#478AFF"
    }

    return { nav, isActivation }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRouterStore, import.meta.hot))
}
