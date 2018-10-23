<template>
<!-- 开服页 文字组建 -->
 <div class="txt1">
     <div class="name">{{obj.gname}}</div>
     <div class="area">{{obj.sname}}</div>
     <div class="time">{{obj.open_time_text}}</div>
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
        color:#333333;
        font-size: 34px;
    }
    .area{
        margin: 5px 0;
        color:#999999;
        font-size: 24px;
        .ellipsis;
    }
    .time{
        color: #bbbbbb;
        font-size: 24px;
        .ellipsis;
    }
 
</style>
