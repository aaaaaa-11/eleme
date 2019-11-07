<template>
  <div :class="prefixCls">
    <!-- 首页 -->
    <div :class="{'unscrollable':showAddr}">
      <!-- header -->
      <div :class="`${prefixCls}-header`">
        <div @click="showAddress" :class="`${prefixCls}-header__title`">
          <van-icon name="location-o" />
          <h3 class="text-overflow">{{address}}</h3>
          <span class="triangle"></span>
          <!-- <router-link to="/home/address"></router-link> -->
        </div>
        <!-- search -->
        <van-sticky>
        <div :class="`${prefixCls}-header__search`">
          <router-link to="/search"><div>
            <van-icon name="search" />
            <span>搜索饿了么商家、商品名称</span>
          </div></router-link>
        </div>
        </van-sticky>
      </div>
      <!-- noAddress -->
      <div v-if="address==='未能获取地址'" class="noaddress box">
        <img src="../../assets/imgs/home/noAddress.gif" alt="">
        <p>输入地址后才能订餐哦！</p>
        <button @click="showAddress" class="v-button v-button--success v-button--normal">手动选择地址</button>
      </div>
      <div v-else>
      <!-- swipe -->
      <div :class="`${prefixCls}-swipe`">
        <van-swipe :autoplay="3000" indicator-color="yellow">
          <van-swipe-item>
            <div :class="`${prefixCls}-swipe-list active`">
              <van-grid :column-num="5" v-for="(item, i) in list1" :key="i">
                <van-grid-item :class="`${prefixCls}-swipe-list__item`" use-slot>
                  <img src="../../assets/imgs/home/1.webp">
                  <p>{{ item.text }}</p>
                </van-grid-item>
              </van-grid>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div :class="`${prefixCls}-swipe-list active`">
              <van-grid :column-num="5" v-for="(item, i) in list2" :key="i">
                <van-grid-item :class="`${prefixCls}-swipe-list__item`" use-slot>
                  <img src="../../assets/imgs/home/1.webp">
                  <p>{{ item.text }}</p>
                </van-grid-item>
              </van-grid>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- handle -->
      <div :class="`${prefixCls}-handle`">
        <div :class="`${prefixCls}-handle-content`">
          <div :class="`${prefixCls}-handle-content__desc`">
            <p>品质套餐</p>
            <p class="font-small">搭配齐全吃得好</p>
            <p>立即抢购
              <van-icon name="arrow" />
            </p>
          </div>
          <div :class="`${prefixCls}-handle-content__img`">
            <img src="../../assets/imgs/home/2.webp" alt="">
          </div>
        </div>
        <div v-if="user" :class="`${prefixCls}-handle-wrap`">
          <van-icon name="vip-card" />
          <p class="bold">超级会员</p>
          <span>·</span>
          <p class="font-sm">每月领20元红包</p>
          <span class="font-sm span-right">
            <router-link to="/supervip">
              立即开通<van-icon class="font-sm arrow-right" name="arrow" />
            </router-link>
          </span>
        </div>
      </div>
      <!-- shop-list -->
      <div :class="`${prefixCls}-shop`">
        <div :class="`${prefixCls}-shop-recommend text--center`">
          <p>推荐商家</p>
        </div>
        <div :class="`${prefixCls}-shop-nav text--center`">
          <ul>
            <li :class="`${prefixCls}-shop-nav--active`">
              <van-dropdown-menu>
                <van-dropdown-item v-model="recommendShopSelect" :options="recommShopNavOption" />
              </van-dropdown-menu>
            </li>
            <li><a href="javascript:;">距离最近</a></li>
            <li><a href="javascript:;">品质联盟</a></li>
            <li><a href="javascript:;">筛选
              <van-icon name="filter-o" />
            </a></li>
          </ul>
        </div>
        <div v-if="user" :class="`${prefixCls}-shop-list`">
          <section class="item">
            <div class="img">
              <img src="../../assets/imgs/home/shop1.webp" alt="">
            </div>
            <div :class="`${prefixCls}-shop-list__content`">
              <div class="shop-title">
                <p class="text-overflow">
                  <span v-if="stores.isBrand">品牌</span>
                  {{ stores.name }}</p>
                <van-cell @click="showPopup">□···</van-cell>
                <van-popup v-model="showDislike">不喜欢</van-popup>
              </div>
              <div class="rate">
                <van-rate :size="10" v-model="stores.rate" readonly />
                <span class="rate">{{stores.rate}}</span>
                <span class="order">月售{{stores.order}}单</span>
                <span v-if="stores.isFNSpecialDelivery" class="float--right isFNSpecialDelivery">蜂鸟专送</span>
              </div>
              <p class="send">
                <span class="sendBasePrice">￥{{ stores.sendBasePrice }}起送</span>
                <span v-if="stores.sendPrice">配送费￥{{ stores.sendPrice }}</span>
                <span v-else>免配送费</span>
                <span class="float--right">{{ stores.distance }}km | {{ stores.time }}分钟</span>
              </p>
              <div class="description">
                <span v-if="stores.keyWord" class="keyword">{{stores.keyWord}}</span>
                <span v-else>其他快餐</span>
                <span v-if="stores.selfTake">支持自取</span>
                <span v-if="stores.qualityAlliance">品质联盟</span>
                <span v-if="stores.isPerfect" class="isPerfect">口碑人气好店</span>
              </div>
              <div class="activites">
                <section>
                  <div v-if="showActivitiesNumber" class="float--right" @click="toggleShowAllActivities">
                    <span>{{activities.length}}个活动</span>
                    <span :class="{'triangle': true, 'toUp': showAllActivities}"></span>
                  </div>
                  <p :class="{'text-overflow': true, 'display-none': hiddenMoreActivities(idx)}" v-for="(i, idx) in activities" :key="idx">
                    <span v-if="i.subtract" class="subtract">减</span>
                    <span v-else-if="i.special" class="special">特</span>
                    <span v-else-if="i.new" class="new">新</span>
                    <span v-else-if="i.discount" class="discount">折</span>
                    <span v-else-if="i.first" class="first">首</span>
                    <span v-else-if="i.exchange" class="exchange">换</span>
                    <span v-else-if="i.compensate " class="compensate ">赔</span>
                    <span v-else-if="i.invoice" class="invoice">票</span>
                    <span v-else-if="i.safe" class="safe">保</span>
                    {{ i.text }}
                  </p>
                </section>
              </div>
            </div>
          </section>
        </div>
        <div v-else :class="`${prefixCls}-noshoplist`">
          <img src="../../assets/imgs/home/toLogin.png" alt="">
          <p class="noresult">没有结果</p>
          <p class="info">登录后查看更多商家</p>
          <button @click="login" class="v-button v-button--success v-button--normal">登录</button>
        </div>
      </div>
      <!-- goTop -->
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <div v-if="goTopFlag" id="goTop" :class="`${prefixCls}-toTop`">
          <img src="../../assets/imgs/home/goTop.svg" alt="">
        </div>
      </transition>
      </div>
    </div>

      <!-- 选择收货地址 -->
      <div @getAddrAndCity="showAddrAndCity(addrObj)" v-if="showAddr">
        <transition name="slide-fade">
          <Address></Address>
        </transition>
      </div>

  </div>
