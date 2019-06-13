import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { Icon } from 'vux'
import FastClick from 'fastclick'

Vue.component('icon', Icon)

FastClick.attach(document.body) // 移除移动端页面点击延迟
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
