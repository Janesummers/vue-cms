<template>

  <div id="goodsList">

    <mt-loadmore 
      :bottom-method="loadBottom" 
      @bottom-status-change="handleBottomChange" 
      ref="loadmore" 
      :autoFill="false"
      :bottomPullText="text" 
      :bottomDropText="hintText" 
    >

      <div class="list" >
        <div class="l_list">
          <div class="goodsInfo" v-for="item in goodsList_l" :key="item.id" @click="getGoodsInfo(item)">
            <div class="imgBox">
              <img :src="item.img" alt="">
            </div>
            <p class="goodsName mui-ellipsis-2">{{item.name}}</p>
            <div class="bottom">
              <p class="goodsPrice">
                <span class="prePrice"><span class="unit">￥</span>{{item.new_price}}</span>
                <span class="oriPrice">￥{{item.old_price}}</span>
              </p>
              <!-- <p class="surplus">
                <span>{{item.status}}</span>
                <span>剩 {{item.left_count}} 件</span>
              </p> -->
            </div>
          </div>
        </div>
        <div class="r_list">
          <div class="goodsInfo" v-for="item in goodsList_r" :key="item.id" @click="getGoodsInfo(item)">
            <div class="imgBox">
              <img v-lazy="item.img">
            </div>
            <p class="goodsName mui-ellipsis-2">{{item.name}}</p>
            <div class="bottom">
              <p class="goodsPrice">
                <span class="prePrice"><span class="unit">￥</span>{{item.new_price}}</span>
                <span class="oriPrice">￥{{item.old_price}}</span>
              </p>
              <!-- <p class="surplus">
                <span>{{item.status}}</span>
                <span>剩 {{item.left_count}} 件</span>
              </p> -->
            </div>
          </div>
        </div>
      </div>
    </mt-loadmore>
  </div> 
</template>

<script>

  import { Toast } from 'mint-ui'
  import Loading from '../myComponents/loading.vue';
  export default {
    data () {
      return {
        goodsList_l: [],
        goodsList_r: [],
        allLoaded: false,
        bottomStatus: '',
        loading: true,
        text : "加载更多",
        hintText: "释放更新",
        loading: true,
        pageNo: 1
      }
    },
    methods: {
      // 下拉状态改变时，
      handleBottomChange (status) {
        this.bottomStatus = status;
      },
      loadBottom(){
        if (this.text !== "到底了") {
          this.pageNo += 1;
          this.$store.commit('postRequest', {
            uri: '/getGoods',
            data: {
              pageNo: this.pageNo
            },
            callBack: (res) => {
              if (res.data.data.length > 0) {
                let cut = Math.ceil(res.data.data.length / 2);
                if (cut > 1) {
                  let l = res.data.data.slice(0, cut);
                  let r = res.data.data.slice(cut);
                  l.forEach(item => this.goodsList_l.push(item));
                  r.forEach(item => this.goodsList_r.push(item));
                } else {
                  this.goodsList.push(res.data.data[0]);
                }
                
              } else {
                this.text = "到底了";
                this.hintText = "到底了";
                Toast({
                  message: '没有更多啦~',
                  position: 'bottom',
                  duration: 3000
                });
              }
              this.$refs.loadmore.onBottomLoaded();
            }
          });
        } else {
          Toast({
                message: '没有更多啦~',
                position: 'bottom',
                duration: 3000
              });
          this.$refs.loadmore.onBottomLoaded();
        }
      },
      getGoodsInfo(data){
        this.$router.push(`/home/goodsInfo?data=${JSON.stringify(data)}`)
      }
    },
    created() {
      this.$store.commit('setPageTitle', {
        title: '商品列表'
      });

      this.$store.commit('postRequest', {
        uri: '/getGoods',
        data: {
          pageNo: 1
        },
        callBack: (res) => {
          this.loading= false;
          let cut = Math.ceil(res.data.data.length / 2);
          if (cut > 1) {
            let l = res.data.data.slice(0, cut);
            let r = res.data.data.slice(cut);
            l.forEach(item => this.goodsList_l.push(item));
            r.forEach(item => this.goodsList_r.push(item));
          } else {
            this.goodsList_l.push(res.data.data[0]);
          }
        }
      });

      // this.$store.commit('postRequest', {
      //   uri: '/setGoods',
      //   data: {
      //   },
      //   callBack: (res) => {
      //     console.log("ok")
      //   }
      // });

      // this.$store.commit('postRequest', {
      //   uri: '/saveGoodsDetail',
      //   data: {
      //   },
      //   callBack: (res) => {
      //     console.log("ok")
      //   }
      // });
    },
    components:{
      Loading
    }
  }
</script>

<style lang="less">
  #goodsList {
    background: #f0f0f0;
    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 12px 12px 0;
      // flex-direction: column;
      .l_list, .r_list {
        display: flex;
        flex-direction: column;
        width: 48%;
      }
      .goodsInfo {
        width: 100%;
        overflow: hidden;
        margin-bottom: 14px;
        height: auto;
        background: #fff;
        border-radius: 10px;
        .imgBox {
          width: 100%;
          overflow: hidden;
          background: url("../../assets/img/loading2.gif") no-repeat center center / 60px;
          img {
            width: 100%;
          }
        }
        .goodsName {
          margin: 6px 0;
          padding: 0 8px;
          line-height: 18px;
          margin-bottom: 0;
        }
        .bottom {
          // background: #e9e9e9;
          .goodsPrice {
            padding: 8px;
            // padding-bottom: 0;
            .prePrice {
              font-size: 18px;
              color: #e22e18;
              margin-right: 5px;
              .unit {
                font-size: 12px;
              }
            }
            .oriPrice {
              font-size: 12px;
              color: #929394;
              text-decoration: line-through;
            }
          }
          .surplus {
            padding: 5px;
            display: flex;
            justify-content: space-between;
            color: #929394;
          }
        }
      }
    }
  }
</style>
