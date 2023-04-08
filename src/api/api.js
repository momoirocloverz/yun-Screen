import axios from './http.js';

import common from './common';
const jsonp = require('jsonp');


// 获取本地数据
export const getLocalData = (url) => axios.get(url);
//请求获取本地请求地址
export const get_Local_Ip_Jsonp = function (url, func) {
  jsonp(url, null, func);
};

// 智慧水利平台------------------------------------------------------------------------------------
//初始化-获取全部系统参数
export const getSys_2 = (params) =>
  axios.post(common.zhslIp + '/zhsl/sys/getSys', {
    ...params,
  });

// 获取行政区划treeData
export const get_ZHSL_RegionTreeData = () => axios.post(common.zhslIp + 'zhsl/sys/getNetTree');

// 水利摄像头列表
export const get_ZHSL_CameraList = (params) => {
  console.log('参数', params);
  return axios.post(common.zhslIp + 'zhsl/ncsl/sxtqd', params);
};

// 工程统计
export const get_ZHSL_Gctj_List = (params) => axios.post(common.zhslIp + 'zhsl/ncsl/gctj', params);

// 堤防点位列表
export const get_DF_Poi_List = () => axios.get(common.zhslIp + 'zhsl/ghjs/df');

// 农村水利===============================================================
// 六个统计项---分为行政区划、三大区块、六大流域
export const getNcSixData = (arr) => axios.get(common.zhslIp + `zhsl/ncsl/data/${arr[0]}/${arr[1]}`);
export const getNcSixData_QK = (arr) => axios.get(common.zhslIp + `zhsl/ncsl/databk/${arr[0]}/${arr[1]}`);
export const getNcSixData_LY = (arr) => axios.get(common.zhslIp + `zhsl/ncsl/dataly/${arr[0]}/${arr[1]}`);

// 水闸列表
export const get_Nc_SZ_List = (params) => axios.post(common.zhslIp + `zhsl/ncsl/szqd`, params);

// 泵站列表
export const get_Nc_BZ_List = (params) => axios.post(common.zhslIp + `zhsl/ncsl/bzqd`, params);

// 涵洞列表
export const get_Nc_HD_List = (params) => axios.post(common.zhslIp + `zhsl/ncsl/hdqd`, params);

// 渠道列表
export const get_Nc_QD_List = (params) => axios.post(common.zhslIp + `zhsl/ncsl/qdqd`, params);

// 河道列表
export const get_Nc_HeDao_List = (params) => axios.post(common.zhslIp + `zhsl/ncsl/hedaoqd`, params);

// 桥梁列表
export const get_Nc_QL_List = (params) => axios.post(common.zhslIp + `zhsl/ncsl/qlqd`, params);

// 河道统计
export const get_Nc_HeDaoTJ_list = (arr) => axios.get(common.zhslIp + `zhsl/ncsl/hedaotj/${arr[0]}/${arr[1]}`);

// 河道点位--没有名称
export const get__HeDao_poi = () => axios.post(common.zhslIp + `zhsl/ncsl/test2`);
// 保存河道信息
export const save_hedao_info = (params) => axios.post(common.zhslIp + 'zhsl/ncsl/updateHedao', params);

// 沿江灌区--渠首
export const get_Nc_YJGQ_QS_list = (params) => axios.post(common.zhslIp + `zhsl/ncsl/gqQs`, params);
// 沿江灌区--支渠
export const get_Nc_YJGQ_QD_list = (params) => axios.post(common.zhslIp + `zhsl/ncsl/gqQd`, params);
// 沿江灌区--干渠
export const get_Nc_YJGQ_HD_list = (params) => axios.post(common.zhslIp + `zhsl/ncsl/gqHd`, params);
// 沿江灌区--涵闸
export const get_Nc_YJGQ_SZ_list = (params) => axios.post(common.zhslIp + `zhsl/ncsl/gqHz`, params);
// 沿江灌区--泵站
export const get_Nc_YJGQ_BZ_list = (params) => axios.post(common.zhslIp + `zhsl/ncsl/gqBz`, params);
// 沿江灌区--5项统计
export const get_Nc_YJGQ_Five_Data = () => axios.post(common.zhslIp + `zhsl/ncsl/gqtj`);

