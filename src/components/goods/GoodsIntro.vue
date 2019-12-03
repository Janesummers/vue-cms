<template>
<div class="GoodsInfo">
  <!-- <div class="mui-card mb10">
    <div class="mui-card-header">{{list.name}}</div>
  </div> -->
  <div class="mui-card">
    <div v-for="item in commentImg" :key="item.id">
      <img alt="" v-lazy="item.src" data-preview-src="" data-preview-group="1">
    </div>
  </div>
  
    <!-- <div class="mui-card mb10">
    <div class="mui-card-content parameter">
      <div class="mui-card-header">详情信息</div>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{commentContent.content}}
      </div>
  </div> -->
</div>
  
</template>

<script>
// import swiper from '../subComponents/Swiper.vue';
import mui from '../../assets/common/js/mui.js'
import mui2 from '../../assets/common/js/mui.previewimage.js'
import mui3 from '../../assets/common/js/mui.zoom.js'
  export default {
    created() {
      this.$store.commit('setPageTitle', {
        title: '商品图文详情',
      });
      // let data = JSON.parse(this.$route.query.data);
      let data = JSON.parse(this.$route.query.data);
      this.list = data;
      this.$store.commit('postRequest', {
        uri: '/getImgs',
        data: {
          belongId: data.content_id,
          pageSize: 100
        },
        callBack: (res) => {
          this.commentImg = res.data.data;
        }
      });
      // this.$store.commit('postRequest', {
      //   uri: '/getImgContentById',
      //   data: {
      //     id: data.content_id
      //   },
      //   callBack: (res) => {
      //     this.commentContent = res.data.data[0];
      //   }
      // });
    },
    data() {
      return {
        list:[],
        commentImg:[],
        commentContent:[]
      }
    },
    mounted() {
        mui.previewImage();
        mui.plusReady(function() {})
    },
    components:{
      // swiper
    }
  }
</script>
<style lang="less" scoped>
  .GoodsInfo {
    background: #eee;
    .mui-card {
      margin: 0;
      padding-bottom: 10px;
      img{
        width: 100%;
        background: url("../../assets/img/loading2.gif") no-repeat center center;
      }
      .mui-card-content {
        &.parameter {
          color: #888;
        }
        padding: 14px;
      }
      .mui-card-footer {
        display: block;
      }
    }
  }
  .mui-card-header{
    text-align: center;
  }
</style>