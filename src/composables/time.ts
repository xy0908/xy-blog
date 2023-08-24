// 获取时间
export default class Time{
  // 补0
  addZero(s:number) {
    return s < 10 ? ('0' + s) : s;
  }

  // 获取时间
  getNowTime() {
    let date = new Date();

    //时 getHours()：(0 ~ 23)
    let hour = date.getHours();
    //分 getMinutes()： (0 ~ 59)
    let minute = date.getMinutes();
    //秒 getSeconds()：(0 ~ 59)
    let second = date.getSeconds();

    let time = this.addZero(hour) + ':' + this.addZero(minute) + ':' + this.addZero(second);
    
    return time;
  }
}
