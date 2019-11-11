<template>
  <div :class="prefixCls">
    <!-- 首页 -->
    <div :class="{'unscrollable':showAddrFlag}">
      <!-- header -->
      <div :class="`${prefixCls}-header`">
        <div ref="header" @click="showAddress" :class="`${prefixCls}-header__title`">
          <van-icon name="location-o" />
          <h3 class="text-overflow">{{address}}</h3>
          <span class="triangle"></span>
          <!-- <router-link to="/home/address"></router-link> -->
        </div>
        <!-- search -->
        <van-sticky>
          <div :class="`${prefixCls}-header__search`">
            <router-link to="/search">
              <div>
                <van-icon name="search" />
                <span>搜索饿了么商家、商品名称</span>
              </div>
            </router-link>
          </div>
        </van-sticky>
      </div>
      <!-- 没有地址时显示 -->
      <div v-if="!addrFlag" class="noaddress box">
        <img src="../../assets/imgs/home/noAddress.gif" alt />
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
                    <img src="../../assets/imgs/home/1.webp" />
                    <p>{{ item.text }}</p>
                  </van-grid-item>
                </van-grid>
              </div>
            </van-swipe-item>
            <van-swipe-item>
              <div :class="`${prefixCls}-swipe-list active`">
                <van-grid :column-num="5" v-for="(item, i) in list2" :key="i">
                  <van-grid-item :class="`${prefixCls}-swipe-list__item`" use-slot>
                    <img src="../../assets/imgs/home/1.webp" />
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
              <p>
                立即抢购
                <van-icon name="arrow" />
              </p>
            </div>
            <div :class="`${prefixCls}-handle-content__img`">
              <img src="../../assets/imgs/home/2.webp" alt />
            </div>
          </div>
          <div v-if="user" :class="`${prefixCls}-handle-wrap`">
            <van-icon name="vip-card" />
            <p class="bold">超级会员</p>
            <span>·</span>
            <p class="font-sm">每月领20元红包</p>
            <span class="font-sm span-right">
              <router-link to="/supervip">
                立即开通
                <van-icon class="font-sm arrow-right" name="arrow" />
              </router-link>
            </span>
          </div>
        </div>
        <!-- shop-list -->
        <div :class="`${prefixCls}-shop`">
          <div :class="`${prefixCls}-shop-recommend text--center`">
            <p>推荐商家</p>
          </div>
          <!-- 筛选tabbar -->
          <div :class="`${prefixCls}-shop-nav text--center`">
            <van-tabbar :fixed=false active-color="#333" v-model="navbarActive">
              <van-tabbar-item>
                <van-dropdown-menu>
                  <van-dropdown-item v-model="recommendShopSelect" :options="recommShopNavOption" />
                </van-dropdown-menu>
              </van-tabbar-item>
              <van-tabbar-item>距离最近</van-tabbar-item>
              <van-tabbar-item>品质联盟</van-tabbar-item>
              <div class="selectStore">
                <van-dropdown-menu class="selectStore-dropDown-menu">
                  <van-dropdown-item title="筛选" ref="item" @open="showSelectStore=true" @close="showSelectStore=false">
                    <div class="selectStore-extend" v-if="showSelectStore">
                      <div class="selectStore-extend__content">
                        <p class="title">商家服务（可多选）</p>
                        <div class="content">
                          <van-row>
                            <van-col span="8">
                              <div>
                                <img src="../../assets/imgs/home/fengniao.webp" alt />蜂鸟专送
                              </div>
                            </van-col>
                            <van-col span="8">
                              <div>
                                <img src="../../assets/imgs/home/isBrand.webp" alt />品牌商家
                              </div>
                            </van-col>
                            <van-col span="8">
                              <div>
                                <img src="../../assets/imgs/home/newStore.webp" alt />新店
                              </div>
                            </van-col>
                            <van-col span="8">
                              <div>
                                <img src="../../assets/imgs/home/isFoodEnsure.webp" alt />食安保
                              </div>
                            </van-col>
                            <van-col span="8">
                              <div>
                                <img src="../../assets/imgs/home/invoice.webp" alt />开发票
                              </div>
                            </van-col>
                          </van-row>
                        </div>
                        <p class="title">优惠活动（单选）</p>
                        <div class="content">
                          <van-row>
                            <van-col span="8">
                              <div>首单立减</div>
                            </van-col>
                            <van-col span="8">
                              <div>门店新客立减</div>
                            </van-col>
                            <van-col span="8">
                              <div>满减优惠</div>
                            </van-col>
                            <van-col span="8">
                              <div>下单返红包</div>
                            </van-col>
                            <van-col span="8">
                              <div>进店领红包</div>
                            </van-col>
                            <van-col span="8">
                              <div>配送费优惠</div>
                            </van-col>
                            <van-col span="8">
                              <div>赠品优惠</div>
                            </van-col>
                            <van-col span="8">
                              <div>特价商品</div>
                            </van-col>
                            <van-col span="8">
                              <div>品质联盟红包</div>
                            </van-col>
                          </van-row>
                        </div>
                        <p class="title">人均消费</p>
                        <div class="content">
                          <van-row>
                            <van-col span="8">
                              <div>￥20以下</div>
                            </van-col>
                            <van-col span="8">
                              <div>￥20-￥40</div>
                            </van-col>
                            <van-col span="8">
                              <div>￥40-￥60</div>
                            </van-col>
                            <van-col span="8">
                              <div>￥60-￥80</div>
                            </van-col>
                            <van-col span="8">
                              <div>￥80-￥100</div>
                            </van-col>
                            <van-col span="8">
                              <div>￥100以上</div>
                            </van-col>
                          </van-row>
                        </div>
                      </div>
                      <div class="btnBox">
                        <button class="clear box">清空</button>
                        <van-button block type="info">确认</van-button>
                      </div>
                    </div>
                  </van-dropdown-item>
                </van-dropdown-menu>
              </div>
            </van-tabbar>
            <!-- <ul class="navBar">
              <li :class="`${prefixCls}-shop-nav--active comEvaluation`">
                <van-dropdown-menu>
                  <van-dropdown-item v-model="recommendShopSelect" :options="recommShopNavOption" />
                </van-dropdown-menu>
              </li>
              <li>
                <a href="javascript:;">距离最近</a>
              </li>
              <li>
                <a href="javascript:;">品质联盟</a>
              </li>
              <li class="selectStore" @click="toggleSelectStore">
                <van-dropdown-menu class="selectStore-dropDown-menu"><van-icon name="filter-o" />
                  <van-dropdown-item title="筛选" ref="item">
                    <div class="selectStore-extend" v-if="showSelectStore">
                      <div class="selectStore-extend__content">
                        <p class="title">商家服务（可多选）</p>
                        <div class="content">
                          <van-row>
                            <van-col span="8">
                              <div>
                                <img src="../../assets/imgs/home/fengniao.webp" alt />蜂鸟专送
                              </div>
                            </van-col>
                            <van-col span="8">
                              <div>
                                <img src="../../assets/imgs/home/isBrand.webp" alt />品牌商家
                              </div>
                            </van-col>
                            <van-col span="8">
                              <div>
                                <img src="../../assets/imgs/home/newStore.webp" alt />新店
                              </div>
                            </van-col>
                            <van-col span="8">
                              <div>
                                <img src="../../assets/imgs/home/isFoodEnsure.webp" alt />食安保
                              </div>
                            </van-col>
                            <van-col span="8">
                              <div>
                                <img src="../../assets/imgs/home/invoice.webp" alt />开发票
                              </div>
                            </van-col>
                          </van-row>
                        </div>
                        <p class="title">优惠活动（单选）</p>
                        <div class="content">
                          <van-row>
                            <van-col span="8">
                              <div>首单立减</div>
                            </van-col>
                            <van-col span="8">
                              <div>门店新客立减</div>
                            </van-col>
                            <van-col span="8">
                              <div>满减优惠</div>
                            </van-col>
                            <van-col span="8">
                              <div>下单返红包</div>
                            </van-col>
                            <van-col span="8">
                              <div>进店领红包</div>
                            </van-col>
                            <van-col span="8">
                              <div>配送费优惠</div>
                            </van-col>
                            <van-col span="8">
                              <div>赠品优惠</div>
                            </van-col>
                            <van-col span="8">
                              <div>特价商品</div>
                            </van-col>
                            <van-col span="8">
                              <div>品质联盟红包</div>
                            </van-col>
                          </van-row>
                        </div>
                        <p class="title">人均消费</p>
                        <div class="content">
                          <van-row>
                            <van-col span="8">
                              <div>￥20以下</div>
                            </van-col>
                            <van-col span="8">
                              <div>￥20-￥40</div>
                            </van-col>
                            <van-col span="8">
                              <div>￥40-￥60</div>
                            </van-col>
                            <van-col span="8">
                              <div>￥60-￥80</div>
                            </van-col>
                            <van-col span="8">
                              <div>￥80-￥100</div>
                            </van-col>
                            <van-col span="8">
                              <div>￥100以上</div>
                            </van-col>
                          </van-row>
                        </div>
                      </div>
                      <div class="btnBox">
                        <button class="clear box">清空</button>
                        <van-button block type="info">确认</van-button>
                      </div>
                    </div>
                  </van-dropdown-item>
                </van-dropdown-menu>
              </li>
            </ul> -->
          </div>
          <div v-if="user" :class="`${prefixCls}-shop-list`">
            <section v-for="(item, index) in stores" :key="index" class="item">
              <div class="img">
                <img src="../../assets/imgs/home/shop1.webp" alt />
              </div>
              <div :class="`${prefixCls}-shop-list__content`">
                <div class="shop-title">
                  <p class="text-overflow">
                    <span class="isBrand" v-if="item.isBrand">品牌</span>
                    {{ item.name }}
                  </p>
                  <van-cell @click="showPopup">□···</van-cell>
                  <van-popup v-model="showDislike">不喜欢</van-popup>
                </div>
                <div class="rate">
                  <van-rate :size="10" v-model="rate" readonly />
                  <span class="rate">{{rate}}</span>
                  <span class="order">月售{{order}}单</span>
                  <span
                    v-if="item.isFNSpecialDelivery"
                    class="float--right isFNSpecialDelivery"
                  >蜂鸟专送</span>
                </div>
                <p v-if="item.isSend" class="send">
                  <span class="sendBasePrice">￥{{ item.sendBasePrice }}起送</span>
                  <span v-if="item.sendPrice">配送费￥{{ item.sendPrice }}</span>
                  <span v-else>免配送费</span>
                  <span class="float--right">{{ distance }}km | {{ time }}分钟</span>
                </p>
                <div class="description">
                  <div v-if="item.keyWord" class="keyword">
                    <span
                      v-for="(keyWordItem, idx) in item.keyWord"
                      :key="idx"
                      class="keyword"
                    >{{keyWordItem}}</span>
                  </div>
                  <!-- <span v-else>其他快餐</span> -->
                  <!-- <span v-if="item.selfTake">支持自取</span> -->
                  <span v-if="item.isPerfect" class="isPerfect">
                    <img src="../../assets/imgs/home/isPerfect.webp" alt />
                    口碑人气好店
                  </span>
                </div>
                <div class="activites" v-if="item.activities">
                  <section>
                    <!-- n个活动（大于2个时显示） -->
                    <div
                      v-if="showActivitiesNumber(item)"
                      class="float--right"
                      @click="toggleShowAllActivities(item)"
                    >
                      <span class="atvNum">{{ item.activities.length }}个活动</span>
                      <span :class="{'triangle': true, 'toUp': item.showAllActivities}"></span>
                    </div>
                    <!-- 活动内容 -->
                    <div class="activities__content">
                      <!-- item.activities -->
                      <p
                        :class="{'text-overflow': true, 'display-none': hiddenMoreActivities(item, idx,)}"
                        v-for="(atvItem, idx) in item.activities"
                        :key="idx"
                      >
                        <span v-if="!atvItem.iconName">保</span>
                        <span
                          v-else
                          :style="{'background-color': '#' + atvItem.iconSingleBg}"
                        >{{ atvItem.iconSingleName }}</span>
                        {{ atvItem.name }}
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </section>
          </div>
          <div v-else :class="`${prefixCls}-noshoplist`">
            <img src="../../assets/imgs/home/toLogin.png" alt />
            <p class="noresult">没有结果</p>
            <p class="info">登录后查看更多商家</p>
            <button @click="login" class="v-button v-button--success v-button--normal">登录</button>
          </div>
        </div>
        <!-- 已经加载了所有商家 -->
        <div :class="`${prefixCls}-noMoreStore box`" v-if="noMoreStores">
          <p class="text--center">更多商家接入中，敬请期待~</p>
        </div>
        <!-- goTop -->
        <transition name="goTop-fade">
          <div v-if="goTopFlag" id="goTop" :class="`${prefixCls}-goTop`">
            <img src="../../assets/imgs/home/goTop.svg"/>
          </div>
        </transition>
      </div>
    </div>

    <!-- 选择收货地址 -->
    <Address :paramsFromhomeToAddr="showAddrFlag" @getAddrObjFromShowAddr="getAddrObjFromShowAddr"></Address>
  </div>
