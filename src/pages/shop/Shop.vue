<template>
  <div>
    <!--<header class="shop-header">-->
      <!--<img class="header-bg" src="http://cangdu.org:8001/img/15e386ec1875697.jpeg" />-->
      <!--<div class="header-container">-->
        <!--<section class="top">-->
          <!--<img src="http://cangdu.org:8001/img/15e386ec1875697.jpeg" />-->
          <!--<div class="msg">-->
            <!--<h2>效果演示</h2>-->
            <!--<p>商家配送/分钟送达/配送费</p>-->
            <!--<p>公告：好好吃好好吃</p>-->
            <!--<i class="fa fa-angle-right" aria-hidden="true"></i>-->
          <!--</div>-->
        <!--</section>-->
        <!--<section class="bottom">-->
          <!--<p>满30减5，满60减8（APP专享）</p>-->
          <!--<span>1个活动<i class="fa fa-angle-right" aria-hidden="true"></i></span>-->
        <!--</section>-->
      <!--</div>-->
    <!--</header>-->
    <section class="tool-bar">
      <div @click="changeCatType('food')"><span :class="{active: catType == 'food'}">商品</span></div>
      <div @click="changeCatType('rating')"><span :class="{active: catType == 'rating'}">评价</span></div>
    </section>
    <section class="shop-container">
      <transition name="fade">
        <div v-show="catType == 'food'" class="shop-merchandise">
          <section class="merchandise-l">
            <ul>
              <li>
                <img src="https://fuss10.elemecdn.com/4/73/5c4342691749b8e1a531149a46117jpeg.jpeg" />
                <span>优惠</span>
              </li>
              <li class="active">
                <img src="https://fuss10.elemecdn.com/4/73/5c4342691749b8e1a531149a46117jpeg.jpeg" />
                <span>优惠</span>
              </li>
              <li>
                <span>优惠</span>
              </li>
              <li class="active">
                <span>优惠</span>
              </li>
            </ul>
          </section>
          <section class="merchandise-r">
            <header>
              <h4><strong>优惠</strong>美味又实惠，大家快来抢！</h4><span>···</span>
            </header>
            <ul class="food-list">
              <li>
                <img src="http://cangdu.org:8001/img/15e3880a1525709.jpeg" />
                <section class="food-detail">
                  <h5>比萨</h5>
                  <p>此处一共20个字不信你看看咯此处一共20个</p>
                  <span>月售605份 好评率45%</span>
                  <div class="detail-bottom">
                    <span>￥20</span>
                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                  </div>
                </section>
              </li>
              <li>
                <img src="http://cangdu.org:8001/img/15e3880a1525709.jpeg" />
                <section class="food-detail">
                  <h5>比萨</h5>
                  <p>此处一共20个字不信你看看咯此处一共20个</p>
                  <span>月售605份 好评率45%</span>
                  <div class="detail-bottom">
                    <span>￥20</span>
                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                  </div>
                </section>
              </li>
              <li>
                <img src="http://cangdu.org:8001/img/15e3880a1525709.jpeg" />
                <section class="food-detail">
                  <h5>比萨</h5>
                  <p>此处一共20个字不信你看看咯此处一共20个</p>
                  <span>月售605份 好评率45%</span>
                  <div class="detail-bottom">
                    <span>￥20</span>
                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                  </div>
                </section>
              </li>
            </ul>
          </section>
        </div>
      </transition>
      <transition name="fade">
        <div v-show="catType == 'rating'" class="shop-comment">
          <section class="score">
            <div class="total">
              <h5>4.4</h5>
              <p>综合评价</p>
              <span>高于周边商家76.9%</span>
            </div>
            <div class="detail">
              <p>服务态度<span>4.7</span></p>
              <p>菜品评价<span>4.7</span></p>
              <p>送达时间<span class="time">分钟</span></p>
            </div>
          </section>
          <ul class="tag-list">
            <li class="active">全部（567）</li>
            <li>满意（123）</li>
            <li>不满意（23）</li>
            <li>食材新鲜（5）</li>
            <li>有图（56）</li>
            <li>味道好（111）</li>
          </ul>
          <ul class="comment-list">
            <li>
              <img src="http://test.fe.ptdev.cn/elm/elmlogo.jpeg" />
              <section>
                <header>
                  <span>4****b</span>
                  <span class="time">2017-02-10</span>
                </header>
                <section>
                  <span>按时送达</span>
                  <div>
                    <img src="https://fuss10.elemecdn.com/d/c8/64033625905f0a15a2d181d53a425jpeg.jpeg" />
                    <img src="https://fuss10.elemecdn.com/d/c8/64033625905f0a15a2d181d53a425jpeg.jpeg" />
                  </div>
                </section>
                <footer>
                  <span>超级...</span>
                  <span>韩式...</span>
                </footer>
              </section>
            </li>
            <li>
              <img src="http://test.fe.ptdev.cn/elm/elmlogo.jpeg" />
              <section>
                <header>
                  <span>4****b</span>
                  <span class="time">2017-02-10</span>
                </header>
                <section>
                  <span>按时送达</span>
                  <div>
                    <img src="https://fuss10.elemecdn.com/d/c8/64033625905f0a15a2d181d53a425jpeg.jpeg" />
                    <img src="https://fuss10.elemecdn.com/d/c8/64033625905f0a15a2d181d53a425jpeg.jpeg" />
                  </div>
                </section>
                <footer>
                  <span>超级...</span>
                  <span>韩式...</span>
                </footer>
              </section>
            </li>
            <li>
              <img src="http://test.fe.ptdev.cn/elm/elmlogo.jpeg" />
              <section>
                <header>
                  <span>4****b</span>
                  <span class="time">2017-02-10</span>
                </header>
                <section>
                  <span>按时送达</span>
                  <div>
                    <img src="https://fuss10.elemecdn.com/d/c8/64033625905f0a15a2d181d53a425jpeg.jpeg" />
                    <img src="https://fuss10.elemecdn.com/d/c8/64033625905f0a15a2d181d53a425jpeg.jpeg" />
                  </div>
                </section>
                <footer>
                  <span>超级...</span>
                  <span>韩式...</span>
                </footer>
              </section>
            </li>
          </ul>
        </div>
      </transition>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        catType: 'rating',
      };
    },
    methods: {
      changeCatType(type) {
        this.catType = type;
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .shop-header {
    position: relative;
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
    .shop-merchandise {
      display: flex;
      .merchandise-l {
        width: 24%;
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
            }
          }
          > span {
            color: #bbb;
          }
        }
        ul.food-list {
          li {
            display: flex;
            padding: .1rem;
            background-color: #fff;
            border-bottom: .01rem solid #f8f8f8;
            img {
              width: .4rem;
              height: .4rem;
              margin-right: .08rem;
            }
            .food-detail {
              position: relative;
              h5, p, span {
                font-size: .12rem;
                color: #333;
              }
              h5 {
                font-size: .14rem;
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
    .shop-comment {
      .score {
        display: flex;
        margin-bottom: .12rem;
        padding: .2rem;
        background-color: #fff;
        .total {
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
          p {
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
              color: #999;
              padding: .04rem;
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
</style>
