<template>
 <div class="detail" v-if="data"> 
   <div class="f1">
        <div class="imgbox1">
            <img v-lazy="data.gameInfo.base_logo_pic.fhd_img" alt="">
        </div>
        <div class="name">{{data.gameInfo.name}}</div>
        <div class="intro">{{data.gameInfo.base_ext.ext_game_desc}}</div>
        <swiper :options="swiperOption" ref="swiper">
        <!-- slides -->
            <swiper-slide v-for="(item,index) in data.gameInfo.base_screen_pic" :key="index">
                <div class="imgbox2">
                    <img v-lazy="item" alt="">
                </div>
            </swiper-slide>
        </swiper>
   </div>
    <div class="f2" v-if="intro" >
        <div class="title mauto">游戏简介</div>
        <div class="intro mauto" v-html="intro"></div>
        <div class="more mauto" v-if="ellipsis" @click="ell">更多</div>
    </div>
    <div class="f3" v-if="data.giftList.list.length > 0">
        <div class="title mauto">礼包</div>
        <ul class="mauto">
            <li class="clearfix" v-for="(gift,index) in data.giftList.list">
                <div class="fl">
                    <div class="gift-type">{{gift.name}}</div>
                    <div class="gift-intro">{{gift.content}}</div>
                </div>
                <mt-button class="btn fr" type="default" @click.native="pop(gift.id,data.gameInfo.id,gift.type,gift.code,index)" > {{ gift.code ? '查看' : '领取'}}</mt-button>
            </li>
        </ul>
    </div>
    <div class="f4" v-if="data.articleList.length > 0">
        <div class="mauto clearfix">
            <div class="title fl"> 相关文章</div>
            <div class="selectAll fr" @click="push('inforList',{'type':'5|6','dateFormat':'Y-m-d','gameId':data.gameInfo.id})">查看全部</div>
        </div>
         
            <ul class="mauto">
                <li class="clearfix" v-for="(item,index) in data.articleList" @click="push('inforDetail',{'articleId':item.article_id})" >
                    <div class="fl">
                        <div class="fl type">[{{item.type_name}}]&nbsp;&nbsp;</div>
                        <div class="fl intro">{{item.title}}</div>
                    </div>
                    <div class="fr time">{{item.create_date}}</div>
                </li>
            </ul>
    </div>
    <div class="f5">
        <div class="mauto title">游戏信息</div>
        <ul class="mauto">
            <li class="clearfix">
                <div class="fl">游戏类型</div>
                <div class="fr">{{data.gameInfo.category_name}}</div>
            </li>
             <li class="clearfix">
                <div class="fl">游戏版号</div>
                <div class="fr">{{data.gameInfo.base_ext.ext_version_num}}</div>
            </li>
             <li class="clearfix">
                <div class="fl">备案号</div>
                <div class="fr">{{data.gameInfo.base_ext.ext_record_num}}</div>
            </li>
        </ul>
    </div>
    <div class="f6 mauto">
        <mt-button class="btn" type="primary" size="large" @click.native="open(data.gameInfo.id)" >进入游戏</mt-button>
    </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import {Button,MessageBox ,Toast  } from 'mint-ui';
