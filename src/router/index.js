import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/system/index'
import login from '@/components/login/index'
import home from '@/components/system/home/index'

import notPage from '@/components/notPage/index'
Vue.use(Router)

/*路由配置*/
export default new Router({
  routes: [
    {
      path: '*'
      , component: notPage
    },
    {
      path: '/',
      name: '/',
      redirect: '/home',  //重定向 进入首页
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {path: '/index',name: 'index', component: index,
      children:[
          { path: '/home', name: 'home', component: home, meta: {
            title: '首页'
          }},
      ]
    }
  ]
})
