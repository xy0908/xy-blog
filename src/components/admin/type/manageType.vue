<template>
  <div class="manage-type">
    <el-table :data="types" style="width: 100%">
      <el-table-column label="类型" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.type }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="id" width="300">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row._id }}</span>
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
import { IArticleType } from "~types/admin";

/**
 * @param { string } api 开发环境env的url
 * @param { Require } require 封装请求数据的类
 * @param { Array<string> } types 文章类型数据
*/
const api = import.meta.env.VITE_URL;
const require = new Require();
const types = ref<Array<IArticleType>>([])

/**
 * @function
 * @description 获取类型
*/
const getType = async () => {
  let { data } = await require.get(api + "admin/getType");
  types.value = data.data;

  ElNotification({
    title: '文章类型',
    message: data.value,
    type: 'success',
  })
}


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
    require.post(api + "/admin/deleteType", {
      _id: row._id
    }).then(res => {
      ElNotification({
        title: '删除成功',
        message: res.data.value,
        type: 'success',
      })
      types.value.splice(index, 1)
    })

  }).catch(() => {
    ElNotification({
      title: '删除取消',
      message: "取消成功",
      type: 'info',
    })
  })
}

onMounted(async () => {
  getType();
})
</script>

<style scoped lang="less">
</style>
