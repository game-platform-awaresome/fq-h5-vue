<template>
 <div class="box" v-if="data">
   <!-- <keep-alive>
     <router-view class="child-view view" v-if="$route.meta.keepAlive"></router-view>
   </keep-alive>
   <router-view class="child-view view" v-if="!$route.meta.keepAlive"></router-view> -->
   <router-view class="child-view view"></router-view>
    
    <div class="tab">
        <router-link @click.native="tab(0)" to="/home">
        <img v-show="img1" src="../assets/img/game-acitve.png" alt="">
        <img v-show="!img1" src="../assets/img/game.png" alt="">        
        游戏
        </router-link>
        <router-link @click.native="tab(1)" to="/found" v-if="data.hasDiscovery">
        <img v-show="img2" src="../assets/img/found-active.png" alt="">
        <img v-show="!img2" src="../assets/img/found.png" alt="">  
        发现
        </router-link>
        <router-link @click.native="tab(2)" to="/more">
        <img v-show="img3" src="../assets/img/class-active.png" alt="">
        <img v-show="!img3" src="../assets/img/class.png" alt="">  
        更多
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
      data:null,
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
    })
  },
  mounted: function() {
      let lhis = this;
    this.$nextTick(function() {
      lhis.tab($(".tab a.active").index());
      // 监听返回事件.
      window.addEventListener("popstate", (e) =>{ 
        lhis.tab($(".tab a.active").index());
      }, false);
    });
  },
  updated: function () {
    this.$nextTick(function() {
      this.tab($(".tab a.active").index());
    });
  },
  methods:{
      tab:function(val){
          switch (val) {
          case 0:
                this.img1=true;
                this.img2=false;
                this.img3=false;
                MtaH5.clickStat("eventHome")
            break;
          case 1:
                this.img1=false;
                this.img2=true;
                this.img3=false;
                MtaH5.clickStat("eventFound")
            break;
          case 2:
              MtaH5.clickStat("eventMore")
              if(this.$store.state.isLogin){
                this.img1=false;
                this.img2=false;
                this.img3=true;
              }
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
  height: 100%;
}
.view{
  padding-bottom: 98px;
}
.tab {
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  height: 98px;
  padding: 10px 0;
  border-top: 1px solid #eeeeee;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  text-align: center;
  overflow: hidden;
  background: #ffffff;
  a {
    flex: 1;
    color: #535459;
    font-size: 21px;
    &.active {
      color: #47adff;
    }
  }
  img {
    width: 42px;
    height: 42px;
    display: block;
    margin: 5px auto;
  }
  a:first-child img {
    width: 52px;
    height: 38px;
  }
}
</style>
