<template>
 <div class="content">
     <div class="f1">
         <!-- <div class="txt1">邀请1位好友</div>
         <div class="txt2">获得<div>500</div>微币</div>
         <div class="txt3">成功邀请好友完成新手任务获得500微币奖励</div> -->
     </div>
     <div class="txt4">您可以通过以下方式邀请</div>
     <img src="../../assets/img/ewm.png" alt="" class="ewm">
     <div class="txt5">面对面邀请</div>
     <div class="txt6">或</div>
     <ul>
        <li>
            <img src="../../assets/img/wechat.png" alt="">
            邀请微信好友
        </li>
        <li>
            <img src="../../assets/img/circle.png" alt="">
            邀请微信好友
        </li>
    </ul>
 </div>
</template>

<script type='text/ecmascript-6'>
 export default {
   data () {
     return {

     }
   },
   components: {

   }
 }
</script>

<style scoped lang='less'>
@import "../../assets/style/mixin.less";
.content{
    height: 100%;
    background: @bg1;
}
.f1{
    width: 100%;
    height: 406px;
    background: url(../../assets/img/invite.png);
    background-size: 100% 100%;
    overflow: hidden;
}
.txt1{
    font-size: 36px;
    text-align: center;
    color:#333333;
    margin-top: 90px;
}
.txt2{
    font-size: 30px;
    color:#999999;
    text-align: center;
    margin: 30px auto;
    div{
        display:inline-block;
        font-size: 45px;
        color:#ff4f4f;
    }
}
.txt3{
    font-size: 26px;
    text-align: center;
    color:#bbbbbb;
}
.txt4{
    font-size: 30px;
    color:#999999;
    text-align: center;
    margin-top: 50px;
}
.ewm{
    display: block;
    width: 268px;
    height: 274px;
    margin: 20px auto;
}
.txt5{
    font-size: 28px;
    color: #333333;
    text-align: center;
}
.txt6{
    font-size: 24px;
    color:#cccccc;
    margin: 40px auto;
    text-align: center;
}

ul{
    display: flex;
}
li{
    flex:1;
    text-align: center;
    font-size: 24px;
    color:#666666;
    img{
        width: 72px;
        height: 72px;
        display: block;
        margin: 0 auto 15px;
    }
}


</style>
