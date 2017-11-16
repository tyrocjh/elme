<template>
  <div>
    <header-top head-title="我的" go-back='true'></header-top>
    <section class="profile">
      暂未开放，敬请期待！
    </section>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
  import headerTop from '@/components/head/Head';
  import footerBottom from '@/components/foot/Foot';

  export default {
    components: { headerTop, footerBottom },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .profile {
    padding-top: .45rem;
  }
</style>
