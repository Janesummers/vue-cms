<template>
  <div id="payed">
    <div class="box">
      <span class="iconfont icon-dagou1 ico"></span>
      <div class="count-text">恭喜您，支付成功！</div>
      <mt-button type="primary" size="small" class="btn" @click="viewPay">查看已购买</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      viewPay(){
        this.$router.push('/vip?isPay=true')
      }
    },
    created() {
      this.$store.commit('setPageTitle', {
        title: '结算'
      });
    },
  }
</script>

<style lang="less" scoped>
  #payed {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #d0cdcd;
    .box {
      width: 70%;
      padding: 40px 0;
      background: #fff;
      border-radius: 10px;
      .ico {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 100px;
        max-height: 100px;
        color: #50c52d;
        line-height: 100px;
      }
      .count-text {
        text-align: center;
        width: 100%;
        max-height: 50px;
        line-height: 50px;
        margin-bottom: 80px;
        font-size: 14px;
      }
      .btn {
        background: #50c52d;
        border-radius: 30px;
        padding: 0 20px;
      }
    }
  }
</style>