<template>
 <div class="content"  v-if="data != null">
   <div class="userbox">
    <ylUsericon @click.native="push('personalCenter')" :obj="data"></ylUsericon>
      <ul class="">
        <li @click="push('voucher')">
          <div><span class="chit">{{data.couponCount}}</span>张</div>
          <div>代金券</div>
          <img v-if="data.hasExpire" src="../../assets/img/icon-expire.png" class="icon-expire"></img>
        </li>
        <li @click="open">
          <div><span class="gold">0</span>个</div>
          <div>金币</div>
        </li>
      </ul>
    </div>
    <ul class="alist">
      <li class="clearfix" @click="open">
        <img class="fl icon" src="../../assets/img/alist-icon1.png" alt="">
        <div class="txt fl">
          <div class="txt1">玩游戏赚钱</div>
          <div class="txt2">完成每日任务攒金币，兑换现金奖励</div>
        </div>
        <img class="right fr" src="../../assets/img/right.png" alt="">
      </li>
       <li class="clearfix" @click="open">
        <img class="fl icon" src="../../assets/img/alist-icon2.png" alt="">
        <div class="txt fl">
          <div class="txt1">推荐有奖</div>
        </div>
        <img class="right fr" src="../../assets/img/right.png" alt="">
        <div class="txt3 fr"><div>5元</div>红包无限领取</div>
      </li>
       <li class="clearfix" @click="openurlW('https://youka.qiyukf.com/client?k=93a4c1e924bc3d18671f85c670bfd176&wp=1&robotShuntSwitch=0','customerService_click','在线客服')">
        <img class="fl icon" src="../../assets/img/alist-icon3.png" alt="">
        <div class="txt fl">
          <div class="txt1">在线客服</div>
        </div>
        <img class="right fr" src="../../assets/img/right.png" alt="">
      </li>
       <li class="clearfix" @click="openurlW('https://qm.qq.com/cgi-bin/qm/qr?k=JHZcFQrBXsriI4u7t9GTX_XqvtMJgCjK','QQ_click','一键加群')">
        <img class="fl icon" src="../../assets/img/alist-icon4.png" alt="">
        <div class="txt fl">
          <div class="txt1">一键加群</div>
        </div>
        <img class="right fr" src="../../assets/img/right.png" alt="">
      </li>
       <li class="clearfix" @click="showEwm">
        <img class="fl icon" src="../../assets/img/alist-icon5.png" alt="">
        <div class="txt fl">
          <div class="txt1">关注微信公众号</div>
        </div>
        <img class="right fr" src="../../assets/img/right.png" alt="">
      </li>
       <li class="clearfix" @click="openurlW('http://read.feihuo.com')" v-if="false">
        <img class="fl icon" src="../../assets/img/alist-icon6.png" alt="">
        <div class="txt fl">
          <div class="txt1">免费小说</div>
        </div>
        <img class="right fr" src="../../assets/img/right.png" alt="">
        <div class="txt3 fr">全网正版小说免费看</div>
      </li>
    </ul>
  <ewmpublic :show="show" @changeShow="changeShow"></ewmpublic>
 </div>
</template>

<script type='text/ecmascript-6'>
import {Toast} from 'mint-ui';
import ylUsericon from "comm/yl-usericon.vue";
import fn from "js/main.js";
import router from "router";
import api from "service/api.js";
import http from "service/http.js";
import ewmpublic from 'comm/ewmpublic';
export default {
  data() {
    return {
      obj: {
        imgsrc: require("img/1.png"),
        name: "fsffsf"
      },
      data: null,
      show:false,
    };
  },
  components: {
    ylUsericon,
    ewmpublic,
    [Toast.name]:Toast
  },
  methods: {
    open:function(){
      Toast('敬请期待');
    },
    changeShow:function(val){
      this.show = val;
    },
    fetchData: async function() {
      let data = {};
      const res = await http.post(api.getUserInfo, data);
      return new Promise(resolve => {
        resolve(res.data.data);
      });
    },
    push: function(path, query = {}) {
      if(path === 'personalCenter') {
        this.$fn.uploadData('H5WeChatHall_user_click','公众号大厅-用户信息');
      }
      router.push({ path: path, query: query });
    },
    openurlW: function(url,event,event_desc){
      if(event){
        this.$fn.uploadData('H5WeChatHall_'+event,'公众号大厅-'+event_desc);
      }
      this.$fn.openurlW(url);
    },
    showEwm: function(){
      this.$fn.uploadData('H5WeChatHall_follow_click','公众号大厅-关注公众号');
      this.show = true;
    }
  },
  created: function() {
    this.fetchData().then(e => {
      // console.log(e);
      this.data = e;
    });
    this.$fn.uploadData('H5WeChatHall_eventMore_visit','公众号大厅-更多页PV');
  }
};
</script>

<style scoped lang='less'>
@import "../../assets/style/class.less";
@import "../../assets/style/mixin.less";
.content {
  min-height: 100%;
  box-sizing: border-box;
  background: @bg1;
}
.userbox {
  padding: 40px 0;
  background: #ffffff;
  ul {
    margin-top: 40px;
    display: flex;
    text-align: center;
    li {
      &:first-child {
        position: relative;
        &::after {
          content: "";
          position: absolute;
          height: 70%;
          border-left: 1px solid #eeeeee;
          right: 0;
          top: 15%;
        }
        .icon-expire {
          position: absolute;
          right: 45px;
          top: -10px;
          width: 91px;
          height: 27px;
        }
      }
      flex: 1;
      div:first-child {
        font-size: 20px;
        color: #999999;
        margin-bottom: 20px;
        span {
          font-size: 56px;
          padding-right: 20px;
          &.chit {
            color: #ff6161;
          }
          &.gold {
            color: #4abdff;
          }
        }
      }
      div:last-child {
        color: #333333;
        font-size: 30px;
      }
    }
  }
}

.alist {
  li {
    background: #ffffff;
    padding: 20px 5%;
    margin-top: 20px;
    &:nth-child(4),
    &:nth-child(5) {
      margin-top: 0;
    }
    &:active {
      background: #f6f6f6;
    }
    .icon {
      width: 56px;
      height: 56px;
      margin-right: 20px;
    }
    .txt1 {
      color: #333333;
      font-size: 32px;
    }
    .txt2 {
      color: #999999;
      font-size: 26px;
    }
    .txt3 {
      color: #999999;
      font-size: 24px;
      margin-right: 40px;
      div {
        display: inline-block;
        color: #ff3c3c;
        font-size: 24px;
      }
    }
    .right {
      width: 14px;
      height: 24px;
    }
    &:first-child {
      .icon {
        width: 107px;
        height: 98px;
        margin-right: 20px;
      }
      .txt1 {
        margin: 10px 0 5px;
      }
      .right {
        margin-top: 38px;
      }
    }
    &:not(:first-child) {
      line-height: 56px;
      .right {
        margin-top: 16px;
      }
    }
  }
}
</style>
