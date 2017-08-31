<template>
  <div>
    <home-header></home-header>
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
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
