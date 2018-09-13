<template>
 <div class="content">
     <div class="header">
       <div class="search" @click="push('search')">
        <div class="searchbox">
        <input type="text" placeholder="搜索游戏" class="searchinput">
        <img src="../../assets/img/search.png" class="searchimg" alt="">
        </div>
    </div>

        <div class="tab">
            <div class="tab-content">
                <ul class="clearfix">
                    <li class="fl" :class="imgflag[0] ? 'active' : ''" @click="tab(0,1)">
                        <img v-show="imgflag[0]" src="../../assets/img/rolemh.png" alt="">
                        <img v-show="!imgflag[0]" src="../../assets/img/rolem.png" alt="">
                        <span>角色</span>
                    </li>
                    <li class="fl" :class="imgflag[1] ? 'active' : ''" @click="tab(1,3)">
                        <img v-show="imgflag[1]" src="../../assets/img/simulationmh.png" alt="">
                        <img v-show="!imgflag[1]" src="../../assets/img/simulationm.png" alt="">
                        <span>模拟</span>
                    </li>
                    <li class="fl" :class="imgflag[2] ? 'active' : ''" @click="tab(2,4)">
                        <img v-show="imgflag[2]" src="../../assets/img/leisuremh.png" alt="">
                        <img v-show="!imgflag[2]" src="../../assets/img/leisurem.png" alt="">
                        <span>休闲</span>
                    </li>
                    <li class="fl" :class="imgflag[3] ? 'active' : ''" @click="tab(3,5)">
                        <img v-show="imgflag[3]" src="../../assets/img/placemh.png" alt="">
                        <img v-show="!imgflag[3]" src="../../assets/img/placem.png" alt="">
                        <span>放置</span>
                    </li>
                    <li class="fl" :class="imgflag[4] ? 'active' : ''" @click="tab(4,2)">
                        <img v-show="imgflag[4]" src="../../assets/img/strategymh.png" alt="">
                        <img v-show="!imgflag[4]" src="../../assets/img/strategym.png" alt="">
                        <span>策略</span>
                    </li>
                </ul>
            </div>
        </div>
     </div>

    <keep-alive>
        <div class="list-box mauto">
            <mt-loadmore  
            :bottom-method="loadBottom" 
            :bottom-all-loaded="allLoaded[type]" 
            ref="loadmore" 
            :auto-fill="false"
            :bottomPullText="'aaa'" 
            :bottom-distance="50">
                <ul class="scroll-wrapper">
                    <li v-for="(item,index) in list[type]" :bb1="index==list[type].length-1 ? '' : 'bb1'"><item1 :item="item"></item1></li>
                </ul>
                <div slot="bottom" class="mint-loadmore-bottom">
                    <!-- <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }"><img src="../../assets/img/loading.gif" alt=""></span>
                    <span v-show="bottomStatus === 'loading'"><img src="../../assets/img/loading.gif" alt=""></span> -->
                    <span><img src="../../assets/img/loading.gif" alt=""></span>
                </div>
            </mt-loadmore>
        </div>
   </keep-alive>

   <!-- <div class="list-box mauto" v-show="imgflag[0]">
        <mt-loadmore  
        :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded" 
        ref="loadmore" 
        :auto-fill="false"
        :bottomPullText="'aaa'" 
        :bottom-distance="50">
            <ul class="scroll-wrapper">
                <li v-for="(item,index) in list[1]" :bb1="index==list[1].length-1 ? '' : 'bb1'"><item1 :item="item"></item1></li>
            </ul>
             <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }"><img src="../../assets/img/loading.gif" alt=""></span>
                <span v-show="bottomStatus === 'loading'"><img src="../../assets/img/loading.gif" alt=""></span>
            </div>
        </mt-loadmore>
   </div>
   <div class="list-box mauto" v-show="imgflag[1]">
        <mt-loadmore  
        :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded" 
        ref="loadmore" 
        :auto-fill="false"
        :bottomPullText="'aaa'" 
        :bottom-distance="50">
            <ul class="scroll-wrapper">
                <li v-for="(item,index) in list[3]" :bb1="index==list[3].length-1 ? '' : 'bb1'"><item1 :item="item"></item1></li>
            </ul>
             <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }"><img src="../../assets/img/loading.gif" alt=""></span>
                <span v-show="bottomStatus === 'loading'"><img src="../../assets/img/loading.gif" alt=""></span>
            </div>
        </mt-loadmore>
   </div>
   <div class="list-box mauto" v-show="imgflag[2]">
        <mt-loadmore  
        :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded" 
        ref="loadmore" 
        :auto-fill="false"
        :bottomPullText="'aaa'" 
        :bottom-distance="50">
            <ul class="scroll-wrapper">
                <li v-for="(item,index) in list[4]" :bb1="index==list[4].length-1 ? '' : 'bb1'"><item1 :item="item"></item1></li>
            </ul>
             <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }"><img src="../../assets/img/loading.gif" alt=""></span>
                <span v-show="bottomStatus === 'loading'"><img src="../../assets/img/loading.gif" alt=""></span>
            </div>
        </mt-loadmore>
   </div>
   <div class="list-box mauto" v-show="imgflag[3]">
        <mt-loadmore  
        :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded" 
        ref="loadmore" 
        :auto-fill="false"
        :bottomPullText="'aaa'" 
        :bottom-distance="50">
            <ul class="scroll-wrapper">
                <li v-for="(item,index) in list[2]" :bb1="index==list[2].length-1 ? '' : 'bb1'"><item1 :item="item"></item1></li>
            </ul>
             <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }"><img src="../../assets/img/loading.gif" alt=""></span>
                <span v-show="bottomStatus === 'loading'"><img src="../../assets/img/loading.gif" alt=""></span>
            </div>
        </mt-loadmore>
   </div>
   <div class="list-box mauto" v-show="imgflag[4]">
        <mt-loadmore  
        :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded" 
        ref="loadmore" 
        :auto-fill="false"
        :bottomPullText="'aaa'" 
        :bottom-distance="50">
            <ul class="scroll-wrapper">
                <li v-for="(item,index) in list[2]" :bb1="index==list[2].length-1 ? '' : 'bb1'"><item1 :item="item"></item1></li>
            </ul>
             <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }"><img src="../../assets/img/loading.gif" alt=""></span>
                <span v-show="bottomStatus === 'loading'"><img src="../../assets/img/loading.gif" alt=""></span>
            </div>
        </mt-loadmore>
   </div> -->

 </div>
