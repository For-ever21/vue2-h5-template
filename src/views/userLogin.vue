<template>
  <section class="login">
    <!-- <header class="header"></header> -->
    <div class="wrapper">
      <div class="logo">
        <img src="@/assets/images/logo_r.png" alt="" />
      </div>
      <h2 :style="styleVar" class="title">登录爱问医生</h2>
      <div class="login-form">
        <div class="cell">
          <input
            v-model="loginForm.phone"
            type="tel"
            class="field_control"
            placeholder="请输入手机号"
            @focus="handleFocus('phone')"
          />
          <div
            :class="[sms.disabled ? 'field_btn field_disabled' : 'field_btn']"
            @click="handleGetSmsCode"
          >
            {{ sms.disabled ? `${sms.countTime}s` : sms.text }}
          </div>
        </div>
        <div class="cell">
          <input
            v-model="loginForm.sms"
            type="tel"
            class="field_control"
            maxlength="6"
            placeholder="请输入验证码"
          />
        </div>
      </div>
      <div :style="styleVar" class="policy">
        <div class="policy_checkbox" @click="handleCheckPolicy">
          <div :class="[checkedPolicy ? 'ischecked' : 'uncheck']"></div>
        </div>
        <div class="policy_text">
          同意
          <a href="https://health.sina.cn/zt/app/rules">《爱问医生用户协议》</a>
          与
          <a href="https://health.sina.cn/zt/agreement/patient">《隐私条款》</a>
        </div>
      </div>
      <div
        class="login-btn"
        :class="[formState.disabled ? 'disabled' : '', formState.loading ? 'loading' : '']"
        @click="handleLogin"
      >
        <span>登录</span>
      </div>
      <div class="tip">未注册手机号验证后将自动注册新账号</div>
    </div>
    <div class="demo">
      <div v-if="platform === 'weixin'" class="btn" @click="handleWxLogin">微信授权登录-new</div>
      <div v-if="platform === 'weibo'" class="btn" @click="handleWeiboLogin">微博授权-new</div>
      <div v-if="platform === 'weixin'" class="btn" @click="handleWxLogin2">微信授权登录-old</div>
      <div v-if="platform === 'weibo'" class="btn" @click="handleWeiboLogin2">微博授权-old</div>
    </div>
    <footer class="footer h5">
      <!-- App端 第三方登录 -->
      <div v-if="device === 'app'" class="third_login">
        <img class="weixin" src="@/assets/images/weixin.png" alt="" />
        <img class="weibo" src="@/assets/images/weibo.png" alt="" />
      </div>
      <!-- 广告 -->
      <div v-if="device === 'browser'" class="ad_contain" v-show="isShowAd">
        <div class="logo_s">
          <img src="@/assets/images/logo_s.png" alt="" />
        </div>
        <div class="desc">
          <span>使用APP</span>
          <p>体验更多优质服务</p>
        </div>
        <div class="action" @click="handleDownloadApp">下载APP</div>
        <div class="close" @click="handleCloseAd">
          <img src="@/assets/images/close.png" alt="" />
        </div>
      </div>
    </footer>
  </section>
</template>

