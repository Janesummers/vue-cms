<template>
  <div id="GoodsInfo">
    
    <div class="mui-card">
      <swiper :data="banner" :auto="0" />
    </div>
    <div class="mui-card mb10">
      <div class="mui-card-header">{{goodsInfo.name}}</div>
      <div class="mui-card-content">
        <div class="price mb10">
          市场价：<span class="oriPrice">￥{{goodsInfo.old_price}}</span>
          销售价：<span class="prePrice">￥{{goodsInfo.new_price}}</span>
        </div>
        <div class="payNum mb10">
          购买数量：
          <div class="mui-numbox" id="payCount">
            <button class="mui-btn mui-numbox-btn-minus1" type="button" @click="reduce">-</button>
            <input class="mui-numbox-input" type="number" v-model="payNumber" @input="checkMax" />
            <button class="mui-btn mui-numbox-btn-plus1" type="button" @click="plus">+</button>
          </div>
        </div>
        <div class="option">
          <mt-button type="primary" class="mr10" size="small" @click="addShop('now')">立即购买</mt-button>
          <mt-button type="danger" size="small" id="toShopcart" @click="addShop('add')">加入购物车</mt-button>
        </div>
      </div>
    </div>
    <div class="mui-card mb10">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content parameter">
        <!-- <div class="mb10">
          商品货号：{{goodsInfo.id}}
        </div> -->
        <div class="mb10">
          库存情况：{{goodsInfo.left_count}}
        </div>
        <!-- <div class="mb10">
          上架时间：{{goodsInfo.time}}
        </div> -->
      </div>
      <div class="mui-card-footer">
        <mt-button plain type="primary" size="large" class="mb10" @click="toIntro(goodsInfo)">图文介绍</mt-button>
        <mt-button plain type="danger" size="large" @click="toComment(goodsInfo)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  // 编程式导航：this.$router.push({...})
  import swiper from '../subComponents/Swiper.vue';
  import { Toast } from 'mint-ui';
  export default {
    data () {
      return {
        payNumber: 1,
        goodsInfo:[],
        banner: [],
        origins: '',
        allow: false,
        userInfo: {}
      }
    },
    methods: {
      toComment (data) {
        this.$router.push(`/home/goodsComment?data=${JSON.stringify(data)}`)
      },
      toIntro(data){
        this.$router.push(`/home/goodsIntro?data=${JSON.stringify(data)}`)
      },
      addShop (opc) {
        if (this.allow) {
          this.$store.state.ballBg = this.banner[0].src;
          this.$store.commit("setBall", {
            value: true
          });
          let exits = false;
          this.$store.state.shopData.forEach(item => {
            if (item.goods_id === this.goodsInfo.id) {
              exits = true;
              item.count = Number(item.count) + Number(this.payNumber);
              this.$store.commit('goodsNum', {
                id: item.id,
                value: item.count
              });
            }
          });
          if (!exits) {
            this.$store.commit('postRequest', {
              uri: '/addToCar',
              data: {
                belongId: this.userInfo.userId,
                goodsId: this.goodsInfo.id,
                count: this.payNumber,
                content_id: this.goodsInfo.content_id
              },
              callBack: (res) => {
                if (res.data.data == 1) {
                  getCar();
                } else {
                  Toast({
                    message: '网络异常，请重新添加',
                    position: 'middle',
                    duration: 2000
                  });
                }
              }
            });

            let getCar = () => {
              this.$store.commit('postRequest', {
                uri: '/getMyShopCart',
                data: {
                  belongId: this.userInfo.userId,
                  pageNo: 1,
                  pageSize: 10
                },
                callBack: (res) => {
                  if (res.data.code !== 'error') {
                    res.body.data.forEach(item => item.choose = false);
                    this.$store.commit('setShopData', res.body.data);
                    Toast({
                      message: '添加成功',
                      position: 'middle',
                      duration: 2000
                    });
                    if (opc === 'now') {
                      this.$router.push('/shopping')
                    }
                  }
                }
              });
            }
          }
        } else {
          Toast({
            message: '请先登录',
            position: 'middle',
            duration: 2000
          });
        }
      },
      plus (max) {
        if (this.payNumber < this.goodsInfo.left_count) {
          this.payNumber += 1;
        } else {
          Toast({
            message: '不能再多了',
            position: 'middle',
            duration: 2000
          });
        }
      },
      reduce () {
        if (this.payNumber > 1) {
          this.payNumber -= 1;
        }
      },
      checkMax (e) {
        if (parseInt(e.target.value) > this.goodsInfo.left_count) {
          this.payNumber = this.goodsInfo.left_count;
        }
      }
    },
    components: {
      swiper
    },
    created() {
      this.origins = this.$store.getters.getOrigin;
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        this.allow = true;
        this.$store.state.userInfo = this.userInfo = userInfo;
      }
      this.$store.commit('setPageTitle', {
        title: '商品详情'
      });
      let data = JSON.parse(this.$route.query.data);
      this.goodsInfo = data;
      this.$store.commit('postRequest', {
        uri: '/getImgs',
        data: {
          belongId: data.id,
          pageSize: 10
        },
        callBack: (res) => {
          this.banner = res.data.data;
        }
      });
    },
  }
</script>

<style lang="less">
  #GoodsInfo {
    background: #eee;
    #banner {
      height: 360px;
    }
    .mui-card {
      margin: 0;
      #banner {
        margin: 0;
        border-radius: 0;
      }
      .mui-card-content {
        &.parameter {
          color: #888;
        }
        padding: 14px;
        .price {
          font-size: 14px;
          .oriPrice {
            text-decoration: line-through;
          }
          .prePrice {
            font-size: 16px;
            color: #ef3838;
          }
        }
        .payNum {
          .mui-numbox {
            height: 32px;
          }
        }
      }
      .mui-card-footer {
        display: block;
      }
    }
  }
</style>
