import Vue from 'vue';
import Vuex from 'vuex';

import types from './mutations-type';
import loginHttp from '../apis/login';

Vue.use(Vuex);

export default {
  state: {
    user: null,
  },
  mutations: {
    [types.USER_INFO](state, data) {
      state.user = data;
    },
    [types.ADDRESS_INFO](state, data) {
      state.address = data;
    },
  },
  actions: {
    // getUser({commit}, params) {
    //   return loginHttp.login(params);
    // },
    saveUser({commit}, data) {
      console.log(data);
      commit(types.USER_INFO, data);
    },
    saveAddress({commit}, data) {
      console.log(data);
      commit(types.ADDRESS_INFO, data);
    }
  },
  getters: {
      user: state => state.user,
      address: state => state.address,
  },
};
