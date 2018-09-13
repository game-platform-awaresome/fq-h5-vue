import Vue from 'vue';
import vuex from 'vuex';
Vue.use(vuex);

export default new vuex.Store({
    state:{
        isShow:false,//登录注册弹窗是否显示
        isLogin:false,//判断用户是否登录
        currentPath:'',//当前页面url
        baseData:null,//基础信息
    },
    mutations:{
        changeshow(state){//改变使登录注册弹窗显示或消失
            state.isShow = !state.isShow;
        },
        changeLogin(state){//改变登录
            state.isLogin = !state.isLogin;
        },
        setCurrentPath(state,path){
            state.currentPath = path;
        },
        setLogin(state,isLogin){
            state.isLogin = isLogin;
        },
        setBaseData(state,baseData){
            state.baseData = baseData;
        }
    }
})