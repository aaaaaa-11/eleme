<template>
  <div :class="prefixCls">
    <!-- header -->
    <div :class="`${prefixCls}-header text--center`">
      <van-icon name="arrow-left" @click="backToHome" />
      <img :class="`${prefixCls}-header__img`" src="../../assets/imgs/food/header.webp" alt />
    </div>
    <!-- wrap -->
    <div :class="`${prefixCls}-wrap box text-center`">
      <!-- title -->
      <van-cell @click="showTitlePopup">
        <div class="row-title flex">
          <h3 class="title text-overflow">仟兹蜜蛋糕烘焙(巴楚县店)</h3>
          <van-icon name="play" />
        </div>
        <p class="info">
          <span class="info-evalute">评价5.0</span>
          <span class="info-order">月售10单</span>
          <span class="info-sendTime">商家配送约41分钟</span>
        </p>
      </van-cell>
      <van-popup class="title-popup" v-model="showTitleDetial" closeable close-icon="close" >
        <div class="title-popup__content box">
          <p class="title text--center bold">仟兹蜜蛋糕烘焙(巴楚县店)</p>
          <ul class="content">
            <li class="content__cell">
              <h4>5</h4>
              <span>评分</span>
            </li>
            <li class="content__cell">
              <h4>10单</h4>
              <span>月售</span>
            </li>
            <li class="content__cell">
              <h4>商家配送</h4>
              <span>约41分钟</span>
            </li>
            <li class="content__cell">
              <h4>0元</h4>
              <span>配送费</span>
            </li>
            <li class="content__cell">
              <h4>1.3km</h4>
              <span>距离</span>
            </li>
          </ul>
          <div class="notice-title">公告</div>
          <p class="notice-content">
            亲爱的各位小主，由于下大雨，平台骑手较少，所以会出现无人配送，配送过慢的情况，在此先跟各位道个歉了
            亲爱的各位小主，由于下大雨，平台骑手较少，所以会出现无人配送，配送过慢的情况，在此先跟各位道个歉了
            如有餐品问题与建议，请联系我们。承接大小团餐，欢迎开店合作。欢迎光临，用餐高峰期请提前下单，谢谢。
          </p>
        </div>
      </van-popup>
      <!-- 优惠券 -->
      <div :class="`${prefixCls}-wrap-coupons`">
        <div v-for="(item, index) in couponsList" :key="index" :class="`${prefixCls}-wrap-coupons__item flex`" :style="{'background-color':item.bgc}" @click="showCoupons">
          <p class="description flex">
            <span class="money bold">￥<span class="large">{{ item.money }}</span>
            </span>
            <span class="text flex"><van-icon name="like" />{{ item.text }}</span>
          </p>
          <span class="get-coupon">领取</span>
        </div>
        <van-popup
          v-model="showcoupons"
          position="bottom"
          closeable
          close-icon="cross"
          :close-on-click-overlay="false"
        >
          <p class="coupon-item__title text--center bold">店铺专享红包</p>
          <p class="desc bold">超级会员特权<span class="light">限超级会员用户兑换</span></p>
          <div class="coupon coupon1">
            <div class="coupon-left">
              <div class="money">￥<span class="large bold">5</span></div>
              <div class="text">
                <p class="bold">满任意金额可用</p>
                <p class="small">限连锁店使用,2019-12-10到期</p>
              </div>
            </div>
            <div class="coupon-right">
              <button>兑换</button>
            </div>
          </div>
          <div class="coupon coupon2">
            <div class="coupon-left">
              <div class="money">￥<span class="large bold">6</span></div>
              <div class="text">
                <p class="bold">满￥199可用</p>
                <p class="small">限连锁店使用,2019-12-10到期</p>
              </div>
            </div>
            <div class="coupon-right">
              <button>领取</button>
            </div>
          </div>
        </van-popup>
      </div>
      <!-- 优惠活动 -->
      <div :class="`${prefixCls}-wrap-activities`">
        <div @click="showActivities" :class="`${prefixCls}-wrap-activities__title`">
          <!-- 如果优惠第一条为满减 -->
          <p v-if="activities[0].attribute" class="subtract text-overflow">
            <span v-for="(item, index) in activities[0].attribute" :key="index">满{{item}}减{{activities[0].attribute[item]}}元</span>
          </p>
          <p v-else class="text-overflow">{{ activities[0] }}</p>
          <div class="activities-number float--right">
            <span>{{ activities.length }}个活动</span>
            <span class="triangle"></span>
          </div>
        </div>
        <van-popup
          v-model="showDiscount"
          closeable
          position="bottom"
          close-icon="cross"
        >
          <h4 class="activities__title text--center">优惠活动</h4>
          <div class="activities__content">
            <div v-for="(item, i) in activities" :key="i">
              <span class="iconName">{{ item.iconName }}</span>{{ item.description }}
            </div>
          </div>
        </van-popup>
      </div>
      <!-- 公告 -->
      <p class="notice">公告：欢迎光临，用餐高峰期请提前下单，谢谢。</p>
    </div>
    <div :class="`${prefixCls}-nav`">
      <van-sticky>
        <van-tabs v-model="navActive" :duration="0" line-width="40px">
          <van-tab title="点餐" name="order"></van-tab>
          <van-tab title="评价" name="comment"></van-tab>
          <van-tab title="商家" name="store"></van-tab>
        </van-tabs>
      </van-sticky>
    </div>
    <!-- 点餐 -->
    <div v-if="navActive==='order'" :class="`${prefixCls}-order box`">
      <!-- 推荐商家 -->
      <div :class="`${prefixCls}-order__recommend`">
        <h4 class="title">商家推荐</h4>
        <div class="recommend-content">
          <div class="recommend-item" v-for="(item, index) in selectRecommendFood(foodList)" :key="index">
            <div class="recommend-item__inner" v-if="item.recommend">
              <img @click="showFoodPanel(item)" src="../../assets/imgs/food/recommend.webp" />
              <div @click="showFoodInfo(item)">
                <p class="food-title text-overflow">{{ item.name }}</p>
                <p class="small">月售{{ item.monthSales }} 好评率{{ item.rate }}%</p>
                <div class="footer flex">
                  <p class="price">￥<span class="large">{{ item.price }}</span></p>
                  <span v-if="item.quantity" class="add-goods">+</span>
                  <span v-else class="sold-out">已售完</span>
                </div>
              </div>
            </div>
          </div>
          <van-popup
            v-model="showFoodPanelFlag"
            position="bottom"
            closeable
            close-icon="cross"
          >
            <div class="food-panel flex">
              <div class="header flex">
                <img src="../../assets/imgs/food/recommend.webp" alt="">
                <div class="info">
                  <p class="title bold">{{ foodPanel.name }}</p>
                  <p class="select">已选：</p>
                  <p class="price">￥<span class="large">{{ foodPanel.price }}</span></p>
                </div>
              </div>
              <button class="v-button v-button--block v-button--primary bold">选好了</button>
            </div>
          </van-popup>
        </div>
      </div>
      <van-sticky ref="container" :class="`${prefixCls}-order__content`" :offset-top="44">
        <div class="inner-container">
          <!-- 侧边导航 -->
          <van-sidebar :container="container" class="foodMenu-sidebar" v-model="menuActive">
            <van-sidebar-item v-for="(item, i) in foodList" :key="i" :title="item.name" @click="clickToChangeSidebar" />
          </van-sidebar>
          <!-- 食物列表 -->
          <div :container="container" ref="foodList" class="food-list">
            <div class="foodmenu" v-for="(item, index) in foodList" :key="index">
              <p ref="foodMenuItem" class="foodmenu-title">
                <span class="foodmenu-title__tag bold">{{ item.name }}</span>{{ item.description }}
              </p>
              <div class="foodmenu-content">
                <section v-for="(innerItem, i) in item.foods" :key="i" @click.stop="showFoodInfo(innerItem)" class="foodmenu-content__item flex">
                  <div class="img">
                    <img src="../../assets/imgs/food/recommend.webp" alt="">
                    <div class="sign" v-if="innerItem.hotLevel">招牌</div>
                  </div>
                  <div class="content">
                    <h4 class="title text-overflow">{{ innerItem.name }}</h4>
                    <p class="info text-overflow">{{ innerItem.description }}</p>
                    <p class="info">
                      <span class="sale">月售200份</span>
                      <span v-if="innerItem.rate!==0" class="rate">好评率100%</span>
                    </p>
                    <p>
                      <span class="quantity" v-if="innerItem.quantity<10">剩{{ innerItem.quantity}}份</span>
                    </p>
                    <span class="price">￥{{ innerItem.price }}</span>
                    <span v-if="innerItem.quantity" class="add-goods float--right">+</span>
                    <span v-else class="sold-out">已售完</span>
                  </div>
                </section>
              </div>
            </div>
            <!-- 食物详情 -->
            <transition name="popup">
              <div class="foodInfo-popup box" v-if="showFoodInfoPopup">
                <div class="closeFoodInfoPopup" @click="closeFoodInfoPopup">
                  <van-icon name="cross" />
                </div>
                <img src="../../assets/imgs/food/recommend.webp" alt="">
                <div class="text-container">
                  <p class="title text-overflow bold">
                    <span class="sign" v-if="popupFoodInfo.hotLevel">招牌</span>{{ popupFoodInfo.name }}
                  </p>
                  <p class="sale">
                    <span>月售{{ popupFoodInfo.monthSales }}份</span>
                    <span>好评率{{ popupFoodInfo.rate }}%</span>
                  </p>
                  <p class="price-line flex">
                    <span class="price">￥{{ popupFoodInfo.price }}</span>
                    <span class="add-goods">+</span>
                  </p>
                  <p class="description">{{ popupFoodInfo.description }}</p>
                  <p class="price-notice">价格说明<van-icon name="question-o" /></p>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </van-sticky>
      <!-- 购物车 -->
      <div :class="`${prefixCls}-order__footer flex`">
        <div class="shopcar text--center">
          <div class="inner">
            <van-icon name="shopping-cart" />
          </div>
        </div>
        <div class="info">
          <p v-if="noGoods">未选购商品</p>
          <p v-else>已选购n件商品</p>
          <p>另需配送费m元</p>
        </div>
        <button>￥0起送</button>
      </div>
    </div>
    <!-- 评价 -->
    <FoodComment v-else-if="navActive==='comment'"></FoodComment>
    <!-- 商家 -->
    <FoodStore v-else></FoodStore>
  </div>
