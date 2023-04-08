<template>
    <div class="process-out" :style="{'width':outWidth,'height':outHeight,'background':outBgColor}">
        <div class="process-in" :style="{'width':getInWidth,'background':index==1?`linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255,104,37,0.8))`:'linear-gradient(to right, rgba(0, 0, 0, 0), #21b4dd)'}">
            <img src="../../../../assets/img3/dot3.png" alt="" srcset="">
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        props:{
            outWidth:{
                type:String,
                required:true
            },
            outHeight:{
                type:String,
                required:true
            },
            outBgColor:{
                type:String,
                default:"rgba(143,191,255,.1)",
            },
            index:{
                type:Number
            },
            maxNum:{
                type:Number,
                required:true
            },
            currentNum:{
                type:Number,
                required:true
            }
        },
        data() {
            return {
                
            }
        },
        computed:{
            getInWidth(){
                let w_per = (parseFloat(this.currentNum/this.maxNum).toFixed(2))*100
                return w_per+"%"
            }
        }
    }
</script>

<style lang="less" scoped>
    .process-out{
        .process-in{
            height: 100%;
            position: relative;
            img{
                width: 22px;
                height: 22px;
                position: absolute;
                right: -11px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
</style>