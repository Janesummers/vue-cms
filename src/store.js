/* jshint esversion: 6 */
import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
Vue.use(Vuex);
Vue.use(VueResource);
const store = new Vuex.Store({
  state: {
    shopnum: 0,
    origins: `https://www.chiens.cn/api`,
    ballDisplay: false,
    pageTitle: "首页",
    shopData: [],
    ballBg: '',
    userInfo: {}
  },
  mutations: { // 最多2个参数，1.state 2.是自定义参数
    setBall (state, payload) {
      state.ballDisplay = payload.value;
    },
    setPageTitle (state, payload) {
      state.pageTitle = payload.title;
    },
    goodsNum (state, payload) {
      state.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.commit('postRequest', {
        uri: '/updateForCar',
        data: {
          belongId: state.userInfo.userId,
          id: payload.id,
          count: Number(payload.value)
        }
      });
    },
    goodsDel (state, payload) {
      let i = 0;
      state.shopData.forEach((item, index) => {
        if (item.id == payload.id) {
          this.commit('postRequest', {
            uri: '/deleteMyGoodsById',
            data: {
              belongId: state.userInfo.userId,
              id: item.id
            }
          });
          i = index;
          return;
        }
      });
      state.shopData.splice(i ,1);
      state.shopnum = state.shopData.length;
    },
    chooseGoods (state, payload) {
      state.shopData.forEach((item) => {
        if (item.id === payload.id) {
          item.choose = !item.choose;
        }
      });
    },
    chooseAll (state, payload) {
      if (payload === 'cancel') {
        state.shopData.forEach((item) => {
          item.choose = false;
        });
      } else {
        state.shopData.forEach((item) => {
          item.choose = true;
        });
      }
    },
    setShopData (state, payload) {
      state.shopData = payload;
      state.shopnum = payload.length;
    },
    getShopCar (state) {
      state.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.commit('postRequest', {
        uri: '/getMyShopCart',
        data: {
          belongId: state.userInfo.userId,
          status: 0,
          pageNo: 1,
          pageSize: 10
        },
        callBack: (res) => {
          if (res.code !== "error") {
            res.body.data.forEach(item => item.choose = false);
            state.shopData = res.body.data;
            state.shopnum = res.body.data.length;
          }
        }
      });
    },
    postRequest (state, payload) {
      if (payload.test) {
        // console.log(this._vm)
        this._vm.$http.jsonp(`${payload.uri}`, {params: payload.data, jsonpCallback:'artiList'})
        .then(res => payload.callBack && payload.callBack(res), err => console.error(err));
      } else {
        this._vm.$http.post(`${state.origins}${payload.uri}`, payload.data, {emulateJSON:true})
        .then(res => payload.callBack && payload.callBack(res), err => console.error(err));
      }
    }
  },
  getters: {
    ball (state) {
      return state.ballDisplay;
    },
    getShop (state) {
      return state.shopData;
    },
    getPageTitle (state) {
      return state.pageTitle;
    },
    getOrigin (state) {
      return state.origins;
    }
  }
});

export default store;