export const get_NC_STBC_Polygon_Poi = (params) => axios.post(common.zhslIp + `zhsl/ncsl/stbc`, params);
export const get_NC_STBC_List = (params) => axios.post(common.zhslIp + `zhsl/ncsl/stbcsdcx`, params);
export const get_NC_STBC_PieInfo = () => axios.post(common.zhslIp + `zhsl/ncsl/stbcsdtj`);
export const get_NC_STBC_ListInfo = () => axios.post(common.zhslIp + `zhsl/ncsl/stbcantj`);

// 规划建设===============================================================
// 工程统计
export const getThreeData = (params) => axios.post(common.zhslIp + 'zhsl/ghjs/gctj', params);
// 堤防列表
export const get_GH_DF_List = (params) => axios.post(common.zhslIp + `zhsl/ghjs/df`, params);
// 泵站列表
export const get_GH_BZ_List = (params) => axios.post(common.zhslIp + `zhsl/ghjs/bz`, params);
// 涵闸列表
export const get_GH_HZ_List = (params) => axios.post(common.zhslIp + `zhsl/ghjs/hz`, params);
// 实时水情列表
export const get_GH_SQ_List = (params) => axios.get(common.zhslIp + 'zhsl/ghjs/sq', params);
// 历史水情列表
export const get_History_GH_SQ_List = (params) => axios.post(common.zhslIp + 'zhsl/ghjs/historySq', params);
// 实时雨情列表
export const get_GH_YQ_List = (params) => axios.get(common.zhslIp + 'zhsl/ghjs/yq', params);
// 历史雨情列表
export const get_History_GH_YQ_List = (params) => axios.post(common.zhslIp + 'zhsl/ghjs/historyYq', params);
// 左侧堤防列表
export const get_Left_GH_DF_List = (params) => axios.post(common.zhslIp + 'zhsl/ghjs/dftj', params);
// 根据左侧堤防列表，查询沿线泵站涵闸点位
export const get_BZ_HZ_List_By_DFname = (params) => axios.post(common.zhslIp + 'zhsl/ghjs/listByDf', params);
// 水资源====================================================================================
// 自备水单位列表
export const get_ZBS_SZY_List = (arr) => axios.get(common.zhslIp + `zhsl/szy/zbsdw/${arr[0]}/${arr[1]}`);

// 非居民城镇用水户
export const get_FJMCZYSH_SZY_List = (type) => axios.get(common.zhslIp + `zhsl/szy/gsml/${type}`);

// 重点用水户列表
export const get_ZDYSH_SZY_List = (arr) => axios.get(common.zhslIp + `zhsl/szy/zdysh/${arr[0]}/${arr[1]}`);

// 水利监控==================================================================================
// 获取右边8个监控信息
export const get_eight_camera = () => axios.post(common.zhslIp + `zhsl/ncsl/sxttop`);
// 修改右边8个中某个监控信息
export const set_camera_info = (params) => axios.post(common.zhslIp + `zhsl/ncsl/changesxttop`, params);
// 摄像头操控
export const controlCamera = (params, id) => axios.put('http://172.21.98.111:8088' + `/videoService/ptz/${id} HTTP/1.1`, params);

//社会治理平台-------------------------------------------------------------------------------------------

// 获取广陵区以及下属街道网格等tree形数据
export const getRegionTreeData = (params) => axios.get(common.newServerIp + 'data/getNetTree', { ...params });

// 根据当前网格id获取网格名称以及所属社区名称
export const getNetNameAndCommunityName = (id) => axios.get(common.newServerIp + `data/findWgList/${id}`);

// 获取重点人员分类统计
export const getKeyPeopleTypeData = (params) => axios.get(common.newServerIp + `data/keyPeopleSum/${params[0]}/${params[1]}`);

// 获取某一类重点人员列表
export const getKeyPeopleListData = (params) => axios.post(common.newServerIp + `data/addressByType`, params);

// 获取某个重点人员人房信息
export const getKeyPeopleDetailData = (id) => axios.get(common.newServerIp + `data/addressByKpId/${id}`);

// 获取社区下的网格员列表
export const getNetGridorList = (params) => axios.get(common.newServerIp + `data/wgyList/${params[0]}/${params[1]}`);

// 获取社区下的人员类别统计数据
export const getPeopleTypeData = (id) => axios.get(common.newServerIp + `data/peopleSumByType/${id}`);

