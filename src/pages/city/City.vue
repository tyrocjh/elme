<template>
  <div>
    <header-top :head-title="currentCity.name" go-back="true">
      <router-link to="/home" slot="changeCity" class="change-city">切换城市</router-link>
    </header-top>
    <form class=city-form @submit.prevent>
      <div><input type="search" name="city" placeholder="输入学校、商务楼、地址" v-model="searchValue" required /></div>
      <div><input type="submit" name="submit" value="提交" @click="search" /></div>
    </form>
    <header class="search-header" v-if="searchHistory">搜索历史</header>
    <ul class="result-list">
      <li v-for="(item, index) in placeList" @click="selectCity(item)" :key="index">
        <h4>{{item.name}}</h4>
        <p>{{item.address}}</p>
      </li>
    </ul>
    <footer class="search-footer" v-if="searchHistory && placeList.length" @click="clearHistory">清空所有</footer>
    <div class="search-none" v-if="searchNone">很抱歉！无搜索结果。</div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import { getLocalStore, setLocalStore, removeLocalStore } from '@/utils/storage';
  import headerTop from '@/components/head/Head';

  export default {
    components: { headerTop },
    data() {
      return {
        placeList: [],
        placeHistory: [],
        searchValue: '',
        searchHistory: true,
        searchNone: false,
      };
    },
    computed: {
      ...mapState({
        currentCity: ({ city }) => city.currentCity,
        resultCities: ({ city }) => city.resultCities,
      }),
    },
    methods: {
      ...mapActions([
        'getCityById',
        'searchCities',
      ]),
      search() {
        if (this.searchValue) {
          this.searchCities({
            type: 'search',
            city_id: this.currentCity.id,
            keyword: this.searchValue,
          }).then(() => {
            this.placeList = this.resultCities;
            this.searchHistory = false;
            this.searchNone = !this.resultCities.length;
          });
        }
      },
      clearHistory() {
        removeLocalStore('placeHistory');
        this.getPlaceHistory();
      },
      setPlaceHistory(city) {
        const history = getLocalStore('placeHistory');
        if (history) {
          let repeat = false;
          this.placeHistory = JSON.parse(history);
          this.placeHistory.forEach((item) => {
            if (item.geohash === city.geohash) {
              repeat = true;
            }
          });
          if (!repeat) {
            this.placeHistory.push(city);
          }
        } else {
          this.placeHistory.push(city);
        }
        setLocalStore('placeHistory', this.placeHistory);
      },
      goToMSite(geohash) {
        this.$router.push({ path: '/msite', query: { geohash } });
      },
      selectCity(city) {
        this.setPlaceHistory(city);
        this.goToMSite(city.geohash);
      },
      getCurrentCity() {
        this.getCityById(this.$route.params.id);
      },
      getPlaceHistory() {
        if (getLocalStore('placeHistory')) {
          this.placeList = JSON.parse(getLocalStore('placeHistory'));
        } else {
          this.placeList = [];
        }
      },
      initData() {
        this.getCurrentCity();
        this.getPlaceHistory();
      },
    },
    created() {
      this.initData();
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .change-city {
    position: absolute;
    right: .15rem;
    font-size: .14rem;
    color: #fff;
  }

  .city-form {
    background-color: #fff;
    padding-top: .45rem;
    margin-bottom: .01rem;
    border-bottom: .02rem solid #e4e4e4;
    div {
      text-align: center;
      margin: .08rem 0px .1rem;
      input[type='search'] {
        font-size: .13rem;
        width: 90%;
        padding: 0 .06rem;
        height: .26rem;
        color: #333;
        border: .01rem solid #e4e4e4;
      }
      input[type='submit'] {
        background-color: #3190e8;
        font-size: .13rem;
        width: 90%;
        height: .28rem;
        color: #fff;
        border-radius: .03rem;
        border: none;
      }
    }
  }

  .search-header,
  .search-none {
    font-size: .12rem;
    padding-left: .1rem;
  }

  .result-list {
    background-color: #fff;
    border-top: .01rem solid #e4e4e4;
    li {
      margin: 0 auto;
      padding-top: .13rem;
      border-bottom: .01rem solid #e4e4e4;
      h4 {
        margin: 0 auto .06rem;
        width: 90%;
        font-size: .13rem;
        color: #333;
      }
      p {
        margin: 0 auto .1rem;
        width: 90%;
        font-size: .12rem;
        color: #999;
      }
    }
  }

  .search-footer {
    font-size: .14rem;
    color: #666;
    text-align: center;
    background-color: #fff;
    height: .4rem;
    line-height: .4rem;
  }

  .search-none {
    background-color: #fff;
    height: .4rem;
    line-height: .4rem;
  }
</style>
