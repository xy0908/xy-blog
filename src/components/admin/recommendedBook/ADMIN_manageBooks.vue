<template>
  <div class="manage-type">
    <el-table :data="book" style="width: 100%">
      <el-table-column label="书籍名称" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.bookName }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="推荐时间" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.time }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="书籍id" width="250">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row._id }}</span>
          </div>
        </template>
      </el-table-column>


      <el-table-column label="图片" width="300">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <img style="width: 100px;" :src="scope.row.img" alt="">
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
type books = {
  bookName: string;
  time: string;
  img: string;
  _id: string
}

/**
 * @param { string } api 开发环境env的url
 * @param { Require } require 封装请求数据的类
 * @param { Array<string> } types 推荐书籍类型数据
*/
const api = import.meta.env.VITE_URL;
const require = new Require();
const book = ref<Array<books>>([])

/**
 * @function
 * @description 获取推荐书籍
*/
const getBooks = async () => {
  let { data } = await require.get(api + "/recommendBooks/getBooks");
  book.value = data.data;

  ElNotification({
    title: '推荐书籍',
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
    '书籍',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    require.post(api + "/recommendBooks/deleteBook", {
      _id: row._id
    }).then(res => {
      ElNotification({
        title: '删除成功',
        message: res.data.value,
        type: 'success',
      })
      book.value.splice(index, 1)
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
  getBooks();
})
</script>

<style scoped lang="less">
</style>
