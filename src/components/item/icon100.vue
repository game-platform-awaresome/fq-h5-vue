<template>
 <div class="imgbox">
     <img v-lazy="imgsrc" alt="">
 </div>
</template>

<script type='text/ecmascript-6'>
 export default {
    props:['imgsrc'],
    data () {
        return {
            list:[],
        }
    },
    components: {

    },
    created(){
    }
 }
</script>

<style scoped lang='less'>
@import url("../../assets/style/class.less");

.imgbox {
    .fimgbox(100px,100px,20px);
}
</style>
