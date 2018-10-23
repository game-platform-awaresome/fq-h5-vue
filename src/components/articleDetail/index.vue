<template>
 <div  class="main">
     <div class="content" v-html="data"></div>
 </div>
</template>

<script type='text/ecmascript-6'>
import api from 'service/api.js';
import http from 'service/http.js';
 export default {
   data () {
     return {
         data:''
     }
   },
   components: {

   },
   created:function(){
        let article_id = parseInt(this.$route.query.article_id);
        let data = {article_id,v:2};
        this.fetchData(api.getArticleDetail,data).then(e=>{
            this.data = e.content;
        })
   },
   methods:{
       fetchData:async function(url,data){
            const res = await  http.post(url,data);
            return new Promise((resolve)=>{
                resolve(res.data.data);
            });
        }
   }
 }
</script>

<style scoped lang='less'>
@import url("../../assets/style/mixin.less");
.main{
    width: @wauto;
    margin: 0 auto;
}
img{
    width: 100%;
}
 
</style>
