// 轮播图的数据类型
export interface IcarouselType {
  img: string;
  title: string
}

// 图片区的数据类型
export type Ipicture = string

// 博客信息
export interface IblogInfo {
  backgroundImg:string
  article:number
  message:number
}

// 最新动态
export interface InewTrends {
  title:string;
  time:string
}

// 推荐书籍
export interface IrecommendedBooks {
  img:string;
  title:string;
  time:string
}

// 登录图片
export interface IloginImages {
  background: string;
  photo: string
}

// 关于我
export interface Iabout{
  icon:string;
  text:string;
  link:string
}

// 我的技术栈
export interface ImySkills{
  color:string;
  text:string
}

// 首页文章
export interface IindexArticle{
  backgroundImages: string;
  table: Array<string>;
  title: string
  message: string;
  time: {
    icon: string;
    text:string; 
  },
  author: {
    icon: string;
    text: string;
  }
}
