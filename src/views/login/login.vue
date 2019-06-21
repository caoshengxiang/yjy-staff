<template>
  <div class="login">
    <div class="login-bg"></div>
    <div class="form">
      <div class="form-group">
        <input type="text" v-model="account" placeholder="账号">
      </div>
      <div class="form-group">
        <input type="password" v-model="password" placeholder="密码">
      </div>
      <div v-if="errMessage" class="err-message">{{errMessage}}</div>
      <div @click="login" class="login-btn">登录</div>
    </div>

    <!--<button @click="login" class="login-btn">登录</button>-->
  </div>
</template>

<script>
  import API from '../../utils/api'
  import { md5 } from 'vux'

  export default {
    name: 'signin',
    components: {},
    data () {
      return {
        account: '',
        password: '',
        errMessage: '',
      }
    },
    methods: {
      login () {
        this.errMessage = ''
        if (!this.account || !this.password) {
          this.$vux.toast.text('请输入账号和密码!')
          // this.errMessage = '请输入账号和密码!'
          return false
        }
        this.$vux.loading.show({
          transition: '',
          text: '正在登录...',
        })
        API.account.login({
          account: this.account,
          password: md5(this.password),
        }).then(da => {
          // console.log(this.$VueCookies)
          if (da.status) {
            console.log(da.data)
            this.$VueCookies.set('token', da.data.token, 2 * 60 * 60)
            this.$webStorage.setItem('userInfo', da.data)
            setTimeout(() => {
              this.$vux.loading.hide()
              this.$router.push({name: 'hexiaoHome'})
            }, 1000)
          } else {
            this.$vux.loading.hide()
            // this.errMessage = da.error.message
            this.$vux.toast.text(da.error.message)
          }
        }).then(err => {
          console.log(err)
        })
      },
    },
    created () {
      let token = this.$VueCookies.get('token')
      if (token) {
        this.$router.push({name: 'hexiaoHome'})
      }
    },
  }
</script>

<style scoped lang="less">
  .login-bg {
    width: 750/7.5vw;
    height: 285/7.5vw;
    background: url("../../../public/img/icon/login-bg.png") no-repeat;
    background-size: 750/7.5vw 285/7.5vw;
  }

  .form {
    margin-top: 165/7.5vw;
    padding: 0 76/7.5vw;
    .form-group {
      border-bottom: 1px solid #E3E3E3;
      margin-bottom: 40/7.5vw;
      input {
        padding: 25/7.5vw 0;
        border: 0;
        width: 100%;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
    }
  }

  .login-btn {
    background: linear-gradient(90deg, #ffdf00 0%, #faef6b 100%);
    border-radius: 5/7.5vw;
    line-height: 104/7.5vw;
    font-size: 32/7.5vw;
    font-weight: bold;
    margin-top: 64/7.5vw;
    text-align: center;
  }

  .err-message {
    color: red;
    font-size: 18/7.5vw;
  }
</style>
