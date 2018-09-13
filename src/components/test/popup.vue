<template>
 <div class="content">
     <div class="btn" @click="$store.commit('changeshow')">dianji</div> 
     <popup :show="$store.state.show"></popup>
 </div>
</template>

<script type='text/ecmascript-6'>
import popup from "comm/popup.vue";
 export default {
   data () {
     return {

     }
   },
   components: {
       popup
   }
 }
</script>

<style scoped lang='less'>
.content{
    height: 100%;
}
 
</style>
