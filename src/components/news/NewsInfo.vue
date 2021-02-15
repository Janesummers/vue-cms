<template>
  <div id="newsInfo">
    <Loading v-if="loading" />
    <h4 class="title">{{newsInfo.title || title}}</h4>
    <div class="info">
      <span class="time">发布时间：{{newsInfo.time}}</span>
      <span class="access">阅读数：{{newsHits}}</span>
    </div>
    <preview v-if="type != 'news'" :previewList="imgInfo"/>
    <div class="mainContent">
      <div v-html="newsInfo.content"></div>
    </div>
    <Comment :id="$route.query.id" :btnText="'提交评论'" :hint="'评论内容'" />
  </div>
</template>

<script>
  import preview from '../myComponents/mui-preview.vue'
  import Comment from '../subComponents/Comment.vue';
  import Loading from '../myComponents/loading.vue';
  export default {
    data () {
      return {
        newsInfo: {
          time: '',
          hits: 0,
          content: ''
        },
        newsHits:[],
        id:"",
        imgInfo:{},
        title: "",
        loading: true,
        type: ""
      }
    },
    created() {
      this.type = this.$route.query.type;
      let content = new Promise((resolve, reject) => {
        this.$store.commit('postRequest', {
          uri: '/getImgContentById',
          data: {
            id: this.$route.query.id,
          },
          callBack: (res) => {
            if (res.data.data.length > 0) {
              this.newsInfo = res.data.data[0];
              this.newsInfo.time = res.data.data[0].time;
            }
            resolve();
          }
        });
      })
      let hits = new Promise((resolve, reject) => {
        this.$store.commit('postRequest', {
          uri: '/updateImgContentHitsById',
          data: {
            id: this.$route.query.id,
          },
          callBack: (res) => {
            this.newsHits = res.data.data[0].hits;
            resolve();
          }
        });
      })
      let img = new Promise((resolve, reject) => {
        this.$store.commit('postRequest', {
          uri: '/getImgs',
          data: {
            belongId: this.$route.query.id,
          },
          callBack: (res) => {
            this.imgInfo = res.data.data;
            if (this.type == "photo") {
              this.title = res.data.data[0].title;
              this.newsInfo.time = res.data.data[0].time;
            }
            resolve();
          }
        });
      })
      var allDone = Promise.all([content, hits, img])
      allDone.then(() => {
        this.loading = false;
      })
      this.$store.commit('setPageTitle', {
        title: '详情'
      });
  },
    components: {
      Comment, preview, Loading
    }
  }
</script>

<style lang="less" scoped>
  #newsInfo {
    padding: 0 10px;
    .title{
      // text-align: center;
      font-size: 16px;
      color: #ec2c2c;
      line-height: 22px;
      margin-top: 10px;
    }
    .title{
        overflow: hidden;
    }
    .mainImg{
      width: 100%;
      margin: 10px 10px 10px 0;
      img{
        width:32%
      }
      
    }
    .info {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      line-height: 34px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 14px;
    }
    .mainContent {
      margin-bottom: 10px;
      div {
        text-indent: 2em;
      }
    }
  }
</style>

<style lang="less">
  .mainContent {
    p {
      font-size: 16px;
      line-height: 26px;
    }
    .photo {
      width: 100%;
      text-indent: 0em;
      img {
        width: 100%;
        margin: 14px 0;
      }
    }
  }
  
</style>


