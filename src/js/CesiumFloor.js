/**
 * 分层分户
 */

(function (window) {
  'use strict';

  function define_CesiumFloor() {
    //Main object
    let CesiumFloor = {};

    //算法：获取立方体中心点、方位角、边线长度
    function fixtoboxvertex(floorPoiStrArr) {
      let oriLonArr = [], oriLatArr = [];
      for (let i = 0; i < 12; i = i + 3) {
        oriLonArr.push(Number(floorPoiStrArr[i]));
        oriLatArr.push(Number(floorPoiStrArr[i + 1]));
      }
      oriLonArr.push(Number(floorPoiStrArr[0]));
      oriLatArr.push(Number(floorPoiStrArr[1]));
      let sumLon = 0, sumLat = 0;
      let heading = [], distance = [];
      for (let i = 0; i < oriLonArr.length - 1; i++) {
        sumLon += oriLonArr[i];
        sumLat += oriLatArr[i];
        heading.push(azimuthtwopoi(oriLonArr[i], oriLatArr[i], oriLonArr[i + 1], oriLatArr[i + 1]));
        distance.push(getFlatternDistance(oriLonArr[i], oriLatArr[i], oriLonArr[i + 1], oriLatArr[i + 1]));
      }
      let centerLon = sumLon / 4;
      let centerLat = sumLat / 4;
      return {centerLon, centerLat, heading, distance};

      //根据两点坐标计算方位角
      function azimuthtwopoi(x1, y1, x2, y2) {
        let result;
        let a = Math.abs(Math.atan((y2 - y1) / (x2 - x1))) * 180 / Math.PI;
        if ((x2 - x1) < 0) {
          if ((y2 - y1) > 0) {
            result = a + 270;
          } else {
            result = 90 - a + 180;
          }
        } else {
          if ((y2 - y1) > 0) {
            result = 90 - a;
          } else {
            result = a + 90;
          }
        }
        return result;
      }

      function getFlatternDistance(lng1, lat1, lng2, lat2) {
        let EARTH_RADIUS = 6378137.0; //单位M
        let PI = Math.PI;

        function getRad(d) {
          return d * PI / 180.0;
        }

        let f = getRad((lat1 + lat2) / 2);
        let g = getRad((lat1 - lat2) / 2);
        let l = getRad((lng1 - lng2) / 2);
        let sg = Math.sin(g);
        let sl = Math.sin(l);
        let sf = Math.sin(f);
        let s, c, w, r, d, h1, h2;
        let a = EARTH_RADIUS;
        let fl = 1 / 298.257;
        sg = sg * sg;
        sl = sl * sl;
        sf = sf * sf;
        s = sg * (1 - sl) + (1 - sf) * sl;
        c = (1 - sg) * (1 - sl) + sf * sl;
        w = Math.atan(Math.sqrt(s / c));
        r = Math.sqrt(s * c) / w;
        d = 2 * w * a;
        h1 = (3 * r - 1) / 2 / c;
        h2 = (3 * r + 1) / 2 / s;
        return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
      }
    }

    CesiumFloor.fixtoboxvertex=function(floorPoiStrArr) {
      let oriLonArr = [], oriLatArr = [];
      for (let i = 0; i < 12; i = i + 3) {
        oriLonArr.push(Number(floorPoiStrArr[i]));
        oriLatArr.push(Number(floorPoiStrArr[i + 1]));
      }
      oriLonArr.push(Number(floorPoiStrArr[0]));
      oriLatArr.push(Number(floorPoiStrArr[1]));
      let sumLon = 0, sumLat = 0;
      let heading = [], distance = [];
      for (let i = 0; i < oriLonArr.length - 1; i++) {
        sumLon += oriLonArr[i];
        sumLat += oriLatArr[i];
        heading.push(azimuthtwopoi(oriLonArr[i], oriLatArr[i], oriLonArr[i + 1], oriLatArr[i + 1]));
        distance.push(getFlatternDistance(oriLonArr[i], oriLatArr[i], oriLonArr[i + 1], oriLatArr[i + 1]));
      }
      let centerLon = sumLon / 4;
      let centerLat = sumLat / 4;
      return {centerLon, centerLat, heading, distance};

      //根据两点坐标计算方位角
      function azimuthtwopoi(x1, y1, x2, y2) {
        let result;
        let a = Math.abs(Math.atan((y2 - y1) / (x2 - x1))) * 180 / Math.PI;
        if ((x2 - x1) < 0) {
          if ((y2 - y1) > 0) {
            result = a + 270;
          } else {
            result = 90 - a + 180;
          }
        } else {
          if ((y2 - y1) > 0) {
            result = 90 - a;
          } else {
            result = a + 90;
          }
        }
        return result;
      }

      function getFlatternDistance(lng1, lat1, lng2, lat2) {
        let EARTH_RADIUS = 6378137.0; //单位M
        let PI = Math.PI;

        function getRad(d) {
          return d * PI / 180.0;
        }

        let f = getRad((lat1 + lat2) / 2);
        let g = getRad((lat1 - lat2) / 2);
        let l = getRad((lng1 - lng2) / 2);
        let sg = Math.sin(g);
        let sl = Math.sin(l);
        let sf = Math.sin(f);
        let s, c, w, r, d, h1, h2;
        let a = EARTH_RADIUS;
        let fl = 1 / 298.257;
        sg = sg * sg;
        sl = sl * sl;
        sf = sf * sf;
        s = sg * (1 - sl) + (1 - sf) * sl;
        c = (1 - sg) * (1 - sl) + sf * sl;
        w = Math.atan(Math.sqrt(s / c));
        r = Math.sqrt(s * c) / w;
        d = 2 * w * a;
        h1 = (3 * r - 1) / 2 / c;
        h2 = (3 * r + 1) / 2 / s;
        return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
      }
    }

    let buildingHighlight = [];
    let floorHeightDrawArr = [];
    //添加分层分户图形
    CesiumFloor.addFloor = function (options) {
      let viewer = options.viewer;
      let poiStrArr = options.floorPoi.split(",");
      let boxresult = fixtoboxvertex(poiStrArr);
      let headingVal = options.floorHeading;
      let heading, width, depth;
      switch (headingVal) {
        case 'north':
          heading = boxresult.heading[0];
          width = boxresult.distance[1];
          depth = boxresult.distance[0];
          break;
        case 'east':
          heading = boxresult.heading[1];
          width = boxresult.distance[2];
          depth = boxresult.distance[1];
          break;
        case 'south':
          heading = boxresult.heading[2];
          width = boxresult.distance[3];
          depth = boxresult.distance[2];
          break;
        case 'west':
          heading = boxresult.heading[3];
          width = boxresult.distance[0];
          depth = boxresult.distance[3];
          break;
        default:
          break;
      }
      let heightArr = options.floorHeight.split(",");
      for (let i = 0; i < heightArr.length - 2; i++) {
        let floorheight = Number(heightArr[i + 1]) - Number(heightArr[i]);
        let center = new Cesium.Cartesian3.fromDegrees(boxresult.centerLon, boxresult.centerLat, Number(heightArr[i]));
        let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);
        let headingresult = Cesium.Math.toRadians(heading + Number(options.miniheading));
        let hprRotation = Cesium.Matrix3.fromHeadingPitchRoll(new Cesium.HeadingPitchRoll(headingresult, 0.0, 0.0));
        let hpr = Cesium.Matrix4.fromRotationTranslation(hprRotation, new Cesium.Cartesian3(0.0, 0.0, floorheight / 2));
        Cesium.Matrix4.multiply(modelMatrix, hpr, modelMatrix);
        let color;
        if (options.floorName && options.floorName !== '') {
          let floorNum = options.floorName.substring(options.floorName.lastIndexOf("单元") + 2, options.floorName.length - 2);
          color = Number(floorNum) % 2 === 0 ? Cesium.Color.ORANGE.withAlpha(0.4) : Cesium.Color.GREEN.withAlpha(0.4);
        } else {
          color = i % 2 === 0 ? Cesium.Color.ORANGERED.withAlpha(0.3) : Cesium.Color.CHARTREUSE.withAlpha(0.3);
        }
        buildingHighlight.push(viewer.scene.primitives.add(new Cesium.ClassificationPrimitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: Cesium.BoxGeometry.fromDimensions({
              vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
              dimensions: new Cesium.Cartesian3(width, depth, floorheight)
            }),
            modelMatrix: modelMatrix,
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(color),
              show: new Cesium.ShowGeometryInstanceAttribute(true)
            },
            id: options.floorType + options.floorAddId
          }),
          classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
        })));
      }
    };

    let floorHighlight;
    //添加高亮的分层分户图形
    CesiumFloor.addFloorHighLight = function (options) {
      let viewer = options.viewer;
      let poiStrArr = options.floorPoi.split(",");
      let boxresult = fixtoboxvertex(poiStrArr);
      let headingVal = options.floorHeading;
      let heading, width, depth;
      switch (headingVal) {
        case 'north':
          heading = boxresult.heading[0];
          width = boxresult.distance[1];
          depth = boxresult.distance[0];
          break;
        case 'east':
          heading = boxresult.heading[1];
          width = boxresult.distance[2];
          depth = boxresult.distance[1];
          break;
        case 'south':
          heading = boxresult.heading[2];
          width = boxresult.distance[3];
          depth = boxresult.distance[2];
          break;
        case 'west':
          heading = boxresult.heading[3];
          width = boxresult.distance[0];
          depth = boxresult.distance[3];
          break;
        default:
          break;
      }
      let heightArr = options.floorHeight.split(",");
      for (let i = 0; i < heightArr.length - 2; i++) {
        let floorheight = Number(heightArr[i + 1]) - Number(heightArr[i]);
        let center = new Cesium.Cartesian3.fromDegrees(boxresult.centerLon, boxresult.centerLat, Number(heightArr[i]));
        let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);
        let headingresult = Cesium.Math.toRadians(heading + Number(options.miniheading));
        let hprRotation = Cesium.Matrix3.fromHeadingPitchRoll(new Cesium.HeadingPitchRoll(headingresult, 0.0, 0.0));
        let hpr = Cesium.Matrix4.fromRotationTranslation(hprRotation, new Cesium.Cartesian3(0.0, 0.0, floorheight / 2));
        Cesium.Matrix4.multiply(modelMatrix, hpr, modelMatrix);
        let color = Cesium.Color.BLUE.withAlpha(0.7);
        floorHighlight = viewer.scene.primitives.add(new Cesium.ClassificationPrimitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: Cesium.BoxGeometry.fromDimensions({
              vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
              dimensions: new Cesium.Cartesian3(width, depth, floorheight)
            }),
            modelMatrix: modelMatrix,
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(color),
              show: new Cesium.ShowGeometryInstanceAttribute(true)
            },
            id: options.floorType + options.floorAddId
          }),
          classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
        }));
      }
    };

    //删除所有分层分户图形
    CesiumFloor.removeFloor = function (viewer) {
      for (let i = 0; i < buildingHighlight.length; i++) {
        viewer.scene.primitives.remove(buildingHighlight[i]);//去除分层分户
      }
      buildingHighlight = [];

      for (let j = 0; j < floorHeightDrawArr.length; j++) {
        viewer.entities.remove(floorHeightDrawArr[j]);
      }
      floorHeightDrawArr = [];

      if (floorHighlight) {
        viewer.scene.primitives.remove(floorHighlight);//去除分层分户
        floorHighlight = undefined;
      }
    };

    //根据id删除分层分户图形
    CesiumFloor.removeFloorById = function (viewer) {
      if (floorHighlight) {
        viewer.scene.primitives.remove(floorHighlight);//去除分层分户
        floorHighlight = undefined;
      }
    };

    //绘制分层分户高度分割点
    CesiumFloor.drawFloorHeight = function (options) {
      let handler = handler && handler.destroy();
      let viewer = options.viewer;
      handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function (movement) {
        //获取鼠标点击处的坐标
        let cartesian = viewer.scene.pickPosition(movement.position);
        if (Cesium.defined(cartesian)) {
          let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          let testheight = cartographic.height;
          if (Number(testheight) < 0) {
            let ray = viewer.camera.getPickRay(movement.position);
            cartesian = viewer.scene.globe.pick(ray, viewer.scene);
          }
          cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          let height = cartographic.height;//模型高度
          //$('#' + options.printId).val($('#' + options.printId).val() + height + ',');

          floorHeightDrawArr.push(viewer.entities.add({
            position: cartesian,
            ellipsoid: {
              radii: new Cesium.Cartesian3(0.2, 0.2, 0.2),
              material: Cesium.Color.RED.withAlpha(0.8)
            }
          }));
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      handler.setInputAction(function (movement) {
        handler = handler && handler.destroy();
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    };

    return CesiumFloor;
  }

  if (typeof (CesiumFloor) === 'undefined') {
    window.CesiumFloor = define_CesiumFloor();
  } else {
    console.log("CesiumFloor already defined.");
  }
})(window);
