import axios from './plugins/axios';

function login(params) {
  return axios.post('/user/login', params);
}

function sendCode(params) {
  return axios.post('/sendCode', params);
}

function getStores(params) {
  return axios.get('/store/getStore', params);
}

export {
  login,
  sendCode,
  getStores,
}