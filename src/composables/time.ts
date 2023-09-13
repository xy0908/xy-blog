// 获取时间
export default class Time {
  /**
   * @function
   * @description 获取时间的时候补零
   * @param { string } key 需要补零的数据
   * @returns { string }
  */
  addZero(key: number): string {
    if (key >= 1 && key <= 9) return `0${key}`
    else return `${key}`
  }

  // 获取当前时间
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

  /**
   * @function
   * @description 发布文章时,携带的时间
   * @returns { string }
  */
  getSpecificTime() {
    /**
       * @param { Dtae } date 当前的时间戳
       * @param { number } year 年
       * @param { number } month 月
       * @param { number } day 日
       * @param { number } hour 时
       * @param { number } minutes 分
       * @param { number } seconds 秒
      */
    let date = new Date();
    let year = date.getFullYear() // 年
    let month = date.getMonth() + 1; // 月
    let day = date.getDate(); // 日
    let hour = date.getHours(); // 时
    let minutes = date.getMinutes(); // 分
    let seconds = date.getSeconds() //秒

    return `${year}-${month}-${day} ${this.addZero(hour)}:${this.addZero(minutes)}:${this.addZero(seconds)}  `
  }
}
