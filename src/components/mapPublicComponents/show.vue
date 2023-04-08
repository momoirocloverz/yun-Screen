<template>
  <div class="page-container">
    <div v-if="musicShow">
      <!-- <el-button type="text" @click="handlePlay(scope.row)">播放</el-button> -->
      <!-- <audio :src="music_src" autoplay="autoplay" controls="controls" ref="audio">Your browser does not support the
        audio
        element.</audio> -->
      <audio :src="music_src" controls="controls"></audio>
    </div>

    <div v-if="excelShow">
      <el-table :data="excelData" style="width: 100%">
        <el-table-column
          v-for="(value, key, index) in excelData[2]"
          :key="index"
          :prop="key"
          :label="key"
        >
        </el-table-column>
      </el-table>
    </div>

    <div v-if="imageShow">
      <vue-viewer
        multiple
        style="display: inline-block"
        list-ul-class="image-list"
        :thumb="imageList"
        :full="imageList"
      >
      </vue-viewer>
    </div>

    <div v-if="wordShow">
      <!-- <van-nav-bar
        title="预览doc"
        left-text="返回"
        left-arrow
        class="title"
        @click-left="onClickLeft"
        fixed
        :placeholder="isFixedHeight"
      /> -->
      <div class="word-wrap">
        <div id="wordView" v-html="wordText" />
      </div>
    </div>

    <div v-if="pdfShow">
      <div class="main">
        <pdf
          :src="src"
          :page="currentPage"
          @progress="loadedRatio = $event"
          @loaded="loadPdfHandler"
          @num-pages="pageCount = $event"
          @page-loaded="currentPage = $event"
          ref="wrapper"
          class="pdf"
        ></pdf>
      </div>
      <ul class="footers">
        <li
          :class="{ select: idx == 0 }"
          @touchstart="idx = 0"
          @touchend="idx = -1"
          @click="scaleD"
        >
          <p class="more-p">放大</p>
        </li>
        <li
          :class="{ select: idx == 1 }"
          @touchstart="idx = 1"
          @touchend="idx = -1"
          @click="scaleX"
        >
          <p class="small-p">缩小</p>
        </li>
        <li
          :class="{ select: idx == 2 }"
          @touchstart="idx = 2"
          @touchend="idx = -1"
          @click="changePdfPage(0)"
        >
          <p class="up-p">上一页</p>
        </li>
        <li
          :class="{ select: idx == 3 }"
          @touchstart="idx = 3"
          @touchend="idx = -1"
          @click="changePdfPage(1)"
        >
          <p class="down-p">下一页</p>
        </li>
        <li>
          <p>当前第{{ currentPage }}页/共{{ pageCount }}页</p>
        </li>
        <!-- <li class="home">
        <a href="/">返回首页</a>
      </li> -->
      </ul>
    </div>
  </div>
