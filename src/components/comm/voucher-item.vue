<template>
 <div :type="type(obj)" class="content clearfix">
     <div class="state">{{obj.status_name}}</div>
     <div class="money fl">
         <div class="txt1" v-if="obj.discount_type == 1">{{obj.discount_value}}</div>
        <div class="txt1" v-else>{{toInter(obj.discount_value)}}<div class="decimal" v-html="todecimal(obj.discount_value)"></div> </div>
        <div class="txt2">{{obj.discount_type == 1 ? '元' : '折'}}</div>
     </div>
     <div class="fr">
         <div class="txt3">{{obj.text_1}}</div>
         <div class="txt4">{{obj.text_2}}</div>
         <div class="txt4">{{obj.text_3}}</div>
         <div class="txt4">{{obj.date_text}}</div>
     </div>
 </div>
</template>

<script type='text/ecmascript-6'>
 export default {
    props:{
        obj: Object,

    },
    data () {
     return {

     }
   },
   components: {
   },
   methods:{
       todecimal:function(val){
           return val.toString().substring(1);
       },
       toInter:function(val){
           return val.toString().substring(0,1);
       },
        type:function(val){
           if(val.status != 1){
               return 4;//无效
           }else if(val.discount_type == 2){
               return 3;//折扣
           }else if(val.discount_value > 5){
               return 2;//大于5
           }else if(val.discount_value <= 5){
               return 1;//小于5
           }
        }
   }
 }
</script>

<style scoped lang='less'>
.content{
    position: relative;
    width: 100%;
    height: 194px;
    overflow: hidden;
    color: #ffffff;
    &[type='1']{
        background: url(../../assets/img/voucherBg1.png);
        background-size: 100% 100%;
        .state{
            color: #e6a53c;
        }
    }
    &[type='2']{
        background: url(../../assets/img/voucherBg2.png);
        background-size: 100% 100%;
        .state{
            color: #497fd3;
        }
    }
    &[type='3']{
        background: url(../../assets/img/voucherBg3.png);
        background-size: 100% 100%;
        .state{
            color: #e44d4d;
        }
    }
    &[type='4']{
        background: url(../../assets/img/voucherBg4.png);
        background-size: 100% 100%;
        .state{
            color: #d3d3d3;
        }
    }
    .state{
        position:absolute;
        right: 20px;
        top:40px;
        padding: 0px 13px;
        height: 29px;
        background: #ffffff;
        border-radius:29px;
        display: flex;
        justify-content:center;
        align-items:Center;
        font-size: 20px;
    }
    .money{
        width: 36.5%;
        height: 100%;
        text-align: center;
        position: relative;
    }
    .txt1{
        height: 100%;
        line-height: 194px;
        font-size: 120px;
        font-weight: bold;
        .decimal{
            display:inline-block;
            font-size: 60px;
        }
    }
    .txt2{
        position:absolute;
        right: 25px;
        bottom: 40px;
        font-size: 20px;
    }
    .fr{
        width: 54.5%;
    }
    .txt3{
        font-size: 38px;
        line-height: 60px;
    }
    .txt4{
        font-size: 20px;
        line-height: 40px;
    }
}
 
</style>