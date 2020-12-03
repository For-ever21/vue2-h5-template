import {
  UserTypeEnum,
  // LoginChannelEnum,
  LoginSourceEnum,
  // LoginTypeEnum,
  DeviceEnum,
  WeixinTypeEnum,
} from "@/enums/businessEnum";

/**
 * @description: 获取短信验证码 请求参数
 */
export interface ISmsReqParams {
  phone: string;
  userCode: UserTypeEnum;
}

/**
 * @description: 手机号登录 请求参数
 */
export interface IPhoneLoginReqParams {
  checkNum: string; // 验证码
  phone: string; // 手机号
  loginSource?: LoginSourceEnum; // 系统登录来源,
  source?: DeviceEnum; // 设备来源
  // userType?: UserTypeEnum;
  weiBoRegistered?: boolean; // 微博账号是否已注册,微博授权之后绑定手机必填
  weiXinRegistered?: boolean; // 微信账号是否已注册,微信授权之后绑定手机必填
  unionId?: string; // 微信unionId,微信授权之后绑定手机必填
  weiboUid?: string; // 微博Uid,微博授权之后绑定手机必填
  weixinType?: WeixinTypeEnum; // 微信授权类型,
}

/**
 * @description: 手机号登录 返回结果
 */
export interface IPhoneLoginResultModel {
  avatar: string;
  deadLine: string;
  expire: number;
  refreshDeadLine: string;
  refreshExpire: string;
  refreshToken: string;
  token: string;
  userId: string;
  userName: string;
  userType: string;
}

/**
 * @description: 微博授权登录 请求参数
 */
export interface IWeiboLoginReqParams {
  code: string;
}

/**
 * @description: 微博授权登录 返回结果
 */
export interface IWeiboLoginResultModel extends IPhoneLoginResultModel {
  nickName: string;
  weiboUid: string;
  registered: boolean;
}

/**
 * @description: 微信授权登录 请求参数
 */
export interface IWeixinLoginReqParams {
  code: string;
  weixinType: WeixinTypeEnum;
}

/**
 * @description: 微信授权登录 返回结果
 */
export interface IWeixinLoginResultModel extends IPhoneLoginResultModel {
  nickName: string;
  unionId: string;
  registered: boolean;
}

/**
 * @description: 获取生成第三方code 请求参数
 */
type authType = "login" | "bind";
type providerType = "weixin" | "weibo";
export interface IGenerateCodeReqParams {
  providerType: providerType;
  userType: UserTypeEnum;
  authType?: authType;
  projectName?: string;
  resourceUrl?: string;
  source?: DeviceEnum;
}

/**
 * @description: 获取生成第三方code 返回结果
 */
export interface IGenerateCodeUrlResultModel {
  phone?: string;
  userType?: UserTypeEnum;
}
