<template>
 <div v-show="showc">
     <div class="mask" @click="showc = !showc"></div>
     <img class="ewm" src="../../assets/img/h5Pubilc.jpg"></img>
 </div>
</template>

<script type='text/ecmascript-6'>
 export default {
     props:['show'],
   data () {
     return {
         showc:this.show
     }
   },
   components: {

   },
   watch:{
       show(val){
           this.showc = val;
       },
       showc(val){
           this.$emit('changeShow',val);
       }
   }
 }
</script>

<style scoped lang='less'>
.mask{
    position:fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
}
.ewm{
    position: fixed;
    z-index: 11;
    width: 430px;
    height: 430px;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
}
 
</style>
