import {serverUrl} from './const'
// import { Message } from 'element-ui'
// import webStorage from 'webStorage'
import $router from '../router'
import $axios from 'axios'
import VueCookies from 'vue-cookies'

$axios.defaults.baseURL = serverUrl
$axios.defaults.timeout = 100000
if (VueCookies.get('token')) { // 处理刷新时authKey丢失, 统一设置auth移驾至登录接口
  $axios.defaults.headers.common['token'] = VueCookies.get(
    'token')
}
// $axios.defaults.headers.common['code'] = 1
$axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 添加一个请求拦截器
// let loadinginstace
$axios.interceptors.request.use((config) => {
  return config
}, (error) => {
  // 当出现请求错误是做一些事
  // Message.error({
  //   message: '加载超时',
  // })
  return Promise.reject(error)
})

// 添加一个返回拦截器
$axios.interceptors.response.use((response) => {
  // 对返回的数据进行一些处理
  if (response.data.status === false) { // 后台返回错误
    if (response.data.error) {
      setTimeout(() => {
        // Message.error(response.data.error.message)
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
  // Message.error({
  // message: '好像发生了一点错误,需要检查！' + error,
  // })
  return Promise.reject(error)
})

export default $axios
