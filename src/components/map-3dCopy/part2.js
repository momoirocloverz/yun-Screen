import { get_zpdt_data, screenV3getHzfhCount } from '@/api/xsApi3.js';
import { wbd_list2, wbd_list3 } from '@/api/xsApi';
import ZBZStaticData from '@/components/ZBZStaticData.json';
import Static365Data from '@/components/365StaticData.json';
const subString = (val) => {
  if (val.length <= 4) {
    return val;
  } else {
    let str = val.substr(0, 4) + '...';
    return str;
  }
};
export function calculateZBZPoints(flag) {
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
  let masterData = ZBZStaticData;
  masterData.forEach((ele) => {
    ele.location = ele.poi.split(',');
    regenerateData(ele);
  });
  this.vector_flag_data.getSource().addFeatures(empty);
}
export function calculateHyperZBZPoints(flag) {
  let masterData = [
    {
      town: '浦阳镇',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.2476345477414, 29.967160170551843],
    },
    {
      town: '进化镇',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.30309304746997, 29.992028018182026],
    },
    {
      town: '河上镇',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.1607270477057, 29.952187062938282],
    },
    {
      town: '楼塔镇',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.11519204737655, 29.89416308168546],
    },
    {
      town: '所前镇',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.2879195478595, 30.091535906016475],
    },
    {
      town: '临浦镇',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.24487104785521, 30.039647768977886],
    },
    {
      town: '戴村镇',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.1553070476163, 29.995627924044676],
    },
    {
      town: '义桥镇',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.17165204737272, 30.065509590268892],
    },
    {
      town: '闻堰街道',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.19162054780332, 30.132787821330353],
    },
    {
      town: '蜀山街道',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.23692654780508, 30.123588063405418],
    },
    {
      town: '益农镇',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.57974804768938, 30.191392277547333],
    },
    {
      town: '党湾镇',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.53757554746818, 30.232108203966842],
    },
    {
      town: '瓜沥镇',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.45967854768665, 30.185087443565312],
    },
    {
      town: '靖江街道',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.47296604738119, 30.2391065197601],
    },
    {
      town: '南阳街道',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.41855504795151, 30.26837124662407],
    },
    {
      town: '衙前镇',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.38328054775536, 30.153854267052523],
    },
    {
      town: '新塘街道',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.30829054743677, 30.15753416994552],
    },
    {
      town: '城厢街道',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.24837754745354, 30.16725891387049],
    },
    {
      town: '北干街道',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.26134454756891, 30.19206826016127],
    },
    // {
    //   town: '宁围街道',
    //   count1: 1,
    //   count2: 2,
    //   count3: 3,
    //   location: [120.28455404737437, 30.236291093274755],
    // },
    {
      town: '新街街道',
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      location: [120.33461504756775, 30.195975157433978],
    },
    // {
    //   town: '萧山经济技术开发区',
    //   count1: 1,
    //   count2: 2,
    //   count3: 3,
    //   location: [120.30795804771121, 30.23532861897909],
    // },
  ];
  let empty = [];
  const regenerateData = (ele, index) => {
    const iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform(ele.location, 'EPSG:4326', 'EPSG:4326')),
      addon: ele,
    });
    const iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [100, 100],
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        crossOrigin: 'anonymous',
        src: './static/images/culturalSave/s-pop-bg2.png',
        scale: 0.8,
      }),
      text: new ol.style.Text({
        text: String(ele.town),
        font: 'bold 12px sans-serif',
        fill: new ol.style.Fill({
          color: '#d6d9da',
        }),
        offsetX: -50,
        offsetY: -70,
      }),
      zIndex: index,
    });
    const icon2Style = new ol.style.Style({
      text: new ol.style.Text({
        text: String(ele.count1),
        font: 'bold 12px Helvetica',
        fill: new ol.style.Fill({
          color: '#fff',
        }),
        offsetX: -63,
        offsetY: -45,
      }),
      zIndex: index,
    });

    const icon3Style = new ol.style.Style({
      text: new ol.style.Text({
        text: String(ele.count2),
        font: 'bold 12px Helvetica',
        fill: new ol.style.Fill({
          color: '#fff',
        }),
        offsetX: -35,
        offsetY: -45,
      }),
      zIndex: index,
    });

    const icon4Style = new ol.style.Style({
      text: new ol.style.Text({
        text: String(ele.count3),
        font: 'bold 12px Helvetica',
        fill: new ol.style.Fill({
          color: '#fff',
        }),
        offsetX: -7,
        offsetY: -45,
      }),
      zIndex: index,
    });

    const icon5Style = new ol.style.Style({
      text: new ol.style.Text({
        text: String(ele.count4),
        font: 'bold 12px Helvetica',
        fill: new ol.style.Fill({
          color: '#fff',
        }),
        offsetX: 19,
        offsetY: -45,
      }),
      zIndex: index,
    });
    const icon6Style = new ol.style.Style({
      text: new ol.style.Text({
        text: String(ele.count5),
        font: 'bold 12px Helvetica',
        fill: new ol.style.Fill({
          color: '#fff',
        }),
        offsetX: 46,
        offsetY: -45,
      }),
      zIndex: index,
    });
    iconFeature.setStyle([iconStyle, icon2Style, icon3Style, icon4Style, icon5Style, icon6Style]);
    empty.push(iconFeature);
  };
  masterData.forEach((ele, index) => {
    regenerateData(ele, index);
  });
  this.vector_flag_data.getSource().addFeatures(empty);
}
export function calculate365Points(flag) {
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
  Static365Data.forEach((ele) => {
    ele.pageSource = 'hb365Copy';
  });
  let masterData = Static365Data;
  masterData.forEach((ele) => {
    ele.location = ele.poi.split(',');
    regenerateData(ele);
  });
  this.vector_flag_data.getSource().addFeatures(empty);
}
export function differentRouterClick(flag) {
  switch (this.$route.name) {
    case 'yxzsCopy':
      break;
    case 'xbgCopy':
      break;
    case 'zbzCopy':
      break;
    case 'zbz2Copy':
      break;
    case 'hb365Copy':
      break;
  }
}
export function forTownClickForRoute(flag) {
  let params1 = null;
  let p1 = null;
  let p2 = null;
  this.vector_flag_data.getSource().clear();
  if (this.vector_popup_data) {
    this.vector_popup_data.getSource().clear();
  }
  switch (this.$route.name) {
    case 'yxzsCopy':
      this.$store.commit('setHookMapReactionWithTopData', {
        jd: flag,
        bumpPointId: '',
      });
      this.$router
        .replace({
          name: 'yxzsCopy',
          query: { zjmc: flag },
        })
        .catch((err) => {
          console.log('err');
        });
      params1 = {
        currentPage: 1,
        isGraden: 0,
        pageSize: 600,
        publishName: '',
        category: '',
        fxdj: '',
        fxlx: '',
        id: '',
        jd: flag,
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
      break;
    case 'xbgCopy':
      this.$store.commit('setHookMapReactionWithTopData', {
        jd: flag,
        bumpPointId: '',
      });
      params1 = {
        currentPage: 1,
        isGraden: 0,
        pageSize: 600,
        publishName: '',
        category: '',
        fxdj: '',
        fxlx: '',
        id: '',
        jd: flag,
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
      break;
    case 'wbdCopy':
      this.$store.commit('setHookMapReactionWithTopData', {
        jd: flag,
        bumpPointId: '',
      });
      params1 = {
        currentPage: 1,
        isGraden: 0,
        pageSize: 600,
        publishName: '',
        category: '',
        fxdj: '',
        fxlx: '',
        id: '',
        jd: flag,
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
      break;
    case 'zbzCopy':
      this.$store.commit('setHookMapReactionWithTopData', {
        jd: flag,
        bumpPointId: '',
      });
      params1 = {
        currentPage: 1,
        isGraden: 0,
        pageSize: 600,
        publishName: '',
        category: '',
        fxdj: '',
        fxlx: '',
        id: '',
        jd: flag,
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
          item.pageSource = 'zbzCopy';
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
      break;
    case 'zbz2Copy':
      break;
    case 'hb365Copy':
      break;
  }
}
export function forPointClickAction(addon) {
  if (addon.pageSource) {
    switch (addon.pageSource) {
      case 'yxzsCopy':
      case 'yxzsCopyRiskType':
      case 'yxzsCopyRiskLevel':
        this.$store.commit('setHookMapReactionWithTopData', {
          jd: addon.publishName,
          bumpPointId: addon.id,
        });
        this.$store.commit('setCurrentAreaName', addon.publishName);
        this.$router
          .push({
            name: 'yxzsDetailsCopy',
            query: { id: addon.id },
          })
          .catch((err) => {
            console.log('err');
          });
        if (addon.publishName == '务本堂') {
          this.$store.commit('setIsGlobalShowModel', true);
        }
        break;
      case 'xbgCopy':
        this.$store.commit('setHookMapReactionWithTopData', {
          jd: addon.publishName,
          bumpPointId: addon.id,
        });
        this.$store.commit('setCurrentAreaName', addon.publishName);
        this.$router
          .push({
            name: 'wbdCopy',
            query: { id: addon.id },
          })
          .catch((err) => {
            console.log('err');
          });
        if (addon.publishName == '务本堂') {
          this.$store.commit('setIsGlobalShowModel', true);
        }
        break;
      case 'hb365Copy':
        this.$store.commit('setHookMapReactionWithTopData', {
          jd: addon.publishName,
          bumpPointId: addon.id,
        });
        this.$store.commit('setCurrentAreaName', addon.publishName);
        this.isShow_hbyDetail = true;
        break;
      case 'globalSearch':
        switch (this.$route.name) {
          case 'yxzsCopy':
          case 'yxzsDetailsCopy':
            this.$store.commit('setHookMapReactionWithTopData', {
              jd: addon.publishName,
              bumpPointId: addon.id,
            });
            this.$store.commit('setCurrentAreaName', addon.publishName);
            this.$router
              .push({
                name: 'yxzsDetailsCopy',
                query: { id: addon.id },
              })
              .catch((err) => {
                console.log('err');
              });
            if (addon.publishName == '务本堂') {
              this.$store.commit('setIsGlobalShowModel', true);
            }
            break;
          case 'xbgCopy':
          case 'wbdCopy':
            this.$store.commit('setHookMapReactionWithTopData', {
              jd: addon.publishName,
              bumpPointId: addon.id,
            });
            this.$store.commit('setCurrentAreaName', addon.publishName);
            this.$router
              .push({
                name: 'wbdCopy',
                query: { id: addon.id },
              })
              .catch((err) => {
                console.log('err');
              });
            if (addon.publishName == '务本堂') {
              this.$store.commit('setIsGlobalShowModel', true);
            }
            break;
        }
        break;
      case 'yxzsCopyFireRiskPoint':
        this.FXFLOtherParams = {
          fxfl: addon.fxfl,
          pointName: addon.pointName,
        };
        this.$nextTick(() => {
          this.isShow_fxfl = true;
        });
        break;
      case 'yxzsCard':
        this.yxzsCardOtherParams = {
          jd: addon.jd,
        };
        this.$nextTick(() => {
          this.isShow_yxzsCard = true;
        });
        break;
      case 'zbzCopy':
        this.logo1 = '智防设备详情';
        this.logo2 = addon.publishName;
        this.$nextTick(() => {
          this.isShowTableList = true;
        });
        break;
    }
  }
}
export function fetchFxzsCopyRiskLevelData(riskLevel) {
  let params1 = {
    jd: this.$store.getters.fetchHookMapReactionWithTopData.jd || '',
    category: '',
    currentPage: 1,
    id: '',
    fxdj: riskLevel,
    fxlx: '',
    isGraden: 0,
    pageSize: 600,
    publishName: '',
    rank: '',
    trialList: [],
  };
  if (params1.fxdj) {
    if (params1.fxdj == 1) {
      let p1 = wbd_list2(params1);
      let p2 = wbd_list3(params1);
      Promise.all([p1, p2]).then((res) => {
        let arr1 = res[0].data.data.list;
        let arr4 = res[1].data.data.list;
        arr1.forEach((ele, index) => {
          ele.pageSource = 'yxzsCopyRiskLevel';
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
        this.$store.commit('setYxzsCopyRiskPoints', arr1);
      });
      /*   let position = '120.2792,30.0097';
      let track = [
        {
          activation: '0',
          category: '古遗址',
          id: '2',
          jd: '进化镇',
          lxdh: null,
          maxLevel: '一级',
          paths: null,
          poi: position,
          publishName: '茅湾里窑址',
          rank: '国保',
          sfxs: '0',
          xcy: null,
          yjbs: '0',
          yjcs: '0',
          zgcs: '0',
          pageSource: 'yxzsCopyRiskLevel',
          location: position.split(','),
        },
      ];
      this.$store.commit('setYxzsCopyRiskPoints', track); */
    } else {
      let p1 = wbd_list2(params1);
      let p2 = wbd_list3(params1);
      Promise.all([p1, p2]).then((res) => {
        let arr1 = res[0].data.data.list;
        let arr4 = res[1].data.data.list;
        arr1.forEach((ele, index) => {
          ele.pageSource = 'yxzsCopyRiskLevel';
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
        let after = arr1.filter((ele) => {
          return ele.publishName != '茅湾里窑址';
        });
        this.$store.commit('setYxzsCopyRiskPoints', after);
      });
    }
  } else {
    let p1 = wbd_list2(params1);
    let p2 = wbd_list3(params1);
    Promise.all([p1, p2]).then((res) => {
      let arr1 = res[0].data.data.list;
      let arr4 = res[1].data.data.list;
      arr1.forEach((ele, index) => {
        ele.pageSource = 'yxzsCopyRiskLevel';
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
      this.$store.commit('setYxzsCopyRiskPoints', arr1);
    });
  }
}
export function fxzsCopyRiskLevelDraw(data) {
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
        anchor: item.publishName == '务本堂' ? [0, 20] : [0, 40],
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
  let masterData = data;
  masterData.forEach((ele) => {
    regenerateData(ele);
  });
  this.vector_flag_data.getSource().addFeatures(empty);
}
export function fetchFxzsCopyRiskTypeData(riskType) {
  if (riskType) {
    screenV3getHzfhCount({ type: riskType })
      .then((res) => {
        if (res && res.data && res.data.code && res.data.code == 200) {
          let shorter = res.data.data;
          let typeMap = {
            用电用气隐患: '1',
            违规用火隐患: '4',
            易燃易爆隐患: '3',
            其他: '2',
          };
          if (shorter && shorter.length) {
            shorter.forEach((ele) => {
              ele.pageSource = 'yxzsCopyFireRiskPoint';
              ele.location = ele.poi.split(',');
              ele.fxdj = typeMap[riskType];
            });
            this.$store.commit('setYxzsCopyRiskTypePoints', shorter);
          } else {
            this.$store.commit('setYxzsCopyRiskTypePoints', []);
          }
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
}
export function fxzsCopyRiskTypeDraw(data) {
  this.vector_flag_data.getSource().clear();
  if (this.vector_popup_data) {
    this.vector_popup_data.getSource().clear();
  }
  let empty = [];
  const regenerateData = (item, index) => {
    const iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform(item.location, 'EPSG:4326', 'EPSG:4326')),
      addon: item,
    });
    let dynamicPic = '';
    if (item.fxdj) {
      if (item.fxdj == '1') {
        dynamicPic = './static/images/culturalSave/hz@3x@3x.png';
      } else if (item.fxdj == '2') {
        dynamicPic = './static/images/culturalSave/dj@3x@3x.png';
      } else if (item.fxdj == '3') {
        dynamicPic = './static/images/culturalSave/fr@3x@3x.png';
      } else if (item.fxdj == '4') {
        dynamicPic = './static/images/culturalSave/zr@3x@3x.png';
      } else {
        dynamicPic = './static/images/culturalSave/qita.png';
      }
    }
    const iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: item.publishName == '务本堂' ? [0, 20] : [0, 40],
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        crossOrigin: 'anonymous',
        src: dynamicPic,
        scale: 0.8,
      }),
    });
    const iconStyle1 = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [50, 90],
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        crossOrigin: 'anonymous',
        src: require('@/assets/img3/s-pop-bg.png'),
        scale: 1,
      }),
      text: new ol.style.Text({
        text: subString(item.pointName),
        font: 'bold 16px sans-serif',
        fill: new ol.style.Fill({
          color: '#fff',
        }),
        offsetX: -10,
        offsetY: -75,
      }),
      zIndex: index,
    });
    const icon2Style = new ol.style.Style({
      text: new ol.style.Text({
        text: '风险隐患:',
        font: 'normal 14px Helvetica',
        fill: new ol.style.Fill({
          color: '#fff',
        }),
        offsetX: -15,
        offsetY: -52,
      }),
      zIndex: index,
    });
    const icon4Style = new ol.style.Style({
      text: new ol.style.Text({
        text: String(item.typeCount),
        font: 'normal 14px Helvetica',
        fill: new ol.style.Fill({
          color: '#ff4b4b',
        }),
        offsetX: 23,
        offsetY: -52,
      }),
      zIndex: index,
    });

    iconFeature.setStyle([iconStyle, iconStyle1, icon2Style, icon4Style]);
    empty.push(iconFeature);
  };
  let masterData = data;
  masterData.forEach((ele, index) => {
    regenerateData(ele, index);
  });
  this.vector_flag_data.getSource().addFeatures(empty);
}
