<template>
  <div class="publish-type">
    <el-form ref="formRef" :model="fromData">
      <!-- 推荐书籍名称 -->
      <el-form-item label="书籍名称" prop="bookName" :rules="[{ required: true, message: `请输入您的推荐的书籍名称`, trigger: `blur` }]">
        <el-input type="text" v-model="fromData.bookName" placeholder="请输入您的推荐的书籍名称" />
      </el-form-item>
      <!-- 推荐书籍图片 -->
      <el-form-item label="上传书籍封面" class="change-img">
        <el-upload ref="uploadImgRef" action="/api/recommendBooks/storeImg" :on-success="handleSuccessImg" :limit="1"
          :multiple="false" drag class="upload-demo">
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">将图片拖到此处或<em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">【注:上传图片,只能上传一个嗷~~】</div>
          </template>
        </el-upload>
      </el-form-item>
      <!-- 推荐书籍的理由 -->
      <el-form-item label="推荐理由" prop="reason" :rules="[{ required: true, message: `请输入您推荐的理由`, trigger: `blur` }]">
        <el-input type="textarea" v-model="fromData.reason" placeholder="请输入您推荐的理由" />
      </el-form-item>
      <el-form-item class="el-my-button">
        <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
        <el-button @click="resetForm(formRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import Time from '~composables/time';
import { UploadFilled } from "@element-plus/icons-vue";
import type { FormInstance } from 'element-plus';

type T = {
  bookName: string;
  img: string;
  reason: string;
  time: string
}

/**
 * @param { string } api 开发环境env的url
 * @param { Require } require 封装请求数据的类
 * @param { FormInstance } formRef 表单的ref
 * @param { any } uploadImgRef 上传图片的ref
 * @param { T } fromData 表单绑定的数据
 * @param { Time } time 封装获取时间的类
*/
const api = import.meta.env.VITE_URL;
const require = new Require();
const formRef = ref<FormInstance>()
const uploadImgRef = ref<any>()
const fromData = reactive<T>({
  bookName: "",
  img: "",
  reason: "",
  time: ""
});
const time = new Time()

/**
 * @function
 * @description 书籍封面
 * @returns { response.data } 上传完成之后返回的数据
*/
const handleSuccessImg = (response: any) => {
  fromData.img = response.data;
};

/**
 * @function
 * @description 发送推荐书籍请求
*/
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    // 验证规则通过 发送推荐书籍请求
    if (valid) {
      fromData.time = time.getNowTime();
      let { data } = await require.post(api + "/recommendBooks/submitToDataBank", {
        ...fromData
      })

      // 提交成功
      if (data.code === 1) {
        ElNotification({
          title: '推荐书籍',
          message: data.value,
          type: 'success',
        })
        resetForm(formRef.value);
      } else {
        ElNotification({
          title: '推荐书籍',
          message: data.value,
          type: 'error',
        })
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
 * @description 清空推荐书籍和上传书籍图片
*/
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  if (formRef.value) {
    formRef.value.resetFields();
    uploadImgRef.value.clearFiles();
    fromData.img = "";
    fromData.time = "";
  }
}

</script>

<style scoped lang="less">
:deep(.el-form-item__content) {
  .el-input {
    width: 250px !important;
  }
}

:deep(.el-textarea) {
  width: 300px !important;
}

:deep(.el-textarea__inner) {
  height: 150px;
}
</style>
