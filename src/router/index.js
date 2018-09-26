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

Vue.use(Router)

export default new Router({
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
      path: '/create',
      name: 'Create',
      component: Create
    }, {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }, {
      path: '/edit',
      name: 'Edit',
      component: Edit
    }, {
      path: '/me',
      name: 'Me',
      component: Me
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    }, {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
