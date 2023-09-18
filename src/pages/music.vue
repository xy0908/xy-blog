<template>
  <div class="music">
    <!-- 内容 -->
    <div class="content">
      <div class="content-wrap">
        <!-- 图片 -->
        <div class="content-img">
          <div class="content-img-left"
            :style="{ background: `url(${musicStore.nowPlayMusic.picUrl}) no-repeat center/cover` }">
          </div>
          <div class="content-img-right">
            <img :src="changepian" alt="">
          </div>
        </div>
        <!-- 信息 -->
        <div class="content-info">
          <h2 class="title">{{ musicStore.nowPlayMusic.name }}</h2>
          <canvas ref="canvasRef" class="canvas" id="canvas"></canvas>
          <handleButton @changeMusicKey="changeMusicKey" @playPause="playPause">
          </handleButton>
          <audio ref="audioRef" @play="onPlay" @ended="ended" :src="musicStore.nowPlayMusic.url" controls
            crossorigin="anonymous">
          </audio>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import handleButton from "~components/music/handleButton.vue";
import changepian from "~asset/changpian.png";

const musicStore = useMusicStore();
// 音频可视化
const isInit = ref<boolean>(false);
const canvasRef = ref<any>(null);
const audioRef = ref<any>(null);
const dataArray = ref<any>(null);
const analyser = ref<any>(null);

// 音频的步骤 音频源 ==》分析器 ===》输出设备
const onPlay = () => {
  // 创建canvas上下文
  const ctx = canvasRef.value.getContext("2d");

  if (isInit.value) return;

  // 初始化
  //创建一个音频上下文
  const audCtx = new AudioContext();

  //创建音频源节点
  const source = audCtx.createMediaElementSource(audioRef.value);

  //拿到分析器节点
  analyser.value = audCtx.createAnalyser();
  // 时域图变换的窗口大小（越大越细腻）默认2048
  analyser.value.fftSize = 512;

  // 创建一个数组，接受分析器分析回来的数据
  // 数组每一项都是一个整数 接收数组的长度，因为快速傅里叶变换是对称的，所以除以2
  dataArray.value = new Uint8Array(analyser.value.frequencyBinCount);

  // 将音频源节点链接到输出设备，否则会没声音哦。
  source.connect(analyser.value);
  // 把分析器节点了解到输出设备
  analyser.value.connect(audCtx.destination);

  isInit.value = true;

  // 绘制，把分析出来的波形绘制到canvas上
  function draw() {
    requestAnimationFrame(draw);

    if (canvasRef.value) {
      // 清空画布
      const { width, height } = canvasRef.value;
      ctx.clearRect(0, 0, width, height);

      // 先判断音频组件有没有初始化
      if (!isInit.value) return;

      // 让分析器节点分析出数据到数组中
      analyser.value.getByteFrequencyData(dataArray.value);
      const len = dataArray.value.length / 2.5;

      // 每一个的宽度
      const barWidth = width / len / 2;
      ctx.fillStyle = "#78C5F7";

      for (let i = 0; i < len; i++) {
        const data = dataArray.value[i]; // <256
        const barHeight = (data / 255) * height; // 每一个的高度
        const x1 = i * barWidth + width / 2;
        const x2 = width / 2 - (i + 1) * barWidth;
        const y = height - barHeight;
        ctx.fillRect(x1, y, barWidth - 2, barHeight);
        ctx.fillRect(x2, y, barWidth - 2, barHeight);
      }
    }
  }
  draw();
}
// 播放暂停
const playPause = () => {
  musicStore.changeIcon();
  musicStore.playPause(audioRef.value);
}

const ended = () => {
  changeMusicKey(2);
}

// 改变音乐key值
const changeMusicKey = (i: number) => {
  // i = 1 上一首
  // i = 2 下一首
  switch (i) {
    case 1:
      if (musicStore.key === 0) {
        musicStore.key = musicStore.music.length;
      }
      musicStore.key--;
      break;
    case 2:
      if (musicStore.key === musicStore.music.length - 1) {
        musicStore.key = 0
      }
      musicStore.key++
      break
  }
  musicStore.playPauseHandle(audioRef.value);
}

// 路由页面离开的时候触发 把图标改变为暂停图标
onBeforeRouteLeave((to, form, next) => {
  musicStore.isPlay = {
    text: "iconfont icon-bofang",
    bol: false
  }
  next();
})

onMounted(() => {
  canvasRef.value = canvasRef.value;
  audioRef.value = audioRef.value;
  musicStore.getAllMusic();
})

// 页面销毁 清空localStorage
onUnmounted(() => {
  window.localStorage.removeItem("music");
})
</script>


<style scoped lang="less">
.music {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100vh;

  .content {
    z-index: 10;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    .content-wrap {
      display: flex;

      .content-img {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 400px;

        .content-img-left {
          width: 200px;
          height: 200px;
          box-shadow: 1px 0 6px #371e1e3d;
        }

        .content-img-right {
          z-index: -1;
          overflow: hidden;
          position: absolute;
          left: -90px;
          position: relative;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          box-shadow: 1px 0 6px #371e1e3d;


          img {
            position: absolute;
            left: 4px;
            top: 14px;
            transform: scale(2.3);
            border-radius: 50%;
          }
        }
      }

      .content-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .title {
          font-size: 60px;
          font-weight: bold;
          font-family: weizhi;
          color: #000;
        }

        .canvas {
          width: 600px;
          height: 200px;
        }

        audio {
          position: fixed;
          opacity: 0;
          left: 0;
        }
      }
    }
  }
}
</style>
