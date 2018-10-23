<template>
 <div v-if="data.loading">
    <div class="f1" v-if="data.res.hotList.length > 0">
        <yl-list3 :obj="data.res.hotList" :type="'1'" ></yl-list3>
    </div>
    <div class="f2" v-if="data.res.newList.length > 0" >
        <yl-list3 :obj="data.res.newList" :type="'2'" ></yl-list3>
    </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import ylList3 from  "../comm/yl-list3";

import router from "router";
import { Indicator } from "mint-ui";
 export default {
   data () {
     return {
         data:{
             loading:false,
             res:null
         }
     }
   },
   components: {
       ylList3
   },
   created: function(){
        this.data.loading = false;
        Indicator.close();
        Indicator.open();
       this.$fn.fetchData(this.$api.getServerList,{}).then(e=>{
            this.data.res = e.data;
            Indicator.close();
            this.data.loading = true;
        });
        this.$fn.uploadData('H5WeChatHall_eventServer_visit','公众号大厅-开服页PV');
   }
 }
</script>

<style scoped lang='less'>
@import url("../../assets/style/class.less");
@import url("../../assets/style/mixin.less");
.f1{
    .bb1;
    padding: 40px 0;
}
.f2{
    padding: 40px 0;
}

</style>
