<template>
  <header>
    <slot name="logo"></slot>
    <slot name="search"></slot>
    <section class="go-back" v-if="goBack" @click="$router.go(-1)">
      <i class="fa fa-angle-left" aria-hidden="true"></i>
    </section>
    <section class="head-title" v-if="headTitle">
      <span>{{headTitle}}</span>
    </section>
    <slot name="msite-title"></slot>
    <router-link :to="userInfo ? '/profile' : '/login'" v-if="signinUp" class="login">
      <i class="fa fa-user-o" aria-hidden="true" v-if="userInfo"></i>
      <span v-else>登录|注册</span>
    </router-link>
    <slot name="changeCity"></slot>
  </header>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    props: ['signinUp', 'headTitle', 'goBack'],
    computed: {
      ...mapState({
        userInfo: ({ user }) => user.userInfo,
      }),
    },
    methods: {
      ...mapActions([
        'getUser',
      ]),
    },
    created() {
      if (!this.userInfo) {
        this.getUser();
      }
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  header {
    position: fixed;
    z-index: 100;
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
      width: 50%;
      top: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      text-align: center;
      span {
        font-weight: 700;
        color: #fff;
      }
    }

    .login {
      position: absolute;
      right: .15rem;
      span {
        font-size: .12rem;
        color: #fff;
      }
      .fa {
        color: #fff;
      }
    }
  }
</style>
