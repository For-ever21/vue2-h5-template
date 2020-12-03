/**
 * @description: 用户类型 枚举
 */
export enum UserTypeEnum {
  DOCTOR = "doctor",
  USER = "user",
  BUSINESS = "business",
  ADMIN = "admin",
  MEDIC = "medic",
}

/**
 * @description: 登录渠道 枚举
 */
export enum LoginChannelEnum {
  WEIXIN = "wx",
  WEIBO = "weibo",
}

/**
 * @description: 登录来源 枚举
 */
export enum LoginSourceEnum {
  PATIENT = "patient",
}

/**
 * @description: 登录类型 枚举
 */
export enum LoginTypeEnum {
  APP = "app",
  PC = "pc",
}

/**
 * @description: 登录设备 枚举
 * pc-网站,android-Android客户端,ios-IOS客户端，h5-h5环境
 */
export enum DeviceEnum {
  PC = "pc",
  H5 = "h5",
  ANDROID = "android",
  IOS = "ios",
}

/**
 * @description: 微信授权类型 枚举
 * weixin_app-移动应用
 * weixin_web-网站应用，
 * weixin_account-公众号，
 * weixin_applets-小程序
 */
export enum WeixinTypeEnum {
  APP = "weixin_app", // 移动应用
  WEB = "weixin_web", // 网站应用
  ACCOUNT = "weixin_account", // 公众号
  APPLETS = "weixin_applets", // 小程序
}
