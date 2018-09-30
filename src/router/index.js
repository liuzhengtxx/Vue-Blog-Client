import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index/Index'
import Login from '@/pages/Login/Login'
import Create from '@/pages/Create/Create'
import Detail from '@/pages/Detail/Detail'
import Edit from '@/pages/Edit/Edit'
import Me from '@/pages/Me/Me'
import Register from '@/pages/Register/Register'
import User from '@/pages/User/User'

import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    }, {
      path: '/create',
      name: 'Create',
      component: Create,
      meta: { requiresAuth: true }
    }, {
      path: '/detail/:blogId',
      name: 'Detail',
      component: Detail
    }, {
      path: '/edit/:blogId',
      name: 'Edit',
      component: Edit,
      meta: { requiresAuth: true }
    }, {
      path: '/me',
      name: 'Me',
      component: Me,
      meta: { requiresAuth: true }
    }, {
      path: '/user/:userId',
      name: 'User',
      component: User
    }
  ]
})

// 每次路由切换执行对应函数
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('checkLogin').then(isLogin => {
      if (!isLogin) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })
  } else {
    next()
  }
})

export default router
