<template>
<!-- 游戏专题1 -->
 <div>
    <div class="clearfix mauto head">
      <div class="fl title">{{obj.subjectInfo.name}}</div>
      <div class="fr selectAll" v-if="obj.relGamesInfo.list.length>3"  @click="push('gameList',{'subType':1})">查看全部</div>
    </div>
   <swiper :options="swiperOption" ref="swiper">
    <!-- slides -->
    <swiper-slide v-for="(item,index) in obj.relGamesInfo.list" :key="index" @click.native="push('detail',{'gameId':item.id,'gameName':item.name},index)" >
     <div class="">
      <item1 class="item1" :item="item" :type="{'event':type,'index':index}"></item1>
      <ul class="clearfix">
        <li class="fl" v-for="i in item.base_screen_pic.slice(0,3)">
          <div class="imgbox ">
            <img v-lazy="i" alt="">
          </div>
        </li>
      </ul>
     </div>
    </swiper-slide>
  </swiper>
 </div>
</template>

<script type='text/ecmascript-6'>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import item1 from 'components/item/item1.vue';
import router from 'router';
export default {
  props:  {
    obj:Object,
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
    swiperSlide,
    item1
  },
  created() {},
  computed: {
    swiper() {
      return this.$refs.swiper.swiper;
    }
  },
  methods:{
    push:function(path,query={},index){
      if(path == 'gameList') 
       this.$fn.uploadData("H5WeChatHall_"+this.type+"All_click","公众号大厅-"+this.$fn.getEventDesc(this.type)+"全部");
      if(path == 'detail') 
       this.$fn.uploadData("H5WeChatHall_"+this.type+index+"_detail","公众号大厅-"+this.$fn.getEventDesc(this.type)+index+"详情");
      router.push({path:path,query:query});
    },
  }
};
</script>

<style scoped lang='less'>
@import "../../../assets/style/class.less";
.head{
  height: 35px;
  line-height: 35px;
}
.title {
  color: #333333;
  font-size: 36px;
  font-weight: bold;
}
.intro {
  color: #bbbbbb;
  font-size: 24px;
  width: 360px;
  margin: 10px 0 20px;
  .ellipsis;
}
ul{
  display: flex;
  li{
    flex: 1;
  }
}

.imgbox{
  .fimgbox(100%,360px,10px);
}
.swiper-slide li:nth-of-type(2){
  margin: 0 2.5%;
}
.item1{
  margin:40px 0 30px ;
}
</style>
