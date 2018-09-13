<template>
 <div class="content">
     <div class="phonenum" v-if="step === 1">
         <img class="logo" src="../../../assets/img/logo.png"></img>
         <div class="txt1">输入手机号</div>
         <div class="ipt1 clearfix">
             <span class="fl">+86</span>
             <input type="number" v-model="phone" class="fl" @blur="clearShow1 = false;" @focus=" phone != '' && (clearShow1 = true)" maxlength="11" autofocus>
             <img v-if="clearShow1"  class="clear fr" @click="clear(1)" src="../../../assets/img/x.png"></img>
         </div>
         <div class="error"></div>
         <mt-button class="btn1" :class="btn1 ? 'mint-button--primary' : 'mint-button--disabled' " @click="getCode" size="large" >获取验证码</mt-button>
         <div class="txt3">注册即代表您已阅读并同意<div class="col1" @click="$fn.openurlW('http://www.feihuo.com/service/faq')">注册协议</div></div>
     </div>
     <div class="yzm" v-if="step === 2">
         <div class="txt1">输入短信验证码</div>
         <div class="txt2">短信验证码发送至<div class="phone">{{phone}}</div></div>
         <security-code class="code" v-model="authCode"></security-code>
         <div class="error"></div>
         <mt-button class="btn1" :class="btn2 ? 'mint-button--primary' : 'mint-button--disabled' " size="large" @click="next" >下一步</mt-button>
         <div class="txt3">
             <div v-if="time != 0">{{time}}s后重发</div>
             <div v-else class="col1" @click="getCode">重新发送</div>
        </div>
     </div>
     <div class="setpass" v-if="step === 3">
         <div class="txt1">设置密码</div>
         <div class="txt2">即将使用手机号<div class="phone">{{phone}}</div>注册飞火账号</div>
         <div class="ipt2 clearfix">
             <input type="text" v-model="pass" @blur="clearShow2 = false;" @focus=" pass != '' && (clearShow2 = true)" placeholder="请设置密码" class="fl" >
             <img v-if="clearShow2" class="clear fr" @click="clear(2)" src="../../../assets/img/x.png"></img>
         </div>
         <div class="error"></div>
         <mt-button class="btn1" :class="btn3 ? 'mint-button--primary' : 'mint-button--disabled' " size="large" @click="submit" >提交注册</mt-button>
     </div>
     <div class="success" v-if="step === 4">
         <img  src="../../../assets/img/register-success.png" alt="">
         <div class="txt1">注册成功</div>
         <div class="txt2">您已用手机号{{phone}}成功注册飞火账号</div>
         <mt-button class="btn1" type="primary" size="large" @click.native="push">进入飞火游戏</mt-button>
     </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import {Button,Toast} from 'mint-ui';
import securityCode from '../security-code.vue';
 export default {
   data () {
     return {
         btn1:false,
         btn2:false,
         btn3:false,
         phone:'',
         authCode:'',
         pass:'',
         time:0,
         clearShow1:false,
         clearShow2:false,
         step:1,
         error:'',
         uniqueId:'',
         timeIn:null
     }
   },
   components: {
       [Button.name]:Button,
       securityCode,
       [Toast.name]:Toast,
   },
   mounted:function(){
       this.$nextTick(function(){
           $(".ipt1 input").focus();
       })
   },
   methods:{
       clear:function(val){
           val === 1 ? this.phone = '' : this.pass = '';
       },
       getCode:function(){
           if(this.btn1 && this.$fn.isMobile(this.phone) && this.time === 0){
                let data = {
                    type:2,
                    mobile:this.phone
                }
                this.$fn.fetchData(this.$api.sendSmsCode,data).then(e=>{
                    if(e.code === 1000){
                        this.time = 60;
                        this.uniqueId = e.data.uniqueId;
                        this.step = 2;
                        let i = 60;
                        let that = this;
                        this.timeIn = setInterval(function(){
                            if(i < 1){
                                clearInterval(that.timeIn);
                            }
                            that.time = i;
                            i--;
                        },1000);
                    }
                });
           }
           if(this.btn1 && !this.$fn.isMobile(this.phone)){
               this.error = '请输入正确的手机号';
               Toast('请输入正确的手机号');
           }
       },
       next:function(){
           if(this.btn2){
                // alert('下一步');
                this.step = 3;
           }
       },
       submit:function(){
           if(this.btn3){
                // alert('提交');
                let data = {
                    type:1,
                    checkCode:this.authCode,
                    mobile:this.phone,
                    password:this.pass,
                    uniqueId:this.uniqueId
                }
                this.$fn.fetchData(this.$api.register,data).then(e=>{
                    // console.log(e);
                    if(e.code === 1000){
                        this.step = 4;
                    }else if(e.code === 1006 && e.msg === '验证码不正确'){
                        clearInterval(this.timeIn);
                        this.time = 0;
                        this.authCode = '';
                        this.step = 2;
                    }
                })
           }
       },
       push:function(){
           this.$router.push({path:'/home',query:{}});
        //    location.reload();
       }
   },
   watch:{
       phone:function(val,oldval){
           this.error = '';
           val.length > 0 ? this.clearShow1=true:this.clearShow1=false;
           if(val.length >= 11){
               this.btn1 = true;
               this.phone = val.substring(0,11);
           }else{
               this.btn1 = false;
           }
       },
       authCode:function(val,oldval){
           this.error = '';
           if(val.length >= 6){
               this.btn2 = true;
           }else{
               this.btn2 = false;
           }
       },
       pass:function(val,oldval){
           this.error = '';
            val.length > 0 ? this.clearShow2=true:this.clearShow2=false;
           if(val.length >= 6 && val.length <= 20){
               this.btn3 = true;
           }else{
               this.btn3 = false;
           }
       }
   }
 }
