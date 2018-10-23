<template>
  <div id="app">
    <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>  
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/> -->
    <router-view/>
    <popup :show="$store.state.isShow"></popup>
    <pop1 :show.sync="show" :recommmendData="recommmendData"></pop1>
  </div>
</template>

<script>
import popup from "comm/popup.vue";
import pop1 from "comm/pop1.vue";
export default {
  name: 'App',
   components: {
       popup,
       pop1
   },
   data(){
     return {
       show:false,
       recommmendData:null
     }
   },
   created(){
     this.$nextTick(function(){
        let data = {
          recType:500
        };
        this.$fn.fetchData(this.$api.getRecommend,data).then((e)=>{
          if(e.data.length > 0 && this.$fn.getCookie('h5FeihuoRecommend500') !== e.data[0].sign){//是否初次加载首页推荐
            this.recommmendData = e.data[0];
            this.show = true;
            this.$fn.setCookie('h5FeihuoRecommend500',e.data[0].sign,1000);
            this.$fn.uploadData('H5WeChatHall_startRecommend_visit','公众号大厅-启动推荐PV');//数据埋点，启动推荐弹窗 展示量
          }
        });
         // 获取搜索推荐信息
        if(this.$store.state.searchAdvText === ''){
          this.$fn.fetchData(this.$api.getRecommend,{recType:501}).then(e=>{
            this.$store.commit('setRecommend',e.data.length > 0 ? e.data[0].recomment_title : '搜索游戏');
          });
        }
     })
   }
}
</script>

<style>
</style>
