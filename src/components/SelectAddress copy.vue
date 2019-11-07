<template>
  <div :class="prefixCls">
      <div v-if="showAddr" :class="`${prefixCls}-address`">
        <div :class="{'display-none': showcity}">
          <van-nav-bar
            title="选择收货地址"
            right-text="新增地址"
            left-arrow
            @click-left="backToHome"
            @click-right="addAddress"
          />
          <div :class="`${prefixCls}-address-search box flex`">
            <div class="city flex" @click="showCity" slot="action">
              <p class="text-overflow">{{city}}</p>
              <span class="triangle"></span>
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

      <div @changeshowcity="showCity(city)" v-if="showcity">
        <City></City>
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
      showAddr: true,
      inputaddress: '', // 输入当前地址
      addressObj: {},
      addressflag: false,
      shAddr: [ // 用户收货地址
        {id: 1, name: '小明', gender: '男', mobile: 12345678901, address: '和平路莲花小区2栋3单元'},
        {id: 2, name: '小强', gender: '男', mobile: 12345678901, address: '和平路和谐小区2栋3单元'},
        {id: 3, name: '小红', gender: '女', mobile: 12345678901, address: '和平路平安小区2栋3单元'},
      ],
      showcity: false, // 标识符，是否显示“选择城市”页面
      city: '选择城市',
      cityflag: false, // 标识符，是否选择了城市
    };
  },
  components: {
    City,
  },
  computed: {
    // ...mapGetters([
    //   'user', // this.$store.getters.user -> this.user
    // ]),
  },
  watch: {
    address() {
      if (!this.addressflag) { // 如果当前地址为空，则显示“选择收货地址”
        this.showAddr = true;
        console.log('选择收货地址');
      } else if (this.cityflag && this.addressflag) { // 如果选择了城市和地址
        let addressObj = {address: this.address, city: this.city};
        console.log('addressObj-----',addressObj);
        this.$store.dispatch('saveAddress', addressObj).then( // 将新的address和city存入store
          () => {
            console.log('ok---', this.$store.state);
            localStorage.setItem('addressObj', JSON.stringify(addressObj)); // 将新的addressObj存入本地
          },
          err => {
            console.log('address存入失败', err);
          }
        );
      }
    },
  },
  methods: {
    relocation() {
      this.$toast('重新定位');
    },
    inputAddress() { // 输入“当前地址”，按下回车
      if (this.cityflag) { // 如果选择了城市
        this.address = this.inputaddress; // 输入的城市名则为当前城市
        // console.log(this.inputaddress, this.address);
        this.inputaddress = ''; // 清空输入
        this.backToHome(); // 返回“首页”
      } else {
        this.$toast('请选择城市');
      }
    },
    chooseShAddr(index) { // 选择“收货地址”
      this.address = this.$refs.shAddr[index].lastChild.innerText; // 点击哪个地址，当前地址就是哪个
      // console.log(this.$refs.shAddr[index].lastChild.innerText);
      this.backToHome(); // 回到“首页”
    },
    backToHome() { // “选择收货地址” 跳到 “首页”
      // 如果选择了城市和地址
      if (this.cityflag && this.addressflag) {
        // this.address = this.inputaddress;
        this.addressObj = {address: this.address, city: this.city}; // 拼接出一个地址对象
        console.log(this.addressObj);
        this.$store.dispatch('saveAddress', this.addressObj).then( // 存入store
          () => {
            localStorage.setItem('address', this.addressObj); // 存入本地
            console.log(this.addressObj, '----', this.$store.user);
            this.$emit('getAddrAndCity', this.addressObj); // 将地址对象传入父组件
          },
          err => {
            console.log(err || '地址存入失败！');
          }
        )
      }
      this.showAddr = false;
    },
    addAddress() {
      this.$toast('新增地址');
    },
    showCity(city) { // 显示“选择城市”页面
      this.showcity = city ? city : true;
    },
    changeshowcity(showcity, city) {
      if (city) {
        this.showcity = showcity;
        this.city = city;
        console.log(city);
      }
    }
  },
  created() {
    console.log('showcity', this.showcity);
    let store = this.$store.state.user;
    if (store) {
      if (store.user) {
        this.user = store.user;
      }
      if (store.address) {
        this.city = storeAddr.city;
        this.cityflag = false;
      }
    } else {
      this.city = '选择城市';
      this.cityflag = false;
    }
  },
}
</script>
