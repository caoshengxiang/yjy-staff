<template>
  <div class="data-null">
    <img class="icon" src="../../public/img/icon/no-data.png" alt="">
    <div class="text">{{text}}</div>
  </div>
</template>

<script>
  export default {
    name: 'data-null',
    data () {
      return {}
    },
    props: {
      text: {
        default: '暂无数据~',
        type: String
      }
    }
  }
</script>

<style scoped lang="less">
  .data-null {
    text-align: center;
    .icon {
      width: 358/7.5vw;
      height: 358/7.5vw;
    }
    .text {
      color: #999999;
      font-size: 32/7.5vw;
      margin-top: 10/7.5vw;
    }
  }
</style>