</script>

<style scoped lang='less'>
.error{
    margin-top: 20px;
    height: 40px;
    font-size: 28px;
    color:#ff8080;
}
.btn1{
    margin-top: 100px;
}
.txt3{
    margin-top: 20px;
    text-align: center;
    font-size: 28px;
    color:#999999;
    div{
        display: inline-block;
    }
    .col1{
        display: inline-block;
        color:#47adff;
    }
}
.phonenum{
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
    .logo{
        display: block;
        width: 257px;
        height: 90px;
        margin: 70px auto 90px;
    }
    .txt1{
        color:#333333;
        font-size: 42px;
        margin-bottom: 90px;
    }
    .ipt1{
        width: 100%;
        border-bottom:1px solid #000000;
        line-height: 100px;
        height: 100px;
        span{
            color: #999999;
            font-size: 42px;
            margin:0  40px 0 40px;
        }
        input{
            height: 100px;
            width: 400px;
            background:none;    
            outline:none;    
            border:0px;  
            color: #999999;
            font-size: 42px;
            &:focus{
                color:#333333;
            }
            &::-webkit-input-placeholder{
                color: #cccccc;
            }
            &:empty{
                color: #333333;
            }
        }
        .clear{
            width: 22px;
            height: 22px;
            margin-top: 39px;
            margin-right: 10px;
            // display: none;
        }
    }
}

.yzm{
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
    .txt1{
        color:#333333;
        font-size: 42px;
        margin-top: 100px;
    }
    .txt2{
        color:#999999;
        font-size: 28px;
        .phone{
            display: inline-block;
        }
    }
    .code{
        margin: 130px auto 20px;
    }
}
.setpass{
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
    .txt1{
        color:#333333;
        font-size: 42px;
        margin-top: 100px;
    }
    .txt2{
        color:#999999;
        font-size: 28px;
        .phone{
            display: inline-block;
        }
    }
    .code{
        margin: 130px auto 20px;
    }
    .ipt2{
        margin-top: 150px;
        width: 100%;
        border-bottom:1px solid #000000;
        line-height: 100px;
        height: 100px;
        input{
            height: 100px;
            width: 600px;
            background:none;    
            outline:none;    
            border:0px;  
            color: #cccccc;
            font-size: 36px;
            text-indent: 30px;
            &:focus{
                color:#333333;
            }
            &::-webkit-input-placeholder{
                color: #cccccc;
            }
            &:empty{
                color: #333333;
            }
        }
        .clear{
            width: 22px;
            height: 22px;
            margin-top: 39px;
            margin-right: 10px;
            // display: none;
        }
    }
}
.success{
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
    img{
        display: block;
        margin: 80px auto 50px;
        width: 186px;
        height: 142px;
    }
    .txt1{
        color:#333333;
        font-size: 42px;
        text-align: center;
    }
    .txt2{
        color:#999999;
        font-size: 28px;
        text-align: center;
        margin: 20px auto 200px;
    }
}
 
</style>
