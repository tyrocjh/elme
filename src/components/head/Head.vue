<template>
  <header>
    <slot name="logo"></slot>
    <section class="go-back" v-if="goBack">
      <i class="fa fa-angle-left" aria-hidden="true"></i>
    </section>
    <section class="head-title" v-if="headTitle">
      <span>{{headTitle}}</span>
    </section>
    <router-link to="login" v-if="signinUp" class="login">
      <span>登录|注册</span>
    </router-link>
    <slot name="changeCity"></slot>
  </header>
</template>

<script>
  export default {
    props: ['signinUp', 'headTitle', 'goBack'],
    data() {
      return {
        msg: 'header',
      };
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  header {
    position: fixed;
    background-color: #3190e8;
    height: .45rem;
    line-height: .45rem;
    width: 100%;

    .go-back {
      display: inline-block;
      margin-left: .1rem;
      i {
        color: #fff;
        font-size: .22rem;
      }
    }

    .head-title {
      position: absolute;
      width: 100%;
      top: 0;
      text-align: center;
      span {
        font-weight: 700;
        color: #fff;
      }
    }

    .login {
      font-size: .14rem;
      position: absolute;
      right: .15rem;
      span {
        color: #fff;
      }
    }
  }
</style>
