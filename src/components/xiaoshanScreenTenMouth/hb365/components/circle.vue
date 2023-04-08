<template>
  <div class="canvas-wrapper">
    <canvas class="canvas" :id="id" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
export default {
  name: "canvasCircle",
  data() {
    return {};
  },
  /*
    params对象
    @id: 画布id
    @width: 画布宽
    @height: 画布高
    @percente: 圆环百分比, 范围[0, 100]
    @radius: 半径
    @lineWidth: 环宽
    @innerColor: 内圈范围值颜色
    @outerColor: 外圈范围值颜色
    @text: 显示文字
    @textColor: 文字颜色
  */
  props: {
    // params: {
    //   type: Object,
    //   required: true
    // },
    id: {
      type: String,
      required: true
    },
    percente: {
      type: Number,
      default: 50
    },
    text: {
      type: String,
      default: ""
    },
    textColor: {
      type: String,
      default: "#fff"
    },
    lineWidth: {
      type: Number,
      default: 5
    },
    radius: {
      type: Number,
      default: 70
    },
    outerColor: {
      type: String,
      default: "rgba(32,68,95,1)"
    },
    innerColor: {
      type: String,
      default: "rgba(242,167,34,1)"
    },
    width: {
      type: Number,
      default: 180
    },
    height: {
      type: Number,
      default: 180
    },
    logo: {
      type: String,
      default: "1"
    }
  },
  watch: {
    logo() {
      this.initDraw();
    }
  },
  mounted() {
    this.initDraw();
  },
  methods: {
    // 初始化数据
    initDraw() {
      this.canvas = document.getElementById(this.id);
      this.context = this.canvas.getContext("2d");
      this.centerX = this.canvas.width / 2;
      this.centerY = this.canvas.width / 2;
      this.percente = this.percente;
      this.innerColor = this.innerColor;
      this.outerColor = this.outerColor;
      this.width = this.width;
      this.height = this.height;
      this.radius = this.radius;
      this.lineWidth = this.lineWidth;
      this.text = this.text;
      this.textColor = this.textColor;
      this.speed = 0;
      window.requestAnimationFrame(this.drawMain);
    },
    // 开始绘制
    drawMain() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.backgroundCircle();
      this.drawPoint();
      this.drawText();
      this.foregroundCircle(this.speed);
      if (this.speed < this.percente) {
        this.speed += 1;
        window.requestAnimationFrame(this.drawMain);
      }
    },
    // 绘制背景圆圈
    backgroundCircle() {
      this.context.save(); // save和restore可以保证样式属性只运用于该段canvas元素
      this.context.beginPath();
      this.context.lineWidth = this.lineWidth; // 设置线宽
      this.context.lineCap = "round"; // 圆环末端类型 [可填] 默认:butt (平滑);round (圆形线帽)
      this.context.strokeStyle = this.outerColor;
      this.context.arc(
        this.centerX,
        this.centerY,
        this.radius,
        1.5 * Math.PI,
        0 * Math.PI,
        true
      );
      // 用于绘制圆弧this.context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
      this.context.stroke();
      this.context.closePath();
      this.context.restore();
    },
    // 绘制进度圆环
    foregroundCircle(n) {
      this.context.save();
      this.context.strokeStyle = this.innerColor;
      this.context.lineWidth = this.lineWidth;
      this.context.lineCap = "round";
      this.context.beginPath();
      this.context.arc(
        this.centerX,
        this.centerY,
        this.radius,
        1.5 * Math.PI,
        Math.PI * (1.5 - (n * 1.5) / 100),
        true
      );
      this.context.stroke();
      this.context.closePath();
      this.context.restore();
    },
    // 绘制文字前的点
    drawPoint() {
      this.context.save();
      this.context.beginPath();
      this.context.arc(
        this.centerX + 10,
        this.centerY - this.radius - this.lineWidth / 2 + this.lineWidth / 2,
        this.lineWidth / 2,
        Math.PI * 2,
        0,
        false
      );
      this.context.fillStyle = this.innerColor;
      this.context.fill();
      this.context.closePath();
      this.context.restore();
    },
    // 绘制文字
    drawText() {
      this.context.save();
      this.context.fillStyle = this.textColor;
      let fontSize = 16;
      this.context.font = fontSize + "px Helvetica";
      // let textWidth = this.context.measureText(n + '%').width
      this.context.fillText(
        this.text,
        this.centerX + 25,
        this.centerY - this.radius - this.lineWidth / 2 + fontSize / 2
      );
      this.context.restore();
    }
  }
};
</script>

<style scoped lang="less">
.canvas-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .canvas {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