</template>
<script>
const prefixCls = "home-index";

import { mapGetters } from "vuex";
import moment from "moment";
import { getStores } from "../../apis";
import Address from "../../components/SelectAddress.vue";
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
        { text: "综合评价", value: 0 },
        { text: "好评优先", value: 1 },
        { text: "销量最高", value: 2 },
        { text: "起送价最低", value: 3 },
        { text: "配送最快", value: 4 },
        { text: "配送费最低", value: 5 },
        { text: "人均从低到高", value: 6 },
        { text: "人均从高到低", value: 7 },
        { text: "通用排序", value: 8 },
      ],
      // swipe
      list1: [
        { id: 1, text: "美食" },
        { id: 2, text: "外卖" },
        { id: 3, text: "外卖" },
        { id: 4, text: "外卖" },
        { id: 5, text: "外卖" },
        { id: 6, text: "外卖" },
        { id: 7, text: "外卖" },
        { id: 8, text: "外卖" },
        { id: 9, text: "外卖" },
        { id: 10, text: "外卖" }
      ],
      list2: [
        { id: 1, text: "快餐" },
        { id: 2, text: "外卖" },
        { id: 3, text: "外卖" },
        { id: 4, text: "外卖" },
        { id: 5, text: "外卖" },
        { id: 6, text: "外卖" },
        { id: 7, text: "外卖" },
        { id: 8, text: "外卖" },
        { id: 9, text: "外卖" },
        { id: 10, text: "外卖" }
      ],
      navbarActive: null,
      stores: [], // 所有商家
      rate: 4.8, // 默认评分
      order: 342, // 默认订单数
      distance: 33, // 默认配送距离
      time: 18, // 默认配送时间
      address: "", // 当前地址
      addrFlag: false, // 标识符，是否获取到address
      goTopFlag: false, // 标识符，是否置顶
      showAddrFlag: false, // 标识符，是否显示“选择收货地址”页面
      showSelectStore: false, // 标识符，是否显示“筛选”下拉菜单
      pageIndex: 1, // 请求数据分页页码，默认为1
      ableToGetMoreData: true, // 开关，是否可以请求更多数据
      noMoreStores: false, // 已经请求并加载了所有的商家
      // servicers: , // 商家服务（筛选）
    };
  },
  components: {
    Address
  },
  computed: {
    ...mapGetters([
      "user" // this.$store.getters.user -> this.user
    ])
  },
  watch: {
    showSelectStore() {
      console.log(this.showSelectStore);
    }
  },
  methods: {
    showPopup() { // 弹出“不喜欢”
      this.showDislike = true;
    },
    scrollGoTop() { // 滚动是否显示“goTop”元素
      if (window.scrollY > 300) {
        this.goTopFlag = true;
      } else {
        this.goTopFlag = false;
      }
    },
    showActivitiesNumber(item) { // 活动数量超过2个，显示“n个活动”，否则不显示
      // let atvLength = item.activities.length;
      // // 如果有食安保，则活动数量++
      // if (item.isFoodEnsure) {
      //   atvLength ++;
      // }
      if (item.activities.length > 2) {
        return true;
      } else {
        return false;
      }
    },
    toggleShowAllActivities(item) { // 切换是否显示所有活动
      item.showAllActivities = !item.showAllActivities;
    },
    hiddenMoreActivities(item, index) { // 隐藏多余2个的商家活动
      if (index > 1 && !item.showAllActivities) {
        return true;
      } else {
        return false;
      }
    },
    login() {  // 跳转到登录页
      this.$router.push("/login");
    },
    showAddress() {  // 显示地址组件
      this.showAddrFlag = true;
    },
    getAddrObjFromShowAddr(addr, addrFlag) { // 从“选择收货地址”获取到地址数据
      this.showAddrFlag = false; // 不显示“收货地址”组件
      this.addrFlag = addrFlag;
      if (addrFlag) {
        // 如果获取到的地址不为空
        this.address = addr;
      } else {
        this.address = "未能获取地址";
        this.addrFlag = false;
      }
    },
    // toggleSelectStore() { // 切换“筛选”扩展内容
    //   // let selectStore = document.getElementById('selectStore')
    //   // if (this.showSelectStore) {
    //   //   selectStore.$emit('close');
    //   // } else {
    //   //   selectStore.$emit('open');
    //   // }
    //   // console.log(this.$refs);
    //   // this.$refs.item.$emit('click');
    // },
    loadMoreStores() { // 下拉到底部加载更多
      const _this = this;
      // 如果下拉到底部&开关打开
      if (window.scrollY + window.outerHeight >= document.body.clientHeight && _this.ableToGetMoreData) {
          _this.ableToGetMoreData = false; // 关闭开关
          _this.pageIndex ++ ; // 页码增加
          getStores({
            params: {
              pageIndex: _this.pageIndex,
            }
          }).then(
            res => {
              // console.log('loadMoreStoreData, ', res.data);
              if (res.data.length === 0) { // 如果请求回来的商家数据为空（所有商家数据都请求完了）
                _this.noMoreStores = true; // 显示页面底部的提示信息
                _this.loadMoreStores = null; // 下拉加载数据方法失效
                // console.log('End  _this.noMoreStores=', _this.noMoreStores);
                return; // 不用再执行接下来的代码了
              }
              res.data.map(item => {
                // 为每个商家添加一个“显示所有活动”的属性，默认不显示多余的活动
                item.showAllActivities = false;
                if (item.isFoodEnsure) {
                  // 把“食安保”加入activities
                  item.activities.push({
                    name: "该商户食品安全已由国泰产险承担，食品安全有保障"
                  });
                }
                return item;
              });
              res.data.forEach(item => { // 将请求回来的数据遍历存入this.stores中
                _this.stores.push(item);
              });
              _this.ableToGetMoreData = true; // 请求完成后打开开关
            },
            err => {
              console.log(err);
              _this.ableToGetMoreData = true;
            }
          );
      }
    },
  },
  created() {
    let store = this.$store.state.user;
    console.log("home component, store.state.user----", this.$store.state.user);
    if (this.$store.state.user.address) {
      // store中的address不为空
      this.addrFlag = true;
      this.address = store.address;
      this.showAddrFlag = false; // 不显示地址组件
    } else {
      // 如果没有地址数据，则跳转到“选择收货地址”
      this.addrFlag = false;
      this.showAddrFlag = true;
      this.address = "未能获取地址";
    }
    // 有用户信息（登陆后）
    if (this.user) {
      // 请求商家数据
      getStores().then(
        res => {
          // console.log(res);
          res.data.map(item => {
            // 为每个商家添加一个“显示所有活动”的属性，默认不显示多余的活动
            item.showAllActivities = false;
            if (item.isFoodEnsure) {
              // 把“食安保”加入activities
              item.activities.push({
                name: "该商户食品安全已由国泰产险承担，食品安全有保障"
              });
            }
            return item;
          });
          this.stores = res.data;
          console.log(this.stores);
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  mounted() {
    this.scrollGoTop();
    window.addEventListener("scroll", this.scrollGoTop);
    window.addEventListener('scroll', this.loadMoreStores);
  }
};
</script>
