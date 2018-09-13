<template>
 <div class="txt1">
     <div class="name">{{obj.name}}</div>
     <div class="intro">{{obj.base_ext.ext_game_desc}}</div>
 </div>
</template>

<script type='text/ecmascript-6'>
 export default {
     props:['obj'],
   data () {
     return {

     }
   },
   components: {

   }
 }
</script>

<style scoped lang='less'>
    @import '../../assets/style/class.less';
    @import '../../assets/style/mixin.less';
    .txt1{
        width: 360px;
    }
    .name{
        margin-bottom: 10px;
        color:#333333;
        font-size: 34px;
    }
    .intro{
        color:#bbbbbb;
        font-size: 24px;
        .ellipsis;
    }
 
</style>
