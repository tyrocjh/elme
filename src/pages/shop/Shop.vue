<template>
  <div>
    <nav class="go-back" @click="goBack">
      <i class="fa fa-angle-left" aria-hidden="true"></i>
    </nav>
    <header class="shop-header">
      <img class="header-bg" :src="baseUrl + '/img/' + shopDetail.image_path" />
      <div class="header-container">
        <router-link to="/shop/shopDetail" tag="section" class="top">
          <img :src="baseUrl + '/img/' + shopDetail.image_path" />
          <div class="msg">
            <h2>{{shopDetail.name}}</h2>
            <p>商家配送 / {{shopDetail.order_lead_time}}分钟送达 / 配送费￥{{shopDetail.float_delivery_fee}}</p>
            <p>公告：{{promotionInfo}}</p>
            <i class="fa fa-angle-right" aria-hidden="true"></i>
          </div>
        </router-link>
        <section class="bottom">
          <p>{{shopDetail.activities ? shopDetail.activities[0].description : ''}}</p>
          <span>{{shopDetail.activities ? shopDetail.activities.length : ''}}个活动<i class="fa fa-angle-right" aria-hidden="true"></i></span>
        </section>
      </div>
    </header>
    <section class="tool-bar">
      <div @click="changeCatType('food')"><span :class="{active: catType == 'food'}">商品</span></div>
      <div @click="changeCatType('rating')"><span :class="{active: catType == 'rating'}">评价</span></div>
    </section>
    <section class="shop-container">
      <transition name="fade">
        <div v-show="catType == 'food'" class="shop-merchandise">
          <section class="merchandise-l">
            <ul>
              <li v-for="(menu, index) in menus" ref="menuGroup" :class="{active: index == menuIndex}" :key="index" @click="changeMenu(index)">
                <img v-if="menu.icon_url" :src="getImagePath(menu.icon_url)" />
                <span>{{menu.name}}</span>
              </li>
            </ul>
          </section>
          <section class="merchandise-r">
            <ul class="food-list">
              <li v-for="menu in menus" ref="foodGroup" :key="menu.id" >
                <header>
                  <h4><strong>{{menu.name}}</strong>{{menu.description}}</h4>
                </header>
                <div  v-for="food in menu.foods" class="food-content" :key="food.id">
                  <img :src="baseUrl + '/img/' + food.image_path" />
                  <section class="food-detail">
                    <h5>{{food.name}}</h5>
                    <p>{{food.description}}</p>
                    <span>月售{{food.month_sales}}份 好评率{{food.satisfy_rate}}%</span>
                    <div class="detail-bottom">
                      <span>￥{{food.specfoods[0].price}}</span>
                      <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </div>
                  </section>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </transition>
      <transition name="fade">
        <div v-show="catType == 'rating'" class="shop-comment">
          <div>
            <section v-if="ratingScores" class="score">
              <div class="total">
                <h5>{{shopDetail.rating}}</h5>
                <p>综合评价</p>
                <span>高于周边商家{{(ratingScores.compare_rating * 100).toFixed(1)}}%</span>
              </div>
              <div class="detail">
                <p>服务态度<el-rate v-model="ratingScores.service_score" disabled></el-rate><span>{{ratingScores.service_score.toFixed(1)}}</span></p>
                <p>菜品评价<el-rate v-model="ratingScores.food_score" disabled></el-rate><span>{{ratingScores.food_score.toFixed(1)}}</span></p>
                <p v-if="shopDetail.order_lead_time">送达时间<span class="time">{{shopDetail.order_lead_time}}分钟</span></p>
              </div>
            </section>
            <ul class="tag-list">
              <li v-for="(ratingTag, index) in ratingTags" :class="{active: ratingTagIndex == index}" @click="changeRatingTag(ratingTag.name, index)" :key="index">{{ratingTag.name}}({{ratingTag.count}})</li>
            </ul>
            <ul v-if="ratingList" class="comment-list">
              <li v-for="item in ratingList" :key="item._id">
                <img :src="getImagePath(item.avatar)" />
                <section>
                  <header>
                    <span>{{item.username}}</span>
                    <span class="time">{{item.rated_at}}</span>
                  </header>
                  <section>
                    <span>{{item.time_spent_desc}}</span>
                    <div>
                      <template v-for="itemRating in item.item_ratings">
                        <img :src="getImagePath(itemRating.image_hash)" />
                      </template>
                    </div>
                  </section>
                  <footer>
                    <template v-for="itemRating in item.item_ratings">
                      <span class="ellipsis">{{itemRating.food_name}}</span>
                    </template>
                  </footer>
                </section>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </section>
    <transition name="slide" mode="out-in">
      <router-view :shopDetail="shopDetail"></router-view>
    </transition>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import BScroll from 'better-scroll';
  import { baseUrl } from '@/config/env';
  import { getImgPath } from '@/utils/image';

  export default {
    data() {
      return {
        baseUrl,
        menuIndex: 0,
        ratingTagIndex: 0,
        ratingTagName: '',
        ratingListOffset: 0,
        catType: 'food',
        foodListScrollY: -1,
        foodListHeight: [],
        disableLoadMore: false,
      };
    },
    computed: {
      ...mapState({
        shopDetail: ({ shop }) => shop.shopDetail,
        menus: ({ shop }) => shop.menus,
        ratingScores: ({ shop }) => shop.ratingScores,
        ratingTags: ({ shop }) => shop.ratingTags,
        ratingList: ({ shop }) => shop.ratingList,
      }),
      promotionInfo() {
        return this.shopDetail.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。';
      },
    },
    methods: {
      ...mapActions([
        'getShopDetail',
        'getMenus',
        'getRatingScores',
        'getRatingTags',
        'getRatingList',
      ]),
      goBack() {
        this.$router.go(-1);
      },
      getImagePath(path) {
        return getImgPath(path);
      },
      calFoodListHeight() {
        this.$refs.foodGroup.forEach((item, idx) => {
          if (idx === 0) {
            this.foodListHeight.push(item.clientHeight);
          } else {
            this.foodListHeight.push(item.clientHeight + this.foodListHeight[idx - 1]);
          }
        });
      },
      changeRatingTag(name, index) {
        this.ratingTagIndex = index;
        this.ratingTagName = name;
        this.ratingListOffset = 0;
        this.getRatingList({
          shopId: this.shopId,
          offset: this.ratingListOffset,
          tagName: this.ratingTagName,
        });
      },
      changeCatType(type) {
        this.catType = type;
        if (type === 'rating') {
          this.$nextTick(() => {
            this.merRating = new BScroll('.shop-comment', {
              bounce: false,
              scrollY: true,
              click: true,
              probeType: 3,
            });
            this.merRating.on('scroll', (pos) => {
              if (-pos.y >= -this.merRating.maxScrollY && !this.disableLoadMore) {
                this.loadMore();
              }
            });
          });
        }
      },
      changeMenu(index) {
        this.menuIndex = index;
        const tmpIndex = index > 2 ? index - 2 : 0;
        this.merMenus.scrollToElement(this.$refs.menuGroup[tmpIndex], 200);
        this.merFoods.scrollToElement(this.$refs.foodGroup[index], 400);
      },
      loadMore() {
        this.disableLoadMore = true;
        this.ratingListOffset += 5;
        this.getRatingList({
          shopId: this.shopId,
          offset: this.ratingListOffset,
          tagName: this.ratingTagName,
        }).then((result) => {
          this.merRating.refresh();
          if (result.length === 10) {
            this.disableLoadMore = false;
          }
        });
      },
      initData() {
        this.geohash = this.$route.query.geohash;
        this.shopId = this.$route.query.id;
        this.getShopDetail({
          shopid: this.shopId,
          latitude: this.geohash.split(',')[0],
          longitude: this.geohash.split(',')[1],
        });
        this.getMenus(this.shopId).then(() => {
          this.calFoodListHeight();
          this.merMenus = new BScroll('.merchandise-l', {
            bounce: false,
            scrollY: true,
            click: true,
          });
          this.merFoods = new BScroll('.merchandise-r', {
            scrollY: true,
            probeType: 3,
          });
          this.merFoods.on('scroll', (pos) => {
            this.foodListScrollY = -pos.y;
          });
        });
        this.getRatingScores(this.shopId);
        this.getRatingTags(this.shopId);
        this.getRatingList({
          shopId: this.shopId,
          offset: this.ratingListOffset,
          tagName: this.ratingTagName,
          reset: true,
        });
      },
    },
    created() {
      this.initData();
    },
    watch: {
      foodListScrollY(scrollY) {
        const listH = this.foodListHeight;
        let curIndex = 0;
        for (let i = 0; i < listH.length - 1; i += 1) {
          if (listH[i] <= scrollY + i + 1 && listH[i + 1] >= scrollY + i + 1) {
            curIndex = i + 1;
            break;
          } else if (scrollY + i + 1 <= listH[i]) {
            curIndex = 0;
            break;
          }
        }
        this.menuIndex = curIndex;
        curIndex = curIndex > 2 ? curIndex - 2 : 0;
        this.merMenus.scrollToElement(this.$refs.menuGroup[curIndex], 0);
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .go-back {
    position: absolute;
    z-index: 50;
    top: -.05rem;
    left: .02rem;
    i {
      font-size: .4rem;
      color: #fff;
    }
  }
  .shop-header {
    position: relative;
    height: 1.05rem;
    overflow: hidden;
    h2, p, span, i {
      font-size: .12rem;
      color: #fff;
    }
    .header-bg {
      width: 100%;
      position: absolute;
      z-index: 8;
      top: 0;
      left: 0;
      filter: blur(.1rem);
    }
    .header-container {
      position: relative;
      z-index: 10;
      padding: .08rem;
      background-color: rgba(119,103,137,.43);
      .top {
        display: flex;
        img {
          width: .58rem;
          height: .58rem;
          margin-right: .06rem;
        }
        .msg {
          position: relative;
          width: 100%;
          h2 {
            font-size: .16rem;
          }
          p {
            margin: .04rem 0;
          }
          .fa {
            position: absolute;
            font-size: .25rem;
            right: .1rem;
            top: .2rem;
          }
        }
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        margin-top: .08rem;
        .fa {
          margin-left: .1rem;
        }
      }
    }
  }
  .tool-bar {
    display: flex;
    height: .4rem;
    background-color: #fff;
    border-bottom: .01rem solid #ebebeb;
    div {
      flex: 1;
      text-align: center;
      padding: .05rem 0 .12rem;
      span {
        font-size: .13rem;
        color: #666;
        padding: .04rem 0;
        border-bottom: .02rem solid transparent;
        &.active {
          color: #3190e8;
          border-color: #3190e8;
        }
      }
    }
  }
  .shop-container {
    position: absolute;
    top: 1.45rem;
    left: 0;
    bottom: 0;
    width: 100%;
    .shop-merchandise {
      display: flex;
      height: 100%;
      .merchandise-l {
        width: 24%;
        overflow: hidden;
        li {
          height: .54rem;
          line-height: .54rem;
          padding-left: .1rem;
          border-left: .03rem solid transparent;
          border-bottom: .01rem solid #ebebeb;
          &.active {
            background-color: #fff;
            border-left: .03rem solid #3190e8;
            span {
              font-weight: 700;
            }
          }
          img {
            width: .1rem;
            height: .12rem;
          }
          span {
            font-size: .12rem;
            color: #666;
          }
        }
      }
      .merchandise-r {
        flex: 1;
        overflow: hidden;
        ul.food-list {
          li {
            > header {
              display: flex;
              justify-content: space-between;
              line-height: 0.35rem;
              padding: 0 .1rem;
              h4 {
                font-size: .12rem;
                color: #999;
                padding-right: .06rem;
                strong {
                  font-size: .14rem;
                  font-weight: 700;
                  color: #666;
                  margin-right: .05rem;
                }
              }
              > span {
                color: #bbb;
              }
            }
            .food-content {
              display: flex;
              padding: .1rem;
              border-bottom: .01rem solid #f8f8f8;
              background-color: #fff;
              img {
                width: .4rem;
                height: .4rem;
                margin-right: .08rem;
              }
              .food-detail {
                position: relative;
                flex: 1;
                h5, p, span {
                  font-size: .12rem;
                  color: #333;
                }
                h5 {
                  font-size: .14rem;
                  font-weight: 700;
                }
                p {
                  color: #999;
                }
                .detail-bottom {
                  display: flex;
                  justify-content: space-between;
                  span {
                    font-size: .14rem;
                    color: #f60;
                  }
                  .fa {
                    color: #3190e8;
                  }
                }
              }
            }
          }
        }
      }
    }
    .shop-comment {
      height: 100%;
      overflow: hidden;
      .score {
        display: flex;
        margin-bottom: .08rem;
        padding: .2rem;
        background-color: #fff;
        .total {
          flex: 0.9;
          text-align: center;
          h5 {
            font-size: .24rem;
            color: #f60;
          }
          p {
            font-size: .13rem;
            color: #666;
          }
          span {
            font-size: .12rem;
            color: #999;
          }
        }
        .detail {
          flex: 1;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          p {
            display: flex;
            justify-content: space-between;
            font-size: .13rem;
            color: #666;
            line-height: .22rem;
            span {
              font-size: .12rem;
              color: #f60;
            }
          }
        }
      }
      .tag-list {
        display: flex;
        flex-wrap: wrap;
        padding: .1rem;
        background-color: #fff;
        li {
          font-size: .12rem;
          color: #6d7885;
          background-color: #ebf5ff;
          padding: .06rem;
          margin: 0 .08rem .04rem 0;
          border-radius: .05rem;
          &.active {
            color: #fff;
            background-color: #3190e8;
          }
        }
      }
      .comment-list {
        padding: 0 .1rem;
        background-color: #fff;
        li {
          display: flex;
          padding: .1rem 0;
          border-top: .01rem solid #f1f1f1;
          span {
            font-size: .12rem;
            color: #666;
          }
          > img {
            width: .3rem;
            height: .3rem;
            border-radius: 100%;
            margin-right: .16rem;
          }
          > section {
            flex: 1;
            header {
              display: flex;
              justify-content: space-between;
              .time {
                color: #999;
              }
            }
            section {
              div {
                margin: .02rem 0;
                img {
                  width: .6rem;
                  height: .6rem;
                  margin-right: .08rem;
                }
              }
            }
            footer span {
              display: inline-block;
              width: .6rem;
              color: #999;
              padding: .04rem;
              margin-right: .05rem;
              border: .005rem solid #ebebeb;
            }
          }
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-leave, .fade-leave-active {
    display: none;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all .4s;
  }
  .slide-enter, .slide-leave-active {
    transform: translate(2rem, 0);
    opacity: 0;
  }
</style>

<style rel="stylesheet/scss" lang="scss">
  .el-rate__icon,
  .el-icon-star-on {
    font-size: .12rem;
    margin-right: -.02rem;
    transform: scale(.8);
  }
</style>
