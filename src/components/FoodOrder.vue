<template>
  <div :class="prefixCls">
      <!-- 推荐商家 -->
      <div :class="`${prefixCls}-recommend`">
        <h4 :class="`${prefixCls}-recommend__title`">商家推荐</h4>
        <div :class="`${prefixCls}-recommend__content`">
          <div class="recommend-item" v-for="(item, index) in selectRecommendFood(foodList)" :key="index">
            <div class="recommend-item__inner" v-if="item.recommend">
              <img @click="showFoodPanel(item)" src="../assets/imgs/food/recommend.webp" />
              <div @click="showFoodInfo(item)">
                <p class="food-title text-overflow">{{ item.name }}</p>
                <p class="small">月售{{ item.monthSales }} 好评率{{ item.rate }}%</p>
                <div class="footer flex">
                  <p class="price">￥<span class="large">{{ item.price }}</span></p>
                  <div
                    @click.stop=""
                    v-if="item.quantity"
                    :class="['add-goods', item.count===0 ? 'noGoods' : '']">
                    <van-stepper
                      v-model="item.count"
                      :min="0"
                      :max="item.quantity"
                      @plus="addFoods(item)"
                      @minus="minusFoods(item)"
                    />
                  </div>
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
                <img src="../assets/imgs/food/recommend.webp" alt="">
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
      <!-- 食物列表 -->
      <van-sticky ref="container" :class="`${prefixCls}-content`" :offset-top="44">
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
                    <img src="../assets/imgs/food/recommend.webp" alt="">
                    <div class="sign" v-if="innerItem.hotLevel">招牌</div>
                  </div>
                  <div class="content">
                    <h4 class="title text-overflow">{{ innerItem.name }}</h4>
                    <p class="info text-overflow">{{ innerItem.description }}</p>
                    <p class="info">
                      <span class="sale">月售200份</span>
                      <span v-if="innerItem.rate" class="rate">好评率100%</span>
                    </p>
                    <p>
                      <span class="quantity" v-if="innerItem.quantity<10">剩{{ innerItem.quantity}}份</span>
                    </p>
                    <span class="price">￥{{ innerItem.price }}</span>
                    <div
                      @click.stop=""
                      v-if="innerItem.quantity"
                      :class="['add-goods', innerItem.count===0 ? 'noGoods' : '']">
                      <van-stepper
                        v-model="innerItem.count"
                        :min="0"
                        :max="innerItem.quantity"
                        @plus="addFoods(innerItem)"
                        @minus="minusFoods(innerItem)"
                      />
                    </div>
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
                <img src="../assets/imgs/food/recommend.webp" alt="">
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
                    <van-stepper
                      v-model="popupFoodInfo.count"
                      :min="0"
                      v-if="popupFoodInfo.quantity"
                      :max="popupFoodInfo.quantity"
                      :class="['add-goods', popupFoodInfo.count===0 ? 'noGoods' : '']"
                      @plus="addFoods(popupFoodInfo)"
                      @minus="minusFoods(popupFoodInfo)"
                    />
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
      <div :class="`${prefixCls}-footer`">
        <div @click="showCarPopup" :class="`${prefixCls}-footer__discount-tip text--center`" v-if="allFoodCount">
          已减去{{ totalPrice - payMoney }}元
        </div>
        <van-action-sheet v-model="shopCarList" :round="false" @click-overlay="closeCarPopup" :close-on-click-overlay="true" :lock-scroll="false">
          <p class="header">已选商品
            <span class="float--right small" @click.stop="clearAllFoods">
              <van-icon name="delete" />清空
            </span>
          </p>
          <ul class="food-list">
            <li v-for="(item, index) in allSelectFoods" :key="index" :class="[item.count ? '' : 'display-none', 'item']">
              <span class="name text-overflow">{{ item.name }}</span>
              <span class="price bold">￥{{ item.price * item.count }}</span>
              <van-stepper
                v-model="item.count"
                :min="0"
                :max="item.quantity"
                class="add-goods"
                @plus="addFoods(item)"
                @minus="minusFoods(item)"
              />
            </li>
          </ul>
        </van-action-sheet>
        <div @click="showCarPopup" :class="`${prefixCls}-footer__bottomNav flex`">
          <div class="shopcar  text--center">
            <div :class="['inner', allFoodCount===0 ? '' : 'hasfood']">
              <van-icon name="shopping-cart" />
            </div>
            <van-tag round type="danger" :class="allFoodCount===0 ? 'display-none' : ''">{{allFoodCount}}</van-tag>
          </div>
          <div class="info">
            <p v-if="allFoodCount===0">未选购商品</p>
            <p class="total-price" v-else>￥{{payMoney}}<span class="line-through">￥{{ totalPrice }}</span></p>
            <p class="send-price">另需配送费2.5元</p>
          </div>
          <div class="button">
            <button v-if="allFoodCount===0" class="noGoods">￥0起送</button>
            <button v-else class="settlement">去结算</button>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
