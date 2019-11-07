<template>
  <div :class="prefixCls">
    <!-- 城市选择 -->
    <div v-if="showCityFlag" :class="`${prefixCls}-city`">
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
import { mapGetters } from 'vuex';
const prefixCls = 'selectCity-index';
export default {
  data() {
    return {
      prefixCls,
      showCityFlag: true,
      inputcity: '', // 输入城市名
      cityflag: false,
      city: '',
    };
  },
  computed: {
    // ...mapGetters([
    //   'city',
    // ]),
  },
  watch: {},
  methods: {
    backToAddress() { // “选择城市” -> “选择收货地址”
      this.showCityFlag = false; // 不显示“选择城市”组件
      this.$emit('getCityFromShowCity', this.city, this.cityflag); // 将city数据传递给父组件“选择收货地址”
      this.inputcity = ''; // 清空输入框
    },
    inputCity() { // 输入当前城市
      if (this.inputcity) { // 如果输入不为空
        // console.log('city component, inputcity type', typeof this.inputcity);
        this.city = this.inputcity;
        this.cityflag = true;
        // console.log('city type ', typeof this.city, 'city=', this.city);
        // this.$store.dispatch('saveCity', this.city).then(
        //   () => {
        //     console.log('ok in city comp to store city data');
        //     localStorage.setItem('city', JSON.stringify(this.city));
        //     console.log('ok ----- 本地city:', loaclStorage.getItem(this.city));
        //     console.log('city component, city=', this.city);
        //   },
        //   err => {
        //     console.log('城市存入失败---', err || 'city component, fail to store city data');
        //   }
        // )
        this.$store.dispatch('saveCity', this.city).then(
          () => {
            console.log('ok in city comp');
            localStorage.setItem('city', JSON.stringify(this.city));
          },
          err => {
            console.log(err || '地址存入失败');
          }
        );
        console.log('ok in city comp, cityflag=', this.cityflag);
        this.backToAddress();
      }
    },
  },
  created() {
    console.log('select city page, store.state=', this.$store.getters);
    let store = this.$store.getters;
    if (store.city) {
      this.city = store.city;
      this.cityflag = true;
    } else {
      this.cityflag = false;
      this.city = '选择城市';
    }
  },
}
</script>
