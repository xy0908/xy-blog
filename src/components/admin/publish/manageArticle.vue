<template>
  <div class="manage-article">
    <el-table :data="article" style="width:100%">
      <el-table-column label="类型" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.type }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.describe }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.author }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.time }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script setup lang="ts">
import { IPublishCompleted } from "~types/admin";

/**
 * @param { string } api 开发环境env的url
 * @param { Require } require 封装请求数据的类
 * @param { any } article 所有文章数据
*/
const api = import.meta.env.VITE_URL;
const require = new Require();
const article = ref<Array<IPublishCompleted>>();

/**
 * @function
 * @description 删除类型
*/
const handleDelete = (index: number, row: any) => {
  ElMessageBox.confirm(
    '是否确实删除',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    require.post(api + "/admin/deleteArticle", {
      _id: row._id
    }).then(res => {
      ElNotification({
        title: '发布成功',
        message: res.data.value,
        type: 'success',
      })
    })
    getArticle();
  }).catch(() => {
    ElNotification({
      title: '删除取消',
      message: "取消成功",
      type: 'info',
    })
  })
}

/**
 * @function
 * @description 获取所有文章
*/
const getArticle = async () => {
  let { data } = await require.get(api + "/admin/getArticle");
  article.value = data.data
}

onMounted(() => {
  getArticle();
})
</script>


<style scoped lang="less">
</style>
