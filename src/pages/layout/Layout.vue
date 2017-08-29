<template>
  <div class="app-wrapper">
    <app-header></app-header>
    <app-main></app-main>
  </div>
</template>

<script>
  import AppHeader from './AppHeader';
  import AppMain from './AppMain';

  export default {
    components: { AppHeader, AppMain },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
