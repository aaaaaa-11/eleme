<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-logo`">
      <img src="../assets/imgs/logo.png" alt="">
    </div>
    <div :class="`${prefixCls}-form`">
      <div :class="`input-inner`">
        <div class="float">
          <input class="float--left" type="number" placeholder="手机号" />
          <span class="float--right text--info">获取验证码</span>
        </div>
      </div>
      <div class="input-inner">
        <input type="number" placeholder="验证码" />
      </div>
    </div>
    <div :class="`${prefixCls}-info`">
      新用户登录即自动注册，并表示已同意<span class="text--primary">《用户服务协议》</span>和<span class="text--primary">《隐私权政策》</span>
    </div>
    <div :class="prefixCls + '-button'">
      <van-button :block="true" type="primary">登录</van-button>
    </div>
    <div :class="`${prefixCls}-about text--info text--center`">关于我们</div>
    <v-button @click="login" ref="child" :type="'primary'" :disabled="disabled" @test="handle" block></v-button>
  </div>
</template>
<script>
import vButton from '@/components/v-button.vue';

const prefixCls = 'login';
export default {
  components: {
    vButton,
  },
  data() {
    return {
      prefixCls,
      disabled: false,
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
    login() {
      this.disabled = true;
      const that = this;
      setTimeout(() => {
        that.disabled = false;
      }, 1500);
    }
  },
  created() {
    console.log(this.$route);
  },
  mounted() {
    console.log(this.$refs);
  }
}
</script>
