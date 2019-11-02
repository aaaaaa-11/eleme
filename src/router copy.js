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
  ],
});

router.beforeEach(function(to,form,next){
  let user = localStorage.getItem('user');
  if (user) {
    // 拿到的是字符串格式，需要转格式
    user = JSON.parse(user);
    // 判断是否超过10min
    const userDate = moment(user.date);
    if (moment() - userDate > 600000) { // 10min
      // 超时，state.user = null;
      store.dispatch('saveUser', null);
      localStorage.removeItem('user')
    } else {
      store.dispatch('saveUser', user);
      // 如果没超过10min，此时如果刷新了登录页，应该跳到user页
      if (to.name === 'login') {
        next({
          path: '/user'
        });
      }
    }
  }
  next(); // 继续下个路由
})

export default router;
