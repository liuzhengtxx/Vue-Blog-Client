<template>
  <div id="index">
    <section class="blog-posts">
      <router-link v-for="blog in blogs" :to="`/detail/${blog.id}`" class="item">
        <figure class="avatar">
          <img :src="blog.user.avatar" :alt="blog.user.username">
          <figcaption>{{blog.user.username}}</figcaption>
        </figure>
        <h3>{{blog.title}} <span>{{blog.createdAt}}</span></h3>
        <p>{{blog.description}}</p>
      </router-link>
    </section>
    <section class="pagination">
      <el-pagination layout="prev, pager, next" :total="total" @current-change="onPageChange"></el-pagination>
    </section>
  </div>
</template>

<script>
import blog from '@/api/blog.js'

export default {
  data () {
    return {
      blogs: [],
      total: 0,
      page: 1,
    }
  },

  created () {
    this.page = parseInt(this.$route.query.page) || 1
    blog.getIndexBlogs({ page: this.page }).then(res => {
      console.log(res)
      this.blogs = res.data
      this.total = res.total
      this.page = res.page
    })
  },

  methods: {
    onPageChange (newPage) {
      blog.getIndexBlogs( { page: newPage} ).then(res => {
        console.log(res)
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        this.$router.push( { path: '/', query: { page: newPage } })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/base.less";

#index {

  .item {
    display: grid;
    grid: auto auto / 80px 1fr;  // grid: 行 / 列
    margin: 20px 0;

    .avatar {
      grid-column: 1 / 2;   //列 范围取：  1 - 2 线之间
      grid-row: 1 / span 2;      //行 范围取：  1 - 3 线之间（span 2 横跨 2）
      justify-self: center;
      margin-left: 0;
      text-align: center;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }

      figcaption {
        font-size: 12px;
        color: @textLighterColor;
      }
    }

    h3 {
      grid-column: 2 / 3;
      grid-row: 1 / 2;


      &>span {
        color: @textLighterColor;
        font-size: 12px;
        font-weight: normal;
      }
    }

    p {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
      margin-top: 0;
    }

  }

  .pagination {
    display: grid;
    text-align: center;
    margin-bottom: 30px;
  }


}

</style>
