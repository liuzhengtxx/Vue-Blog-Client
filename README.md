# Vue-Blog-Client

> Vue 2.5 开发共享博客客户端。

## 项目涉及到技术栈：
- Vue：Vue、Vue-router、Vuex、Vue-cli
- CSS的预处理框架：less
- 插件：ElementUI、axios
- 接口：auth.js、blog.js


# 项目记录
## 安装 / 导入 ElementUI
```
npm i element-ui -S
```

```JavaScript
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
```

## 静态页布局
大量使用 `Grid` 网格布局
```LESS
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
  }
}
```

## helper request.js
将 `axios` 再一次进行封装

## Vuex
创建 `store`，并拆分 `modules`。将用户相关放入 `auth.js` ，博客内容相关放入 `blog.js` 。
使用 `Vuex` 实现 登录/注册 。

### 完善动态路由 和 权限
修改 `router` 中 `index.js` 结构。先 `new Router`，最后 `export default router` 导出。
```JavaScript
// 每次路由切换执行对应函数
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (true) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
```
