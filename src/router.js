import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/login.vue';
import Nav from './views/nav.vue';
import Home from './views/home/index.vue';
import Find from './views/find/index.vue';
import Order from './views/order/index.vue';
import User from './views/user/index.vue';

Vue.use(Router);

export default new Router({
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
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});
