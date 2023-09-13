<template>
  <div class="publish-type">
    <el-form ref="formRef" :model="fromData">
      <el-form-item label="文章类型" prop="type" :rules="[{ required: true, message: `请输入您的文章类型`, trigger: `blur` }]">
        <el-input type="text" v-model="fromData.type" placeholder="请输入您的文章类型" />
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

type T = {
  type: string
}

/**
 * @param { string } api 开发环境env的url
 * @param { Require } require 封装请求数据的类
 * @param { FormInstance } formRef 表单的ref
 * @param { T } fromData 表单绑定的数据
*/
const api = import.meta.env.VITE_URL;
const require = new Require();
const formRef = ref<FormInstance>()
const fromData = reactive<T>({
  type: "",
})


/**
 * @function
 * @description 请求登录
*/
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    // 验证规则通过 请求登录
    if (valid) {
      let { data } = await require.post(api + "/admin/publishType", {
        ...fromData
      })

      // 提交成功
      if (data.code === 1) {
        ElMessage({
          message: data.value,
          type: 'success',
        });
        resetForm(formRef.value);
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
:deep(.el-form-item__content) {
  .el-input {
    width: 250px !important;
  }
}
</style>
