/* jshint esversion: 6 */
import VueRouter from 'vue-router';
import HomePage from './components/tabbar/HomePage.vue';
import Vip from './components/tabbar/Vip.vue';
import Shopping from './components/tabbar/Shopping.vue';
import Search from './components/tabbar/Search.vue';
import NewsList from './components/news/NewsList.vue';
import NewsInfo from './components/news/NewsInfo.vue';
import GoodsList from './components/goods/GoodsList.vue';
import PictureShare from './components/picture/PictureShare.vue';
import GoodsInfo from './components/goods/GoodsInfo.vue';
import GoodsIntro from './components/goods/GoodsIntro.vue';
import GoodsComment from './components/goods/GoodsComment.vue';
import GoodsCount from './components/goods/GoodsCount.vue';
import registed from './components/user/registed.vue';
import Login from './components/user/login.vue';
import GoodsPayed from './components/goods/GoodsPayed.vue';

let routes = [
  {
    path: "/",
    redirect: "/home",
    meta: {
      keepAlive: true
    }
  },
  {
    path: "/home",
    component: HomePage
  },
  {
    path: "/vip",
    component: Vip
  },
  {
    path: "/shopping",
    component: Shopping
  },
  {
    path: "/search",
    component: Search
  },
  {
    path: "/home/news",
    component: NewsList
  },
  {
    path: "/home/newsInfo",
    component: NewsInfo
  },
  {
    path: "/home/goodsList",
    component: GoodsList
  },
  {
    path: "/home/pictureShare",
    component: PictureShare
  },
  {
    path: "/home/goodsInfo",
    component: GoodsInfo
  },
  {
    path: "/home/goodsIntro",
    component: GoodsIntro,
    name: "goodsIntro"
  },
  {
    path: "/home/goodsComment",
    component: GoodsComment,
    name: "goodsComment"
  },
  {
    path: "/shopping/goodsCount",
    component: GoodsCount,
    name: "goodsCount"
  },
  {
    path: "/home/registed",
    component: registed,
    name:"registed"
  },
  {
    path: "/vip/login",
    component: Login,
    name: "login"
  },
  {
    path: "/vip/pay",
    component: GoodsPayed
  }
];

const router = new VueRouter({
  routes,
  linkActiveClass: "mui-active"
});

export default router;