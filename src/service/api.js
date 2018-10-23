const isPro = Object.is(process.env.NODE_ENV, 'production');
let API,FEIHUO;
if(isPro){
  API = 'http://'+document.domain;
  FEIHUO = 'http://www.feihuo.com';
}else{
  API = '/api';
  FEIHUO = '/feihuo';
}
export default {
  // homeurl:API+'/h5Api/index/cmd/getPageBase/v/2',//首页数据接口
  homeurl:FEIHUO + '/h5MobileApi/index/cmd/getPageBase/v/210',//首页数据接口 

  // gameListUrl:API+'/h5Api/index/cmd/getGameList',//获取游戏列表接口
  gameListUrl:FEIHUO + '/h5MobileApi?cmd=getGameList',//获取游戏列表接口
  
  getSubjectInfo:API+'/h5Api/index/cmd/getSubjectInfo',//获取专题信息

  // getGameInfo:API+'/h5Api/index/cmd/getGameInfo',//获取游戏详情
  getGameInfo:FEIHUO + '/h5MobileApi?cmd=ajaxGameInfo',//获取游戏详情

  // getArticleList:API+'/h5Api/index/cmd/getArticleList',//获取文章列表

  // getArticleDetail:API+'/h5Api/index/cmd/getArticleDetail',//获取文章详情
  getArticleDetail:FEIHUO + '/h5MobileApi?cmd=getArticleDetail',//获取文章详情

  getGiftCode:FEIHUO+'/gift/getGiftCode',//获取礼包码
  getCouponList:API+'/h5Api/index/cmd/getCouponList',//获取礼包码
  getThirdLoginUrl:API+'/h5Api/index/cmd/getThirdLoginUrl',//获取第三方登录连接
  getUserInfo:API+'/h5Api/index/cmd/getUserInfo',//获取用户信息
  login:API+'/h5Api/index/cmd/login',//账号登录
  getRecommendInfo:API+'/h5Api/index/cmd/getRecommendInfo',//获取推荐位信息
  register:API+'/h5Api/index/cmd/register',//注册
  sendSmsCode:API+'/h5Api/index/cmd/sendSmsCode',//发送验证码
  logout:API+'/login/logout',//注销
  cardAuth:API+'/h5Api/index/cmd/cardAuth',//实名认证
  bindMobile:API+'/h5Api/index/cmd/bindMobile',//绑定密保手机
  getSpecialSign:API+'/h5Api/index/cmd/getSpecialSign',//获取特定标识

  getRecommend: FEIHUO + '/h5MobileApi?cmd=ajaxRecommend',//获取广告位列表 recType 参数500-启动推荐|501-搜索提示文字推荐|502-搜索页文字推荐
  uploadData: FEIHUO + '/uploadData/AjaxUpload',//数据上报
  newsList: FEIHUO + '/h5MobileApi?cmd=ajaxNewsList',//获取新闻公告列表
  getServerList: FEIHUO + '/h5MobileApi?cmd=getServerList',//获取区服列表
  searchUpload: FEIHUO + '/h5MobileApi?cmd=searchUpload',//搜索数据上报
}
