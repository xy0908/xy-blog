<template>
  <div class="about-me">
    <!-- 是否登录 -->
    <div class="is-login">
      <img class="bg" :src="loginImagesData?.background" alt="">
      <img class="photo" :src="loginImagesData?.photo" alt="">
      <span>{{ saying }}</span>
    </div>

    <!-- 关于我 -->
    <div class="about">
      <Title :title="`关于我`"></Title>
      <ul class="main">
        <li v-for="(item, index) in aboutData" :key="index">
          <i :class="item.icon"></i>
          <span>{{ item.text }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IloginImages } from "~types/index"

// 类 请求
const require = new Require();
// @ts-ignore
const { proxy } = getCurrentInstance();
const aboutData = useIndexStore().aboutData
// 登录图片
const loginImagesData = ref<null | IloginImages>(null)
// wellKnownSaying 
const saying = ref<string>("")

onMounted(async () => {
  // 是否登录 的背景图片
  {
    let { data } = await require.get(proxy.$url + '/index/loginDisplay')
    loginImagesData.value = data
  }

  // wellKnownSaying
  {
    let { data } = await require.get(proxy.$url + '/index/wellKnownSaying')
    saying.value = data
  }

})
</script>

<style scoped lang="less">
.about-me {

  // 是否登录
  .is-login {
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 250px;
    border-radius: 15px;
    box-shadow: 1px 0 6px #371e1e3d;
    background-color: #fff;

    .bg {
      width: 100%;
      height: 140px;
    }

    .photo {
      position: absolute;
      left: calc(50% - 35px);
      top: calc(220px / 2);
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 2px solid #f8e2e2;
      transition: all 1s;
      cursor: pointer;

      &:hover {
        transform: scale(1.3) rotate(360deg);
      }
    }

    span {
      box-sizing: border-box;
      position: absolute;
      bottom: 10px;
      padding: 0 10px;
      width: 100%;
      font-size: 18px;
      font-family: muKaiShu;
      font-weight: bold;
      text-align: center;
      color: #4f4e4e;
    }
  }

  // 关于我
  .about {
    margin-top: 20px;
    border-radius: 15px;
    box-shadow: 1px 0 6px #371e1e3d;
    background-color: #fff;

    .main {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;

      li {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 5px;
        margin: 10px;
        width: 95%;
        background-color: #F8F8F8;
        border-radius: 5px;
        color: #777;
        transition: all 1s;
        cursor: pointer;

        &:hover {
          box-shadow: 6px 4px 6px #371e1e3d;
        }

        i {
          font-size: 14px;
        }

        span {
          margin-left: 5px;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
