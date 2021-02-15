<template>
  <div id="app">
    <Ball :s="ballShow" />
    <mt-header 
      fixed 
      :title="pageTitle"
    >
      <span @click="backTo" slot="left" v-if="back">
        <mt-button icon="back">返回</mt-button>
      </span>
      <mt-button @click="clearCar" slot="right" v-if="isCar">清空购物车</mt-button>
    </mt-header>
    <transition name="cut-page">
      <router-view class="container"></router-view>      
    </transition>
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home"  >
        <div @click.prevent="toPage('/home')">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </div>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <div @click.prevent="toPage('/search')">
          <span class="mui-icon mui-icon-search"></span>
          <span class="mui-tab-label">搜索</span>
        </div>
      </router-link>
      <router-link class="mui-tab-item" to="/shopping">
        <div @click.prevent="toPage('/shopping')">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart" id="sh">
            <span class="dot">{{shopNum}}</span>
          </span>
          <span class="mui-tab-label">购物车</span>
        </div>
      </router-link>
      <router-link class="mui-tab-item" to="/vip">
        <div @click.prevent="toPage('/vip')">
          <span class="mui-icon mui-icon-contact"></span>
          <span class="mui-tab-label">会员</span>
        </div>
      </router-link>
		</nav>
  </div>
</template>

<script>
  import Ball from './components/myComponents/ball.vue';
  export default {
    methods: {
      toPage (path) {
        this.$router.push(path)
      },
      backTo () {
        let path = this.$route.path;
        if (path == "/vip/pay") {
          this.$router.push("/vip");
        } else {
          this.$router.back();
        }
      },
      clearCar () {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
          this.$store.commit('postRequest', {
            uri: '/clearAllMyGoods',
            data: {
              belongId: userInfo.userId,
              list: this.$store.state.shopData
            },
            callBack: (res) => {
              this.$store.state.shopData = [];
              this.$store.state.shopnum = 0;
            }
          });
        }
      }
    },
    computed: {
      back () {
        let path = this.$route.path;
        return path !== '/home' && path !== '/search' && path !== '/shopping' && path !== '/vip' && path !=='/vip/login' && path !== '/shopping/goodsCount';
      },
      ballShow () {
        return this.$store.getters.ball;
      },
      shopNum () {
        return this.$store.state.shopnum;
      },
      pageTitle () {
        return this.$store.getters.getPageTitle;
      },
      isCar () {
        let path = this.$route.path;
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        return path === '/shopping' && userInfo && this.$store.state.shopnum > 0;
      }
    },
    created() {
      this.origins = this.$store.getters.getOrigin;
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        this.$store.state.userInfo = userInfo;
        this.$store.commit('postRequest', {
          uri: '/getMyShopCart',
          data: {
            belongId: userInfo.userId
          },
          callBack: (res) => {
            res.body.data.forEach(item => item.choose = false);
            this.$store.commit('setShopData', res.body.data)
          }
        });
      }
    },
    components: {
      Ball
    }
  }
</script>

<style lang="less">
  #app {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    .mint-header {
      background: #2f2f2f;
    }
    .mui-bar-tab .mui-tab-item {
      overflow: visible;
    }
    .mui-bar-tab  {
      .mui-tab-item {
        color: #a0a0a0;
        .mui-icon {
          font-weight: 600;
        }
        &.mui-active {
          color: #2f2f2f;
        }
      }
    }
    #sh {
      position: relative;
      .dot {
        position: absolute;
        left: 14px;
        top: -3px;
        height: 16px;
        background: #ef4f4f;
        border-radius: 20px;
        color: #fff;
        z-index: 20;
        line-height: 16px;
        font-size: 12px;
        padding: 0 10px;
      }
    }
    .container {
      width: 100%;
      margin: 40px 0 50px 0;
      height: calc(~"100% - 90px");
      overflow: hidden;
      overflow-y: scroll;
      position: fixed;
      left: 0;
    }
    .cut-page-enter {
      left: 50%;
      opacity: 0;
    }
    .cut-page-leave-to {
      left: 0;
      opacity: 1;
    }
    .cut-page-enter-active{
      transition: all 0.5s ease-in;
    }
  }
</style>
