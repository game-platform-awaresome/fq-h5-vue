<template>
 <div>
    <div class="search">
         <yl-search @search="getdata"></yl-search>
    </div>

    <div class="search_space" v-if="space">
      <img src="../../assets/img/search_space.png" alt="">
      <div class="txt">亲，找不到您搜索的游戏～</div>
    </div>

    <div class="list-box mauto">
        <mt-loadmore  
        :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded" 
        ref="loadmore" 
        :auto-fill="false"
        :bottom-distance="50">
            <ul class="scroll-wrapper">
                <li v-for="(item,index) in list" :bb1="index==list.length-1 ? '' : 'bb1'"><item1 :item="item"></item1></li>
            </ul>
             <div slot="bottom" class="mint-loadmore-bottom">
                <span><img src="../../assets/img/loading.gif" alt=""></span>
            </div>
        </mt-loadmore>
   </div>
     
 </div>
</template>

<script type='text/ecmascript-6'>
import ylSearch from "comm/yl-search.vue";
import item1 from "components/item/item1.vue";
import { Loadmore,Indicator  } from "mint-ui";
import api from "service/api";
import http from "service/http";
export default {
  data() {
    return {
      allLoaded: false,
      topStatus: "",
      bottomStatus: "drop",
      list: [],
      page:1,
      pageTotal:1,
      pageSize:1,
      keyWord:'',
      space:false,
    };
  },
  components: {
    ylSearch,
    item1,
    [Loadmore.name]: Loadmore
  },
  created() {
    // this.fetchData().then(e => {
    //   this.list = e;
    // });
  },
  methods: {
    loadBottom: function () { // 加载更多数据的操作
      this.page++;
      this.fetchData(this.query,this.page,this.pageSize).then(e=>{
          let list = this.list;
          this.list = [...list,...e.list];//数组合并
          this.$refs.loadmore.onBottomLoaded();
          if(this.page === this.pageTotal ){
              this.allLoaded = true;// 若数据已全部获取完毕
          }
      });
    },
    fetchData: async function () {
        let data = {
            page:this.page,
            pageSize:this.pageSize,
            keyWord:this.keyWord
        };
        let url = api.gameListUrl;
        const res = await http.post(url,data);
        return new Promise((resolve)=>{
          if(data.subType){//判断是专题数据，还是游戏列表
             resolve(res.data.data.relGamesInfo);
          }else{
            resolve(res.data.data);
          }
        });
    },
    getdata:function(keyWord){
      Indicator.close();
      Indicator.open();
      this.keyWord = keyWord;
      this.fetchData().then(e=>{
        Indicator.close();
        if(e.list.length == 0){
          this.space = true;
        }else{
          this.space = false;
        }
        this.page= 1;
        this.list= e.list;//数组合并
        this.total = e.total;//总个数
        if(this.total <= this.pageSize ){
            this.pageTotal = 1;
            this.allLoaded = true;// 若数据已全部获取完毕
        }else{
            this.pageTotal = Math.ceil(this.total/this.pageSize);//计算出总的页数
        }
      });
    }
  }
};
</script>

<style scoped lang='less'>
@import url("../../assets/style/class.less");
@import url("../../assets/style/mixin.less");
.search {
  padding: 20px 0;
  border-bottom: 1px solid #ebebeb;
}

.search_space{
  img{
    display: block;
    margin: 70px auto 50px;
    width: 330px;
    height: 220px;
  }
  .txt{
    text-align: center;
    font-size: 28px;
    color: #999999;
  }
}

.list-box{
    li{
        padding: 20px 0;
        &[bb1="bb1"] {
            position: relative;
            &::before {
            position: absolute;
            content: "";
            width: 530px;
            right: 0;
            bottom: 0;
            border-top: 1px solid #ebebeb;
            }
        }
    }
}
</style>