</template>
<script>
//pdf
import pdf from "vue-pdf";
//word
import mammoth from "mammoth";
//excel
// import XLSX from "xlsx";
export default {
  components: {
    pdf,
    mammoth
    // XLSX
  },

  props: {
    value: {
      type: Object,
      default: () => Object.create({})
    }
  },
  data() {
    return {
      pdfShow: false,
      imageShow: false,
      wordShow: false,
      excelShow: false,
      musicShow: false,
      //music
      music_src:
        "http://localhost/admin/cmd/v1/storage/view/3ee9abc5-e864-40ed-86a7-6fb4a637ae67.m4a",

      //excel
      excelData: [],
      workbook: {},
      excelURL:
        "http://localhost/admin/cmd/v1/storage/view/164b2347-aa3a-443e-b771-afd71877c02f.xls",

      //word
      isFixedHeight: true,
      wordURL: "",
      wordText: "",

      //pdf
      currentPage: 1, // 当前页码
      pageCount: 0, // 总页码
      scale: 100,
      idx: -1,
      loadedRatio: 0,
      src: "/xf.pdf",

      //image
      image: "",
      imageList: []
    };
  },
  mounted() {},
  created() {
    var type = this.value.type;
    var baseUrl = "http://223.65.209.139:18180/admin/cmd/v1/storage/view/";
    var path = this.value.path;
    path = baseUrl + path;

    if (type == "图片") {
      this.imageShow = true;
      this.pdfShow = false;
      this.wordShow = false;
      this.excelShow = false;
      this.musicShow = false;
      this.imageList = [];
      this.imageList.push(path);
    } else if (type == "PDF") {
      this.pdfShow = true;
      this.imageShow = false;
      this.wordShow = false;
      this.excelShow = false;
      this.musicShow = false;
      this.src = path;
    } else if (type == "DOC") {
      this.pdfShow = false;
      this.imageShow = false;
      this.wordShow = true;
      this.excelShow = false;
      this.musicShow = false;
      this.wordURL = path;
      this.getWordText();
    } else if (type == "EXCEL") {
      this.pdfShow = false;
      this.imageShow = false;
      this.wordShow = false;
      this.musicShow = false;
      this.excelShow = true;
      // this.excelURL = path
      // alert(this.excelURL)
      this.readWorkbookFromRemoteFile(this.excelURL);
    } else if (type == "音乐") {
      this.pdfShow = false;
      this.imageShow = false;
      this.wordShow = false;
      this.musicShow = true;
      this.excelShow = false;
      // this.handlePlay(path)
      this.$refs.audio.play();
    }
  },
  methods: {
    //播放组件
    handlePlay(path) {
      this.src = path;
      this.play();
    },
    //播放
    play() {
      // this.dialogVisible = true;
      this.$refs.audio.play();
    },
    //音频暂停
    stop() {
      // this.dialogVisible = false;
      this.$refs.audio.pause();
      this.$refs.audio.currentTime = 0;
    },

    //excel
    // 在线查看excel文件
    readWorkbookFromRemoteFile: function(url) {
      var xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.responseType = "arraybuffer";
      let _this = this;
      xhr.onload = function(e) {
        if (xhr.status === 200) {
          alert(xhr.status);
          var data = new Uint8Array(xhr.response);
          console.log(data);
          var workbook = XLSX.read(data, { type: "array" });
          alert("s1");
          console.log("workbook", workbook);

          var sheetNames = workbook.SheetNames; // 工作表名称集合
          _this.workbook = workbook;
          _this.getTable(sheetNames[0]);
        }
      };
      xhr.send();
    },
    getTable(sheetName) {
      console.log(sheetName);
      var worksheet = this.workbook.Sheets[sheetName];
      this.excelData = XLSX.utils.sheet_to_json(worksheet);
      console.log("this.excelData:" + this.excelData);
    },

    //word
    //返回键
    onClickLeft() {
      this.$router.go(-1);
    },
    getWordText() {
      const xhr = new XMLHttpRequest();
      xhr.open("get", this.wordURL, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = () => {
        if (xhr.status == 200) {
          mammoth
            .convertToHtml({ arrayBuffer: new Uint8Array(xhr.response) })
            .then(resultObject => {
              this.$nextTick(() => {
                this.wordText = resultObject.value;
              });
            });
        }
      };
      xhr.send();
    },

    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
      }
      console.log(this.currentPage);
      console.log(this.pageCount);
    },
    goBack() {
      this.$router.go(-1);
    },
    // pdf加载时
    loadPdfHandler(e) {
      this.currentPage = 1; // 加载的时候先加载第一页
    },
    //放大
    scaleD() {
      this.scale += 5;
      this.$refs.wrapper.$el.style.width = parseInt(this.scale) + "%";
    },

    //缩小
    scaleX() {
      if (this.scale == 100) {
        return;
      }
      this.scale += -5;
      this.$refs.wrapper.$el.style.width = parseInt(this.scale) + "%";
    },

    create() {
      this.src = pdf.createLoadingTask(this.src); // 处理一下跨域
    }
  }
};
</script>

<style>
.image-list {
  margin: 0;
  padding: 0;
}

.image-list li {
  display: inline-block;
  margin: 0 10px;
  list-style: none;
  position: relative;
}

.image-list li img {
  box-shadow: 0 0 5px #333;
}

.icon-remove {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  background: #f33;
  position: absolute;
  top: -10px;
  right: -10px;
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
}

a {
  color: #42b983;
}

.viewer-canvas img {
  width: 25vw !important;
  height: auto !important;
  margin-top: 0 !important;
  margin-left: 0 !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  margin: auto !important;
}

/* .home {
    margin-left: 30px;
  }

  .home a {
    font-size: 16px;
    color: #fff;
  }

  .pdf {
    width: 60%;
    margin: 0 auto;
  }

  .main {
    overflow: hidden;
  } */

.footers {
  position: fixed;
  bottom: 0;
  width: 47%;
  display: flex;
  z-index: 100;
  color: #fff;
  border-top: 1px solid #f0f0f0;
  background: rgba(0, 0, 0, 0.4);
  line-height: 30px;
  height: 50px;
}

.li {
  text-align: center;
  flex: 1;
  padding: 5px;
  cursor: pointer;
}

.ul {
  list-style: none;
}

.more-p {
  margin-right: 40px;
  margin-left: 40px;
  cursor: pointer;
}

.small-p {
  margin-right: 40px;
  cursor: pointer;
}

.up-p {
  margin-right: 40px;
  cursor: pointer;
}

.down-p {
  border-radius: 0 none;
  cursor: pointer;
  margin-right: 50px;
}

/* word */
.word-wrap {
  padding: 15px;

  /*img {*/
  /*  width: 100%;*/
  /*}*/
}

.title {
}
</style>
