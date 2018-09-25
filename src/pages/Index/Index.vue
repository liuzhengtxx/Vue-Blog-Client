<template>
  <div id="index">
    <p>首页</p>
    <div>
      <el-button @click="onClick1">默认按钮</el-button>
      <el-button @click="onClick2">alert</el-button>
    </div>
  </div>
</template>

<script>
import request from '@/helpers/request.js'
import auth from '@/api/auth.js'
import blog from '@/api/blog.js'
window.request = request
window.auth = auth
window.blog = blog

export default {
  methods: {
    onClick1 () {
      this.$message.error('这是一条错误的信息。')
    },

    onClick2 () {
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message.success('点了确定')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/base.less";

#index {
  color: @themeColor;
}

@color: pink;

</style>
