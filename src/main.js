import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import { Icon, ToastPlugin, LoadingPlugin } from 'vux'
// import FastClick from 'fastclick'
import './styles/basic.scss'
import './styles/common.scss'
// monment 作为全局方法
import moment from 'moment'
import webStorage from 'webStorage'
import VueCookies from 'vue-cookies'

Vue.prototype.$moment = (t, format) => {
  if (!t) {
    return ''
  }
  if (!format) {
    format = 'YYYY-MM-DD HH:mm:ss'
  }
  // console.log(moment(t).format(format))
  return moment(t).format(format)
}
Vue.prototype.$webStorage = webStorage
VueCookies.config(2 * 60 * 60) // 单位秒
Vue.prototype.$VueCookies = VueCookies

Vue.component('icon', Icon)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

/* FastClick 导致 IOS下 input 点击无效，重压才会弹起键盘  */
// const str = navigator.userAgent.toLowerCase()
// const ver = str.match(/cpu iphone os (.*?) like mac os/)

// if (!ver) { // 非IOS系统
//             // 引入fastclick 做相关处理
//   FastClick.attach(document.body) // 移除移动端页面点击延迟
// } else {
//   if (parseInt(ver[1]) < 11) {
//     // 引入fastclick 做相关处理
//     FastClick.attach(document.body) // 移除移动端页面点击延迟
//   }
// }
/* FastClick 导致 IOS下 input 点击无效，重压才会弹起键盘  */

Vue.config.productionTip = false

window.app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// 记录进入app时的url
if (typeof window.entryUrl === 'undefined' || window.entryUrl === '') {
  window.entryUrl = location.href.split('#')[0]
}
