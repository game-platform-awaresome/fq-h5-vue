<template>
 <div class="content"  v-if="data != null">
     <div class="usericon">
         <yl-usericon :obj="data"></yl-usericon>
     </div> 
    <ul>
        <li class="clearfix" @click="push('rna',{obj:data})">
            <img class="fl icon" src="../../../assets/img/rna.png" alt="">
            <div class="txt1 fl">实名认证</div>
            <img src="../../../assets/img/right.png" alt="" class="right fr">
            <div class="txt2 fr" :class="!data.hasIdCard ? 'red' : ''" >{{data.hasIdCard ? '已实名' : '未实名' }}</div>
        </li>
        <li class="clearfix" @click="push('phone',{obj:data})">
            <img class="fl icon" src="../../../assets/img/phone.png" alt="">
            <div class="txt1 fl">绑定手机</div>
            <img src="../../../assets/img/right.png" alt="" class="right fr">
            <div class="txt2 fr" :class="!data.hasSafeMobile ? 'red' : ''"  >{{data.hasSafeMobile ? '已绑定' : '未绑定'}}</div>
        </li>
    </ul>
    <div class="exit" @click="sheetVisible = !sheetVisible">退出登录</div>
    <mt-actionsheet
    :actions="actions"
    v-model="sheetVisible">
    </mt-actionsheet>
 </div>
</template>

<script type='text/ecmascript-6'>
import ylUsericon from "comm/yl-usericon";
import { Actionsheet } from 'mint-ui';
import fn from 'js/main.js';
import router from 'router';
import api from 'service/api.js';
import http from 'service/http.js';
 export default {
   data () {
     return {
        data:null,
        obj: {
            imgsrc: require("img/1.png"),
            name: "绑定手机以保护您的账号",
        },
        // action sheet 选项内容 
        actions:[
            {
            name: '退出登录',
            method : this.exit// 调用methods中的函数
            }
        ],
        // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
        sheetVisible: false,
    }
   },
    components: {
        ylUsericon,
        [Actionsheet.name]:Actionsheet,
    },
    methods:{
        exit:function(){
            // console.log('退出登录');
            let data = {
                post_type:'ajax'
            }
            this.$fn.fetchData(this.$api.logout,data).then(e=>{
                location.href = this.$fn.domain+'/home';
                // location.reload();
            })
        },
        push: function(path, query = {}) {
            this.$router.push({ path: path, query: query });
        }
    },
    created:function(){
        let data={};
        this.$fn.fetchData(api.getUserInfo,data).then(e=>{
            // console.log(e);
            this.data = e.data;
        })
    }
 }
</script>

<style scoped lang='less'>
@import "../../../assets/style/mixin.less";
.content{
    height: 100%;
    background: @bg1;
    .usericon{
        background: #ffffff;
        padding: 40px 0;
    }
    ul{
        margin-top: 20px;
    }
    li{
        background: #ffffff;
        padding: 20px 5%;
        line-height: 56px;
        &:first-child{
            border-bottom: 1px solid #ebebeb;
        }
        .icon{
            width: 56px;
            height: 56px;
            margin-right: 20px;
        }
        .txt1{
            color:#333333;
            font-size: 32px;
        }
        .txt2{
            color:#bbbbbb;
            font-size:26px;
            margin-right: 40px;
            &.red{
                color: #ff5d5d;
            }
        }
        .right{
            width: 14px;
            height: 24px;
            margin-top: 14px;
        }
    }
    .exit{
        color:#666666;
        font-size: 32px;
        background: #ffffff;
        line-height: 100px;
        text-align: center;
        margin-top: 170px;
    }
}
 
</style>
