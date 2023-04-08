import axios from './http.js';
import common from './common';
// 获取本地数据
export const getLocalData = (url) => axios.get(url);
// 获取巡查员轨迹
export const get_people_path_poi = (params) => axios.post(common.xswlIp + `cultural/cmd/v1/patroller/queryPatrollerLocusWithTimeOrNot`, params);
// 地图聚合数据
export const get_zpdt_data = () => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/zpdt`);
// 置顶统计
export const get_top_data = () => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/zdtj`);
// 风险因子
export const get_fxyz_data = () => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/fxyz`);
// 风险信息
export const get_fxxx_data = (type, currentPage, pageSize) => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/fxxx/${type}/${currentPage}/${pageSize}`);
// 风险高发
export const get_fxgf_data = () => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/fxgf`);
// 考古前置--统计、列表
export const get_kgqz_data = (currentPage, pageSize) => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/kgqz/${currentPage}/${pageSize}`);
// 文物修缮
export const get_wwxs_data = () => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/wwxs`);
// 活化利用
export const get_hhly_info = (params) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/hhly`, params);
// 文保类别
export const get_wblb_data = () => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/wblb`);
//据文保单位文保类别统计文保单位数量
export const selectMuseumRelicInfoNumGroupType = (params) => axios.get(common.xiaoShanWenWuJu + 'fullScreen/selectMuseumRelicInfoNumGroupType', params);
// 文物分布
export const get_wwfb_data = () => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/wwfb`);
// 文保基金
export const get_wbjj_data = () => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/wbjj`);
// 捐赠列表
export const get_jzlb_data = (params) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/jzlb`, params);
// 资金申请列表列表
export const get_zjsqlb_data = (params) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/zjsqlb`, params);
// 群防群治
export const get_qfqz_data = () => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/qfqz`);
// 考核监督
export const get_khjd_data = () => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/khjd`);
// 护宝达人
export const get_hbdr_data = (currentPage, pageSize) => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/hbdr/${currentPage}/${pageSize}`);
// 教育培训
export const get_jypx_data = () => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/jypx`);
// ai感知
export const get_aigz_data = () => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/aigz`);
// ai感知---二级页面的烟感和火感数据
export const get_aigz_yanGan_huoGan_data = (data) => axios.post(common.xswlIp + `hik/cmd/v1/hikscreen/fireSmokeSensation`, data);
// ai预警
export const get_aiyj_data = (currentPage, pageSize) => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/aiyj/${currentPage}/${pageSize}`);
// 多跨协同 仪表盘
export const get_dkxt_data = () => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/dkxt`);
// 事件中心
export const get_sjzx_data = (currentPage, pageSize) => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/sjzx/${currentPage}/${pageSize}`);
// 事件跟踪
export const get_sjgz_data = () => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/sjgz`);
// ai智保
export const get_aizb_data = (currentPage, pageSize) => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/aizb/${currentPage}/${pageSize}`);
// 水况监测
export const get_skjc_data = () => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/sqjc`);
// 紧急事件处理
export const get_jjsjcl_data = (currentPage, pageSize) => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/jjsjcl/${currentPage}/${pageSize}`);
// 安全指数
export const get_aqzs_data = () => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/jkzs`);
// 风险分析
export const get_fxfx_data = () => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/fxfx`);
// 风险预报
export const get_fxyb_data = (params) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/fxyb`, params);
// 火灾隐患
export const get_hzyh_data = () => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/hzyh`);
// 安全指数详情
export const get_aqzs_detail = (params) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/aqzsxq`, params);
// 风险来源详情
export const get_fxly_detail = (params) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/fxlyxq`, params);
// 风险预报详情
export const get_fxyb_detail = (params) => axios.post(common.xswlIp + ``, params);
// 风险分类详情
export const get_fxfl_detail = (params) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/fxflxq`, params);
// AI感知详情
export const get_aigz_detail = (params) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/aigzxq`, params);
// AI预警详情
export const get_aiyj_detail = (params) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/aiyjxq`, params);
// 多跨协同详情
export const get_dkxt_detail = (params) => axios.post(common.xswlIp + ``, params);
// 事件中心详情
export const get_sjzx_detail = (params) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/sjzxxq`, params);
// 护保队伍详情
export const get_hbdw_detail = (params) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/hbdwxq`, params);
// 巡防群治详情
export const get_xfqz_detail = (params) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/qfqzxq`, params);
// 考核监督详情
export const get_khjd_detail = (params) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/khdcxq`, params);
// 教育培训详情
export const get_jypx_detail = (params) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/jypxxq`, params);
// 文保点详情
export const getBumpPointBaseInfoById = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/controlscreen/getBumpPointBaseInfoById/${params.id}`);
export const listByBumpPointId = (data) => axios.post(common.xswlIp + `cultural/cmd/v1/cultural/basecheck/listByBumpPointId`, data);
export const getEquipmentCount = (params) => axios.get(common.xswlIp + `hik/cmd/v1/hikscreen/getEquipmentCount/${params.id}`);
// 永兴指数气象预警
export const controlscreenGetWeatherData = (data) => axios.post(common.xswlIp + `cultural/cmd/v1/controlscreen/getWeatherData`, data);
// 头部待处理任务
export const getWarningDisposalList = (data) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/getWarningDisposalList`, data);
// 头部今日总报警
export const getTodayWarningDisposalList = (data) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/getTodayWarningDisposalList`, data);
// 头部已处理任务
export const getCompleteWarningDisposalList = (data) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/getCompleteWarningDisposalList`, data);
// 指派任务
export const screenDataCreate = (data) => axios.put(common.xswlIp + `cultural/cmd/v1/screenData/create`, data);
//获取人员信息
export const getPatrollerListByPointId = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/patroller/getPatrollerListByPointId/${params.id}`);
//获取处理任务详情
export const getWarnDataById = (data) => axios.post(common.xswlIp + `hik/cmd/v1/hikscreen/getWarnDataById`, data);
// 置顶第二版本统计
export const screenV3Zdtjv2 = (data) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/zdtjv2`, data);
//萧保管-文保基金接口-资金概况
export const xbgFundTotal = (params) => axios.get(common.xiaoShanWenWuJu + 'xsdp/xbg/xbgFundController/xbgFundTotal', { params });
//萧保管-文保基金接口-捐赠列表
export const fundDonationlist = (params) => axios.get(common.xiaoShanWenWuJu + 'xsdp/xbg/xbgFundController/fundDonationlist', { params });
//萧保管-文保基金接口-申请列表
export const fundApplylist = (params) => axios.get(common.xiaoShanWenWuJu + 'xsdp/xbg/xbgFundController/fundApplylist', { params });
// 萧保管 - 考古前置接口 - 顶部统计
export const xbgAPControllerTopTJ = (params) => axios.get(common.xiaoShanWenWuJu + 'xsdp/xbg/xbgAPController/topTJ', { params });
// 萧保管-考古前置接口-列表
export const xbgAPControllerList = (params) => axios.get(common.xiaoShanWenWuJu + 'xsdp/xbg/xbgAPController/list', { params });
export const screenV3RiskData = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/riskData`, { params });
//萧保管-保护利用接口-文物修缮统计
export const xbgBhlyControllerSaveTJ = (params) => axios.get(common.xiaoShanWenWuJu + `xsdp/xbg/xbgBhlyController/saveTJ`, { params });
//统计ai感知设备
export const selectAiStatistics = (params) => axios.get(common.xiaoShanWenWuJu + `fullScreen/selectAiStatistics`, { params });
//萧保管-保护利用接口-活化利用列表
export const saveuseUselist = (params) => axios.get(common.xiaoShanWenWuJu + `xsdp/xbg/xbgBhlyController/saveuseUselist`, { params });
//ai预警事件分页
export const selectAiEventPage = (params) => axios.get(common.xiaoShanWenWuJu + `fullScreen/selectAiEventPage`, { params });
//护宝队伍接口-顶部统计
export const xSDPHBDWControllerTopTJ = (params) => axios.get(common.xiaoShanWenWuJu + `xsdp/hb365/xSDPHBDWController/topTJ`, { params });
//护宝队伍接口-用户列表数据
export const xSDPHBDWControllerUserList = (params) => axios.get(common.xiaoShanWenWuJu + `xsdp/hb365/xSDPHBDWController/userList`, { params });
//巡访群治接口-巡查发现统计
export const xSDPHBDWControllerXcfxTJ = (params) => axios.get(common.xiaoShanWenWuJu + `xsdp/hb365/xSDPXFQZController/xcfxTJ`, { params });
//巡访群治接口-事件分页
export const xSDPHBDWControllerSelectEventOrderPage = (params) => axios.get(common.xiaoShanWenWuJu + `xsdp/hb365/xSDPXFQZController/selectEventOrderPage`, { params });
//护宝365其他接口-护宝达人统计
export const xSDPHBDWControllerHbdrTJ = (params) => axios.get(common.xiaoShanWenWuJu + `xsdp/hb365/xSDPOtherController/hbdrTJ`, { params });
//护宝365其他接口-教育培训统计
export const xSDPHBDWControllerJypxTJ = (params) => axios.get(common.xiaoShanWenWuJu + `xsdp/hb365/xSDPOtherController/jypxTJ`, { params });
//萧山大屏-其他接口-根据镇街统计对应的文物数量
export const xsdpRelicNumsByStreet = (params) => axios.get(common.xiaoShanWenWuJu + `xsdp/other/xsdpOtherController/xsdpRelicNumsByStreet`, { params });
// 风险来源列表
export const screenV3RiskDataDetails = (data) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/riskDataDetails`, data);
export const getKeyIssuesCount = (params) => axios.get(common.xswlIp + `hik/cmd/v1/hikscreen/getKeyIssuesCount/${params.id}`);
export const getDefenceList = (params) => axios.get(common.xswlIp + `hik/cmd/v1/hikscreen/getDefenceList/${params.id}`);
//永兴指数人防
export const basecheckRenAnti = (data) => axios.post(common.xswlIp + `cultural/cmd/v1/cultural/basecheck/renAnti`, data);
//永兴指数人防详情
export const basecheckRenAntiData = (data) => axios.post(common.xswlIp + `cultural/cmd/v1/cultural/basecheck/renAntiData`, data);
//永兴指数物防
export const physicalDefense = (data) => axios.post(common.xswlIp + `hik/cmd/v1/hikscreen/physicalDefense`, data);
//永兴指数物防详情
export const basecheckPhysicalDefenseData = (data) => axios.post(common.xswlIp + `hik/cmd/v1/hikscreen/physicalDefenseData`, data);
//永兴指数物防设备统计
export const basecheckPhysicalDeSmartDevicesCount = (data) => axios.post(common.xswlIp + `hik/cmd/v1/hikscreen/smartDevicesCount`, data);
//永兴指数物防智能设备详情
export const basecheckPhysicalDefenseV2Data = (data) => axios.post(common.xswlIp + `hik/cmd/v1/hikscreen/physicalDefenseDatav2`, data);
//永兴指数智防
export const intelligentPreventionCount = (data) => axios.post(common.xswlIp + `hik/cmd/v1/hikscreen/intelligentPreventionCount`, data);
//永兴指数智防详情
export const intelligentPreventionCountData = (data) => axios.post(common.xswlIp + `hik/cmd/v1/hikscreen/intelligentPreventionCountData`, data);

export const screenV3getZdsx = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/getZdsx/${params.id}`);
//永兴指数 重点事项

