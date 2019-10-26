import Vue from 'vue';
import Vuex from 'vuex';

import types from './mutations-type';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    [types.USER_INFO](state, data) {
      state.user = data;
    },
  },
  actions: {
    saveUser({commit}, data) {
      console.log(data);
      commit(types.USER_INFO, data);
    }
  },
  getters() {
    return {
      user: state => state.user,
    }
  },
});
