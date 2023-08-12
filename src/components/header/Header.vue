<template>
  <!-- 0px 0px 5px 3px #eee border-b-1px border-style-solid border-color-#eee-->
  <div class="
    flex items-center justify-between
    w-100% h-50px bg-#3b3a3a opacity-50">
    <!-- 设置最大宽度 居中 -->
    <div class="flex items-center justify-between m-auto w-100% max-w-1400px">
      <!-- logo -->
      <img class="w-150px h-50px line-height-50px cursor-pointer" draggable="false" :src="logoImg" alt="">
      <!-- nav -->
      <ul class="
      flex items-center
      h-50px
      text-20px" style="font-family: weizhi;">
        <li class="m-20px font-500 text-center c-#fff cursor-pointer" v-for="item in nav" :key="item.name"
          :style="isActivation(item.isActivation)" @click="pageJump(item.name)">
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import logoImg from "~asset/logo.png"

const { nav, isActivation } = useRouterStore()
const router = useRouter()

// 监听路由地址是否发生改变
watch(router.currentRoute, newValue => {
  nav.forEach(item => {
    item.isActivation = false;
    if (newValue.name === item.name) {
      item.isActivation = true;
    }
  })
}, {
  immediate: true
})

// 页面跳转
const pageJump = (name: string): void => {
  // 判断如果回到首页 特殊处理
  if (name === "index") {
    router.push({ path: "/" })
  } else {
    router.push(name)
  }

}
</script>
