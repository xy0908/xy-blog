<template>
  <div class="sidebar">
    <!-- logo -->
    <div class="sidebar-title">
      <img :src="logoImg" alt="logo">
    </div>
    <!-- nav -->
    <ul class="sidebar-ul">
      <li class="sidebar-li" v-for="item in props.nav" :key="item.name" @mouseenter="mouseenter(item.name)"
        @mouseleave="mouseleave(item.name)" @click="pageJump(item.name)">
        <!-- isActivation === true 显示字体 -->
        <template v-if="item.isActivation">
          <span class="text" :style="isActivationNav(item.isActivation)">{{ item.text }}</span>
        </template>
        <!-- isActivation === false 显示图标 -->
        <template v-else-if="item.isActivation === false">
          <div class="icon">
            <span :class="item.icon"></span>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import navData from "~/types/route"
import logoImg from "~asset/logo.png"

const router = useRouter()

// 接收父组件传递的值
const props = defineProps<{
  nav: navData[]
}>()

// 是否激活
const isActivationNav = (key: boolean) => {
  if (key) return `border-right: 3px solid`
}

// 移入
const mouseenter = (key: string) => {
  const r_ = router.currentRoute.value.name

  props.nav.forEach(item => {
    item.isActivation = false
    if (item.name === key) {
      item.isActivation = true
    }
    if (item.name === r_) {
      item.isActivation = true
    }
  })
}

// 移出
const mouseleave = (key: string) => {
  const r_ = router.currentRoute.value.name
  props.nav.forEach(item => {
    item.isActivation = false
    if (item.name === r_) {
      item.isActivation = true
    }
  })
}

// 页面跳转
const pageJump = (name: string): void => {
  // 判断如果回到首页 特殊处理
  if (name === "index") {
    // @ts-ignore
    document.startViewTransition(() => {
      router.push({ path: "/" })
    })
  } else {
    // @ts-ignore
    document.startViewTransition(() => {
      router.push(name)
    })
  }
}
</script>

<style scoped lang="less">
.sidebar {
  z-index: 2000;
  overflow-y: scroll;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  width: 200px;
  height: 100%;
  background-color: #fff;

  .sidebar-title {
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    padding: 16px;
    width: 80%;
    box-shadow: 0 4px 10px #9ebddcc4;
    background: #fff;
    border-radius: 18px;
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
      box-shadow: 0 4px 10px #34587dc4;
    }

    &::after {
      z-index: 1;
      content: "XiaoYang";
      position: absolute;
      right: 4px;
      top: 8px;
      font-size: 28px;
      font-family: weizhi;
      font-weight: bold;
      color: #555252;
      background: #fff;
    }
  }

  .sidebar-ul {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    width: 100%;

    .sidebar-li {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 0;
      width: 100%;
      height: 100px;
      font-size: 22px;
      font-weight: bold;
      color: #000;
      cursor: pointer;

      .text {
        position: relative;
        width: 100%;
        height: 70%;
        text-align: center;
        line-height: 70px;

        &::after {
          content: ".";
          position: absolute;
          bottom: -10px;
          left: 95px;
          font-size: 30px;
        }
      }

      .icon {
        .iconfont {
          font-size: 30px;
          color: #8f8d8d;
        }

        .children {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          position: absolute;
          right: -30px;
          width: 100px;
          padding: 10px 0;
          border-radius: 4px;
          box-shadow: 0 0 6px #0000001a;
          background: #fff;

          .children-text {
            height: 30px;
            font-size: 18px;
            font-weight: 500;
            color: red;
          }
        }
      }
    }
  }
}

.sidebar::-webkit-scrollbar {
  display: none;
}
</style>
