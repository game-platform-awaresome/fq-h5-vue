<template>
 <div class="content">
   <img src="../../../assets/img/logo.png" alt="" class="logo">
   <div class="account" v-if="loginType">
       <div class="ipt1 clearfix">
            <input type="text input1" v-model="account" @blur="clearShow1 = false;" @focus=" account != '' && (clearShow1 = true)" placeholder="手机号/邮箱/个性账号" class="fl" autofocus>
            <img v-if="clearShow1" class="clear fr" @click="clear(1)" src="../../../assets/img/x.png"></img>
        </div>
        <div class="ipt1 clearfix">
          <input :type="eyes ? 'text' : 'password'" v-model="password" @blur="clearShow2 = false;" @focus=" password != '' && (clearShow2 = true)" placeholder="密码" class="fl" >
          <img v-if="!eyes" class="eyes fr" @click="eyes = !eyes" src="../../../assets/img/hidden.png"></img>
          <img v-if="eyes" class="eyes fr" @click="eyes = !eyes" src="../../../assets/img/show.png"></img>
        </div>
        <div class="error"></div>
        <mt-button class="btn1" @click.native="plogin" :class="btn1.account&&btn1.password ? 'mint-button--primary' : 'mint-button--disabled' " size="large" >登录</mt-button>
        <div class="txt1">如您忘记密码，可使用<div @click="loginType = !loginType">短信快捷登录</div></div>
        <div class="txt2">第三方登录</div>
        <ul>
          <li @click="thirdLogin(1)">
            <img src="../../../assets/img/qq.png" alt="">
            QQ登录
          </li>
          <li @click="thirdLogin(2)">
            <img src="../../../assets/img/wechat.png" alt="">
            微信登录
          </li>
        </ul>
   </div>
   <div class="phone" v-if="!loginType">
     <div class="ipt1 clearfix">
            <input type="tel" v-model="phone" @blur="clearShow3 = false;" @focus=" phone != '' && (clearShow3 = true)" placeholder="手机号" class="fl" maxlength="11" autofocus>
            <img v-if="clearShow3" class="clear fr" @click="clear(3)" src="../../../assets/img/x.png"></img>
        </div>
        <mt-field class="ipt1 yzminput" placeholder="请输入验证码" type="number" v-model="captcha">
            <div v-if="getcodeFlag" class="getcode" @click="getCode">获取验证码</div>
            <div v-else class="getcode disabled">{{time}}s后重发</div>
        </mt-field>
        <div class="error"></div>
        <mt-button class="btn1" :class="btn2.phone&&btn2.captcha ? 'mint-button--primary' : 'mint-button--disabled' " size="large" @click.native="slogin">登录</mt-button>
        <div class="txt1">返回<div @click="loginType = !loginType">普通登录</div></div>
   </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import { Field,Button,Toast } from 'mint-ui';
