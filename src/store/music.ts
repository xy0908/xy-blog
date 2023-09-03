import { acceptHMRUpdate, defineStore } from "pinia";
import { Imusic } from "~types/music";

const require = new Require();

export const useMusicStore = defineStore("music", () => {
  /**
   * @description 音乐组件定义的一些数据
   * 
   * @param { Array<Imusic> } music 所有的音乐
   * @param { number } key 播放的key值
   * @param { Imusic } nowPlayMusic 当前播放的音乐
   * @param { { text:String; bol:Boolean } }  isPlay 暂停|播放 的icon
   * 
  */
  const key = ref<number>(0);
  const music = ref<Array<Imusic>>([
    {
      name: "ぱられループ を歌ってみた (Jeku remix)",
      picUrl: "http://p1.music.126.net/_rXd3rdT_EYSLMjGMA2wHg==/18561955301922084.jpg",
      url: "http://m8.music.126.net/20230903172015/e70b55445bc023f9b2d429c81efcb535/ymusic/b902/7777/7504/3fa3fb95ad3135304461f00e796d65d8.mp3"
    }
  ]);
  const nowPlayMusic = ref<Imusic>(music.value[key.value]);
  const isPlay = ref({
    text: "iconfont icon-bofang",
    bol: false
  });

  //------------------------------------------------------------------------;

  /**
   * @function
   * @description 初始化数据 把key值初始化 和 当前播放的音乐初始化
  */
  const init = () => {
    key.value = Number(localStorage.getItem("key")) || 0;
    nowPlayMusic.value = music.value[key.value];
  }

  /**
   * @function
   * @description 设置localStorage
  */
  const setKeyLocalStorage = () => {
    localStorage.setItem("key", `${key.value}`);
  };

  /**
   * @function
   * @description 获取音乐
  */
  const getAllMusic = async () => {
    if (localStorage.getItem("music")) {
      let data = eval(`${localStorage.getItem("music")}`);
      music.value = data;
    } else {
      let { data } = await require.get('/api' + "/music/getMusic");
      music.value = data;
      localStorage.setItem("music", JSON.stringify(data));
    };

    init();
  }

  /**
   * @function
   * @description 
   *    1.上一首下一首音乐切换
   *    2.改变当前播放的音乐
   *    3.播放音乐
   * @param { any } audio 音乐的dom元素
  */
  const playPauseHandle = (audio: any) => {
    // 图标改变为暂停
    isPlay.value = {
      text: "iconfont icon-bofang",
      bol: false
    }

    // 改变当前播放的音乐
    nowPlayMusic.value = music.value[key.value];

    // 图标改变为播放
    isPlay.value = {
      text: "iconfont icon-zanting",
      bol: true
    }

    // 播放音乐
    setTimeout(() => {
      playPause(audio)
      setKeyLocalStorage();
    }, 1000)
  };

  /**
   * @function
   * @description 改变icon
  */
  const changeIcon = () => {
    if (isPlay.value.bol) {
      isPlay.value = {
        text: "iconfont icon-bofang",
        bol: false
      }
    } else {
      isPlay.value = {
        text: "iconfont icon-zanting",
        bol: true
      }
    }
    setKeyLocalStorage();
  };

  /**
   * @function
   * @description 音乐的暂停和播放
   * @param { any } audio audio的dom元素
  */
  const playPause = (audio: any) => {
    if (isPlay.value.bol) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  return {
    key, isPlay, music, nowPlayMusic,
    setKeyLocalStorage, changeIcon, playPause, playPauseHandle, getAllMusic
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMusicStore, import.meta.hot))
}
