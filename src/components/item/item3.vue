<template>
<!-- 开服页面 item -->
 <div class="item clearfix" @click.stop="push('/detail',{'gameId':item.game_id,'gameName':item.gname})">
    <div class="fl">
        <icon120 class="icon fl" :imgsrc="item.base_logo_pic.fhd_img"></icon120>
        <txt2 class="txt fl" :obj="item"></txt2>
    </div>
        <mt-button class="btn fr" :class="type.event == '1' ? 'mint-button--primary' : 'mint-button--disabled' " @click.stop="type.event == '1' ? open(item.game_id) : '' ">{{type.event == '1' ? '开始' : '未开服' }}</mt-button>
     
 </div>
</template>

<script type='text/ecmascript-6'>
import icon120 from 'components/item/icon120.vue';
import txt2 from 'components/item/txt2.vue';
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
    txt2,
    icon120
  },
  created(){
  },
  methods:{
      open:function(val){
          if(this.type) {
              if(this.type.event == 1){
                  this.$fn.uploadData("H5WeChatHall_newServer"+this.type.index+"_start","公众号大厅-火爆新服"+this.type.index+"开始");
              }else{
                  this.$fn.uploadData("H5WeChatHall_openServer"+this.type.index+"_start","公众号大厅-即将新服"+this.type.index+"开始");
              }
          } 
          fn.openurlW(this.$fn.goGameUrl+"?gameId="+val,1);
      },
      hasKey:function(obj,key){
          return obj.hasOwnProperty(key) ? obj.key : '';
      },
      push:function(path,query={}){
         if(this.type) {
              if(this.type.event == 1){
                  this.$fn.uploadData("H5WeChatHall_newServer"+this.type.index+"_detail","公众号大厅-火爆新服"+this.type.index+"详情");
              }else{
                  this.$fn.uploadData("H5WeChatHall_openServer"+this.type.index+"_detail","公众号大厅-即将新服"+this.type.index+"详情");
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
    margin: 0 0 0  20px;
}
.btn{
    margin-top: 40px;
}
</style>
