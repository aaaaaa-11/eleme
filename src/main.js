import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';
import './plugins/vant';
import '@/assets/scss/index.scss';
import './plugins/axios';
import './apis/login'
import moment from 'moment';

Vue.config.productionTip = false;
window.moment = moment;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
