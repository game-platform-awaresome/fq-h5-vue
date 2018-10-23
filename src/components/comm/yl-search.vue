<template>
 <div class="content">
    <div class="top">
      <div class="searchbox">
        <input type="text" :placeholder="$store.state.searchAdvText" class="search" v-model="keywordText" @keyup="key($event)" @focus="focus" @blur="blur" autofocus>
        <img src="../../assets/img/search.png" class="searchimg" alt="">
        <!-- <img src="../../assets/img/search.png" class="searchimg" alt="" v-if="show"> -->
      </div>
    </div>
    <div class="index-main" v-if="isShow">
      <div class="word-box recently-word"  v-if="keywords.length > 0">
        <div class="title"><div><i class="icon icon-history"></i> <span>历史搜索</span></div> <i class="icon icon-shanchu" @click="delRecords"></i></div>
        <ul>
          <li  v-for="(item,index) in keywords" :key="index" @click="listSearch(item)"><span>{{item}}</span></li>
        </ul>
      </div>
      <div class="word-box hot-word" v-if="hotwords.length > 0" >
        <div class="title"><div><i class="icon icon-hot"></i> <span>热门推荐</span></div></div>
        <ul>
          <li v-for="(item,index) in hotwords.slice(0,6)" :key="index" :class="item.hasOwnProperty('is_highlight') && parseInt(item.is_highlight) === 1 ? 'highlight' : '' " @click="listSearch(item.recomment_title,{'key':'hot-word','val':{'index':index}})"><span>{{$fn.ellipsis(7,item.recomment_title)}}</span></li>
        </ul>
      </div>
    </div>
 </div>
</template>

<script type='text/ecmascript-6'>
export default {
  data() {
    return {
      keywordText:'',
      prolist:true,
      isShow:true,
      keywords:[],
      hotwords:[],
      time:null,
      // serachUploadData:[],//搜索数据上报
    };
  },
  components: {
    
  },
  created:function(){
    this.$nextTick(function(){
      let that = this;
      this.keywords = this.getRecords();
      this.$fn.fetchData(this.$api.getRecommend,{recType:502}).then(e=>{//获取到热门推荐
        this.hotwords = e.data;
      });
      // $(".search").focus(function(){
      //   this.isShow = true;
      //   this.$emit('searchFocus',false);
      // });
    });
  },
  watch: {
    keywordText: function(newval, oldval){
      if(newval === ''){
        this.isShow = true;
        this.$emit('searchFocus',false);
      }
      // clearTimeout(time);
      // let that = this;
      // time = setTimeout(function(){that.listSearch(newval)},500);
    }
  },
  mounted:function(){
    this.$nextTick(function(){
      $(".search").focus();
    })
  },
  // beforeDestroy:function(){
  //   this.$fn.fetchData(this.$api.searchUpload,{words:this.serachUploadData});
  // },
  methods:{
    key:function(event){
      if(event.keyCode == 13 && this.keywordText){
        this.listSearch(this.keywordText);
      }
      if(event.keyCode == 13 && !this.keywordText && this.$store.state.searchAdvText !== '搜索游戏'){
        this.keywordText = this.$store.state.searchAdvText;
        this.listSearch(this.keywordText);
      }
      if(event.keyCode != 13 && this.keywordText){
        clearTimeout(this.time);
        let that = this;
        this.time = setTimeout(function(){that.listSearch(that.keywordText)},500);
      }
      // if(event.keyCode == 8){//监听删除键，清除setTimeout
      //   clearTimeout(this.time);
      // }
    },
    focus:function(){
      this.show = !this.show;
    },
    blur:function(){
      this.show = !this.show;
    },
    setRecords:function(keyword){//设置历史搜索
      this.keywords.unshift(keyword);
      this.$fn.setLocalStroge('h5FeihuoHistoryKeyWord',JSON.stringify(this.keywords.slice(0,30)));
    },
    getRecords:function(){//获取历史搜索
      if(this.$fn.getLocalStroge('h5FeihuoHistoryKeyWord')){
        return JSON.parse(this.$fn.getLocalStroge('h5FeihuoHistoryKeyWord'));
      }else{
        return [];
      }
    },
    delRecords:function(){//删除历史搜索
      this.keywords = [];
      this.$fn.removeLocalStroge('h5FeihuoHistoryKeyWord');
    },
    listSearch:function(keyWord, obj){
      this.keywordText = keyWord;
      keyWord = keyWord.trim();//过滤字符串收尾的空格
      if(this.keywordText !== ''){
        // alert(this.keywordText);
        this.isShow = false;
        // $(".search").blur();
        this.$emit('search',this.keywordText);
        this.setRecords(this.keywordText);
        if(obj && obj.key === 'hot-word'){
          this.$fn.uploadData("H5WeChatHall_searchRecommend"+obj.val.index+"_click","公众号大厅-搜索推荐"+obj.val.index+"点击");
        }
        this.$fn.fetchData(this.$api.searchUpload,{words:[this.keywordText]});//搜索数据上报
        // this.serachUploadData.push(this.keywordText);
      }
    },
    
  }
};
</script>

<style scoped lang='less'>
@import url("../../assets/style/mixin.less");
@import url("../../assets/style/class.less");
.content{
  position: relative;
}
.top{
  padding: 20px 0;
  border-bottom: 1px solid #ebebeb;
}
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
  .index-main {
  position: absolute;
  width: @wauto;
  left:5%;
  z-index: 100;
  background: #ffffff;
  .word-box {
    & > .title {
      margin:40px 0 25px;
      display: flex;
      justify-content: space-between;
      color: #bbbbbb;
      font-size: 26px;
      .icon{
        display: inline-block;
      }
      .icon-history{
        width: 24px;
        height: 24px;
        background:url('../../assets/img/icon-history.png') no-repeat;
        background-size: cover;
      }
      .icon-hot{
        width: 23px;
        height: 24px;
        background:url('../../assets/img/icon-hot.png') no-repeat;
        background-size: cover;
      }
      .icon-shanchu{
        width: 29px;
        height: 29px;
        background:url('../../assets/img/icon-shanchu.png') no-repeat;
        background-size: cover;
      }
    }
    ul {
      display: flex;
      flex-flow: row wrap;
      max-height: 285px;
      overflow: hidden;
      li {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 20px 30px;
        max-width: 100%;
        border-radius: 31px;
        margin-right: 20px;
        margin-bottom: 20px;
        color:#333333;
        font-size: 28px;
        background-color: #f5f5f5;
        box-sizing: border-box;
        &:first-child {
          margin-left: 0;
        }
        &>span{
          width: auto;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          .ellipsis;
        }
        &.highlight{
          color: #47adff;
        }
      }
    }
    &.hot-word{
      ul{
        max-height: 100%;
      }
    }
  }
  }
</style>
