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
            type:String,
            default:''
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
           if(this.type!=='') MtaH5.clickStat(this.type+"start")
           fn.openurlW(this.$fn.goGameUrl+"?gameId="+val,1);
      },
      push:function(path,query={}){
           if(this.type!=='') MtaH5.clickStat(this.type+"detail")
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
