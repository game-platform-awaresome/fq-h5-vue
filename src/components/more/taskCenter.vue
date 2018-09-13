<template>
 <div class="content">
  <div class="top">
    <div class="bg">
      <div class="txt1">我的微币</div>
      <div class="txt2"><div class="num">{{num}}</div>个</div>
      <img src="../../assets/img/exchange-btn.png" class="exchange-btn"></img>
    </div>
  </div>
  <div class="clearfix taskItem1">
    <img class="fl icon" src="../../assets/img/task-icon1.png" alt="">
    <div class="txt fl">
      <div class="txt1">推荐有奖</div>
    </div>
    <img class="right fr" src="../../assets/img/right.png" alt="">
    <div class="txt3 fr"><div>5元</div>红包无限领取</div>
  </div>
  <div class="list">
    <div class="title">新手任务</div>
    <ul>
      <li class="clearfix" bb1="bb1">
        <img src="../../assets/img/task-icon2.png" alt="" class="icon fl">
        <div class="txt fl">
          <div class="txt1">绑定手机号</div>
          <div class="txt2" :class="tasks[0].state">{{txt2(tasks[0].state)}}100微币</div>
        </div>
         <mt-button class="btn fr" :type="tasks[0].state" @click.native="pop" >{{btntxt(tasks[0].state)}}</mt-button>
      </li>
      <li class="clearfix" bb1="bb1">
        <img src="../../assets/img/task-icon3.png" alt="" class="icon fl">
        <div class="txt fl">
          <div class="txt1">完成实名认证</div>
          <div class="txt2" :class="tasks[1].state">{{txt2(tasks[1].state)}}100微币</div>
        </div>
         <mt-button class="btn fr" :type="tasks[1].state" @click.native="pop" >{{btntxt(tasks[1].state)}}</mt-button>
      </li>
      <li class="clearfix" bb1="bb1">
        <img src="../../assets/img/task-icon4.png" alt="" class="icon fl">
        <div class="txt fl">
          <div class="txt1">首次体验任意一款H5游戏</div>
          <div class="txt2" :class="tasks[2].state">{{txt2(tasks[2].state)}}100微币</div>
        </div>
         <mt-button class="btn fr" :type="tasks[2].state" @click.native="pop" >{{btntxt(tasks[2].state)}}</mt-button>
      </li>
      <li class="clearfix">
        <img src="../../assets/img/task-icon5.png" alt="" class="icon fl">
        <div class="txt fl">
          <div class="txt1">首次在手机内充值任意金额</div>
          <div class="txt2" :class="tasks[3].state">{{txt2(tasks[3].state)}}100微币</div>
        </div>
         <mt-button class="btn fr" :type="tasks[3].state" @click.native="pop" >{{btntxt(tasks[3].state)}}</mt-button>
      </li>
    </ul>
  </div>
  <div class="list">
    <div class="title">每日任务</div>
    <ul>
      <li class="clearfix" bb1="bb1">
        <img src="../../assets/img/task-icon6.png" alt="" class="icon fl">
        <div class="txt fl">
          <div class="txt1">每日签到</div>
          <div class="txt2" :class="tasks[4].state">{{txt2(tasks[4].state)}}100微币</div>
        </div>
         <mt-button class="btn fr" :type="tasks[4].state" @click.native="pop" >{{btntxt(tasks[4].state)}}</mt-button>
      </li>
      <li class="clearfix" bb1="bb1">
        <img src="../../assets/img/task-icon7.png" alt="" class="icon fl">
        <div class="txt fl">
          <div class="txt1">登录任意一款H5游戏</div>
          <div class="txt2" :class="tasks[5].state">{{txt2(tasks[5].state)}}100微币</div>
        </div>
         <mt-button class="btn fr" :type="tasks[5].state" @click.native="pop" >{{btntxt(tasks[5].state)}}</mt-button>
      </li>
      <li class="clearfix" bb1="bb1">
        <img src="../../assets/img/task-icon8.png" alt="" class="icon fl">
        <div class="txt fl">
          <div class="txt1">登录任意游戏，分享好友</div>
          <div class="txt2" :class="tasks[6].state">{{txt2(tasks[6].state)}}100微币</div>
        </div>
         <mt-button class="btn fr" :type="tasks[6].state" @click.native="pop" >{{btntxt(tasks[6].state)}}</mt-button>
      </li>
      <li class="clearfix">
        <img src="../../assets/img/task-icon9.png" alt="" class="icon fl">
        <div class="txt fl">
          <div class="txt1">在游戏内充值任意金额</div>
          <div class="txt2" :class="tasks[7].state">{{txt2(tasks[7].state)}}100微币</div>
        </div>
        <mt-button class="btn fr" :type="tasks[7].state" @click.native="pop(7)" >{{btntxt(tasks[7].state)}}</mt-button>
      </li>
    </ul>
  </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import {Button,MessageBox ,Toast  } from 'mint-ui';
 export default {
   data () {
     return {
       num:20000,
       tasks:[
         {
           state:'default'
         },
         {
           state:'danger'
         },
         {
           state:'primary'
         },
         {
           state:'default'
         },
         {
           state:'danger'
         },
         {
           state:'primary'
         },
         {
           state:'default'
         },
         {
           state:'danger'
         }
       ]
     }
   },
   components: {
     [Button.name]:Button,
   },
   methods:{
     btntxt:function(val){
       if(val == 'default'){
         return '前往';
       }else if(val === 'danger'){
         return '已领';
       }else{
         return '领取';
       }
     },
     txt2:function(val){
       if(val == 'default'){
         return '可获得';
       }else if(val === 'danger'){
         return '已领取';
       }else{
         return '已完成可获得';
       }
     },
     pop:function(val){
       this.tasks[val].state = 'danger'
     }
   }
 }
