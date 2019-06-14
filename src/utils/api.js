/*
* axios.request(config)
* axios.get(url[, config])
* axios.delete(url[, config])
* axios.head(url[, config])
* axios.post(url[, data[, config]])
* axios.put(url[, data[, config]])
* axios.patch(url[, data[, config]])
*
* */

// import utils from '../utils/utils'

// import { serverUrl } from './const'
import $axios from '../utils/axiosConfig' // axios配置文件

export default {
  account: {
    login (params) {
      return new Promise((resolve, reject) => {
        $axios.post('/employees/admin/login', params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    weixinJs (params) {
      return new Promise((resolve, reject) => {
        $axios.get('/acRecord/admin/getjsSign', {params: params}).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    }
  },
}