export const screenV3getTqyj = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/getTqyj`);

export const screenV3getHzfxyh = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/getHzfxyh`);

export const equipFacilityInfoResourcesSelectInfoTotal = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/equipFacilityInfoResources/selectInfoTotal`, { params });

export const wbjdTotal = (data) => axios.post(common.xswlIp + `cultural/cmd/v1/controlscreen/wbjdTotal`, data);

export const queryListByPointId = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/cultural/queryListByPointId/${params.id}`);

export const selectDonateMoney = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/fundRegister/selectDonateMoney`);

export const screenV3getHzfxyhqd = (data) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/getHzfxyhqd`, data);

export const screenV3getHzfhCount = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/getHzfhCount`, { params });

export const screenV3getYxzsInfo = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/getYxzsInfo`, { params });

export const administrationAddCulturalCount = (data) => axios.post(common.xswlIp + `admin/cmd/v1/userData/examine/administrationAddCulturalCount`, data);
//永兴指数 火灾防护人防人员组织

export const screenBaseCheckFireProtectionCount = (data) => axios.post(common.xswlIp + `admin/cmd/v1/basecheck/screenBaseCheckFireProtectionCount`, data);
//永兴指数 火灾防护人防

export const screenBaseCheckFireProtection = (data) => axios.post(common.xswlIp + `admin/cmd/v1/basecheck/screenBaseCheckFireProtection`, data);
//永兴指数 火灾防护人防详情

