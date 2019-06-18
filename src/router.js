import Vue from 'vue'
import Router from 'vue-router'
import routerV from './components/routerV'
import VueCookies from 'vue-cookies'
import store from './store/index'

Vue.use(Router)

const router = new Router({
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
      meta: {
        title: '登录',
        authKey: false,
      },
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
          meta: {
            title: '活动核销',
            authKey: true,
          },
        }, {
          path: 'hexiao/detail',
          name: 'hexiaoDetail',
          component: () => import('./views/hexiao/detail'),
          meta: {
            title: '报名详情',
            authKey: true,
          },
        }, {
          path: 'history/detail',
          name: 'historyDetail',
          component: () => import('./views/hexiao/history'),
          meta: {
            title: '核销记录',
            authKey: true,
          },
        }, {
          path: '*',
          name: '404',
          // redirect: '/',
          component: () => import('./views/404/404.vue'),
          meta: {
            title: '404',
          },
        },
      ],
    },
    {
      path: '*',
      name: '404',
      // redirect: '/',
      component: () => import('./views/404/404.vue'),
      meta: {
        title: '404',
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  store.commit('mut_pageLoading', true) // 页面开始加载
  if (to.meta.title) {
    document.title = to.meta.title // 在路由里面写入的meta里面的title字段
  } else {
    document.title = '遂企云'
  }
  if (to.meta.authKey) {
    let token = VueCookies.get('token')
    if (token) {
      next()
    } else {
    next({
      path: '/login',
      query: {
        backUrl: to.fullPath,
      }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
  }
} else {
    next()
  }
})

// 路由切换时回到页面顶部
router.afterEach((to, from, next) => {
  setTimeout(() => { // 加载比较快时Loading组件一闪而过体验也不大好，那么你可以延迟设置loading=false。
    store.commit('mut_pageLoading', false)
  }, 1000)
  window.scrollTo(0, 0)
})

export default router
