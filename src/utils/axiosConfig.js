import { serverUrl } from './const'
// import { Message } from 'element-ui'
// import webStorage from 'webStorage'
import $router from '../router'
import $axios from 'axios'
import VueCookies from 'vue-cookies'

$axios.defaults.baseURL = serverUrl
$axios.defaults.timeout = 100000
// $axios.defaults.headers.common['code'] = 1
$axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 添加一个请求拦截器
// let loadinginstace

// console.log('aaaaaa', window)

$axios.interceptors.request.use((config) => {
  if (VueCookies.get('token')) { // 统一设置token 请求头
    config.headers.token = VueCookies.get('token')
  }
  return config
}, (error) => {
  // 当出现请求错误是做一些事
  window.app.$vux.toast.text('加载超时')
  return Promise.reject(error)
})

// 添加一个返回拦截器
$axios.interceptors.response.use((response) => {
  // 对返回的数据进行一些处理
  if (response.data.status === false) { // 后台返回错误
    if (response.data.error) {
      setTimeout(() => {
        window.app.$vux.toast.text(response.data.error.message)
      }, 0)
      setTimeout(() => {
        if (response.data.error.statusCode === '10007') { // 未登录，10007登录过期
          // 后台返回得登录过期，重置登录状态
          $router.push({name: 'login'})
        }
      }, 1000)
    }
  }
  return Promise.resolve(response)
}, (error) => {
  // 对返回的错误进行一些处理
  window.app.$vux.toast.text(error)
  return Promise.reject(error)
})

export default $axios