<script lang="ts">
  import { Vue, Component, Watch } from "vue-property-decorator";

  import {
    getSmsCode,
    generateCodeUrl,
    phoneLoginApi,
    weiboLoginApi,
    weixinLoginApi,
  } from "@/api/user";

  import {
    UserTypeEnum,
    LoginSourceEnum,
    DeviceEnum,
    // LoginTypeEnum,
    WeixinTypeEnum,
  } from "@/enums/businessEnum";

  import { isValidMobileS } from "@/utils/validateUtil";

  import { Toast } from "@/hooks/web/useToast";

  let smsTimer: any = {};

  @Component({
    name: "UserLogin",
  })
  export default class UserLogin extends Vue {
    private checkedPolicy = false; // 是否勾选协议
    private isShowAd = true; // 是否展示 广告位
    private device: string = window.$device; // 设备
    private platform: string = window.$platform; // 平台
    private weiboResult: any = {}; // 微博授权返回的信息
    private weixinResult: any = {}; // 微信授权返回的信息
    private loginForm = {
      // 登录表单
      phone: "",
      sms: "",
    };
    private formState = {
      // 表单状态
      loading: false,
      disabled: true,
    };
    private sms = {
      text: "获取验证码",
      countTime: 60,
      disabled: false,
    };
    private styleVar = {
      "--space": "60px",
    };
    get code() {
      return (this as any).$route.query.code;
    }
    get state() {
      return (this as any).$route.query.state;
    }
    get redirect_uri() {
      return (this as any).$route.query.redirect_uri;
    }

    @Watch("loginForm", { deep: true })
    private onInputChange() {
      // 监听手机号，验证码输入
      if (isValidMobileS(this.loginForm.phone) && this.loginForm.sms.length === 6) {
        this.formState.disabled = false;
      } else {
        this.formState.disabled = true;
      }
    }
    public created() {
      // 判断是否有登录态
      const hasToken = false;
      if (hasToken) {
        // 有 token 返回原来地址
        this.$router.go(-1);
      }
      this.thirdAuth();
    }
    private thirdAuth() {
      console.log("platform", this.platform);
      if (this.platform === "weixin" && this.code) {
        // 回调页面获取 code，进行微信授权登录 后台调接口
        const params = {
          code: this.code,
          weixinType: WeixinTypeEnum.WEB,
        };
        weixinLoginApi(params).then((res) => {
          if (res && res.token) {
            this.weixinResult = res;
            localStorage.setItem("aiwen_user_token", res.token);
            sessionStorage.setItem("aiwen_user_userinfo", res.nickName);
            window.location.href = this.redirect_uri;
          } else {
            // 展示手机号登录页面
            Toast("进行手机号登录操作");
          }
        });
      } else if (this.platform === "weibo" && this.code) {
        // 回调页面获取 code，进行微博授权登录 后台调接口
        const params = {
          code: this.code,
        };
        weiboLoginApi(params).then((res) => {
          if (res && res.token) {
            // 有返回 token 证明已经绑定手机号，返回原页面
            this.weiboResult = res;
            localStorage.setItem("aiwen_user_token", res.token);
            sessionStorage.setItem("aiwen_user_userinfo", res.nickName);
            window.location.href = this.redirect_uri;
          } else {
            // 展示手机号登录页面
            Toast("进行手机号登录操作");
          }
        });
      }
    }
    public handleCheckPolicy() {
      this.checkedPolicy = !this.checkedPolicy;
    }
    public handleFocus() {
      this.styleVar["--space"] = "40px";
    }
    public handleBlur() {
      this.styleVar["--space"] = "60px";
    }
    // 微信授权登录 new
    public handleWxLogin() {
      // appID
      let appID = `wx9d5ab02fea68ed0a`;
      // appsecret
      // let appSerect = `f464746a86b3863ce9b820a40e2aac8a`;
      //点击授权后重定向url地址
      // /aiwen/login/
      let redirectUrl = `/aiwen/`;
      // https://for-ever21.github.io
      let host = `http://127.0.0.1:8080`;
      //微信授权api,接口返回code,点击授权后跳转到重定向地址并带上code参数
      let authorizeUrl =
        `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=` +
        `${host}${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=` +
        `STATE&connect_redirect=1#wechat_redirect`;

      window.location.href = authorizeUrl;
    }
    // 微信授权登录 old
    public handleWxLogin2() {
      this.generateCode("weixin");
    }
    // 微博 授权登录 new
    public handleWeiboLogin() {
      // clientId
      let clientId = `1595087667`; // 申请应用时分配的AppKey。
      // appsecret
      // let appSerect = `f464746a86b3863ce9b820a40e2aac8a`;
      //点击授权后重定向url地址
      let redirectUrl = `/aiwen/`;
      let host = `http://10.220.200.17:8080`;
      // 开发者可以用这个参数验证请求有效性，也可以记录用户请求授权页前的位置
      let state = "STATE";
      //微信授权api,接口返回code,点击授权后跳转到重定向地址并带上code参数
      let authorizeUrl =
        `https://api.weibo.com/oauth2/authorize?client_id=${clientId}&redirect_uri=` +
        `${host}${redirectUrl}&response_type=code&display=mobile&state=` +
        `${state}`;

      window.location.href = authorizeUrl;
    }
    // 微博 授权登录 old
    public handleWeiboLogin2() {
      this.generateCode("weibo");
    }
    public generateCode(providerType: string) {
      const params = {
        providerType: providerType,
        userType: UserTypeEnum.USER,
        authType: "login",
        projectName: "patient",
        resourceUrl: "https://for-ever21.github.io/aiwen/login",
        source: "h5",
        scope: "snsapi_userinfo",
      };
      generateCodeUrl(params).then((res) => {
        console.log("res", res);
        window.location.href = res;
      });
    }
    // 获取验证码
    public async handleGetSmsCode() {
      if (this.sms.disabled) {
        return false;
      }
      if (!this.loginForm.phone) {
        Toast("请输入手机号");
        return false;
      }
      if (!isValidMobileS(this.loginForm.phone)) {
        Toast("请输入正确的手机号");
        return false;
      }
      this.loginForm.sms = "";
      this.sms.countTime = 10;
      try {
        const params = {
          phone: this.loginForm.phone,
          userCode: UserTypeEnum.USER,
        };
        await getSmsCode(params);
        this.sms.disabled = true;
        clearTimeout(smsTimer);
        smsTimer = setInterval(() => {
          this.sms.countTime--;
          if (this.sms.countTime === 0) {
            this.sms.disabled = false;
            this.sms.text = "重新获取";
            clearTimeout(smsTimer);
          }
        }, 1000);
      } catch (err) {
        this.sms.disabled = false;
        if (err.code === 10014) {
          // 超过特定次数，进行图形验证码验证
          // isShowPicCode = true
          // refreshCode()
        } else if (err.code === 10015) {
          // 请重新获取图形验证码
          // refreshCode()
        } else {
          Toast("验证码发送失败，请重试");
        }
      }
    }
    // 登录操作
    public async handleLogin() {
      if (this.formState.loading) {
        return false;
      }
      if (!this.loginForm.phone) {
        Toast("请输入手机号");
        return false;
      }
      if (!isValidMobileS(this.loginForm.phone)) {
        Toast("请输入正确的手机号");
        return false;
      }
      if (this.loginForm.sms.length !== 6) {
        Toast("请输入正确的验证码");
        return false;
      }
      if (!this.checkedPolicy) {
        Toast("请勾选用户协议");
        return false;
      }
      try {
        this.formState.loading = true;
        const params: any = {
          phone: this.loginForm.phone,
          checkNum: this.loginForm.sms,
          loginSource: LoginSourceEnum.PATIENT,
          source: DeviceEnum.H5,
          // loginType: LoginTypeEnum.APP,
          // userType: UserTypeEnum.USER,
        };
        if (this.weiboResult.registered) {
          params.weiBoRegistered = true;
          params.weiboUid = this.weiboResult.weiboUid;
        }
        if (this.weixinResult.registered) {
          params.weiXinRegistered = true;
          params.weixinType = WeixinTypeEnum.WEB;
          params.unionId = this.weixinResult.unionId;
        }
        const data = await phoneLoginApi(params);
        this.formState.loading = false;
        console.log("data", data);
      } catch (err) {
        this.formState.loading = false;
        return null;
      }
    }
    // 跳转下载APP页，或者唤醒APP
    public handleDownloadApp() {
      console.log("handleDownloadApp");
    }
    // 关闭广告栏
    public handleCloseAd() {
      console.log("handleCloseAd");
      this.isShowAd = false;
    }
  }