</script>

<style scoped lang='less'>
@import '../../assets/style/mixin.less';
.content{
  background: @bg1;
  height: 100%;
}
.top{
  background: #ffffff;
  padding: 30px 0;
  .bg{
    margin: 0 auto;
    padding-left: 40px;
    width: 674px;
    height: 314px;
    background: url(../../assets/img/taskf1.png);
    background-size: 100% 100%;
    overflow: hidden;
  }
  .txt1{
    color:#ffffff;
    font-size: 30px;
    margin-top: 40px;
  }
  .txt2{
    color: #ffffff;
    font-size: 30px;
    .num{
      display: inline-block;
      padding-right: 20px;
      font-weight: bold;
      font-size: 92px;
    }
  }
  .exchange-btn{
    width: 187px;
    height: 93px;
  }
}
.taskItem1{
  background: #ffffff;
  padding: 20px 5%;
  margin-top: 20px;
  line-height: 56px;
  &:active{
    background: #f6f6f6;
  }
  .icon{
    width: 56px;
    height: 56px;
    margin-right: 20px;
  }
  .txt1{
    color:#333333;
    font-size: 32px;
  }
  .txt3{
    color: #999999;
    font-size: 24px;
    margin-right: 40px;
    div{
      display: inline-block;
      color:#ff3c3c;
      font-size: 24px;
    }
  }
  .right{
    width: 14px;
    height: 24px;
    margin-top: 16px;
  }
}

.list{
  margin-top: 20px;
  padding: 0 5%;
  background: #ffffff;
}
.title{
  font-size: 36px;
  color: #333333;
  line-height: 90px;
  font-weight: bold;
}
ul{
  li{
    padding: 20px 0;
    &:active{
      background: #f6f6f6;
    }
    &[bb1="bb1"] {
      position: relative;
      &::before {
        position: absolute;
        content: "";
        width: 560px;
        right: 0;
        bottom: 0;
        border-top: 1px solid #ebebeb;
      }
    }
  }
  .icon{
    width: 96px;
    height: 96px;
    margin-right: 20px;
  }
  .txt1{
    color:#333333;
    font-size: 32px;
    margin-bottom: 10px;
  }
  .txt2{
    color:#999999;
    font-size: 26px;
    &.primary{
      color:#ff2b2b;
    }
  }
  .btn{
    margin-top: 18px;
  }
}

 
</style>
