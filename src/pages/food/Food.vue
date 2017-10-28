<template>
  <div class="food-container">
    <header-top :head-title="headTitle" go-back=true></header-top>
    <div class="sort-container">
      <section>
        <div class="sort-item" @click="chooseCatType('classify')">
          <span>分类</span>
          <i class="fa fa-caret-down" aria-hidden="true"></i>
        </div>
        <transition name="fade">
          <div v-show="categoryType === 'classify'" class="sort-detail">
            <section class="food-cat">
              <ul>
                <li v-for="(cat, index) in foodCategory" :key="index" :class="{active:restaurantCategoryId == cat.id}" @click="changeCategory(cat.id, index)">
                  <div>
                    <img v-if="index" :src="getImagePath(cat.image_url)" class="cat-img" />
                    <span class="name">{{cat.name}}</span>
                  </div>
                  <div>
                    <span class="num">{{cat.count}}</span><i v-if="index" class="fa fa-angle-right" aria-hidden="true"></i>
                  </div>
                </li>
              </ul>
            </section>
            <section class="food-sub-cat">
              <ul>
                <li v-for="(subCat, index) in getSubCatById(restaurantCategoryId)" v-if="index" :key="subCat.id">
                  <span>{{subCat.name}}</span>
                  <span>{{subCat.count}}</span>
                </li>
              </ul>
            </section>
          </div>
        </transition>
      </section>
      <section>
        <div class="sort-item" @click="chooseCatType('sort')">
          <span>排序</span>
          <i class="fa fa-caret-down" aria-hidden="true"></i>
        </div>
        <transition name="fade">
          <div v-show="categoryType === 'sort'" class="sort-detail">
            222222
          </div>
        </transition>
      </section>
      <section>
        <div class="sort-item" @click="chooseCatType('filter')">
          <span>筛选</span>
          <i class="fa fa-caret-down" aria-hidden="true"></i>
        </div>
        <transition name="fade">
          <div v-show="categoryType === 'filter'" class="sort-detail">
            33333333
          </div>
        </transition>
      </section>
    </div>
    <div class="merchant">
      <shop-list v-if="geohash" :geohash="geohash"></shop-list>
    </div>
    <div class="shadow" v-show="categoryType" @click="chooseCatType('')"></div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  import { getImgPath } from '@/utils/image';
  import headerTop from '@/components/head/Head';
  import shopList from '@/components/common/ShopList';

  export default {
    components: { headerTop, shopList },
    data() {
      return {
        geohash: '',
        headTitle: '',
        restaurantCategoryId: '',
        categoryType: '',
      };
    },
    computed: {
      ...mapState({
        foodCategory: ({ food }) => food.foodCategory,
      }),
      ...mapGetters([
        'getSubCatById',
      ]),
    },
    methods: {
      ...mapActions([
        'getFoodCategory',
      ]),
      getImagePath(path) {
        return getImgPath(path);
      },
      changeCategory(id, index) {
        if (index === 0) {
          this.categoryType = '';
        } else {
          this.restaurantCategoryId = id;
        }
      },
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
        this.restaurantCategoryId = parseInt(this.$route.query.restaurant_category_id, 10);
        this.getFoodCategory(this.geohash.split(',')[0], this.geohash.split(',')[1]);
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
      z-index: 90;
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
          position: relative;
          z-index: 80;
          background-color: #fff;
          span, i {
            font-size: .13rem;
            color: #999;
          }
        }
        .sort-detail {
          position: absolute;
          z-index: 50;
          display: flex;
          width: 100%;
          top: .32rem;
          left: 0;
          background-color: #fff;
          min-height: 1rem;
          .food-cat {
            width: 50%;
            height: 2.9rem;
            background-color: #f1f1f1;
            ul {
              li {
                display: flex;
                justify-content: space-between;
                padding: 0 .1rem;
                &.active {
                  background-color: #fff;
                }
                div, span, i {
                  font-size: .12rem;
                }
                .cat-img {
                  width: .16rem;
                  height: .16rem;
                }
                .name {
                  color: #666;
                }
                .num {
                  padding: 0 .04rem;
                  margin-right: .06rem;
                  border-radius: .1rem;
                  color: #fff;
                  background-color: #ccc;
                }
                .fa {
                  font-size: .14rem;
                  color: #ccc;
                }
              }
            }
          }
          .food-sub-cat {
            width: 50%;
            height: 2.9rem;
            overflow-y: auto;
            background-color: #fff;
            ul {
              padding-left: .1rem;
              li {
                display: flex;
                justify-content: space-between;
                padding-right: .1rem;
                border-bottom: .01rem solid #e4e4e4;
                span {
                  font-size: .12rem;
                  color: #666;
                }
              }
            }
          }
        }
      }
    }
    .merchant {
      padding-top: .77rem;
      background-color: #fff;
    }
    .shadow {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 10;
    }
    .fade-enter-active, .fade-leave-active {
      transition: all .3s;
      transform: translateY(0);
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
      transform: translateY(-100%);
    }
  }
</style>
