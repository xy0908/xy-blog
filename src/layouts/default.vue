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
    scrollbarRef.value.style.position = "fixed"
    scrollbarRef.value.style.top = "-100px"
  } else {
    scrollbarRef.value.style.position = "absolute"
    scrollbarRef.value.style.top = "-120vh"
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
  position: relative;
  display: flex;
  width: 100%;

  .route {
    flex-grow: 1;
    margin-left: 200px;
    background: #efefef;
  }

  // 滚动条
  .scrollbar {
    position: absolute;
    z-index: 10;
    top: -50px;
    right: 10px;
    width: 80px;
    height: 110vh;
    transition: all 1s;
    background: url("../asset/scrollbar.png") no-repeat center/cover;
    cursor: pointer;
  }
}
</style>
