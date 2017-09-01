<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import 'style/reset.css';

  #app {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
  }
</style>
