/* jshint esversion: 6 */
import Vue from 'vue';
import App from './App.vue';
import MintUI from 'mint-ui';
import VueLazyload from 'vue-lazyload';
import 'mint-ui/lib/font/style.css';
import 'mint-ui/lib/style.css';
import './assets/css/mui.css';
import './assets/css/icons-extra.css';
import './assets/css/reset.css';
import './assets/css/my.previewimage.css';
import './assets/css/iconfont.css';
// import 'bootstrap/dist/css/bootstrap.css';
// import VuePreview from 'vue-preview';
import vueResource from 'vue-resource';

import VueRouter from 'vue-router';
import router from './router.js';
import store from './store.js';
// import VConsole from 'vconsole';
// var vConsole = new VConsole();


Vue.use(MintUI);
Vue.use(VueRouter);
Vue.use(vueResource);
Vue.use(VueLazyload);


let vm = new Vue({
  render: c => c(App),
  router,
  store
}).$mount("#app");

console.log(vm);