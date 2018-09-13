<template>
 <div>
    <div class="searchbox">
      <input type="text" placeholder="搜索游戏" class="search" v-model="keywordText" @keyup="key($event)" @focus="focus" @blur="blur" autofocus>
      <img src="../../assets/img/search.png" class="searchimg" alt="">
      <!-- <img src="../../assets/img/search.png" class="searchimg" alt="" v-if="show"> -->
    </div>
 </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      keywordText:'',
      show:true
    };
  },
  components: {
    
  },
  mounted:function(){
    this.$nextTick(function(){
      $(".search").focus();
    })
  },
  methods:{
    key:function(event){
        if(event.keyCode == 13 && this.keywordText){
          // alert(event.keyCode);
          this.$emit('search',this.keywordText);
        }
      },
      focus:function(){
        this.show = !this.show;
      },
      blur:function(){
        this.show = !this.show;
      }
  }
};
</script>

<style scoped lang='less'>
@import url("../../assets/style/mixin.less");
  .searchbox{
    position: relative;
    width: @wauto;
    height: 55px;
    margin: 0px auto;
  }
  .searchimg{
    position: absolute;
    width: 27px;
    height: 27px;
    left: 20px;
    top: 15px;
  }
  .search{
    position: absolute;
    width: 100%;
    height: 100%;
    border: 0px;
    background: #f5f5f5;
    border-radius: 5px;
    text-indent: 60px;
    color: #acaeb2;
    font-size: 26px;
    &:focus{
      // text-indent: 30px;
    }
  }
</style>