</template>

<script type='text/ecmascript-6'>
import ylSearch from "comm/yl-search.vue";
import item1 from "components/item/item1.vue";
import { Loadmore,Indicator } from 'mint-ui';
import api from 'service/api';
import http from 'service/http';
import fn from 'js/main.js';
import router from 'router';
export default {
  data() {
    return {
        allLoaded: {1:false,2:false,3:false,4:false,5:false},
        topStatus: '',
        // bottomStatus:'drop',
        // list:[],//数据
        list:{1:[],2:[],3:[],4:[],5:[]},//不同类型对应的数据
        imgflag:[true,false,false,false,false],//tabImg切换
        type:1,//存储url的参数
        page:{1:1,2:1,3:1,4:1,5:1},//不同类型的当前页
        total:{ 1:0, 2:0, 3:0, 4:0,5:0},//各自的总个数
        pageTotal:{ 1:0, 2:0, 3:0, 4:0,5:0},//各自的总页数
        pageSize:20,//每页的个数
    };
  },
  components: {
    ylSearch,
    item1,
    [Loadmore.name]:Loadmore,
    [Indicator.name]:Indicator,
  },
    created () {
        Indicator.close();
        Indicator.open();
        if(this.$route.query.type){
            this.type = parseInt(this.$route.query.type);
            // console.log(this.type);
            this.imgflag.fill(false);
            switch(this.type){
                case 1:
                    // this.imgflag[0] = true;
                    this.$set(this.imgflag,0,true);
                    break;
                case 2:
                    // this.imgflag[4] = true;
                    this.$set(this.imgflag,4,true);
                    break;
                case 3:
                    // this.imgflag[1] = true;
                    this.$set(this.imgflag,1,true);
                    break;
                case 4:
                    // this.imgflag[2] = true;
                    this.$set(this.imgflag,2,true);
                    break;
                case 5:
                    // this.imgflag[3] = true;
                    this.$set(this.imgflag,3,true);
                break;
            }
            
        }
        this.firstData().then(e=>{
            Indicator.close();
        });
    },
  methods:{
      loadBottom: function () { // 加载更多数据的操作
            this.page[this.type]++;
            this.fetchData(this.type,this.page[this.type],this.pageSize).then(e=>{
                let list = this.list[this.type];
                this.list[this.type] = [...list,...e.list];//数组合并
                this.$refs.loadmore.onBottomLoaded();
                if(this.page[this.type] === this.pageTotal[this.type] ){
                    this.allLoaded[this.type] = true;// 若数据已全部获取完毕
                }
            });
        },
         fetchData: async function (category,page,pageSize) {
            let data = {
                category,
                page,
                pageSize
            };
            const res = await http.post(api.gameListUrl,data);
            return new Promise((resolve)=>{
                resolve(res.data.data);
            });
        },
        tab: function(index,type){
            if(!this.imgflag[index]){
                // this.imgflag.forEach((item,i)=>{
                //   this.imgflag[i] = i ==index ? true: false; 
                // });
                this.imgflag.fill(false);
                this.$set(this.imgflag,index,true);
                this.type = type;
                // $(".tab li").eq(index).addClass("active").siblings().removeClass("active");

                if(this.list[this.type].length===0){
                    this.firstData();
                }
                this.$refs.loadmore.onBottomLoaded();
                location.replace(location.href.substring(0,location.href.length-1)+type);
            }
        },
        push:function(path){
            if(path === 'search') MtaH5.clickStat("eventSearch")
            router.push(path);
        },
        firstData: async function(){
            this.fetchData(this.type,this.page[this.type],this.pageSize).then(e=>{
                this.page[this.type] = 1;
                this.list[this.type] = e.list;//数组合并
                this.total[this.type] = e.total;//总个数
                if(this.total[this.type] <= this.pageSize ){
                    this.pageTotal[this.type] = 1;
                    this.allLoaded[this.type] = true;// 若数据已全部获取完毕
                }else{
                    // this.pageTotal[this.type] = Math.ceil((this.total[this.type]-20)/10) + 1;//计算出总的页数
                    this.pageTotal[this.type] = Math.ceil(this.total[this.type]/this.pageSize);//计算出总的页数
                }
            });
        }
  },
  mounted: function () {
    this.$nextTick(function () {
        // let than = this;
        // $(".tab li").on("click",function(){
        //    if(!$(this).hasClass("active")){
        //         $(this).addClass("active").siblings().removeClass("active");
        //         than.fetchData().then(e=>{
        //             than.list = e;//数组合并
        //         });
        //    }
        // });
        /* let h = $(document).height();
        let h1 = $(".search-box").outerHeight();
        let h2 = $(".tab").outerHeight();
        let h3 = (h-h1-h2)/75 +'rem';
        $(".list-box").css('height',h3); */
    })
    }
};
</script>

