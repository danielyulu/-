<template>
  <div class="login">
    <div class="maskLayer"></div>
    <div class="dossen-logo"></div>
    <div class="loginForm animated bounce">
      <el-form ref="loginForm" label-position="top" :model="user" label-width="160px" class="puclic-form">
          <div class="logo-iocn">
            One Index
          </div>
          <el-form-item>
            <div data-v-72680f5f="" class="el-input el-input--prefix loginStart">
              <span>用户名：</span>
              <input autocomplete="off" ref="loginUserName" v-model="user.LoginId" placeholder="请输入用户名" type="text" rows="2" validateevent="true" class="el-input__inner">
              <i class="el-input__icon iconfont icon-ai-user loginIconfont"></i>
            </div>
          </el-form-item>
          <el-form-item label="">
            <div data-v-72680f5f="" class="el-input el-input--prefix loginStart">
              <span>密 码：</span>
              <input autocomplete="off" ref="loginPassword" placeholder="请输入密码" v-model="user.Password"  @keyup.enter="login" type="Password" rows="2" validateevent="true" class="el-input__inner">
                <i class="el-input__icon iconfont icon-ai-password loginIconfont"></i>
              <div :class="{animated:true,shake:active}" style="text-align:right;">
                <!-- <span class="forgetPsd" v-on:mouseover="addActive" v-on:mouseout="removeActive">忘记密码登陆?</span> -->
              </div>
            </div>
            
          </el-form-item>
          <el-button type="primary" class="submit" @click="login" style="margin-top: 20px;">登 录</el-button>
      </el-form>
    </div>
  </div>
  
</template>

<script>
import {
  login
} from "@/service/httpRequest"
import {
  setStore,
  clearStore,
} from "@/utils/globalSession";
import { Loading } from 'element-ui';
export default {
  name: 'login',
  created() {
  },
  data () {
    return {
      active: false,
      user:{
        LoginId:'',
        Password:'',
      }
    }
  },
  computed:{
  },
  created() {
    clearStore();  //清除缓存
    document.title = 'One index • 登陆';
    //获取本地用户,实现记住用户名功能.
    // let userId = window.localStorage.getItem('userId');
    // console.log(userId)
    // if(userId) {
    //   this.user.LoginId = userId;
    // }
    // //考虑安全问题,生产暂时不做记住密码功能.
    // if(process.build != 'prod') {
    //   let Password = window.localStorage.getItem('Password');
    //   if(Password) {
    //     this.user.Password = Password;
    //   }
    // }
  },
  methods:{
    login() {
      if(!this.user.LoginId) {
        this.$message({
          showClose: true,
          message: '请输入用户名!',
          type: 'warning'
        });
        let el = this.$refs.loginUserName;
        el.focus();
        return;
      }

      if(!this.user.Password) {
        this.$message({
          showClose: true,
          message: '请输入密码!',
          type: 'warning'
        });
        let el = this.$refs.loginPassword;
        el.focus();
        return;
      }
      const loadingInstance = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      login(this.user, result => {
        if(!result) {
          this.$message({
            showClose: true,
            message: '登陆失败!',
            type: 'warning'
          });
        }
        // if(!result.auth) {
        //   this.$message({
        //     message: result.msg,
        //     type: 'warning',
        //     showClose: true,
        //   });
        // } else {
          setStore('userInfo', result);
          // let permissionModule = {};
          // let permissionPage = {};
          // for(let item of result.permissionList) {
          //   if(item.type == 'Module') {
          //     permissionModule[item.permissionCode] = true;
          //   } else if(item.type == 'Page') {
          //     permissionPage[item.permissionCode] = true;
          //   }
          // }

          //本地永久保存
          window.localStorage.setItem('userId', result.loginId);
          if(process.build != 'prod') {
            window.localStorage.setItem('Password', this.user.Password);
          }
          // setStore('permission-module', permissionModule);
          // setStore('permission-page', permissionPage);

          this.$router.push({
            name: 'home'
          })
        // }
      }, res => {
        loadingInstance.close();
      });
    },
    addActive() {
      this.active = true;
    },
    removeActive() {
      this.active = false;
    }
  },
  mounted() {
    if(this.user.LoginId) {
      let el = this.$refs.loginPassword;
      el.focus();
      return;
    }
    let el = this.$refs.loginUserName;
    el.focus();
  }
}
</script>

<style lang="scss" scoped>
.maskLayer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: #000;
  opacity: 0.5;
}
.logo-iocn {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  width: 260px;
  height: 75px;
  line-height: 75px;
  color: #fff;
  background-size:175% 400%;
}
.login {
  background:url('~@/assets/images/bg.jpg')no-repeat center center;
  width:100%;
  height:100%;  
  position:absolute;
}
.loginForm {
  position: absolute;
  left: 41%;
  top: 28%;
  width: 360px;
  height: 420px;
  padding: 50px;
}
.submit {
  width: 260px;
}
.dossen-logo {
  position: absolute;
  left: 80px;
  top: 35px;
  width: 360px;
  height: 420px;
  background:url('~@/assets/images/dossen-logo.png')no-repeat;  
  padding: 50px;
}
.el-form--label-top .el-form-item__label {
  color: #fff;
}
.loginStart span {
  color: #fff;
}
.loginIconfont {
    position: absolute;
    top: 24px;
    color: #ccc;
}
.forgetPsd:hover {
  color:#58bc58 !important;
}
.forgetPsd {
  text-align:right;
  color:#fff;
  margin-top:5px;
  cursor: pointer;
}
</style>
