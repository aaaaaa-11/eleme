import Vue from 'vue';
import Router from 'vue-router';
import moment from 'moment';
import store from './store/index';
import common from '@/utils/common';

import Login from './views/login.vue';
import Nav from './views/nav.vue';
import Home from './views/home/index.vue';
import Find from './views/find/index.vue';
import Order from './views/order/index.vue';
import User from './views/user/index.vue';
import Search from './views/search/index.vue';
import SuperVip from './views/supervip.vue';
import UserInfo from './views/userInfo/index.vue';
import Food from './views/food/index.vue';


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
    {
      path: '/home/food/:id',
      name: 'food',
      component: Food,
    },
  ],
});

router.beforeEach(function(to, from, next) {
  // 路由跳转前，先拿到本地的用户信息&地址信息&订单
  // let user = JSON.parse(localStorage.getItem('user'));
  let user = localStorage.getItem('user'),
      address = localStorage.getItem('address'),
      city = localStorage.getItem('city'),
      foods = localStorage.getItem('foods');
  if (city) {
    city = JSON.parse(city);
    store.dispatch('saveCity', city);
  } else {
    store.dispatch('saveCity', null);
  }
  // 判断地址信息是否存在
  if (address) {
    address = JSON.parse(address);
    store.dispatch('saveAddress', address);
  } else {
    store.dispatch('saveAddress', null);
  }
  // 判断用户信息是否存在
  if (user) {
    user = JSON.parse(user);
    // 存在则判断是否超时
    // 先拿到用户登录时间
    let loginDate = moment(user.date);
    // 如果超时
    console.log('系统登录时长', common.systemTime);
    if(moment() - loginDate > common.systemTime) {
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
    // 判断订单是否存在
    if (foods && foods !== 'undefined') {
      foods = JSON.parse(foods);
      store.dispatch('saveFoods', foods);
    } else {
      store.dispatch('saveFoods', []);
    }
  }
  next();
});

export default router;
