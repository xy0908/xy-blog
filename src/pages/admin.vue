<template>
  <div class="admin">
    <!-- 管理员的背景 -->
    <div class="admin-bg"></div>
    <!-- 发布文章登录 -->
    <template v-if="logonBol !== true">
      <logon></logon>
    </template>
    <!-- 发布文章 -->
    <template v-else>
      <publish />
    </template>
  </div>
</template>


<script setup lang="ts">
import logon from '~components/admin/logon/index.vue';
import publish from '~components/admin/index.vue';

/**
 * @description 发布文章数据
 * 
 * @param { string } key 开发环境env的token
 * @param { string } api 开发环境env的url
 * @param { any } logonBol true:当前登录成功 false:当前未登录
 * @param { string | null } bgImg 背景图片
 * @param { Require } require 封装请求数据的类
*/
const key = import.meta.env.VITE_TOKEN;
const api = import.meta.env.VITE_URL;
const logonBol = ref<any>(null)
const require = new Require();


/**
 * @function
 * @description 自动登录
*/
const automaticLogon = async () => {
  /**
   * @param { string } token 有值表示当前存在token null不存在
  */
  let token = localStorage.getItem(key);
  if (token) {
    let { data } = await require.post(api + "/admin/automaticLogon", { token });

    if (data.code === 1) {
      logonBol.value = true
      ElNotification({
        title: '自动登录',
        message: data.value,
        type: 'success',
      })
    } else {
      logonBol.value = false
      ElNotification({
        title: '自动登录',
        message: data.value,
        type: 'error',
      })
    }

  }
}


onMounted(async () => {
  automaticLogon();
})
</script>


<style scoped lang="less">
.admin {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  // 背景图片
  .admin-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(2px);
  }
}
</style>
