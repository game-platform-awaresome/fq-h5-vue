<template>
 <div class="content">
     <div class="list-box mauto">
        <mt-loadmore  
        :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded" 
        ref="loadmore" 
        :auto-fill="false"
        :bottomPullText="'aaa'" 
        :bottom-distance="50">
            <ul class="scroll-wrapper">
                <li v-for="(item,index) in list" :bb1="index==list.length-1 ? '' : 'bb1'"><item1 :item="item"></item1></li>
            </ul>
             <div slot="bottom" class="mint-loadmore-bottom">
                <span><img src="../../assets/img/loading.gif" alt=""></span>
            </div>
        </mt-loadmore>
   </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import item1 from "components/item/item1.vue";
import { Loadmore } from "mint-ui";
import api from "service/api";
import http from "service/http";
 export default {
   data () {
     return {
        allLoaded: false,
        list: [],
        page: 1,
        total: 0,
        pageTotal: 1,
        query:{},
        pageSize:20,
     }
   },
   components: {
       item1,
        [Loadmore.name]: Loadmore
   },
   created:function(){
     this.query = this.$route.query;
     if(this.query.subType){
         document.title = '游戏专题';
     }else if(this.query.type == 1){
          document.title = '最新游戏';
     }else{
          document.title = '最多人玩';
     }
     this.fetchData(this.query,this.page,this.pageSize).then(e=>{
        this.page= 1;
        this.list= e.list;//数组合并
        this.total = e.total;//总个数
        if(this.total <= this.pageSize ){
            this.pageTotal = 1;
            this.allLoaded = true;// 若数据已全部获取完毕
        }else{
            // this.pageTotal = Math.ceil((this.total-20)/10) + 1;//计算出总的页数
            this.pageTotal = Math.ceil(this.total/this.pageSize);//计算出总的页数
        }
      });
   },
   methods: {
    loadBottom: function () { // 加载更多数据的操作
        this.page++;
        this.fetchData(this.query,this.page,this.pageSize).then(e=>{
            let list = this.list;
            this.list = [...list,...e.list];//数组合并
            this.$refs.loadmore.onBottomLoaded();
            if(this.page === this.pageTotal ){
                this.allLoaded = true;// 若数据已全部获取完毕
            }
        });
    },
    fetchData: async function (query,page,pageSize) {
        let data = {
            page,
            pageSize
        };
        let url = api.gameListUrl;
        data = {...data,...query};
        if(data.subType){//判断是专题数据，还是游戏列表
          url = api.getSubjectInfo;
        }
        const res = await http.post(url,data);
        return new Promise((resolve)=>{
          if(data.subType){//判断是专题数据，还是游戏列表
             resolve(res.data.data.relGamesInfo);
          }else{
            resolve(res.data.data);
          }
        });
    }
  }
 }
</script>

<style scoped lang='less'>
@import url("../../assets/style/class.less");
@import url("../../assets/style/mixin.less");
.content{
    height: 100%;
}
.list-box{
    height: 100%;
    overflow-x: hidden;
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
