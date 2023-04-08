import { get_zpdt_data } from '@/api/xsApi3.js';
import { wbd_list2, wbd_list3 } from '@/api/xsApi.js';
const subString = (val) => {
  if (val.length <= 4) {
    return val;
  } else {
    let str = val.substr(0, 4) + '...';
    return str;
  }
};
export function zoomAction(type) {
  this.layoutTheMap('county');
  this.isClickStreet = false;
  this.area_code = 'county';
  this.$store.commit('setCurrentAreaName', '萧山区');
  this.$store.commit('setHookMapReactionWithTopData', {
    jd: '',
    bumpPointId: '',
  });
  switch (this.$route.name) {
    case 'yxzsCopy':
      this.$router
        .replace({
          name: 'yxzsCopy',
        })
        .catch((err) => {
          console.log('err');
        });
      break;
    case 'yxzsDetailsCopy':
      this.$router
        .replace({
          name: 'yxzsCopy',
        })
        .catch((err) => {
          console.log('err');
        });
      break;
    case 'wbdCopy':
      this.$router
        .replace({
          name: 'xbgCopy',
        })
        .catch((err) => {
          console.log('err');
        });
      break;
  }
}
export function resetLayersAndZoom() {
  this.layoutTheMap('county');
  this.isClickStreet = false;
  this.area_code = 'county';
}
export function setEveryTownFlagAction() {
  this.vector_flag_data.getSource().clear();
  if (this.vector_popup_data) {
    this.vector_popup_data.getSource().clear();
  }
  let list = [];
  get_zpdt_data().then((res) => {
    this.vector_flag_data.getSource().clear();
    list = res.data.data;
    list.forEach((ele) => {
      ele.pageSource = 'yxzsCard';
      ele.location = ele.zb.split(',');
      ele.town = ele.jd;
      ele.count1 = ele.gfx;
      ele.count2 = ele.zfx;
      ele.count3 = ele.dfx;
    });
    let masterData = [
      {
        town: '浦阳镇',
        count1: 1,
        count2: 2,
        count3: 3,
        location: [120.2476345477414, 29.967160170551843],
      },
      {
        town: '进化镇',
        count1: 1,
        count2: 2,
        count3: 3,
        location: [120.30309304746997, 29.992028018182026],
      },
      {
        town: '河上镇',
        count1: 1,
        count2: 2,
        count3: 3,
        location: [120.1607270477057, 29.952187062938282],
      },
      {
        town: '楼塔镇',
        count1: 1,
        count2: 2,
        count3: 3,
        location: [120.11519204737655, 29.89416308168546],
      },
      {
        town: '所前镇',
        count1: 1,
        count2: 2,
        count3: 3,
        location: [120.2879195478595, 30.091535906016475],
      },
      {
        town: '临浦镇',
        count1: 1,
        count2: 2,
        count3: 3,
        location: [120.24487104785521, 30.039647768977886],
      },
      {
        town: '戴村镇',
        count1: 1,
        count2: 2,
        count3: 3,
        location: [120.1553070476163, 29.995627924044676],
      },
      {
        town: '义桥镇',
        count1: 1,
        count2: 2,
        count3: 3,
        location: [120.17165204737272, 30.065509590268892],
      },
      {
        town: '闻堰街道',
        count1: 1,
        count2: 2,
        count3: 3,
        location: [120.19162054780332, 30.132787821330353],
      },
      {
        town: '蜀山街道',
        count1: 1,
        count2: 2,
        count3: 3,
        location: [120.23692654780508, 30.123588063405418],
      },
      {
        town: '益农镇',
        count1: 1,
        count2: 2,
        count3: 3,
        location: [120.57974804768938, 30.191392277547333],
      },
      {
        town: '党湾镇',
        count1: 1,
        count2: 2,
        count3: 3,
        location: [120.53757554746818, 30.232108203966842],
      },
      {
        town: '瓜沥镇',
        count1: 1,
        count2: 2,
        count3: 3,
        location: [120.45967854768665, 30.185087443565312],
      },
      {
        town: '靖江街道',
        count1: 1,
        count2: 2,
        count3: 3,
        location: [120.47296604738119, 30.2391065197601],
      },
      {
        town: '南阳街道',
        count1: 1,
        count2: 2,
        count3: 3,
        location: [120.41855504795151, 30.26837124662407],
      },
      {
        town: '衙前镇',
        count1: 1,
        count2: 2,
        count3: 3,
        location: [120.38328054775536, 30.153854267052523],
      },
      {
        town: '新塘街道',
        count1: 1,
        count2: 2,
        count3: 3,
        location: [120.30829054743677, 30.15753416994552],
      },
      {
        town: '城厢街道',
        count1: 1,
        count2: 2,
        count3: 3,
        location: [120.24837754745354, 30.16725891387049],
      },
      {
        town: '北干街道',
        count1: 1,
        count2: 2,
        count3: 3,
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
        count1: 1,
        count2: 2,
        count3: 3,
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
    if (list && list.length) {
      masterData = list;
    }
    let empty = [];
    const regenerateData = (ele, index) => {
      const iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform(ele.location, 'EPSG:4326', 'EPSG:4326')),
        addon: ele,
      });
      const iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [90, 140],
          anchorXUnits: 'pixels',
          anchorYUnits: 'pixels',
          crossOrigin: 'anonymous',
          src: './static/images/culturalSave/normalCluster.png',
          scale: 0.8,
        }),
        text: new ol.style.Text({
          text: ele.town,
          font: 'bold 12px sans-serif',
          fill: new ol.style.Fill({
            color: '#d6d9da',
          }),
          offsetX: -40,
          offsetY: -100,
        }),
        zIndex: index,
      });
      const icon2Style = new ol.style.Style({
        text: new ol.style.Text({
          text: String(ele.count1),
          font: 'bold 12px Helvetica',
          fill: new ol.style.Fill({
            color: '#ff4b4b',
          }),
          offsetX: -48,
          offsetY: -75,
        }),
        zIndex: index,
      });
      const icon3Style = new ol.style.Style({
        text: new ol.style.Text({
          text: String(ele.count2),
          font: 'bold 12px Helvetica',
          fill: new ol.style.Fill({
            color: '#ffe082',
          }),
          offsetX: -8,
          offsetY: -75,
        }),
        zIndex: index,
      });
      const icon4Style = new ol.style.Style({
        text: new ol.style.Text({
          text: String(ele.count3),
          font: 'bold 12px Helvetica',
          fill: new ol.style.Fill({
            color: '#88e886',
          }),
          offsetX: 35,
          offsetY: -75,
        }),
        zIndex: index,
      });
      iconFeature.setStyle([iconStyle, icon2Style, icon3Style, icon4Style]);
      empty.push(iconFeature);
    };
    masterData.forEach((ele, index) => {
      regenerateData(ele, index);
    });
    this.vector_flag_data.getSource().addFeatures(empty);
  });
}
export function setCulturalPoints(rankIds) {
  this.vector_flag_data.getSource().clear();
  if (this.vector_popup_data) {
    this.vector_popup_data.getSource().clear();
  }
  let jd = '';
  let category = '';
  let riskLevel = '';
  let riskType = '';
  let params1 = {
    jd: jd,
    category: category,
    currentPage: 1,
    id: '',
    fxdj: riskLevel,
    fxlx: riskType,
    isGraden: 0,
    pageSize: 3,
    publishName: '',
    rank: rankIds[0],
    trialList: [],
  };
  let params2 = {
    jd: jd,
    category: category,
    currentPage: 1,
    id: '',
    fxdj: riskLevel,
    fxlx: riskType,
    isGraden: 0,
    pageSize: 9,
    publishName: '',
    rank: rankIds[1],
    trialList: [],
  };
  let params3 = {
    jd: jd,
    category: category,
    currentPage: 1,
    id: '',
    fxdj: riskLevel,
    fxlx: riskType,
    isGraden: 0,
    pageSize: 54,
    publishName: '',
    rank: rankIds[2],
    trialList: [],
  };
  let p1 = wbd_list2(params1);
  let p2 = wbd_list2(params2);
  let p3 = wbd_list2(params3);
  let p4 = wbd_list3(params1);
  let p5 = wbd_list3(params2);
  let p6 = wbd_list3(params3);
  Promise.all([p1, p2, p3, p4, p5, p6]).then((res) => {
    this.vector_flag_data.getSource().clear();
    let arr1 = res[0].data.data.list;
    let arr2 = res[1].data.data.list;
    let arr3 = res[2].data.data.list;
    let arr4 = res[3].data.data.list;
    let arr5 = res[4].data.data.list;
    let arr6 = res[5].data.data.list;
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
    arr2.forEach((ele, index) => {
      ele.activation = arr5[index].activation;
      ele.lxdh = arr5[index].lxdh;
      ele.category = arr5[index].category;
      ele.maxLevel = arr5[index].maxLevel;
      ele.paths = arr5[index].paths;
      ele.rank = arr5[index].rank;
      ele.xcy = arr5[index].xcy;
      ele.yjbs = arr5[index].yjbs;
      ele.location = ele.poi.split(',');
    });
    arr3.forEach((ele, index) => {
      ele.activation = arr6[index].activation;
      ele.lxdh = arr6[index].lxdh;
      ele.category = arr6[index].category;
      ele.maxLevel = arr6[index].maxLevel;
      ele.paths = arr6[index].paths;
      ele.rank = arr6[index].rank;
      ele.xcy = arr6[index].xcy;
      ele.yjbs = arr6[index].yjbs;
      ele.location = ele.poi.split(',');
    });
    let arr = arr1.concat(arr2).concat(arr3);
    arr.forEach((item) => {
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
          anchor: item.publishName == '务本堂' ? [30, 40] : [0, 30],
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
    let masterData = arr;
    masterData.forEach((ele) => {
      //   console.log('loop', ele);
      regenerateData(ele);
    });
    this.vector_flag_data.getSource().addFeatures(empty);
  });
}
export function showPopupAction(item) {
  //   console.log('item', item);
  this.vector_popup_data.getSource().clear();
  if (this.vector_popup_data) {
    this.vector_popup_data.getSource().clear();
  }
  let masterData = [item];
  let empty = [];
  const regeneratePopupData = (ele) => {
    const iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform(ele.location, 'EPSG:4326', 'EPSG:4326')),
      addon: ele,
    });
    const iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [50, 90],
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        crossOrigin: 'anonymous',
        src: require('@/assets/img3/s-pop-bg.png'),
        scale: 1,
      }),
      text: new ol.style.Text({
        text: subString(ele.publishName),
        font: 'bold 16px sans-serif',
        fill: new ol.style.Fill({
          color: '#fff',
        }),
        offsetX: -10,
        offsetY: -75,
      }),
    });
    const icon2Style = new ol.style.Style({
      text: new ol.style.Text({
        text: '预警:',
        font: 'normal 14px Helvetica',
        fill: new ol.style.Fill({
          color: '#fff',
        }),
        offsetX: -25,
        offsetY: -52,
      }),
    });
    const icon3Style = new ol.style.Style({
      text: new ol.style.Text({
        text: '整改:',
        font: 'normal 14px Helvetica',
        fill: new ol.style.Fill({
          color: '#fff',
        }),
        offsetX: 32,
        offsetY: -52,
      }),
    });
    const icon4Style = new ol.style.Style({
      text: new ol.style.Text({
        text: String(ele.yjcs),
        font: 'normal 14px Helvetica',
        fill: new ol.style.Fill({
          color: '#ff4b4b',
        }),
        offsetX: 3,
        offsetY: -52,
      }),
    });
    const icon5Style = new ol.style.Style({
      text: new ol.style.Text({
        text: String(ele.zgcs),
        font: 'normal 14px Helvetica',
        fill: new ol.style.Fill({
          color: '#ffe082',
        }),
        offsetX: 59,
        offsetY: -52,
      }),
    });
    const icon6Style = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [-110, 210],
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        crossOrigin: 'anonymous',
        src: ele.sfxs == 0 ? require('@/assets/img3/x@3x.png') : require('@/assets/img3/x-n@3x.png'),
        scale: 0.4,
      }),
    });
    iconFeature.setStyle([iconStyle, icon2Style, icon3Style, icon4Style, icon5Style, icon6Style]);
    empty.push(iconFeature);
  };
  masterData.forEach((ele) => {
    regeneratePopupData(ele);
  });
  this.vector_popup_data.getSource().addFeatures(empty);
}
export function showZbzPopupAction(item) {
  this.vector_popup_data.getSource().clear();
  if (this.vector_popup_data) {
    this.vector_popup_data.getSource().clear();
  }
  let masterData = [item];
  let empty = [];
  const regeneratePopupData = (ele) => {
    const iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform(ele.location, 'EPSG:4326', 'EPSG:4326')),
      addon: ele,
    });
    const iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [50, 90],
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        crossOrigin: 'anonymous',
        src: require('@/assets/img3/s-pop-bg.png'),
        scale: 1,
      }),
      text: new ol.style.Text({
        text: subString(ele.publishName),
        font: 'bold 16px sans-serif',
        fill: new ol.style.Fill({
          color: '#fff',
        }),
        offsetX: -10,
        offsetY: -75,
      }),
    });
    const icon2Style = new ol.style.Style({
      text: new ol.style.Text({
        text: '设备总数量:',
        font: 'normal 14px Helvetica',
        fill: new ol.style.Fill({
          color: '#fff',
        }),
        offsetX: -10,
        offsetY: -52,
      }),
    });
    const icon4Style = new ol.style.Style({
      text: new ol.style.Text({
        text: ele.typeCount ? String(ele.typeCount) : '0',
        font: 'normal 14px Helvetica',
        fill: new ol.style.Fill({
          color: '#ff4b4b',
        }),
        offsetX: 40,
        offsetY: -52,
      }),
    });
    iconFeature.setStyle([iconStyle, icon2Style, icon4Style]);
    empty.push(iconFeature);
  };
  masterData.forEach((ele) => {
    regeneratePopupData(ele);
  });
  this.vector_popup_data.getSource().addFeatures(empty);
}
export function showYxzsFireRiskPopupAction(item) {
  //   console.log('item', item);
  this.vector_popup_data.getSource().clear();
  if (this.vector_popup_data) {
    this.vector_popup_data.getSource().clear();
  }
  let masterData = [item];
  let empty = [];
  const regeneratePopupData = (ele) => {
    const iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform(ele.location, 'EPSG:4326', 'EPSG:4326')),
      addon: ele,
    });
    const iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [50, 90],
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        crossOrigin: 'anonymous',
        src: require('@/assets/img3/s-pop-bg.png'),
        scale: 1,
      }),
      text: new ol.style.Text({
        text: subString(ele.pointName),
        font: 'bold 16px sans-serif',
        fill: new ol.style.Fill({
          color: '#fff',
        }),
        offsetX: -10,
        offsetY: -75,
      }),
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
    });
    //   const icon3Style = new ol.style.Style({
    //     text: new ol.style.Text({
    //       text: '整改:',
    //       font: 'normal 14px Helvetica',
    //       fill: new ol.style.Fill({
    //         color: '#fff',
    //       }),
    //       offsetX: 32,
    //       offsetY: -52,
    //     }),
    //   });
    const icon4Style = new ol.style.Style({
      text: new ol.style.Text({
        text: String(ele.typeCount),
        font: 'normal 14px Helvetica',
        fill: new ol.style.Fill({
          color: '#ff4b4b',
        }),
        offsetX: 23,
        offsetY: -52,
      }),
    });
    //   const icon5Style = new ol.style.Style({
    //     text: new ol.style.Text({
    //       text: String(ele.zgcs),
    //       font: 'normal 14px Helvetica',
    //       fill: new ol.style.Fill({
    //         color: '#ffe082',
    //       }),
    //       offsetX: 59,
    //       offsetY: -52,
    //     }),
    //   });
    //   const icon6Style = new ol.style.Style({
    //     image: new ol.style.Icon({
    //       anchor: [-110, 210],
    //       anchorXUnits: 'pixels',
    //       anchorYUnits: 'pixels',
    //       crossOrigin: 'anonymous',
    //       src: ele.sfxs == 0 ? require('@/assets/img3/x@3x.png') : require('@/assets/img3/x-n@3x.png'),
    //       scale: 0.4,
    //     }),
    //   });
    //   iconFeature.setStyle([iconStyle, icon2Style, icon3Style, icon4Style, icon5Style, icon6Style]);
    iconFeature.setStyle([iconStyle, icon2Style, icon4Style]);
    empty.push(iconFeature);
  };
  masterData.forEach((ele) => {
    regeneratePopupData(ele);
  });
  this.vector_popup_data.getSource().addFeatures(empty);
}
