<template>
  <div>
    <div class="mui-content">
      <form class="mui-input-group">
        <div class="mui-input-row">
          <label>昵称</label>
          <input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入昵称" v-model="nick">
        </div>
        <div class="mui-input-row">
          <label>账号</label>
          <input id='nick' type="text" class="mui-input-clear mui-input" placeholder="请输入账号" v-model="username">
        </div>
        <div class="mui-input-row">
          <label>密码</label>
          <input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码" v-model="password">
        </div>
        <div class="mui-input-row">
          <label>确认</label>
          <input id='password_confirm' type="password" class="mui-input-clear mui-input" placeholder="请确认密码" v-model="passwprdConfirm">
        </div>
      </form>
      <div class="mui-content-padded">
        <button id='reg' class="mui-btn mui-btn-block mui-btn-danger" @click="reg">注册</button>
      </div>
    </div>
  </div>
</template>
<script>
  import { Indicator } from 'mint-ui';
  import { Toast } from 'mint-ui'
  export default {
    data () {
      return {
        nick:"",
        username:"",
        password:"",
        passwprdConfirm:""
      }
    },
    created () {
      this.$store.commit('setPageTitle', {
        title: '注册'
      });
    },
    methods:{
      
      reg(){
        let regexp = {
          'space': /\s/
        }
        if(this.nick == ""){
          Toast("请输入昵称")
        }else if(this.username.match(regexp.space)){
          Toast("用户名存在非法字符")
        }else if(this.username ==""){
          Toast("请输入用户名")
        }else if(this.password ==""){
          Toast("请输入密码")
        }else if(this.password.length <= 5){
          Toast("密码太短，请输入5位以上")
        }else if(this.password != this.passwprdConfirm){
          Toast("两次密码不一致")
        }else if(this.password.match(regexp.space)){
          Toast("密码非法字符")
        }else{
          Indicator.open({
            text: '注册中...'
          });
          let data ={name:this.username,nick:this.nick,pwd:this.password};
          this.$store.commit('postRequest', {
            uri: '/regist',
            data,
            callBack: (res) => {
              Indicator.close();
              if(res.data.code =="ok"){
                Toast("注册成功");
                this.$router.push('/vip/login');
              }else if (res.data.data=="nick/name已存在"){
                Toast("昵称或者用户名已存在")
              }else{
                Toast("出现了一些奇怪的错误，请稍后重试")
              }
            }
          });
        }
    },
    
    }
  }
</script>
<style scoped>
  .area {
    margin: 20px auto 0px auto;
  }
  .mui-content{
    background: none
  }
  .mui-input-group {
    margin-top: 10px;
    margin: 10px
  }

  .mui-input-group:first-child {
    margin-top: 20px;
  }

  .mui-input-group label {
    width: 22%;
  }

  .mui-input-row label~input,
  .mui-input-row label~select,
  .mui-input-row label~textarea {
    width: 78%;
  }

  .mui-checkbox input[type=checkbox],
  .mui-radio input[type=radio] {
    top: 6px;
  }

  .mui-content-padded {
    margin-top: 25px;
  }

  .mui-btn {
    padding: 10px;
  }

  .link-area {
    display: block;
    margin-top: 25px;
    text-align: center;
  }

  .spliter {
    color: #bbb;
    padding: 0px 8px;
  }

  .oauth-area {
    position: absolute;
    bottom: 20px;
    left: 0px;
    text-align: center;
    width: 100%;
    padding: 0px;
    margin: 0px;
  }

  .oauth-area .oauth-btn {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-size: 30px 30px;
    background-position: center center;
    background-repeat: no-repeat;
    margin: 0px 20px;
    /*-webkit-filter: grayscale(100%); */
    border: solid 1px #ddd;
    border-radius: 25px;
  }

  .oauth-area .oauth-btn:active {
    border: solid 1px #aaa;
  }

  .oauth-area .oauth-btn.disabled {
    background-color: #ddd;
  }
</style>

