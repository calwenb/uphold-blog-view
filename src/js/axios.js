import axios from "axios";
import VueCookies from "vue-cookies";
import router from "../router";
import comm from "./comm/comm";

axios.defaults.withCredentials = true;
export default axios;
export const request = (config) => {
  return axios(config)
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  let token = VueCookies.get("TOKEN");
  if (token != null) {
    config.headers.common = {
      'Authorization': token
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});


// 请求完成后 拦截器
axios.interceptors.response.use(
  resp => {
    const rs = resp.data;

    if (resp.headers['content-type'] === "application/octet-stream;charset=UTF-8") {
      return resp;
    }
    let code = rs.code;
    let errTag;
    switch (code) {
      case 2000:
        return resp.data;
      case 7000:
        errTag = "[操作失败]";
        break;
      case 4010:
        errTag = "[验证失败]";
        router.push('/login');
        break;
      case 5000:
        errTag = "[服务器异常]";
        break;
      default:
        comm.errorMsg(rs.message + " ，错误代码：" + rs.code);
        errTag = "[未知代码]"
        return Promise.reject(new Error(errTag + rs.message || 'Error'))
    }
    comm.errorMsg(rs.message);
    return Promise.reject(new Error(errTag + rs.message || 'Error'))
  },
  error => {
    let msg = error.message;
    let code = msg.substring(msg.indexOf('status code') + 12);
    switch (code) {
      case '500':
        comm.errorMsg("服务器发生了意外");
        break
      case '503':
        comm.errorMsg("服务或未启动");
        break
      case '401':
        comm.errorMsg("无权限调用")
        break
      default:
        if (msg === "Network Error") {
          comm.errorMsg("服务或未启动");
        } else {
          comm.errorMsg("未知错误：" + error.message);
        }
    }
    return Promise.reject(new Error(error || 'Error'))
  }
)


