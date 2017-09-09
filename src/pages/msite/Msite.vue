<template>
  <div>
    <header-top signin-up="home">
    </header-top>
    <div class="msite-nav">msite</div>
  </div>
</template>

<script>
  import headerTop from '@/components/head/Head';

  export default {
    components: { headerTop },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .msite-nav {
    padding-top: .45rem;
  }
</style>
