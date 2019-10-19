<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-header`"></div>
    <div :class="`${prefixCls}-privilege`">
      <div :class="`${prefixCls}-privilege-frame`">
        <div class="frame__title">
          <span class="flag">特权1</span>
          每月免费领4个会员红包
        </div>
        <div class="content">
          <p>无门槛红包</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const prefixCls = 'supervip-index';
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
