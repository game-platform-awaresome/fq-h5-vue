<template>
 <div class="content"  v-if="data != null">
    <div class="effective">
        <ul>
            <li v-for="item in data.enable"><voucher-item :obj="item"></voucher-item></li>
        </ul>
        <div class="effected-space" v-if="data.enable.length == 0">
            <img src="../../assets/img/voucher-space.png" alt="">
            <div class="txt1">亲，你还没有代金券哦～</div>
        </div>
    </div>


    <div class="invalid">
        <div class="invalid-txt" @click="invalidShow = !invalidShow" >
            <span>查看无效的代金券</span>
            <img v-show="invalidShow" src="../../assets/img/down.png" alt="">
            <img v-show="!invalidShow" src="../../assets/img/right2.png" alt="">
        </div>
        <ul v-if="invalidShow">
            <li v-for="item in data.disable"><voucher-item :obj="item"></voucher-item></li>
        </ul>
    </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import voucherItem from '../comm/voucher-item.vue';
import api from 'service/api.js';
import http from 'service/http.js';
 export default {
   data () {
     return {
        invalidShow:false,
        data:null,
     }
   },
   components: {
       voucherItem
   },
   created:function(){
       this.fetchData().then(e=>{
           this.data = e;
       })

   },
   methods:{
        fetchData:async function(){
            let data = {};
            const res = await  http.post(api.getCouponList,data);
            // console.log(res.data.data);
            return new Promise((resolve)=>{
                resolve(res.data.data);
            });
        }
   }
 }
</script>

<style scoped lang='less'>
.content{
    width: 90%;
    margin: 0 auto;
    padding-top: 20px;
}
.invalid-txt{
    margin: 50px auto 30px;
    color: #999999;
    font-size: 30px;
    text-align: center;
    img{
        margin-left: 10px;
        vertical-align:middle;
        width: 24px;
        height: 24px;
        // &:first-child{
        //     width: 17px;
        //     height: 10px;
        // }
        // &:last-child{
        //     width: 10px;
        //     height: 17px;
        // }
    }
}
li{
    margin-bottom: 20px;
}
.effected-space{
    margin: 140px auto 120px;
    img{
        display: block;
        margin: 0 auto;
        width: 325px;
        height: 220px;
    }
    .txt1{
        text-align: center;
        font-size: 28px;
        color: #999999;
        margin-top: 50px;
    }
}
</style>
