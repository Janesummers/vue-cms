<template>
  <div id="shop" :class="shopData.length > 0 ? 'isData' : ''">
    <Loading v-if="loading" />
    <div class="shopList" v-if="shopData.length > 0">
      <div class="shopItem" v-for="item in shopData" :key="item.id">
        <div class="swithBtn">
          <input class="checkBtn iconfont icon-dagou" type="checkBox" :checked="item.choose" @click="choose(item.id)">
        </div>
        <div class="imgBox">
          <img :src="item.img" alt="">
        </div>
        <div class="info">
          <p class="title mui-ellipsis-2">{{item.title}}</p>
          <div class="option">
            <span class="price">￥{{item.price}}</span>
            <div class="mui-numbox" id="payCount">
              <button class="mui-btn mui-numbox-btn-minus1" type="button" @click="reduce(item.id)">-</button>
              <input class="mui-numbox-input1" type="number" v-model="item.count" @input="change($event, item.id)"  />
              <button class="mui-btn mui-numbox-btn-plus1" type="button" @click="plus(item.id)">+</button>
            </div>
          </div>
          <span class="del iconfont icon-shanchu" @click="del(item.id)"></span>
        </div>
      </div>
    </div>
    <div class="shopClearing" v-if="shopData.length > 0">
      <div class="swithBtn">
        <label for="all">
          <input class="checkBtn iconfont icon-dagou" name="all" type="checkBox" :checked="all" @click="allChoose">全选
        </label>
      </div>
      <div class="clear">
        <span class="allPrice">合计：<span>￥{{allPrice}}</span></span>
        <span class="clearBtn" :class="chooseCount < 1 ? 'clearCart' : ''" @click="count">结算( {{chooseCount}} )</span>
      </div>
    </div>
    <div class="noData" v-if="shopData.length <= 0">
      <span class="ico iconfont icon-gouwuche2"></span>
    </div>
  </div>
</template>

<script>
  import Loading from '../myComponents/loading.vue';
  import {Toast} from 'mint-ui'
  export default {
    data () {
      return {
        value: false,
        shopData: [],
        allPrice: 0,
        chooseCount: 0,
        all: false,
        origin: '',
        loading: true
      }
    },
    created () {
      this.origin = this.$store.getters.getOrigin;
      this.shopData = this.$store.getters.getShop;
      this.$store.commit('setPageTitle', {
        title: '购物车'
      });
    },
    methods: {
      plus (id) {
        this.shopData.forEach(item => {
          if (item.id === id) {
            if (item.left_count > item.count) {
              item.count += 1;
              this.$store.commit('goodsNum', {
                id,
                value: item.count
              });
              return;
            } else {
              Toast({
                message: '已经不能再多了',
                position: 'bottom',
                duration: 1000
              });
            }
          }
        });
        
      },
      reduce (id) {
        this.shopData.forEach(item => {
          if (item.id === id) {
            if (item.count > 1) {
              item.count -= 1;
              this.$store.commit('goodsNum', {
                id,
                value: item.count
              });
              return;
            } else {
              Toast({
                message: '已经不能再少了',
                position: 'bottom',
                duration: 1000
              });
            }
          }
        });
        
      },
      del (id) {
        this.$store.commit('goodsDel', {
          id
        });
      },
      change (e, payload) {
        this.shopData.forEach(item => {
          if (item.id === payload) {
            if (Number(item.left_count) < Number(e.target.value)) {
              item.count = item.left_count;
            }
            this.$store.commit('goodsNum', {
              id: payload,
              value: item.count
            });
            return;
          }
        });
      },
      choose (payload) {
        this.$store.commit('chooseGoods', {
          id: payload
        });
      },
      count(){
        if(this.chooseCount > 0){
          let list = this.shopData.filter(item => {
            return item.choose;
          })
          this.$store.commit('postRequest', {
            uri: '/payForGoods',
            data: {
              belongId: this.$store.state.userInfo.userId,
              list,
              allPrice: this.allPrice
            },
            callBack: (res) => {
              this.$store.commit('getShopCar');
              this.$router.push('/shopping/goodsCount')
            }
          })
         }
      },
      allChoose () {
        if (this.all) {
          this.$store.commit('chooseAll', 'cancel');
        } else {
          this.$store.commit('chooseAll', 'all');
        }
        this.all = !this.all;
      }
    },
    components: {
      Loading
    },
    watch: {
      "$store.getters.getShop": {
        handler (n, o) {
          this.shopData = n;
          let allPrice = 0;
          let chooice = n.filter(item => {
            return item.choose == true;
          });
          chooice.forEach(item => {
            allPrice += item.price * item.count;
          });
          if (chooice.length == n.length) {
            this.all = true;
          } else {
            this.all = false;
          }
          this.allPrice = allPrice;
          this.chooseCount = chooice.length;
        },
        deep: true
      },
      "shopData": {
        handler () {
          this.loading = false;
        },
        deep: true
      }
    },
  }
