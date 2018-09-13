const isPro = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
    baseUrl: isPro ? 'http://sj.feihuo.com/h5Api/index/cmd/' : 'api/'
}