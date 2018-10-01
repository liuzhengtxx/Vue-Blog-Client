<template>
  <div id="create">
    <h1>创建文章</h1>
    <h3>文章标题</h3>
    <el-input v-model="title"></el-input>
    <p class="msg">限30个字</p>
    <h3>内容简介</h3>
    <el-input v-model="description" type="textarea" :autosize="{ minRows: 2, maxRows: 6 }"></el-input>
    <p class="msg">限30个字</p>
    <h3>文章内容</h3>
    <el-input v-model="content" type="textarea" :autosize="{ minRows: 8, maxRows: 30 }"></el-input>
    <p class="msg">限30个字</p>
    <p>
      <label>是否展示到首页</label>
      <el-switch v-model="atIndex" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    </p>
    <el-button class="btnChange" @click="onCreate">确定</el-button>
  </div>
</template>

<script>
import blog from '@/api/blog'

export default {
  data () {
    return {
      title: '',
      description: '',
      content: '',
      atIndex: false
    }
  },

  methods: {
    onCreate () {
      blog.createBlog({ title: this.title, content: this.content, description: this.description, atIndex: this.atIndex })
        .then(res => {
          this.$message.success(res.msg)
          this.$router.push({ path: `/detail/${res.data.id}`})
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/base.less";

#create {
  margin-top: 30px;
  padding-bottom: 30px;

  h1 {
    text-align: center;
  }

  .msg {
    text-align: right;
    font-size: 12px;
    color: @textLighterColor;
  }

  .btnChange {
    margin-top: 20px;
  }
}
</style>
