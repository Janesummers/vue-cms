<template>
  <div>
    <div class="mui-content">
      <form id='login-form' class="mui-input-group">
        <div class="mui-input-row">
          <label>账号</label>
          <input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号" v-model="username">
        </div>
        <div class="mui-input-row">
          <label>密码</label>
          <input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码" v-model="password">
        </div>
      </form>
      <div class="mui-content-padded">
        <button id='login' class="mui-btn mui-btn-block mui-btn-danger" @click="login('/vip')">登录</button>
        <div class="link-area">
          <router-link to="/home/registed">
          注册账号
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { Toast } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  export default {
    created () {
      this.$store.commit('setPageTitle', {
        title: '登录'
      });
    },
    data () {
      return {
        username: "",
        password: ""
      }
    },
    methods: {
      login (path) {
        if (this.username !== "" && this.password !== "") {
          Indicator.open({
            text: '登录中...'
          });
          this.$store.commit('postRequest', {
            uri: '/login',
            data: {
              name: this.username,
              pwd: this.password
            },
            callBack: (res) => {
              if (res.data.code === "ok") {
                Indicator.close();
                localStorage.setItem("userInfo", JSON.stringify({
                  username: res.data.data.nick,
                  userId: res.data.data.id
                }));
                this.$store.commit('getShopCar');
                this.$router.push(path);
              } else {
                Indicator.close();
                Toast({
                  message: '用户名或者密码错误',
                  position: 'middle',
                  duration: 1000
                });
              }
            }
          });
        }
        else{
          Toast({
            message: '用户名密码不能为空',
            position: 'middle',
            duration: 1000
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
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

  .mui-input-row label {
    color: #424242;
  }

  .mui-btn {
    padding: 10px;
  }

  .link-area {
    display: block;
    margin-top: 25px;
    text-align: center;
    font-size: 14px;
  }

  .link-area a {
    color: #dd514d;
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