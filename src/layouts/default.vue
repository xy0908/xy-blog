<template>
  <div class="default">
    <!-- 侧边栏 -->
    <sidebar :nav="nav" />

    <!-- 路由渲染出口 -->
    <div class="route">
      <router-view />
    </div>

    <!-- 滚动条 -->
    <div class="scrollbar" ref="scrollbarRef" @click="backToTop">
    </div>
  </div>
</template>

<script setup lang="ts">
import sidebar from "~components/sidebar/index.vue"

const { nav } = useRouterStore()
const scrollbarRef = ref<any>(null)

// 滚动条
const scroll = () => {
  const scrollDistance = document.documentElement.scrollTop || document.body.scrollTop || 0;

  if (scrollDistance >= 150) {
    scrollbarRef.value.style.top = "-20vh"
  } else {
    scrollbarRef.value.style.top = "-110vh"
  }
}

// 回到顶部
const backToTop = () => {
  document.documentElement.scrollTop = 0;
}

//
onMounted(() => {
  scrollbarRef.value = scrollbarRef.value;

  // 监听页面滚动
  if (scrollbarRef.value !== null) { window.addEventListener("scroll", scroll, true) }
})
</script>

<style scoped lang="less">
.default {
  overflow-y: scroll;
  position: relative;
  display: flex;
  width: 100%;

  .route {
    flex-grow: 1;
  }

  // 滚动条
  .scrollbar {
    position: absolute;
    z-index: 10;
    top: -110vh;
    right: 10px;
    width: 80px;
    height: 100vh;
    transition: all 1s;
    background: url("../asset/scrollbar.png") no-repeat center/cover;
    cursor: pointer;
  }
}
</style>
