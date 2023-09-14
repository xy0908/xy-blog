<template>
  <div class="see-article com-info">
    <div class="back" @click="back">
      <div class="back-icon">
        <el-icon :size="20">
          <ArrowLeftBold />
        </el-icon>
        <span @click="back">返回</span>
      </div>
      <Title :title="_title_"></Title>
    </div>
    <MdEditor v-model="articleContent" preview-only :toolbars="[]" />

    <!-- 埋点曝光 元素暴露在页面 表示这个地方被浏览了 文章浏览量+1  -->
    <div class="exposure" v-exposure></div>
  </div>
</template>

<script setup lang="ts">
import { Directive } from 'vue';
import 'md-editor-v3/lib/style.css';
import { MdEditor } from 'md-editor-v3';
import { ArrowLeftBold } from "@element-plus/icons-vue"

/**
 * @param { string } _file_ 父组件传入的文章路径
 * @param { string } _id_ 父组件传入的文章id
 * @param { string } _title_ 父组件传入的文章标题
 * @param { defineEmits } emit 父组件传递的方法
 * @param { string } api 挂载在vite环境的请求地址
 * @param { Require } require 请求封装的类
 * @param { string } articleContent 文章的内容
 * @param { boolean } isExposure 是否曝光 true页面浏览量+1 
*/
const { _file_, _id_, _title_ } = defineProps<{
  _id_: string,
  _file_: string
  _title_: string
}>();
const emit = defineEmits(["isSeeFlash"])
const api = import.meta.env.VITE_URL;
const require = new Require();
const articleContent = shallowRef("");
const isExposure = ref<boolean>(false);


/**
 * @function
 * @description 自定义封面的埋点曝光指令
*/
const vExposure: Directive<any, void> = (el: HTMLElement) => {
  const observe = new IntersectionObserver(
    entries => {
      if (entries[0].intersectionRatio == 1) {
        addBrowse();
        observe.unobserve(el);
      }
    },
    { threshold: 1 },
  )
  observe.observe(el)
}

/**
 * @function
 * @description 文章浏览量+1
*/
const addBrowse = async () => {
  if (isExposure.value === false) {
    await require.post(api + "/index/addBrowse", {
      _id_
    });
    isExposure.value = true;
  }
}

/**
 * @function
 * @description 返回上一页
*/
const back = () => {
  emit("isSeeFlash")
}

// 获取初始数据
onMounted(async () => {
  let { data } = await require.post(api + "/index/seeArticle", {
    value: _file_
  })
  console.log(data);

  articleContent.value = data.data;
});

// 页面销毁时 
onUnmounted(() => {
  isExposure.value = false;
})
</script>

<style lang="less" scoped>
.see-article {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  box-shadow: 1px 0 6px #371e1e3d;
  background: #fff;

  .back {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding-left: 20px;
    height: 40px;
    font-size: 16px;
    color: #00a1d6;

    .back-icon {
      display: flex;
      align-items: center;
      width: 100px;
      cursor: pointer;

      :deep(.el-icon) {
        margin-left: 0 10px;
      }

      span {
        margin-left: 10px;
        font-size: 18px;
        font-weight: bold;
        color: #7d7777;
      }
    }
  }

  #md-editor-v3 {
    flex-grow: 1;
    width: 100%;
  }

  .exposure {
    width: 100%;
    height: 10px;
  }
}

:deep(.md-editor-input-wrapper) {
  display: none !important;
}

.see-article::-webkit-scrollbar {
  display: none;
}
</style>