export const bumpPointBaseInfoScreenUserData = (data) => axios.post(common.xswlIp + `admin/cmd/v1/bumpPointBaseInfo/screenUserData`, data);
//永兴指数

export const screenBaseCheckFireRisk = (data) => axios.post(common.xswlIp + `admin/cmd/v1/basecheck/screenBaseCheckFireRisk`, data);

export const screenBaseCheckFireRiskAll = (data) => axios.post(common.xswlIp + `admin/cmd/v1/basecheck/screenBaseCheckFireRiskAll`, data);

// 智保站---文物一张图---用电----获取用电折线图数据(务本堂:11 南大房:9)
export const getElectracLineData = (params) => axios.get(common.xswlIp + `hik/cmd/v1/hikscreen/queryWisdomopenChart/${params.pointId}/${params.eventType}`);
// 获取用电事件类型
export const getElectracType = () => axios.get(common.xswlIp + `hik/cmd/v1/hikscreen/queryWisdomopenEventType`);

// 火灾处置----首屏数据
export const get_hzcz_data = () => axios.get(common.xswlIp + `hik/cmd/v1/hikscreen/countMapByDeviceTypeAndEventType`);
// 火灾处置----列表详情数据（二级页面）
export const get_hzcz_list_data = (data) => axios.post(common.xswlIp + `hik/cmd/v1/hikscreen/queryDeviceDetailByType`, data);





