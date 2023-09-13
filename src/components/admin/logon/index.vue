<template>
  <div class="publish-article-from-logon">
    <div class="publish-article-from-wrap">
      <!-- 登录表单 -->
      <div class="publish-article-from-logon-box">
        <!-- 标题 -->
        <h2 class="publish-article-from-logon-title">登录</h2>
        <el-form ref="formRef" :model="fromData">
          <el-form-item prop="userName" :rules="[{ required: true, message: `请输入您的账号`, trigger: `blur` }]">
            <el-input type="text" v-model="fromData.userName" placeholder="请输入您的账号" />
          </el-form-item>
          <el-form-item prop="password" :rules="[{ required: true, message: `请输入您的密码`, trigger: `blur` }]">
            <el-input type="text" v-model="fromData.password" placeholder="请输入您的密码" />
          </el-form-item>
          <el-form-item class="el-my-button">
            <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
            <el-button @click="resetForm(formRef)">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 侧边栏 -->
      <div class="publish-article-sidebar">
        <span>请先登录</span>
        <span>才可以发布文章</span>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import type { FormInstance } from 'element-plus';

/**
 * @description 发布文章数据
 * 
 * @param { string } key 开发环境env的token
 * @param { string } api 开发环境env的url
 * @param { string | null } bgImg 背景图片
 * @param { FormInstance } formRef 登录表单的Ref
 * @param { userName:string,password:string } fromData 表单绑定的数据
 * @param { Require } require 封装请求数据的类
 * 
*/
const key = import.meta.env.VITE_TOKEN;
const api = import.meta.env.VITE_URL;
const formRef = ref<FormInstance>()
const fromData = reactive({
  userName: "",
  password: "",
})
const require = new Require();

/**
 * @function
 * @description 请求登录
*/
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    // 验证规则通过 请求登录
    if (valid) {
      let { data } = await require.post(api + "/admin/logon", {
        rootName: fromData.userName,
        rootPass: fromData.password
      });

      if (data.code === 1) {
        ElMessage({
          message: data.value,
          type: 'success',
        });
        localStorage.setItem(key, data.token);
        location.reload();
      } else {
        ElMessage.error(data.value)
      }
    } else {
      // 验证规则不通过
      console.log('error submit!')
      return false
    }
  })
}

/**
 * @function
 * @description 清空登录框的账号和密码
*/
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped lang="less">
// 发布文章登录
.publish-article-from-logon {
  z-index: 99;
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  .publish-article-from-wrap {
    overflow: hidden;
    display: flex;
    width: 800px !important;
    height: 400px;
    border-radius: 20px;

    .publish-article-from-logon-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 100%;
      background-color: #fff;

      // 标题
      .publish-article-from-logon-title {
        margin: 20px 0;
        font-size: 40px;
      }

      // 表单
      .el-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100% !important;

        .el-form-item {
          width: 80% !important;
        }

        :deep(.el-my-button) {
          .el-form-item__content {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

      }
    }
  }

  // 侧边栏
  .publish-article-sidebar {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    border: 10px solid #fff;
    background: transparent;

    span {
      font-family: weizhi;
      font-size: 30px;
      text-shadow: 3px 2px 7px #f8aeae;
      color: #777;
    }
  }
}
</style>