import router from 'router'
import fn from "js/main.js";
import api from 'service/api.js';
import http from 'service/http.js';
export default {
  data() {
    return {
      error1:'',
      error2:'',
      eyes:false,
      account:'',
      password:'',
      clearShow1:false,
      clearShow2:false,
      clearShow3:false,
      loginType:true,
      btn1:{
        account:false,
        password:false
      },
      btn2:{
        phone:false,
        captcha:false
      },
      phone:'',
      captcha:'',
      returnUrl: this.$fn.domain+'/home',
      getcodeFlag:true,
      time:60,
      checkCodeKey:'',
    };
  },
  components: {
    [Field.name]:Field,
    [Button.name]:Button,
    [Toast.name]:Toast,
  },
  created:function(){
    // console.log(encodeURI(this.$store.state.currentPath))
  },
  mounted:function(){
    this.$nextTick(function(){
      $(".input").focus();
    })
  },
  methods:{
    clear:function(val){
      switch(val){
        case 1:
          this.account = '';
          break;
        case 3:
          this.phone = '';
          break;
      }
    },
    getCode:function(){
      if(this.$fn.isMobile(this.phone)){
        // alert('向手机号'+this.phone+'发送验证码');
        let data = {
            type:1,
            mobile:this.phone
        }
        this.$fn.fetchData(this.$api.sendSmsCode,data).then(e=>{
            if(e.code === 1000){
              this.getcodeFlag = !this.getcodeFlag;
              this.checkCodeKey = e.data.checkCodeKey;
              this.step = 2;
              let i = 60;
              let that = this;
              let time = setInterval(function(){
                  if(i < 1){
                      clearInterval(time);
                      that.getcodeFlag = !that.getcodeFlag;
                  }
                  that.time = i;
                  i--;
              },1000);
          }
        });
      }else{
        this.error2 = '手机号错误';
        Toast('手机号错误');
      }
    },
    thirdLogin:function(type){
      this.$store.commit('setCurrentPath',this.returnUrl);
      fn.login(type);
    },
    plogin:function(){
      if(this.btn1.account&&this.btn1.password){
        let data = {
          username:this.account,
          password:this.password,
          returnUrl:encodeURI(this.$store.state.currentPath)
        }
        fn.fetchData(api.login,data).then(e=>{
          if(e.code === 1000){
            this.$store.commit('setLogin',true);
            location.href = e.data.returnUrl;
            // location.reload();
          }else{
            this.error1 = e.msg;
            Toast(e.msg);
          }
        })
      }
    },
    slogin:function(){
      if(this.btn2.phone&&this.btn2.captcha){
        let data = {
          type:2,
          mobile:this.phone,
          checkCode:this.captcha,
          checkCodeKey:this.checkCodeKey,
          returnUrl:encodeURI(this.$store.state.currentPath)
        }
        fn.fetchData(api.login,data).then(e=>{
          if(e.code === 1000){
            this.$store.commit('setLogin',true);
            location.href = e.data.returnUrl;
            // location.reload();
          }else{
            this.error1 = e.msg;
            Toast(e.msg);
          }
        })
      }
    }
  },
  watch:{
    account:function(val,oldval){
      this.error1 = '';
      if(val.length > 0){
        this.btn1.account = true;
        this.clearShow1=true;
      }else{
        this.btn1.account = false;
        this.clearShow1=false;
      }
    },
    password:function(val,oldval){
      this.error1 = '';
      if(val.length > 0){
        this.btn1.password = true;
        this.clearShow2=true;
      }else{
        this.btn1.password = false;
        this.clearShow2=false;
      }
    },
    phone:function(val,oldval){
      this.error2 = '';
      if(val.length > 0){
        this.btn2.phone = true;
        this.clearShow3=true;
      }else{
        this.btn2.phone = false;
        this.clearShow3=false;
      }
    },
    captcha:function(val,oldval){
      this.error2 = '';
      if(val.length > 0){
        this.btn2.captcha = true;
      }else{
        this.btn2.captcha = false;
      }
    }
  }
}
</script>

<style scoped lang='less'>
.content {
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
  .logo {
    display: block;
    width: 257px;
    height: 90px;
    margin: 50px auto;
  }
  .error{
    margin-top: 20px;
    height: 40px;
    font-size: 28px;
    color:#ff8080;
  }
  .btn1{
    margin-top: 60px;
  }
  .txt1{
    margin-top: 20px;
    text-align: center;
    font-size: 28px;
    color:#999999;
    div{
        display: inline-block;
        color:#47adff;
    }
  }
  .txt2{
    text-align: center;
    color:#cccccc;
    font-size: 24px;
    margin-top: 150px;
  }
  ul{
    width: 500px;
    margin: 50px auto 0;
    display:flex;
    li{
      flex:1;
      text-align: center;
      position: relative;
      color: #666666;
      font-size: 24px;
      img{
        display: block;
        margin: 0 auto 20px;
        width: 72px;
        height: 72px;
      }
      .recommend{
        width: 55px;
        height: 31px;
        position:absolute;
        top:-25px;
        right:45px;
      }
    }
  }
  .ipt1 {
    margin-top: 30px;
    width: 100%;
    border-bottom: 1px solid #ebebeb;
    line-height: 100px;
    height: 100px;
    input {
      text-indent:30px;
      height: 100px;
      width: 600px;
      background: none;
      outline: none;
      border: 0px;
      color: #cccccc;
      font-size: 36px;
      &:focus {
        color: #333333;
      }
      &::-webkit-input-placeholder {
        color: #cccccc;
      }
      &:empty{
        color: #333333;
      }
    }
    .clear {
      width: 22px;
      height: 22px;
      margin-top: 39px;
      margin-right: 10px;
      // display: none;
    }
  }
  .eyes{
    margin-top: 40px;
    width: 32px;
    height: 20px;
  }
  .account {
    overflow: hidden;
  }
  .phone{
    overflow: hidden;
    .getcode{
      color:#01a3ff;
      font-size: 28px;
      width: 200px;
      text-align: center;
      border-left:1px solid #ebebeb;
      &.disabled{
          color:#cccccc;
      }
    }
  }
}
</style>
