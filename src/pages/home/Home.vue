<template>
  <div>
    <home-header signin-up="home">
      <span slot="logo" class="logo" @click="reload">ele.me</span>
    </home-header>
    <nav class="city-nav">
      <p class="msg">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </p>
      <router-link :to="/city/" class="choose">
        <span>广州</span>
        <i class="fa  fa-angle-right" aria-hidden="true" @click="toggleScreenfull"></i>
      </router-link>
    </nav>
    <section class="popular-city">
      <h4>热门城市</h4>
      <ul class="clearfix">
        <li>广州</li><li>广州</li><li>广州</li><li>广州</li><li>广州</li><li>广州</li><li>广州</li><li>广州</li>
      </ul>
    </section>
    <section class="group-city-section">
      <ul>
        <li class="group-city">
          <h4>A</h4>
          <ul class="clearfix">
            <li>肇庆</li><li>肇庆</li><li>肇庆</li><li>肇庆</li><li>肇庆</li><li>肇庆</li><li>肇庆</li><li>肇庆</li><li>肇庆</li><li>肇庆</li><li>肇庆</li>
          </ul>
        </li>
        <li class="group-city">
          <h4>B</h4>
          <ul class="clearfix">
            <li>肇庆</li><li>肇庆</li><li>肇庆</li><li>肇庆</li><li>肇庆</li><li>肇庆</li><li>肇庆</li><li>肇庆</li><li>肇庆</li><li>肇庆</li><li>肇庆</li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import HomeHeader from '@/components/head/Head';

  export default {
    components: { HomeHeader },
    methods: {
      reload() {
        window.location.reload();
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .logo {
    font-size: .14rem;
    color: #fff;
    margin-left: .1rem;
  }
  .city-nav {
    background-color: #fff;
    padding-top: .45rem;
    margin-bottom: 0.1rem;
    border-bottom: .02rem solid #e4e4e4;

    .msg {
      display: flex;
      justify-content: space-between;
      padding: .1rem;
      border-bottom: .01rem solid #e4e4e4;

      span:nth-of-type(1) {
        font-size: .12rem;
        color: #666;
      }
      span:nth-of-type(2) {
        font-size: .12rem;
        font-weight: 900;
        color: #9f9f9f;
      }
    }

    .choose {
      display: flex;
      justify-content: space-between;
      padding: .1rem;

      span {
        font-size: .15rem;
        color: #3190e8;
      }

      i {
        font-size: .2rem;
        color: #999;
      }
    }
  }

  .popular-city, .group-city {
    border-top: .02rem solid #e4e4e4;
    background-color: #fff;

    h4 {
      font-size: .12rem;
      color: #666;
      height: .32rem;
      line-height: .32rem;
      text-indent: .1rem;
    }

    ul {
      border-top: .01rem solid #e4e4e4;
      li {
        font-size: .12rem;
        color: #3190e8;
        float: left;
        width: 25%;
        height: .34rem;
        line-height: .34rem;
        text-align: center;
        border-bottom: .01rem solid #e4e4e4;
        border-right: .01rem solid #e4e4e4;

        &:nth-of-type(4n) {
          border-right: none;
        }
      }
    }
  }
</style>
