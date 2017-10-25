<template>
  <div class="food-container">
    <header-top :head-title="headTitle" go-back=true></header-top>
    <div class="sort-container">
      <section>
        <div class="sort-item" @click="chooseCatType('classify')">
          <span>分类</span>
          <i class="fa fa-caret-down" aria-hidden="true"></i>
        </div>
        <div v-show="categoryType === 'classify'" class="sort-detail">
          1111111
        </div>
      </section>
      <section>
        <div class="sort-item" @click="chooseCatType('sort')">
          <span>排序</span>
          <i class="fa fa-caret-down" aria-hidden="true"></i>
        </div>
        <div v-show="categoryType === 'sort'" class="sort-detail">
          222222
        </div>
      </section>
      <section>
        <div class="sort-item" @click="chooseCatType('filter')">
          <span>筛选</span>
          <i class="fa fa-caret-down" aria-hidden="true"></i>
        </div>
        <div v-show="categoryType === 'filter'" class="sort-detail">
          33333333
        </div>
      </section>
    </div>
    <div class="merchant">
      <shop-list v-if="geohash" :geohash="geohash"></shop-list>
    </div>
  </div>
</template>

<script>
  import headerTop from '@/components/head/Head';
  import shopList from '@/components/common/ShopList';

  export default {
    data() {
      return {
        geohash: '',
        headTitle: '',
        restaurantCategoryId: '',
        categoryType: '',
      };
    },
    components: { headerTop, shopList },
    methods: {
      chooseCatType(type) {
        if (this.categoryType !== type) {
          this.categoryType = type;
        } else {
          this.categoryType = '';
        }
      },
      initData() {
        this.geohash = this.$route.query.geohash;
        this.headTitle = this.$route.query.title;
        this.restaurantCategoryId = this.$route.query.restaurant_category_id;
      },
    },
    created() {
      this.initData();
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .food-container {
    .sort-container {
      display: flex;
      width: 100%;
      position: fixed;
      z-index: 100;
      top: .45rem;
      height: .32rem;
      line-height: .32rem;
      background-color: #fff;
      border-bottom: .005rem solid #f1f1f1;
      section {
        flex: 1;
        text-align: center;
        border-right: .005rem solid #f1f1f1;
        &:last-child {
          border-right: none;
        }
        .sort-item {
          span, i {
            font-size: .13rem;
            color: #999;
          }
        }
        .sort-detail {
          position: absolute;
          width: 100%;
          top: .32rem;
          left: 0;
          background-color: #fff;
          min-height: 1rem;
        }
      }
    }
    .merchant {
      padding-top: .77rem;
      background-color: #fff;
    }
  }
</style>
