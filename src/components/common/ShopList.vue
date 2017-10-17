<template>
  <div class="shoplist-container">
    <ul>
      <li class="shop-item">
        <section class="shop-image">
          <img class="shop-img" src="http://cangdu.org:8001/img/15e386ec1875697.jpeg" />
        </section>
        <section class="shop-detail">
          <header>
            <section>
              <i>品牌</i>
              <h4>效果显示</h4>
            </section>
            <ul>
              <li>保</li><li>准</li><li>票</li>
            </ul>
          </header>
          <div class="evaluate">
            <section class="sale">
              <el-rate v-model="value1" disabled></el-rate>
              <i>4.4</i>
              <span>月售612单</span>
            </section>
            <section class="tip">
              <span class="tip1">蜂鸟专送</span>
              <span class="tip2">准时达</span>
            </section>
          </div>
          <footer>
            <p>¥20起送 / 配送费约¥5</p>
            <p class="distance">1371公里 / <span>21小时2分钟</span></p>
          </footer>
        </section>
      </li>
      <li class="shop-item">
        <section class="shop-image">
          <img class="shop-img" src="http://cangdu.org:8001/img/15e386ec1875697.jpeg" />
        </section>
        <section class="shop-detail">
          <header>
            <section>
              <i>品牌</i>
              <h4>效果显示</h4>
            </section>
            <ul>
              <li>保</li><li>准</li><li>票</li>
            </ul>
          </header>
          <div class="evaluate">
            <section class="sale">
              <el-rate v-model="value1" disabled></el-rate>
              <i>4.4</i>
              <span>月售612单</span>
            </section>
            <section class="tip">
              <span class="tip1">蜂鸟专送</span>
              <span class="tip2">准时达</span>
            </section>
          </div>
          <footer>
            <p>¥20起送 / 配送费约¥5</p>
            <p class="distance">1371公里 / <span>21小时2分钟</span></p>
          </footer>
        </section>
      </li>
      <li class="shop-item">
        <section class="shop-image">
          <img class="shop-img" src="http://cangdu.org:8001/img/15e386ec1875697.jpeg" />
        </section>
        <section class="shop-detail">
          <header>
            <section>
              <i>品牌</i>
              <h4>效果显示</h4>
            </section>
            <ul>
              <li>保</li><li>准</li><li>票</li>
            </ul>
          </header>
          <div class="evaluate">
            <section class="sale">
              <el-rate v-model="value1" disabled></el-rate>
              <i>4.4</i>
              <span>月售612单</span>
            </section>
            <section class="tip">
              <span class="tip1">蜂鸟专送</span>
              <span class="tip2">准时达</span>
            </section>
          </div>
          <footer>
            <p>¥20起送 / 配送费约¥5</p>
            <p class="distance">1371公里 / <span>21小时2分钟</span></p>
          </footer>
        </section>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: 4.6,
      };
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
