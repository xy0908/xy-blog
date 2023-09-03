<template>
  <div class="handleButton">
    <!-- 上一首 -->
    <span @click="changeMusicKey(1)">
      <i class="iconfont icon-shangyishoushangyige"></i>
    </span>
    <!-- 播放 暂停 -->
    <span @click="playPause">
      <i :class="musicStore.isPlay.text"></i>
    </span>
    <!-- 下一首 -->
    <span @click="changeMusicKey(2)">
      <i class="iconfont icon-xiayigexiayishou"></i>
    </span>
    <!-- 所有音乐 -->
    <!-- <span>
      <i class="iconfont icon-qita"></i>
    </span> -->
  </div>
</template>


<script setup lang="ts">
const emit = defineEmits(['playPause', "changeMusicKey"])
const musicStore = useMusicStore();

// 播放暂停
const playPause = () => {
  emit("playPause")
}

// 改变
const changeMusicKey = (i: number) => {
  emit("changeMusicKey", i)
}
</script>


<style scoped lang="less">
.handleButton {
  display: flex;
  justify-content: center;
  width: 100%;

  span {
    margin: 0 20px;

    .iconfont {
      font-size: 40px;
      color: #000;
      cursor: pointer;

      &:hover {
        color: #2d2d2d;
      }
    }
  }
}
</style>
