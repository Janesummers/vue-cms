<template>
  <div id="pictureShare">
    <Loading v-if="loading" />
    <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a 
              class="mui-control-item nav-color" 
              :class="current === item.id ? 'mui-active' : ''"
              data-wid="tab-top-subpage-1.html" 
              v-for="item in navigate" 
              :key="item.id"
              @click.prevent="getData(item.id)"
            >
              {{item.name}}
            </a>
					</div>
				</div>
			</div>
    <div class="shareList">
      <mt-loadmore 
        :bottom-method="loadBottom" 
        @bottom-status-change="handleBottomChange" 
        ref="loadmore" 
        :autoFill="false"
        :bottomPullText="text" 
        :bottomDropText="hintText" 
      >
      <div class="list">
        <ul>
          <li v-for="item in r_data" :key="item.id" @click="toContent(item.content_id, item.title)">
            <img v-lazy="item.src" class="" >
            <div class="text">
              <p class="mui-ellipsis">{{item.title}}</p>
              <p class="mui-ellipsis">{{item.brief.replace(item.title, "").slice(1)}}</p>
            </div>
          </li>
        </ul>
        <ul>
          <li v-for="item in l_data" :key="item.id" @click="toContent(item.content_id, item.title)">
            <img v-lazy="item.src" class="" >
            <div class="text">
              <p class="mui-ellipsis">{{item.title}}</p>
              <p class="mui-ellipsis">{{item.brief.replace(item.title, "").slice(1)}}</p>
            </div>
          </li>
        </ul>
      </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import Loading from '../myComponents/loading.vue';
  // import mui from '../../assets/common/js/mui.js';
  // import zoom from '../../assets/common/js/mui.zoom.js';
  // import previewimage from '../../assets/common/js/mui.previewimage.js';
  export default {
    data () {
      return {
        navigate:[],
        l_data:[],
        r_data: [],
        allLoaded: false,
        bottomStatus: '',
        text : "加载更多",
        hintText: "释放更新",
        current: "",
        pageNo: 1,
        loading: true
      }
    },
    methods: {
      // 下拉状态改变时，
      handleBottomChange(status) {
        this.bottomStatus = status
      },
      loadBottom() {
        if (this.text !== "到底了") {
         this.pageNo += 1;
         this.$store.commit('postRequest', {
            uri: '/getImgs',
            data: {
              belongId : this.current,
              pageNo: this.pageNo,
              pageSize: 4
            },
            callBack: (res) => {
              if (res.data.data.length > 0) {
                let list = JSON.parse(JSON.stringify(res.data.data));
                let l_len = list.length > 1 ? list.length / 2 : 1;
                if (l_len > 1) {
                  list.slice(0, l_len).forEach(item => {
                    this.l_data.push(item);
                  })
                  list.slice(l_len).forEach(item => {
                    this.r_data.push(item);
                  })
                  // this.r_data = list.slice(l_len);
                } else {
                  this.l_data = list;
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
          this.$refs.loadmore.onBottomLoaded();
        }
      },
      getData (id) {
        this.current = id;
        this.loading = true;
        this.$store.commit('postRequest', {
          uri: '/getImgs',
          data: {
            belongId : this.current,
            pageSize: 4
          },
          callBack: (res) => {
            this.loading = false;
            let list = JSON.parse(JSON.stringify(res.body.data));
            let l_len = list.length > 1 ? list.length / 2 : 1;
            if (l_len > 1) {
              this.l_data = list.slice(0, l_len);
              this.r_data = list.slice(l_len);
            } else {
              this.l_data = list;
            }
            this.text = "加载更多";
            this.hintText = "释放更新"; 
            this.pageNo = 1;
          }
        });

        // this.$store.commit('postRequest', {
        //   uri: '/setImgs',
        //   data: {
        //     url: "http://www.win4000.com/mobile_detail_163330.html",
        //     id: "2019081818513310979"
        //   },
        //   callBack: (res) => {
        //     console.log("ok");
        //   }
        // });


      },
      toContent (id, title) {
        this.$router.push(`/home/newsInfo?id=${id}&title=${title}&type=photo`)
      }
    },
    mounted() {
      // mui('.mui-scroll-wrapper').scroll({
      // deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      // });
      // mui.previewImage();
    },
    created() {
      this.$store.commit('setPageTitle', {
        title: '图片分享'
      });
      this.$store.commit('postRequest', {
        uri: '/getImgNavigate',
        data: {},
        callBack: (res) => {
          this.navigate = res.data.data;
          this.current = res.data.data[0].id;
          this.getData(res.data.data[0].id);
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
  #pictureShare {
    background: #f0f0f0;
    padding-top: 40px;
    #slider {
      position: fixed;
      height: 40px;
      background: #fff;
      top: 40px;
      box-shadow: 0px 1px 4px rgba(0,0,0,0.2);
      .mui-segmented-control.mui-scroll-wrapper .mui-control-item {
        padding: 0;
      }
      .mui-scroll {
        width: 100%;
        display: flex;
        a {
          flex: 1;
        }
      }
    }
    .nav-color {
      color: #a5a5a5;
    }
    .mui-active {
      color: #185e9e;
    }
    .shareList {
      margin: 10px;
      .list {
        display: flex;
      }
      ul {
        width: 48%;
        display: flex;
        // flex-wrap: wrap;
        // justify-content: space-between;
        align-items: baseline;
        flex-direction: column;
        &:last-of-type {
          margin-left: 10px;
        }
        li {
          width: 100%;
          position: relative;
          text-align: center;
          background: url("../../assets/img/loading2.gif") no-repeat center center, #fff;
          margin-bottom: 10px;
          border-radius: 10px;
          overflow: hidden;
          // max-height: 120px;
          // min-height: 50px;
          // background: "fff";
          // height: 190px;
          
         
          height: auto;
          p {
            color: #fff;
          }
          img {
            width: 100%;
            // height: auto;
          }
          .text {
            position: absolute;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.4);
            color: #fff;
            padding: 10px;
            text-align: left;
            font-size: 14px;
            width: 100%;
          }
        }
      }     
    }
  }
  .mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active{
    color: #000000;
  }
</style>
