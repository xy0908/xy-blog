export const type = (_: any, value: string, callback: any) => {
  if (value.trim() === "") {
    callback(new Error("类型不能为空"));
  } else {
    callback();
  }
};

export const title = (_: any, value: string, callback: any) => {
  if (value.trim() === "") {
    callback(new Error("文章标题不能为空"));
  } else {
    callback();
  }
};

export const describe = (_: any, value: string, callback: any) => {
  if (value.trim() === "") {
    callback(new Error("文章描述不能为空"));
  } else {
    callback();
  }
};

export const author = (_: any, value: string, callback: any) => {
  if (value.trim() === "") {
    callback(new Error("文章作者不能为空"));
  } else {
    callback();
  }
};
