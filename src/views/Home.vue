<template>
  <div class="home">
    <button id="scanQRCode">扫码</button>
  </div>
</template>

<script>
  // @ is an alias to /src
  import API from '../utils/api'
  import { WechatPlugin } from 'vux'

  export default {
    name: 'home',
    data () {
      return {
        userInfo: this.$webStorage.getItem('u'),
      }
    },
    computed: {},
    created () {
      API.account.weixinJs({
        url: location.href
      }).then(data => {
        console.log(data)
        let da = data.data || {data: {}}
        WechatPlugin.$wechat.config({
          // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          debug: false,
          // 必填，公众号的唯一标识
          appId: da.data.appId,
          // 必填，生成签名的时间戳
          timestamp: '' + da.data.timestamp,
          // 必填，生成签名的随机串
          nonceStr: da.data.noncestr,
          // 必填，签名，见附录1
          signature: da.data.signature,
          // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          jsApiList: ['checkJsApi', 'scanQRCode'],
        })
      })
      WechatPlugin.$wechat.error(function (res) {
        alert('出错了：' + res.errMsg) // 这个地方的好处就是WechatPlugin.$wechat.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
      })

      WechatPlugin.$wechat.ready(function () {
        WechatPlugin.$wechat.checkJsApi({
          jsApiList: ['scanQRCode'],
          success: function (res) {

          },
        })

        // 点击按钮扫描二维码
        document.querySelector('#scanQRCode').onclick = function () {
          WechatPlugin.$wechat.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              var result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
              console.log(result)
              // window.location.href = result// 因为我这边是扫描后有个链接，然后跳转到该页面
            },
          })
        }
      })
    },
  }
</script>
