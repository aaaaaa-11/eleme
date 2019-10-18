<template>
  <div :class="prefixCls">
    <!-- 首页 -->
    <div :class="{'unscrollable':showAddr}">
      <!-- header -->
      <div :class="`${prefixCls}-header`">
        <div @click="showAddress" :class="`${prefixCls}-header__title`">
          <van-icon name="location-o" />
          <h3 class="text-overflow">xxx路xxx区xxx(xxx)xxxxxx</h3>
          <span class="trangle"></span>
        </div>
        <van-sticky>
        <div :class="`${prefixCls}-header__search`">
          <div>
            <van-icon name="search" />
            <span>搜索饿了么商家、商品名称</span>
          </div>
        </div>
        </van-sticky>
      </div>
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
        <div :class="`${prefixCls}-handle-wrap`">
          <van-icon name="vip-card" />
          <p class="bold">超级会员</p>
          <span>·</span>
          <p class="font-sm">每月领20元红包</p>
          <span class="font-sm span-right">立即开通
            <van-icon class="font-sm arrow-right" name="arrow" />
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
                <van-dropdown-item v-model="value1" :options="option1" />
              </van-dropdown-menu>
            </li>
            <li><a href="javascript:;">距离最近</a></li>
            <li><a href="javascript:;">品质联盟</a></li>
            <li><a href="javascript:;">筛选
              <van-icon name="filter-o" />
            </a></li>
          </ul>
        </div>
        <div :class="`${prefixCls}-shop-list`" v-for="(item, i) in shopList" :key="i" ref="shopList">
          <section>
            <div class="img">
              <img src="../../assets/imgs/home/shop1.webp" alt="">
            </div>
            <div :class="`${prefixCls}-shop-list__content`">
              <div class="shop-title">
                <p class="text-overflow">{{ item.title }}</p>
                <van-cell @click="showPopup">□…</van-cell>
                <van-popup v-model="show">不喜欢</van-popup>
              </div>
              <van-rate :size="10" v-model="item.score" readonly />
              <p>￥{{ item.min }}起送|夜间配送费￥{{ item.night }}
                <span class="float--right">{{ item.distance }}km | {{ item.time }}分钟</span>
              </p>
              <span class="add font-sm" v-for="(i, idx) in item.add" :key="idx">{{ i }}</span>
              <div class="activites">
                <p class="text-overflow" v-for="(i, idx) in item.activities" :key="idx"><span>{{ i.tag }}</span>{{ i.text }}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <!-- goTop -->
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <div v-if="flag" id="goTop" :class="`${prefixCls}-toTop`">
          <img src="../../assets/imgs/home/goTop.svg" alt="">
        </div>
      </transition>
    </div>

    <!-- 选择收货地址 -->
    <transition name="slide-fade">
      <div v-if="showAddr" :class="`${prefixCls}-address`">
        <!-- header -->
        <van-nav-bar
          title="选择收货地址"
          right-text="新增地址"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        />
        <!-- search -->
        <div :class="`${prefixCls}-address-search box flex`">
          <div class="city flex" slot="action">
            <p class="text-overflow">啊啊啊啊城市</p>
            <span class="trangle"></span>
          </div>
          <van-search
            placeholder="请输入地址"
            show-action
            shape="round"
          >
          </van-search>
        </div>
        <!-- 当前地址 -->
        <div :class="`${prefixCls}-address-currAddr`">
          <p class="title">当前地址</p>
          <div :class="`${prefixCls}-address-currAddr__content flex box`">
            <p class="box text-overflow">啊啊啊啊啊啊啊啊啊啊啊test啊啊啊啊啊</p>
            <a href="javascript:;"><van-icon name="aim" />重新定位</a>
          </div>
        </div>
        <!-- 收货地址 -->
        <div :class="`${prefixCls}-address-shAddr`">
          <p class="title">收货地址</p>
          <div class="list box">
            <div class="list-item">
              <p>
                <span class="name">小明</span>
                <span class="gender">男士</span>
                <span class="phone">12345678901</span>
              </p>
              <p class="addr">xxx市xxx区xxxxxx路xxx号</p>
            </div>
            <div class="list-item">
              <p>
                <span class="name">小明</span>
                <span class="gender">男士</span>
                <span class="phone">12345678901</span>
              </p>
              <p class="addr">xxx市xxx区xxxxxx路xxx号</p>
            </div>
            <div class="list-item">
              <p>
                <span class="name">小明</span>
                <span class="gender">男士</span>
                <span class="phone">12345678901</span>
              </p>
              <p class="addr">xxx市xxx区xxxxxx路xxx号</p>
            </div>
            <div class="list-item">
              <p>
                <span class="name">小明</span>
                <span class="gender">男士</span>
                <span class="phone">12345678901</span>
              </p>
              <p class="addr">xxx市xxx区xxxxxx路xxx号</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 城市选择 -->
    <div :class="`${prefixCls}-city`"></div>
  </div>
