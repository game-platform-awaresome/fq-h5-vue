<template>
<!-- 开服页 list组建 -->
 <div>
     <div class="clearfix mauto head">
      <div class="fl title">{{type == '1' ? '火爆新服' : '即将开服'}}</div>
    </div>
    <ul class="mauto">
        <li v-for="(item,index) in obj" :bb1="index===obj.length-1 ? '' : 'bb1'">
            <item3 :item="item" :type="{'event':type,'index':index}"></item3>
        </li>
    </ul>
 </div>
</template>

<script type='text/ecmascript-6'>
import item3 from "components/item/item3.vue";
import router from 'router';
export default {
  props: {
        obj:Array,
        type:{
            type:String,
            default:''
        }
    },
  data() {
    return {};
  },
  components: {
    item3
  },
  methods:{
    push:function(path,query={}){
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
