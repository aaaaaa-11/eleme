<template>
  <div v-if="showAddrFlag" :class="prefixCls">
      <div :class="`${prefixCls}-address`">
        <div :class="{'display-none': showCityFlag}">
          <van-nav-bar
            title="选择收货地址"
            right-text="新增地址"
            left-arrow
            @click-left="backToHome"
            @click-right="addAddress"
          />
          <div :class="`${prefixCls}-address-search box flex`">
            <div class="city" @click="showCity" slot="action">
              <p class="text-overflow cityName float--left text--center">{{city}}</p>
              <span class="triangle float--right"></span>
            </div>
            <van-search placeholder="请输入地址" v-model="inputaddress"  @keydown.13="inputAddress" />
          </div>
          <div v-if="user" :class="`${prefixCls}-address-currAddr`">
            <p class="title">当前地址</p>
            <div :class="`${prefixCls}-address-currAddr__content flex box`">
              <p @click="backToHome" class="box text-overflow">{{address}}</p>
              <a @click="relocation" href="javascript:;"><van-icon name="aim" />重新定位</a>
            </div>
          </div>
          <div v-if="user" :class="`${prefixCls}-address-shAddr`">
            <p class="title">收货地址</p>
            <div class="list box">
              <div class="list-item" v-for="(item, index) in shAddr" :key="item.id" @click="chooseShAddr(index)" ref="shAddr">
                <p>
                  <span class="name">{{ item.name }}</span>
                  <span class="gender">{{ item.gender }}</span>
                  <span class="phone">{{ item.mobile }}</span>
                </p>
                <p class="addr">{{ item.address }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showCityFlag">
        <City @getCityFromShowCity="getCityFromShowCity"></City>
      </div>
  </div>
</template>
<script>
const prefixCls = 'selectAddress-index';
import City from '../components/SelectCity.vue';
export default {
  data() {
    return {
      prefixCls,
      user: '',
      showAddrFlag: true,
      inputaddress: '', // 输入当前地址
      address: '',
      addressflag: false,
      shAddr: [ // 用户收货地址
        {id: 1, name: '小明', gender: '男', mobile: 12345678901, address: '和平路莲花小区2栋3单元'},
        {id: 2, name: '小强', gender: '男', mobile: 12345678901, address: '和平路和谐小区2栋3单元'},
        {id: 3, name: '小红', gender: '女', mobile: 12345678901, address: '和平路平安小区2栋3单元'},
      ],
      showCityFlag: false, // 标识符，是否显示“选择城市”组件
      city: '选择城市',
      cityflag: false, // 标识符，是否选择了城市
    };
  },
  components: {
    City,
  },
  computed: {
  },
  watch: {
  },
  methods: {
    relocation() {
      this.$toast('重新定位');
    },
    backToHome() {
      console.log('back to home');
      this.$emit('getAddrObjFromShowAddr', this.address, this.addressflag, this.city);
      this.showAddrFlag = false;
    },
    addAddress() {
      this.$toast('新增地址');
    },
    inputAddress() {
      if (this.inputaddress) { // 如果输入的地址不为空
        this.address = this.inputaddress;
        this.addressflag = true;
        this.$store.dispatch('saveAddress', this.address).then(
          () => {
            console.log('ok in addr comp');
            localStorage.setItem('address', JSON.stringify(this.address));
          },
          err => {
            console.log(err || '地址存入失败');
          }
        );
        if (this.cityflag ) {
          this.backToHome();
          this.inputaddress = ''; // 清空输入框
        } else {
          this.$toast('请选择城市');
        }
      }
    },
    showCity() { // 显示“选择城市”组件
      this.showCityFlag = true;
    },
    getCityFromShowCity(city, cityflag) {
      console.log('address component, city&cityflag', city, cityflag);
      this.city = city;
      this.cityflag = cityflag;
      this.showCityFlag = false;
    },
  },
  created() {
    console.log('address component, showCityFlag', this.showCityFlag);
    let store = this.$store.getters;
      if (store.user) {
        this.user = store.user;
      }
      if (store.city) {
        this.city = store.city;
        this.cityflag = false;
      } else {
        this.city = '选择城市';
        this.cityflag = false;
      }
      if (this.address) {
        this.address = store.address;
        this.addressflag = true;
      } else {
        this.address = false;
        this.address = "未能获取地址";
      }
  },
}
</script>
