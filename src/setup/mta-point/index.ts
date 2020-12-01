import Vue from "vue";
import logger from "aiwen-logger";
export function setupMtaPoint(app: AnyObject) {
  console.log(app);
  const isProd = process.env.NODE_ENV === "production";
  if (isProd) {
    // initBaiduPoint();
    initSensors();
  }
}

// 初始化百度埋点
export function initBaiduPoint() {
  (function () {
    const hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?be80a72ce8e8dea7f5e034c8edea95c1";
    const s = document.getElementsByTagName("script")[0];
    (s as any).parentNode.insertBefore(hm, s);
  })();
}

// 初始化神策全埋点
export function initSensors() {
  const isProd = process.env.NODE_ENV === "production";
  // 开启debug模式，不会上送数据至神策，但是会在控制台输出采集的日志数据，适用于开发接入阶段。
  // logger.env = "debug";
  /**设置公共属性 */
  logger.setPublicProperty({
    platformType: "Web(H5)", // 根据产品给定的名称设置
    appName: "爱问医生(新浪健康登录)", // 根据产品给定的名称设置
    isLogin: function () {
      return false;
    },
    channelId: function () {
      return logger.getQueryString(window.location.href, "channel") || "";
    },
    partName: "中台-登录注册", // 根据产品给定的名称设置
  });
  // 设置神策具体的配置，此处logger内部做了单页面默认配置。日志上送地址，测试环境地址：XXX
  // 生产环境的地址：XXX。setConfig方法内部会做与extend相同的操作，传入的配置，会覆盖掉内部的默认配置。
  logger.setConfig({
    server_url: isProd
      ? "https://sensors.wenwo.com/sa?project=production"
      : "https://sensors.wenwo.com/sa?project=default", // 日志数据上送地址
    show_log: true, //控制台日志输出开关
    is_track_single_page: true,
  });
  /** 所有设置配置完毕开启日志采集 ，不要随便开启，以免污染测试环境的数据 */
  // logger.start();
  // 用户关联，把登陆前的匿名id和登录后的用户id关联起来。
  // logger.login(用户id);
  /** 全局注入 */
  Vue.use(logger);
}
