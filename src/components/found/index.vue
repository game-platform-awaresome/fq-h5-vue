<template>
 <div class="found" v-if="data.loading">
   <div class="found-content">
      <swiper :options="swiperOption" ref="swiper">
      <!-- slides -->
      <swiper-slide v-for="(item,index) in data.res" :key="index" @click.native="open(item.outreach_url,index)">
      <div class="top">
          <div class="title">{{item.recomment_title}}</div>
          <div class="intro">{{item.recomment_introduce}}</div>
      </div>
      <div class="imgbox">
          <img v-lazy="item.recomment_picture" alt="">
      </div>
      </swiper-slide>
    </swiper>
  </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import { Indicator } from 'mint-ui';
import { swiper, swiperSlide } from "vue-awesome-swiper";
 export default {
   data () {
     return {
       data:{
         loading:false,
         res:null,
       },
       swiperOption: {
        notNextTick: true,
        slidesPerView:1.1,
        centeredSlides:true,
        spaceBetween:'2.666666%',
      }
     }
   },
   components: {
     swiper,
    swiperSlide,
    [Indicator.name]:Indicator,
   },
   created(){
     let data = {
       recommendId:139
     }
     this.data.loading = false;
     Indicator.close();
      Indicator.open();
     this.$fn.fetchData(this.$api.getRecommendInfo,data).then(e=>{
       Indicator.close();
       this.data.res = e.data;
       this.data.loading = true;
     });
   },
  computed: {
    swiper() {
      return this.$refs.swiper.swiper;
    }
  },
  methods:{
    open(val,index){
       MtaH5.clickStat("eventRecommend"+index)
      this.$fn.openurlW(val);
    }
  }
 }
</script>

<style scoped lang='less'>
@import "../../assets/style/class.less";
@import "../../assets/style/mixin.less";
.imgbox{
  .fimgbox(100%,800px,0px);
  border-radius: 0 0 20px 20px;
}
.found{
  height: 100%;
  box-sizing: border-box;
}
.found-content{
  height: 100%;
  position: relative;
}
.title {
  color: #333333;
  font-size: 36px;
  font-weight: bold;
}
.intro {
  color: #bbbbbb;
  font-size: 24px;
  width: 90%;
  margin: 10px 0 20px;
  .ellipsis;
}
.swiper-container {
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  overflow: visible;
}
.swiper-slide{
  border-radius: 20px;
  box-shadow:0px 0px 30px #c8c8c8;
}
.title{
  font-size: 50px;
  color: #333333;
  font-weight: bold;
}
.intro{
  font-size: 30px;
  color: #999999;
}
.top{
  margin: 40px 0 40px 30px;
}
 
</style>
