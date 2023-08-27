import { acceptHMRUpdate, defineStore } from "pinia"
import { Iabout,ImySkills } from "~/types/index";

// 随机获取数组中的一个颜色
function randomColor():string{
  let colorArr = [
    "#00E67C",
    "#FF0B00",
    "#CB00B7",
    "#FFDA00",
    "#3809FF",
    "#0097FF",
  ];

  return colorArr[Math.floor(Math.random() * colorArr.length )];
}

export const useIndexStore = defineStore("index", () => {
  // 关于我
  const aboutData = ref<Iabout[]>([
    {
      icon:"iconfont icon-github-fill",
      text:"GitHub",
      link:""
    },
    {
      icon:"iconfont icon-bzhanicon",
      text:"bilibili",
      link:""  
    },        
    {
      icon:"iconfont icon-npm",
      text:"npm",
      link:""  
    },        
    {
      icon:"iconfont icon-chart-arcs",
      text:"网易云",
      link:""  
    },
  ])

  // 我的技术栈
  const mySkillsData = ref<ImySkills[]>([
    {
      color:randomColor(),
      text:"Vue2/3"
    },
    {
      color:randomColor(),
      text:"React"
    }, 
    {
      color:randomColor(),
      text:"Vite"
    },   
    {
      color:randomColor(),
      text:"JavaScript"
    },    
    {
      color:randomColor(),
      text:"TypeScript"
    },        
    {
      color:randomColor(),
      text:"Node.js"
    },
    {
      color:randomColor(),
      text:"Electron"
    },
    {
      color:randomColor(),
      text:"Less/Sass"
    },
    {
      color:randomColor(),
      text:"Webpack"
    },
    {
      color:randomColor(),
      text:"HTML5"
    },
    {
      color:randomColor(),
      text:"微信小程序开发"
    },
    {
      color:randomColor(),
      text:"NPM"
    },
  ])

  return { aboutData,mySkillsData }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIndexStore, import.meta.hot))
}
