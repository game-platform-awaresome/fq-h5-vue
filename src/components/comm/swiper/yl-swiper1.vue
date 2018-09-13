<template>
<!-- 轮播图组建 -->
 <div>
   <swiper :options="swiperOption" ref="swiper">
    <!-- slides -->
    <swiper-slide v-for="(item,index) in obj" :key="index" @click.native="openUrlW(item.outreach_url,1,index)">
     <div class="">
        <div class="title">{{item.recomment_title}}</div>
        <div class="intro">{{item.recomment_introduce}}</div>
     </div>
      <div class="imgbox">
        <img v-lazy="item.recomment_picture" alt="">
    </div>
    </swiper-slide>
  </swiper>
 </div>
</template>

<script type='text/ecmascript-6'>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import fn from "js/main.js";
export default {
  props: {
    obj:Array,
    type:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      swiperOption: {
        notNextTick: true,
        slidesPerView:1.1,
        centeredSlides:true,
        spaceBetween:'2.666666%',
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  created() {},
  computed: {
    swiper() {
      return this.$refs.swiper.swiper;
    }
  },
  methods:{
    openUrlW:function(url,type,index){
      if(this.type!=='') MtaH5.clickStat(this.type+index)
      fn.openurlW(url,type);
    }
  }
};
</script>

<style scoped lang='less'>
@import "../../../assets/style/class.less";
@import "../../../assets/style/mixin.less";
.mauto{
  width: @wauto;
  margin: 0 auto;
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
.imgbox{
  .fimgbox(100%,320px,20px);
}
</style>
