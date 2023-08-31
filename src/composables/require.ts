// 请求
import axios from "axios";

export class Require{
  async get(url:string,data?:any){
    let result = await axios({
      method:"get",
      url,
      params:{
        data
      }
    })
    return result
  }

  async post(url:string,data?:any){
    let result = await axios({
      method:"post",
      url,
      data:{
        ...data
      }
    })
    return result
  }
}