<style scoped lang='less'>
@import url("../../assets/style/class.less");
@import url("../../assets/style/mixin.less");
.content{
    height: 100%;
    padding-top: 245px;
    position: relative;
    box-sizing: border-box;
}
.header{
    height: 245px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}
.search {
  padding: 20px 0;
  border-bottom: 1px solid #ebebeb;
}
.searchbox {
  position: relative;
  width: @wauto;
  height: 55px;
  margin: 0px auto;
  .searchimg {
    position: absolute;
    width: 27px;
    height: 27px;
    left: 20px;
    top: 15px;
  }
  .searchinput {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 0px;
    background: #f5f5f5;
    border-radius: 5px;
    text-indent: 60px;
    color: #acaeb2;
    font-size: 26px;
    &:focus {
      // text-indent: 30px;
    }
  }
}
.tab {
    .bb1b;
    overflow:hidden;
    &::before{
        width: 90%;
    }
  ul {
    width: 830px;
    padding: 40px;
  }
  li {
    font-size: 28px;
    width: 150px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    margin-right: 20px;
    border: 1px solid #c3c8cc;
    color: #777777;
    box-sizing: border-box;
    border-radius: 6px;
    &:last-child{
        margin-right: 0;
    }
    img {
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }
    &.active{
        border: 1px solid #47adff;
        color:#47adff;
    }
  }
}
.tab-content{
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar{
        display: none;
    }
}
.list-box{
    height: 100%;
    overflow-x: hidden;;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar{
        display: none;
    }
    li{
        padding: 20px 0;
        &[bb1="bb1"] {
            position: relative;
            &::before {
            position: absolute;
            content: "";
            width: 530px;
            right: 0;
            bottom: 0;
            border-top: 1px solid #ebebeb;
            }
        }
    }
}
</style>
