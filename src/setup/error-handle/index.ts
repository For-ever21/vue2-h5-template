import { Report } from "./sentry";
export function setupErrorHandle(Vue: AnyObject) {
  const IS_DEV = process.env.NODE_ENV === "development";
  if (IS_DEV) {
    const sentry = Report.getInstance({
      dsn: process.env.SentryDSN,
      release: require("../../../package.json").version, // from webpack DefinePlugin
      environment: "Prod",
    });

    window.$sentry = sentry;

    // 全局监控 Vue errorHandler
    Vue.config.errorHandler = (error: any, vm: any, info: any) => {
      window.$sentry.log({
        error,
        type: "vue errorHandler",
        vm,
        info,
      });
    };
  }
}