</template>
<script>
const prefixCls = "food-index";
import { getStoreById } from '../../apis'
import FoodStore from '../../components/FoodStore.vue'
import FoodComment from '../../components/FoodComment.vue'

export default {
  data() {
    return {
      prefixCls,
      showTitleDetial: false, // 显示title弹出层
      couponsList: [ // 优惠券
        { money: 5, text: "无门槛", bgc: '#ffe578' },
        { money: 6, text: "满199可用", bgc: '#fff4f4' },
      ],
      activities: [ // 优惠活动
        {
          iconName: "满减",
          attribute: { 100: 10, 200: 20, 300: 30 },
          description: "满100元减10元，满200元减20元，满300元减30元"
        },
        {
          iconName: "满减",
          attribute: { 100: 10, 200: 20, 300: 30 },
          description: "满100元减10元，满200元减20元，满300元减30元"
        },
        {
          iconName: "满减",
          attribute: { 100: 10, 200: 20, 300: 30 },
          description: "满100元减10元，满200元减20元，满300元减30元"
        },
        {
          iconName: "满减",
          attribute: { 100: 10, 200: 20, 300: 30 },
          description: "满100元减10元，满200元减20元，满300元减30元"
        },
        {
          iconName: "折扣",
          description: "满100元减10元，满200元减20元，满300元减30元"
        },
        {
          iconName: "新客",
          description: "满100元减10元，满200元减20元，满300元减30元"
        },
        { iconName: "特价", description: "特价商品1元起" },
        { iconName: "首单", description: "饿了么新用户首单立减17元" }
      ],
      showcoupons: false, // 显示优惠券
      showDiscount: false, // 显示优惠活动
      navActive: "order", // nav选中项，默认选中“点餐”
      foodList: [], // 从后台获取到的食物菜单
      isNavFixed: false, // 食物菜单是否固定
      menuActive: 0, // 默认选中菜单项
      showFoodInfoPopup: false, // 显示食物详情页
      showFoodPanelFlag: false, // 控制 点击“商家推荐”里的图片 的弹出层
      foodPanel: {}, // “商家推荐”里的图片的弹出层渲染的foodItem
      noGoods: true, // 默认未选中商品
      timer: null,
      scrollTop: 0, // 滚轮滚动距离
      targetHeight: 0, // 目标元素高度
      count: 50, // 计时器
      pace: 0,
      container: null,
      itemHeight: null,
    };
  },
  computed: {},
  components: {
    FoodStore,
    FoodComment,
  },
  watch: {
    count() {
      if (this.count === 0) {
        clearInterval(this.timer);
      }
    }
  },
  methods: {
    backToHome() { // 回到首页
      this.$router.go(-1);
    },
    showTitlePopup() { // 点击商家title，显示详情
      this.showTitleDetial = true;
    },
    showCoupons() { // 显示优惠券详情
      this.showcoupons = true;
    },
    showActivities() { // 弹出优惠活动
      this.showDiscount = true;
    },
    selectRecommendFood(foodList) { // 选出foodList里含有recommend属性的元素
      let recommendFood = [];
      foodList.forEach(item => {
        item.foods.forEach(innerItem => {
          if (innerItem.recommend) {
            recommendFood.push(innerItem);
          }
        })
      })
      return recommendFood;
    },
    showFoodPanel(item) { // 点击“商家推荐”item图片 弹出panel
      this.showFoodPanelFlag = true;
      this.foodPanel = item;
    },
    getTargetHeight(i) { // 获取目标元素高度（距离foodList的高度）
      return this.$refs.foodMenuItem[i].offsetTop;
    },
    clickToChangeSidebar(index) { // 点击改变侧边导航选中项
      clearInterval(this.timer);
      this.count = 50;
      /*
        点击事件：
          点击后，获取到menuActive的index，然后获取scroll，获取目标元素高度target，取两者差距distance = scroll - target
          取步长：pace = distance / 50;
          如果pace > 0 , 说明scroll较大，
            向下滑，if(distance>0) {
                      scroll -= pace;
                      将scroll赋值给滚动条;
                    } else {
                      将target赋值给滚动条;
                    }
          如果pace < 0，说明scroll较小
            向上滑，if(distance<0) {
                      scroll -= pace;
                      将scroll赋值给滚动条;
                    } else {
                      将target赋值给滚动条;
                    }
      */
      // 页面滚动距离 = 元素本身的位置（距离食物列表顶部的高度） + 食物列表（距离document顶部）的高度 - 顶部固定导航的高度
      this.targetHeight = this.getTargetHeight(index); // 获取目标元素高度
      this.scrollTop = this.getScrollTop(); // 获取食物列表滚动高度
      this.pace = (this.targetHeight - this.scrollTop) / 50;
      let that = this;
      if (this.pace > 0) { // 滚动条高度不够，需要向上滚
        that.timer = setInterval(() => {
          that.smoothUp();
          that.count --;
        }, 10);
      } else { // 向下滚
        that.timer = setInterval(() => {
          that.smoothDown();
          that.count --;
        }, 10);
      }
    },
    scrollChangeMenu () { // 滚动改变菜单选项
      /*
          监听滚动：
            遍历菜单，对比目标元素i和滚动条高度，
            如果 scroll >= 元素i.offsetTop，则第i个菜单选中，把i传给menuActive
       */
      this.scrollTop = this.getScrollTop(); // 获取食物列表滚动高度
      let that = this;
      this.foodList.forEach((item, index) => { // 遍历寻找滚动区域对应的目标元素
        that.itemHeight = this.getTargetHeight(index);
        if (that.itemHeight <= that.scrollTop) {
          that.menuActive = index;
        }
      });
    },
    smoothUp() { // 向上滚动（当滚动距离低于目标元素高度）
      if (this.scrollTop < this.targetHeight) {
        this.scrollTop += this.pace;
        this.$refs.foodList.scrollTop = this.scrollTop;
      } else {
        this.$refs.foodList.scrollTop = this.targetHeight;
      }
    },
    smoothDown() { // 向下滚动（当滚动距离高于目标元素高度）
      if (this.scrollTop > this.targetHeight) {
        this.scrollTop += this.pace;
       this.$refs.foodList.scrollTop = this.scrollTop;
      } else {
        this.$refs.foodList.scrollTop = this.targetHeight;
      }
    },
    changeMenuItem(index) { // 改变食物菜单选中项
      this.menuActive = index
    },
    showFoodInfo(foodItem) { // 点击食物菜单，查看详情
      this.popupFoodInfo = foodItem;
      this.showFoodInfoPopup = true;
    },
    closeFoodInfoPopup() { // 关闭食物详情
      this.showFoodInfoPopup = false;
    },
    getScrollTop() { // 获取滚动高度
      return this.$refs.foodList.scrollTop;
    },
  },
  created() {
    getStoreById({
      id: this.$route.params
    }).then(
      res => {
        if (!res.status) {
          console.log('失败');
        }
        this.foodList = res.data;
      },
      err => {
        console.log(err.message || '失败');
      }
    )
  },
  mounted() {
    this.container = this.$refs.container;
    this.$refs.foodList.addEventListener('scroll', this.scrollChangeMenu);
  }
};
</script>
