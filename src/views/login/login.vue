<template>
  <div>
    <input type="text" v-model="account">
    <input type="password" v-model="password">
    <button @click="login">登录</button>
  </div>
</template>

<script>
  import API from '../../utils/api'
  import {md5} from 'vux'

  export default {
    name: 'signin',
    components: {},
    data () {
      return {
        account: '',
        password: '',
      }
    },
    methods: {
      login () {
        API.account.login({
          account: this.account,
          password: md5(this.password),
        }).then(da => {
          // console.log(this.$VueCookies)
          if (da.status) {
            console.log(da.data)
            this.$VueCookies.set('token', da.data.token).set('userInfo', {
              account: da.data.account,
              trueName: da.data.trueName,
              mobile: da.data.mobile
            })
            this.$webStorage.setItem('u', da.data)
            this.$router.push({name: 'home'})
          } else {
            this.$vux.toast.text(da.error.message)
          }
        }).then(err => {
          console.log(err)
        })
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
