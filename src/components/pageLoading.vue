<template>
  <div v-if="percent < 100" class="page-loading">
    <box gap="0px" class="pro">
      <x-progress :percent="percent" :show-cancel="false"></x-progress>
    </box>
    <div class="loading">
      <spinner type="ios-small"></spinner>
    </div>
  </div>
</template>

<script>
  import { XProgress, Box, Spinner } from 'vux'
  import { mapState } from 'vuex'

  export default {
    name: 'pageLoading',
    components: {
      XProgress,
      Box,
      Spinner,
    },
    data () {
      return {
        percent: 0,
        types: ['android', 'ios', 'ios-small', 'bubbles', 'circles', 'crescent', 'dots', 'lines', 'ripple', 'spiral'],
        speed: 3,
        a: 0.05,
      }
    },
    computed: {
      ...mapState([
        'pageLoading',
      ]),
    },
    methods: {},
    created () {
      let timer = setInterval(() => {
        if (this.pageLoading) {
          this.speed -= this.a * this.speed
          this.percent += this.speed
        } else {
          this.speed += this.a * this.speed
          this.percent += this.speed
        }
        if (this.percent >= 100) {
          this.percent = 100
          clearInterval(timer)
        }
      }, 50)
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .page-loading {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: absolute;
    top: -50/7.5vw;
    width: 100%;
    left: 0;
    .pro {
      flex: 1;
    }
    .loading {
      width: 80/7.5vw;
    }
  }
</style>
