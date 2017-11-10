<template>
  <div class="food-detail">
    <header-top :head-title="name" go-back=true></header-top>
    <section class="image-section">
      <img :src="baseUrl + '/img/' + imagePath">
    </section>
    <p class="description">{{description}}</p>
    <section class="detail-section">
      <p>{{name}}</p>
      <div class="rating">
        <span>评分</span>
        <el-rate v-model="rating" disabled></el-rate>
        <span class="orange">{{rating.toFixed(1)}}</span>
      </div>
      <p>
        <span>月售 {{monthSales}}单</span>
        <span v-if="price" class="orange">售价 ¥{{price}}起</span>
      </p>
      <p>
        <span>评论数 {{ratingCount}}</span>
        <span>好评率 {{satisfyRate}}%</span>
      </p>
    </section>
  </div>
</template>

<script>
  import { baseUrl } from '@/config/env';
  import headerTop from '@/components/head/Head';

  export default {
    components: { headerTop },
    data() {
      return {
        baseUrl,
        imagePath: '',
        description: '',
        monthSales: '',
        name: '',
        rating: '',
        ratingCount: '',
        satisfyRate: '',
        price: '',
        shopId: '',
      };
    },
    methods: {
      initData() {
        this.imagePath = this.$route.query.image_path;
        this.description = this.$route.query.description;
        this.monthSales = this.$route.query.month_sales;
        this.name = this.$route.query.name;
        this.rating = this.$route.query.rating;
        this.ratingCount = this.$route.query.rating_count;
        this.satisfyRate = this.$route.query.satisfy_rate;
        this.price = this.$route.query.price;
        this.shopId = this.$route.query.shopId;
      },
    },
    created() {
      this.initData();
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .food-detail {
    position: absolute;
    z-index: 60;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;

    p, span {
      font-size: .12rem;
      color: #666;
    }

    .orange {
      color: #f60;
    }

    .image-section {
      img {
        width: 100%;
      }
    }
    .description, .detail-section {
      padding: .08rem;
      p {
        line-height: .25rem;
      }
      .rating {
        display: flex;
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
    color: #f60;
  }
</style>
