<template>
  <div id="home">
    <swiper :data="banner" :auto="6000" />
    <div id="column">
      <ul class="mui-table-view mui-grid-view mui-grid-9" style="width:100%">
          <li tag="li" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/news">
              <img src="../../assets/img/menu1.png" alt="">
              <div class="mui-media-body">新闻资讯</div>
            </router-link>
          </li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/pictureShare">
              <img src="../../assets/img/menu2.png" alt="">
              <div class="mui-media-body">图片分享</div>
            </router-link>
          </li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/goodsList">
              <img src="../../assets/img/menu3.png" alt="">
              <div class="mui-media-body">商品购买</div>
            </router-link>
          </li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
            <img src="../../assets/img/menu4.png" alt="">
            <div class="mui-media-body">留言反馈</div></a></li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
            <img src="../../assets/img/menu5.png" alt="">
            <div class="mui-media-body">视频专区</div></a>
          </li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
            <img src="../../assets/img/menu6.png" alt="">
            <div class="mui-media-body">联系我们</div></a>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import swiper from '../subComponents/Swiper.vue';
  export default {
    data () {
      return {
        banner: []
      }
    },
    components: {
      swiper
    },
    created() {
      this.$store.commit('setPageTitle', {
        title: '首页'
      });
      this.$store.commit('postRequest', {
        uri: '/getImgs',
        data: {
          belongId: '0000000000000000000'
        },
        callBack: (res) => {
          this.banner = res.body.data
        }
      })
    }
  }
</script>

<style lang="less">
  #home {
    position: absolute;
    #column {
      img {
        width: 40px;
        border-radius: 50%;
      }
      .mui-media-body {
        margin-top: 10px;
        font-size: 14px;
      }
      .mui-grid-view.mui-grid-9 {
        background: transparent;
        border: none;
      }
      .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: none;
      }
    }
  }
   
   .mui-media{
     width: 33%
   }
</style>