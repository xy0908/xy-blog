<template>
  <div class="publish-article">
    <el-form ref="formRef" :model="publishArticleData" :rules="rules" label-position="right" label-width="auto">
      <!-- 文章类型 -->
      <el-form-item label="文章类型" prop="type">
        <el-select v-model="publishArticleData.type" placeholder="选择文章的类型">
          <el-option v-for="item in tableData" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <!-- 文章标题 -->
      <el-form-item label="文章标题" prop="title">
        <el-input type="text" v-model="publishArticleData.title" placeholder="请输入文章的标题" />
      </el-form-item>
      <!-- 文章描述 -->
      <el-form-item label="文章描述" prop="describe">
        <el-input type="text" v-model="publishArticleData.describe" placeholder="请输入文章的描述" />
      </el-form-item>
      <!-- 文章作者 -->
      <el-form-item label="作者" prop="author">
        <el-input type="text" v-model="publishArticleData.author" placeholder="请输入文章的作者" />
      </el-form-item>
      <!-- 上传封面 -->
      <!-- 
        limit:允许上传文件的最大数量
        action:后端地址 就是上传的地址
        on-success:文件上传成功时的钩子
        multiple:是否支持多选文件
      -->
      <el-form-item label="上传封面" class="change-img">
        <el-upload ref="uploadImgRef" action="/api/admin/storeImg" :on-success="handleSuccessImg" :limit="1"
          :multiple="false" drag class="upload-demo">
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">将图片拖到此处或<em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">【注:上传图片,只能上传一个嗷~~】</div>
          </template>
        </el-upload>
      </el-form-item>
      <!-- 上传文章 -->
      <el-form-item label="上传内容" class="change-img">
        <el-upload ref="uploadFileRef" action="/api/admin/storeFile" :on-success="handleSuccessFile" :limit="1"
          :multiple="false" drag class="upload-demo">
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">将文件拖到此处或<em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">【注:上传md文件,只能上传一个嗷~~】</div>
          </template>
        </el-upload>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script setup lang="ts">
import type { FormInstance, UploadFile, UploadFiles } from 'element-plus';
import { type, title, describe, author } from "~rules/publishArticle";
import { UploadFilled } from "@element-plus/icons-vue";
import { IPublishArticleType } from "~types/admin";
import { Itable } from "~types/teaParty"

/**
 * @param { string } api 开发环境env的url
 * @param { Require } require 封装请求数据的类
 * @param { FormInstance } formRef 发布文章的ref
 * @param { any } uploadImgRef 上传图片的ref
 * @param { any } uploadFileRef 上传md文件的ref
 * @param { IPublishArticleType } publishArticleData 发布文章数据
 * @param { Array<string> } tableData 发布文章的标签
 * @param { any } rules 表单验证规则
 * @param { Store } admin 管理员仓库
*/
const api = import.meta.env.VITE_URL;
const require = new Require();
const formRef = ref<FormInstance>();
const uploadImgRef = ref<any>()
const uploadFileRef = ref<any>()
const publishArticleData = reactive<IPublishArticleType>({
  type: "",
  title: "",
  describe: "",
  author: "",
  img: "",
  file: "",
  time: "",
})
const tableData = ref<Array<string>>([]);
const rules = reactive({
  type: [{ validator: type, trigger: "blur" }],
  title: [{ validator: title, trigger: "blur" }],
  describe: [{ validator: describe, trigger: "blur" }],
  author: [{ validator: author, trigger: "blur" }],
})
const admin = useAdminStore();


/**
 * @function
 * @description 文章封面
 * @returns { response.data } 上传完成之后返回的数据
*/
const handleSuccessImg = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  publishArticleData.img = response.data;
};

/**
 * @function
 * @description 文章上传
 * @returns { response.data } 上传完成之后返回的数据
*/
const handleSuccessFile = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  publishArticleData.file = response.data;
};

/**
 * @function
 * @description 提交文章
*/
const submitForm = async (formRef: FormInstance | undefined) => {
  if (!formRef) return;
  await formRef.validate((valid, fields) => {
    if (valid) {
      submit()
    }
  });
};

/**
 * @function
 * @description 重置按钮 清空from表单数据
*/
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields();
    uploadImgRef.value.clearFiles();
    uploadFileRef.value.clearFiles();
    publishArticleData.img = "";
    publishArticleData.file = "";
  }
};

/**
 * @function
 * @description 提交表单验证通过后 处理函数
*/
const submit = async () => {
  if (publishArticleData.type !== "" && publishArticleData.img !== "" && publishArticleData.file !== "") {
    publishArticleData.time = admin.getTime();
    let { data } = await require.post(api + "/admin/submitToDataBank", {
      ...publishArticleData
    });

    // 提交成功
    if (data.code === 1) {
      ElMessage({
        message: data.value,
        type: 'success',
      });
      resetForm();
    } else {
      ElMessage.error(data.value)
    }
  } else {
    ElMessage.error('提交失败,文章类型,文章封面或者文章内容。没有提交')
  }
}

/**
 * @function
 * @description 获取标签数据并处理
*/
onMounted(async () => {
  let { data } = await require.get(api + "/teaParty/table");
  data.forEach((item: Itable) => {
    if (item.text != "全部") {
      tableData.value?.push(item.text)
    }
  })
})
</script>


<style lang="less" scoped>
:deep(.el-form-item__content) {
  .el-input {
    width: 300px !important;
  }
}
</style>
