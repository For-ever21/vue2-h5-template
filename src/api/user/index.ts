import { defHttp } from "@/utils/http";

import {
  ISmsReqParams,
  IPhoneLoginReqParams,
  IPhoneLoginResultModel,
  IWeiboLoginReqParams,
  IWeiboLoginResultModel,
  IWeixinLoginReqParams,
  IWeixinLoginResultModel,
  // IGenerateCodeReqParams,
  // IGenerateCodeUrlResultModel,
} from "@/api/model/userModel";

/**
 * @description: 获取短信验证码
 */
export function getSmsCode(params: ISmsReqParams) {
  return defHttp.request({
    url: "/user/login/sendCheckNum",
    method: "POST",
    params,
  });
}

/**
 * @description: 手机号登录
 */
export function phoneLoginApi(params: IPhoneLoginReqParams) {
  return defHttp.request<IPhoneLoginResultModel>({
    url: "/user/login/phone",
    method: "POST",
    params,
  });
}
/**
 * @description: 微博授权登录
 */
export function weiboLoginApi(params: IWeiboLoginReqParams) {
  return defHttp.request<IWeiboLoginResultModel>({
    url: "/user/login/weibo",
    method: "POST",
    params,
  });
}
/**
 * @description: 微信授权登录
 */
export function weixinLoginApi(params: IWeixinLoginReqParams) {
  return defHttp.request<IWeixinLoginResultModel>({
    url: "/user/login/weixin",
    method: "POST",
    params,
  });
}

/**
 * @description: 获取生成第三方code的链接 (weixin,weibo) OAuth2鉴权
 */
export function generateCodeUrl(params: any) {
  return defHttp.request({
    url: "/auth/generateCodeUrl",
    method: "GET",
    params,
  });
}
