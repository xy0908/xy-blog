<template>
  <div class="contact" :style="{ background: `url(${bgData})` }">
    <!-- 邮件盒子 -->
    <div class="email-wrap">
      <!-- 头部 -->
      <div class="email-wrap-top"></div>
      <!-- 表单 -->
      <el-form ref="formRef" :model="fromData" :rules="rules" class="demo-ruleForm">
        <div class="from-top">
          <h3 class="title">留言</h3>
          <span class="describe">留下你的问题，我将尽力解决~</span>
        </div>
        <div class="form-wrap">
          <el-form-item prop="emailInfo">
            <el-input type="textarea" v-model="fromData.emailInfo" placeholder="请输入内容" />
          </el-form-item>
          <el-form-item prop="userName">
            <el-input type="text" v-model="fromData.userName" placeholder="请输入您的名称" />
          </el-form-item>
          <el-form-item prop="email">
            <el-input type="text" v-model="fromData.email" placeholder="请输入您的邮箱" />
          </el-form-item>
          <el-form-item class="el-my-button">
            <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
            <el-button @click="resetForm(formRef)">Reset</el-button>
          </el-form-item>
        </div>
      </el-form>
      <!-- 内容 -->
      <div class="email-wrap-content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { EmailInfo, UserName, Email } from "~rules/index";

const api = import.meta.env.VITE_URL;
const require = new Require();
const formRef = ref<FormInstance>()
const bgData = ref<string>("");

// 表单双向绑定数据
const fromData = reactive({
  emailInfo: "",
  userName: "",
  email: ""
})

// 验证规则触发条件
const rules = reactive({
  emailInfo: [{ validator: EmailInfo, trigger: "blur" }],
  userName: [{ validator: UserName, trigger: "blur" }],
  email: [{ validator: Email, trigger: "blur" }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      // 发送邮件
      let { data } = await require.post(api + `/contact/email`, {
        ...fromData,
        theme: "留言"
      });
      if (data.code === 1) {
        // 发送成功
        resetForm(formRef.value);
        ElNotification({
          title: '留言成功',
          message: data.value,
          type: 'success',
        })

      } else {
        // 发送失败
        ElNotification({
          title: '留言失败',
          message: data.value,
          type: 'error',
        })
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 获取背景图片
onMounted(async () => {
  let { data } = await require.get(api + "/contact/bg");
  bgData.value = data
})
</script>

<style scoped lang="less">
.contact {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat !important;
  background-position: center !important;
  background-size: cover !important;
  border-radius: 20px;
  user-select: none;

  .email-wrap {
    overflow: hidden;
    position: relative;
    width: 550px;

    &:hover {
      .email-wrap-top {
        margin-top: 180px;
      }

      .el-form {
        height: 500px;
        transform: translate(14px, -380px);
      }
    }

    .email-wrap-top {
      position: relative;
      width: 100%;
      height: 200px;
      transition: all .6s;
      background: url("../asset/email/head.png") no-repeat;
    }

    .el-form {
      box-sizing: border-box;
      overflow: hidden;
      position: absolute;
      display: flex;
      flex-direction: column;
      padding: 20px;
      width: 500px;
      font-family: weizhi;
      border-radius: 20px;
      border: 1px solid #eee;
      box-shadow: 0 2px 4px #0000001f, 0 0 6px #0000000a;
      transform: translate(14px, -10px);
      transition: all .6s;
      background-color: #fff;

      .from-top {
        display: flex;
        flex-direction: column;

        .title {
          font-size: 25px;
          font-weight: bold;
          color: #000;
        }

        .describe {
          margin-top: 10px;
          font-size: 18px;
        }
      }

      .form-wrap {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        padding: 10px;
        width: 100%;

        .el-form-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          :deep(.el-form-item__content) {
            width: 100% !important;

            .el-textarea__inner {
              height: 100px;
            }
          }
        }

        .el-my-button {
          :deep(.el-form-item__content) {
            justify-content: center !important;
          }
        }
      }
    }

    .email-wrap-content {
      position: relative;
      margin-top: -16px;
      width: 100%;
      height: 250px;
      background: url("../asset/email/body.png") no-repeat;
    }
  }
}
</style>
