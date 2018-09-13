<template>
 <div>
    <label for="code">
      <ul class="security-code-container">
        <li class="field-wrap"  v-for="(item, index) in number" :key="index" :class="index == value.length ? 'active' : ''">
            {{value[index]}}
            <i></i>
        </li>
      </ul>
    </label>
    <input ref="input" class="input-code" @keyup="handleInput($event)" v-model="value"
           id="code" name="code" type="number" :maxlength="number"
           autocorrect="off" autocomplete="off" autocapitalize="off">

 </div>
</template>

<script type='text/ecmascript-6'>
 export default {
    props:{
        number:{
            type:Number,
            default: 6
        }
    },
   data () {
     return {
         value:''
     }
   },
   components: {

   },
   methods:{
       handleSubmit() {
            this.$emit('input', this.value)
        },
        handleInput(e) {
            this.$refs.input.value = this.value
            if (this.value.length >= this.number) {
                this.hideKeyboard()
            }
            this.handleSubmit()
        },
        hideKeyboard() {
            // 输入完成隐藏键盘
            document.activeElement.blur() // ios隐藏键盘
            this.$refs.input.blur() // android隐藏键盘
        }
   }
 }
</script>

<style scoped lang='less'>
.input-code {
    position: absolute;
    left: -9999px;
    top: -99999px;
    width: 0;
    height: 0;
    opacity: 0;
    overflow: visible;
    z-index: -1;
}
.security-code-container{
    width: 100%;
    height: 100px;
    line-height: 100px;
    color:#333333;
    display:flex;
    text-align: center;
    li{
        flex:1;
        margin-right: 20px;
        border-bottom:1px solid #000000;
        position: relative;
        font-size: 42px;
        &:last-child{
            margin-right: 0;
        }
        &.active i{
            position:absolute;
            width: 0px;
            height: 40px;
            border-left:1px solid #c0e8ff;
            left:50%;
            top:30px;
        }
    }
}
 
</style>
