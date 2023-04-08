import axios from './http.js';
import common from './common';
// 获取本地数据
export const getLocalData = (url) => axios.get(url);

// 获取海康监控列表
export const getHikVideoList = () => axios.get(common.xswlIp + `hik/cmd/v1/hik/cameras`);

// 获取海康视频流地址
export const getHikVideoUrl = (id) => axios.get(common.xswlIp + `hik/cmd/v1/hik/getCamerasPreviewUrlWs?cameraIndexCode=${id}`);
// export const getHikVideoUrl = (id) => axios.get(common.xswlIp + `hik/cmd/v1/hik/getCamerasPreviewUrlHls?cameraIndexCode=${id}`);

// 天气查询
export const getWeatherData = () => axios.get('https://api.seniverse.com/v3/weather/now.json?key=S0QCKc6LeaD_UgtF1&location=hangzhou&language=zh-Hans&unit=c');
// 天气预警查询
export const getWeatherWarning = () => axios.get('https://api.seniverse.com/v3/weather/alarm.json?key=S0QCKc6LeaD_UgtF1&location=杭州&detail=more');

// 党建引领
export const djyl = () => axios.get(common.xswlIp + 'cultural/cmd/v1/controlscreen/djyl');
// 人防力量
export const rfll = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/controlscreen/rfll/${params.level}/${params.name}`);

// 风险防护等级
export const fxfhdj = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/controlscreen/fxfhdj/${params.level}/${params.name}`);

// 文物保护资金
export const wwbhzj = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/controlscreen/wwbhzj/${params.level}/${params.name}`);

// 文物概况
export const wwgk = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/controlscreen/wwgk/${params.level}/${params.name}`);

// 文物实时监控
export const wwssjk = () => axios.get(common.xswlIp + 'cultural/cmd/v1/controlscreen/wwssjk');

// 置顶统计
export const zdtj = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/controlscreen/zdtj/${params.level}/${params.name}`);

// 资金来源
export const zjly = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/controlscreen/zjly/${params.level}/${params.name}`);

// 智能感知
export const zngz = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/controlscreen/zngz/${params.level}/${params.name}`);

// 所在镇街
export const szzj = () => axios.get(common.xswlIp + 'cultural/cmd/v1/controlscreen/szzj');

// 文物类型
export const wwlx = () => axios.get(common.xswlIp + 'cultural/cmd/v1/controlscreen/wwlx');

// 文保点列表
export const wbd_list = (params) => axios.post(common.xswlIp + 'cultural/cmd/v1/controlscreen/wbdList', params);
export const wbd_list2 = (params) => axios.post(common.xswlIp + 'cultural/cmd/v1/controlscreen/wbdList2', params);
export const wbd_list3 = (params) => axios.post(common.xswlIp + 'cultural/cmd/v1/controlscreen/wbdList3', params);
//厨灶间分类类别查询
export const czj_flcx = () => {
    let token = localStorage.getItem('xs_token');
    axios.defaults.headers['Authorization'] = token;
    return axios.post(common.xswlIp + 'admin/cmd/v1/usingstandards/classificationOptionDtoTree');
};
// 气象预警文物点位列表
export const wbd_list_by_weatherWarning = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/controlscreen/qxjclb/${params.type}/${params.level}/${params.name}`);
// 镇街文保点统计
export const zjtj = (name) => axios.get(common.xswlIp + `cultural/cmd/v1/controlscreen/zjtj/${name}`);

// 根据文保点Id获取信息
export const wbdDetail = (id) => axios.get(common.xswlIp + `cultural/cmd/v1/controlscreen/wbdDetail/${id}`);

// 登录

export const login = () =>
    axios.post(common.xswlIp + `admin/cmd/v1/auth/loginApp`, {
        code: '',
        currentPage: 0,
        deptId: '',
        email: '',
        id: '',
        nickName: '',
        pageSize: 0,
        password: 'admin123',
        path: '',
        phone: '13455555555',
        roleId: '',
        salt: '',
        tenantId: '',
        uuid: '',
    });

// 顶部任务统计
export const top_statistics = (id) => {
    let token = localStorage.getItem('xs_token');
    // axios.defaults.headers['Authorization'] = token
    return axios.get(
        common.xswlIp + `cultural/cmd/v1/controlscreen/handle/overview`,
        // {
        //     headers: {
        //         Authorization: token
        //     }
        // }
    );
};

// 火灾危险源
export const hzwxy = (params) => {
    let token = localStorage.getItem('xs_token');
    axios.defaults.headers['Authorization'] = token;
    return axios.post(common.xswlIp + `hik/cmd/v1/danger/list/danger`, params);
};

// 业余文保员通讯录
export const yywby = (params) => axios.post(common.xswlIp + `cultural/cmd/v1/controlscreen/yywby`, params);
// 巡查员列表---有定位poi
export const xcy_list = (params) => axios.post(common.xswlIp + `cultural/cmd/v1/controlscreen/xcylb`, params);

// // 顶部一网同管列表
// export const ywtg_list = () =>
//     axios.get(common.xswlIp + `cultural/cmd/v1/controlscreen/handle/union_list`);
// // 顶部一网同管详情
// export const ywtg_detail = id =>
//     axios.get(
//         common.xswlIp + `cultural/cmd/v1/controlscreen/handle/union_deital/${id}`
//     );
// 顶部一网同管列表
export const ywtg_list = (data) => axios.post(common.xswlIp + `cultural/cmd/v1/unionhandle/list`, data);
// 顶部一网同管详情
export const ywtg_detail = (id) => axios.get(common.xswlIp + `cultural/cmd/v1/unionhandle/detail/${id}`);

// 顶部处置列表----巡查处置
export const xccz = (params) => axios.post(common.xswlIp + `cultural/cmd/v1/controlscreen/xccz`, params);
// 顶部处置列表----预警处置
export const yjcz = (params) => axios.post(common.xswlIp + `cultural/cmd/v1/controlscreen/yjcz`, params);

// 审核整改方案
export const audit_zgfa_file = (params) => {
    let token = localStorage.getItem('xs_token');
    axios.defaults.headers['Authorization'] = token;
    return axios.post(common.xswlIp + `cultural/cmd/v1/safetyrectify/shzgfa`, params);
};

// 下派核查任务
export const checkTask = (params) => {
    let token = localStorage.getItem('xs_token');
    axios.defaults.headers['Authorization'] = token;
    return axios.post(common.xswlIp + `cultural/cmd/v1/safetyrectify/xfhcrw`, params);
};

// 完成核查任务
export const zg_finish_confirm = (params) => {
    let token = localStorage.getItem('xs_token');
    axios.defaults.headers['Authorization'] = token;
    return axios.post(common.xswlIp + `cultural/cmd/v1/safetyrectify/qrzgrwwc`, params);
};

// 确定任务完成---例行巡查
export const confirmTask = (params) => {
    let token = localStorage.getItem('xs_token');
    axios.defaults.headers['Authorization'] = token;
    return axios.post(common.xswlIp + `cultural/cmd/v1/routinecheck/qrrwwc`, params);
};
//文保单位等级统计文保单位数量
export const selectMuseumRelicInfoNumGroupLevell = (params) => axios.get(common.xiaoShanWenWuJu + 'fullScreen/selectMuseumRelicInfoNumGroupLevel', { params });