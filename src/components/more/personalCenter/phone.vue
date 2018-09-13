<template>
 <div class="content">
   <div class="inputs" v-show="!isSuccess">
        <mt-field class="input1" label="手机号" type="tel" :attr="{ maxlength:11}" placeholder="请输入手机号" v-model="phone"></mt-field>
        <mt-field label="验证码" type="number" placeholder="请输入验证码" v-model="captcha">
            <div v-if="getcodeFlag" class="txt1" @click="getCode">获取验证码</div>
            <div v-else class="txt1 disabled">{{time}}s后重发</div>
        </mt-field>
        <mt-field v-if="obj.isThirdPlatUser==1" class="input1" label="密码" type="text"  placeholder="请设置密码" v-model="password"></mt-field>
        <mt-button class="btn" size="large"  :class="btnClass" @click.native="submit">绑定手机</mt-button>
   </div>
   <div class="rnasucc" v-show="isSuccess">
       <img src="../../../assets/img/phones.png" alt="">
       <div class="txt">已绑定&nbsp;&nbsp;{{tophone(phone)}}</div>
   </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import { Field, Button, Toast  } from "mint-ui";
import fn from "js/main.js";

export default {
  data() {
    return {
      phone: "",
      captcha: "",
      password:'',
      getcodeFlag:true,
      time:60,
      obj:null,
      isSuccess:false,
    };
  },
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast
  },
  created:function(){
    this.obj = this.$route.query.obj;
    this.isSuccess = this.obj.hasSafeMobile;
    if(this.obj.hasSafeMobile){
      this.phone = this.obj.mobile;
    }
  },
  computed:{
    btnClass:function(){
      return this.issubmit() ? 'mint-button--primary' : 'mint-button--disabled';
    }
  },
  methods: {
    tophone: function(phone) {
      return fn.tophone(phone);
    },
    issubmit:function(){
      if(this.obj.isThirdPlatUser==1){
        return this.$fn.isMobile(this.phone)&&this.captcha&&this.password;
      }else{
        return this.$fn.isMobile(this.phone)&&this.captcha;
      }
    },
    submit: function() {
      if (this.issubmit()) {
          let data = {
              mobile: this.phone,
              checkCode:this.captcha,
              password:this.password
          };
            this.$fn.fetchData(this.$api.bindMobile,data).then(e=>{
                if(e.code === 1000){
                    // Toast({
                    //     message: '绑定成功',
                    //     position: 'middle',
                    //     duration: 1000
                    // });
                    this.isSuccess = true;
                }
            });
      }
    },
    getCode: function() {
      if (this.$fn.isMobile(this.phone)) {
        // alert('向手机号'+this.phone+'发送验证码');
        let data = {
          type: 3,
          mobile: this.phone
        };
        this.$fn.fetchData(this.$api.sendSmsCode, data).then(e => {
          if (e.code === 1000) {
            this.getcodeFlag = !this.getcodeFlag;
            this.step = 2;
            let i = 60;
            let that = this;
            let time = setInterval(function() {
              if (i < 1) {
                clearInterval(time);
                that.getcodeFlag = !that.getcodeFlag;
                that.time = 60;
              }
              that.time = i;
              i--;
            }, 1000);
          }
        });
      } else {
        Toast({
            message: '手机号错误',
            position: 'middle',
            duration: 1000
        });
      }
    }
  }
};
</script>

<style scoped lang='less'>
@import "../../../assets/style/mixin.less";
.content {
  height: 100%;
  box-sizing: border-box;
  background: @bg1;
  overflow: hidden;
  .inputs {
    .txt1 {
      color: #01a3ff;
      font-size: 28px;
      width: 200px;
      text-align: center;
      border-left: 1px solid #ebebeb;
      &.disabled {
        color: #cccccc;
      }
    }
  }
  .input1 {
    margin-top: 35px;
    border-bottom: 1px solid #ebebeb;
  }
  .btn {
    width: 90%;
    margin: 100px auto 0;
  }
  .rnasucc {
    // display:none;
    img {
      width: 237px;
      height: 262px;
      display: block;
      margin: 80px auto 50px;
    }
    .txt {
      text-align: center;
      font-size: 36px;
      color: #333333;
    }
  }
}
</style>
