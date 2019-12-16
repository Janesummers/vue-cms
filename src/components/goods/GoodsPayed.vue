<template>
  <div id="goodsPay">
    <Loading v-if="loading" />
    <div class="shopList">
      <div class="shopItem" v-for="item in shopData" :key="item.id">
        <div class="items" v-for="(items, index) in item.list" :key="index">
          <div class="imgBox">
            <img :src="items.img" alt="">
          </div>
          <div class="info">
            <p class="title mui-ellipsis-2">{{items.name}}</p>
            <div class="option">
              <span class="price">￥{{items.price}}</span>
              <span class="payNumber">×{{items.count}}</span>
            </div>
          </div>
        </div>
        <div class="goodsOtherInfo">
          <div class="allPrice">共 {{item.allCount}} 件商品 合计:￥<span>{{item.allPrice}}</span></div>
          <div class="payTime">{{item.time}}</div>
          <div class="payStatus">交易成功</div>
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
          belongId: this.$store.state.userInfo.userId
        },
        callBack: (res) => {
          let data = res.body.data;
          let shopData = [];
          let times = [];
          data.forEach(item => times.push(item.time));
          times = Array.from(new Set(times)).reverse();
          
          for (let i = 0; i < times.length; i++) {
            let item = {
              order_id: '',
              allPrice: 0,
              time: times[i],
              allCount: 0,
              list: []
            };
            for (let j = 0; j < data.length; j++) {
              if (times[i] == data[j].time) {
                if (item.list.length == 0) {
                  item.order_id = data[j].order_id;
                  item.allPrice = data[j].pay_money;
                }
                item.allCount += data[j].count;
                item.list.push({
                  name: data[j].name,
                  price: data[j].price,
                  img: data[j].img,
                  count: data[j].count
                })
              }
            }
            shopData.push(item);
          }
          console.log(shopData)
          
          this.shopData = shopData;
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
        margin-bottom: 16px;
        flex-wrap: wrap;
        .goodsOtherInfo {
          width: 100%;
          font-size: 14px;
          text-align: right;
          line-height: 24px;
          .allPrice {
            span {
              font-size: 17px;
            }
          }
          .payTime {
            color: #c0c0c0;
          }
          .payStatus {
            color: #ef4f4e;
          }
        }
        .items {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-bottom: 10px;
          &:last-of-type {
            margin-bottom: 0;
          }
        }
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
            width: 100%;
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
