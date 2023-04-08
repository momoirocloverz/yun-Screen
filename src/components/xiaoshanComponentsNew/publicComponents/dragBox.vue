<template>
    <div v-if="isShow" class="drag-box" v-drag="greet" :style="{height: height+'px',width: width+'px',position: 'absolute','z-index':zIndex}">

    </div>
</template>

<script>
import Vue from 'vue';
//自定义drag指令
Vue.directive('drag', {
	bind:function (el, binding) {
        let oDiv = el;   //当前元素
        let self = this;  //上下文
        oDiv.onmousedown = function (e) {
            //鼠标按下，计算当前元素距离可视区的距离
            let disX = e.clientX - oDiv.offsetLeft;
            let disY = e.clientY - oDiv.offsetTop;
            document.onmousemove = function (e) {
                //通过事件委托，计算移动的距离 
                let l = e.clientX - disX;
                let t = e.clientY - disY;
                //移动当前元素  
                oDiv.style.left = l + 'px';
                oDiv.style.top = t + 'px';
                //将此时的位置传出去
                // binding.value({x:e.pageX,y:e.pageY}, el)
                binding.value({x:l,y:t}, el)
            };
            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
	}
})
  export default {
    name: '',
    props:{
        height:{
            type:Number,
            default:200
        },
        width:{
            type:Number,
            default:200
        },
        zIndex:{
            type:Number,
            default:100
        },
        isShow:{
            type:Boolean,
            default:false
        }
    },
    data() {
      return {  
      }
    },
    mounted(){
        this.$nextTick(() => {
            const body = document.querySelector("body");
            if (body.append) {
                body.append(this.$el);
            } else {
                body.appendChild(this.$el);
            }
        });
    },
    methods:{
      close(){
          this.$emit('close')
      },
      greet(val) {
        let x = val.x;
        let y = val.y;
        // if (x < 0) x = 0;
        // if (y < 0) y = 0;
        // this.left = x;
        // this.top = y;
        console.log(x,y)
        if(x<=0)x=0
        if(y<=0)y=0
        if(x>=(1920-this.width))x=1920-this.width
        if(y>=(1080-this.height))y=1080-this.height
        this.$el.style.left = x+'px'
        this.$el.style.top = y+'px'
      },
    }
  }
</script>

<style lang="less" scoped>
    .drag-box{
        background: red;
        top: 200px;
        left: 200px;
    }
</style>