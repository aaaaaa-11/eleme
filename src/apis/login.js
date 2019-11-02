import axios from '../plugins/axios';

export default {
  login(params) {
    // params是传向后台的数据，比如手机号、验证码
    return axios.post('/user/login', params);
  }
}