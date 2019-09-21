<template>
  <div :class="prefixCls">
    <header :class="`${prefixCls}-header`">
      <div :class="`${prefixCls}-logo`">
        <img src="../../assets/imgs/user/logo.png" alt="">
      </div>
      <div :class="`${prefixCls}-title`">
        <h1>登录/注册</h1>
        <p>登陆后享受更多特权</p>
      </div>
      <van-icon name="arrow" :class="`${prefixCls}-arrow`"/>
    </header>
    <div class="body">
      <div class="money">
        <div>
          <img src="../../assets/imgs/user/icon1.jpg">
          <p>红包</p>
        </div>
        <div>
          <img src="../../assets/imgs/user/icon2.jpg">
          <p>金币</p>
        </div>
      </div>
      <div class="main">
        <section>
          <div class="item">
            <img src="../../assets/imgs/user/icon3.jpg">
            <span>我的地址</span>
            <van-icon name="arrow" :class="`${prefixCls}-arrow`"/>
          </div>
        </section>
        <section>
          <div class="item">
            <img src="../../assets/imgs/user/icon4.jpg">
            <span>金币商城</span>
            <van-icon name="arrow" :class="`${prefixCls}-arrow`"/>
          </div>
          <div class="item">
            <img src="../../assets/imgs/user/icon5.jpg">
            <span>分享拿20元现金</span>
            <van-icon name="arrow" :class="`${prefixCls}-arrow`"/>
          </div>
        </section>
        <section>
          <div class="item">
            <img src="../../assets/imgs/user/icon6.jpg">
            <span>我的客服</span>
            <van-icon name="arrow" :class="`${prefixCls}-arrow`"/>
          </div>
          <div class="item">
            <img src="../../assets/imgs/user/icon7.jpg">
            <span>下载饿了么APP</span>
            <van-icon name="arrow" :class="`${prefixCls}-arrow`"/>
          </div>
          <div class="item">
            <img src="../../assets/imgs/user/icon8.jpg">
            <span>规则中心</span>
            <van-icon name="arrow" :class="`${prefixCls}-arrow`"/>
          </div>
        </section>
      </div>
      <div class="footer">
        <a class="text--primary text--center">隐私政策</a>
      </div>
    </div>
  </div>
</template>
<script>
const prefixCls = 'user';
export default {
  data() {
    return {
      prefixCls,
    };
  },
  computed: {},
  watch: {},
  methods: {
  },
  created() {
  },
}
</script>
