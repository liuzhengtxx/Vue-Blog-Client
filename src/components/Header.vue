<template>
  <header :class="{'login': isLogin, 'no-login': !isLogin}">
    <template v-if="!isLogin">
      <h1>Let's share</h1>
      <p>精品博客汇聚</p>
      <div class="btns">
        <el-button><router-link to="/login">立即登录</router-link></el-button>
        <el-button><router-link to="/register">注册账号</router-link></el-button>
      </div>
    </template>
    <template v-if="isLogin">
      <h1><router-link to="/">Let's share</router-link></h1>
      <router-link to="/create">
        <i class="edit el-icon-plus"></i>
      </router-link>
      <div class="user">
        <img class="avatar" :src="user.avatar" :alt="user.username" :title="user.username">
        <ul>
          <li><router-link to="me">我的</router-link></li>
          <li><a href="#" @click="onLogout">注销</a></li>
        </ul>
      </div>
    </template>
  </header>
</template>

<script>
import auth from '@/api/auth'
window.auth = auth

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {}
  },

  computed: {
    ...mapGetters([
      'isLogin',
      'user'
    ])
  },

  created () {
    this.checkLogin()
  },

  methods: {
    ...mapActions([
      'checkLogin',
      'logout'
    ]),
    onLogout () {
      this.logout()
    }
  },

}
</script>

<style lang="less">
@import "../assets/base.less";

header.no-login {
  padding: 0 12% 30px 12%;
  background: @headerBgColor;
  display: grid;
  justify-items: center;

  h1 {
    color: #fff;
    font-size: 40px;
    margin: 60px 0 0 0;
    text-transform: uppercase;

    a {
      color: #fff;
    }
  }

  p {
    margin: 15px 0 0 0;
    color: #fff;
  }

  .btns {
    margin-top: 20px;

  }
}

header.login {
  display: flex;
  align-items: center;
  background: @headerBgColor;

  h1 {
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 40px;
    text-transform: uppercase;
    flex: 1;

    a {
      color: #fff;
    }
  }

  .edit {
    color: #fff;
    font-size: 30px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-left: 15px;
  }

  .user {
    position: relative;
    cursor: pointer;

    ul {
      display: none;
      position: absolute;
      right: 0;
      list-style: none;
      border: 1px solid #eaeaea;
      margin: 0;
      padding: 0;
      background-color: #fff;

      a {
        text-decoration: none;
        color: #333;
        font-size: 12px;
        display: block;
        padding: 5px 10px;

        &:hover {
          background-color: #eaeaea;
        }
      }
    }

    &:hover ul {
      display: block;
    }
  }
}


</style>
