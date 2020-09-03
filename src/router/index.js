import Vue from 'vue'
import Router from 'vue-router'
import store from "../store";
Vue.use(Router)

const newRouter = new Router({
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../components/login")
    },
    {
      path: '/home',
      name: 'home',
      component: () => import("../components/home"),
      children: [
        {
          path: '/workBench/index',
          name: 'workBench',
          component: () => import("../components/workBench/index.vue"),
        },
        {
          path: '/gateway/index',
          name: '门户',
          component: () => import("../components/gateway/index.vue"),
        },
        {
          path: '/knowledge/index',
          name: '知识库',
          component: () => import("../components/knowledge/index.vue"),
        },
        {
          path: '/mailList/index',
          name: '通讯录',
          component: () => import("../components/mailList/index.vue"),
        },
      ]
    },
    {
      path: '/accountInfo',
      name: '用户信息',
      component: () => import("../components/accountInfo"),
    },
    {
      path: '/accountSetting',
      name: '用户信息设置',
      component: () => import("../components/accountSetting"),
    },
  ]
  // mode: 'history'
});

newRouter.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {//toekn存在
    if (to.path == '/login') {//token存在，并且是login页面
      next('/home');
    } else {//token存在，不是login页面
      next();
    }
  } else {
    if (to.path == '/login') {//token不存在，并且是login页面
      next();
    } else {//token不存在，不是login页面
      next('/login');
    }
  }
})

export default newRouter;