</script>

<style lang="less">
  #shop {
    background: #f0efef;
    .swithBtn {
      min-height: 100%;
      min-width: 20px;
      align-items: center;
      display: flex;
      label {
        font-size: 12px;
      }
      .checkBtn {
        margin: 0;
        border: none;
        outline: none;
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        position: relative;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #ccc;
        vertical-align: middle;
        margin-right: 8px;
        &::after {
          width: 20px;
          height: 20px;
          position: absolute;
          left: 0px;
          top: 0px;
          content: "";
        }
        &:checked {
          background: #ef4f4e;
          border-color: #ef4f4e;
          &::before{
            display: block;
          }
        }
        &::before {
          color: #fff;
          text-align: center;
          width: 20px;
          height: 20px;
          display: none;
          line-height: 20px;
          font-size: 12px;
          position: absolute;
          left: -1px;
          top: 0;
        }
      }
    }
    .shopList {
      overflow: hidden;
      padding: 10px;
      .shopItem {
        display: flex;
        padding: 12px 10px;
        background: #fff;
        justify-content: space-between;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 10px;
        &:last-of-type {
          margin-bottom: 0;
        }
        .imgBox {
          max-width: 70px;
          max-height: 70px;
          overflow: hidden;
          border-radius: 6px;
          img {
            width: 100%;
          }
        }
        .info {
          width: 60%;
          position: relative;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          justify-content: space-between;
          .title {
            font-size: 14px;
            color: #000;
            width: calc(~"100% - 24px");
            margin-bottom: 10px;
            line-height: 18px;
          }
          .option {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            .price {
              font-size: 16px;
              color: #ef4f4e;
            }
            #payCount {
              height: 28px;
              padding: 0 30px;
              width: 110px;
              border-color: #ddd;
              .mui-btn {
                width: 30px;
                background: #fff;
              }
            }
          }
          .del {
            position: absolute;
            right: 0;
            top: 0;
            width: 24px;
            height: 24px;
            text-align: center;
            z-index: 10;
            color: #ccc;
          }
        }
      }
    }
    .shopClearing {
      position: fixed;
      bottom: 50px;
      width: 100%;
      background: #fff;
      height: 50px;
      padding: 8px 10px;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #e2e0e0;
      .clear {
        font-size: 14px;
        height: 100%;
        display: flex;
        align-items: center;
        .allPrice {
          span {
            color: #ef4f4e;
          }
        }
        .clearBtn {
          display: flex;
          height: 100%;
          background: #ef4f4e;
          color: #f2f2f2;
          align-items: center;
          padding: 0 20px;
          margin-left: 10px;
          border-radius: 20px;
        }
        .clearCart {
          background: #c1c1c1;
        }
      }
    }
    .noData {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .ico {
        font-size: 100px;
        color: #b2b2b2;
        &::after {
          content: "空空如也";
          font-size: 20px;
          display: block;
          margin-top: 50px;
          text-align: center;
        }
      }
    }
  }
</style>
