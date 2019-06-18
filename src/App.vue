<template>
  <div id="app">
    <!--<page-loading></page-loading>-->
    <router-view/>
  </div>
</template>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
<script>
  // @ is an alias to /src
  import pageLoading from './components/pageLoading'

  export default {
    components: {
      pageLoading,
    },
    name: 'home',
  }

</script>
