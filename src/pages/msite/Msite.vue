<template>
  <div>
    <header-top signin-up="home">
      <router-link :to="'/search/' + currentCity.geohash" slot="search" class="search">
        <i class="fa fa-search" aria-hidden="true"></i>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite-title">
        <span class="ellipsis">{{currentCity.address}}</span>
      </router-link>
    </header-top>
    <nav class="msite-nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
          <div class="swiper-slide">Slide 4</div>
          <div class="swiper-slide">Slide 5</div>
          <div class="swiper-slide">Slide 6</div>
          <div class="swiper-slide">Slide 7</div>
          <div class="swiper-slide">Slide 8</div>
          <div class="swiper-slide">Slide 9</div>
          <div class="swiper-slide">Slide 10</div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </nav>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import Swiper from 'swiper';
  import headerTop from '@/components/head/Head';
  import 'swiper/dist/css/swiper.min.css';

  export default {
    components: { headerTop },
    computed: {
      ...mapState({
        currentCity: ({ city }) => city.currentCity,
      }),
    },
    methods: {
      ...mapActions([
        'getCityByGeo',
        'getCities',
      ]),
      getCurrentCity() {
        this.getCities({
          type: 'guess',
        });
      },
    },
    mounted() {
      new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 3,
        slidesPerColumn: 2,
//        spaceBetween: 30,
      });
    },
    created() {
      const geohash = this.$route.query.geohash;
      if (geohash) {
        if (this.currentCity.geohash !== geohash) {
          this.getCityByGeo(geohash);
        }
      } else {
        this.getCurrentCity();
      }
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
    left: -20px;
    right: 0;
    margin: 0 auto;
    text-align: center;
    span {
      color: #fff;
      display: block;
    }
  }

  .msite-nav {
    padding-top: .45rem;
  }
</style>