</template>
<script>
const prefixCls = 'home-index';
export default {
  data() {
    return {
      value1: 0,
      prefixCls,
      show: false,
      value: 0,
      switch1: false,
      switch2: false,
      switch3: false,
      container: null,
      option1: [
        { text: '综合评价', value: 0 },
        { text: '好评优先', value: 1 },
        { text: '销量最高', value: 2 }
      ],
      score: 4,
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
      shopList: [
        {
          id: 1, title: '卤汁拌饭(合肥总店)testtesttesttest', score: 4, order: 547, min: 10, night: '3', distance: 1.83, time: 33, add: ['其他快餐', '支持自取'], activities: [{ tag: '减', text: '满35减3， 满69减10' }, { tag: '票', text: '该商家支持开发票，请在下单时填写好发票抬头' }]
        },
        {
          id: 1, title: '蒸小皖（拓基广场店）', score: 4, order: 547, min: 10, send: '3', distance: 1.83, time: 33, add: ['其他快餐', '支持自取'], activities: [{ tag: '减', text: '满35减3， 满69减10' }, { tag: '赔', text: '商家原因导致订单取消，赔付代金券' }]
        },
        {
          id: 1, title: '周黑鸭(合肥1912店)', score: 4, order: 547, min: 10, send: '3', distance: 1.83, time: 33, add: ['其他快餐', '支持自取'], activities: [{ tag: '减', text: '满35减3， 满69减10' }, { tag: '折', text: '折扣商品5折起' }, { tag: '换', text: '特价商品3.88元起' }, { tag: '保', text: '该商户食品安全已由国泰产险承担，食品安全有保障' }]
        },
        {
          id: 1, title: '卤汁拌饭(合肥总店)', score: 4, order: 547, min: 10, send: '3', distance: 1.83, time: 33, add: ['其他快餐', '支持自取'], activities: [{ tag: '减', text: '满35减3， 满69减10' }, { tag: '票', text: '满20减19，满35减20，满69减38，满89减49，满120减57sdcsdcc' }]
        },
        {
          id: 1, title: '周黑鸭(合肥1912店)', score: 4, order: 547, min: 10, send: '3', distance: 1.83, time: 33, add: ['其他快餐', '支持自取'], activities: [{ tag: '减', text: '满35减3， 满69减10' }, { tag: '折', text: '折扣商品5折起' }, { tag: '换', text: '特价商品3.88元起' }, { tag: '保', text: '该商户食品安全已由国泰产险承担，食品安全有保障' }]
        },
        {
          id: 1, title: '卤汁拌饭(合肥总店)', score: 4, order: 547, min: 10, send: '3', distance: 1.83, time: 33, add: ['其他快餐', '支持自取'], activities: [{ tag: '减', text: '满35减3， 满69减10' }, { tag: '票', text: '满20减19，满35减20，满69减38，满89减49，满120减57sdcsdcc' }]
        }
      ],
      goTop: '',
      flag: false,
      showAddr: false,
      shaddr: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    onConfirm() {
      this.$refs.item.toggle();
    },
    showPopup() {
      this.show = true;
    },
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transition = 'all 1s ease';
    },
    enter(el, done) {
      el.style.opacity = 1;
      done();
    },
    leave(el) {
      el.style.opacity = 0;
      el.style.transition = 'all 1s ease';
    },
    scrollGoTop() {
      // console.log(window.scrollY);
      if (window.scrollY > 100) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    showAddress() {
      this.showAddr = true;
    },
    onClickLeft() {
      this.showAddr = false;
    },
    onClickRight() {
      console.log('新增地址');
    },
  },
  created() {
    // console.log(this.$route);
    // console.log(this.$router);
  },
  mounted() {
    this.container = this.$refs.container;
    this.scrollGoTop();
    window.addEventListener('scroll', this.scrollGoTop);
  }
}
</script>
