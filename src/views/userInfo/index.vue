<template>
  <div :class="prefixCls">
    <ul :class="`${prefixCls}-header box`">
      <li :class="`${prefixCls}-header-head`">
        <span :class="`${prefixCls}-header-head__left bold`">头像</span>
        <div :class="`${prefixCls}-header-head__right`">
          <div class="headImg">
            <img src="../../assets/imgs/userInfo/head.png" alt="">
          </div>
          <van-icon name="arrow" />
        </div>
      </li>
      <li :class="`${prefixCls}-header-uname`">
        <span class="bold">用户名</span>
        <span class="content float--right">{{user.name}}
          <van-icon name="arrow" />
        </span>
      </li>
    </ul>
    <div :class="`${prefixCls}-account`">
      <p class="title">账号绑定</p>
      <div class="box">
        <van-icon name="orders-o" />
        <span class="phone bold">手机</span>
        <span class="phoneNumber float--right">{{newMobile}}
          <van-icon name="arrow" />
        </span>
      </div>
    </div>
    <div :class="`${prefixCls}-safe`">
      <p class="title">安全设置</p>
      <div class="box">
        <span class="loginPwd">登录密码</span>
        <a class="float--right">未设置
          <van-icon name="arrow" />
        </a>
      </div>
    </div>
    <button :class="`${prefixCls}-loginBtn v-button--block bold box`">退出登录</button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
const prefixCls = 'userInfo-index';
export default {
  data() {
    return {
      prefixCls,
      newMobile: '',
    };
  },
  computed: {
    ...mapGetters([
      'user',
    ])
  },
  watch: {},
  methods: {
  },
  created() {
    console.log(this.user.mobile);
    this.newMobile = [...this.user.mobile].map((item, index) => {
      if (index > 2 && index < 7) {
        return '*';
      } else {
        return item;
      }
    }).join('');
    console.log('userInfo---', this.$store.state.user);
  },
}
</script>
