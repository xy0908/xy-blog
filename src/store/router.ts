import { acceptHMRUpdate, defineStore } from "pinia"

type child = {
    name: string;
    text: string
}

type navData = {
    name: string;
    text: string;
    icon: string;
    isActivation: boolean;
    children?: Array<child>
}

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
            children: [
                {
                    name: "study",
                    text: "学习"
                }
            ]
        },
        {
            name: "music",
            text: "音乐",
            icon: "iconfont icon-beijingyinle",
            isActivation: false,
        },
        {
            name: "other",
            text: "其他",
            icon: "iconfont icon-qita",
            isActivation: false,
            children: [
                {
                    name: "about",
                    text: "关于我"
                },
                {
                    name: "contactMe",
                    text: "联系我"
                }
            ]
        },
        {
            name: "lgoo",
            text: "登录",
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
