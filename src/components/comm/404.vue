<template>
 <div class="content">
     <img src="../../assets/img/404.png" alt="">
     <div class="txt">内容加载失败，请检查网络</div>
     <div class="btn" @click="open">重新加载</div>
 </div>
</template>

<script type='text/ecmascript-6'>
 export default {
   data () {
     return {

     }
   },
   components: {

   },
   methods:{
       open:function(){
           location.href = this.$store.state.currentPath;
       }
   }
 }
</script>

<style scoped lang='less'>
.content{
    img{
        display: block;
        padding-top: 50px;
        margin: 0 auto;
        width: 326px;
        height: 220px;
    }
    .txt{
        margin: 50px auto 40px;
        text-align: center;
        font-size: 28px;
        color:#999999;
    }
    .btn{
        margin: 0 auto;
        width: 155px;
        height: 60px;
        border: 1px solid #d1d1d1;
        border-radius: 6px;
        text-align: center;
        line-height: 60px;
        cursor: pointer;
    }
}
    
 
</style>
