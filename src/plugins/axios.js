/* eslint-disable */
import Vue from 'vue';
import axios from "axios";


let config = {
  // baseURL: 'http://192.168.101.4:3000',
  timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config); //创建axios实例

_axios.interceptors.request.use(
  // 传入的一下参数
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  // 后台返回的参数
  function(response) {
    // Do something with response data
    console.log('后台返回：', response);
    // return response;
    if (response.status === 404) {
      return {
        status: 0,
        msg: '未找到服务',
      };
    } else if (response.status === 500) {
      return {
        status: 0,
        msg: '服务出错',
      };
    } else if (response.data) {
      return response.data;
    } else {
      return {
        status: '0',
        msg: '未知错误',
      }
    }
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
// 自定义插件
Plugin.install = (VUE, options) => {
  VUE.axios = _axios; // 将实例赋值给window，
  window.axios = _axios; // 赋值给VUE
  // Object.defineProperties(obj, props)方法直接在一个对象上定义/修改属性
  // props可以为一个对象，里面是要修改/定义的obj中的属性
  Object.defineProperties(VUE.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default _axios;
