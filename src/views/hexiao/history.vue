<template>
  <div class="history">
    <sticky>
      <div class="time">
        <datetime
          style="display: inline-block;"
          format="YYYY年MM月"
          v-model="value1"
          @on-change="change"
          :title="value1 ? '' : '请选择日期'"
          @on-cancel="log('cancel')"
          @on-confirm="onConfirm"
          @on-hide="log('hide', $event)"></datetime>
        <x-icon type="ios-arrow-down" size="22"></x-icon>
      </div>
    </sticky>

    <div class="box" v-if="list.length">
      <div class="item" v-for="(item, i) in list" :key="i">
        <div class="name">{{item.activityName}}</div>
        <div class="line-box">
          <span>{{item.applyerName}}</span>
          <span v-if="item.applerPhone">{{item.applerPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</span>
          <span>{{item.checkedPerons}}人</span>
        </div>
        <div class="hexiao-time">{{$moment(item.created, 'M月DD日 HH:mm')}}</div>
      </div>
    </div>
    <data-null v-if="!list.length"></data-null>
  </div>
</template>

<script>
  import { Datetime, Sticky } from 'vux'
  import dataNull from '../../components/dataNull'
  import API from '../../utils/api'

  export default {
    name: 'history',
    components: {
      Datetime,
      Sticky,
      dataNull,
    },
    data () {
      return {
        value1: '',
        list: [],
      }
    },
    methods: {
      log (str1, str2 = '') {
        console.log(str1, str2)
      },
      onConfirm (val) {
        console.log('on-confirm arg', val)
        console.log('current value', this.value1)
        let year = this.value1.substr(0, 4)
        let month = this.value1.substr(5, 2)
        this.getHistory(year, month)
      },
      change (value) {
        console.log('change', value)
      },
      getHistory (year, month) {
        this.$vux.loading.show({
          transition: '',
          text: '加载中...',
        })

        API.hexiao.getRecords({
          year: parseInt(year, 10),
          month: parseInt(month, 10),
          current: 1,
          size: 10000,
          descs: 'created',
        }).then(da => {
          if (da.status) {
            this.list = da.data.records
          }
          this.$vux.loading.hide()
        })
      },
    },
    created () {
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1
      this.value1 = this.$moment(new Date().getTime(), 'YYYY年MM月')
      this.getHistory(year, month)
    },
  }
</script>

<style scoped lang="less">
  .history {
    .time {
      background-color: #f2f2f2;
      height: 88/7.5vw;
      line-height: 88/7.5vw;
      padding-left: 33/7.5vw;
      display: flex;
      align-items: center;
    }
    .box {
      .item {
        padding: 34/7.5vw;
        box-sizing: border-box;
        border-bottom: 1px solid #E6E6E6;
        color: #333333;
        .name {
          font-size: 28/7.5vmin;
          margin-bottom: 15/7.5vw;
        }
        .line-box {
          font-size: 24/7.5vmin;
          margin-bottom: 13/7.5vw;
          span {
            margin-right: 24/7.5vw;
          }
        }
        .hexiao-time {
          color: #999999;
          font-size: 22/7.5vmin;
        }
      }
    }
  }
</style>
