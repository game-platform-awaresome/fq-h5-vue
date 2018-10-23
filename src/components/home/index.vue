<template>
 <div class="home" v-if="data.loading">
  <div class="search" @click="push('search',{},{'event':'eventSearch_click','event_desc':'游戏搜索点击'})">
    <div class="searchbox">
      <input type="text" :placeholder="$store.state.searchAdvText" class="searchinput">
      <img src="../../assets/img/search.png" class="searchimg" alt="">
    </div>
  </div>
  <!-- 最近在玩 -->
<div class="recegame f1" v-if=" data.res.recPlay.length>0">
  <div class="title">最近在玩</div>
  <swiper :options="swiperOption1" ref="swiper1">
    <swiper-slide v-for="(item,index) in data.res.recPlay" :key="index"><item1 :type="{'event':'recPlay','index':index}" :item="item"></item1></swiper-slide>
  </swiper>
</div>
<!-- 游戏类别 -->
<div class="clas">
  <!-- <div class="title">游戏类别</div> -->
  <ul class="clearfix">
    <li class="fl" @click="push('gameLibrary',{type:1},{'event':'homeCategory1','event_desc':'角色扮演分类'})"><img src="../../assets/img/role.png" alt="">角色</li>
    <li class="fl" @click="push('gameLibrary',{type:3},{'event':'homeCategory3','event_desc':'模拟经营分类'})"><img src="../../assets/img/simulation.png" alt="">模拟</li>
    <li class="fl" @click="push('gameLibrary',{type:4},{'event':'homeCategory4','event_desc':'休闲竞技分类'})"><img src="../../assets/img/leisure.png" alt="">休闲</li>
    <li class="fl" @click="push('gameLibrary',{type:5},{'event':'homeCategory5','event_desc':'放置挂机分类'})"><img src="../../assets/img/place.png" alt="">放置</li>
    <li class="fl" @click="push('gameLibrary',{type:2},{'event':'homeCategory2','event_desc':'战争策略分类'})"><img src="../../assets/img/strategy.png" alt="">策略</li>
  </ul>
</div>

<!-- 飞火资讯 -->
<div class="information" @click="push('inforList',{'type':'5|6|26|27','dateFormat':'Y-m-d'},{'event':'information_click','event_desc':'资讯点击'})" v-if="data.res.news">
  <img src="../../assets/img/feihuoInformation.png" alt="">
  <swiper :options="swiperOption2" ref="swiper2">
    <swiper-slide v-for="(item,index) in data.res.news" :key="index">
      {{item.title}}
    </swiper-slide>
  </swiper>
</div>

 <!-- 最多人玩 -->
  <div class="f6">
    <ylList2 :obj="data.res.hotGames.list" :type="2"></ylList2>
  </div>
<!-- 轮播图专题 -->
  <div class="f2" v-if="data.res.focusRecInfo.length>0">
    <ylSwiper1 :obj="data.res.focusRecInfo" :type="'focusRecInfo'" ></ylSwiper1>
  </div>
   <!-- 最新游戏 -->
  <div class="f5">
    <ylList2 :obj="data.res.newGames.list" :type="1"></ylList2>
  </div>

  <!-- 游戏专题1 -->
  <div class="f3" v-if="data.res.iconSubjectInfo.hasOwnProperty('relGamesInfo')">
    <ylSwiper2 :obj="data.res.iconSubjectInfo" :type="'iconSubjectInfo'"></ylSwiper2>
  </div>
  <!-- 游戏专题2 -->
  <div class="f4" v-if="data.res.imgSubjectInfo.hasOwnProperty('relGamesInfo')">
    <ylList1 :obj="data.res.imgSubjectInfo" :type="'gamesInfo'" ></ylList1>
  </div>
  
  <!-- 查看全部游戏 -->
  <div class="f7" @click="push('gameLibrary',{type:1},{'event':'homeAll','event_desc':'查看全部游戏'})">
    <span>查看全部游戏</span><img src="../../assets/img/right.png" alt="">
  </div>
  <div class="f8">本站游戏适合18周岁以上人士进入</div>
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
      },
      swiperOption2: {
        direction: "vertical",
        slidesPerView: 2,
        slidesPerGroup :2,
        loop: true,
        autoplay:true,
        // autoplay:{
        //   delay:3000
        // }
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
    push: function(path, query = {},type=null) {
      if(type){
        this.$fn.uploadData("H5WeChatHall_"+type.event,"公众号大厅-"+type.event_desc);
      }
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
    this.$fn.uploadData('H5WeChatHall_eventHome_visit','公众号大厅-游戏页PV');//数据埋点，游戏页 展示量
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
.information,
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
    // margin-top: 50px;
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
.f8{
  padding:0 0 40px 0;
  text-align: center;
  font-size: 24px;
  color:#dddddd;
}
.information{
  height: 79px;
  display: flex;
  padding: 40px 5%;
  img{
    width: 79px;
    height: 72px;
    margin-right: 20px;
  }
  .swiper-container{
    flex:1;
  }
  .swiper-slide{
    .ellipsis;
    color: #555555;
    font-size: 28px;
  }
}
</style>
