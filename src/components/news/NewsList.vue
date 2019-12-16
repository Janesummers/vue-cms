<template>
  <div id="newsList" ref="newsList">
    <Loading v-if="loading" />
    <mt-loadmore :bottom-method="loadBottom" :bottomPullText="text" @bottom-status-change="handleBottomChange" :bottomDropText="hintText" :autoFill="false" ref="loadmore">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.content_id" @click="goNewsInfo(item.content_id,item.title)">
            <div class="img_box">
              <img class="mui-media-object page-lazyload-image" v-lazy="item.img">
            </div>
            <div class="mui-media-body">
              <p class='mui-ellipsis-2 news-title'>{{item.title}}</p>
              <p class='mui-ellipsis news-small'>
                <span>{{item.time}}</span>
                <span>热度：{{item.hits}}次</span>
              </p>
            </div>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import Loading from '../myComponents/loading.vue';
  export default {
    data() {
      return {
        newsList: [
        ],
        pageNo: 1,
        allLoaded: false,
        bottomStatus: '',
        loading: true,
        text : "加载更多",
        hintText: "释放更新",
        loading: true,
        pageSize: 20
      }
    },
    methods: {
      // 下拉状态改变时，
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      scrollListener () {
        // sessionStorage.setItem("scrollTop", document.getElementsByClassName("container")[0].scrollTop);
      },
      loadBottom() {
        if (this.text !== "到底了") {
          //如果数据加载完，修改allLoaded状态
          this.pageNo += 1;
          this.$store.commit('postRequest', {
            uri: '/getNewsByPage',
            data: {
              pageNo: this.pageNo,
              pageSize: this.pageSize
            },
            callBack: (res) => {
              if (res.data.data.length > 0) {
                // let newsList = JSON.parse(localStorage.getItem("newsList"));
                let newsList = this.newsList;
                res.data.data.forEach(item => {
                  newsList.push(item);
                  // newsList.data.push(item);
                });
                this.newsList = newsList;
                // newsList.pageNo = this.pageNo;
                // localStorage.setItem("newsList", JSON.stringify(newsList));
              } else {
                Toast({
                  message: '没有更多啦~',
                  position: 'bottom',
                  duration: 3000
                });
                this.text = "到底了";
                this.hintText = "到底了";
              }
              this.$refs.loadmore.onBottomLoaded();
            }
          });
        } else {
          this.$refs.loadmore.onBottomLoaded();
        }
      },
      goNewsInfo(id,title){
        // sessionStorage.setItem("scrollTop", document.getElementsByClassName("container")[0].scrollTop);
        this.$router.push(`/home/newsInfo?id=${id}&type=news`);
      }
    },
    created() {
      this.$store.commit('setPageTitle', {
        title: '新闻列表'
      });

      let getList = () => {
        this.$store.commit('postRequest', {
          uri: 'https://3g.163.com/touch/reconstruct/article/list/BBM54PGAwangning/30-10.html',
          data: {},
          test: true,
          callBack: res => {
            saveData(res.body.BBM54PGAwangning);
          }
        });
      }

      let saveData = data => {
        this.$store.commit('postRequest', {
          uri: '/saveNews',
          data: {
            news: data
          },
          callBack: () => {
            getData();
            console.log("ok");
          }
        });
      }

      let getData = () => {
        // if (localStorage.getItem("newsList")) {
          // let newsList = JSON.parse(localStorage.getItem("newsList"));
          // console.log(scrollTop);
          // this.loading = false;
          // this.newsList = newsList.data;
          // this.pageNo = newsList.pageNo;
          
          // this.$nextTick(function(){
          //     console.log('数据已经更新');
          // });
          // this.$nextTick(function(){
          //     console.log('v-for渲染已经完成')
          //     let scrollTop = sessionStorage.getItem("scrollTop");
          //     // console.log(document.getElementsByClassName("container")[0].scrollTop);
          //     setTimeout(() => {
          //       document.getElementsByClassName("container")[0].scrollTop = scrollTop;
          //     }, 100)
          // })
        // } else {
          this.$store.commit('postRequest', {
            uri: '/getNewsByPage',
            data: {
              pageNo: this.pageNo,
              pageSize: this.pageSize
            },
            callBack: res => {
              this.loading = false;
              // sessionStorage.setItem("scrollTop", document.getElementsByClassName("container")[0].scrollTop);
              let newsList = {};
              newsList.data = res.data.data;
              newsList.pageNo = 1;
              // localStorage.setItem("newsList", JSON.stringify(newsList));
              this.newsList = res.data.data;
            }
          });
        // }
        
        
        // document.getElementsByClassName("container")[0].scrollTop = scrollTop;
      }


      // getList();
      getData();
    },

    components: {
      Loading
    },
    mounted() {
      // this.scrollBox = this.$refs.newsList;
      // this.scrollBox.addEventListener("scroll", this.scrollListener, false);
    }
  }
</script>

<style lang="less">
  #newsList {
    li {
      display: flex;
      width: 100%;
      .img_box {
        height: 62px;
        overflow: hidden;
        margin-right: 10px;
        min-width: 100px;
        max-width: 100px;
        background: url("../../assets/img/loading2.gif") no-repeat center center / 40px;
        img {
          max-width: 100%;
          height: 62px;
        }
      }
      .mui-media-body {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        // height: 62px;
        justify-content: space-between;
      }
    }
    .news-title {
      font-size: 14px;
      overflow: hidden;
      width: 100%;
    }
    .news-small {
      font-size: 12px;
      display: flex;
      justify-content: space-between;
    }
  }
</style>