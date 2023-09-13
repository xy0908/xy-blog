<template>
  <div class="publish-trends">
    <el-form ref="formRef" :model="fromData">
      <el-form-item label="发布动态" prop="trends" :rules="[{ required: true, message: `请输入您的动态`, trigger: `blur` }]">
        <el-input type="textarea" v-model="fromData.trends" placeholder="请输入您的动态" />
      </el-form-item>
      <el-form-item class="el-my-button">
        <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
        <el-button @click="resetForm(formRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import Time from '~composables/time';

type T = {
  trends: string;
  time: string;
}

/**
 * @param { string } api 开发环境env的url
 * @param { Require } require 封装请求数据的类
 * @param { Time } time 封装获取时间的类
 * @param { FormInstance } formRef 表单的ref
 * @param { T } fromData 表单绑定的数据
*/
const api = import.meta.env.VITE_URL;
const require = new Require();
const time = new Time();
const formRef = ref<FormInstance>()
const fromData = reactive<T>({
  trends: "",
  time: ""
})


/**
 * @function
 * @description 发布最新的动态
*/
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    // 验证规则通过 请求登录
    if (valid) {
      fromData.time = time.getSpecificTime();
      let { data } = await require.post(api + "/newTrends/setNewTrends", {
        ...fromData
      })

      // 提交成功
      if (data.code === 1) {
        ElNotification({
          title: '发布成功',
          message: data.value,
          type: 'success',
        })
        resetForm(formRef.value);
      } else {
        ElNotification({
          title: '发布失败',
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
 * @description 清空登录框的账号和密码
*/
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<style scoped lang="less">
:deep(.el-textarea) {
  width: 400px !important;
}

:deep(.el-textarea__inner) {
  height: 150px;
}
</style>
