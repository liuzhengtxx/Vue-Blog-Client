<template>
  <div id="user">
    <section class="user-info">
      <img class="avatar" :src="user.avatar" :alt="user.username" :title="user.username">
      <h3>{{user.username}}</h3>
    </section>
    <section>
      <router-link class="item" :to="`/detail/${blog.id}`" v-for="blog in blogs" :key="blog.id">
        <div class="data">
          <span class="day">{{splitDate(blog.createdAt).date}}</span>
          <span class="month">{{splitDate(blog.createdAt).month}}</span>
          <span class="year">{{splitDate(blog.createdAt).year}}</span>
        </div>
        <h3>{{blog.title}}</h3>
        <p>{{blog.description}}</p>
      </router-link>
    </section>
    <section class="pagination">
      <el-pagination layout="prev, pager, next" :total="total" @current-change="onPageChange"></el-pagination>
    </section>
  </div>
</template>

<script>
import blog from '@/api/blog'

export default {
  data () {
    return {
      blogs: [],
      user: {},
      page: 1,
      total: 0
    }
  },

  created () {
    this.userId = this.$route.params.userId
    this.page = this.$route.query.page || 1

    blog.getBlogsByUserId(this.userId, { page: this.page })
    .then(res => {
      console.log(res)
      this.page = res.page
      this.total = res.total
      this.blogs = res.data
      if(res.data.lenght > 0) {
        this.user = res.data[0].user
      }
    })
  },

  methods: {
    //分页
    onPageChange (newPage) {
      blog.getBlogsByUserId(this.userId, { page: newPage} ).then(res => {
        console.log(res)
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        this.$router.push( { path: `/user/${this.userId}`, query: { page: newPage } })
      })
    },

    // 格式化 年 月 日
    splitDate (dataStr) {
      let dateObj = typeof dataStr === 'object' ? dataStr : new Date(dataStr)
      return {
        date: dateObj.getDate(),
        month: dateObj.getMonth() + 1,
        year: dateObj.getFullYear()
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/base.less";

#me,#user {

  .user-info {
    display: grid;
    grid: auto auto / 80px 1fr;

    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ebebeb;

    .avatar {
      grid-column: 1 / span 1;
      grid-row: 1 / span 2;
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    h3 {
      grid-column: 2 / span 1;
      grid-row: 1 / span 1;
      margin-top: 10px;
    }
  }

  .item {
    display: grid;
    grid: auto auto auto / 80px 1fr;
    margin: 20px 0;

    .data {
      grid-column: 1 / span 1;
      grid-row: 1 / span 3;
      justify-self: center;
      text-align: center;

      span {
        display: block;
        color: @textLighterColor;
      }

      .day {
        font-size: 40px;
      }
    }

    h3 {
      grid-column: 2 / span 1;
      grid-row: 1 / span 1;
    }

    p {
      grid-column: 2 / span 1;
      grid-row: 2 / span 1;
      margin-top: 0;
    }

    .actions {
      grid-column: 2 / span 1;
      grid-row: 3 / span 1;
      font-size: 12px;

      a {
        color: @themeLighterColor;
      }

    }
  }
}
</style>
