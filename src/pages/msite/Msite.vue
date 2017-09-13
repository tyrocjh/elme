<template>
  <div>
    <header-top signin-up="home">
      <router-link :to="'/search/' + currentCity.geohash" slot="search" class="search">
        <i class="fa fa-search" aria-hidden="true"></i>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite-title">
        <span>{{msiteTitle}}</span>
      </router-link>
    </header-top>
    <div class="msite-nav">msite</div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import headerTop from '@/components/head/Head';

  export default {
    components: { headerTop },
    data() {
      return {
        msiteTitle: 'title',
      };
    },
    computed: {
      ...mapState({
        currentCity: ({ city }) => city.currentCity,
      }),
    },
    methods: {
      ...mapActions([
        'getCities',
        'msiteAdress',
      ]),
      getCurrentCity() {
        this.getCities({
          type: 'guess',
        });
      },
    },
    created() {
      const geohash = this.$route.query.geohash;
      this.msiteAdress(geohash);
//      if (geohash) {
//        if (this.currentCity.geohash !== geohash) {
//        }
//      } else {
//        this.getCurrentCity();
//      }
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .search {
    display: inline-block;
    margin-left: .1rem;
    i {
      color: #fff;
      font-size: .2rem;
    }
  }

  .msite-title {
    position: absolute;
    width: 50%;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
    span {
      color: #fff;
    }
  }

  .msite-nav {
    padding-top: .45rem;
  }
</style>
