<template>
  <div class="manage-article">
    <el-table :data="article" style="width:100%">
      <el-table-column label="类型" width="100">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.type }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="180">
        <template #default="scope">
          <!-- 文章已经推荐 -->
          <template v-if="scope.row.isRecommend">
            <div style="display: flex; align-items: center">
              <span style="color: red;">*</span>
              <span style="margin-left: 10px">{{ scope.row.title }}</span>
            </div>
          </template>
          <!-- 文章未推荐 -->
          <template v-else>
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.title }}</span>
            </div>
          </template>

        </template>
      </el-table-column>
      <el-table-column label="描述" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.describe }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="100">
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
      <el-table-column label="文章推荐" width="150">
        <template #default="scope">
          <!-- 文章已经推荐 -->
          <template v-if="scope.row.isRecommend">
            <el-button size="small" type="warning"
              @click="recommendArticle(scope.$index, scope.row, scope.row.isRecommend)">取消推荐</el-button>
          </template>
          <!-- 文章未推荐 -->
          <template v-else>
            <el-button size="small" type="success"
              @click="recommendArticle(scope.$index, scope.row, scope.row.isRecommend)">推荐</el-button>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="浏览量" width="100">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.browse }}</span>
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
 * @description 删除文章
*/
const handleDelete = (index: number, row: any) => {
  ElMessageBox.confirm(
    '是否确实删除',
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
    if (article.value) article.value.splice(index, 1)

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

/**
 * @function
 * @description 推荐文章
 * 
 * @param { number } index 推荐文章的下标
 * @param { any } row 文章的数据
 * @param { boolean } isRecommend 是取消推荐 还是 推荐文章 true:取消推荐  false:推荐文章
*/
const recommendArticle = async (index: number, row: any, isRecommend: boolean) => {
  ElMessageBox.confirm(
    isRecommend === true ? "取消推荐" : "推荐文章",
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: "info"
    }
  ).then(() => {
    require.post(api + "/admin/recommendArticle", {
      _id: row._id,
      recommend: isRecommend
    }).then(res => {
      // 更改数据
      row.isRecommend = !isRecommend
    })
  }).catch(() => {
    ElNotification({
      title: '取消',
      message: "取消成功",
      type: 'info',
    })
  })
}


// 获取所有文章
onMounted(() => {
  getArticle();
})
</script>


<style scoped lang="less">
</style>
