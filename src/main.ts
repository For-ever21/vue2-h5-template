import Vue from "vue";
import router from "./router";
import store from "@/store";

import { setupMobileFit } from "@/setup/mobie-fit";
import { setupErrorHandle } from "@/setup/error-handle";
import { setupMtaPoint } from "@/setup/mta-point";

import App from "./App.vue";

// 移动端适配
setupMobileFit(Vue);

// 装配 global error handle
setupErrorHandle(Vue);

// 装配 神策埋点
setupMtaPoint(Vue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// 开发环境下
if (process.env.NODE_ENV === "development") {
  // 开启调试模式
  Vue.config.devtools = true;
}
