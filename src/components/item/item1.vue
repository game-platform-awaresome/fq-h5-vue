<template>
 <div class="item clearfix" @click.stop="push('/detail',{'gameId':item.id,'gameName':item.name})">
    <div class="fl">
        <icon120 class="icon fl" :imgsrc="item.base_logo_pic.fhd_img"></icon120>
        <txt1 class="txt fl" :obj="item"></txt1>
    </div>
        <mt-button class="btn fr" type="primary" @click.stop="open(item.id)">开始</mt-button>
     
 </div>
</template>

<script type='text/ecmascript-6'>
import icon120 from 'components/item/icon120.vue';
import txt1 from 'components/item/txt1.vue';
import {Button } from 'mint-ui';
import fn from 'js/main.js';
import router from 'router';
export default {
    props:{
        item:Object,
        type:{
            type:Object,
            default:null
        }
    },
  data() {
    return {

    };
  },
  components: {
    [Button .name]:Button,
    txt1,
    icon120
  },
  created(){
  },
  methods:{
      open:function(val){
          if(this.type) {
              if(this.type.event === 'infoRecommend'){
                this.$fn.uploadData("H5WeChatHall_"+this.type.event+this.item.slug+"_start","公众号大厅-资讯游戏推荐"+this.item.name+"开始");
              }else{
                this.$fn.uploadData("H5WeChatHall_"+this.type.event+this.type.index+"_start","公众号大厅-"+this.$fn.getEventDesc(this.type.event)+this.type.index+"开始");
              }
          }
          
          fn.openurlW(this.$fn.goGameUrl+"?gameId="+val,1);
      },
      hasKey:function(obj,key){
          return obj.hasOwnProperty(key) ? obj.key : '';
      },
      push:function(path,query={}){
          if(this.type) {
              if(this.type.event === 'infoRecommend'){
                this.$fn.uploadData("H5WeChatHall_"+this.type.event+this.item.slug+"_detail","公众号大厅-资讯游戏推荐"+this.item.name+"详情");
              }else{
               this.$fn.uploadData("H5WeChatHall_"+this.type.event+this.type.index+"_detail","公众号大厅-"+this.$fn.getEventDesc(this.type.event)+this.type.index+"详情");
              }
          }
          router.push({path:path,query:query});
      }
  }
};
</script>

<style scoped lang='less'>
.item{
}
.icon{
}
.txt{
    margin: 15px 0 0  20px;
}
.btn{
    margin-top: 40px;
}
</style>
