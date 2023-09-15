<template>
  <div class="manage-trends">
    <el-table :data="newTrends" style="width: 100%">
      <el-table-column label="动态" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.trends }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="300">
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
import { IManageTrends } from "~types/admin";

/**
 * @param { string } api 开发环境env的url
 * @param { Require } require 封装请求数据的类
 * @param { Array<string> } newTrends 最新动态数据
*/
const api = import.meta.env.VITE_URL;
const require = new Require();
const newTrends = ref<Array<IManageTrends>>([])

/**
 * @function
 * @description 获取动态
*/
const getNewTrends = async () => {
  let { data } = await require.get(api + "newTrends/getNewTrends");
  newTrends.value = data.data;
  ElNotification({
    title: '最新动态',
    message: data.value,
    type: 'success',
  })
}


/**
 * @function
 * @description 删除动态
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
    require.post(api + "/newTrends/deleteNewTrends", {
      _id: row._id
    }).then(res => {
      ElNotification({
        title: '删除成功',
        message: res.data.value,
        type: 'success',
      })
      newTrends.value.splice(index, 1)
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
  getNewTrends();
})
</script>

<style scoped lang="less">
</style>

