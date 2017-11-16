<template>
  <div>
    <header-top head-title="密码登录" go-back=true></header-top>
    <div class="login-container">
      <form id="login-form">
        <section>
          <input name="account" type="text" placeholder="账号" v-model="account" required />
        </section>
        <section>
          <input v-if="!showPwd" name="password" type="password" placeholder="密码" v-model="password" required />
          <input v-else name="password" type="text" placeholder="密码" v-model="password" required />
          <i class="fa fa-eye" aria-hidden="true" v-if="showPwd" @click="togglePwd"></i>
          <i class="fa fa-eye-slash" aria-hidden="true" v-else @click="togglePwd"></i>
        </section>
        <section class="verification">
          <input name="verification" type="text" placeholder="验证码" v-model="verification" required />
          <div>
            <img :src="captchas" />
            <p>
              <span>看不清</span>
              <span @click="changeCaptchas">换一张</span>
            </p>
          </div>
        </section>
      </form>
      <section class="tips">
        <p>温馨提示：未注册过的账号，登录时将自动注册</p>
        <p>注册过的用户可凭账号密码登录</p>
      </section>
      <section class="login">
        <button type="submit" form="login-form" class="login-btn" @click="login">登录</button>
      </section>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import headerTop from '@/components/head/Head';

  export default {
    components: { headerTop },
    data() {
      return {
        account: '',
        password: '',
        verification: '',
        showPwd: false,
      };
    },
    computed: {
      ...mapState({
        captchas: ({ base }) => base.captchas,
        userInfo: ({ user }) => user.userInfo,
      }),
    },
    methods: {
      ...mapActions([
        'getCaptchas',
        'accountLogin',
      ]),
      togglePwd() {
        this.showPwd = !this.showPwd;
      },
      changeCaptchas() {
        this.getCaptchas();
      },
      login(e) {
        e.preventDefault();
        this.accountLogin({
          username: this.account,
          password: this.password,
          captcha_code: this.verification,
        }).then(() => {
          this.$router.push('/');
        }, (data) => {
          this.$message.error(data.message);
          this.changeCaptchas();
        });
      },
    },
    created() {
      this.changeCaptchas();
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .login-container {
    padding-top: .55rem;
    div, p, a, span {
      color: #666;
    }
    #login-form {
      background-color: #fff;
      section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .05rem .15rem;
        border-bottom: .01rem solid #f1f1f1;
        &:last-child {
          border-bottom: 0;
        }
        input {
          font-size: .14rem;
          padding: .05rem;
          outline: none;
          border: none;
        }
      }
      section.verification {
        display: flex;
        justify-content: space-between;
        >div {
          display: flex;
          align-items: center;
          img {
            margin-right: .1rem;
          }
          p {
            display: flex;
            flex-direction: column;
            span {
              font-size: .12rem;
              &:last-child {
                color: #3b95e9;
              }
            }
          }
        }
      }
    }
    .tips {
      padding: .06rem .1rem;
      p {
        font-size: .12rem;
        color: #ff0000;
        line-height: .22rem;
      }
    }
    .login {
      padding: 0 .1rem;
      .login-btn {
        width: 100%;
        padding: .1rem 0;
        color: #fff;
        background-color: #4cd964;
        border: 0;
        border-radius: .04rem;
      }
    }
  }
</style>