import fn from "js/main.js";
import router from 'router';
import api from 'service/api.js';
import http from 'service/http.js';
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween:'2.666666%',
      },
      intro:'',
      ellipsis:false,
      data:null,
      message:'',
    };
  },
  components: {
    swiper,
    swiperSlide,
    [Button .name]:Button,
    [MessageBox .name]:MessageBox,
    [Toast .name]:Toast,
  },
  created:function(){
      let gameId = this.$route.query.gameId;
      document.title = this.$route.query.gameName;
      this.$fn.fetchData(api.getGameInfo,{'gameId':gameId}).then(e=>{
            this.data = e.data;
            this.intro = fn.removeHTMLTag(this.data.gameInfo.desc);
            if(this.intro.length <= 89){
                this.ellipsis = false;
            }else{
                this.ellipsis = true;
                this.intro = fn.ellipsis(89, this.intro);
            }
      });
  },
  computed: {
    swiper() {
      return this.$refs.swiper.swiper;
    }
  },
  mounted: function() {
  },
    methods:{
        push:function(path,query={}){
            router.push({path:path,query:query});
        },
        ell:function(){
            this.intro = this.data.gameInfo.desc;
            this.ellipsis = false;
        },
        pop: async function(gift_id,game_id,gift_type,gift_code,index){
            // console.log(gift_code,index)
            if(!this.data.giftList.isLogin){
                // console.log(location.href)
                this.$store.commit('setCurrentPath',location.href);
                this.$store.commit('changeshow');
            }else if(!gift_code){
               await this.fetchData(api.getGiftCode,{'gift_id':gift_id,'game_id':game_id,'gift_type':gift_type}).then(e=>{
                //    console.log(e);
                   if(e){
                        this.message = e.code;
                        this.data.giftList.list[index].code = e.code;
                        this.$set(this.data.giftList.list,index,this.data.giftList.list[index]);
                        MessageBox.confirm('',{
                            title: '礼包码',
                            message: `<div>${this.message}</div><div class="gift_code_instructions"><p>使用说明：</p><p>1.复制礼包码至游戏内兑换；2.一个礼包领取码只能兑换一次；3.同一账号只能领取一次同种礼包；4.礼包需在礼包有效期内兑换。</p></div>`,
                            showCancelButton: true,
                            confirmButtonText:"复制",
                            cancelButtonText:"关闭"
                        }).then(action => {
                            this.doCopy();
                        }).catch(err=>{
                        });
                    } 
                });
            }else{
                this.message = gift_code;
                    MessageBox.confirm('',{
                    title: '礼包码',
                    message: `<div>${this.message}</div><div class="gift_code_instructions"><p>使用说明：</p><p>1.复制礼包码至游戏内兑换；2.一个礼包领取码只能兑换一次；3.同一账号只能领取一次同种礼包；4.礼包需在礼包有效期内兑换。</p></div>`,
                    showCancelButton: true,
                    confirmButtonText:"复制",
                    cancelButtonText:"关闭"
                }).then(action => {
                    this.doCopy();
                }).catch(err=>{
                });
            }
            
        },
        open:function(val){
            fn.openurlW(this.$fn.goGameUrl+"?gameId="+val,1);
        },
        doCopy: function () {
            this.$copyText(this.message).then(function (e) {
                Toast('礼包码已复制');
            }, function (e) {
                Toast('礼包码复制失败');
            });
        },
        fetchData:async function(url,data){
            const res = await  http.ajax(url,data);
            // console.log(res);
            return new Promise((resolve)=>{
                resolve(res.data.data);
            });
        }
    }
};
</script>

<style scoped lang='less'>
@import "../../assets/style/class.less";
@import "../../assets/style/mixin.less";
.detail{
    padding-bottom: 141px;
}
.f1,
.f2,
.f3,
.f4,
.f5 {
  .bb1;
  padding: 40px 0;
}
.title {
  font-size: 36px;
  color: #333333;
  font-weight: bold;
  padding-bottom: 20px;
}
.f1 {
  .imgbox1 {
    .fimgbox(140px,140px,20px);
    margin: 0 auto 40px;
  }
  .name {
    text-align: center;
    font-size: 36px;
    color: #333333;
  }
  .intro {
    .ellipsis;
    width: 520px;
    font-size: 28px;
    color: #bbbbbb;
    margin: 0 auto;
    text-align: center;
  }
  .swiper-container {
    padding-top: 40px;
    padding-left: 5%;
  }
  .swiper-slide {
    width: 30% !important;
    box-sizing: border-box;
    &:last-child {
      margin-right: 0;
    }
  }
  .imgbox2 {
    .fimgbox(100%,360px,10px);
  }
}
.f2 {
  .intro {
    color: #999999;
    font-size: 30px;
  }
  .more {
    text-align: right;
    color: #47adff;
    font-size: 26px;
  }
}
.f3{
    li{
        margin-bottom: 30px;
        &:last-child{
            margin-bottom: 0;
        }
    }
    .gift-type{
        color: #333333;
        font-size: 30px;
        margin-bottom: 10px;
    }
    .gift-intro{
        color:#bbbbbb;
        font-size: 26px;
        .ellipsis;
        width: 500px;
    }
    .btn{
        margin-top: 18px;
    }
}
.f4{
    padding-bottom: 0;
    .title{
        padding-bottom: 0;
    }
    li{
        line-height: 100px;
        .bb1b;
        &:last-child::before{
            display: none;
        }
        
    }
    .type{
        color:#333333;
        font-size: 30px;
    }
    .intro{
        color:#bbbbbb;
        font-size: 30px;
        .ellipsis;
        width: 420px;
    }
    .time{
        color:#bbbbbb;
        font-size: 30px;
    }
}
.f5{
    padding-bottom: 0;
    .title{
        padding-bottom: 0;
    }
    li{
        line-height: 100px;
        .bb1b;
         &:last-child::before{
            display: none;
        }
          .fl{
            color: #999999;
        }
        .fr{
            color:#333333;
        }
    }
}
.f6{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 5%;
    border-top:1px solid #ebebeb;
    box-sizing: border-box;
    background: #ffffff;
}
</style>
