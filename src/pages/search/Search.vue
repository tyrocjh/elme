<template>
  <div>
    <header-top head-title="搜索" go-back='true'></header-top>
    <div class="search">
      <form class="search-form">
        <input type="search" name="search" placeholder="请输入商家或美食名称" v-model.trim="searchValue" />
        <button class="search-btn" @click.prevent="handleSearch">提交</button>
      </form>
      <section class="search-shop">
        <h4>商家</h4>
        <ul>
          <li></li>
        </ul>
      </section>
      <section v-if="searchHistory && searchHistory.length > 0" class="search-history">
        <h4>搜索历史</h4>
        <ul>
          <li v-for="(item, index) in searchHistory" :key="index">
            <span>{{item}}</span>
            <i class="fa fa-close" aria-hidden="true" @click="handleDelete(index)"></i>
          </li>
        </ul>
        <p @click="handleDeleteAll">清空搜索历史</p>
      </section>
    </div>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import _ from 'lodash';
  import headerTop from '@/components/head/Head';
  import footerBottom from '@/components/foot/Foot';
  import { getLocalStore, setLocalStore } from '@/utils/storage';

  export default {
    components: { headerTop, footerBottom },
    data() {
      return {
        searchValue: '',
        searchShop: [],
        searchHistory: [],
      };
    },
    methods: {
      ...mapActions([
        'searchShopList',
      ]),
      search() {
        this.searchShopList({
          geohash: this.$route.query.geohash,
          keyword: this.searchValue,
        }).then((res) => {
          this.searchShop = res;
        });
      },
      setHistory() {
        this.searchHistory.push(this.searchValue);
        this.searchHistory = _.uniq(this.searchHistory);
        setLocalStore('searchHistory', this.searchHistory);
      },
      handleSearch() {
        if (this.searchValue.length > 0) {
          this.setHistory();
          this.search();
        }
      },
      handleDelete(index) {
        this.searchHistory.splice(index, 1);
        setLocalStore('searchHistory', this.searchHistory);
      },
      handleDeleteAll() {
        this.searchHistory = [];
        setLocalStore('searchHistory', null);
      },
      getSearchHistory() {
        const historyStore = JSON.parse(getLocalStore('searchHistory'));
        if (historyStore && historyStore.length > 0) {
          this.searchHistory = historyStore;
        } else {
          this.searchHistory = [];
        }
      },
      initData() {
        this.getSearchHistory();
      },
    },
    created() {
      this.initData();
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .search {
    padding-top: .45rem;
    .search-form {
      display: flex;
      padding: .1rem;
      background-color: #fff;
      input[name='search'] {
        flex: 1;
        font-size: .13rem;
        font-weight: 700;
        margin-right: .05rem;
        padding: 0 .05rem;
        outline: none;
        border: .01rem solid #ddd;
        border-radius: .02rem;
        background-color: #f2f2f2;
      }
      .search-btn {
        font-size: .13rem;
        font-weight: 700;
        width: .6rem;
        height: .3rem;
        color: #fff;
        border: none;
        border-radius: .03rem;
        background-color: #3190e8;
      }
    }

    .search-shop, .search-history {
      padding-bottom: .42rem;
      h4 {
        font-size: .12rem;
        font-weight: 700;
        color: #666;
        padding: .08rem;
      }
    }

    .search-shop {
      ul {
        li {
          display: flex;
          padding: .05rem;
        }
      }
    }

    .search-history {
      ul {
        padding: 0 .08rem;
        background-color: #fff;
        li {
          display: flex;
          justify-content: space-between;
          padding: .08rem 0;
          span {
            font-size: .14rem;
            color: #333;
          }
          i {
            font-size: .15rem;
            color: #888;
          }
        }
      }
      p {
        font-size: .14rem;
        text-align: center;
        color: #3190e8;
        padding-bottom: .1rem;
        background-color: #fff;
      }
    }
  }
</style>