// 查找社区、村的负责人
export const getFZR = (id) => axios.get(common.newServerIp + `data/findPerson/${id}`);

// 获取广陵区以及下属街道网格统计数据
export const getNetGridData = (id) => axios.get(common.newServerIp + `data/zhwg/${id}`);

// 获取实有户数和实有人口
export const getHouseAndPeople = (params) => axios.get(common.newServerIp + `data/reportData/${params[0]}/${params[1]}`);

// 获取图例统计数据
export const getLegendDataTotal = () => axios.get(common.newServerIp + `data/totalComponents`);

// 获取社区点位
export const getCommunityData = () => axios.post(common.newServerIp + `data/village`, { pageSize: 200, pageNo: 1 });

// 获取城市公园点位
export const getParkData = (params) => axios.post(common.newServerIp + `data/sport`, params);
// 获取城市医疗点位
export const getHospitalData = (params) => axios.post(common.newServerIp + `data/ylbj`, params);

// 获取微网格、联络员数量
export const getMiniNetAndManData = (params) => axios.get(common.newServerIp + `data/wwgqd/${params[0]}/${params[1]}`);

// 获取摄像头列表
export const videoList = () =>
  axios.get(
    // common.videoNewApi + 'video-dh/api/device/all'
    common.videoNewApi + 'video-dh/api/device/all?last=1',
  );

// 获取视频流url
export const getVideoUrl = (id) => axios.get(common.videoNewApi2 + `video-dh/dahua/camera/hls/${id}`);

// 获取第七级网格
// export const getHousePoi = params => axios.get(
//   common.newServerIp +`data/net/${params}`
// )
export const getHousePoi = (params) => axios.post(common.serverIp + 'city3dAPI/' + `address/getAddressByComName.action`, params);

// 根据房屋id查询所属微网格数据
export const getMiniNetByAddId = (addId) => axios.get(common.newServerIp + `data/wwgByAddress/${addId}`);

// 根据层级id查询男女比例已经政治面貌
export const getRateDataByNetId = (arr) => axios.get(common.newServerIp + `peopleBase/data/${arr[0]}/${arr[1]}`);

// 根据层级id查询房屋统计项_1
export const getHouseStaDataByNetId_1 = (arr) => axios.get(common.newServerIp + `peopleBase/houseStatus/${arr[0]}/${arr[1]}`);
// 根据层级id查询房屋统计项_2
export const getHouseStaDataByNetId_2 = (arr) => axios.get(common.newServerIp + `peopleBase/peopleType/${arr[0]}/${arr[1]}`);

// 房屋列表--网格层
export const getHouseListByNetId = (arr) => axios.get(common.newServerIp + `peopleBase/houseList/${arr[1]}`);

// 房屋列表--微网格层
export const getHouseListByMiniNetId = (arr) => axios.get(common.newServerIp + `peopleBase/houseInfo/${arr[1]}`);

// 房屋详情列表--微网格层
export const getHouseDeatilList = (id, unit) => axios.get(common.newServerIp + `peopleBase/house/${id}/${unit}`);

// 获取人房信息
export const getHouseInfo = (params) => axios.get(common.newServerIp + `data/address/${params}`);

// 多种统计信息
export const getDYInfo = (params) =>
  axios.get(
    common.newServerIp + `data/${params[0]}/${params[1]}`,
    //  common.videoNewApi + 'video-dh/api/device/all'
  );

// 获取广陵区下各街道乡镇轮廓数据
export const getStreetData = (params) => axios.post(common.serverIp + '/api/scadapter/service/1453650637551067138/search', { ...params });

// -----------------------------------------------------------------------------------------------

//地图-获取全部3dtiles数据地址
export const getTiles3D = (params) =>
  axios.post(common.serverIp + 'city3dAPI/' + 'tiles3d/getTiles3D.action', {
    ...params,
  });

//地图-获取全部街道名
export const getStreet = (params) =>
  axios.post(common.serverIp + 'city3dAPI/' + 'street/getStreetAll.action', {
    ...params,
  });

//视频-清除所有视频转换进程
export const clearVideoConverter = (params) => axios.post(common.serverIp + 'city3dAPI/' + 'video/clearffVideoConverter.action', { ...params });
