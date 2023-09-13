import { acceptHMRUpdate, defineStore } from "pinia"
import navData from "~/types/route";

export const useRouterStore = defineStore("router", () => {
    // 路由数据
    const nav = ref<navData[]>([
        {
            name: "index",
            text: "首页",
            icon: "iconfont icon-shouye",
            isActivation: true
        },
        {
            name: "teaParty",
            text: "茶话会",
            icon: "iconfont icon-recha",
            isActivation: false,
        },
        {
            name: "music",
            text: "音乐",
            icon: "iconfont icon-beijingyinle",
            isActivation: false,
        },
        {
            name: "about",
            text: "关于我",
            icon: "iconfont icon-guanyuwomen",
            isActivation: false,
        },
        {
            name: "contactMe",
            text: "联系我",
            icon: "iconfont icon-lianxiwomen",
            isActivation: false,
        },
        {
            name: "admin",
            text: "管理员",
            icon: "iconfont icon-denglu-copy",
            isActivation: false
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
