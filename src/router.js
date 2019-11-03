import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index';

import Login from './views/login.vue';
import Nav from './views/nav.vue';
import Home from './views/home/index.vue';
import Find from './views/find/index.vue';
import Order from './views/order/index.vue';
import User from './views/user/index.vue';
import Search from './views/search/index.vue';
import SuperVip from './views/supervip.vue';
import UserInfo from './views/userInfo/index.vue';
import moment from 'moment';

Vue.use(Router);

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Nav',
      component: Nav,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
        },
        {
          path: '/order',
          name: 'order',
          component: Order,
        },
        {
          path: '/find',
          name: 'find',
          component: Find,
        },
        {
          path: '/user',
          name: 'user',
          component: User,
        },
        {
          path: '/search',
          name: 'search',
          component: Search,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/supervip',
      name: 'supervip',
      component: SuperVip,
    },
    {
      path: '/userinfo',
      name: 'userInfo',
      component: UserInfo,
    },
  ],
});

router.beforeEach(function(to, from, next) {
  // 路由跳转前，先拿到本地的用户信息
  let user = JSON.parse(localStorage.getItem('user'));
  // 判断用户信息是否存在
  if (user) {
    // 存在则判断是否超时
    // 先拿到用户登录时间
    let loginDate = moment(user.date);
    // 如果超时
    if(moment() - loginDate > 60000000) {
      store.dispatch('saveUser', null); // 清空store中用户信息:store.state.user = null;
      localStorage.removeItem('user'); // 清除本地用户信息
    } else { // 未超时
      store.dispatch('saveUser', user); // 每次刷新都将本地拿到的user信息放到store中
      // 如果刷新登录页面
      if (to.name === '/login') {
        // 则跳转到用户界面
        next({
          path: '/user'
        })
      }
    }
  }
  next();
});

export default router;
