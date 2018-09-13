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
  homeurl:API+'/h5Api/index/cmd/getPageBase/v/2',//首页数据接口
  gameListUrl:API+'/h5Api/index/cmd/getGameList',//获取游戏列表接口
  getSubjectInfo:API+'/h5Api/index/cmd/getSubjectInfo',//获取专题信息
  getGameInfo:API+'/h5Api/index/cmd/getGameInfo',//获取游戏详情
  getArticleList:API+'/h5Api/index/cmd/getArticleList',//获取文章列表
  getArticleDetail:API+'/h5Api/index/cmd/getArticleDetail',//获取文章详情
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
}
