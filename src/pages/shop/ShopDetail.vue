<template>
  <div v-if="shopDetail" class="shop-detail">
    <header-top head-title="商家详情" go-back=true></header-top>
    <section class="activity-container">
      <header class="head">活动与属性</header>
      <ul>
        <li v-for="item in shopDetail.activities" :key="item.id">
          <span :style="{backgroundColor: '#' + item.icon_color}" class="icon">{{item.icon_name}}</span>
          <span>{{item.description}}(APP专享)</span>
        </li>
      </ul>
      <ul>
        <li v-for="item in shopDetail.supports" :key="item.id">
          <span :style="{backgroundColor: '#' + item.icon_color}" class="icon">{{item.icon_name}}</span>
          <span>{{item.description}}(APP专享)</span>
        </li>
      </ul>
    </section>
    <section class="status-container">
      <router-link to="/shop/shopDetail/shopSafe" class="head">
        <h4>食品监督安全公示</h4>
        <span>企业认证详情<i class="fa fa-angle-right" aria-hidden="true"></i></span>
      </router-link>
      <section class="detail">
        <div class="image">
          <i class="fa fa-smile-o well" aria-hidden="true" v-if="shopDetail.status == 1"></i>
          <i class="fa fa-frown-o bad" aria-hidden="true" v-else></i>
        </div>
        <div class="message">
          <p>
            <span>监督检查结果：</span>
            <span class="well" v-if="shopDetail.status == 1">良好</span>
            <span class="bad" v-else>差</span>
          </p>
          <p>
            <span>检查日期：</span>
            <span>{{shopDetail.identification.identificate_date && shopDetail.identification.identificate_date.split('T')[0]}}</span>
          </p>
        </div>
      </section>
    </section>
    <section class="merchant-info">
      <header class="head">商家信息</header>
      <p>{{shopDetail.name}}</p>
      <p>地址：{{shopDetail.address}}</p>
      <p>营业时间：[{{shopDetail.opening_hours[0]}}]</p>
      <p @click="handleLicenseImg(shopDetail.license.business_license_image)">
        <span>营业执照</span>
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </p>
      <p @click="handleLicenseImg(shopDetail.license.catering_service_license_image)">
        <span>餐饮服务许可证</span>
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </p>
    </section>
    <transition name="fade">
      <section class="license-container" v-if="showLicenseImg" @click="showLicenseImg = false">
        <img :src="baseUrl + '/img/' + licenseImg">
      </section>
    </transition>
    <transition name="slide" mode="out-in">
      <router-view :shopDetail="shopDetail"></router-view>
    </transition>
  </div>
</template>

<script>
  import headerTop from '@/components/head/Head';
  import { baseUrl } from '@/config/env';

  export default {
    props: ['shopDetail'],
    components: { headerTop },
    data() {
      return {
        baseUrl,
        licenseImg: '',
        showLicenseImg: false,
      };
    },
    methods: {
      handleLicenseImg(image) {
        this.licenseImg = image;
        this.showLicenseImg = true;
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .shop-detail {
    position: absolute;
    z-index: 60;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ebebeb;

    .head {
      font-size: .15rem;
      color: #333;
      height: .36rem;
      line-height: .36rem;
      padding: 0 .12rem;
      margin-bottom: .08rem;
      border-bottom: .01rem solid #f1f1f1;
    }

    .activity-container {
      margin-top: .53rem;
      padding-bottom: .03rem;
      background-color: #fff;
      ul {
        padding: 0 .12rem;
        li {
          margin-bottom: .1rem;
          span {
            font-size: .12rem;
            color: #666;
            &.icon {
              color: #fff;
              margin-right: .04rem;
              padding: .02rem;
              border-radius: .05rem;
            }
          }
        }
      }
    }

    .status-container {
      margin-top: .08rem;
      background-color: #fff;
      padding-bottom: .1rem;
      .head {
        display: flex;
        justify-content: space-between;
        h4 {
          font-size: .15rem;
          font-weight: normal;
        }
        span {
          font-size: .14rem;
          color: #bbb;
          .fa {
            font-size: .15rem;
            padding-left: .05rem;
            color: #bbb;
          }
        }
      }
      .detail {
        display: flex;
        padding: 0 .12rem;
        .image {
          margin-right: .1rem;
          .fa {
            font-size: .50rem;
            &.well {
              color: #7ED321;
            }
            &.bad {
              color: #FF0000;
            }
          }
        }
        .message {
          p {
            span {
              font-size: .12rem;
              &.well {
                color: #7ED321;
              }
              &.bad {
                color: #FF0000;
              }
            }
          }
        }
      }
    }

    .merchant-info {
      margin-top: .08rem;
      background-color: #fff;
      .head {
        margin-bottom: 0;
      }
      p {
        display: flex;
        justify-content: space-between;
        font-size: .12rem;
        color: #666;
        padding: .12rem;
        border-bottom: .005rem solid #f1f1f1;
        span {
          font-size: .12rem;
          color: #666;
        }
      }
    }

    .license-container {
      position: fixed;
      z-index: 101;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.5);
      img {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-active {
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
