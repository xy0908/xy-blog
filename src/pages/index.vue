<template>
  <div class="index">
    <div class="index-top">
      <el-carousel :interval="5000" height="450px" arrow="always">
        <el-carousel-item v-for="(item, index) in carousel" :key="index">
          <img :src="item.img" alt="carousel">
          <div class="info">{{ item.title }}</div>
          <button class="button">READ MORE</button>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
const { proxy } = getCurrentInstance()

type carouselType = {
  img: string;
  title: string
}

const require = new Require()
const carousel = ref<null | carouselType[]>(null)

onMounted(async () => {
  let { data } = await require.get(proxy.$url + "/index/carousel")
  carousel.value = data
})
</script>

<style lang="less" scoped>
.index {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 100%;
  height: 100%;
  background: #F4F5F8;

  .index-top {
    display: flex;

    .el-carousel {
      overflow: hidden;
      width: 55%;
      border-radius: 40px;

      .el-carousel__item {

        &:hover {
          .button {
            left: 80px;
          }
        }

        img {
          width: 100%;
          height: 100%;
        }

        .info {
          position: absolute;
          bottom: 100px;
          left: 80px;
          font-size: 30px;
          color: #fff;

          &::after {
            content: "推荐文章";
            display: flex;
            position: absolute;
            top: -40px;
            left: 10px;
            font-size: 17px;
          }

          &::before {
            content: "";
            position: absolute;
            left: -25px;
            top: -40px;
            width: 0px;
            height: 0px;
            border-left: 15px solid transparent;
            border-right: 15px solid #FF2E63;
            border-bottom: 15px solid transparent;
            transform: rotate(45deg);
          }
        }

        .button {
          box-sizing: border-box;
          position: absolute;
          bottom: 40px;
          left: -150px;
          padding: 10px 20px;
          color: #fff;
          border-radius: 20px;
          border: none;
          background-image: linear-gradient(90deg, #08D9D6, #EAEAEA, #08D9D6);
          background-size: 300%;
          animation: buttonBG 8s linear infinite;
          transition: all 1s;
          cursor: pointer;
        }

        // button动画
        @keyframes buttonBG {
          0% {
            background-position: 0%;
          }

          100% {
            background-position: 300%;
          }
        }
      }
    }
  }
}
</style>
