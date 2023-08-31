<template>
  <div class="music">
    <!-- 背景 防止视频加载缓慢 页面留白 -->
    <video class="video-bg" :src="bg" autoplay lopp muted :poster="videoBg"></video>
    <!-- 内容 -->
    <div class="video-content">
      <!--  -->
    </div>
  </div>
</template>

<script setup lang="ts">
import bg from "../../public/music/bg.mp4"
import videoBg from "../../public/music/bg.png"
</script>


<style scoped lang="less">
.music {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100vh;

  .video-bg {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100vh;
    width: auto;
    height: auto;
    object-fit: cover;
    transform: scale(1.2);
    filter: blur(5px);
  }

  .video-content {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }
}
</style>
