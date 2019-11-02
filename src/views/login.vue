<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-logo`">
      <img src="../assets/imgs/logo.png" alt="">
    </div>
    <div :class="`${prefixCls}-form`">
      <div :class="`input-inner`">
        <div class="float">
          <input class="float--left" type="text" maxlength="11" @keyup="ableToGetCode" v-model="mobile" placeholder="手机号" />
          <span v-if="get" :class="{'float--right': true, 'disabledToClick': disabled, 'text--info': !disabled}" @click="getCode">获取验证码</span>
          <span v-else-if="send" class="float--right disabledToClick">已发送({{seconds}}s)</span>
          <span v-else-if="regain" :class="{'float--right': true, 'disabledToClick': disabled, regain: !disabled}" @keyup="ableToGetCode" @click="regainCode">重新获取</span>
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
export default {
  components: {
    // vButton,
  },
  data() {
    return {
      prefixCls,
      disabled: true,
      mobile: '',
      code: '', // 验证码
      get: true, // 获取验证码
      send: false, // 已发送
      regain: false, // 重新获取
      seconds: 30, // 倒计时
      timer: null,
    };
  },
  computed: {},
  watch: {
    seconds() {
      if (this.seconds <= 0) {
        clearInterval(this.timer); // 倒计时为0，停止
        // 切换为“重新获取”
        this.send = false;
        this.regain = true;
      } else {
        this.regain = false;
      }
    }
  },
  methods: {
    handle(value, v2) {
      console.log(value, v2);
    },
    handleClick() {
      this.$refs.child.$emit('test', 5, 6);
    },
    ableToGetCode() { // 手机号小于11位，验证码color浅色
      if (this.mobile.length < 11) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    getCode() {
      if (this.disabled) { // 禁用
        if (this.mobile.length < 11) {
          this.$toast('手机号码为11位!');
        }
        return;
      }
      // 点击后切换为“已发送”
      this.get = false;
      this.send = true;
      let targetTime = moment().add(30, 's'); // 当前时间+30s
      this.timer = setInterval(()=>{ // 倒计时
            this.seconds = parseInt((targetTime - moment())/1000);
          }, 1000);
      // 发送axios请求
      const that = this;
      that.$axios.post('/sendCode', {
        mobile: this.mobile
      }).then(
        res => {
          console.log(res);
        },
        err => {
          clearInterval(timer);
          console.log(err);
        }
      );
    },
    regainCode() { // “重新获取”
      this.seconds = 30; // 重置倒计时
      this.getCode();
    },
    login() {
      const that = this;
      this.$axios.post('/user/login', {
        mobile: this.mobile,
        code: this.code
      }).then(
        res => {
          if (!res.status) {
            this.$toast(res.msg || '失败');
            return;
          }
          // 登录成功，记录时间
          res.user.date = moment().format('YYYY-MM-DD HH:mm:ss');
          // 将用户信息存入store
          this.$store.dispatch('saveUser', res.user).then(
            () => {
              // 将用户信息和登录时间存入localStorage
              localStorage.setItem('user', JSON.stringify(res.user));
              console.log(this.$store.user);
              // 跳转到用户页面
              this.$router.push({
                path: '/user'
              });
            },
            err => {
              console.log(err);
            }
          )
        },
        err => {
          console.log(err);
        }
      ).catch(function(reason) {
        console.log('catch:', reason);
      })
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
