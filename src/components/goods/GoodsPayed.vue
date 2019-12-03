<template>
  <div id="goodsPay">
    <Loading v-if="loading" />
    <div class="shopList">
      <div class="shopItem" v-for="item in shopData" :key="item.id">
        <div class="imgBox">
          <img :src="item.img" alt="">
        </div>
        <div class="info">
          <p class="title mui-ellipsis-2">{{item.title}}</p>
          <div class="option">
            <span class="price">￥{{item.price}}</span>
            <span class="payNumber">×{{item.count}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from '../myComponents/loading.vue';
  export default {
    data () {
      return {
        shopData: [],
        origin: '',
        loading: true
      }
    },
    created () {
      this.origin = this.$store.getters.getOrigin;
      this.$store.commit('setPageTitle', {
        title: '已购买'
      });
      this.$store.commit('postRequest', {
        uri: '/getMyGoods',
        data: {
          belongId: this.$store.state.userInfo.userId,
          status: 1
        },
        callBack: (res) => {
          this.shopData = res.body.data;
          this.loading = false;
        }
      });
    },
    components: {
      Loading
    }
  }
</script>

<style lang="less">
  #goodsPay {
    background: #f0efef;
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
          width: 76%;
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
            .payNumber {
              font-size: 14px;
              color: #a5a2a2;
            }
          }
        }
      }
    }
  }
</style>
