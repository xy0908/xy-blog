// 匹配 中文 或者 英文
let EmailRegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

// 邮箱信息验证规则
export function EmailInfo(_:any,value:any,callback:any){  
  if(value.trim() === ""){
    callback(new Error("留言的信息不能为空~"));
  }else{
    callback();
  }
}

// 名称验证规则
export function UserName(_:any,value:any,callback:any){
  if(value.trim() === ""){
    callback(new Error("您的昵称不能为空~"));
  }else{
    callback();
  } 
}

// 邮件验证规则
export function Email(_:any,value:any,callback:any){
  if (value.trim() === "") {
    callback(new Error('您的邮件不能为空'))
  } else if (!EmailRegExp.test(value)) {
    callback(new Error("请输入正确的邮箱格式"))
  } else {
    callback()
  } 
}
