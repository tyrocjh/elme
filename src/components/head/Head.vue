<template>
  <header>
    <slot name="logo"></slot>
    <router-link to="login" v-if="signinUp" class="login">
      <span>登录|注册</span>
    </router-link>
  </header>
</template>

<script>
  export default {
    props: ['signinUp'],
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

    .login {
      position: absolute;
      right: .15rem;

      span {
        color: #fff;
      }
    }
  }
</style>