</script>
<style scoped lang="less">
  @import "~@/assets/styles/var.less";
  .login {
    min-height: 100vh;
    .header {
      height: 40px;
    }
    .wrapper {
      padding: 0 40px;
      padding-top: 40px;
      .logo {
        margin: 0 auto;
        margin-bottom: 15px;
        width: 76px;
        height: 76px;
        border-radius: 50%;
        // background: #664ae1;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        height: 33px;
        font-size: 24px;
        font-weight: 600;
        color: #2d2d2d;
        line-height: 33px;
        margin-bottom: var(--space); // 键盘弹起 为 40
        text-align: center;
      }
      .login-form {
        .cell {
          width: 100%;
          background: #f8f8fa;
          border-radius: 25px;
          height: 50px;
          line-height: 50px;
          padding: 0 16px 0 20px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          position: relative;
          .field_control {
            border: none;
            height: 50px;
            background: #f8f8fa;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            caret-color: #664ae1;
            resize: none;
            &:focus {
              outline: none;
            }
          }
          .field_btn {
            font-weight: 400;
            color: #664ae1;
            position: absolute;
            right: 18px;
            top: 0;
            &.field_disabled {
              color: #bbbbbb;
            }
          }
        }
      }
      .policy {
        margin: 0 0 var(--space) 0; // 键盘弹起 为 40
        // padding: 0 15px;
        height: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        a {
          color: #664ae1;
        }
        .policy_text {
          margin-left: 8px;
          letter-spacing: 0;
        }
        .policy_checkbox {
          width: 14px;
          height: 14px;
        }
        .uncheck,
        .ischecked {
          border: 1px solid #999999;
          width: 14px;
          height: 14px;
          border-radius: 50%;
        }
        .ischecked::after {
          content: "";
          display: block;
          width: 8px;
          height: 8px;
          background: #664ae1;
          border-radius: 50%;
          position: relative;
          top: 2px;
          left: 2px;
        }
      }
      .login-btn {
        margin-bottom: 10px;
        height: 50px;
        line-height: 50px;
        background: #664ae1;
        border-radius: 25px;
        text-align: center;
        &.disabled {
          background: #cccccc;
        }
        &.loading {
          opacity: 0.5;
        }
        span {
          color: #fff;
        }
      }
      .tip {
        font-weight: 400;
        color: #bbbbbb;
        line-height: 20px;
        text-align: center;
      }
    }
    .demo {
      padding: 10px 0;
      .btn {
        display: inline-block;
        padding: 10px;
      }
    }
    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      &.app {
        bottom: 40px;
      }
      &.h5 {
        bottom: 10px;
        padding: 0 10px;
      }
      .third_login {
        width: 100%;
        text-align: center;
        img {
          width: 50px;
          height: 50px;
        }
        .weibo {
          margin-left: 40px;
        }
      }
      .ad_contain {
        height: 60px;
        background: #5f5f5f;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 32px 0 10px;
        position: relative;
        .logo_s {
          width: 40px;
          height: 40px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .desc {
          flex: 1;
          margin-left: 9px;
          span {
            font-size: 17px;
            color: #f5f5f5;
          }
          p {
            color: #999999;
          }
        }
        .action {
          width: 100px;
          height: 34px;
          background: #664ae1;
          border-radius: 17px;
          line-height: 34px;
          text-align: center;
          color: #fff;
        }
        .close {
          width: 12px;
          height: 12px;
          position: absolute;
          right: 10px;
          top: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
