<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-logo`">
      <img src="../assets/imgs/logo.png" alt="">
    </div>
    <div :class="`${prefixCls}-form`">
      <div :class="`input-inner`">
        <div class="float">
          <input class="float--left" type="text" v-model="mobile" placeholder="手机号" />
          <span class="float--right text--info" @click="getCode">获取验证码</span>
        </div>
      </div>
      <div class="input-inner">
        <input placeholder="验证码" v-model="code" />
      </div>
    </div>
    <div :class="`${prefixCls}-info`">
      新用户登录即自动注册，并表示已同意<span class="text--primary">《用户服务协议》</span>和<span class="text--primary">《隐私权政策》</span>
    </div>
    <div :class="prefixCls + '-button'">
      <van-button :block="true" type="primary" @click="login">登录</van-button>
    </div>
    <div :class="`${prefixCls}-about text--info text--center`">关于我们</div>
  </div>
</template>
<script>
const prefixCls = 'login';

import moment from 'moment';
import { login, sendCode } from '../apis'; // 需要用到谁就引用谁
export default {
  components: {
    // vButton,
  },
  data() {
    return {
      prefixCls,
      disabled: false,
      mobile: '',
      code: '', // 验证码
    };
  },
  computed: {},
  watch: {},
  methods: {
    handle(value, v2) {
      console.log(value, v2);
    },
    handleClick() {
      this.$refs.child.$emit('test', 5, 6);
    },
    getCode() {
      const that = this;
      sendCode({
        mobile: that.mobile,
      }).then(
        res => {
          console.log(res);
          if (!res.status) {
            this.$toast(res.msg || '失败');
            return;
          }
        }
      )
    },
    login() {
      const that = this;
      login({
        mobile: that.mobile,
        code: that.code,
      }).then(
        res => {
          if (!res.status) {
            this.$toast(res.msg || '失败');
            return;
          }
          this.$store.state.user = res;
          // this.$store.commit('USER_INFO', res.user); 同步存入state
          res.user.date = moment().format('YYYY-MM-DD HH:mm:ss');
          this.$store.dispatch('saveUser', res.user).then(
            () => {
              localStorage.setItem('user', JSON.stringify(res.user));
              this.$router.push({
                path: '/user',
              })
            },
            err => {
              console.error('失败');
            }
          )
        },
        err => {
          console.error(err);
        }
      );
    }
  },
  created() {
    // console.log(this.$route);
    console.log(typeof this.$store.dispatch);
  },
  mounted() {
    console.log(this.$store);
  }
}
</script>
