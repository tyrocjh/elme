<template>
  <div>
    <home-header signin-up="home">
      <span slot="logo" class="logo" @click="reload">ele.me</span>
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
  .logo {
    color: #fff;
    margin-left: .1rem;
  }
  .home-page {
    padding-top: .45rem;
    min-height: 700px;
  }
</style>
