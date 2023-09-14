// 标签
export interface Itable {
  text: string;
  isActivation: boolean
}

// 文章
export interface IseekArticle {
  backgroundImages: string;
  table: Array<string>;
  title: string
  message: string;
  time: {
    icon: string;
    text: string;
  },
  browse: {
    icon: string;
    text: number;
  };
  author: {
    icon: string;
    text: string;
  };
  file: string;
  _id: string;
  isRecommend: boolean;
}
