<template>
  <div class="index">
    <div class="message">{{ message }}</div>
  </div>
  
</template>

<script setup lang="ts">
// @ts-ignore
const { proxy } = getCurrentInstance()
const require = new Require()
const message = ref(null)


onMounted(async()=>{
  let {data} = await require.get(proxy.$url+"/index/wellKnownSaying") 
  message.value = data
})
</script>

<style lang="less" scoped>
.index{
  z-index: -1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -50px;
  width: 100%;
  height: 100vh;
  background: url("http://localhost:1212/backgroundImages/index.jpg") no-repeat center/cover;

  .message{
    font-size: 45px;
    font-family:muKaiShu;
    font-weight: bold;
    letter-spacing: 15px;
    color: #fff;
  }
}
</style>
