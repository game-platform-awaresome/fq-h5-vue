<template>
 <div>
    <div class="imgbox usericon">
        <img v-lazy="obj.headImgUrl" alt="">
    </div>
    <div class="username">{{obj.userName}}</div>
    <div class="phone">{{obj.hasSafeMobile ? '已绑定手机号'+tophone(obj.mobile) : '绑定手机以保护您的账号'}}</div>
</div>
</template>

<script type='text/ecmascript-6'>
import fn from 'js/main.js';
 export default {
     props:['obj'],
   data () {
     return {

     }
   },
   components: {

   },
   methods:{
     tophone:function(val){
       return fn.tophone(val);
     }
   }
 }
</script>

<style scoped lang='less'>
@import "../../assets/style/class.less";
@import "../../assets/style/mixin.less";
  .usericon {
    .fimgbox(120px,120px,50%);
    margin: 0 auto;
  }
  .username {
    margin: 20px auto;
    text-align: center;
    color: #333333;
    font-size: 32px;
  }
  .phone {
    text-align: center;
    color: #999999;
    font-size: 24px;
  }
 
</style>
