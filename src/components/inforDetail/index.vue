<template>
 <div  class="main inforDetail" v-if="data" >
     <div class="title">{{data.articleInfo.title}}</div>
     <div class="gt">[{{getLabel(data.articleInfo.type,data.articleInfo.is_stick)}}]&nbsp;&nbsp;{{data.articleInfo.create_date}}</div>
     <div class="content" v-html="data.articleInfo.content"></div>
     <div :class="show ? 'recomm show' : 'recomm'" v-if="!Array.isArray(data.recGameInfo)" >
         <div class="recommClose" @click.stop="hide" ></div>
        <item1 :item="data.recGameInfo" :type="{'event':'infoRecommend'}"></item1>
     </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import api from 'service/api.js';
import http from 'service/http.js';
import item1 from 'components/item/item1.vue';
 export default {
   data () {
     return {
         data:'',
         show:false,
     }
   },
   components: {
       item1,
   },
   created:function() {
        let articleId = parseInt(this.$route.query.articleId);
        let data = {articleId};
        this.fetchData(api.getArticleDetail,data).then(e=>{
            this.data = e;
        });
   },
    mounted:function(){
       this.$nextTick(function () {
        setTimeout(()=>{this.showFn()},1000);
       });
   },
   methods:{
       fetchData:async function(url,data){
            const res = await  http.post(url,data);
            return new Promise((resolve)=>{
                resolve(res.data.data);
            });
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
        },
        hide: function() {
            this.show = false;
        },
        showFn: function() {
            this.show = true;
        }
   }
 }
</script>

<style scoped lang='less'>
@import url("../../assets/style/mixin.less");
.main{
    width: @wauto;
    margin: 0 auto;
    .title{
        font-size: 34px;
        color: #333333;
        padding-top: 30px;
        font-weight: 600;
    }
    .gt{
        font-size: 24px;
        color: #bbbbbb;
        margin-bottom: 30px;
    }
    .content{
        color: #999999;
        font-size: 28px;
    }
    .recomm{
        position: fixed;
        width: @wauto;
        bottom: 0;
        left:0;
        padding: 35px 5%;
        background: rgba(0,0,0,0.8);
        transform: translateY(100%);
        transition: transform 500ms ease-in;
        .recommClose{
            position: absolute;
            top:10px;
            right: 20px;
            width: 21px;
            height: 21px;
            background: url('../../assets/img/recomGameClose.png') no-repeat;
            background-size: cover;
        }
        &.show{
            transform: translateY(0);
        }
    }
}

 
</style>
