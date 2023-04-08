<template>
  <div>
    <div class="outer_label">
      <img
        class="login_bg"
        src="@/assets/login/login_bg.png"
      />
      <div
        class="login_tit"
        style="font-size:36px;color:#FFF;right:6%"
      >
        萧山文物安全监管平台
      </div>
    </div>
    <div class="login_form_box">
      <img
        class="login_lab"
        src="@/assets/login/login_lab_red.png"
      />
      <div class="row_ipt row_ipt_top">
        <el-input
          class="ipt_login"
          placeholder="用户名"
          v-model="userName"
          clearable
        >
          <template slot="prepend"><img
              class="login_icon"
              src="@/assets/login/user.png"
            /></template>
        </el-input>
      </div>
      <div class="row_ipt">
        <el-input
          class="ipt_login"
          placeholder="密码"
          v-model="password"
          show-password
        >
          <template slot="prepend"><img
              class="login_icon"
              src="@/assets/login/password.png"
            /></template>
        </el-input>
      </div>

      <el-button
        class="login_btn"
        @click.native="login"
        type="primary"
        :loading="isBtnLoading"
      >登&nbsp;&nbsp;&nbsp;录
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      userName: '',
      password: '',
      isBtnLoading: false,
    }
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登录中...'
      return '登录'
    },
  },
  methods: {
    login() {
      if (!this.userName) {
        this.$message.error('请输入用户名')
        return
      }
      if (!this.password) {
        this.$message.error('请输入密码')
        return
      }
      this.isBtnLoading = true
      if (this.userName === 'admin' && this.password === '123456') {
        // window.isShowAuthor = true
        userInfo.userName = this.userName
        userInfo.passWord = this.password
        localStorage.setItem('userName', this.userName)
        localStorage.setItem('passWord', this.password)
        this.$router.push('/')
      } else {
        this.$message.error('用户名或密码错误！')
        setTimeout(() => {
          this.isBtnLoading = false
        }, 3000)
        return
      }
    },
    forgetPassword() {
      this.$message({
        message: '',
        duration: 5000,
        type: 'success',
      })
    },
  },
}
</script>

<style scoped>
.login_form_box {
  width: 415px !important;
  background: rgba(255, 255, 255, 0.5);
  padding: 30px;
  box-sizing: border-box;
  position: fixed;
  top: 30%;
  right: 10%;
  border-radius: 8px;
  z-index: 10000;
}

.login_tit {
  width: 500px;
  position: fixed;
  top: 22%;
  right: 9%;
  z-index: 10000;
}

.login_lab {
  width: 36%;
  height: 13%;
  position: absolute;
  top: 0;
  left: 30px;
}

.login_icon {
  width: 20px;
  height: 20px;
}

.login_btn {
  width: 100%;
  font-size: 17px;
  font-family: '黑体';
  background: #2965c3; /* 标准的语法 */
}

.login_btn:hover {
  background: #1dcaf0;
}

.row_ipt {
  display: flex;
  margin-bottom: 20px;
}

.row_user {
  width: 100%;
  text-align: right;
  margin-bottom: 25px;
}

.row_ipt /deep/ .el-input__inner {
  background-color: #f8f2f2 !important;
  color: #333;
}

.row_ipt /deep/ .el-input-group__prepend {
  padding: 0 10px !important;
  background-color: #8a9eac !important;
}

.row_ipt /deep/ .el-input__icon {
  color: #333 !important;
}

.row_ipt_top {
  margin-top: 40px;
}

.user_text {
  text-align: right;
  width: 60px;
  font-size: 14px;
  color: #eee;
  cursor: pointer;
}

.login_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10000;
}
</style>
