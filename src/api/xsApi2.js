import axios from './http.js';
import common from './common';
// 获取本地数据
export const getLocalData = url => axios.get(url);
// 文物修缮列表
export const repairList = params => axios.post(common.xswlIp + `cultural/cmd/v1/securityscreen/repairList`, params);
// 考古勘探列表
export const kgkt_List = params => axios.post(common.xswlIp + `cultural/cmd/v1/archaeologicalExploration/list`, params);
// 精密智控---统计数据
export const get_jmzk_tj = () => axios.get(common.xswlIp + `hik/cmd/v1/hikscreen/queryDeviceNum`);
// 精密智控---具体详情（根据设备类型查询）
export const get_jmzk_list = deviceType => axios.get(common.xswlIp + `hik/cmd/v1/hikscreen/queryByDeviceType/${deviceType}`);
// 精密智控---查询已接入硬件设备的文保点列表
export const get_has_device_poi_list = () => axios.get(common.xswlIp + `hik/cmd/v1/hikscreen/queryWisdomOpenPoint`);
// 获取视频列表---树型结构
export const get_camera_list = () => axios.get(common.xswlIp + `hik/cmd/v1/cameras/tree/cameras`);
// 设施设备---统计、具体详情
export const get_device_list = () => axios.get(common.xswlIp + `hik/cmd/v1/hikscreen/deviceNumAndType`);
// 文保队伍---统计
export const get_people_tj = () => axios.get(common.xswlIp + `cultural/cmd/v1/securityscreen/wbdwgk`);
// 文保队伍---具体列表
export const get_people_list = params => axios.post(common.xswlIp + `cultural/cmd/v1/securityscreen/wbdwList`, params);
// 置顶统计
export const get_top_data = (level, name) => axios.get(common.xswlIp + `cultural/cmd/v1/securityscreen/zdtj/${level}/${name}`);
// 风险态势
export const get_fxts = (level, name, rqlx) => axios.get(common.xswlIp + `cultural/cmd/v1/securityscreen/fxts/${level}/${name}/${rqlx}`);
// 文物巡查
export const get_wwxc = (level, name, currentPage, pageSize, rqlx) => axios.get(common.xswlIp + `cultural/cmd/v1/securityscreen/wwxc/${level}/${name}/${currentPage}/${pageSize}/${rqlx}`);
// 隐患分析
export const get_yhfx = (level, name, rqlx) => axios.get(common.xswlIp + `cultural/cmd/v1/securityscreen/yhfx/${level}/${name}/${rqlx}`);
// 隐患高发
export const get_yhgf = (type, level, name) => axios.get(common.xswlIp + `cultural/cmd/v1/securityscreen/yhgf/${type}/${level}/${name}`);

// 多跨协同
export const get_wwzz = (level, name, rqlx) => axios.get(common.xswlIp + `cultural/cmd/v1/securityscreen/wwzz/${level}/${name}/${rqlx}`);
// 单独获取一网统管统计数据
export const get_ywtg_num = rqlx => axios.get(common.xswlIp + `cultural/cmd/v1/securityscreen/unified_handle/${rqlx}`);
// 预警处置
export const get_yjcz = (level, name, rqlx) => axios.get(common.xswlIp + `cultural/cmd/v1/securityscreen/yjcz/${level}/${name}/${rqlx}`);
// 事件动态
export const get_sjdt = (currentPage, pageSize, level, name, wd, rqlx) => axios.get(common.xswlIp + `cultural/cmd/v1/securityscreen/sjdt/${currentPage}/${pageSize}/${level}/${name}/${wd}/${rqlx}`);

// 气象预警详情
export const get_qxDetail = (currentPage, pageSize, rq, rankId) => axios.get(common.xswlIp + `cultural/cmd/v1/securityscreen/qxyjxq/${currentPage}/${pageSize}/${rq}/${rankId}`);
// 气象预警批量处置
export const qxyj_handle = rq => {
    let token = localStorage.getItem('xs_token');
    axios.defaults.headers['Authorization'] = token;
    return axios.put(common.xswlIp + `cultural/cmd/v1/routinecheck/create2`, { rq, type: '1' });
};
// 硬件预警批量处置
export const yjyj_handle = (pointId, id) => {
    let time = new Date().Format('yyyy-MM-dd');
    let token = localStorage.getItem('xs_token');
    axios.defaults.headers['Authorization'] = token;
    return axios.put(common.xswlIp + `cultural/cmd/v1/routinecheck/create2`, { rq: time, type: '3', id, pointId });
};
// 获取事项处置时间进度
export const get_timeLineData = id => {
    let token = localStorage.getItem('xs_token');
    axios.defaults.headers['Authorization'] = token;
    return axios.get(common.xswlIp + `cultural/cmd/v1/controlscreen/czjlList/${id}`);
};
// 获取流程id
export const get_instenceId = id => {
    // let token = localStorage.getItem("xs_token");
    // axios.defaults.headers["Authorization"] = token;
    return axios.get(common.xswlIp + `cultural/cmd/v1/cultural/basecheck/getById/${id}`);
};
// 厨灶间列表
export const czj_List = params => axios.post(common.xswlIp + `cultural/cmd/v1/cultural/equipment/list`, params);
// 厨灶间详情
export const czj_Detail = id => axios.get(common.xswlIp + `cultural/cmd/v1/cultural/equipment/getDetailById/${id}`);
// 单独获取大屏顶部厨灶间统计数据
export const get_czj_num = () => axios.get(common.xswlIp + `cultural/cmd/v1/cultural/equipment/countKitchenEquipment`);
// 风险态势弹框---事件列表
export const get_fxts_event_list = params => axios.get(common.xswlIp + `cultural/cmd/v1/securityscreen/fxtssj/${params.currentPage}/${params.pageSize}/${params.rqlx}`);
// 风险态势弹框---评级列表
export const get_fxts_pj_list = params => axios.get(common.xswlIp + `cultural/cmd/v1/securityscreen/fxtspj/${params.currentPage}/${params.pageSize}/${params.rqlx}`);
// 隐患分析弹框--列表(type  1:火灾 2：盗掘盗窃 3：法人违法 4：自然灾害 5：其它)
export const get_yhfx_list = params => axios.get(common.xswlIp + `cultural/cmd/v1/securityscreen/yhfxqd/${params.type}/${params.currentPage}/${params.pageSize}/${params.rqlx}`);
// 预警处置弹框--列表(type  1:智能感知 2：设施设备 3：气象灾害 4：其它)
export const get_yjcz_list = params => axios.get(common.xswlIp + `cultural/cmd/v1/securityscreen/yjczqd/${params.type}/${params.currentPage}/${params.pageSize}/${params.rqlx}`);
// 活化利用
export const get_hhly_info = id => axios.get(common.xswlIp + `cultural/cmd/v1/cultural/queryArchaeologicalVO?id=${id}`);
export const xSDPHBDUserList = data => axios.get(common.xiaoShanWenWuJu + `xsdp/hb365/xSDPHBDWController/userList`, { params: data });