<template>
  <div>
    <header-top signin-up="home">
      <span slot="logo" class="logo" @click="reload">ele.me</span>
    </header-top>
    <nav class="city-nav">
      <p class="msg">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </p>
      <router-link :to="'/city/' + currentCity.id" class="choose">
        <span>{{currentCity.name}}</span>
        <i class="fa  fa-angle-right" aria-hidden="true"></i>
      </router-link>
    </nav>
    <section class="popular-city">
      <h4>热门城市</h4>
      <ul class="clearfix">
        <router-link tag="li" v-for="item in popularCities" :to="'/city/' + item.id" :key="item.id">
          {{item.name}}
        </router-link>
      </ul>
    </section>
    <section class="group-city-section">
      <ul>
        <li v-for="(items, key, index) in sortGroupCity" :key="key" class="group-city">
          <h4>
            {{key}}
            <span v-if="index === 0">（按字母排序）</span>
          </h4>
          <ul class="clearfix">
            <router-link tag="li" v-for="item in items" :to="'/city/' + item.id" :key="item.id" class="ellipsis">
              {{item.name}}
            </router-link>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  import headerTop from '@/components/head/Head';

  export default {
    components: { headerTop },
    computed: {
      ...mapState({
        currentCity: ({ city }) => city.currentCity,
        popularCities: ({ city }) => city.popularCities,
        isFetching: ({ city }) => city.isFetching,
      }),
      ...mapGetters([
        'sortGroupCity',
      ]),
    },
    methods: {
      ...mapActions([
        'getCities',
      ]),
      getCurrentCity() {
        this.getCities({
          type: 'guess',
        });
      },
      getPopularCities() {
        this.getCities({
          type: 'hot',
        });
      },
      getGroupCities() {
        this.getCities({
          type: 'group',
        });
      },
      reload() {
        window.location.reload();
      },
      initData() {
        this.getCurrentCity();
        this.getPopularCities();
        this.getGroupCities();
      },
    },
    created() {
      this.initData();
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .logo {
    font-size: .14rem;
    color: #fff;
    margin-left: .1rem;
  }
  .city-nav {
    background-color: #fff;
    padding-top: .45rem;
    margin-bottom: .01rem;
    border-bottom: .02rem solid #e4e4e4;

    .msg {
      display: flex;
      justify-content: space-between;
      padding: .1rem;
      border-bottom: .01rem solid #e4e4e4;

      span:nth-of-type(1) {
        font-size: .12rem;
        color: #666;
      }
      span:nth-of-type(2) {
        font-size: .12rem;
        font-weight: 900;
        color: #9f9f9f;
      }
    }

    .choose {
      display: flex;
      justify-content: space-between;
      padding: .1rem;

      span {
        font-size: .15rem;
        color: #3190e8;
      }

      i {
        font-size: .2rem;
        color: #999;
      }
    }
  }

  .popular-city, .group-city {
    border-top: .02rem solid #e4e4e4;
    background-color: #fff;

    h4 {
      font-size: .12rem;
      color: #666;
      height: .32rem;
      line-height: .32rem;
      text-indent: .1rem;

      span {
        font-size: .1rem;
        color: #999;
      }
    }

    ul {
      border-top: .01rem solid #e4e4e4;
      li {
        font-size: .12rem;
        color: #666;
        float: left;
        width: 25%;
        height: .34rem;
        line-height: .34rem;
        text-align: center;
        border-bottom: .01rem solid #e4e4e4;
        border-right: .01rem solid #e4e4e4;

        &:nth-of-type(4n) {
          border-right: none;
        }
      }
    }
  }
</style>
