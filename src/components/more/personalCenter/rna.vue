<template>
 <div class="content">
   <div class="inputs" v-show="!isSuccess">
        <mt-field :disabled="obj.hasIdCard" class="input1" label="姓名" :placeholder="obj.hasIdCard ? obj.cardInfo.name : '请输入姓名'" v-model="username"></mt-field>
        <mt-field :disabled="obj.hasIdCard" label="身份证" :placeholder="obj.hasIdCard ? obj.cardInfo.id : '请输入身份证'" type="number" v-model="card"></mt-field>
        <mt-button class="btn" size="large" :class="!obj.hasIdCard&&username&&card ? 'mint-button--primary' : 'mint-button--disabled' " @click.native="submit">{{obj.hasIdCard ? '已认证' : '提交验证'}}</mt-button>
   </div>
   <div class="rnasucc"  v-show="isSuccess">
       <img src="../../../assets/img/rnas.png" alt="">
       <div class="txt">实名成功</div>
   </div>
 </div>
</template>

<script type='text/ecmascript-6'>
import { Field, Button, Toast } from "mint-ui";
export default {
  data() {
    return {
      username: "",
      card: "",
      obj: null,
      isSuccess: false
    };
  },
  components: {
    [Field.name]: Field,
    [Button.name]: Button
  },
  created: function() {
    this.obj = this.$route.query.obj;
  },
  methods: {
    submit: function() {
      if (!this.obj.hasIdCard) {
        if (this.username && this.card) {
          if (!this.$fn.isName(this.username)) {
            Toast({
              message: "请输入正确的姓名",
              position: "middle",
              duration: 1000
            });
          } else {
            // console.log(this.$fn.isIdCard(this.card))
            if (this.$fn.isIdCard(this.card)) {
              let data = {
                cardName: this.username,
                cardId: this.card
              };
              this.$fn.fetchData(this.$api.cardAuth, data).then(e => {
                if (e.code === 1000) {
                  // Toast({
                  //     message: '实名成功',
                  //     position: 'middle',
                  //     duration: 1000
                  // });
                  this.isSuccess = true;
                }
              });
            } else {
              Toast({
                message: "身份证号码错误",
                position: "middle",
                duration: 1000
              });
            }
          }
        }
      }
    }
  }
};
</script>

<style scoped lang='less'>
@import "../../../assets/style/mixin.less";
.content {
  height: 100%;
  box-sizing: border-box;
  background: @bg1;
  overflow: hidden;
  .inputs {
    // display: none;
  }
  .input1 {
    margin-top: 35px;
    border-bottom: 1px solid #ebebeb;
  }
  .btn {
    width: 90%;
    margin: 100px auto 0;
  }
  .rnasucc {
    // display:none;
    img {
      width: 220px;
      height: 186px;
      display: block;
      margin: 80px auto 50px;
    }
    .txt {
      text-align: center;
      font-size: 36px;
      color: #333333;
    }
  }
}
</style>
