<template>
  <div id="vip">
    <div class="userInfo">
      <div class="imgBox mb10">
        <img src="../../assets/img/t.jpeg" alt="">
      </div>
      <p class="username mui-ellipsis">{{userInfo.username}}</p>
    </div>
    <div class="list">
      <ul>
        <router-link tag="li" class="item" to="/vip/pay">
          <span class="l-ico iconfont icon-xiangmujianjie"></span>
          <span class="text">全部订单</span>
          <span class="r-ico iconfont icon-xiang-you"></span>
        </router-link>
        <li class="item" @click="loginOut">
          <span class="l-ico iconfont icon-tuichu"></span>
          <span class="text">退出登录</span>
          <span class="r-ico iconfont icon-xiang-you"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userInfo: {}
      }
    },
    created () {
      let isPay = this.$route.query.isPay;
      if (isPay) {
        this.$router.push('/vip/pay');
      } else {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
          this.userInfo = userInfo;
          this.$store.commit('setPageTitle', {
            title: '会员中心'
          });
        } else {
          this.$router.push('/vip/login');
        }
      }
      
    },
    methods: {
      loginOut () {
        localStorage.removeItem('userInfo');
        this.$store.state.userInfo = null;
        this.$store.commit('setShopData' ,[]);
        this.$router.push('/vip/login');
      }
    }
  }
</script>

<style lang="less">
  #vip {
    .userInfo {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 20px 0;
      margin: 0 10px;
      border-bottom: 1px solid #e8e6e6;
      .imgBox {
        width: 80px;
        overflow: hidden;
        border-radius: 50%;
        height: 80px;
        img {
          width: 100%;
        }
      }
      .username {
        width: 80%;
        text-align: center;
      }
    }
    .list {
      padding: 0 10px;
      .item {
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        position: relative;
        border-bottom: 1px solid #e8e6e6;
        display: flex;
        align-items: center;
        .l-ico {
          font-size: 20px;
          margin-right: 10px;
        }
        .text {
          font-size: 14px;
        }
        .r-ico {
          color: #d7d7d7;
          font-size: 12px;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
</style>