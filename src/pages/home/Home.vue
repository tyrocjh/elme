<template>
  <div>
    <home-header signin-up="home">
      <span slot="logo" class="head_logo" @click="reload">ele.me</span>
    </home-header>
    <div class="home-page">
      {{msg}}
    </div>
  </div>
</template>

<script>
  import HomeHeader from '@/components/head/Head';

  export default {
    components: { HomeHeader },
    data() {
      return {
        msg: 'Home',
      };
    },
    methods: {
      reload() {
        window.location.reload();
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