</template>
<script>
const prefixCls = 'home-index';

import { mapGetters } from 'vuex'
import moment from 'moment';
import { getStores } from '../../apis';
import Address from '../../components/SelectAddress.vue';
export default {
  data() {
    return {
      prefixCls,
      recommendShopSelect: 0, // “推荐商家”nav，默认选项：综合排序
      showDislike: false, // 是否弹出不喜欢
      value: 0,
      switch1: false,
      switch2: false,
      switch3: false,
      container: null,
      recommShopNavOption: [ // 推荐商家导航选项
        { text: '综合评价', value: 0 },
        { text: '好评优先', value: 1 },
        { text: '销量最高', value: 2 }
      ],
      // swipe
      list1: [
        { id: 1, text: '美食' },
        { id: 2, text: '外卖' },
        { id: 3, text: '外卖' },
        { id: 4, text: '外卖' },
        { id: 5, text: '外卖' },
        { id: 6, text: '外卖' },
        { id: 7, text: '外卖' },
        { id: 8, text: '外卖' },
        { id: 9, text: '外卖' },
        { id: 10, text: '外卖' }
      ],
      list2: [
        { id: 1, text: '快餐' },
        { id: 2, text: '外卖' },
        { id: 3, text: '外卖' },
        { id: 4, text: '外卖' },
        { id: 5, text: '外卖' },
        { id: 6, text: '外卖' },
        { id: 7, text: '外卖' },
        { id: 8, text: '外卖' },
        { id: 9, text: '外卖' },
        { id: 10, text: '外卖' }
      ],
      stores: [], // 商家
      activities: [], // 商家活动
      address: '', // 当前地址
      addressflag: false, // 标识符，是否获取到address
      showActivitiesNumber: false, // 默认不显示活动数量
      showAllActivities: false, // 默认不显示所有活动
      goTopFlag: false, // 标识符，是否置顶
      showAddr: false, // 标识符，是否显示“选择收货地址”页面
    }
  },
  components: {
    Address,
  },
  computed: {
    ...mapGetters([
      'user', // this.$store.getters.user -> this.user
    ]),
  },
  watch: {
    activities() { // 监听activities数据变化
      if (this.activities.length > 2) { // 如果超过2个
        this.showActivitiesNumber = true; // 显示“n个活动”
      } else {
        this.showActivitiesNumber = false;
      }
    },
    address() {
      if (!this.addressflag) { // 如果当前地址为空，则显示“选择收货地址”
        this.showAddr = true;
        console.log('选择收货地址');
      }
    },
  },
  methods: {
    onConfirm() {
      this.$refs.item.toggle();
    },
    showPopup() { // 弹出“不喜欢”
      this.show = true;
    },
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      el.style.opacity = 1;
      el.style.transition = 'all 1s ease';
      done();
    },
    leave(el) {
      el.style.opacity = 0;
      el.style.transition = 'all 1s ease';
    },
    scrollGoTop() { // 滚动显示“goTop”元素
      // console.log(window.scrollY);
      if (window.scrollY > 300) {
        this.goTopFlag = true;
      } else {
        this.goTopFlag = false;
      }
    },
    showAddress() { // 显示“选择收货地址”页
      this.showAddr = true;
      // this.inputaddress = ''; // 清空输入框
    },
    showAddrAndCity(addrObj) {
      if (addrObj) {
        this.address = addrObj.address;
      }
    },
    toggleShowAllActivities() { // 切换是否显示所有活动
      this.showAllActivities = !this.showAllActivities;
    },
    hiddenMoreActivities(idx) { // 隐藏多余2个的商家活动
      if (idx > 1 && !this.showAllActivities) {
        return true;
      } else {
        return false;
      }
    },
    login() { // 跳转到登录页
      this.$router.push('/login');
    }
  },
  created() {
    let storeAddr = this.$store.state.user.address;
    console.log(storeAddr);
    if (storeAddr) { // 如果store中的address存在，将里面的address取出来，并将address标为已存在
      this.addressflag = true;
      this.address = storeAddr.address;
      // this.city = storeAddr.city;
    }
    // console.log(this.address);
    // console.log(this.$route);
    // console.log(this.$store);
    // 有用户信息（登陆后）
    if (this.user) {
      // 请求商家数据
      getStores().then(
        res => {
          this.stores = res;
        },
        err => {
          console.log(err);
        }
      )
      // 获取商店活动信息
      this.activities = [
        // 活动可能有1-8个
        // 当活动不超过2个时，则显示所有活动，并且不显示“n个活动”字样
        // 当活动超过2个时，则默认收起2个以上的活动，并在右侧显示“n个活动”
        //    点击可显示其他活动
        { subtract: true, text: '满35减3， 满69减10' },
        { invoice: true, text: '该商家支持开发票，请在下单时填写好发票抬头' },
        { compensate : true, text: '商家原因导致订单取消，赔付代金券' },
        { discount: true, text: '折扣商品5折起' },
        { special: true, text: '特价商品3.88元起' },
        { safe: true, text: '该商户食品安全已由国泰产险承担，食品安全有保障' },
        { new: true, text: '新用户下单立减11元' },
        { first: true, text: '本店新用户立减1元' },
      ];
    }
    // 如果没有选择收货地址，则跳转到“选择收货地址”
    if (!this.address) {
      this.showAddr = true;
      this.address = "未能获取地址";
      this.addressflag = false;
    }
  },
  mounted() {
    this.scrollGoTop();
    window.addEventListener('scroll', this.scrollGoTop);
  }
}
</script>
