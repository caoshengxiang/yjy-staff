<template>
  <div class="hexiao-detail">
    <div class="box-2">
      <div class="form-group">
        <div class="title">活动名称</div>
        <div class="text">{{detail.activityName}}</div>
      </div>
      <div class="form-group">
        <div class="title">订单号</div>
        <div class="text">{{detail.orderId}}</div>
      </div>
      <div class="form-group">
        <div class="title">报名人</div>
        <div class="text">{{detail.signName}}</div>
      </div>
      <div class="form-group">
        <div class="title">手机号</div>
        <div class="text">{{detail.signMobile}}</div>
      </div>
      <div class="form-group">
        <div class="title">报名人数</div>
        <div class="text">{{detail.signPersons}}</div>
      </div>
      <div class="form-group">
        <div class="title">可核人数</div>
        <div class="text">{{detail.waitingCheckPersons}}</div>
      </div>
      <div class="form-group">
        <div class="title">核销人数</div>
        <div class="text" style="height: 40px">
          <inline-x-number style="display:block;color: #333333;" :min="1" :max="detail.waitingCheckPersons" width="50px" button-style="square"
                           v-model="num"></inline-x-number>
        </div>
      </div>
    </div>
    <div class="hexiao" @click="submit" v-if="detail.waitingCheckPersons > 0"><span>确认核销</span></div>
    <div class="hexiao-disabled" v-else><span>确认核销</span></div>
  </div>
</template>

<script>
  import { InlineXNumber } from 'vux'
  import API from '../../utils/api'

  export default {
    name: 'detail',
    components: {
      InlineXNumber,
    },
    data () {
      return {
        num: 0,
        detail: {},
      }
    },
    methods: {
      getInfoByCheckCode () {
        if (!this.$route.query.checkCode) {
          this.$router.push({name: 'hexiaoHome'})
        }
        API.hexiao.getInfoByCheckCode({checkCode: this.$route.query.checkCode}).then(da => {
          if (da.status) {
           this.detail = da.data
            this.num = da.data.waitingCheckPersons
          } else {
            this.$vux.toast.text(da.error.message)
            this.$router.push({name: 'hexiaoHome'})
          }
        })
      },
      submit () {
        API.hexiao.doCheck({id: this.detail.id, checkPerson: this.num}).then(da => {
          if (da.status) {
            this.$vux.toast.text('核销成功')
            this.$router.push({name: 'hexiaoHome'})
          } else {
            this.$vux.toast.text(da.error.message)
          }
        })
      }
    },
    created () {
      this.getInfoByCheckCode()
    }
  }
</script>

<style scoped lang="less">
  .hexiao-detail {
    background-image: url("../../../public/img/icon/scan-bg.png");
    background-repeat: no-repeat;
    background-size: 750/7.5vw 505/7.5vw;
    padding: 56/7.5vw 34/7.5vw;
    box-sizing: border-box;
    .box-2 {
      width: 684/7.5vw;
      box-sizing: border-box;
      background-color: #ffffff;
      box-shadow: rgba(18, 18, 18, 0.1) 0 5/7.5vw 20/7.5vw;
      border-radius: 20/7.5vw;
      padding: 55/7.5vw;
      .form-group {
        padding: 10/7.5vw 0;
        border-bottom: 1px solid #E6E6E6;
        .title {
          font-size: 26/7.5vmin;
          color: #999999;
          margin-bottom: 31/7.5vw;
        }
        .text {
          font-size: 32/7.5vmin;
          color: #333333;
        }
      }
    }
    .hexiao {
      background: linear-gradient(90deg, #ffdf00 0%, #faef6b 100%);
      border-radius: 5/7.5vw;
      line-height: 104/7.5vw;
      font-size: 32/7.5vw;
      font-weight: bold;
      margin-top: 64/7.5vw;
      text-align: center;
    }
    .hexiao-disabled {
      background: #999999;
      border-radius: 5/7.5vw;
      line-height: 104/7.5vw;
      font-size: 32/7.5vw;
      font-weight: bold;
      margin-top: 64/7.5vw;
      text-align: center;
    }
  }
</style>
