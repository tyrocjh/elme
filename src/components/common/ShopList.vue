<template>
  <div class="shoplist-container">
    <ul>
      <li v-for="(shop, index) in shopList" :key="shop.id" class="shop-item">
        <section class="shop-image">
          <img class="shop-img" :src="baseUrl + '/img/' + shop.image_path" />
        </section>
        <section class="shop-detail">
          <header>
            <section>
              <i v-if="shop.is_premium">品牌</i>
              <h4>{{shop.name}}</h4>
            </section>
            <ul>
              <li v-for="item in shop.supports" :key="item.id">{{item.icon_name}}</li>
            </ul>
          </header>
          <div class="evaluate">
            <section class="sale">
              <el-rate v-model="shop.rating" disabled></el-rate>
              <i>{{shop.rating}}</i>
              <span>月售{{shop.recent_order_num}}单</span>
            </section>
            <section class="tip">
              <span v-if="shop.delivery_mode" class="tip1">{{shop.delivery_mode.text}}</span>
              <span class="tip2" v-if="onTime(shop.supports)">准时达</span>
            </section>
          </div>
          <footer>
            <p>¥{{shop.float_minimum_order_amount}}起送 / {{shop.piecewise_agent_fee.tips}}</p>
            <p class="distance">{{shop.distance}} / <span>{{shop.order_lead_time}}</span></p>
          </footer>
        </section>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import { baseUrl } from '@/config/env';

  export default {
    props: ['geohash', 'restaurantCategoryId'],
    data() {
      return {
        baseUrl,
        value1: 4.6,
      };
    },
    computed: {
      ...mapState({
        shopList: ({ shop }) => shop.shopList,
        offset: ({ shop }) => shop.offset,
      }),
    },
    methods: {
      ...mapActions([
        'getShopList',
      ]),
      onTime(supports) {
        let flag = false;
        if ((supports instanceof Array) && supports.length) {
          supports.forEach((item) => {
            if (item.icon_name === '准') {
              flag = true;
            }
          });
        }
        return flag;
      },
      initData() {
        this.getShopList({
          latitude: this.geohash.split(',')[0],
          longitude: this.geohash.split(',')[1],
          restaurantCategoryId: this.restaurantCategoryId,
          offset: this.offset,
        });
      },
    },
    created() {
      this.initData();
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .shoplist-container {
    .shop-item {
      display: flex;
      padding: .12rem .08rem;
      border-bottom: .005rem solid #f1f1f1;

      .shop-image {
        img {
          width: .54rem;
          height: .54rem;
          margin-right: .08rem;
        }
      }

      .shop-detail {
        flex: auto;
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          section {
            i {
              display: inline-block;
              font-size: .12rem;
              font-style: normal;
              font-weight: 700;
              transform: scale(.9);
              color: #333;
              background-color: #ffd930;
            }
            h4 {
              display: inline-block;
              font-size: .13rem;
              font-weight: 700;
              color: #333;
            }
          }
          ul {
            display: flex;
            li {
              font-size: .12rem;
              color: #999;
              border: .01rem solid #f1f1f1;
              margin-right: .01rem;
            }
          }
        }
        .evaluate {
          display: flex;
          justify-content: space-between;
          margin: .05rem 0;
          section {
            display: flex;
            span, i {
              font-size: .12rem;
              color: #666;
            }
            i {
              color: #ff6000;
              font-style: normal;
            }
            &.sale {
              align-items: center;
              span, i {
                transform: scale(.8);
              }
            }
            &.tip {
              transform: scale(.7);
              margin-right: -.1rem;
              span {
                padding: .008rem .016rem;
                margin-left: .003rem;
                border-radius: .02rem;
                &.tip1 {
                  color: #fff;
                  background-color: #3190e8;
                  border: .005rem solid #3190e8;
                }
                &.tip2 {
                  color: #3190e8;
                  border: .005rem solid #3190e8;
                }
              }
            }
          }
        }
        footer {
          display: flex;
          p, span {
            font-size: .12rem;
            color: #666;
            transform: scale(.9);

            &.distance {
              color: #999;
              span {
                color: #3190e8;
              }
            }
          }
        }
      }
    }
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
