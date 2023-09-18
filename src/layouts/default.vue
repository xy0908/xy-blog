<template>
  <div class="default">
    <!-- 视频背景 -->
    <video class="video-bg" :src="bg" autoplay lopp muted :poster="videoBg"></video>

    <!-- 侧边栏 -->
    <sidebar :nav="nav" />

    <!-- 路由渲染出口 -->
    <div class="route">
      <router-view />
    </div>

    <!-- 滚动条 -->
    <div class="scrollbar" ref="scrollbarRef" @click="backToTop"></div>
  </div>
</template>

<script setup lang="ts">
import sidebar from "~components/sidebar/index.vue";
import bg from "../../public/music/bg.mp4";
import videoBg from "../../public/music/bg.png";

/**
 * @param { Store } nav 路由的仓库
 * @param { any } scrollbarRef 滚动条的ref
*/
const { nav } = useRouterStore()
const scrollbarRef = ref<any>(null)

/**
 * @function
 * @description 滚动条滚动的距离
*/
const scroll = () => {
  const scrollDistance = document.documentElement.scrollTop || document.body.scrollTop || 0;

  if (scrollDistance >= 150) {
    scrollbarRef.value.style.position = "fixed"
    scrollbarRef.value.style.top = "-100px"
  } else {
    scrollbarRef.value.style.position = "absolute"
    scrollbarRef.value.style.top = "-120vh"
  }
}

/**
 * @function
 * @description 回到顶部
*/
const backToTop = () => {
  document.documentElement.scrollTop = 0;
}

// 监听页面滚动
onMounted(() => {
  scrollbarRef.value = scrollbarRef.value;
  if (scrollbarRef.value !== null) { window.addEventListener("scroll", scroll, true) }
})
</script>

<style scoped lang="less">
.default {
  position: relative;
  display: flex;

  // 视频背景
  .video-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    object-fit: cover;
    background: red;
    transform: scale(1.2);
  }

  .route {
    flex-grow: 1;
    view-transition-name: router;
  }

  // 滚动条
  .scrollbar {
    position: absolute;
    z-index: 10;
    top: -120vh;
    right: 10px;
    width: 80px;
    height: 110vh;
    transition: all 1s;
    background: url("../asset/scrollbar.png") no-repeat center/cover;
    cursor: pointer;
  }
}
</style>
