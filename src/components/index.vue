<template>
 <div class="box" v-if="data">
   <!-- <keep-alive>
     <router-view class="child-view view" v-if="$route.meta.keepAlive"></router-view>
   </keep-alive>
   <router-view class="child-view view" v-if="!$route.meta.keepAlive"></router-view> -->
  <div class="scrollBox">
     <router-view class="child-view view"></router-view>
  </div>
    
    <div class="tab">
        <router-link @click.native="tab(0)" to="/home">
        <i></i>
        <!-- <img v-show="img1" src="../assets/img/game-acitve.png" alt=""> -->
        <!-- <img v-show="!img1" src="../assets/img/game.png" alt="">         -->
        <span>游戏</span>
        </router-link>
        <router-link @click.native="tab(1)" to="/found" v-show="data.hasDiscovery">
        <i></i>
        <!-- <img v-show="img2" src="../assets/img/found-active.png" alt=""> -->
        <!-- <img v-show="!img2" src="../assets/img/found.png" alt="">   -->
        <span>发现</span>
        </router-link>
        <router-link @click.native="tab(2)" to="/openService" v-if="1">
        <i></i>
        <span>开服</span>
        </router-link>
        <router-link @click.native="tab(3)" to="/more">
        <i></i>
        <!-- <img v-show="img3" src="../assets/img/class-active.png" alt=""> -->
        <!-- <img v-show="!img3" src="../assets/img/class.png" alt="">   -->
        <span>更多</span>
        </router-link>
    </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import api from '../service/api.js';
import http from '../service/http.js';
export default {
  data() {
    return {
      data:'',
      img1:true,
      img2:false,
      img3:false,
    };
  },
  components: {},
  created:function(){
      this.$fn.fetchData(api.getSpecialSign,{sign:'isLogin-hasDiscovery'}).then(e=>{
        this.data = e.data;
        this.$store.commit('setLogin',this.data.isLogin);
      });
  },
  mounted: function() {
    //   let lhis = this;
    // this.$nextTick(function() {
    //   lhis.tab($(".tab a.active").index());
    //   // 监听返回事件.
    //   window.addEventListener("popstate", (e) =>{ 
    //     lhis.tab($(".tab a.active").index());
    //   }, false);
    // });
  },
  updated: function () {
    // this.$nextTick(function() {
    //   this.tab($(".tab a.active").index());
    // });
  },
  methods:{
      tab:function(val){
          switch (val) {
          case 0:
                // this.img1=true;
                // this.img2=false;
                // this.img3=false;
                this.$fn.uploadData('H5WeChatHall_eventHome_click','公众号大厅-游戏tab点击');
            break;
          case 1:
                // this.img1=false;
                // this.img2=true;
                // this.img3=false;
                this.$fn.uploadData('H5WeChatHall_eventFound_click','公众号大厅-发现tab点击');
            break;
          case 2:
              this.$fn.uploadData('H5WeChatHall_eventServer_click','公众号大厅-开服tab点击');
              // if(this.$store.state.isLogin){
              //   this.img1=false;
              //   this.img2=false;
              //   this.img3=true;
              // }
            break;
          case 3:
            this.$fn.uploadData('H5WeChatHall_eventMore_click','公众号大厅-更多tab点击');
            break;
          default:
            break;
        }
      }
  }
};
</script>

<style scoped lang='less'>
.box{
  position: relative;
  height: 100%;
  overflow: hidden;
  padding-bottom: 98px;
  box-sizing: border-box;
}
.scrollBox{
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling : touch;
  
}
.view{
  
}
.tab {
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  height: 98px;
  padding: 10px 0;
  border-top: 1px solid #eeeeee;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: #ffffff;
  a {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    i{
      width: 56px;
      height: 56px;
    }
    &:nth-child(1){
      i{
        background: url("../assets/img/game.png") no-repeat;
        background-size: cover;
      }
      &.active{
        i{
          background: url("../assets/img/game-acitve.png") no-repeat;
          background-size: cover;
        }
      }
    }
    &:nth-child(2){
      i{
        background: url("../assets/img/found.png") no-repeat;
        background-size: cover;
      }
      &.active{
        i{
          background: url("../assets/img/found-active.png") no-repeat;
         background-size: cover;
        }
      }
    }
    &:nth-child(3){
      i{
        background: url("../assets/img/openService.png") no-repeat;
        background-size: cover;
      }
      &.active{
        i{
          background: url("../assets/img/openService-active.png") no-repeat;
         background-size: cover;
        }
      }
    }
    &:nth-child(4){
      i{
        background: url("../assets/img/class.png") no-repeat;
        background-size: cover;
      }
      &.active{
        i{
          background: url("../assets/img/class-active.png") no-repeat;
          background-size: cover;
        }
      }
    }
    span{
      color: #535459;
      height: 100%;
      font-size: 21px;
      // margin-top: 5px;
    }
    &.active {
      span{
        color: #47adff;
      }
    }
  }
  // img {
  //   width: 42px;
  //   height: 42px;
  //   display: block;
  //   margin: 5px auto;
  // }
  // a:first-child img {
  //   width: 52px;
  //   height: 38px;
  // }
}
</style>
