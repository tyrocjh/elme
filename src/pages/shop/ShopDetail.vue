<template>
  <div class="shop-detail">
    <header-top head-title="商家详情" go-back=true></header-top>
    <section>test</section>
  </div>
</template>

<script>
  import headerTop from '@/components/head/Head';

  export default {
    components: { headerTop },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .shop-detail {
    position: absolute;
    z-index: 60;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ebebeb;
  }
</style>
