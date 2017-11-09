<template>
  <div v-if="shopDetail" class="shop-safe">
    <header-top head-title="食品监督安全公示" go-back=true></header-top>
    <section class="msg-container mt45">
      <header>食品监督安全公示</header>
      <section class="section">
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
            <span>{{shopDetail.identification.identificate_date}}</span>
          </p>
        </div>
      </section>
    </section>
    <section class="msg-container">
      <header>工商登记信息</header>
      <p>企业名称：{{shopDetail.identification.company_name}}</p>
      <p>工商执照注册号：{{shopDetail.identification.identificate_agency}}</p>
      <p>注册资本：{{shopDetail.identification.registered_number}}</p>
      <p>注册地址：{{shopDetail.identification.registered_address}}</p>
      <p>属地监管所：{{shopDetail.identification.registered_principal}}</p>
      <p>法定代表人：{{shopDetail.identification.legal_person}}</p>
      <p>经营范围：{{shopDetail.identification.operation_period}}</p>
    </section>
    <section class="msg-container">
      <header>餐饮许可证</header>
      <p>营业范围：{{shopDetail.identification.operation_period}}</p>
      <p>许可证有效期：{{shopDetail.identification.licenses_date}}</p>
      <p>许可证号：{{shopDetail.identification.licenses_number}}</p>
      <p>发证时间：{{shopDetail.identification.licenses_scope}}</p>
      <p>发证机关：{{shopDetail.identification.registered_principal}}</p>
    </section>
  </div>
</template>

<script>
  import headerTop from '@/components/head/Head';

  export default {
    props: ['shopDetail'],
    components: { headerTop },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .shop-safe {
    position: absolute;
    z-index: 70;
    top: 0;
    left: 0;
    width: 100%;
    background: #ebebeb;
    .msg-container {
      margin-top: .08rem;
      background-color: #fff;
      &.mt45 {
        margin-top: .45rem;
      }
      .section {
        display: flex;
        padding: 0 .12rem .08rem;
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
            padding: .04rem 0;
            border-bottom: 0;
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
      header {
        font-size: .15rem;
        color: #333;
        height: .36rem;
        line-height: .36rem;
        padding: 0 .12rem;
        margin-bottom: .08rem;
        border-bottom: .01rem solid #f1f1f1;
      }
      p {
        font-size: .12rem;
        color: #666;
        padding: .12rem;
        border-bottom: .005rem solid #f1f1f1;
      }
    }
  }
</style>
