<template>
  <div id="movieList">
    <Loading v-if="loading" />
    <mt-loadmore 
      :bottom-method="loadBottom" 
      @bottom-status-change="handleBottomChange" 
      ref="loadmore" 
      :autoFill="false"
      :bottomPullText="text" 
      :bottomDropText="hintText" 
    >
      <div class="list">
        <div class="item" v-for="item in movieList" :key="item.content_id" @click="goMovieInfo(item)">
          <div class="img_box">
            <img v-lazy="item.img" alt="">
          </div>
          <div class="info">
            <p class="title">{{item.name}}</p>
            <div class="durations">
              <p class="type">导演：</p>
              <p class="text">{{item.directors}}</p>
            </div>
            <div class="durations">
              <p class="type">主演：</p>
              <p class="text">{{item.casts || "无"}}</p>
            </div>
            <div class="durations">
              <p class="type">类型：</p>
              <p class="text">{{item.genres}}</p>
            </div>
            <div class="durations">
              <p class="type">评分：</p>
              <p class="text">{{item.average > 0 ? item.average : "暂无"}}</p>
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
        text: "welcome",
        pageNo: 1,
        pageSize: 10,
        movieList: [],
        allLoaded: false,
        bottomStatus: '',
        loading: true,
        text : "加载更多",
        hintText: "释放更新",
      }
    },
    methods: {
      handleBottomChange (status) {
        this.bottomStatus = status;
      },
      loadBottom () {
        if (this.text !== "到底了") {
          this.pageNo += 1;
          this.$store.commit('postRequest', {
            uri: '/getGoods',
            data: {
              pageNo: this.pageNo
            },
            callBack: (res) => {
              if (res.data.data.length > 0) {
                l.forEach(item => this.goodsList_l.push(item));
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
      goMovieInfo (data) {
        this.$router.push(`/home/movieInfo?data=${JSON.stringify(data)}`);
      }
    },
    created () {
      this.$store.commit('setPageTitle', {
        title: '电影推荐'
      });
      this.$store.commit('postRequest', {
        uri: '/getMovie',
        data: {
          pageNo: this.pageNo,
          pageSize: 30
        },
        callBack: (res) => {
          this.movieList = res.body.data;
          this.loading = false
        }
      })
      // this.$store.commit('postRequest', {
      //   uri: '/saveMovie',
      //   data: {},
      //   callBack: (res) => {
      //     console.log("ok");
          
      //   }
      // })
    },
    components:{
      Loading
    }
    
  }
</script>

<style lang="less" scoped>
  #movieList {
    .list {
      .item {
        display: flex;
        overflow: hidden;
        padding: 5px;
        position: relative;
        align-items: center;
        &::after {
          display: block;
          content: "";
          clear: both;
          width: calc(~"100% - 106px");
          height: 1px;
          background: #e4e4e4;
          position: absolute;
          right: 0;
          bottom: 0;
        }
        .img_box {
        min-width: 90px;
        max-width: 90px;
        overflow: hidden;
        background: url("../../assets/img/loading2.gif") no-repeat center center / 40px;
        // max-height: 130px;
        margin-right: 10px;
          img {
            width: 100%;
          }
        }
        .info {
          .title {
            font-size: 16px;
            color: #000;
            font-weight: 500;
            margin-bottom: 4px;
          }
          .durations {
            display: flex;
            .type {
              font-size: 13px;
              color: #6e6e6e;
              min-width: 40px;
            }
            .text {
              font-size: 13px;
              color: #6e6e6e;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
</style>