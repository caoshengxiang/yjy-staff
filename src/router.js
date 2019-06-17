import Vue from 'vue'
import Router from 'vue-router'
import routerV from './components/routerV'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      // component: HelloWorld
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/login'),
    },
    {
      path: '/yjy',
      name: 'yjy',
      component: routerV,
      children: [
        {
          path: 'hexiao/Home',
          name: 'hexiaoHome',
          component: () => import('./views/hexiao/Home'),
        }, {
          path: 'hexiao/detail',
          name: 'hexiaoDetail',
          component: () => import('./views/hexiao/detail'),
        }, {
          path: 'history/detail',
          name: 'historyDetail',
          component: () => import('./views/hexiao/history'),
        }, {
          path: 'about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('./views/About.vue')
        },
        {
          path: '*',
          name: '404',
          // redirect: '/',
          component: () => import('./views/404/404.vue')
        },
      ]
    },
    {
      path: '*',
      name: '404',
      // redirect: '/',
      component: () => import('./views/404/404.vue')
    },
  ]
})
