var common = {
  // xswlIp: 'https://cultural-app.xiaoshan.gov.cn:8888/',
  xswlIp: process.env.VUE_APP_BASE_API,
  // xswlIp: 'http://223.65.209.139:18180/',
  // xswlIp: 'http://192.168.2.20:8180/',
  // xswlIp: 'http://192.168.2.31:8180/',
  // xswlIp: 'http://192.168.43.166:8180/',
  videoNewApi2: 'http://223.65.209.139:8888/',
  xiaoShanWenWuJu: 'http://118.31.38.141:8905/',
  localServer: 'http://192.168.2.29:8180/',
  //   localServer: 'https://t2904x3244.picp.vip/',
  // xswlIp: "http://127.0.0.1:8088/xsApi/",
  // videoNewApi2: "http://127.0.0.1:8088/apii/",
  navigationWidth: 1200,
};

if (window.location.host.indexOf('223.65.209.139') >= 0) {
  common.videoNewApi2 = 'http://223.65.209.139:8888/';
  // common.videoNewApi2 = "http://172.21.98.111:8088/";
} else if (window.location.host.indexOf('localhost') >= 0 || window.location.host.indexOf('127.0.0.1') >= 0) {
  common.videoNewApi2 = 'http://127.0.0.1:8088/apii/';
} else {
  common.videoNewApi2 = 'http://172.21.98.111:8088/';
}

export default common;