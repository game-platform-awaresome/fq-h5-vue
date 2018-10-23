<template>
 <div class="item clearfix" @click="push('detail',{'gameId':item.id,'gameName':item.name})">
     <icon100 class="icon fl" :imgsrc="item.base_logo_pic.fhd_img"></icon100>
     <txt1 class="txt fl" :obj="item"></txt1>
     <mt-button class="btn fl" type="primary" @click.stop="pop(item.id)" >开始</mt-button>
 </div>
</template>

<script type='text/ecmascript-6'>
import icon100 from 'components/item/icon100.vue';
import txt1 from 'components/item/txt1.vue';
import {Button } from 'mint-ui';
import fn from 'js/main.js';
import router from 'router';
export default {
   props:{
        item:Object,
        type:{
            type: Object,
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
    icon100
  },
  created(){
  },
  methods:{
      pop:function(val){
           if(this.type) 
           this.$fn.uploadData("H5WeChatHall_"+this.type.event+this.type.index+"_start","公众号大厅-"+this.$fn.getEventDesc(this.type.event)+this.type.index+"开始");
           fn.openurlW(this.$fn.goGameUrl+"?gameId="+val,1);
      },
      push:function(path,query={}){
           if(this.type) 
           this.$fn.uploadData("H5WeChatHall_"+this.type.event+this.type.index+"_detail","公众号大厅-"+this.$fn.getEventDesc(this.type.event)+this.type.index+"详情");
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
    margin: 5px 20px 0 20px;
}
.btn{
    margin-top: 30px;
}
</style>
