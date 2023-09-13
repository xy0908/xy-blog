// 发布文章类型
export interface IPublishArticleType {
  type: string;
  title: string;
  describe: string;
  author: string;
  img: string;
  file: string;
  time: string;
}

// 文章类型的数据
export interface IArticleType {
  id: string;
  type: string
}

// 发布文章后的数据类型
export interface IPublishCompleted {
  type: string;
  title: string;
  describe: string;
  author: string;
  img: string;
  file: string;
  time: string;
  _id: string;
}

// 管理最新动态的数据类型
export interface IManageTrends {
  trends: string;
  time: string;
  _id: string;
}
