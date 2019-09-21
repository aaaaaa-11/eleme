<template>
  <div :class="prefixCls">
    <h3>首页</h3>
  </div>
</template>
<script>
const prefixCls = 'home-index';
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
    console.log(this.$route);
    console.log(this.$router);
  },
}
</script>
