<template>
  <div>
    <header-top signin-up="home">
      <router-link :to="{ path: '/search', query: { geohash: currentAddress.geohash} }" slot="search" class="search">
        <i class="fa fa-search" aria-hidden="true"></i>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite-title">
        <span class="ellipsis">{{currentAddress.address}}</span>
      </router-link>
    </header-top>
    <nav class="msite-nav">
      <swiper :options="swiperOption" class="swiper">
        <swiper-slide v-for="(item, index) in foodTypes" :key="index" class="slide">
          <router-link :to="{ path: '/food', query: { geohash: currentAddress.geohash, title:item.title, restaurant_category_id: getCategoryId(item.link)} }">
            <figure>
              <img :src="imgBaseUrl + item.image_url" />
              <figcaption>{{item.title}}</figcaption>
            </figure>
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </nav>
    <div class="merchant">
      <header>
        <i class="fa fa-home" aria-hidden="true"></i>
        附近商家
      </header>
      <shop-list v-if="currentAddress.geohash" :geohash="currentAddress.geohash"></shop-list>
    </div>
    <footer-bottom :geohash="currentAddress.geohash"></footer-bottom>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import headerTop from '@/components/head/Head';
  import footerBottom from '@/components/foot/Foot';
  import shopList from '@/components/common/ShopList';
  import 'swiper/dist/css/swiper.css';

  export default {
    components: { headerTop, footerBottom, shopList, swiper, swiperSlide },
    data() {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com',
        swiperOption: {
          pagination: '.swiper-pagination',
          slidesPerView: 4,
          slidesPerColumn: 2,
          slidesPerGroup: 4,
        },
      };
    },
    computed: {
      ...mapState({
        currentAddress: ({ city }) => city.currentAddress,
        currentCity: ({ city }) => city.currentCity,
        foodTypes: ({ food }) => food.foodTypes,
      }),
    },
    methods: {
      ...mapActions([
        'getAddressByGeo',
        'getCities',
        'getFoodTypes',
      ]),
      getCategoryId(url) {
        const urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''));
        if (/restaurant_category_id/gi.test(urlData)) {
          return JSON.parse(urlData).restaurant_category_id.id;
        }
        return '';
      },
      setCurrentAddress() {
        return new Promise((resolve) => {
          let geohash = this.$route.query.geohash;
          if (geohash) {
            if (this.currentAddress.geohash !== geohash) {
              this.getAddressByGeo(geohash).then(() => {
                resolve();
              });
            }
          } else {
            this.getCities({ type: 'guess' }).then(() => {
              geohash = `${this.currentCity.latitude},${this.currentCity.longitude}`;
              return this.getAddressByGeo(geohash);
            }).then(() => {
              resolve();
            });
          }
        });
      },
    },
    created() {
      this.setCurrentAddress().then(() => {
        this.getFoodTypes(this.currentAddress.geohash);
      });
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
    border-bottom: .005rem solid #e4e4e4;
    padding-top: .45rem;
  }

  .swiper {
    background-color: #fff;
    padding: 10px 0 20px;
    .slide {
      text-align: center;
      margin-bottom: 5px;
      a {
        display: inline-block;
        figure {
          img {
            width: .36rem;
            height: .36rem;
          }
          figcaption {
            font-size: .12rem;
          }
        }
      }
    }
    .swiper-pagination {
      bottom: 4px;
    }
  }

  .merchant {
    background-color: #fff;
    padding-top: .1rem;
    margin-top: .1rem;
    border-top: .005rem solid #e4e4e4;
    header {
      padding-left: .12rem;
      font-size: .13rem;
      color: #999;
      i {
        font-size: .18rem;
        color: #999;
      }
    }
  }
</style>
