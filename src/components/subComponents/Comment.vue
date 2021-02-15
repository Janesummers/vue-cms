<template>
  <div id="comment">
    <h4>发表评论</h4>
    <div class="commentContent">
      <mt-field :placeholder="hint" type="textarea" rows="4" v-model="content"></mt-field>
      <mt-button type="danger" size="large" @click="addComment">{{btnText}}</mt-button>
    </div>
    <div v-if="list.length===0" class="comment-props">
        还没有评论，来发表第一篇评论吧！
    </div>
    
    <div v-else class="commentList"> 
      <h4>精彩评论</h4>
      <mt-loadmore 
        :bottom-method="loadBottom" 
        :bottomPullText="text" 
        @bottom-status-change="handleBottomChange" 
        :bottomDropText="hintText" 
        :autoFill="false" 
        ref="loadmore"
      >
      <ul>
        <!-- <li v-for="(item, index) in list" :key="item.id"> -->
        <li v-for="item in list" :key="item.id">
            <div class="comment-props" >
              <!-- <span>第{{index+1}}楼</span> -->
              <span>{{item.user_name}}</span>
              <span>{{item.time}}</span>
            </div>
            <div class="comment-text">{{item.content}}</div>
        </li>
      </ul>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
  export default {
    data() {
      return {
        content:"",
        comment:[],
        list: [],
        pageNo:1,
        allLoaded: false,
        bottomStatus: '',
        loading: true,
        text : "加载更多",
        hintText: "释放更新",
        loading: true,
        allow: false,
        type: 0
      }
    },
    props:['id', 'btnText', 'hint'],
    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      loadBottom() {
        if (this.text !== "到底了") {
         this.pageNo += 1;
         this.$store.commit('postRequest', {
            uri: '/getCommentByPage',
            data: {
              belongId : this.id,
              pageNo:this.pageNo,
              pageSize: 10
            },
            callBack: (res) => {
              if (res.data.data.length > 0) {
                res.data.data.forEach(item => this.list.push(item));
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
           Toast({
                message: '没有更多啦~',
                position: 'bottom',
                duration: 3000
              });
          this.$refs.loadmore.onBottomLoaded();
        }
      },
      getId(){
        var d = new Date()
        return `${d.getFullYear()}${d.getMonth() + 1 <= 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1}${d.getDate() <= 9 ? '0' + d.getDate() : d.getDate()}${d.getHours() <= 9 ? '0' + d.getHours() : d.getHours()}${d.getMinutes() <= 9 ? '0' + d.getMinutes() : d.getMinutes()}${d.getSeconds() <= 9 ? '0' + d.getSeconds() : d.getSeconds()}${Math.floor((Math.random() + 1) * 10000)}`
      },
      addComment(){
        if (this.content === "") {
          Toast('请输入内容')
        } else if (this.content.length >= 20){
          Toast('输入内容不能超过20')

        } else if (!this.allow){
          Toast('请登录')
        } else {
          let data = {
            id : this.getId(),
            belongId : this.id,
            userId : this.$store.state.userInfo.userId,
            userName : this.$store.state.userInfo.username,
            content : this.content,
            time : this.getTime(),
            type: this.type
          }
          this.list.unshift({
            user_name : this.$store.state.userInfo.username,
            content : this.content,
            time : this.getTime()
          });
          this.$store.commit('postRequest', {
            uri: '/addComment',
            data,
            callBack: (res) => {
              this.comment = res.data.data;
            }
          });
          this.content = "";
        }
      },
      getTime () {
        let d = new Date();
        // return `${d.getFullYear()}-${d.getMonth() + 1 <= 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1}-${d.getDate() <= 9 ? '0' + d.getDate() : d.getDate()} ${d.getHours() <= 9 ? '0' + d.getHours() : d.getHours()}:${d.getMinutes() <= 9 ? '0' + d.getMinutes() : d.getMinutes()}:${d.getSeconds() <= 9 ? '0' + d.getSeconds() : d.getSeconds()}`
        return `${d.getFullYear()}年${d.getMonth() + 1 <= 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1}月${d.getDate() <= 9 ? '0' + d.getDate() : d.getDate()}日`;
      },
      getComment(){
        this.$store.commit('postRequest', {
          uri: '/getCommentByPage',
          data: {
            belongId: this.id,
            pageNo: this.pageNo,
            pageSize: 10
          },
          callBack: (res) => {
            this.list = res.data.data;
          }
        });
      }
    },
    created() {
      this.getComment()
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        this.allow = true;
        this.$store.state.userInfo = userInfo;
      }
      if (this.$route.path.includes('userComment')) {
        this.type = 1;
      }
    } 
  }

</script>

<style lang="less" scoped>
  #comment {
    .commentContent {
      margin-bottom: 20px;

      .mint-field {
        border: 1px solid #ccc;
        border-radius: 6px;
        margin: 10px 0;
       
      }
    }

    .commentList {
      margin-bottom: 10px;
      > h4 {
        line-height: 40px;
      }
      .comment-props {
        display: flex;
        justify-content: space-between;
        height: 30px;
        font-size: 13px;
        line-height: 30px;
        background: #d7d7d7;
        padding: 0 6px;
        color: #4d4d4d;
        border-radius: 4px 4px 0 0;
        margin-bottom: 0;
      }

      .comment-text {
        font-size: 16px;
        display: block;
        min-height: 30px;
        line-height: 30px;
        padding: 10px 6px;
      }
    }
    .comment-props {
        display: flex;
        justify-content: space-between;
        height: 50px;
        font-size: 17px;
        line-height: 44px;
        background: #d7d7d7;
        padding: 4px 10px;
        color: #4d4d4d;
        border-radius: 4px 4px 4px 4px;
        margin-bottom: 20px;
      }
  }
</style>