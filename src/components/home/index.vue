<template>
 <div class="home" v-if="data.loading">
  <div class="search" @click="push('search')">
    <div class="searchbox">
      <input type="text" placeholder="搜索游戏" class="searchinput">
      <img src="../../assets/img/search.png" class="searchimg" alt="">
    </div>
  </div>
  <!-- 最近在玩 -->
<div class="recegame f1" v-if=" data.res.recPlay.length>0">
  <div class="title">最近在玩</div>
  <swiper :options="swiperOption1" ref="swiper1">
    <swiper-slide v-for="(item,index) in data.res.recPlay" :key="index"><item1 :type="'recPlay'+index" :item="item"></item1></swiper-slide>
  </swiper>
</div>
<!-- 轮播图专题 -->
  <div class="f2" v-if="data.res.focusRecInfo.length>0">
    <ylSwiper1 :obj="data.res.focusRecInfo" :type="'focusRecInfo'" ></ylSwiper1>
  </div>
  <!-- 游戏类别 -->
  <div class="clas">
    <div class="title">游戏类别</div>
    <ul class="clearfix">
      <li class="fl" @click="push('gameLibrary',{type:1},'homeCategory1')"><img src="../../assets/img/role.png" alt="">角色</li>
      <li class="fl" @click="push('gameLibrary',{type:3},'homeCategory3')"><img src="../../assets/img/simulation.png" alt="">模拟</li>
      <li class="fl" @click="push('gameLibrary',{type:4},'homeCategory4')"><img src="../../assets/img/leisure.png" alt="">休闲</li>
      <li class="fl" @click="push('gameLibrary',{type:5},'homeCategory5')"><img src="../../assets/img/place.png" alt="">放置</li>
      <li class="fl" @click="push('gameLibrary',{type:2},'homeCategory2')"><img src="../../assets/img/strategy.png" alt="">策略</li>
    </ul>
  </div>
  <!-- 游戏专题1 -->
  <div class="f3">
    <ylSwiper2 :obj="data.res.iconSubjectInfo" :type="'iconSubjectInfo'"></ylSwiper2>
  </div>
  <!-- 游戏专题2 -->
  <div class="f4" v-if="data.res.imgSubjectInfo.length>0">
    <ylList1 :obj="data.res.imgSubjectInfo"></ylList1>
  </div>

  <!-- 最新游戏 -->
  <div class="f5">
    <ylList2 :obj="data.res.newGames.list" :type="1"></ylList2>
  </div>
   <!-- 最多人玩 -->
  <div class="f6">
    <ylList2 :obj="data.res.hotGames.list" :type="2"></ylList2>
  </div>
  <!-- 查看全部游戏 -->
  <div class="f7" @click="push('gameLibrary',{type:1},'homeAll')">
    <span>查看全部游戏</span><img src="../../assets/img/right.png" alt="">
  </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import item1 from "components/item/item1.vue";
import item2 from "components/item/item2.vue";
import ylSearch from "comm/yl-search.vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";
// 引入轮播图组建
import ylSwiper1 from "comm/swiper/yl-swiper1.vue";
// 引入游戏专题1
import ylSwiper2 from "comm/swiper/yl-swiper2.vue";
// 引入游戏专题2
import ylList1 from "comm/yl-list1.vue";
// 最新游戏、最多游戏
import ylList2 from "comm/yl-list2.vue";

import fn from "js/main.js";
import router from "router";
import api from "service/api.js";
import http from "service/http.js";
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      data: {
        loading: false,
        res: {}
      },
      swiperOption1: {
        notNextTick: true,
        slidesPerView: 1.1,
        centeredSlides: true,
        spaceBetween: "2.666666%"
      }
    };
  },
  components: {
    item1,
    item2,
    ylSearch,
    swiper,
    swiperSlide,
    ylSwiper1,
    ylSwiper2,
    ylList1,
    ylList2,
    [Indicator.name]: Indicator
  },
  methods: {
    pop: function() {
      // alert(1);
    },
    push: function(path, query = {},type="") {
      if(path === 'search') MtaH5.clickStat("eventSearch")
      if(type != '') MtaH5.clickStat(type)
      router.push({ path: path, query: query });
    },
    fetchData: async function() {
      let data = {};
      const res = await http.post(api.homeurl, data);
      // console.log(res.data.data);
      return new Promise(resolve => {
        resolve(res.data.data);
      });
    }
  },
  created() {
    this.data.loading = false;
     Indicator.close();
    Indicator.open();
    this.fetchData().then(e => {
      Indicator.close();
      this.data.res = e;
      this.data.loading = true;
    });
  },
  computed: {
    swiper() {
      return this.$refs.swiper1.swiper, this.$refs.swiper2.swiper;
    }
  }
};
</script>

<style scoped lang='less'>
@import url("../../assets/style/class.less");
@import url("../../assets/style/mixin.less");
.home {
  // height: 2000px;
}
.search {
  padding: 20px 0;
  border-bottom: 1px solid #eeeeee;
}
.searchbox {
  position: relative;
  width: @wauto;
  height: 55px;
  margin: 0px auto;
  .searchimg {
    position: absolute;
    width: 27px;
    height: 27px;
    left: 20px;
    top: 15px;
  }
  .searchinput {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 0px;
    background: #f5f5f5;
    border-radius: 5px;
    text-indent: 60px;
    color: #acaeb2;
    font-size: 26px;
    &:focus {
      // text-indent: 30px;
    }
  }
}
.clas,
.f1,
.f2,
.f3,
.f4,
.f5,
.f6 {
  .bb1;
  padding: 40px 0;
}
.f7 {
  padding: 40px 0;
  text-align: center;
  color: #bbbbbb;
  font-size: 28px;
  img{
    width: 14px;
    height: 24px;
    vertical-align: middle;
    padding-left: 5px;
  }
}
.title {
  color: #333333;
  font-size: 36px;
  font-weight: bold;
  width: @wauto;
  margin: 0 auto;
}
.recegame {
  .swiper-container {
    margin-top: 30px;
  }
  .item {
    width: 100%;
    margin: 0 auto;
  }
}

.clas {
  ul {
    display: flex;
    margin-top: 50px;
  }
  li {
    flex: 1;
    text-align: center;
  }
  img {
    display: block;
    margin: 0px auto 10px;
    width: 70px;
    height: 70px;
  }
  // li:nth-of-type(1) img {
  //   width: 63px;
  //   height: 70px;
  // }
  // li:nth-of-type(2) img {
  //   width: 58px;
  //   height: 54px;
  // }
  // li:nth-of-type(3) img {
  //   width: 52px;
  //   height: 60px;
  // }
  // li:nth-of-type(4) img {
  //   width: 62px;
  //   height: 61px;
  // }
  // li:nth-of-type(5) img {
  //   width: 52px;
  //   height: 61px;
  // }
}
</style>
