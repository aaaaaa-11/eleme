<template>
  <div :class="prefixCls">
    <!-- 城市选择 -->
    <div v-if="showcity" :class="`${prefixCls}-city`">
      <div :class="`${prefixCls}-city-header`">
        <van-nav-bar
          title="城市选择"
          left-arrow
          @click-left="backToAddress"
        />
        <div class="search">
          <van-search
            placeholder="输入城市名或者拼音"
            v-model="inputcity"
            shape="round"
            @keydown.13="inputCity"
          />
        </div>
      </div>
      <div :class="`${prefixCls}-city-select`">
        <div v-if="cityflag" :class="`${prefixCls}-city-select__current`">
          <div class="title">当前定位城市</div>
          <div class="content box">{{city}}</div>
        </div>
        <div :class="`${prefixCls}-city-select__index`">
          <van-index-bar>
          <van-index-anchor index="A" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-index-anchor index="B" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
        </van-index-bar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const prefixCls = 'selectCity-index';
export default {
  data() {
    return {
      prefixCls,
      showcity: true,
      inputcity: '', // 输入城市名
      cityflag: false,
      city: '',
    };
  },
  computed: {},
  watch: {
    city() { // 监听数据city变化
      if (this.city && this.city != '选择城市') { // 如果选择了城市
        this.cityflag = true;
      } else {
        this.cityflag = false;
      }
    },
  },
  methods: {
    inputCity() { // 输入当前城市
      this.city = this.inputcity;
      console.log(this.cityflag);
      this.backToAddress();
    },
    backToAddress() { // “选择城市” -> “选择收货地址”
      this.showcity = false;
      this.$emit('changeshowcity', this.showcity, this.city);
      this.inputcity = ''; // 清空输入框
    },
  },
  created() {
    console.log('select city page');
    let store = this.$store.state.user;
    if (store.address) {
      this.city = store.address.city;
      this.cityflag = true;
    } else {
      this.cityflag = false;
      this.city = '选择城市';
    }
  },
}
</script>
