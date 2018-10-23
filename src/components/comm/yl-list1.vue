<template>
<!-- 专题游戏2 -->
 <div>
     <div class="clearfix mauto head">
      <div class="fl title">{{obj.subjectInfo.name}}</div>
      <div class="fr selectAll" v-if="obj.relGamesInfo.list.length>3" @click="push('gameList',{'subType':2})">查看全部</div>
    </div>
    <ul class="mauto">
        <li v-for="(item,index) in obj.relGamesInfo.list.slice(0,3)" :bb1="index===2 ? '' : 'bb1'">
            <item1 :item="item" :type="{'event':type,'index':index}" ></item1>
        </li>
    </ul>
 </div>
</template>

<script type='text/ecmascript-6'>
import item1 from "components/item/item1.vue";
import router from 'router';
export default {
  props: ["obj","type"],
  data() {
    return {};
  },
  components: {
    item1
  },
  methods:{
    push:function(path,query={}){
        if(path === 'gameList')
          this.$fn.uploadData("H5WeChatHall_"+this.type+"All_click","公众号大厅-"+this.$fn.getEventDesc(this.type)+"全部");
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
ul{
    margin-top: 10px;
}
li {
    padding: 20px 0;
    &[bb1=""]{
      padding-bottom: 0;
    }
  &[bb1="bb1"] {
    position: relative;
    &::after {
      position: absolute;
      content: "";
      width: 530px;
      right: 0;
      bottom: 0;
      border-top: 1px solid #ebebeb;
    }
  }
}
</style>
