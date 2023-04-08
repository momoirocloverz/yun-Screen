import {} from '@/api/xsApi3.js';
import { wbd_list2, wbd_list3 } from '@/api/xsApi';
export function xbgRankPoint(flag) {
  let params1 = null;
  let p1 = null;
  let p2 = null;
  this.vector_flag_data.getSource().clear();
  if (this.vector_popup_data) {
    this.vector_popup_data.getSource().clear();
  }
  params1 = {
    currentPage: 1,
    isGraden: 0,
    pageSize: 600,
    publishName: '',
    category: '',
    fxdj: '',
    fxlx: '',
    id: '',
    jd: this.$store.getters.fetchHookMapReactionWithTopData.jd || '',
    rank: flag,
    trialList: [],
  };
  p1 = wbd_list2(params1);
  p2 = wbd_list3(params1);
  Promise.all([p1, p2]).then((res) => {
    let arr1 = res[0].data.data.list;
    let arr4 = res[1].data.data.list;
    arr1.forEach((ele, index) => {
      ele.activation = arr4[index].activation;
      ele.lxdh = arr4[index].lxdh;
      ele.category = arr4[index].category;
      ele.maxLevel = arr4[index].maxLevel;
      ele.paths = arr4[index].paths;
      ele.rank = arr4[index].rank;
      ele.xcy = arr4[index].xcy;
      ele.yjbs = arr4[index].yjbs;
      ele.location = ele.poi.split(',');
    });
    arr1.forEach((item) => {
      item.pageSource = 'xbgCopy';
      if (!item.maxLevel) {
        item.maxLevel = '三级';
      }
      if (item.publishName == '务本堂') {
        item.maxLevel = '三级';
      }
      if (item.publishName == '茅湾里窑址') {
        item.maxLevel = '一级';
      }
    });
    let empty = [];
    const regenerateData = (item) => {
      const iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform(item.location, 'EPSG:4326', 'EPSG:4326')),
        addon: item,
      });
      let dynamicPic = '';
      if (item.maxLevel == '一级') {
        if (item.rank == '国保') {
          dynamicPic = './static/images/culturalSave/guogao.png';
        } else if (item.rank == '省保') {
          dynamicPic = './static/images/culturalSave/shenggao.png';
        } else if (item.rank == '市保') {
          dynamicPic = './static/images/culturalSave/shigao.png';
        } else {
          dynamicPic = './static/images/culturalSave/01.png';
        }
      } else if (item.maxLevel == '二级') {
        if (item.rank == '国保') {
          dynamicPic = './static/images/culturalSave/guozhong.png';
        } else if (item.rank == '省保') {
          dynamicPic = './static/images/culturalSave/shengzhong.png';
        } else if (item.rank == '市保') {
          dynamicPic = './static/images/culturalSave/shizhong.png';
        } else {
          dynamicPic = './static/images/culturalSave/02.png';
        }
      } else if (item.maxLevel == '三级') {
        if (item.rank == '国保') {
          dynamicPic = './static/images/culturalSave/guodi.png';
        } else if (item.rank == '省保') {
          dynamicPic = './static/images/culturalSave/shengdi.png';
        } else if (item.rank == '市保') {
          dynamicPic = './static/images/culturalSave/shidi.png';
        } else {
          dynamicPic = './static/images/culturalSave/03.png';
        }
      }
      const iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
          anchor: item.publishName == '务本堂' ? [30, 40] : [0, 40],
          anchorXUnits: 'pixels',
          anchorYUnits: 'pixels',
          crossOrigin: 'anonymous',
          src: dynamicPic,
          scale: 0.8,
        }),
      });
      iconFeature.setStyle(iconStyle);
      empty.push(iconFeature);
    };
    let masterData = arr1;
    masterData.forEach((ele) => {
      regenerateData(ele);
    });
    this.vector_flag_data.getSource().addFeatures(empty);
  });
}
export function xbgRankYXZSPoint(level, area) {
  let params1 = null;
  let p1 = null;
  let p2 = null;
  this.vector_flag_data.getSource().clear();
  if (this.vector_popup_data) {
    this.vector_popup_data.getSource().clear();
  }
  params1 = {
    currentPage: 1,
    isGraden: 0,
    pageSize: 600,
    publishName: '',
    category: '',
    fxdj: '',
    fxlx: '',
    id: '',
    jd: area,
    rank: level,
    trialList: [],
  };
  p1 = wbd_list2(params1);
  p2 = wbd_list3(params1);
  Promise.all([p1, p2]).then((res) => {
    let arr1 = res[0].data.data.list;
    let arr4 = res[1].data.data.list;
    arr1.forEach((ele, index) => {
      ele.activation = arr4[index].activation;
      ele.lxdh = arr4[index].lxdh;
      ele.category = arr4[index].category;
      ele.maxLevel = arr4[index].maxLevel;
      ele.paths = arr4[index].paths;
      ele.rank = arr4[index].rank;
      ele.xcy = arr4[index].xcy;
      ele.yjbs = arr4[index].yjbs;
      ele.location = ele.poi.split(',');
    });
    arr1.forEach((item) => {
      item.pageSource = 'yxzsCopy';
      if (!item.maxLevel) {
        item.maxLevel = '三级';
      }
      if (item.publishName == '务本堂') {
        item.maxLevel = '三级';
      }
      if (item.publishName == '茅湾里窑址') {
        item.maxLevel = '一级';
      }
    });
    let empty = [];
    const regenerateData = (item) => {
      const iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform(item.location, 'EPSG:4326', 'EPSG:4326')),
        addon: item,
      });
      let dynamicPic = '';
      if (item.maxLevel == '一级') {
        if (item.rank == '国保') {
          dynamicPic = './static/images/culturalSave/guogao.png';
        } else if (item.rank == '省保') {
          dynamicPic = './static/images/culturalSave/shenggao.png';
        } else if (item.rank == '市保') {
          dynamicPic = './static/images/culturalSave/shigao.png';
        } else {
          dynamicPic = './static/images/culturalSave/01.png';
        }
      } else if (item.maxLevel == '二级') {
        if (item.rank == '国保') {
          dynamicPic = './static/images/culturalSave/guozhong.png';
        } else if (item.rank == '省保') {
          dynamicPic = './static/images/culturalSave/shengzhong.png';
        } else if (item.rank == '市保') {
          dynamicPic = './static/images/culturalSave/shizhong.png';
        } else {
          dynamicPic = './static/images/culturalSave/02.png';
        }
      } else if (item.maxLevel == '三级') {
        if (item.rank == '国保') {
          dynamicPic = './static/images/culturalSave/guodi.png';
        } else if (item.rank == '省保') {
          dynamicPic = './static/images/culturalSave/shengdi.png';
        } else if (item.rank == '市保') {
          dynamicPic = './static/images/culturalSave/shidi.png';
        } else {
          dynamicPic = './static/images/culturalSave/03.png';
        }
      }
      const iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
          anchor: item.publishName == '务本堂' ? [30, 40] : [0, 40],
          anchorXUnits: 'pixels',
          anchorYUnits: 'pixels',
          crossOrigin: 'anonymous',
          src: dynamicPic,
          scale: 0.8,
        }),
      });
      iconFeature.setStyle(iconStyle);
      empty.push(iconFeature);
    };
    let masterData = arr1;
    masterData.forEach((ele) => {
      regenerateData(ele);
    });
    this.vector_flag_data.getSource().addFeatures(empty);
  });
}
export function xbgRankDisturbPoint(level, area) {
  let params1 = null;
  let p1 = null;
  let p2 = null;
  this.vector_flag_data.getSource().clear();
  if (this.vector_popup_data) {
    this.vector_popup_data.getSource().clear();
  }
  params1 = {
    currentPage: 1,
    isGraden: 0,
    pageSize: 600,
    publishName: '',
    category: '',
    fxdj: '',
    fxlx: '',
    id: '',
    jd: area,
    rank: level,
    trialList: [],
  };
  p1 = wbd_list2(params1);
  p2 = wbd_list3(params1);
  Promise.all([p1, p2]).then((res) => {
    let arr1 = res[0].data.data.list;
    let arr4 = res[1].data.data.list;
    arr1.forEach((ele, index) => {
      ele.activation = arr4[index].activation;
      ele.lxdh = arr4[index].lxdh;
      ele.category = arr4[index].category;
      ele.maxLevel = arr4[index].maxLevel;
      ele.paths = arr4[index].paths;
      ele.rank = arr4[index].rank;
      ele.xcy = arr4[index].xcy;
      ele.yjbs = arr4[index].yjbs;
      ele.location = ele.poi.split(',');
    });
    arr1.forEach((item) => {
      item.pageSource = 'xbgCopy';
      if (!item.maxLevel) {
        item.maxLevel = '三级';
      }
      if (item.publishName == '务本堂') {
        item.maxLevel = '三级';
      }
      if (item.publishName == '茅湾里窑址') {
        item.maxLevel = '一级';
      }
    });
    let empty = [];
    const regenerateData = (item) => {
      const iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform(item.location, 'EPSG:4326', 'EPSG:4326')),
        addon: item,
      });
      let dynamicPic = '';
      if (item.maxLevel == '一级') {
        if (item.rank == '国保') {
          dynamicPic = './static/images/culturalSave/guogao.png';
        } else if (item.rank == '省保') {
          dynamicPic = './static/images/culturalSave/shenggao.png';
        } else if (item.rank == '市保') {
          dynamicPic = './static/images/culturalSave/shigao.png';
        } else {
          dynamicPic = './static/images/culturalSave/01.png';
        }
      } else if (item.maxLevel == '二级') {
        if (item.rank == '国保') {
          dynamicPic = './static/images/culturalSave/guozhong.png';
        } else if (item.rank == '省保') {
          dynamicPic = './static/images/culturalSave/shengzhong.png';
        } else if (item.rank == '市保') {
          dynamicPic = './static/images/culturalSave/shizhong.png';
        } else {
          dynamicPic = './static/images/culturalSave/02.png';
        }
      } else if (item.maxLevel == '三级') {
        if (item.rank == '国保') {
          dynamicPic = './static/images/culturalSave/guodi.png';
        } else if (item.rank == '省保') {
          dynamicPic = './static/images/culturalSave/shengdi.png';
        } else if (item.rank == '市保') {
          dynamicPic = './static/images/culturalSave/shidi.png';
        } else {
          dynamicPic = './static/images/culturalSave/03.png';
        }
      }
      const iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
          anchor: item.publishName == '务本堂' ? [30, 40] : [0, 40],
          anchorXUnits: 'pixels',
          anchorYUnits: 'pixels',
          crossOrigin: 'anonymous',
          src: dynamicPic,
          scale: 0.8,
        }),
      });
      iconFeature.setStyle(iconStyle);
      empty.push(iconFeature);
    };
    let masterData = arr1;
    masterData.forEach((ele) => {
      regenerateData(ele);
    });
    this.vector_flag_data.getSource().addFeatures(empty);
  });
}
export function xbgCopyCulturalType(flag) {
  let params1 = null;
  let p1 = null;
  let p2 = null;
  this.vector_flag_data.getSource().clear();
  if (this.vector_popup_data) {
    this.vector_popup_data.getSource().clear();
  }
  params1 = {
    currentPage: 1,
    isGraden: 0,
    pageSize: 600,
    publishName: '',
    category: flag,
    fxdj: '',
    fxlx: '',
    id: '',
    jd: this.$store.getters.fetchHookMapReactionWithTopData.jd || '',
    rank: '',
    trialList: [],
  };
  p1 = wbd_list2(params1);
  p2 = wbd_list3(params1);
  Promise.all([p1, p2]).then((res) => {
    let arr1 = res[0].data.data.list;
    let arr4 = res[1].data.data.list;
    arr1.forEach((ele, index) => {
      ele.activation = arr4[index].activation;
      ele.lxdh = arr4[index].lxdh;
      ele.category = arr4[index].category;
      ele.maxLevel = arr4[index].maxLevel;
      ele.paths = arr4[index].paths;
      ele.rank = arr4[index].rank;
      ele.xcy = arr4[index].xcy;
      ele.yjbs = arr4[index].yjbs;
      ele.location = ele.poi.split(',');
    });
    arr1.forEach((item) => {
      item.pageSource = 'xbgCopy';
      if (!item.maxLevel) {
        item.maxLevel = '三级';
      }
      if (item.publishName == '务本堂') {
        item.maxLevel = '三级';
      }
      if (item.publishName == '茅湾里窑址') {
        item.maxLevel = '一级';
      }
    });
    let empty = [];
    const regenerateData = (item) => {
      const iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform(item.location, 'EPSG:4326', 'EPSG:4326')),
        addon: item,
      });
      let dynamicPic = '';
      switch (item.category) {
        case '古建筑':
          dynamicPic = './static/images/culturalSave/gujianzhu.png';
          break;
        case '近现代重要史迹及代表性建筑':
          dynamicPic = './static/images/culturalSave/daibiao.png';
          break;
        case '古遗址':
          dynamicPic = './static/images/culturalSave/guyizhi.png';
          break;
        case '古墓葬':
          dynamicPic = './static/images/culturalSave/gumuzang.png';
          break;
        case '碑刻':
          dynamicPic = './static/images/culturalSave/beike.png';
          break;
        default:
          break;
      }
      const iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
          anchor: item.publishName == '务本堂' ? [30, 40] : [0, 40],
          anchorXUnits: 'pixels',
          anchorYUnits: 'pixels',
          crossOrigin: 'anonymous',
          src: dynamicPic,
          scale: 0.8,
        }),
      });
      iconFeature.setStyle(iconStyle);
      empty.push(iconFeature);
    };
    let masterData = arr1;
    masterData.forEach((ele) => {
      regenerateData(ele);
    });
    this.vector_flag_data.getSource().addFeatures(empty);
  });
}
export function setZBZAIPoints(data) {
  this.vector_flag_data.getSource().clear();
  if (this.vector_popup_data) {
    this.vector_popup_data.getSource().clear();
  }
  let empty = [];
  const regenerateData = (item) => {
    const iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform(item.location, 'EPSG:4326', 'EPSG:4326')),
      addon: item,
    });
    let dynamicPic = '';
    switch (item.type) {
      case 'shuiya':
        dynamicPic = './static/images/culturalSave/shuiya.png';
        break;
      case 'yangan':
        dynamicPic = './static/images/culturalSave/yangan.png';
        break;
      case 'jiankong':
        dynamicPic = './static/images/culturalSave/jiankong.png';
        break;
      case 'dianya':
        dynamicPic = './static/images/culturalSave/dianya.png';
        break;
      default:
        break;
    }
    const iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [20, 40],
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        crossOrigin: 'anonymous',
        src: dynamicPic,
        scale: 1,
      }),
    });
    iconFeature.setStyle(iconStyle);
    empty.push(iconFeature);
  };
  let masterData = data;
  masterData.forEach((ele) => {
    ele.location = ele.poi.split(',');
    regenerateData(ele);
  });
  this.vector_flag_data.getSource().addFeatures(empty);
}
export function part365Points(data) {
  this.vector_flag_data.getSource().clear();
  if (this.vector_popup_data) {
    this.vector_popup_data.getSource().clear();
  }
  let empty = [];
  const regenerateData = (item) => {
    const iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform(item.location, 'EPSG:4326', 'EPSG:4326')),
      addon: item,
    });
    let dynamicPic = '';
    switch (item.type) {
      case 'yingji':
        dynamicPic = './static/images/culturalSave/yingjichuzhiyuan.png';
        break;
      case 'zhiyuanzhe':
        dynamicPic = './static/images/culturalSave/zhiyuanzhe.png';
        break;
      case 'wenwuxunjian':
        dynamicPic = './static/images/culturalSave/wuwuxunjian.png';
        break;
      case 'dangyuan':
        dynamicPic = './static/images/culturalSave/dangyuan.png';
        break;
      case 'qita':
        dynamicPic = './static/images/culturalSave/qitarenyuan.png';
        break;
    }
    const iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [20, 40],
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        crossOrigin: 'anonymous',
        src: dynamicPic,
        scale: 1,
      }),
    });
    iconFeature.setStyle(iconStyle);
    empty.push(iconFeature);
  };
  data.forEach((ele) => {
    ele.pageSource = 'hb365Copy';
  });
  let masterData = data;
  masterData.forEach((ele) => {
    ele.location = ele.poi.split(',');
    regenerateData(ele);
  });
  this.vector_flag_data.getSource().addFeatures(empty);
}
export function mainSearchPoint(data) {
  let params1 = null;
  let p1 = null;
  let p2 = null;
  this.vector_flag_data.getSource().clear();
  if (this.vector_popup_data) {
    this.vector_popup_data.getSource().clear();
  }
  params1 = {
    currentPage: 1,
    isGraden: 0,
    pageSize: 600,
    publishName: '',
    category: data.category.join(','),
    fxdj: '',
    fxlx: '',
    id: '',
    jd: data.street.join(','),
    rank: '',
    trialList: [],
  };
  p1 = wbd_list2(params1);
  p2 = wbd_list3(params1);
  console.log('params1', params1);
  Promise.all([p1, p2]).then((res) => {
    let arr1 = res[0].data.data.list;
    let arr4 = res[1].data.data.list;
    arr1.forEach((ele, index) => {
      ele.activation = arr4[index].activation;
      ele.lxdh = arr4[index].lxdh;
      ele.category = arr4[index].category;
      ele.maxLevel = arr4[index].maxLevel;
      ele.paths = arr4[index].paths;
      ele.rank = arr4[index].rank;
      ele.xcy = arr4[index].xcy;
      ele.yjbs = arr4[index].yjbs;
      ele.location = ele.poi.split(',');
    });
    console.log('ashd', arr1);
    arr1.forEach((item) => {
      item.pageSource = 'globalSearch';
      if (!item.maxLevel) {
        item.maxLevel = '三级';
      }
      if (item.publishName == '务本堂') {
        item.maxLevel = '三级';
      }
      if (item.publishName == '茅湾里窑址') {
        item.maxLevel = '一级';
      }
    });
    let empty = [];
    const regenerateData = (item) => {
      const iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform(item.location, 'EPSG:4326', 'EPSG:4326')),
        addon: item,
      });
      let dynamicPic = './static/images/culturalSave/03.png';
      const iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [20, 40],
          anchorXUnits: 'pixels',
          anchorYUnits: 'pixels',
          crossOrigin: 'anonymous',
          src: dynamicPic,
          scale: 0.8,
        }),
      });
      iconFeature.setStyle(iconStyle);
      empty.push(iconFeature);
    };
    let masterData = arr1;
    masterData.forEach((ele) => {
      regenerateData(ele);
    });
    this.vector_flag_data.getSource().addFeatures(empty);
  });
}
