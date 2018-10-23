/*
 * @Author: cuiyulin 
 * @Date: 2018-10-16 13:56:01 
 * @Last Modified by: cuiyulin
 * @Last Modified time: 2018-10-16 19:52:29
 * 
 * 数据上报
 */

 import fn from './main';

$(document).on("click",".uploadData",function(){
    if($(this).attr('game_id')){
        fn.uploadData($(this).attr('event'),$(this).attr('event_desc'),$(this).attr('game_id'));
    }else{
        fn.uploadData($(this).attr('event'),$(this).attr('event_desc'));
    }
});