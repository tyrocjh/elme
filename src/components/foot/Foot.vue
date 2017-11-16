<template>
  <footer>
    <section @click="jumpLink({path: '/msite', query: {geohash}})">
      <i class="fa fa-cutlery" aria-hidden="true" :class="this.$route.path.indexOf('msite') !== -1 ? 'active' : '' "></i>
      <span>外卖</span>
    </section>
    <section @click="jumpLink({path: '/search'})">
      <i class="fa fa-search-plus" aria-hidden="true" :class="this.$route.path.indexOf('search') !== -1 ? 'active' : '' "></i>
      <span>搜索</span>
    </section>
    <section @click="jumpLink({path: '/order'})">
      <i class="fa fa-list-ul" aria-hidden="true" :class="this.$route.path.indexOf('order') !== -1 ? 'active' : '' "></i>
      <span>订单</span>
    </section>
    <section @click="jumpLink({path: '/profile'})">
      <i class="fa fa-user-o" aria-hidden="true" :class="this.$route.path.indexOf('profile') !== -1 ? 'active' : '' "></i>
      <span>我的</span>
    </section>
  </footer>
</template>

<script>
  export default {
    props: ['geohash'],
    methods: {
      jumpLink(path) {
        this.$router.push(path);
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  footer {
    z-index: 100;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    background-color: #fff;
    box-shadow: -.01rem -.01rem .01rem rgba(0,0,0,.1);

    section {
      flex: 1;
      text-align: center;
      i {
        font-size: .12rem;
        color: #666;
        &.active {
          color: #15A1FF;
        }
      }
      span {
        display: block;
        padding-bottom: 5px;
        font-size: .12rem;
        color: #666;
      }
    }
  }
</style>
