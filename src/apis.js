import axios from './plugins/axios';

function login(params) {
  return axios.post('/user/login', params);
}

function sendCode(params) {
  return axios.post('/sendCode', params);
}

export {
  login,
  sendCode,
}