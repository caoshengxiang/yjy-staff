import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import { Icon, ToastPlugin, LoadingPlugin } from 'vux'
import FastClick from 'fastclick'
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

FastClick.attach(document.body) // 移除移动端页面点击延迟

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
