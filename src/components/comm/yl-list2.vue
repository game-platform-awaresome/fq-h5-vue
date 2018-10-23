<template>
<!-- 最新游戏、最多人玩 -->
 <div>
     <div class="clearfix mauto head">
      <div class="fl title">{{type === 1 ? '最新游戏':'最多人玩'}}</div>
      <div class="fr selectAll"@click="push('gameList',{'type':type})" >查看全部</div>
    </div>
    <ul class="mauto">
        <li v-for="(item,index) in obj" :bb1="index==obj.length-1 ? '' : 'bb1'">
            <img class="num123" :src="require('img/num'+(index+1)+'.png')" alt="">
            <item2 :item="item" :type="type === 1 ? {'event':'newGames','index':index} : {'event':'hotGames','index':index}"></item2>
        </li>
    </ul>
 </div>
</template>

<script type='text/ecmascript-6'>
import item2 from "components/item/item2.vue";
import router from 'router';
export default {
  props: ["obj","type"],
  data() {
    return {};
  },
  components: {
    item2
  },
  methods:{
    push:function(path,query={}){
      if(this.type == 1){
        this.$fn.uploadData("H5WeChatHall_newGamesAll_click","公众号大厅-最新游戏全部");
      }else{
        this.$fn.uploadData("H5WeChatHall_hotGamesAll_click","公众号大厅-最多人玩全部");
      }
      router.push({path:path,query:query});
    },
  }
};
</script>

<style scoped lang='less'>
@import "../../assets/style/class.less";
.head {
  height: 35px;
  line-height: 35px;
}
.title {
  color: #333333;
  font-size: 36px;
  font-weight: bold;
}
ul {
  margin-top: 10px;
}
li {
  padding: 20px 0;
  zoom: 1;
  &[bb1=""]{
    padding-bottom: 0;
  }
  &[bb1="bb1"] {
    position: relative;
    &::before {
      position: absolute;
      content: "";
      width: 500px;
      right: 0;
      bottom: 0;
      border-top: 1px solid #ebebeb;
    }
  }
  &::after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
  }
}
.num123 {
  float: left;
  height: 32px;
  margin-top: 40px;
}
.item {
  float: right;
}
</style>