// 获取后管任务列表
export const getTaskList = (data) => {
    data.selectByMyAndAll = 'all';
    let token = localStorage.getItem('xs_token');
    axios.defaults.headers['Authorization'] = token;
    return axios.post(common.xswlIp + 'admin/cmd/v1/basecheck/getMyBaseCheckList', data);
};

// 获取文保点信息（包括对应的文保员信息）
export const getPoiInfo = (data) => {
    let levelName = '';

    if (levelName) {
        levelName = data;
    } else {
        levelName = 'all';
    }
    let token = localStorage.getItem('xs_token');
    axios.defaults.headers['Authorization'] = token;
    return axios.get(common.xswlIp + `admin/cmd/v1/bumpPointBaseInfo/getListAndProtecteds?levelName=${levelName}`);
};

// 获取移动端事件处置列表
export const getMyBaseCheckList = (data) => {
    let token = localStorage.getItem('xs_token');
    axios.defaults.headers['Authorization'] = token;
    return axios.post(common.xswlIp + `admin/cmd/v1/basecheck/getMyBaseCheckList`, data);
};

// 真实数据不部署===================================================================================================================
// 永兴指数----总计数据
export const get_yxzs_data = () => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/getYxzs`);
// 预警指数----总计数据
export const get_yjzs_data = (pointId) => axios.get(common.xswlIp + `cultural/cmd/v1/screenV3/getZhzs/${pointId}`);
// 永兴指数----动态分值趋势变化
export const get_yxzs_line_data = (data) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/getFzqsbh`, data);
// 永兴指数---右边物防数据---统计项
export const get_WF_tj_data = (params) => axios.get(common.xswlIp + `cultural/cmd/v1/physicalDefense/selectNum?bumpPointId=${params.bumpPointId}`);
// 永兴指数---右边物防数据---列表
export const get_WF_list_data = (data) => axios.post(common.xswlIp + `cultural/cmd/v1/physicalDefense/selectInfo`, data);
// 永兴指数---右边智防数据---统计项
export const get_ZF_tj_data = (data) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/getHzfhzf`, data);
// 永兴指数---右边智防数据---列表
export const get_ZF_list_data = (data) => axios.post(common.xswlIp + `cultural/cmd/v1/screenV3/getHzfhzfqd`, data);

// 获取任务事件详情列表
export const getListDetailById = (data) => {
    let token = localStorage.getItem('xs_token');
    axios.defaults.headers['Authorization'] = token;
    return axios.post(common.xswlIp + `admin/cmd/v1/basecheck/screenBaseCheckById`, data);
};