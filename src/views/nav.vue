<template>
  <div :class="prefixCls">
  <router-view></router-view>
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item name="0" :icon="active !== '0' ? 'wap-home-o' : 'wap-home'">首页</van-tabbar-item>
      <van-tabbar-item name="1" :icon="active !== '1' ? 'eye-o' : 'eye'">发现</van-tabbar-item>
      <van-tabbar-item name="2" :icon="active !== '2' ? 'balance-list-o' : 'balance-list'">订单</van-tabbar-item>
      <van-tabbar-item name="3" :icon="active !== '3' ? 'user-o' : 'manager'">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
const prefixCls = 'nav';
export default {
  data() {
    return {
      prefixCls,
      active: '0',
    };
  },
  computed: {},
  watch: {},
  methods: {
    onChange(event) {
      this.active = event;
      switch (event) {
        case '0': // 首页
          this.$router.replace({
            name: 'home',
            params: {
              test: true,
            }
          });
          break;
        case '1': // 首页
          this.$router.replace({
            path: '/find',
          });
          break;
        case '2': // 首页
          this.$router.replace({
            path: '/order',
          });
          break;
        case '3': // 首页
          this.$router.replace({
            path: '/user',
          });
          break;
        default: break;
      }
      console.log(event);
    }
  },
  created() {
  },
}
</script>
