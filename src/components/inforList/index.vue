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
                <li v-for="(item,index) in list" :bb1="index==list.length-1 ? '' : 'bb1'" :class="parseInt(item.is_highlight) === 1 ? 'highlight clearfix' : 'clearfix' "  @click="push('inforDetail',{'articleId':item.article_id})">
                    <div class="fl">
                        <div class="fl type">[{{getLabel(item.type,item.is_stick)}}]&nbsp;&nbsp;</div>
                        <div class="fl intro">{{item.title}}</div>
                    </div>
                    <div class="fr time">{{item.create_date}}</div>
                </li>
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
import router from 'router';
 export default {
   data () {
     return {
        allLoaded: false,
        list: [],//数据列表
        page: 1,//当前页
        total: 0,//总个数
        pageTotal: 1,//总页数
        query:{},//接收url参数
        pageSize: 20,
     }
   },
   components: {
       item1,
        [Loadmore.name]: Loadmore
   },
   created:function(){
     this.query = this.$route.query;
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
        let url = api.newsList;
        data = {...data,...query};
        const res = await http.post(url,data);
        return new Promise((resolve)=>{
            resolve(res.data.data);
        });
    },
    push:function(path,query={}){
        router.push({path:path,query:query});
    },
    getLabel: function(type,is_stick){
        type = parseInt(type);
        is_stick = parseInt(is_stick);
        if(is_stick === 1) return '置顶';
        switch(type){
            case 5:
                return '公告';
            case 6:
                return '活动';
            case 26:
                return '公告';
            case 27:
                return '精彩';
        }
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
        line-height: 100px;
        .bb1b;
        &:last-child::before{
            display: none;
        }
        &.highlight{
            color:#47adff;
            .type{
                color:#47adff;
            }
            .intro{
                color:#47adff;
            }
            .time{
                color:#47adff;
            }
        }
    }
    .type{
        color:#333333;
        font-size: 30px;
    }
    .intro{
        color:#bbbbbb;
        font-size: 30px;
        .ellipsis;
        width: 420px;
    }
    .time{
        color:#bbbbbb;
        font-size: 30px;
    }
}
 
</style>
