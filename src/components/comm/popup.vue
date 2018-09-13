<template>
 <div class="pop-content">
   <div class="pop-mask" @click="hide"></div>
   <div class="pop-pop">
     <div class="txt1"><span></span>登录以继续<span></span></div>
     <ul>
       <li @click="login(1)">
         <img src="../../assets/img/qq.png" alt="">
         QQ登录
       </li>
       <li @click="login(2)">
         <img v-show="isWeiXin" class="recommend" src="../../assets/img/wechatrecomm.png" alt="">
         <img src="../../assets/img/wechat.png" alt="">
         微信登录
       </li>
       <li @click="gologin">
         <img src="../../assets/img/feihuologo.png" alt="">
         飞火登录
       </li>
     </ul>
     <div v-if="isWeiXin" class="txt3">检测到微信内打开，推荐使用微信一键登录</div>
     <div class="txt4">没有账号？<div class="txt2" @click="goregister">去注册</div></div>
    
   </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import fn from "js/main.js";
import api from "service/api.js";
import http from "service/http.js";
export default {
  props: ["show"],
  data() {
    return {
      isWeiXin: false,
    };
  },
  components: {},
  methods: {
    hide: function() {
      this.$store.commit("changeshow");
    },
    goregister: function() {
      this.$store.commit("changeshow");
      this.$router.push("register");
    },
    gologin: function() {
      this.$store.commit("changeshow");
      this.$router.push("login");
    },
    fetchData: async function(url, data) {
      const res = await http.post(url, data);
      return new Promise(resolve => {
        resolve(res.data.data);
      });
    },
    login: function(type) {
      fn.login(type);
    }
  },
  watch: {
    show: function(a, b) {
      if (a) {
        $(".pop-content").show();
        $(".pop-mask").show();
        $(".pop-mask").animate(
          {
            opacity: 0.6
          },
          300,
          "easeOutCubic"
        );
        $(".pop-pop").animate(
          {
            bottom: 0
          },
          300,
          "easeOutCubic"
        );
      } else {
        $(".pop-mask").animate(
          {
            opacity: 0
          },
          300,
          "easeOutCubic"
        );
        $(".pop-pop").animate(
          {
            bottom: '-6.6666666rem'
          },
          300,
          "easeOutCubic",
          function() {
            $(".pop-content").hide();
          }
        );
      }
    }
  },
  created: function() {
    this.$nextTick(function() {
      this.isWeiXin = fn.isWeiXin();
    });
  }
};
</script>

<style scoped lang='less'>
.iframe {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
}
.pop-content {
  height: 100%;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  display: none;
  .pop-mask {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #000000;
    opacity: 0;
  }
  .pop-pop {
    position: absolute;
    left: 0;
    bottom: -500px;
    width: 100%;
    height: 500px;
    background: #ffffff;
    overflow: hidden;
    .txt1 {
      text-align: center;
      margin: 35px auto 90px;
      color: #999999;
      font-size: 30px;
      position: relative;
      span {
        width: 185px;
        height: 1px;
        background: #ebebeb;
        position: absolute;
        top: 50%;
        &:first-child {
          left: 10%;
        }
        &:last-child {
          right: 10%;
        }
      }
    }
    ul {
      display: flex;
      li {
        flex: 1;
        text-align: center;
        position: relative;
        img {
          display: block;
          margin: 0 auto 20px;
          width: 100px;
          height: 100px;
        }
        .recommend {
          width: 55px;
          height: 31px;
          position: absolute;
          top: -25px;
          right: 45px;
        }
      }
    }
    .txt4{
      font-size: 30px;
      margin-top: 40px;
      text-align: center;
      color: #cccccc;
    }
    .txt2 {
      display: inline-block;
      color: #01a3ff;
      text-decoration: underline;
    }
    .txt3 {
      margin-top: 50px;
      text-align: center;
      font-size: 24px;
      color: #cccccc;
    }
  }
}
</style>
