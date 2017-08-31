<template>
  <header>
    <slot name="logo"></slot>
    <router-link to="login" v-if="signinUp">
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
    background-color: #3190e8;
  }
</style>
