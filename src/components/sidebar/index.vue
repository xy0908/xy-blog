<template>
  <div class="sidebar">
    <!-- nav -->
    <ul class="sidebar-ul">
      <li class="sidebar-li" v-for="item in nav" :key="item.name" @click="pageJump(item.name)">
        <div class="icon">
          <i :class="item.icon"></i>
        </div>
      </li>
    </ul>

  </div>
</template>

<script setup lang="ts">
import navData from "~/types/route"

/**
 * @param { Router } router vue的路由实例
 * @param { Array<navData> } nav 接收父组件传递的值 侧边栏的数据
*/
const router = useRouter()
const { nav } = defineProps<{
  nav: navData[]
}>()


/**
 * @function
 * @description 页面跳转 
 * 
 * @param { string } name 跳转页面的名称
 * 
 * 如果跳转页面是首页 进行特殊处理
*/
const pageJump = (name: string): void => {
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
  overflow-y: scroll;
  box-sizing: border-box;
  position: sticky;
  top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  width: 200px;
  height: 100%;

  .sidebar-ul {
    overflow: hidden;
    z-index: 10;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 70%;
    height: 80%;
    border-radius: 20px;

    &::after {
      content: "";
      position: absolute;
      z-index: -1;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.5;
      background: #ffffff;

    }

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

      .icon {
        .iconfont {
          font-size: 30px;
          font-weight: bold;
          color: #000;
          transition: all 0.4s;
        }

        &:hover {
          .iconfont {
            font-size: 45px;
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
