// 标签
export interface Itable{
  text:string;
  isActivation:boolean
} 

// 文章
export interface IseekArticle{
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
