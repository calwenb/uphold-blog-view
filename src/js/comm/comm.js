import vm from "../../main";

export const successMsg = function (msg) {
  vm.$notify.success({
    title: '成功',
    message: msg,
  });
}

export const errorMsg = function (msg) {
  vm.$notify.error({
    title: '失败',
    message: msg
  });
}

export const warnMsg = function (msg) {
  vm.$notify.warning({
    title: '警告',
    message: msg,
  });
}

export const infoMsg = function (msg) {
  vm.$notify.info({
    title: '消息',
    message: msg,
  });
}
export default {
  successMsg,
  errorMsg,
  warnMsg,
  infoMsg
};

