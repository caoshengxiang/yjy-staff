<template>
  <div class="home-p">
    <div class="box">
      <div class="l">
        <div>{{userInfo.trueName}}</div>
        <div>工号：{{userInfo.account}}</div>
      </div>
      <div class="r" @click="historyDetail">
        核销记录
      </div>
    </div>
    <div class="box-2">
      <img class="scan-btn" @click="scanQRCodeHandle" id="scanQRCode" src="../../../public/img/icon/scan-btn.png"
           alt="">
      <div class="tips">请顾客在【我的活动】中点击【查看票券详情】</div>
      <div class="tips-2">扫码有问题？ 尝试<span class="btn" @click="showConfirm = true">手动核销</span></div>
    </div>
    <div class="logout">
      <span @click="showLoginOut = true">退出登录</span>
    </div>

    <confirm v-model="showConfirm"
             show-input
             :close-on-confirm="false"
             ref="confirm5"
             placeholder="请顾客提供核销码"
             title="手动核销"
             @on-cancel="onCancel"
             @on-confirm="onConfirm"
             @on-show="onShow"
             @on-hide="onHide">
      <p style="text-align:center;">请顾客提供核销码</p>
    </confirm>

    <confirm v-model="showLoginOut"
             :close-on-confirm="false"
             title="退出登录"
             @on-confirm="onConfirmLoginOut"
    >
      <p style="text-align:center;">确定退出登录吗？</p>
    </confirm>

    <confirm
      v-model="errorDialog"
      :show-cancel-button="false"
      title="操作提示"
      @on-confirm="errorDialog = false">
      <p style="text-align:center;">请切换至微信扫码或尝试手动核销</p>
    </confirm>
  </div>
</template>

<script>
  // @ is an alias to /src
  import API from '../../utils/api'
  import { WechatPlugin, Confirm } from 'vux'
  import { getIsWxClient } from '../../utils/utils'

  export default {
    components: {
      Confirm,
    },
    name: 'home',
    data () {
      return {
        userInfo: this.$webStorage.getItem('userInfo'),
        showConfirm: false,
        showLoginOut: false,
        errorDialog: false,
        hasClick: false,
      }
    },
    computed: {},
    methods: {
      getInfoByCheckCode (checkCode, success, error) {
        API.hexiao.getInfoByCheckCode({checkCode: checkCode}).then(da => {
          if (da.status) {
            success && success(da)
          } else {
            error && error(da)
          }
        })
      },
      historyDetail () {
        this.$router.push({name: 'historyDetail', query: {id: 123}})
      },
      onCancel () {
        console.log('on cancel')
      },
      onConfirm (msg) {
        if (!msg) {
          this.$vux.toast.text('请输入核销码！')
          return
        }
        this.$vux.loading.show({
          transition: '',
          text: '查询中...',
        })
        this.getInfoByCheckCode(msg, (da) => {
          setTimeout(() => {
            this.$vux.loading.hide()
            this.showConfirm = false
            this.$router.push({name: 'hexiaoDetail', query: {checkCode: msg}})
          }, 200)
        }, (da) => {
          this.$vux.loading.hide()
          // this.$vux.toast.text(da.error.message)
        })
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        this.$refs.confirm5.setInputValue('')
        console.log('on show')
      },
      onConfirmLoginOut () {
        this.$vux.loading.show({
          transition: '',
          text: '正在退出登录...',
        })
        this.$VueCookies.remove('token')
        this.$webStorage.removeItem('userInfo')

        setTimeout(() => {
          this.$vux.loading.hide()
          this.showLoginOut = false
          this.$router.push({name: 'login'})
        }, 1000)
      },
      scanQRCode () {
        let that = this
        WechatPlugin.$wechat.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            var result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
            // console.log(result)
            // alert(result)
            that.hasClick = false
            that.$vux.loading.show({
              transition: '',
              text: '查询中...',
            })
            that.getInfoByCheckCode(result, (da) => {
              setTimeout(() => {
                that.$vux.loading.hide()
                that.showConfirm = false
                that.$router.push({name: 'hexiaoDetail', query: {checkCode: result}})
              }, 200)
            }, (da) => {
              that.$vux.loading.hide()
              // that.$vux.toast.text(da.error.message)
            })
            // window.location.href = result// 因为我这边是扫描后有个链接，然后跳转到该页面
          },
        })
      },
      scanQRCodeHandle () {
        const that = this
        if (that.hasClic) {
          return false
        }
        if (!getIsWxClient()) {
          this.errorDialog = true
          return false
        }
        // alert(location.href)
        that.hasClick = true
        API.account.weixinJs({
          // url: location.href,
          url: encodeURIComponent(location.href.split('#')[0]),
        }).then(da => {
          // console.log(da)
          WechatPlugin.$wechat.config({
            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            debug: false,
            // 必填，公众号的唯一标识
            appId: da.data.appId,
            // 必填，生成签名的时间戳
            timestamp: da.data.timestamp,
            // 必填，生成签名的随机串
            nonceStr: da.data.nonceStr,
            // 必填，签名，见附录1
            signature: da.data.signature,
            // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            jsApiList: ['checkJsApi', 'scanQRCode'],
          })
        })
        WechatPlugin.$wechat.error(function (res) {
          alert('出错了：' + res.errMsg) // 这个地方的好处就是WechatPlugin.$wechat.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
          that.hasClick = false
        })

        WechatPlugin.$wechat.ready(function () {
          WechatPlugin.$wechat.checkJsApi({
            jsApiList: ['scanQRCode'],
            success: function (res) {
              console.info('checkJsApi', res.checkResult)
              // 扫码api
              that.scanQRCode()
            },
            error: function () {
              that.hasClick = false
            }
          })
        })
      },
    },
    created () {
    },
  }
</script>

<style scoped lang="less">
  .home-p {
    background-image: url("../../../public/img/icon/scan-bg.png");
    background-repeat: no-repeat;
    background-size: 750/7.5vw 505/7.5vw;
    padding: 56/7.5vw 34/7.5vw;
    box-sizing: border-box;

    .box {
      display: flex;
      justify-content: space-between;
      color: #333333;
      margin-bottom: 110/7.5vw;
      font-weight: bold;
      .l {
        line-height: 46/7.5vw;
        font-size: 36/7.5vw;
      }
      .r {
        font-size: 26/7.5vw;
      }
    }
    .box-2 {
      width: 684/7.5vw;
      height: 550/7.5vw;
      background-color: #ffffff;
      box-shadow: rgba(120, 120, 120, 0.1) 0 12/7.5vw 20/7.5vw;
      text-align: center;
      border-radius: 10/7.5vw;
      .scan-btn {
        width: 240/7.5vw;
        height: 240/7.5vw;
        margin-top: 90/7.5vw;
        margin-bottom: 37/7.5vw;
      }
      .tips {
        font-size: 26/7.5vmin;
        color: #999999;
        margin-bottom: 65/7.5vw;
      }
      .tips-2 {
        font-size: 26/7.5vmin;
        color: #999999;
        .btn {
          color: #4C96EA;
        }
      }
    }
    .logout {
      font-size: 28/7.5vmin;
      color: #D87B77;
      text-align: center;
      margin-top: 260/7.5vw;
    }
  }
</style>
