/* jshint esversion: 6 */
import VueRouter from 'vue-router';
const HomePage = () => import('./components/tabbar/HomePage.vue');
const Vip = () => import( './components/tabbar/Vip.vue');
const Shopping = () => import( './components/tabbar/Shopping.vue');
const Search = () => import( './components/tabbar/Search.vue');
const NewsList = () => import( './components/news/NewsList.vue');
const NewsInfo = () => import( './components/news/NewsInfo.vue');
const GoodsList = () => import( './components/goods/GoodsList.vue');
const PictureShare = () => import( './components/picture/PictureShare.vue');
const GoodsInfo = () => import( './components/goods/GoodsInfo.vue');
const GoodsIntro = () => import( './components/goods/GoodsIntro.vue');
const GoodsComment = () => import( './components/goods/GoodsComment.vue');
const GoodsCount = () => import( './components/goods/GoodsCount.vue');
const registed = () => import( './components/user/registed.vue');
const Login = () => import( './components/user/login.vue');
const GoodsPayed = () => import( './components/goods/GoodsPayed.vue');
const movieList = () => import( './components/movie/movieList.vue');
const movieInfo = () => import( './components/movie/movieInfo.vue');
const userComment = () => import( './components/user/userComment.vue');
const about = () => import( './components/about/about.vue');

let routes = [
  {
    path: "/",
    redirect: "/home"
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
    path: "/home/movieList",
    component: movieList,
    name: "movieList"
  },
  {
    path: "/home/movieInfo",
    component: movieInfo,
    name: "movieInfo"
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
    path: "/home/userComment",
    component: userComment,
    name: "userComment"
  },
  {
    path: "/home/about",
    component: about,
    name: "about"
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