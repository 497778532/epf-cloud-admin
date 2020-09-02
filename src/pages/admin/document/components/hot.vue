<template>
    <div id="hot">
        <span v-for="item in hotLeng" :key="item"><img  :src="require('@/assets/docu/hot.png')" width="18px" height="18px;"/></span>
        <span
    </div>
</template>
<script>
export default {
    name:'hot',
    props:{
      hotNumber:{
        type:Number
      }
    },
    data(){
        return{
            readNumber:'',
            hotLeng:[],//热度长度
        }
    },
    created(){
      this.changes()
    },
    watch:{
       hotNumber: {
        deep: true,  // 深度监听
            handler(newVal,oldVal) {
            this.changes()
            }
        }
    },
    methods:{
      changes(){
        if( this.hotNumber == null || (this.hotNumber >= 0 && this.hotNumber <= 100 )){
            this.hotLeng = new Array(1)
        }else if(this.hotNumber > 100 && this.hotNumber <= 1000){
            this.hotLeng = new Array(2);
        }else{
            this.hotLeng = new Array(3);
        }
      }
    }
}
</script>
<style scoped>

</style>