const prefixCls = 'foodOrder-index';
export default {
  data() {
    return {
      prefixCls,
      isNavFixed: false, // 食物菜单是否固定
      menuActive: 0, // 默认选中菜单项
      showFoodInfoPopup: false, // 显示食物详情页
      showFoodPanelFlag: false, // 控制 点击“商家推荐”里的图片 的弹出层
      foodPanel: {}, // “商家推荐”里的图片的弹出层渲染的foodItem
      timer: null,
      scrollTop: 0, // 滚轮滚动距离
      targetHeight: 0, // 目标元素高度
      count: 50, // 计时器
      pace: 0,
      container: null,
      itemHeight: null,
      allFoodCount: 0, // 所有选中的食物数量
      totalPrice: 0, // 所选食物总价
      payMoney: 0, // 满减后需付的总价
      shopCarList: false, // 弹出购物车清单
      allSelectFoods: [],
    };
  },
  props: ['foodListFromFood', 'reduceActivities'],
  computed: {
    foodList() {
      this.foodListFromFood.map(item => {
        item.foods.map(innerItem => {
          innerItem.count = 0;
          return innerItem;
        })
      });
      return this.foodListFromFood;
    },
  },
  watch: {
    count() {
      if (this.count === 0) {
        clearInterval(this.timer);
      }
    },
    totalPrice() { // 总价改变，检查是否符合满减条件
      if (this.reduceActivities) {
        let obj = this.reduceActivities.attribute;
        Object.keys(obj).forEach(key => {
          if (this.totalPrice > key) {
            this.payMoney = this.totalPrice - obj[key];
          }
        })
      }
    },
  },
  methods: {
    showFoodPanel(item) { // 点击“商家推荐”item图片 弹出panel
      this.showFoodPanelFlag = true;
      this.foodPanel = item;
    },
    getTargetHeight(i) { // 获取目标元素高度（距离foodList的高度）
      return this.$refs.foodMenuItem[i].offsetTop - 8;
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
    addFoods(item) { // 添加商品
      item.count ++;
      this.totalPrice += item.price;
      this.allFoodCount ++;
      if (this.allSelectFoods.length) { // 如果购物车不为空
        let flag = this.allSelectFoods.some(food => { // 查看之前是否添加过该商品
          if (food._id === item._id) {
            return true;
          }
        })
        if (!flag) { // 如果没有添加，则添加
          this.allSelectFoods.push(item);
        }
      } else { // 如果购物车为空，添加该商品
        this.allSelectFoods.push(item);
      }
    },
    minusFoods(item) { // 去掉商品
      if (this.allFoodCount > 0) {
        item.count --;
        this.totalPrice -= item.price;
        this.allFoodCount --;
      }
    },
    showCarPopup() {
      if (this.allFoodCount) {
        this.shopCarList = !this.shopCarList;
      }
    },
    clearAllFoods() {
      this.foodList.map(item => {
        item.foods.map(innerItem => {
          innerItem.count = 0;
          return innerItem;
        })
      })
      this.shopCarList = false;
      this.allSelectFoods = [];
      this.allFoodCount = 0;
    },
    closeCarPopup() {
      this.shopCarList = false;
    },
  },
  created() {
    // console.log('------', this.reduceActivities);
  },
  mounted() {
    this.container = this.$refs.container;
    this.$refs.foodList.addEventListener('scroll', this.scrollChangeMenu);
  },
}
</script>
