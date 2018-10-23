<template>
 <div class="pop1-content">
   <div class="pop1-mask"></div>
   <div class="pop1-pop">
     <a v-if="recommmendData" @click="openUrl" ><img :src="recommmendData.recomment_picture" alt=""></a> 
     <div class="pop1-close" @click="hide"></div>
   </div>
 </div>
</template>

<script type='text/ecmascript-6' scoped>
import fn from "js/main.js";
import api from "service/api.js";
import http from "service/http.js";
export default {
  props: ["show",'recommmendData'],
  data() {
    return {
    };
  },
  components: {},
  methods: {
    hide: function() {
      this.$emit('update:show',false);
    },
    openUrl: function() {
      this.$fn.uploadData('H5WeChatHall_startRecommend_click','公众号大厅-启动推荐点击');
      if(parseInt(this.recommmendData.is_outreach) === 1){
        this.$fn.openurlW(this.$fn.goGameUrl + this.recommmendData.game_id);
      }else{
        this.$fn.openurlW(this.recommmendData.outreach_url);
      }
    }
  },
  watch: {
    show: function(a, b) {
      if (a) {
        /* $(".pop1-content").show();
        $(".pop1-mask").addClass('dh1');
        $(".pop1-pop").addClass('dh1'); */
        $(".pop1-content").show();
        $(".pop1-mask").animate(
          {
            opacity: 0.6
          },
          500,
          "easeInOutSine"
        );
        $(".pop1-pop").animate(
          {
            top: '50%'
          },
          500,
          "easeInOutSine"
        );
      } else {
        /* $(".pop1-mask").removeClass('dh1');
        $(".pop1-pop").removeClass('dh1');
        $(".pop1-content").hide(); */
        $(".pop1-mask").animate(
          {
            opacity: 0
          },
          500,
          "easeInOutSine"
        );
        $(".pop1-pop").animate(
          {
            top: '132%'
          },
          500,
          "easeInOutSine",
          function() {
            $(".pop1-content").hide();
          }
        );
      }
    }
  },
  created: function() {
    this.$nextTick(function() {
      
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
.pop1-content {
  height: 100%;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  display: none;
  .pop1-mask {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #000000;
    opacity: 0;
    // transition: opacity 500ms linear;
    // &.dh1{
    //   opacity: 0.6;
    // }
  }
  .pop1-pop {
    position: absolute;
    left: 0;
    transform: translateY(-50%);
    top: 132%;
    width: 100%;
    height: 850px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    // transition: transform 500ms linear;
    // &.dh1 {
    //   transform: translateY(-50%);
    // }
    img{
      width: 580px;
      height: 700px;
    }
    .pop1-close{
      width: 64px;
      height: 64px;
      background: url('../../assets/img/pop1-close.png') no-repeat;
      background-size: cover;
    }
  }
}

</style>
