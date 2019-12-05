<template>
  <div id="movieInfo">
    <Loading v-if="loading" />
    <div id="videoBox" v-if="info.video">
      <video :src="info.video" :poster="info.videoImg" controls></video>
    </div>
    <div class="duration cut">
      <div class="title">简介</div>
      <div class="text" v-html="info.duration"></div>
    </div>
    <div class="casts cut">
      <div class="title">演职人员</div>
      <div class="list">
        <div class="item" v-for="item in casts" :key="item.id">
          <div class="img_box">
            <img :src="item.img" alt="">
          </div>
          <p class="name mui-ellipsis">{{item.name.split(" ")[0]}}</p>
          <p class="rule mui-ellipsis">{{item.rule}}</p>
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
        text: "详情",
        casts: [],
        info: [],
        video: {
            sources: [{
                src: '',
                type: 'video/mp4'
            }],
            options: {
                autoplay: false,
                volume: 0.6,
                poster: ''
            }
        },
        loading: true
      }
    },
    created () {
      let data = JSON.parse(this.$route.query.data);
      this.$store.commit('setPageTitle', {
        title: "电影详情"
      });
      this.$store.commit('postRequest', {
        uri: '/getMovieInfo',
        data: {
          belongId: data.content_id
        },
        callBack: (res) => {
          this.casts = res.data.data.casts;
          this.info = res.data.data.info;
          this.video.sources[0].src = res.data.data.info.video;
          this.video.options.poster = res.data.data.info.videoImg;
          this.$nextTick()
          this.$nextTick(() => {
            this.loading = false;
          })
        }
      });
    },
    components: {
      Loading
    }
  }
</script>

<style lang="less" scoped>
  #movieInfo {
    #videoBox {
      width: 100%;
      overflow: hidden;
      video {
        width: 100%;
        vertical-align: top;
      }
    }
    .cut {
      .title {
        font-size: 18px;
        width: 90%;
        margin: 0 auto 10px;
      }
      padding: 20px 0;
      position: relative;
      &::after {
        display: block;
        width: 90%;
        height: 1px;
        position: absolute;
        left: 5%;
        background: #e8e8e8;
        clear: both;
        content: "";
      }
      &::after {
        bottom: 0;
      }
    }
    .duration {
      .text {
        color: #717171;
        padding: 0 16px;
        line-height: 24px;
      }
    }
    .casts {
      .list {
        display: flex;
        overflow: hidden;
        overflow-x: scroll;
        padding: 5px;
        .item {
        min-width: 90px;
        max-width: 90px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
          .img_box {
            border-radius: 6px;
            width: 92%;
            overflow: hidden;
            margin-bottom: 10px;
            img {
              width: 100%;
            }
          }
          .name {
            color: #000;
          }
          .name, .rule {
            overflow: hidden;
            width: 90%;
            text-align: center;
            font-size: 13px;
          }
          .rule {
            font-size: 12px;
          }
        }
      }
    }
  }
</style>