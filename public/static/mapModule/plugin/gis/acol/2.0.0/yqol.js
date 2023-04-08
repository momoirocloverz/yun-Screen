/**
 * @desc 配置类，常量参数配置
 * @author LZZ
 * @version 2.0.0
 * @example
 * let acolConfig = new acol_config();
 */
class acol_config {
  constructor() {
    // 地图 0-18 级分辨率
    this.resolutions_4326 = [
      1.40625, 0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125e-4, 3.4332275390625e-4,
      1.71661376953125e-4, 8.58306884765625e-5, 4.291534423828125e-5, 2.1457672119140625e-5, 1.0728836059570312e-5, 5.364418029785156e-6, 2.682209014892578e-6, 1.341104507446289e-6,
      6.705522537231445e-7, 3.3527612686157227e-7,
    ];
    this.matrixIds_4326 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    // 天地图token数组
    this.tks = ['887589c1776c20e51814bbd9009666d0', '6a4522498e001c6ec374d880898dfacd', 'c68101aafe873146a1ba5224f7e81721', '95f9ccab2e663ea84e7ebb8d386c0e67'];
    // 交互事件类型
    this.mapEventType = {
      LEFT_CLICK: 'singleclick',
      LEFT_DOUBLE_CLICK: 'dblclick',
      MOVE_END: 'moveend',
      MOVE_START: 'movestart',
      // 结合实际使用，修改对应事件
      //MOUSE_WHEEL: 'wheel',
      MOUSE_WHEEL: 'moveend',
      MOUSE_MOVE: 'pointermove',
      MOUSE_DRAG: 'pointerdrag',
      MOUSE_DOWN: 'pointerdown',
      MOUSE_UP: 'pointerup',
      SELECT: 'select',
    };

    /**
     * @private
     * @description	对象深冻结
     * @param {Object} obj 参数对象
     */
    function deepFreeze(obj) {
      // 获取所有属性
      let propNames = Object.getOwnPropertyNames(obj);
      propNames.forEach((item) => {
        let prop = obj[item];
        // 如果某个属性的属性值是对象，则递归调用
        if (prop instanceof Object && prop !== null) {
          deepFreeze(prop);
        }
      });
      // 冻结自身
      return Object.freeze(obj);
    }
    // 冻结属性数据
    deepFreeze([this.resolutions_4326, this.matrixIds_4326, this.tks, this.mapEventType]);
  }
}

/**
 * @desc 数据加密算法类 - Data Encryption Algorithm
 * @author LZZ
 * @version 2.0.0
 * @example
 * let acolDea = new acol_dea();
 */
class acol_dea {
  #util;
  constructor() {
    this.UTF8Level = 1;
    this.UTF8Scale = 8192;
    this.#util = new acol_util();
  }
  /**
   * @private
   * @function
   * @description	getParam 获取私有属性
   * @param {String} field 属性字段
   * @return {Object} 返回私有属性对象
   */
  getParam(field) {
    return eval('this.#' + field);
  }
  /**
   * @function
   * @description	geoJson格式数据压缩加密（暂仅支持多边形面数据）
   * @param {Object} options 参数
   * @param {Object} options.data geoJson格式数据
   * @param {Number} [options.level] 等级参数，等级越大越精细
   * @param {Boolean} [options.downLoad] 是否下载geoJson结果数据，默认false
   * @return {Object} geoJson结果数据
   * @example
   * acolDea.encodeGeoJson({ data: geoJson, level: 8, downLoad: false });
   */
  encodeGeoJson({ data, level = 1, downLoad = false }) {
    // thiz
    let thiz = this;
    // 深拷贝，geoJson对象
    let geo = this.getParam('util').objDeepCopy(data);
    this.UTF8Level = level;
    // 压缩标识
    geo.UTF8Encoding = true;
    geo.UTF8Scale = this.UTF8Scale * this.UTF8Level;
    // 循环遍历
    for (let i = 0; i < geo.features.length; ++i) {
      const geometry = geo.features[i].geometry;
      if (geometry.type === 'Polygon') {
        const coordinates = geometry.coordinates;
        geometry.encodeOffsets = Array(coordinates.length);
        for (let c = 0; c < coordinates.length; ++c) {
          const offset = Array(2);
          const codeStr = encodePolygon(coordinates[c], offset);
          coordinates[c] = codeStr;
          geometry.encodeOffsets[c] = offset;
        }
      } else if (geometry.type === 'MultiPolygon') {
        const coordinates = geometry.coordinates;
        geometry.encodeOffsets = Array(coordinates.length);
        for (let c = 0; c < coordinates.length; ++c) {
          const coordinate = coordinates[c];
          geometry.encodeOffsets[c] = Array(coordinate.length);
          for (let c2 = 0; c2 < coordinate.length; ++c2) {
            const offset = Array(2);
            const codeStr = encodePolygon(coordinate[c2], offset);
            coordinate[c2] = codeStr;
            geometry.encodeOffsets[c][c2] = offset;
          }
        }
      }
    }
    // 下载
    if (downLoad) this.getParam('util').downLoadGeoJsonData(geo);
    return geo;

    /**
     * @private
     * @description	多边形数据加密处理
     * @param {Array.<Number>} coordinate
     * @param {Array.<Number>} encodeOffsets
     */
    function encodePolygon(coordinate, encodeOffsets) {
      let result = '';
      let prevX = quantize(coordinate[0][0]);
      let prevY = quantize(coordinate[0][1]);
      // Store the origin offset
      encodeOffsets[0] = prevX;
      encodeOffsets[1] = prevY;
      for (let i = 0; i < coordinate.length; ++i) {
        let point = coordinate[i];
        result += encode(point[0], prevX);
        result += encode(point[1], prevY);
        prevX = quantize(point[0]);
        prevY = quantize(point[1]);
      }
      return result;
    }
    /**
     * @private
     * @description	数据量化处理
     * @param {Number} valN
     */
    function quantize(valN) {
      return Math.ceil(valN * thiz.UTF8Scale * thiz.UTF8Level);
    }
    /**
     * @private
     * @description	数据加密处理
     * @param {Number} valN
     * @param {Nymber} prev
     */
    function encode(valN, prev) {
      // Quantization
      valN = quantize(valN);
      // Delta
      valN = valN - prev;
      if (((valN << 1) ^ (valN >> 15)) + 64 === 8232) {
        // 8232 will get syntax error in js code
        valN--;
      }
      // ZigZag
      valN = (valN << 1) ^ (valN >> 15);
      // add offset and get unicode
      return String.fromCharCode(valN + 64);
    }
  }
  /**
   * @function
   * @description	geoJson格式压缩数据解密（暂仅支持多边形面数据）
   * @param {Object} options 参数
   * @param {Object} options.data geoJson格式数据
   * @param {Number} [options.level] 等级参数（当数据包含UTF8Scale属性时，以UTF8Scale为主，可不传此参数）
   * @param {Boolean} [options.downLoad] 是否下载geoJson结果数据，默认false
   * @return {Object} geoJson结果数据
   * @example
   * acolDea.decodeGeoJson({ data: geoJson });
   */
  decodeGeoJson({ data, level = 1, downLoad = false }) {
    // 深拷贝，geoJson对象
    let geo = this.getParam('util').objDeepCopy(data);
    if (!geo.UTF8Encoding) return geo;
    // UTF8Scale
    const encodeScale = geo.UTF8Scale || level * this.UTF8Scale;
    const features = geo.features;
    // 循环遍历
    for (let f = 0; f < features.length; ++f) {
      const feature = features[f];
      const geometry = feature.geometry;
      if (geometry.type === 'Polygon') {
        const coordinates = geometry.coordinates;
        for (let c = 0; c < coordinates.length; ++c) {
          coordinates[c] = decodePolygon(coordinates[c], geometry.encodeOffsets[c], encodeScale);
        }
      } else if (geometry.type === 'MultiPolygon') {
        const coordinates = geometry.coordinates;
        for (let c = 0; c < coordinates.length; ++c) {
          const coordinate = coordinates[c];
          for (let c2 = 0; c2 < coordinate.length; ++c2) {
            coordinate[c2] = decodePolygon(coordinate[c2], geometry.encodeOffsets[c][c2], encodeScale);
          }
        }
      }
    }
    // Has been decoded
    geo.UTF8Encoding = false;
    // 下载
    if (downLoad) this.getParam('util').downLoadGeoJsonData(geo);
    return geo;

    /**
     * @private
     * @description	多边形数据解密处理
     * @param {Array.<Number>} coordinate
     * @param {Array.<Number>} encodeOffsets
     * @param {Number} encodeScale
     */
    function decodePolygon(coordinate, encodeOffsets, encodeScale) {
      let result = [];
      let prevX = encodeOffsets[0];
      let prevY = encodeOffsets[1];

      for (let i = 0; i < coordinate.length; i += 2) {
        let x = coordinate.charCodeAt(i) - 64;
        let y = coordinate.charCodeAt(i + 1) - 64;
        // ZigZag decoding
        x = (x >> 1) ^ -(x & 1);
        y = (y >> 1) ^ -(y & 1);
        // Delta deocding
        x += prevX;
        y += prevY;

        prevX = x;
        prevY = y;
        // Dequantize
        result.push([x / encodeScale, y / encodeScale]);
      }
      return result;
    }
  }
}
/**
 * @desc 图层封装类
 * @author LZZ
 * @version 2.0.0
 * @param {Object} map ol.Map地图对象
 * @example
 * let acolLayer = new acol_layer(acMap.map);
 */
class acol_layer {
  #map;
  #config;
  #util;
  constructor(map) {
    this.#map = map;
    this.#config = new acol_config();
    this.#util = new acol_util();
  }
  /**
   * @private
   * @function
   * @description	getParam 获取私有属性
   * @param {String} field 属性字段
   * @return {Object} 返回私有属性对象
   */
  getParam(field) {
    return eval('this.#' + field);
  }
  /**
   * @function
   * @description	初始化天地图图层
   * @param {Object} options 参数
   * @param {String} options.name 图层名称，default: 'tdtLayer'
   * @param {String} options.type 天地图图层类型(vec:矢量图层，img:影像图层，ter:地形图层)，default: 'img'
   * @param {Number} [options.opacity] 透明度，0-1，default: 1
   * @param {String} [options.sourceType] 资源类型('WMTS'，'XYZ')，default: 'XYZ'
   * @param {String} [options.key] 开发者key，default: '887589c1776c20e51814bbd9009666d0','6a4522498e001c6ec374d880898dfacd'
   * @param {Boolean} options.isLabel 是否是label图层，default: false
   * @param {String} [options.projection] 坐标系，default: 'EPSG:4326'
   * @param {Boolean} [options.visible] 可见性，default: true
   * @param {Number} [options.minZoom] 图层最小比例尺等级，default: 0
   * @param {Number} [options.maxZoom] 图层最大比例尺等级，default: 18
   * @param {Number} [options.zIndex] 图层层级，default: 0
   * @return {Object} ol.layer.Tile
   * @example
   * acolLayer.tdtLayer({ name: 'tdtImg', type: 'img', sourceType: 'XYZ', isLabel: false, zIndex: 0 });
   */
  tdtLayer({
    name = 'tdtLayer',
    type = 'img',
    opacity = 1,
    sourceType = 'XYZ',
    key = '887589c1776c20e51814bbd9009666d0',
    isLabel = false,
    projection = 'EPSG:4326',
    visible = true,
    minZoom = 0,
    maxZoom = 18,
    zIndex = 0,
  }) {
    let layerType = isLabel ? (type === 'img' ? 'cia' : type === 'vec' ? 'cva' : type === 'ter' ? 'cta' : 'cia') : type;
    switch (sourceType) {
      case 'WMTS':
        return new ol.layer.Tile({
          name: name,
          type: 'wmtsLayer',
          opacity: opacity,
          source: new ol.source.WMTS({
            url: 'https://t{0-7}.tianditu.gov.cn/' + layerType + '_c/wmts?tk=' + key,
            layer: layerType,
            matrixSet: 'c',
            format: 'tiles',
            projection: projection,
            tileGrid: new ol.tilegrid.WMTS({
              origin: ol.extent.getTopLeft(ol.proj.get(projection).getExtent()),
              resolutions: this.getParam('config').resolutions_4326,
              matrixIds: this.getParam('config').matrixIds_4326,
            }),
            style: 'default',
            wrapX: true,
            crossOrigin: 'anonymous',
          }),
          visible: visible,
          minZoom: minZoom,
          maxZoom: maxZoom,
          zIndex: zIndex,
        });
      case 'XYZ':
        return new ol.layer.Tile({
          name: name,
          type: 'tdtLayer',
          opacity: opacity,
          source: new ol.source.XYZ({
            url: 'https://t{0-7}.tianditu.gov.cn/DataServer?T=' + layerType + '_w&x={x}&y={y}&l={z}&tk=' + key,
          }),
          visible: visible,
          minZoom: minZoom,
          maxZoom: maxZoom,
          zIndex: zIndex,
        });
      default:
        return null;
    }
  }
  /**
   * @function
   * @description	初始化矢量图层
   * @param {Object} options 参数
   * @param {String} options.name 图层名称，default: 'vectorLayer'
   * @param {Object} options.type 矢量图层类型，点(point)，线(line)，面(polygon)，文本标签(text)
   * @param {Object} [options.dataOption] 数据参数对象
   * @param {Object} options.dataOption.data geoJson格式数据
   * @param {Object} [options.style] 图层样式对象
   * @param {Object} [options.style.icon] 要素点图标样式
   * @param {Number} [options.style.icon.opacity] 透明度，0-1
   * @param {String} options.style.icon.src 图标url地址(不与iconField同时使用)
   * @param {String} options.style.icon.iconField 字段名称，为实现根据数据属性字段设置图标样式需求，优先级高于icon.src
   * @param {String} options.style.icon.iconPREF 拼接前缀，与icon.iconField搭配使用，拼接完整url地址
   * @param {String} options.style.icon.iconSUFF 拼接后缀，与icon.iconField搭配使用，拼接完整url地址
   * @param {Array.<Number>} [options.style.icon.anchor] 锚点，图标偏移属性。以图标左顶点为基准点，左上为正，右下为负。默认[0.5,0.5]为图标中心点。
   * @param {Number} [options.style.icon.scale] 图标缩放比例，默认1倍
   * @param {Object} [options.style.circle] 要素点圆形样式
   * @param {Number} options.style.circle.radius 半径
   * @param {Object} options.style.circle.fill 填充样式
   * @param {Object} options.style.circle.stroke 边界样式
   * @param {Array.<Number>} options.style.circle.displacement 偏移量。默认[0, 0]
   * @param {Object} [options.style.fill] 要素填充样式
   * @param {String} options.style.fill.color 面填充色 'rgba(255,255,0,0.2)'
   * @param {Object} [options.style.stroke] 要素边界样式
   * @param {String} options.style.stroke.color 线填充色 'rgba(255,255,0,1)'
   * @param {Number} options.style.stroke.width 线宽 2
   * @param {Object} [options.style.text] 要素文字样式
   * @param {String} options.style.text.field 属性字段，设置此属性后会优先选取对应值作为标签文字渲染
   * @param {String} options.style.text.text 标签文本，若已设置text.field参数，则此属性无效
   * @param {String} options.style.text.font 字体，例：'12px Calibri'
   * @param {Boolean} [options.style.text.overflow] 是否允许标签溢出，默认false
   * @param {Object} options.style.text.fill 填充样式
   * @param {Object} options.style.text.stroke 边界样式
   * @param {Number} [options.style.text.offsetX] 水平文本偏移量（以像素为单位），正值将使文本向右移动。默认0
   * @param {Number} [options.style.text.offsetY] 垂直文本偏移量（以像素为单位），正值将使文本向下移动。默认0
   * @param {Object} [options.style.text.backgroundStroke] 背景板边界样式
   * @param {Object} [options.style.text.backgroundFill] 背景板填充样式
   * @param {Array.<Number>} [options.style.text.padding] 背景板边界填充，例：[4,2,2,4]
   * @param {String} [options.projection] 坐标系，default: 'EPSG:4326'
   * @param {Boolean} [options.declutter] 避免重叠标签，default: false
   * @param {Boolean} [options.visible] 可见性，default: true
   * @param {Number} [options.minZoom] 图层最小比例尺等级，default: 0
   * @param {Number} [options.maxZoom] 图层最大比例尺等级，default: 18
   * @param {Number} [options.zIndex] 图层层级，default: 0
   * @return {Object} ol.layer.Vector
   * @example
   * acolLayer.vectorLayer({
   *	name: '行政区划面图层',
   *	type: 'polygon',
   *	dataOption: {
   *		data: geoJson_data,
   *	},
   *	style: {
   *		fill: { color: 'rgba(0, 255, 255, 0.2 )' },
   *		stroke: { color: 'rgba(0, 255, 255, 1)', width: 1 }
   *	},
   *	zIndex: 1
   * });
   */
  vectorLayer({ name = 'vectorLayer', type, dataOption = {}, style = null, projection = 'EPSG:4326', declutter = false, visible = true, minZoom = 0, maxZoom = 18, zIndex = 0 }) {
    // 矢量图层
    let vectorLayer = new ol.layer.Vector({
      name: name,
      type: 'vectorLayer',
      source: new ol.source.Vector({
        projection: projection,
      }),
      // 创建图层时，不设置图层样式
      style: null,
      declutter: declutter,
      visible: visible,
      minZoom: minZoom,
      maxZoom: maxZoom,
      zIndex: zIndex,
    });
    // 添加geoJson数据
    if (dataOption.data && Object.keys(dataOption.data).length) {
      // 添加geoJson格式数据
      let features = new ol.format.GeoJSON().readFeatures(dataOption.data, {
        featureProjection: projection,
      });
      vectorLayer.getSource().addFeatures(features);
    }
    // 配置图层样式 或 直接返回无样式图层
    if (style) return this.vectorLayerSetStyle(vectorLayer, type, style);
    return vectorLayer;
  }
  /**
   * @function
   * @private
   * @description	矢量图层样式设置
   * @param {Object} layer 图层对象
   * @param {Object} type 矢量图层类型，点(point)，线(line)，面(polygon)，文本标签(text)
   * @param {Object} style 样式
   * @param {Object} style.icon ol.style.Icon 要素点图标样式
   * @param {Object} style.circle ol.style.Circle 要素点圆形样式
   * @param {Object} style.fill ol.style.Fill 要素填充样式
   * @param {Object} style.stroke ol.style.Stroke 要素边界样式
   * @param {Object} style.text ol.style.Text 要素文字样式
   * @return {Object} ol.layer.Vector
   */
  vectorLayerSetStyle(layer, type, { icon, circle, fill, stroke, text }) {
    switch (type) {
      case 'point':
        layer.setStyle(function (feature) {
          let style_temp = new ol.style.Style({
            image: icon
              ? new ol.style.Icon({
                  opacity: icon.opacity || 1,
                  src: icon.iconField ? (icon.iconPREF || '') + feature.get(icon.iconField) + (icon.iconSUFF || '') : icon.src,
                  anchor: icon.anchor || [0.5, 0.5],
                  scale: icon.scale || 1,
                })
              : circle
              ? new ol.style.Circle({
                  radius: circle.radius || 8,
                  fill: circle.fill ? new ol.style.Fill(circle.fill) : new ol.style.Fill({ color: 'rgba(0, 191, 255, 1)' }),
                  stroke: circle.stroke ? new ol.style.Stroke(circle.stroke) : new ol.style.Stroke({ color: 'rgba(255, 255, 255, 1)', width: 2 }),
                  displacement: circle.displacement || [0, 0],
                })
              : new ol.style.Circle({
                  radius: 8,
                  fill: new ol.style.Fill({ color: 'rgba(0, 191, 255, 1)' }),
                  stroke: new ol.style.Stroke({ color: 'rgba(255, 255, 255, 1)', width: 2 }),
                  displacement: [0, 0],
                }),
            text: text
              ? new ol.style.Text({
                  text: text.field ? feature.get(text.field) + '' || '' : text.text || '',
                  font: text.font || '12px Calibri',
                  overflow: text.overflow || false,
                  fill: text.fill ? (!Object.keys(text.fill).length ? null : new ol.style.Fill(text.fill)) : new ol.style.Fill({ color: 'rgba(255, 255, 255, 1)' }),
                  stroke: text.stroke ? (!Object.keys(text.stroke).length ? null : new ol.style.Stroke(text.stroke)) : new ol.style.Stroke({ color: 'rgba(0, 0, 0, 1)', width: 3 }),
                  offsetX: text.offsetX || 0,
                  offsetY: text.offsetY || 0,
                  backgroundStroke: text.backgroundStroke ? new ol.style.Stroke(text.backgroundStroke) : null,
                  backgroundFill: text.backgroundFill ? new ol.style.Fill(text.backgroundFill) : null,
                  padding: text.padding || null,
                })
              : null,
          });
          return style_temp;
        });
        return layer;
      case 'line':
        layer.setStyle(function (feature) {
          let style_temp = new ol.style.Style({
            stroke: stroke ? new ol.style.Stroke(stroke) : new ol.style.Stroke({ color: 'rgba(255, 255, 0, 1)', width: 3 }),
          });
          return style_temp;
        });
        return layer;
      case 'polygon':
        layer.setStyle(function (feature) {
          let style_temp = new ol.style.Style({
            fill: fill ? (!Object.keys(fill).length ? null : new ol.style.Fill(fill)) : new ol.style.Fill({ color: 'rgba(255, 255, 0, 0.2)' }),
            stroke: stroke ? (!Object.keys(stroke).length ? null : new ol.style.Stroke(stroke)) : new ol.style.Stroke({ color: 'rgba(255, 255, 0, 1)', width: 1 }),
            text: text
              ? new ol.style.Text({
                  text: text.field ? feature.get(text.field) + '' || '' : text.text || '',
                  font: text.font || '12px Calibri',
                  overflow: text.overflow || false,
                  fill: text.fill ? (!Object.keys(text.fill).length ? null : new ol.style.Fill(text.fill)) : new ol.style.Fill({ color: 'rgba(255, 255, 255, 1)' }),
                  stroke: text.stroke ? (!Object.keys(text.stroke).length ? null : new ol.style.Stroke(text.stroke)) : new ol.style.Stroke({ color: 'rgba(0, 0, 0, 1)', width: 3 }),
                  offsetX: text.offsetX || 0,
                  offsetY: text.offsetY || 0,
                  backgroundStroke: text.backgroundStroke ? new ol.style.Stroke(text.backgroundStroke) : null,
                  backgroundFill: text.backgroundFill ? new ol.style.Fill(text.backgroundFill) : null,
                  padding: text.padding || null,
                })
              : null,
          });
          return style_temp;
        });
        return layer;
      case 'text':
        layer.setStyle(function (feature) {
          let style_temp = new ol.style.Style({
            text: text
              ? new ol.style.Text({
                  text: text.field ? feature.get(text.field) + '' || '' : text.text || '',
                  font: text.font || '12px Calibri',
                  overflow: text.overflow || false,
                  fill: text.fill ? (!Object.keys(text.fill).length ? null : new ol.style.Fill(text.fill)) : new ol.style.Fill({ color: 'rgba(255, 255, 255, 1)' }),
                  stroke: text.stroke ? (!Object.keys(text.stroke).length ? null : new ol.style.Stroke(text.stroke)) : new ol.style.Stroke({ color: 'rgba(0, 0, 0, 1)', width: 3 }),
                  offsetX: text.offsetX || 0,
                  offsetY: text.offsetY || 0,
                  backgroundStroke: text.backgroundStroke ? new ol.style.Stroke(text.backgroundStroke) : null,
                  backgroundFill: text.backgroundFill ? new ol.style.Fill(text.backgroundFill) : null,
                  padding: text.padding || null,
                })
              : null,
          });
          return style_temp;
        });
        return layer;
      default:
        return null;
    }
  }
  /**
   * @function
   * @description	初始化wms图层
   * @param {Object} options 参数
   * @param {String} options.name 图层名称，default: 'wmsLayer'
   * @param {Number} [options.opacity] Opacity (0, 1)，default: 1
   * @param {String} options.mapUrl 地图服务url
   * @param {String} options.mapName 地图服务名称
   * @param {String} [options.projection] 坐标系，default: 'EPSG:4326'
   * @param {Boolean} [options.visible] 可见性，default: true
   * @param {Number} [options.minZoom] 图层最小比例尺等级，default: 0
   * @param {Number} [options.maxZoom] 图层最大比例尺等级，default: 18
   * @param {Number} [options.zIndex] 图层层级，default: 0
   * @param {String} [options.sourceType] 资源类型(TileWMS: 切片方式，ImageWMS: 图像方式)，default: 'TileWMS'，建议使用 TileWMS切片方式加载，性能较高
   * @param {String} [options.version] 资源版本(仅当资源类型为 ImageWMS 时设置)，default: '1.3.0'
   * @param {Boolean} [options.tiled] 是否开启缓存(仅当资源类型为 TileWMS 时设置)，default: false
   * @return {Object} ol.layer.Tile
   * @example
   * acolLayer.wmsLayer({
   *	name: 'WMS图层',
   *	mapUrl: 'http://geoserver.zjsszxc.com/geoserver/FHJSC/wms',
   *	mapName: 'FHJSC:TAOSHU',
   *	zIndex: 2
   * });
   */
  wmsLayer({
    name = 'wmsLayer',
    opacity = 1,
    mapUrl,
    mapName,
    projection = 'EPSG:4326',
    visible = true,
    minZoom = 0,
    maxZoom = 18,
    zIndex = 0,
    sourceType = 'TileWMS',
    version = '1.3.0',
    tiled = false,
  }) {
    switch (sourceType) {
      case 'TileWMS':
        return new ol.layer.Tile({
          name: name,
          type: 'wmsLayer',
          opacity: opacity,
          source: new ol.source.TileWMS({
            url: mapUrl,
            params: {
              LAYERS: mapName,
              FORMAT: 'image/png',
              tiled: tiled,
            },
            projection: projection,
          }),
          visible: visible,
          minZoom: minZoom,
          maxZoom: maxZoom,
          zIndex: zIndex,
        });
      case 'ImageWMS':
        return new ol.layer.Image({
          name: name,
          type: 'wmsLayer',
          opacity: opacity,
          source: new ol.source.ImageWMS({
            ratio: 1,
            url: mapUrl,
            params: {
              FORMAT: 'image/png',
              VERSION: version,
              STYLES: '',
              LAYERS: mapName,
            },
          }),
          visible: visible,
          minZoom: minZoom,
          maxZoom: maxZoom,
          zIndex: zIndex,
        });
      default:
        return null;
    }
  }
  /**
   * @function
   * @description	初始化wmts图层
   * @param {Object} options 参数
   * @param {String} options.name 图层名称，default: 'wmsLayer'
   * @param {Number} [options.opacity] Opacity (0, 1)，default: 1
   * @param {String} options.mapUrl 地图服务url
   * @param {String} [options.layer] 图层，default: null
   * @param {String} [options.matrixSet] matrixSet，default: null
   * @param {String} [options.format] format('image/png'、'tiles'等)，default: 'image/png'
   * @param {String} [options.style] style，default: 'default'
   * @param {Object} [options.tkOption] 仅用于天地图WMTS服务tk参数配置，default: null
   * @param {String} [options.tkOption.tkField] 天地图token字段
   * @param {String} [options.tkOption.key] 天地图key
   * @param {String} [options.projection] 坐标系，default: 'EPSG:4326'
   * @param {Boolean} [options.visible] 可见性，default: true
   * @param {Number} [options.minZoom] 图层最小比例尺等级，default: 0
   * @param {Number} [options.maxZoom] 图层最大比例尺等级，default: 18
   * @param {Number} [options.zIndex] 图层层级，default: 0
   * @return {Object} ol.layer.Tile
   * @example
   * acolLayer.wmtsLayer(
   *   name: 'tdt_layer',
   *   mapUrl: 'https://ditu.zjzwfw.gov.cn/services/wmts/imgmap/default/oss',
   *   tkOption: {
   *     tkField: 'token',
   *     key: '6fa3f11f-d9d8-4ebf-a966-3eadf2b46fa0'
   *	 },
   *   layer: 'imgmap',
   *   matrixSet:'esritilematirx',
   *   zIndex: 2
   * });
   */
  wmtsLayer({
    name = 'wmtsLayer',
    opacity = 1,
    mapUrl,
    layer = null,
    matrixSet = null,
    format = 'image/png',
    style = 'default',
    tkOption = null,
    projection = 'EPSG:4326',
    visible = true,
    minZoom = 0,
    maxZoom = 18,
    zIndex = 0,
  }) {
    return new ol.layer.Tile({
      name: name,
      type: 'wmtsLayer',
      source: new ol.source.WMTS({
        url: tkOption ? mapUrl + '?' + tkOption.tkField + '=' + tkOption.key : mapUrl,
        layer: layer,
        matrixSet: matrixSet,
        format: format,
        projection: projection,
        tileGrid: new ol.tilegrid.WMTS({
          origin: ol.extent.getTopLeft(ol.proj.get(projection).getExtent()),
          resolutions: this.getParam('config').resolutions_4326,
          matrixIds: this.getParam('config').matrixIds_4326,
        }),
        style: style,
        wrapX: true,
        crossOrigin: 'anonymous',
      }),
      visible: visible,
      minZoom: minZoom,
      maxZoom: maxZoom,
      zIndex: zIndex,
    });
  }
  /**
   * @function
   * @description	初始化热力图图层
   * @param {Object} options 参数
   * @param {String} options.name 图层名称，default: 'heatMapLayer'
   * @param {Object} [options.dataOption] 数据参数对象
   * @param {Object} options.dataOption.data geoJson格式数据
   * @param {Object} [options.heatMapOption] 热力图参数对象
   * @param {Number} options.heatMapOption.blur 以像素为单位的模糊大小，default: 40
   * @param {Number} options.heatMapOption.radius 以像素为单位的半径大小，default: 25
   * @param {String} options.heatMapOption.weight 用于权重的特征属性字段，注：权重值的范围应为 0 到 1（超出范围的值将被限制在该范围内）
   * @param {Array.<String>} options.heatMapOption.gradient 热力图的颜色渐变，指定为 CSS 颜色字符串数组(十六进制) default: ['#00f', '#0ff', '#0f0', '#ff0', '#f00']
   * @param {Boolean} [options.visible] 可见性，default: true
   * @param {Number} [options.minZoom] 图层最小比例尺等级，default: 0
   * @param {Number} [options.maxZoom] 图层最大比例尺等级，default: 18
   * @param {Number} [options.zIndex] 图层层级，default: 0
   * @return {Object} ol.layer.Heatmap
   * @example
   * acolLayer.heatMapLayer({
   *  name: 'heatMapLayer',
   *  dataOption: {
   *   data: geoJsonData_heat,
   *  },
   *  heatMapOption :{
   *   blur: 30,
   *   radius: 25,
   *   weight: 'value',
   *   gradient: ['#00f', '#0ff', '#0f0', '#ff0', '#f00'],
   *  },
   *  zIndex:2
   * });
   */
  heatMapLayer({ name = 'heatMapLayer', dataOption = {}, heatMapOption = {}, opacity = 1, projection = 'EPSG:4326', visible = true, minZoom = 0, maxZoom = 18, zIndex = 0 }) {
    let heatMapLayer = new ol.layer.Heatmap({
      name: name,
      type: 'heatMapLayer',
      opacity: opacity,
      source: new ol.source.Vector({
        projection: projection,
      }),
      blur: heatMapOption.blur || 40,
      radius: heatMapOption.radius || 25,
      weight: heatMapOption.weight || null,
      gradient: heatMapOption.gradient && heatMapOption.gradient.length > 1 ? heatMapOption.gradient : ['#00f', '#0ff', '#0f0', '#ff0', '#f00'],
      visible: visible,
      minZoom: minZoom,
      maxZoom: maxZoom,
      zIndex: zIndex,
    });
    // 添加geoJson数据
    if (dataOption.data && Object.keys(dataOption.data).length) {
      // 添加geoJson格式数据
      let features = new ol.format.GeoJSON().readFeatures(dataOption.data, {
        featureProjection: projection,
      });
      features.forEach((e) => {
        // 要素默认新增 'layer_type' 属性字段为 'heatMap'
        //e.setProperties({'layer_type': 'heatMap'});
        e.set('layer_type', 'heatMap');
      });
      heatMapLayer.getSource().addFeatures(features);
    }
    return heatMapLayer;
  }
  /**
   * @function
   * @description	初始化点聚合图层
   * @param {Object} options 参数
   * @param {String} options.name 图层名称，default: 'clusterLayer'
   * @param {Object} [options.clusterOption] 聚合参数对象
   * @param {Number} options.clusterOption.distance 点聚合距离(屏幕像素长度)
   * @param {Array.<Object>} [options.style] 图层样式对象数组
   * @param {String} [options.projection] 坐标系，default: 'EPSG:4326'
   * @param {Number} [options.minZoom] 图层最小比例尺等级，default: 0
   * @param {Number} [options.maxZoom] 图层最大比例尺等级，default: 18
   * @param {Number} [options.zIndex] 图层层级，default: 0
   * @return {Object} ol.layer.Vector
   * @example
   * acolLayer.clusterLayer({
   *  name: 'cluster',
   *  style: [
   * 	 { size: 1, icon: { iconField: 'type', iconPREF: './data/image/', iconSUFF: '.png', anchor: [0.5, 0.8], scale: 0.6 }, text: { field: 'name', font: '12px Calibri', offsetX: 0, offsetY: 10 } },
   * 	 { size: 2, circle: { radius: 20, fill: { color: 'rgba(255, 69, 0, 0.6)' }, stroke: { color: 'rgba(255, 69, 0, 1)', width: 1 } }, text: { font: '20px Calibri', fill: { color: 'rgba(255, 255, 255, 0.6)' }, stroke: { color: 'rgba(255, 255, 255, 1)', width: 1 } } },
   * 	 { size: 20, circle: {radius: 30, fill: { color: 'rgba(50,205,50,0.6)' }, stroke: { color: 'rgba(50, 205, 50, 1)', width: 1 } }, text: { font: '30px Calibri', fill: { color: 'rgba(255, 255, 255, 0.6)' }, stroke: { color: 'rgba(255, 255, 255, 1)', width: 1 } } },
   * 	 { size: 40, circle: {radius: 40, fill: { color: 'rgba(135, 206, 250, 0.6)' }, stroke: { color: 'rgba(135, 206, 250, 1)', width: 1 } }, text: { font: '40px Calibri', fill: { color: 'rgba(255, 255, 255, 0.6)' }, stroke: { color: 'rgba(255, 255, 255, 1)', width: 1 } } }
   *  ],
   *  clusterOption: {
   * 	 distance: 200,
   *  },
   *  zIndex: 2
   * });
   */
  clusterLayer({ name = 'clusterLayer', clusterOption = {}, style = null, projection = 'EPSG:4326', visible = true, minZoom = 0, maxZoom = 18, zIndex = 0 }) {
    // 样式排序
    style = style.sort(function (a, b) {
      return b.size - a.size;
    });
    return new ol.layer.Vector({
      name: name,
      type: 'clusterLayer',
      source: new ol.source.Cluster({
        //标注元素之间的间距
        distance: clusterOption.distance || 100,
        //数据源
        source: new ol.source.Vector({
          projection: projection,
        }),
      }),
      style: function (feature) {
        //当前聚合标注数据源的要素大小(数量)
        let size = feature.get('features').length;
        //定义样式
        let styleTemp = getStyleBySize(size);
        return new ol.style.Style({
          image: styleTemp.icon
            ? new ol.style.Icon({
                opacity: styleTemp.icon.opacity || 1,
                src: styleTemp.icon.iconField ? (styleTemp.icon.iconPREF || '') + feature.get('features')[0].get(styleTemp.icon.iconField) + (styleTemp.icon.iconSUFF || '') : styleTemp.icon.src,
                anchor: styleTemp.icon.anchor || [0.5, 0.5],
                scale: styleTemp.icon.scale || 1,
              })
            : styleTemp.circle
            ? new ol.style.Circle({
                radius: styleTemp.circle.radius || 10,
                fill: styleTemp.circle.fill ? new ol.style.Fill(styleTemp.circle.fill) : new ol.style.Fill({ color: 'rgba(0, 191, 255, 1)' }),
                stroke: styleTemp.circle.stroke ? new ol.style.Stroke(styleTemp.circle.stroke) : new ol.style.Stroke({ color: 'rgba(255, 255, 255, 1)', width: 2 }),
              })
            : null,
          text: styleTemp.text
            ? new ol.style.Text({
                text: styleTemp.text.field ? feature.get('features')[0].get('name') || '' : styleTemp.text.text || size.toString(),
                font: styleTemp.text.font || '12px Calibri',
                overflow: styleTemp.text.overflow || false,
                fill: styleTemp.text.fill ? (!Object.keys(styleTemp.text.fill).length ? null : new ol.style.Fill(styleTemp.text.fill)) : new ol.style.Fill({ color: 'rgba(255, 255, 255, 1)' }),
                stroke: styleTemp.text.stroke
                  ? !Object.keys(styleTemp.text.stroke).length
                    ? null
                    : new ol.style.Stroke(styleTemp.text.stroke)
                  : new ol.style.Stroke({ color: 'rgba(0, 0, 0, 1)', width: 3 }),
                offsetX: styleTemp.text.offsetX || 0,
                offsetY: styleTemp.text.offsetY || 0,
                backgroundStroke: styleTemp.text.backgroundStroke ? new ol.style.Stroke(styleTemp.text.backgroundStroke) : null,
                backgroundFill: styleTemp.text.backgroundFill ? new ol.style.Fill(styleTemp.text.backgroundFill) : null,
                padding: styleTemp.text.padding || null,
              })
            : null,
        });
      },
      visible: visible,
      minZoom: minZoom,
      maxZoom: maxZoom,
      zIndex: zIndex,
    });
    /**
     * @private
     * @description	根据size获取要素样式
     * @param {Number} size
     */
    function getStyleBySize(size) {
      if (!style) return null;
      if (style.length === 1) return style[0];
      for (let i = 0; i < style.length; ++i) {
        if (size >= style[i].size) {
          return style[i];
        }
      }
      return null;
    }
  }
  /**
   * @function
   * @description	初始化矢量切片图层
   * @param {Object} options 参数
   * @param {String} options.name 图层名称，default: 'vectorTile'
   * @param {Array.<Number>} [options.resolutions] 分辨率数组，default: new acol_config().resolutions_4326
   * @param {String} options.mapUrl 地图服务url
   * @param {String} options.mapType 服务类型，default: 'MVT'，可选'GeoJson'
   * @param {Object} [options.style] 图层样式对象（暂不支持图层style样式设置）
   * @param {String} [options.projection] 坐标系，default: 'EPSG:4326'
   * @param {Boolean} [options.visible] 可见性，default: true
   * @param {Number} [options.minZoom] 图层最小比例尺等级，default: 0
   * @param {Number} [options.maxZoom] 图层最大比例尺等级，default: 18
   * @param {Number} [options.zIndex] 图层层级，default: 0
   * @return {Object} ol.layer.VectorTile
   * @example
   * acolLayer.vectorTile({
   *	name: 'MVTLayer',
   *	mapUrl: 'http://10.10.10.39:8080/geoserver/gwc/service/tms/1.0.0/TAOSHU:TAOSHU_4326@EPSG%3A4326@geojson',
   *	mapType: 'GeoJson',
   *	zIndex: 2
   * });
   */
  vectorTile({
    name = 'vectorTile',
    mapUrl,
    resolutions = this.getParam('config').resolutions_4326,
    mapType = 'MVT',
    style = null,
    projection = 'EPSG:4326',
    visible = true,
    minZoom = 0,
    maxZoom = 18,
    zIndex = 0,
  }) {
    return new ol.layer.VectorTile({
      name: name,
      source: new ol.source.VectorTile({
        projection: projection,
        tileGrid: new ol.tilegrid.TileGrid({
          resolutions: resolutions,
          extent: ol.proj.get(projection).getExtent(),
          tileSize: [256, 256],
        }),
        format: mapType === 'MVT' ? new ol.format.MVT({}) : mapType === 'GeoJson' ? new ol.format.GeoJSON() : null,
        url: mapType === 'MVT' ? mapUrl + '/{z}/{x}/{-y}.pbf' : mapType === 'GeoJson' ? mapUrl + '/{z}/{x}/{-y}.geojson' : null,
      }),
      style: null,
      visible: visible,
      minZoom: minZoom,
      maxZoom: maxZoom,
      zIndex: zIndex,
    });
  }
  /**
   * @function
   * @description	初始化image图层
   * @param {Object} options 参数
   * @param {String} options.name 图层名称，default: 'imageLayer'
   * @param {Number} [options.opacity] Opacity (0, 1)，default: 1
   * @param {String} options.imageUrl 图片url
   * @param {Array.<Number>} options.extent 图像范围 [minX, minY, maxX, maxY]
   * @param {String} [options.projection] 坐标系，default: 'EPSG:4326'
   * @param {Boolean} [options.visible] 可见性，default: true
   * @param {Number} [options.minZoom] 图层最小比例尺等级，default: 0
   * @param {Number} [options.maxZoom] 图层最大比例尺等级，default: 18
   * @param {Number} [options.zIndex] 图层层级，default: 0
   * @return {Object} ol.layer.Image
   * @example
   * acolLayer.imageLayer({
   *	name: '图像图层',
   *	imageUrl: './data/TLYZT/images/Image.png',
   *	extent: [119.175266045794, 29.5915135740579, 119.970469297037, 30.0906338267291],
   *	zIndex: 2
   * });
   */
  imageLayer({ name = 'imageLayer', opacity = 1, imageUrl, extent, projection = 'EPSG:4326', visible = true, minZoom = 0, maxZoom = 18, zIndex = 0 }) {
    return new ol.layer.Image({
      name: name,
      type: 'imageLayer',
      opacity: opacity,
      source: new ol.source.ImageStatic({
        url: imageUrl,
        projection: 'EPSG:4326',
        imageExtent: extent,
      }),
      extent: extent,
      visible: visible,
      minZoom: minZoom,
      maxZoom: maxZoom,
      zIndex: zIndex,
    });
  }
  /**
   * @function
   * @description	overLayer叠加层
   * @param {Object} options 参数
   * @param {String} options.id default: 'popup'
   * @param {Object} options.element HTMLElement DOM对象
   * @param {Array.<Number>} [options.offset] 右移，下移为正，default: [0,0]
   * @param {String} [options.positioning] 定义叠加层相对于其position属性的实际定位方式，default: 'bottom-center',
   * 可选值：'bottom-left', 'bottom-center', 'bottom-right',
   * 		  'center-left', 'center-center', 'center-right',
   * 		  'top-left', 'top-center',  'top-right'
   * @param {Boolean} [options.autoPan] 是否开启自动平移 弹出窗口在边缘点击时候可能不完整 设置自动平移效果，default: true
   * @param {Boolean} [options.stopEvent] 是否停止交互事件，default: true(叠加层上停止交互事件)
   * @return {Object} ol.Overlay
   * @example
   * acolLayer.overLayer({ id: 'infoWindow', element: document.getElementById('infoWindow'), offset: [35, -55], positioning: 'top-left' });
   */
  overLayer({ id = 'popup', element, offset = [0, 0], positioning = 'bottom-center', autoPan = true, stopEvent = true, autoPanMargin = 20 }) {
    // 暂仅支持HTMLDivElement
    if (!element || Object.prototype.toString.call(element) != '[object HTMLDivElement]') {
      return null;
    }
    // 创建overlay图层
    return new ol.Overlay({
      id: id,
      element: element,
      offset: offset,
      positioning: positioning,
      stopEvent: stopEvent,
      autoPan: autoPan,
      autoPanMargin: autoPanMargin,
      autoPanAnimation: {
        duration: 250,
      },
    });
  }
  /**
   * @function
   * @description	根据id获取overlayer图层
   * @param {String} id 弹窗/气泡叠加层id
   * @return {Object} ol.Overlay
   * @example
   * acolLayer.getOverlayById('infoWindow');
   */
  getOverlayById(id) {
    // 获取overlay图层
    let olLyrs = this.getParam('map').getOverlays().getArray();
    let olLyrsLength = olLyrs.length;
    // 由大 --> 小循环
    for (let i = olLyrsLength - 1; i >= 0; i--) {
      if (olLyrs[i].id === id) {
        return olLyrs[i];
      }
    }
    return null;
  }
  /**
   * @function
   * @description	根据id移除overLayer图层
   * @param {String} id 弹窗/气泡叠加层id
   * @return {Void} 无返回值
   * @example
   * acolLayer.removeOverlayById('infoWindow');
   */
  removeOverlayById(id) {
    // 清除对应overlay图层
    let olLyrs = this.getParam('map').getOverlays().getArray();
    let olLyrsLength = olLyrs.length;
    // 由大 --> 小循环
    for (let i = olLyrsLength - 1; i >= 0; i--) {
      if (olLyrs[i].id === id) {
        this.getParam('map').removeOverlay(olLyrs[i]);
      }
    }
  }
  /**
   * @function
   * @description	获取全部图层对象，并以数组形式返回
   * @return {Array.<Object>} 图层对象数组
   * @example
   * acolLayer.getAllLayers();
   */
  getAllLayers() {
    if (this.getParam('map')) {
      return this.getParam('map').getLayers();
    } else {
      return [];
    }
  }
  /**
   * @function
   * @description	根据名称获取图层对象
   * @param {String} layerName 图层名称
   * @return {Object} 图层对象
   * @example
   * acolLayer.getLayerByName('tdtImg');
   */
  getLayerByName(layerName) {
    if (layerName && typeof layerName === 'string') {
      // 判断 map 对象
      if (this.getParam('map')) {
        //获取地图中所有图层
        let layers = this.getAllLayers();
        for (let i = 0; i < layers.getLength(); ++i) {
          if (layers.item(i).get('name') && layers.item(i).get('name') === layerName) {
            return layers.item(i);
          }
        }
      }
      return null;
    } else {
      throw new Error('方法传参有误，必须为字符串类型');
    }
  }
  /**
   * @function
   * @description	根据名称判断图层是否存在
   * @param {String} layerName 图层名称
   * @return {Boolean} true/false
   * @example
   * acolLayer.isLayerExistByName('tdtImg');
   */
  isLayerExistByName(layerName) {
    if (layerName && typeof layerName === 'string') {
      // 返回结果
      return this.getLayerByName(layerName) ? true : false;
    } else {
      throw new Error('方法传参有误，必须为字符串类型');
    }
  }
  /**
   * @function
   * @description	图层层级设置
   * @param {Object} layer 图层对象
   * @param {Number} zIndex 层级数，数值越大层级越高
   * @return {Void} 无返回值
   * @example
   * acolLayer.setZIndex(tdtLayer,1);
   */
  setZIndex(layer, zIndex) {
    if (arguments.length === 2 && arguments[0] instanceof ol.layer.Layer && typeof arguments[1] === 'number') {
      layer.setZIndex(zIndex < 0 ? 0 : zIndex);
    } else {
      throw new Error('方法传参有误');
    }
  }
  /**
   * @function
   * @description	通过名称设置图层层级
   * @param {String} layerName 图层名称
   * @param {Number} zIndex 层级数，数值越大层级越高
   * @return {Void} 无返回值
   * @example
   * acolLayer.setZIndexByName('tdtImg',1);
   */
  setZIndexByName(layerName, zIndex) {
    if (arguments.length === 2 && typeof arguments[0] === 'string' && typeof arguments[1] === 'number') {
      let layer = this.getLayerByName(layerName);
      if (layer) layer.setZIndex(zIndex < 0 ? 0 : zIndex);
    } else {
      throw new Error('方法传参有误');
    }
  }
  /**
   * @function
   * @description	获取所有图层中最大zIndex
   * @return {Number} zIndex
   * @example
   * acolLayer.getMaxZIndex();
   */
  getMaxZIndex() {
    let zIndex = 0;
    //获取地图中所有图层
    let layers = this.getAllLayers();
    for (let i = 0; i < layers.getLength(); ++i) {
      zIndex = Math.max(zIndex, layers.item(i).get('zIndex'));
    }
    return zIndex;
  }
  /**
   * @function
   * @description	根据给定的地图大小和边界拟合给定的几何图形或范围
   * @param {Object} options 参数
   * @param {Array.<Number>} options.extent 边界bounds [minx, miny, maxx, maxy]
   * @param {Number}  options.zoomNum 放大(正)、缩小(负)参数，单位度°
   * @param {Number} options.duration 动画的持续时间，以毫秒为单位，默认情况下，没有动画
   * @param {Function} fnc 回调函数
   * @return {Void} 无返回值
   * @example
   * acolLayer.panToByExtent({
   *	extent: [118.251726, 28.769594, 118.758725, 29.216661],
   *	zoomNum: 0.01,
   *	duration: 1000
   * }, function(){
   *  ......
   * });
   */
  panToByExtent({ extent, zoomNum = 0, duration }, fnc) {
    // 为保证已加载矢量要素渲染效果，默认延迟100毫秒后执行
    setTimeout(() => {
      // fit
      this.getParam('map')
        .getView()
        .fit(this.getParam('util').extentZoomByNum({ extent: extent, zoomNum: zoomNum }), {
          duration: duration || undefined,
          callback: function () {
            // 回调函数
            if (fnc && Object.prototype.toString.call(fnc) === '[object Function]') fnc();
          },
        });
    }, 100);
  }
  /**
   * @function
   * @description	根据给定的经纬度数组拟合给定的几何图形或范围
   * @param {Object} options 参数
   * @param {Array.<Number>} options.lonLat 经纬度数组
   * @param {Number}  options.zoomNum 放大(正)、缩小(负)参数，单位度°
   * @param {Number} options.duration 动画的持续时间，以毫秒为单位，默认情况下，没有动画
   * @param {Function} fnc 回调函数
   * @return {Void} 无返回值
   * @example
   * acolLayer.panToByLonLat({
   *	lonLat: [121.52085, 29.676448],
   *	zoomNum: 0.01,
   *	duration: 1000
   * }, function(){
   *  ......
   * });
   */
  panToByLonLat({ lonLat, zoomNum = 0, duration }, fnc) {
    // 仅判断数组格式，不判断内部对象数据类型
    if (Array.isArray(lonLat)) {
      let extent = new ol.geom.Point(lonLat).getExtent();
      // 定位
      this.panToByExtent(
        {
          extent: extent,
          zoomNum: zoomNum,
          duration: duration || undefined,
        },
        fnc && Object.prototype.toString.call(fnc) === '[object Function]' ? fnc : null,
      );
    } else {
      throw new Error('方法传参有误，必须为数组类型');
    }
  }
  /**
   * @function
   * @description	根据给定的要素数组拟合给定的几何图形或范围
   * @param {Object} options 参数
   * @param {Array.<Object>} options.features ol.Feature要素数组
   * @param {Number}  options.zoomNum 放大(正)、缩小(负)参数，单位度°
   * @param {Number} options.duration 动画的持续时间，以毫秒为单位，默认情况下，没有动画
   * @param {Function} fnc 回调函数
   * @return {Void} 无返回值
   * @example
   * acolLayer.panToByOLFeatures({
   *	features: features,
   *	zoomNum: 0.01,
   *	duration: 1000
   * }, function(){
   *  ......
   * });
   */
  panToByOLFeatures({ features, zoomNum = 0, duration }, fnc) {
    // 仅判断数组格式，不判断内部对象数据类型
    if (Array.isArray(features)) {
      // let temp_source = new ol.source.Vector({ projection: 'EPSG:4326' });
      let temp_source = new ol.source.Vector();
      temp_source.addFeatures(features);
      // 定位
      this.panToByExtent(
        {
          extent: temp_source.getExtent(),
          zoomNum: zoomNum,
          duration: duration || undefined,
        },
        fnc && Object.prototype.toString.call(fnc) === '[object Function]' ? fnc : null,
      );
    } else {
      throw new Error('方法传参有误，必须为数组类型');
    }
  }
  /**
   * @function
   * @description	基于GeoJson格式数据裁剪图层
   * @param {Object} options 参数
   * @param {Object} options.layer 被裁剪图层对象
   * @param {Object} options.data GeoJson格式数据
   * @return {Void} 无返回值
   * @example
   * acolLayer.layerMaskByGeoJson({ layer: tdtLayer, data: geoJson });
   */
  layerMaskByGeoJson({ layer = null, data = null }) {
    if (!layer) return;
    // 获取filters
    let filters = layer.getFilters();
    if (filters.length) {
      filters.forEach((e) => {
        if (e.get('type') === 'cropFilter') layer.removeFilter(e);
      });
    }
    if (!data) return;
    // 裁剪要素
    let crop_feature = new ol.format.GeoJSON().readFeatures(data, { featureProjection: 'EPSG:4326' });
    let crop_filter = new ol.filter.Crop({
      feature: crop_feature[0],
      wrapX: true,
      inner: false,
      type: 'cropFilter',
    });
    layer.addFilter(crop_filter);
  }
  /**
   * @function
   * @description	基于GeoJson格式数据裁剪对应名称图层
   * @param {Object} options 参数
   * @param {String} options.name 被裁剪图层名称
   * @param {Object} options.data GeoJson格式数据
   * @return {Void} 无返回值
   * @example
   * acolLayer.layerNameMaskByGeoJson({ name: 'tdt_layer', data: geoJson });
   */
  layerNameMaskByGeoJson({ name = '', data = null }) {
    if (!name) return;
    let temp_layer = this.getLayerByName(name);
    if (temp_layer) this.layerMaskByGeoJson({ layer: temp_layer, data: data });
  }
  /**
   * @function
   * @description	基于GeoJson格式数据裁剪图层数组
   * @param {Object} options 参数
   * @param {Array.<Object>} options.layers 被裁剪图层对象数组
   * @param {Object} options.data GeoJson格式数据
   * @return {Void} 无返回值
   * @example
   * acolLayer.layersMaskByGeoJson({ layers: [tdt_layer, vector], data: geoJson });
   */
  layersMaskByGeoJson({ layers = [], data = null }) {
    if (!layers.length) return;
    layers.forEach((e) => {
      this.layerMaskByGeoJson({ layer: e, data: data });
    });
  }
  /**
   * @function
   * @description	基于GeoJson格式数据裁剪对应名称数组图层
   * @param {Object} options 参数
   * @param {Array.<String>} options.names 被裁剪图层名称数组
   * @param {Object} options.data GeoJson格式数据
   * @return {Void} 无返回值
   * @example
   * acolLayer.layerNamesMaskByGeoJson({ names: ['tdt_layer', 'vector'], data: geoJson });
   */
  layerNamesMaskByGeoJson({ names = [], data = null }) {
    if (!names.length) return;
    names.forEach((e) => {
      this.layerNameMaskByGeoJson({ name: e, data: data });
    });
  }
}
/**
 * @desc 地图封装类
 * @author LZZ
 * @version 2.0.0
 * @example
 * let acMap = new acol_map();
 */
class acol_map {
  constructor() {
    this.map = null;
    this.view = null;
    this.acolLayer = null;
    this.acolSearch = null;
    this.acolMeasure = null;
    this.acolConfig = new acol_config();
    this.acolUtil = new acol_util();
    this.acolDea = new acol_dea();
  }
  /**
   * @function
   * @description	map 初始化方法
   * @param {Object} options 参数对象
   * @param {String} options.id 地图的容器，可以是元素本身，也可以是元素id
   * @param {Array.<Number>} options.center 地图中心点经纬度数组，default: [119.5729, 29.8411]
   * @param {String} [options.projection] 坐标系，default: 'EPSG:4326'
   * @param {Number} options.zoom 地图当前比例尺等级，default: 7
   * @param {Number} [options.minZoom] 地图最小比例尺等级，default: 6
   * @param {Number} [options.maxZoom] 地图最大比例尺等级，default: 18
   * @param {Array.<Number>} [options.extent] extent 限制视图的范围 [minX, minY, maxX, maxY]，default: undefined
   * @param {Boolean} [options.constrainResolution] 是否使地图缩放保持整数级别，default: true
   * @return {Void} 无返回值
   * @example
   * acMap.initMap({ id: 'map', center: [119.5729, 29.8411], zoom: 11, minZoom: 10, maxZoom: 15 });
   */
  initMap({ id = '', center = [120.49, 29.12], projection = 'EPSG:4326', zoom = 7, minZoom = 6, maxZoom = 18, extent = undefined, constrainResolution = true }) {
    if (this.map) return this.map;
    // 实例化Map对象
    this.map = new ol.Map({
      // 移除控件
      controls: ol.control.defaults({ attribution: false, zoom: false }),
      target: id,
      //地图视图设置
      view: new ol.View({
        center: center,
        projection: projection,
        zoom: zoom,
        minZoom: minZoom,
        maxZoom: maxZoom,
        extent: extent,
        constrainResolution: constrainResolution,
      }),
      interactions: new ol.interaction.defaults({
        doubleClickZoom: false,
      }),
    });
    this.view = this.map.getView();
    this.acolLayer = new acol_layer(this.map);
    this.acolSearch = new acol_search(this.map);
    this.acolMeasure = new acol_measure(this.map);
    return this.map;
  }
  /**
   * @function
   * @description	map 添加图层方法
   * @param {Object} layer 图层对象
   * @param {Number} zIndex 图层层级
   * @return {Void} 无返回值
   * @example
   * acMap.addLayer(layer, 1);
   */
  addLayer(layer, zIndex) {
    if (layer instanceof ol.layer.Layer) {
      // 添加图层
      let layerName = layer.getProperties()['name'];
      // 避免重复添加图层，如果图层存在，则显示图层
      if (!this.acolLayer.isLayerExistByName(layerName)) {
        if (this.map) this.map.addLayer(layer);
      } else {
        this.showLayer(layer);
        console.warn("警告! 已存在'" + layerName + "'同名图层，注意避免重复添加! ");
      }
      // 设置图层层级
      if (zIndex && typeof zIndex === 'number') layer.setZIndex(zIndex);
    } else {
      throw new Error('方法传参有误，必须为图层对象');
    }
  }
  /**
   * @function
   * @description	map 添加图层数组方法
   * @param {Array.<Object>} layerArray 图层对象数组
   * @return {Void} 无返回值
   * @example
   * acMap.addLayers([layer, layer2]);
   */
  addLayers(layerArray) {
    if (Array.isArray(layerArray)) {
      // 循环添加
      layerArray.forEach((e) => {
        this.addLayer(e);
      });
    } else {
      throw new Error('方法传参有误，必须为数组类型');
    }
  }
  /**
   * @function
   * @description	map 通过配置信息，添加图层数组
   * @param {Array.<Object>} optionArray 图层配置信息对象数组
   * @param {Function} fnc 回调函数，{ name: 图层名称, layer: 图层对象 }
   * @return {Void} 无返回值
   * @example
   * let layerOptions = [
   *	{ name: 'tdtImg', layer: 'tdtLayer', type: 'img', sourceType: 'XYZ', isLabel: false, zIndex: 0 },
   *	{ name: 'area', layer: 'vectorLayer', type: 'polygon', dataOption: { data: geoJsonData_village },style: { fill: {}, stroke: { color: 'rgba(0, 255, 255, 1)', width: 1 } }, zIndex: 1 },
   *	{ name: 'wms', layer: 'wmsLayer', mapUrl: 'http://geoserver.zjsszxc.com/geoserver/FHJSC/wms', mapName: 'FHJSC:TAOSHU', zIndex: 2 }
   * ];
   * acMap.addLayersByOptions(layerOptions, function({ name, layer }){
   *	......
   * });
   */
  addLayersByOptions(optionArray, fnc) {
    if (Array.isArray(optionArray)) {
      optionArray.forEach((e) => {
        let temp_layer;
        switch (e.layer) {
          case 'tdtLayer':
            temp_layer = this.acolLayer.tdtLayer(e);
            break;
          case 'wmsLayer':
            temp_layer = this.acolLayer.wmsLayer(e);
            break;
          case 'wmtsLayer':
            temp_layer = this.acolLayer.wmtsLayer(e);
            break;
          case 'vectorLayer':
            temp_layer = this.acolLayer.vectorLayer(e);
            break;
          case 'imageLayer':
            temp_layer = this.acolLayer.imageLayer(e);
            break;
          default:
            return;
        }
        this.addLayer(temp_layer);
        if (fnc && Object.prototype.toString.call(fnc) === '[object Function]') fnc({ name: e.name, layer: temp_layer });
      });
    } else {
      throw new Error('方法传参有误，必须为数组类型');
    }
  }
  /**
   * @function
   * @description	map 移除图层方法
   * @param {Object} layer 图层对象
   * @return {Void} 无返回值
   * @example
   * acMap.removeLayer(layer);
   */
  removeLayer(layer) {
    if (layer instanceof ol.layer.Layer) {
      // 移除图层
      if (this.map) this.map.removeLayer(layer);
    } else {
      throw new Error('方法传参有误，必须为图层对象');
    }
  }
  /**
   * @function
   * @description	map 移除图层数组方法
   * @param {Array.<Object>} layerArray 图层数组
   * @return {Void} 无返回值
   * @example
   * acMap.removeLayers([layer1, layer2]);
   */
  removeLayers(layerArray) {
    if (Array.isArray(layerArray)) {
      // 循环移除
      layerArray.forEach((e) => {
        this.removeLayer(e);
      });
    } else {
      throw new Error('方法传参有误，必须为数组类型');
    }
  }
  /**
   * @function
   * @description	map 通过名称移除图层方法
   * @param {String} layerName 图层名称
   * @return {Void} 无返回值
   * @example
   * acMap.removeLayerByName('tdtImg');
   */
  removeLayerByName(layerName) {
    if (layerName && typeof layerName === 'string') {
      // 获取图层
      let layer = this.acolLayer.getLayerByName(layerName);
      this.removeLayer(layer);
    } else {
      throw new Error('方法传参有误，必须为字符串类型');
    }
  }
  /**
   * @function
   * @description	map 通过名称数组移除图层方法
   * @param {Array.<String>} layerNameArray 图层名称数组
   * @return {Void} 无返回值
   * @example
   * acMap.removeLayerByNames(['tdtImg', 'tdtLabel']);
   */
  removeLayerByNames(layerNameArray) {
    if (Array.isArray(layerNameArray)) {
      // 循环移除
      layerNameArray.forEach((e) => {
        this.removeLayerByName(e);
      });
    } else {
      throw new Error('方法传参有误，必须为数组类型');
    }
  }
  /**
   * @function
   * @description	map 显示图层方法
   * @param {Object} layer 图层对象
   * @return {Void} 无返回值
   * @example
   * acMap.showLayer(layer);
   */
  showLayer(layer) {
    if (layer instanceof ol.layer.Layer) {
      layer.setVisible(true);
    } else {
      throw new Error('方法传参有误，必须为图层对象');
    }
  }
  /**
   * @function
   * @description	map 显示图层数组方法
   * @param {Array.<Object>} layerArray 图层数组
   * @return {Void} 无返回值
   * @example
   * acMap.showLayers([layer1. layer2]);
   */
  showLayers(layerArray) {
    if (Array.isArray(layerArray)) {
      // 循环显示
      layerArray.forEach((e) => {
        this.showLayer(e);
      });
    } else {
      throw new Error('方法传参有误，必须为数组类型');
    }
  }
  /**
   * @function
   * @description	map 通过名称显示图层方法
   * @param {String} layerName 图层名称
   * @return {Void} 无返回值
   * @example
   * acMap.showLayerByName('tdtImg');
   */
  showLayerByName(layerName) {
    if (layerName && typeof layerName === 'string') {
      // 获取图层
      let layer = this.acolLayer.getLayerByName(layerName);
      this.showLayer(layer);
    } else {
      throw new Error('方法传参有误，必须为字符串类型');
    }
  }
  /**
   * @function
   * @description	map 通过名称数组显示图层方法
   * @param {Array.<String>} layerNameArray 图层名称数组
   * @return {Void} 无返回值
   * @example
   * acMap.showLayerByNames(['tdtImg', 'tdtLabel']);
   */
  showLayerByNames(layerNameArray) {
    if (Array.isArray(layerNameArray)) {
      // 循环显示
      layerNameArray.forEach((e) => {
        this.showLayerByName(e);
      });
    } else {
      throw new Error('方法传参有误，必须为数组类型');
    }
  }
  /**
   * @function
   * @description	map 隐藏图层方法
   * @param {Object} layer 图层对象
   * @return {Void} 无返回值
   * @example
   * acMap.hideLayer(layer);
   */
  hideLayer(layer) {
    if (layer instanceof ol.layer.Layer) {
      layer.setVisible(false);
    } else {
      throw new Error('方法传参有误，必须为图层对象');
    }
  }
  /**
   * @function
   * @description	map 隐藏图层数组方法
   * @param {Array.<Object>} layerArray 图层数组
   * @return {Void} 无返回值
   * @example
   * acMap.hideLayers([layer1. layer2]);
   */
  hideLayers(layerArray) {
    if (Array.isArray(layerArray)) {
      // 循环显示
      layerArray.forEach((e) => {
        this.hideLayer(e);
      });
    } else {
      throw new Error('方法传参有误，必须为数组类型');
    }
  }
  /**
   * @function
   * @description	map 通过名称隐藏图层方法
   * @param {String} layerName 图层名称
   * @return {Void} 无返回值
   * @example
   * acMap.hideLayerByName('tdtImg');
   */
  hideLayerByName(layerName) {
    if (layerName && typeof layerName === 'string') {
      // 获取图层
      let layer = this.acolLayer.getLayerByName(layerName);
      this.hideLayer(layer);
    } else {
      throw new Error('方法传参有误，必须为字符串类型');
    }
  }
  /**
   * @function
   * @description	map 通过名称数组隐藏图层方法
   * @param {Array.<String>} layerNameArray 图层名称数组
   * @return {Void} 无返回值
   * @example
   * acMap.hideLayerByNames(['tdtImg','tdtLabel']);
   */
  hideLayerByNames(layerNameArray) {
    if (Array.isArray(layerNameArray)) {
      // 循环显示
      layerNameArray.forEach((e) => {
        this.hideLayerByName(e);
      });
    } else {
      throw new Error('方法传参有误，必须为数组类型');
    }
  }
  /**
   * @function
   * @description	map 地图放大
   * @param {Number} [duration] 缩放动画持续时间，default: 300
   * @return {Void} 无返回值
   * @example
   * acMap.zoomIn(500);
   */
  zoomIn(duration) {
    let zoom = this.view.getZoom();
    let maxZoom = this.view.getMaxZoom();
    this.view.animate({
      zoom: zoom + 1 < maxZoom ? zoom + 1 : maxZoom,
      duration: duration && typeof duration === 'number' ? duration : 300,
    });
  }
  /**
   * @function
   * @description	map 地图缩小
   * @param {Number} [duration] 缩放动画持续时间，default: 300
   * @return {Void} 无返回值
   * @example
   * acMap.zoomOut(500);
   */
  zoomOut(duration) {
    let zoom = this.view.getZoom();
    let minZoom = this.view.getMinZoom();
    this.view.animate({
      zoom: zoom - 1 > minZoom ? zoom - 1 : minZoom,
      duration: duration && typeof duration === 'number' ? duration : 300,
    });
  }
  /**
   * @function
   * @description	map 事件添加
   * @param {Function} fnc 回调函数
   * @param {String} eventType 事件类型，'LEFT_CLICK': '单击','LEFT_DOUBLE_CLICK': '双击','MOUSE_WHEEL': '滚轮','MOUSE_MOVE': '移动','MOUSE_DRAG': '拖拽','SELECT': '要素选择'
   * @return {Object} 监听事件对象
   * @example
   * acMap.mapEventOn(function(e){
   * 	......
   * }, 'LEFT_CLICK');
   */
  mapEventOn(fnc, eventType) {
    // 移除
    this.mapEventUn(eventType);
    if (this.map) {
      if (eventType === 'SELECT') {
        // 添加要素选择器
        let mapSelect = new ol.interaction.Select();
        this.map.addInteraction(mapSelect);
        return mapSelect.on('select', fnc);
      } else {
        return this.map.on(this.acolConfig.mapEventType[eventType], fnc);
      }
    }
  }
  /**
   * @function
   * @description	map 事件移除
   * @param {String} eventType 事件类型
   * @return {Void} 无返回值
   * @example
   * acMap.mapEventOn('LEFT_CLICK');
   */
  mapEventUn(eventType) {
    if (this.map) {
      if (eventType === 'SELECT') {
        this.map.getInteractions().forEach((interaction) => {
          if (interaction instanceof ol.interaction.Select) this.map.removeInteraction(interaction);
        });
      } else {
        let listenerArr = this.map.listeners_[this.acolConfig.mapEventType[eventType]];
        if (listenerArr && listenerArr.length) this.map.un(this.acolConfig.mapEventType[eventType], listenerArr[0]);
      }
    }
  }
}
/**
 * @desc 地图量测类
 * @author LZZ
 * @version 2.0.0
 * @param {Object} map ol.map地图对象
 * @example
 * let acolMeasure = new acol_measure(acMap.map);
 */
class acol_measure {
  #map;
  #util;
  #layer;
  constructor(map) {
    this.#map = map;
    this.#util = new acol_util();
    this.#layer = new acol_layer(this.getParam('map'));
    // RGB
    this.color = null;
    // 量测类型
    this.measureType = null;
    // 量测结果
    this.measureResult = null;
    // 量测结果回调函数名称
    this.callBack = null;
    // draw - 绘制交互 - ol.interaction.Draw
    this.draw = null;
    // sketch - 勾勒要素 - ol.Feature
    this.sketch = null;
    // Tooltip - 提示框
    this.helpTooltipElement = null;
    this.helpTooltip = null;
    this.helpTooltipState = true;
    // Tooltip - 量测框
    this.measureTooltipElement = null;
    this.measureTooltip = null;
    this.measureTooltipState = true;
    // 提示信息
    this.continuePolygonMsg = '双击结束多边形面积测量';
    this.continueLineMsg = '双击结束距离测量';
    this.continuCircleMsg = '单击结束圆面积测量';
    this.continueRectanglenMsg = '单击结束矩形面积测量';
    this.continueRectanglenMsg = '单击获取经纬度';
    // 矢量图层
    this.measure_vector = null;
    this.measure_source = null;
    // 鼠标移动监听
    this.pointerMoveHandler = null;
    // 是否清除上次绘制
    this.lastClear = false;
    // base64
    this.base64Img =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABEhJREFUWEfNmH1oVWUcxz+/c869m3O4mqNwRKVUJCkWtRZU0yRy/WPv5Qv+09skd6+6wKI3VkITHM3dm6TkCGJpOtAoCC3EMpRAN2yJkQgRZZNVskhc2z3nPHGurdy45znPubtR59/n9/v+Ps/3eT/C//yTkvFtVRWMcgmch2TFEE1yvhTaxQO2qxrK/EdB3YuiDuHycUBKBhB1BCUf41o9tMjZYoDjA7YPX0VZ4lVgCVBmWHQYxXu4distctowJx8WDzAz2oRYbwAVcYr8Hav4HWgm7bxrmm8GuEvZnPHeQVhhKqyPky00W88goqL0zAAzbhfC41FiMduzpJx0VE40YNZbCyoY1n/je5KU06UT1gNm1UzwTgDlUSLzamDOdMH14eig4tRvBv0J5qRtX8cqORMWrQfsdLdh8YSuVEMtbFlgMbt6vNRnpxUrD/h8OxQB6qsOVida4gNuUFVM9QaAKWHJD8yCnY0WCatwP4dGFHft8Tn2iwZSMcTZH2bQOvOPQlHhDmbchxF6wqRrp8I3yy2mJfWDcHJIMXe7z6ivgRT7Hprl05iAuQ2IPBcmu75eeKnOMphosGSvx85TOhfVi6QTr8cEdLsRlofJHnzQ4s7a6E0gyN/c79N8ULPlKd4m7TwdDzDr7vjrOCvIeHyZxQ0TFkZYZ94/6bP0E+2evIOUsyweYCbXjsizYUX3LrZYdKWZgxv7fNYd1jkoG0nb6+IBZt1HgF1hgKvmwpvzbaM5uGC3x+c/aVfyQ6Sd3fEAt6oqRrxBhGShxCkO9C+1uKZK7+K+730aP9IO7zCWfRmr5Fw8wCA66wYOBk4W/OZUw77FFrWVhSGP/axY9KHP4LDW6G5STuglJOKoyy0E2a+TrymHYMt57Frh0vILcj+eU3SdULT1Kka8qFmg7iCVOBQWFT3Ls7kjILdElQmErqgkfxYPmF72lTpMOnG7TtsA0L0f2BMFWFS7pxpZk9g3OcAgO+MdRdTNRUGEJSn2k3bujtKMdjC/WNRC8LRzMarQhHYf37+V1cneqDwzwLyL7gcI90UJGrZvJ+WEHqMXa5gDdqhZON5x3fXLCC64pLr2bNPXnTlgfqhzL4O8ZgQSOvdkLWl7k6lGPMBWlaTa/QqR600LjItT0ssXVj09Erk7juXFAwyyNuUasOUAYHYZHKukcLHsepqlL07n4gNe2HY6ERX5ZBwPIutJ2a/EgQtiiwPcrCrxvK8RrjYrKH0krdtokpxZ/D9RxQHmXczNR/LntP7OpRjF9+pYU9YfF654B8cqdebasOR5bWFfXmC13VYM3OQBg1U93f8S1E0hAIf41W6gVXRvOi178UM8JtsxMhvb7kUmvJ+DDVnseaTku2Ldm7yDY5Wz3kpQb00AWUHK6Z4MXOkAA6WLX4FKtpG2n5osXGkBM2oauIeBJGXOjf/9P+pC9rSqcmZglQqutA6WYjwLaPwJ8DY/OGtB8MgAAAAASUVORK5CYII=';
  }
  /**
   * @private
   * @function
   * @description	getParam 获取私有属性
   * @param {String} field 属性字段
   * @return {Object} 返回私有属性对象
   */
  getParam(field) {
    return eval('this.#' + field);
  }
  /**
   * @private
   * @function
   * @description	创建CSS样式，页面默认添加<style>标签样式
   */
  createCSSStyle() {
    let styleNode = document.createElement('style');
    styleNode.setAttribute('type', 'text/css');
    styleNode.innerHTML =
      `
			/*--- ol-ext-tooltip ---*/
		    .ol-ext-tooltip {
		    	position: relative;
		    	background: rgba(` +
      this.color.R +
      `, ` +
      this.color.G +
      `, ` +
      this.color.B +
      `, 0.7);
		    	border-radius: 4px;
		    	color: white;
		    	padding: 4px 8px;
		    	opacity: 1;
		    	white-space: nowrap;
		    	font-size: 12px;
				user-select: none;
		    }
		    .ol-ext-tooltip-measure {
		    	opacity: 1;
		    	font-weight: bold;
		    }
		    .ol-ext-tooltip-static {
		    	background-color: rgba(` +
      this.color.R +
      `, ` +
      this.color.G +
      `, ` +
      this.color.B +
      `, 1);
		    	color: white;
		    	border: 1px solid white;
				user-select: none;
		    }
		    .ol-ext-tooltip-measure: before,
		    .ol-ext-tooltip-static: before {
		    	border-top: 6px solid rgba(` +
      this.color.R +
      `, ` +
      this.color.G +
      `, ` +
      this.color.B +
      `, 0.7);
		    	border-right: 6px solid transparent;
		    	border-left: 6px solid transparent;
		    	content: '';
		    	position: absolute;
		    	bottom: -6px;
		    	margin-left: -7px;
		    	left: 50%;
		    }
		    .ol-ext-tooltip-static:before {
		    	border-top-color: rgba(` +
      this.color.R +
      `, ` +
      this.color.G +
      `, ` +
      this.color.B +
      `, 1);
		    }
		`;
    let headNode = document.querySelector('head');
    headNode.appendChild(styleNode);
  }
  /**
   * @private
   * @function
   * @description	创建提示框
   */
  createHelpTooltip() {
    if (this.helpTooltipElement) this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
    this.helpTooltipElement = document.createElement('div');
    this.helpTooltipElement.className = 'ol-ext-tooltip hidden';
    this.helpTooltip = new ol.Overlay({
      id: 'measure_help',
      element: this.helpTooltipElement,
      offset: [15, 0],
      stopEvent: false,
      positioning: 'center-left',
    });
    this.getParam('map').addOverlay(this.helpTooltip);
  }
  /**
   * @private
   * @function
   * @description	创建量测框
   */
  createMeasureTooltip() {
    if (this.measureTooltipElement) this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
    this.measureTooltipElement = document.createElement('div');
    this.measureTooltipElement.className = 'ol-ext-tooltip ol-ext-tooltip-measure';
    this.measureTooltip = new ol.Overlay({
      id: 'measure_marker',
      element: this.measureTooltipElement,
      offset: [0, 0],
      stopEvent: false,
      positioning: 'bottom-center',
    });
    this.getParam('map').addOverlay(this.measureTooltip);
  }
  /**
   * @function
   * @description	量测功能初始化方法
   * @param {Object} options 参数
   * @param {String} options.color 矢量渲染颜色，default: '#ffcc33'
   * @param {Boolean} [options.helpTooltipState] 是否开启提示框，default: true
   * @param {Boolean} [options.measureTooltipState] 是否开启量测框，default: true
   * @param {Boolean} [options.lastClear] 是否清除上次绘制结果，default: false
   * @return {Void} 无返回值
   * @example
   * acolMeasure.measureInit({ color: '#ffcc33' });
   */
  measureInit({ color = '#ffcc33', helpTooltipState = true, measureTooltipState = true, lastClear = false }) {
    this.color = this.getParam('util').hexToRGB(color);
    this.helpTooltipState = helpTooltipState;
    this.measureTooltipState = measureTooltipState;
    this.lastClear = lastClear;

    // clear
    this.closeInteraction();
    this.clearDrawFeatures();

    // 创建样式
    this.createCSSStyle();
    // 初始化创建tooltip
    if (this.helpTooltipState) this.createHelpTooltip();
    if (this.measureTooltipState) this.createMeasureTooltip();
    // 添加矢量图层
    // 判断图层是否存在
    if (this.getParam('layer').isLayerExistByName('ext_measure')) this.getParam('map').removeLayer(this.measure_vector);
    // 绘制结果图层
    this.measure_source = new ol.source.Vector();
    this.measure_vector = new ol.layer.Vector({
      name: 'ext_measure',
      source: this.measure_source,
      //样式设置
      style: new ol.style.Style({
        fill: new ol.style.Fill({ color: 'rgba(255, 255, 255, 0.2)' }),
        stroke: new ol.style.Stroke({
          color: 'rgba(' + this.color.R + ', ' + this.color.G + ', ' + this.color.B + ', 1)',
          width: 2,
        }),
        image: new ol.style.Circle({
          radius: 6,
          fill: new ol.style.Fill({ color: 'rgba(' + this.color.R + ', ' + this.color.G + ', ' + this.color.B + ', 1)' }),
          stroke: new ol.style.Stroke({
            color: 'rgba(255, 255, 255, 1)',
            width: 2,
          }),
        }),
        /* image: new ol.style.Icon({
					opacity: 1, 
					src: this.base64Img,
					anchor: [0.5,0.95],
					scale: 0.8,
				}) */
      }),
      zIndex: 99999,
    });
    this.getParam('map').addLayer(this.measure_vector);
  }
  /**
   * @function
   * @description	根据类型添加量测交互
   * @param {String} type (LineString: 距离量测，Polygon: 多边形量测，Circle: 圆量测，Rectangle: 矩形量测，Point: 点位绘制)
   * @param {Function} fnc 回调函数，{ measureType, measureResult, geom }，measureType: 测量类型，measureResult: 测量结果(距离单位：米，面积单位：平方米，点位：经纬度数组)，geom: 几何图形对象
   * @return {Void} 无返回值
   * @example
   * acolMeasure.addInteractionByType('LineString', ({ measureType, measureResult, geom }) => {});
   */
  addInteractionByType(type, fnc) {
    // 入参判断
    if (arguments.length === 1) {
      this.measureType = type;
    } else if (arguments.length === 2) {
      this.measureType = type;
      this.callBack = fnc;
    } else {
      return;
    }
    // 注册
    if (this.pointerMoveHandler) ol.Observable.unByKey(this.pointerMoveHandler);
    this.pointerMoveHandler = this.getParam('map').on('pointermove', (evt) => {
      if (evt.dragging) return;
      let helpMsg = this.measureType === 'Point' ? this.continueRectanglenMsg : '单击开始测量';
      if (this.sketch) {
        let geom = this.sketch.getGeometry();
        if (this.measureType === 'Rectangle') {
          helpMsg = this.continueRectanglenMsg;
        } else if (geom instanceof ol.geom.Polygon) {
          helpMsg = this.continuePolygonMsg;
        } else if (geom instanceof ol.geom.LineString) {
          helpMsg = this.continueLineMsg;
        } else if (geom instanceof ol.geom.Circle) {
          helpMsg = this.continuCircleMsg;
        }
      }
      if (this.helpTooltipState) {
        this.helpTooltipElement.innerHTML = helpMsg;
        this.helpTooltip.setPosition(evt.coordinate);
        this.helpTooltipElement.classList.remove('hidden');
      }
    });
    // 移除draw
    if (this.draw) this.getParam('map').removeInteraction(this.draw);
    if (type === 'Rectangle') {
      // 定义draw
      this.draw = new ol.interaction.Draw({
        source: this.measure_source,
        type: 'Circle',
        style: new ol.style.Style({
          fill: new ol.style.Fill({ color: 'rgba(255, 255, 255, 0.2)' }),
          stroke: new ol.style.Stroke({
            color: 'rgba(' + this.color.R + ', ' + this.color.G + ', ' + this.color.B + ', 1)',
            lineDash: [10, 10],
            width: 2,
          }),
          image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({ color: 'rgba(255, 255, 255, 0.2)' }),
            stroke: new ol.style.Stroke({
              color: 'rgba(' + this.color.R + ', ' + this.color.G + ', ' + this.color.B + ', 1)',
            }),
          }),
        }),
        geometryFunction: ol.interaction.Draw.createBox(),
      });
    } else if (type === 'Point') {
      this.draw = new ol.interaction.Draw({
        source: this.measure_source,
        type: type,
        style: new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({ color: 'rgba(' + this.color.R + ', ' + this.color.G + ', ' + this.color.B + ', 0.5)' }),
            stroke: new ol.style.Stroke({
              color: 'rgba(' + this.color.R + ', ' + this.color.G + ', ' + this.color.B + ', 1)',
            }),
          }),
        }),
      });
    } else {
      this.draw = new ol.interaction.Draw({
        source: this.measure_source,
        type: type,
        style: new ol.style.Style({
          fill: new ol.style.Fill({ color: 'rgba(255, 255, 255, 0.2)' }),
          stroke: new ol.style.Stroke({
            color: 'rgba(' + this.color.R + ', ' + this.color.G + ', ' + this.color.B + ', 1)',
            lineDash: [10, 10],
            width: 2,
          }),
          image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({ color: 'rgba(255, 255, 255, 0.2)' }),
            stroke: new ol.style.Stroke({
              color: 'rgba(' + this.color.R + ', ' + this.color.G + ', ' + this.color.B + ', 1)',
            }),
          }),
        }),
        // 绘制时点击处理事件
        /* condition: (evt) => {
					// 测距时添加点标注
					if(this.measureType === 'LineString'){
						// 需排除第一次以及双击最后一次
					} 
					return true;
				} */
      });
    }
    this.getParam('map').addInteraction(this.draw);

    let listener;
    // drawstart
    this.draw.on('drawstart', (evt) => {
      // clear
      if (this.lastClear) this.clearDrawFeatures();
      // set sketch
      this.sketch = evt.feature;
      let tooltipCoord = null;
      // 点逻辑判断
      if (this.sketch.getGeometry() instanceof ol.geom.Point) {
        let geom = this.sketch.getGeometry();
        this.measureResult = geom.getCoordinates();
        tooltipCoord = geom.getCoordinates();

        if (this.measureTooltipState) {
          this.measureTooltipElement.innerHTML = tooltipCoord[0].toFixed(6) + '，' + tooltipCoord[1].toFixed(6);
          this.measureTooltip.setOffset([0, -15]);
          this.measureTooltip.setPosition(tooltipCoord);
        }
      } else {
        listener = this.sketch.getGeometry().on('change', (e) => {
          let geom = e.target;
          let output;
          if (geom instanceof ol.geom.Polygon) {
            output = formatAreaPolygon(geom);
            this.measureResult = formatAreaPolygon(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof ol.geom.LineString) {
            output = formatLength(geom);
            this.measureResult = formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          } else if (geom instanceof ol.geom.Circle) {
            output = formatAreaPolygon(new ol.geom.Polygon.fromCircle(geom));
            this.measureResult = formatAreaPolygon(new ol.geom.Polygon.fromCircle(geom));
            tooltipCoord = geom.getCenter();
          }
          // 单位转换
          if (type === 'LineString') {
            output = output && output > 100 ? Math.round((output / 1000) * 100) / 100 + ' ' + 'km' : Math.round(output * 100) / 100 + ' ' + 'm';
          } else {
            output = output && output > 100000 ? Math.round((output / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>' : Math.round(output * 100) / 100 + ' ' + 'm<sup>2</sup>';
          }
          if (this.measureTooltipState) {
            this.measureTooltipElement.innerHTML = output;
            // 偏移
            this.measureType === 'LineString' ? this.measureTooltip.setOffset([0, -15]) : this.measureTooltip.setOffset([0, 0]);
            this.measureTooltip.setPosition(tooltipCoord);
          }
        });
      }
    });
    // drawend
    this.draw.on('drawend', (e) => {
      if (this.measureTooltipState) this.measureTooltipElement.className = 'ol-ext-tooltip ol-ext-tooltip-static';
      // 置空
      this.sketch = null;
      this.measureTooltipElement = null;
      // 再次创建·
      this.createMeasureTooltip();
      // 移除监听事件
      ol.Observable.unByKey(listener);
      // 回调函数
      if (this.callBack && Object.prototype.toString.call(this.callBack) === '[object Function]') {
        if (this.measureType === 'Circle') {
          this.callBack({
            measureType: this.measureType,
            measureResult: this.measureResult,
            geom: new ol.geom.Polygon.fromCircle(e.feature.getGeometry()),
          });
        } else {
          this.callBack({
            measureType: this.measureType,
            measureResult: this.measureResult,
            geom: e.feature.getGeometry(),
          });
        }
      }
    });
    /**
     * @private
     * @function
     * @description	计算多边形面积
     * @param {Object} polygon - ol.geom.Polygon
     * return {Number} - 平方米
     */
    function formatAreaPolygon(polygon) {
      if (arguments.length === 1 && typeof arguments[0] === 'object') {
        let area = ol.sphere.getArea(polygon, {
          radius: 6378137,
          projection: 'EPSG:4326',
        });
        let output = Math.round(area * 100) / 100;
        return output;
      } else {
        return null;
      }
    }
    /**
     * @private
     * @function
     * @description	计算线长度
     * @param {Object} line - ol.geom.LineString
     * return {Number} - 米
     */
    function formatLength(line) {
      if (arguments.length === 1 && typeof arguments[0] === 'object') {
        let length = ol.sphere.getLength(line, {
          radius: 6378137,
          projection: 'EPSG:4326',
        });
        let output = Math.round(length * 100) / 100;
        return output;
      } else {
        return null;
      }
    }
  }
  /**
   * @function
   * @description	关闭量测功能交互
   * @return {Void} 无返回值
   * @example
   * acolMeasure.closeInteraction();
   */
  closeInteraction() {
    // 移除draw
    if (this.draw) this.getParam('map').removeInteraction(this.draw);
    // 移除
    ol.Observable.unByKey(this.pointerMoveHandler);
    this.pointerMoveHandler = null;
    // 隐藏
    if (this.helpTooltipState && this.helpTooltip) this.helpTooltip.setPosition(undefined);
  }
  /**
   * @function
   * @description	清除量测绘制结果
   * @return {Void} 无返回值
   * @example
   * acolMeasure.clearDrawFeatures();
   */
  clearDrawFeatures() {
    // 清除所有feature
    if (this.measure_source) this.measure_source.clear();
    // 清除对应overlay图层
    let olLyrs = this.getParam('map').getOverlays().getArray();
    let olLyrsLength = olLyrs.length;
    // 由大到小循环
    for (let i = olLyrsLength - 1; i >= 0; i--) {
      if (olLyrs[i].id === 'measure_marker' || olLyrs[i].id === 'measure_help') this.getParam('map').removeOverlay(olLyrs[i]);
    }
    // 重新创建overlay图层
    if (this.helpTooltipState) this.createHelpTooltip();
    if (this.measureTooltipState) this.createMeasureTooltip();
  }
}
/**
 * @desc 查询方法类
 * @author LZZ
 * @version 2.0.0
 * @example
 * let acolSearch = new acol_search();
 */
class acol_search {
  #map;
  constructor(map) {
    this.#map = map;
    this.timeout;
  }
  /**
   * @private
   * @function
   * @description	getParam 获取私有属性
   * @param {String} field 属性字段
   * @return {Object} 返回私有属性对象
   */
  getParam(field) {
    return eval('this.#' + field);
  }
  /**
   * @function
   * @description	根据字段值，从geoJson数据中获取要素
   * @param {Object} data geoJson格式数据
   * @param {String} field 属性字段
   * @param {Any} value 属性值
   * @return {Object} geoJson格式数据
   * @example
   * acolSearch.getGeoJsonFeaturesByKV(geoJson, 'code', '330312');
   */
  getGeoJsonFeaturesByKV(data, field, value) {
    let featureArray = [];
    for (let i = 0; i < data.features.length; ++i) {
      if (data.features[i].properties[field] === value) {
        featureArray.push(JSON.parse(JSON.stringify(data.features[i])));
      }
    }
    return turf.featureCollection(featureArray);
  }
  /**
   * @function
   * @description	根据字段值数组，从geoJson数据中获取要素
   * @param {Object} data geoJson格式数据
   * @param {String} field 属性字段
   * @param {Array.<Any>} values 属性值数组
   * @return {Object} geoJson格式数据
   * @example
   * acolSearch.getGeoJsonFeaturesByKVs(geoJson, 'code', ['330312','330313','330314']);
   */
  getGeoJsonFeaturesByKVs(data, field, values) {
    let featureArray = [];
    for (let i = 0; i < data.features.length; ++i) {
      if (values.indexOf(data.features[i].properties[field]) != -1) {
        featureArray.push(JSON.parse(JSON.stringify(data.features[i])));
      }
    }
    return turf.featureCollection(featureArray);
  }
  /**
   * @function
   * @description	根据经纬度数组，从geoJson数据中获取要素
   * @param {Object} data geoJson格式数据
   * @param {Array.<Number>} lonLat 经纬度数组
   * @return {Object} geoJson格式数据
   * @example
   * acolSearch.getGeoJsonFeaturesByLonlat(geoJson, [119.5729, 29.841]);
   */
  getGeoJsonFeaturesByLonlat(data, lonLat) {
    let featureArray = [];
    // 创建点
    let pt = turf.point(lonLat);
    for (let i = 0; i < data.features.length; ++i) {
      // 判断点所在多边形
      if (turf.booleanPointInPolygon(pt, data.features[i])) {
        featureArray.push(JSON.parse(JSON.stringify(data.features[i])));
      }
    }
    return turf.featureCollection(featureArray);
  }
  /**
   * @function
   * @description	根据字段值，从vector图层中获取要素
   * @param {Object} layer 矢量图层(ol.layer.Vector)
   * @param {String} field 属性字段
   * @param {Any} value 属性值
   * @return {Array.<Object>} ol.Feature要素数组
   * @example
   * acolSearch.getOLFeaturesByKVFromVectorLayer(vec_layer, 'CODE', '330100');
   */
  getOLFeaturesByKVFromVectorLayer(layer, field, value) {
    if (layer instanceof ol.layer.Vector) {
      let res_features = [];
      let temp_features = layer.getSource().getFeatures();
      temp_features.forEach((e) => {
        if (e.get(field) && e.get(field) === value) {
          res_features.push(e);
        }
      });
      return res_features;
    } else {
      throw new Error('方法传参有误，必须为矢量图层类型');
    }
  }
  /**
   * @function
   * @description	根据字段值数组，从vector图层中获取要素
   * @param {Object} layer 矢量图层(ol.layer.Vector)
   * @param {String} field 属性字段
   * @param {Array.<Any>} values 属性值数组
   * @return {Array.<Object>} ol.Feature要素数组
   * @example
   * acolSearch.getOLFeaturesByKVsFromVectorLayer(vec_layer, 'CODE', ['330100', '330200']);
   */
  getOLFeaturesByKVsFromVectorLayer(layer, field, values) {
    if (layer instanceof ol.layer.Vector) {
      let res_features = [];
      let temp_features = layer.getSource().getFeatures();
      temp_features.forEach((e) => {
        if (e.get(field) && values.indexOf(e.get(field)) != -1) {
          res_features.push(e);
        }
      });
      return res_features;
    } else {
      throw new Error('方法传参有误，必须为矢量图层类型');
    }
  }
  /**
   * @function
   * @description	根据经纬度数组，从WMS图层服务中获取数据
   * @param {Object} options 参数
   * @param {Object} options.layer WMS图层
   * @param {Array.<Number>} options.lonLat 经纬度数组
   * @param {Function} fnc 回调函数，{ data, layer }，data geoJson格式数据，layer 对应图层对象
   * @return {Void} 无返回值
   * @example
   * acolSearch.getGeoJsonByLonlatFromWMSLayer({
   *	layer: wmsLayer,
   *	lonLat: e.coordinate
   * }, function({ data, layer }){
   *  ......
   * });
   */
  async getGeoJsonByLonlatFromWMSLayer({ layer, lonLat }, fnc) {
    if (layer instanceof ol.layer.Tile || layer instanceof ol.layer.Image) {
      let temp_source = layer.getSource();
      let url = temp_source.getFeatureInfoUrl(lonLat, this.getParam('map').getView().getResolution(), this.getParam('map').getView().getProjection(), {
        INFO_FORMAT: 'application/json',
        FEATURE_COUNT: 1,
      });
      if (url) {
        let data = await fetch(url).then((response) => {
          return response.json();
        });
        if (data.features.length) {
          if (fnc && Object.prototype.toString.call(fnc) === '[object Function]') fnc({ data: data, layer: layer });
        } else {
          if (fnc && Object.prototype.toString.call(fnc) === '[object Function]') fnc({ data: data, layer: null });
        }
      }
    } else {
      throw new Error('方法传参有误，必须为WMS图层对象');
    }
  }
  /**
   * @function
   * @description	根据经纬度数组，从多个WMS图层服务中获取数据
   * @param {Object} options 参数
   * @param {Array.<Object>} options.layers WMS图层数组（按照数组顺序查询，查到即返回，后续图层不再执行逻辑）
   * @param {Array.<Number>} options.lonLat 经纬度数组
   * @param {Function} fnc 回调函数，{ data, layer }，data geoJson格式数据，layer 对应图层对象
   * @return {Void} 无返回值
   * @example
   * acolSearch.getGeoJsonByLonlatFromWMSLayers({
   *	layers: [wmsLayer, wmsLayer1],
   *	lonLat: e.coordinate
   * }, function({ data, layer }){
   *  ......
   * });
   */
  async getGeoJsonByLonlatFromWMSLayers({ layers, lonLat }, fnc) {
    // 仅判断数组格式，不判断内部对象数据类型
    if (Array.isArray(layers)) {
      let wmsIndex = 0;
      while (wmsIndex < layers.length) {
        if (layers[wmsIndex] instanceof ol.layer.Tile || layers[wmsIndex] instanceof ol.layer.Image) {
          let temp_source = layers[wmsIndex].getSource();
          let url = temp_source.getFeatureInfoUrl(lonLat, this.getParam('map').getView().getResolution(), this.getParam('map').getView().getProjection(), {
            INFO_FORMAT: 'application/json',
            FEATURE_COUNT: 1,
          });
          if (url) {
            let data = await fetch(url).then((response) => {
              return response.json();
            });
            if (data.features.length) {
              if (fnc && Object.prototype.toString.call(fnc) === '[object Function]') fnc({ data: data, layer: layers[wmsIndex] });
              return;
            } else if (wmsIndex === layers.length - 1) {
              if (fnc && Object.prototype.toString.call(fnc) === '[object Function]') fnc({ data: data, layer: null });
              return;
            } else {
              wmsIndex++;
            }
          }
        } else {
          throw new Error('方法传参有误，必须为WMS图层对象');
        }
      }
      if (fnc && Object.prototype.toString.call(fnc) === '[object Function]') fnc({ data: null, layer: null });
    } else {
      throw new Error('方法传参有误，必须为数组类型');
    }
  }
  /**
   * @function
   * @description	根据字段值数组，从WFS服务中获取数据
   * @param {Object} options 参数
   * @param {Object} options.param WFS服务参数
   * @param {String} [options.param.srsName] 坐标系，坐标系，default: 'EPSG:4326'
   * @param {String} options.param.featureNS 服务地址
   * @param {Array.<String>} options.param.featureTypes 服务名称数组，支持多服务查询
   * @param {String} [options.param.outputFormat] 返回数据格式，default: 'application/json'
   * @param {Array.<String>} [options.param.propertyNames] 返回字段限制，注意！！！若设置此参数，则不返回矢量要素信息
   * @param {String} options.field 属性字段
   * @param {Array.<Any>} options.values 属性值数组
   * @param {Function} fnc 回调函数，{ data }，data geoJson格式数据
   * @return {Void} 无返回值
   * @example
   * acolSearch.getGeoJsonByKVsFromWFSService({
   * 	param: {
   * 	 featureNS: 'http://10.10.10.39:8080/geoserver/',
   * 	 featureTypes: ['ceshi:ningbo'],
   *	 // 字段限制 - 若设置此参数，则不返回矢量要素
   *	 //propertyNames: ['NAME', 'CODE', 'COUNTY'],
   *  },
   * 	field: 'CODE',
   * 	values: ['330203', '330225']
   * }, ({ data }) => {
   * 	......
   * });
   */
  getGeoJsonByKVsFromWFSService({ param, field, values }, fnc) {
    // 定时器
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (!(values && values.length)) return;
      // filter
      let filter;
      if (values.length === 1) {
        filter = ol.format.filter.equalTo(field, values[0]);
      } else {
        // filter
        let filterStr = 'ol.format.filter.or(';
        values.forEach((e) => {
          filterStr += 'ol.format.filter.equalTo("' + field + '", ' + (typeof e === 'string' ? '"' + e + '"' : e) + '),';
        });
        filterStr += ')';
        filter = eval(filterStr);
      }
      // wfs
      let featureRequest = new ol.format.WFS().writeGetFeature({
        srsName: param.srsName || 'EPSG:4326',
        featureNS: param.featureNS,
        featureTypes: param.featureTypes,
        outputFormat: param.outputFormat || 'application/json',
        propertyNames: param.propertyNames || undefined,
        filter: filter,
      });
      fetch(param.featureNS + 'wfs', {
        method: 'POST',
        body: new XMLSerializer().serializeToString(featureRequest),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // fnc
          if (fnc && Object.prototype.toString.call(fnc) === '[object Function]') fnc({ data: data });
        })
        .catch((err) => {
          console.warn('警告! 查询错误', err);
        });
    }, 100);
  }
  /**
   * @function
   * @description	根据筛选条件数组，从WFS服务中获取数据
   * @param {Object} options 参数
   * @param {Object} options.param WFS服务参数
   * @param {String} [options.param.srsName] 坐标系，坐标系，default: 'EPSG:4326'
   * @param {String} options.param.featureNS 服务地址
   * @param {Array.<String>} options.param.featureTypes 服务名称数组，支持多服务查询
   * @param {String} [options.param.outputFormat] 返回数据格式，default: 'application/json'
   * @param {Array.<String>} [options.param.propertyNames] 返回字段限制，注意！！！若设置此参数，则不返回矢量要素信息
   * @param {Array.<Object>} options.filters 筛选条件数组，{ field => 属性字段, value => 属性值 }
   * @param {String} options.filterType 筛选条件类型，'OR'/'AND'
   * @param {Function} fnc 回调函数，{ data }，data geoJson格式数据
   * @return {Void} 无返回值
   * @example
   * acolSearch.getGeoJsonByFiltersFromWFSService({
   * 	param: {
   * 	 featureNS: 'http://10.10.10.39:8080/geoserver/',
   * 	 featureTypes: ['ceshi:ningbo'],
   * 	 // 字段限制 - 若设置此参数，则不返回矢量要素
   * 	 //propertyNames: ['CODE'],
   * 	},
   * 	filters: [
   * 	 {
   * 	  field: 'CODE',
   * 	  value: '330203'
   * 	 },
   * 	 {
   * 	  field: 'NAME',
   * 	  value: '象山县'
   * 	 },
   * 	],
   * 	filterType: 'OR'
   * }, ({ data }) => {
   * 	......
   * });
   */
  getGeoJsonByFiltersFromWFSService({ param, filters, filterType }, fnc) {
    // 定时器
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      let filter = null,
        filterStr = '';
      switch (filterType) {
        case 'OR':
          if (filters.length === 1) {
            filter = ol.format.filter.equalTo(filters[0]['field'], filters[0]['value']);
          } else {
            filterStr = 'ol.format.filter.or(';
            filters.forEach((e) => {
              filterStr += 'ol.format.filter.equalTo("' + e['field'] + '", ' + (typeof e['value'] === 'string' ? '"' + e['value'] + '"' : e['value']) + '),';
            });
            filterStr += ')';
            filter = eval(filterStr);
          }
          break;
        case 'AND':
          if (filters.length === 1) {
            filter = ol.format.filter.equalTo(filters[0]['field'], filters[0]['value']);
          } else {
            filterStr = 'ol.format.filter.and(';
            filters.forEach((e) => {
              filterStr += 'ol.format.filter.equalTo("' + e['field'] + '", ' + (typeof e['value'] === 'string' ? '"' + e['value'] + '"' : e['value']) + '),';
            });
            filterStr += ')';
            filter = eval(filterStr);
          }
          break;
        default:
          return;
      }
      if (!filter) return;
      // wfs
      let featureRequest = new ol.format.WFS().writeGetFeature({
        srsName: param.srsName || 'EPSG:4326',
        featureNS: param.featureNS,
        featureTypes: param.featureTypes,
        outputFormat: param.outputFormat || 'application/json',
        propertyNames: param.propertyNames || undefined,
        filter: filter,
      });
      fetch(param.featureNS + 'wfs', {
        method: 'POST',
        body: new XMLSerializer().serializeToString(featureRequest),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // fnc
          if (fnc && Object.prototype.toString.call(fnc) === '[object Function]') fnc({ data: data });
        })
        .catch((err) => {
          console.warn('警告! 查询错误', err);
        });
    }, 100);
  }
  /**
   * @function
   * @description	根据几何图形对象，从WFS服务中获取数据
   * @param {Object} options 参数
   * @param {Object} options.param WFS服务参数
   * @param {String} [options.param.srsName] 坐标系，坐标系，default: 'EPSG:4326'
   * @param {String} options.param.featureNS 服务地址
   * @param {Array.<String>} options.param.featureTypes 服务名称数组，支持多服务查询
   * @param {String} [options.param.outputFormat] 返回数据格式，default: 'application/json'
   * @param {Array.<String>} [options.param.propertyNames] 返回字段限制，注意！！！若设置此参数，则不返回矢量要素信息
   * @param {Object} options.geom ol.geom.Point/LineString/Polygon/Circle 几何对象
   * @param {Array.<Object>} [options.filters] 筛选条件数组，{ field => 属性字段, value => 属性值 }
   * @param {String} [options.filterType] 筛选条件类型，'OR'/'AND'
   * @param {Function} fnc 回调函数，{ data }，data geoJson格式数据
   * @return {Void} 无返回值
   * @example
   * acolSearch.getGeoJsonByGeometryFromWFSService({
   * 	param: {
   * 	 featureNS: 'http://10.10.10.39:8080/geoserver/',
   * 	 featureTypes: ['ceshi:ningbo'],
   * 	 // 字段限制 - 若设置此参数，则不返回矢量要素
   * 	 //propertyNames: ['CODE'],
   * 	},
   *  geom: geom
   * }, ({ data }) => {
   * 	......
   * });
   */
  getGeoJsonByGeometryFromWFSService({ param, geom, filters, filterType }, fnc) {
    let aaa = param;
    // 定时器
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (geom instanceof ol.geom.Point || geom instanceof ol.geom.LineString || geom instanceof ol.geom.Polygon || geom instanceof ol.geom.Circle) {
        // transform
        let geom_clone = geom.clone();
        geom_clone.applyTransform(function (flatCoordinates, flatCoordinates2, stride) {
          for (let j = 0; j < flatCoordinates.length; j += stride) {
            let y = flatCoordinates[j];
            let x = flatCoordinates[j + 1];
            flatCoordinates[j] = x;
            flatCoordinates[j + 1] = y;
          }
        });
        // filter
        let filter = null,
          filterStr = '';
        switch (filterType) {
          case 'OR':
            if (filters.length === 1) {
              filter = ol.format.filter.and(ol.format.filter.intersects('the_geom', geom_clone, param['srsName'] || 'EPSG:4326'), ol.format.filter.equalTo(filters[0]['field'], filters[0]['value']));
            } else {
              filterStr += 'ol.format.filter.or(';
              filters.forEach((e) => {
                filterStr += 'ol.format.filter.equalTo("' + e['field'] + '", ' + (typeof e['value'] === 'string' ? '"' + e['value'] + '"' : e['value']) + '),';
              });
              filterStr += ')';
              filter = ol.format.filter.and(ol.format.filter.intersects('the_geom', geom_clone, param['srsName'] || 'EPSG:4326'), eval(filterStr));
            }
            break;
          case 'AND':
            if (filters.length === 1) {
              filter = ol.format.filter.and(ol.format.filter.intersects('the_geom', geom_clone, param['srsName'] || 'EPSG:4326'), ol.format.filter.equalTo(filters[0]['field'], filters[0]['value']));
            } else {
              filterStr += 'ol.format.filter.and(';
              filters.forEach((e) => {
                filterStr += 'ol.format.filter.equalTo("' + e['field'] + '", ' + (typeof e['value'] === 'string' ? '"' + e['value'] + '"' : e['value']) + '),';
              });
              filterStr += ')';
              filter = ol.format.filter.and(ol.format.filter.intersects('the_geom', geom_clone, param['srsName'] || 'EPSG:4326'), eval(filterStr));
            }
            break;
          default:
            filter = ol.format.filter.intersects('the_geom', geom_clone, param['srsName'] || 'EPSG:4326');
            break;
        }
        // wfs
        let featureRequest = new ol.format.WFS().writeGetFeature({
          srsName: param.srsName || 'EPSG:4326',
          featureNS: param.featureNS,
          featureTypes: param.featureTypes,
          outputFormat: param.outputFormat || 'application/json',
          propertyNames: param.propertyNames || undefined,
          filter: filter,
        });
        fetch(param.featureNS + 'wfs', {
          method: 'POST',
          body: new XMLSerializer().serializeToString(featureRequest),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            // fnc
            if (fnc && Object.prototype.toString.call(fnc) === '[object Function]') fnc({ data: data });
          })
          .catch((err) => {
            console.warn('警告! 查询错误', err);
          });
      } else {
        throw new Error('方法传参有误，必须为几何图形对象');
      }
    }, 100);
  }
}
/**
 * @desc 工具方法类
 * @author LZZ
 * @version 2.0.0
 * @example
 * let acolUtil = new acol_util();
 */
class acol_util {
  constructor() {}
  /**
   * @function
   * @description	要素属性转换，去除 geometry 几何对象属性
   * @param {Object} properties 属性对象
   * @return {Object} 结果对象
   * @example
   * acolUtil.FPconversion(properties);
   */
  FPconversion(properties) {
    let resProperties = {};
    Object.getOwnPropertyNames(properties).forEach(function (key) {
      if (key != 'geometry') resProperties[key] = properties[key];
    });
    return resProperties;
  }
  /**
   * @function
   * @description	16进制颜色字符串转RGB
   * @param {String} hexColor 16进制颜色字符串，'#FFFFFF'或'FFFFFF'
   * @return {Object} RGB对象
   * @example
   * acolUtil.hexToRGB('#FFFFFF');
   */
  hexToRGB(hexColor) {
    // 判断是否带#号
    if (hexColor.slice(0, 1) === '#') {
      hexColor = hexColor.slice(1, hexColor.length);
    }
    // 十六进制颜色值的正则表达式
    const reg = /^([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = hexColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = '';
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      // 处理六位的颜色值
      let sColorChange = [];
      for (let i = 0; i < 6; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
      }
      return {
        R: sColorChange[0],
        G: sColorChange[1],
        B: sColorChange[2],
      };
    } else {
      return sColor;
    }
  }
  /**
   * @function
   * @description	对象深拷贝
   * @param {Object} obj 传入对象
   * @return {Object} 结果对象
   * @example
   * acolUtil.objDeepCopy(obj);
   */
  objDeepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  /**
   * @function
   * @description	extent数据缩放
   * @param {Object} options 参数
   * @param {Array.<Number>} options.extent [minX, minY, maxX, maxY]
   * @param {Number} options.zoomNum 放大(正)、缩小(负)参数，单位度°
   * @return {Array.<Number>} extent [minX, minY, maxX, maxY]
   * @example
   * acolUtil.extentZoomByNum({ extent: [118.251726, 28.769594, 118.758725, 29.216661], zoomNum: 0.001 });
   */
  extentZoomByNum({ extent, zoomNum = 0 }) {
    return [extent[0] - zoomNum, extent[1] - zoomNum, extent[2] + zoomNum, extent[3] + zoomNum];
  }
  /**
   * @function
   * @description	浏览器下载 geoJson 格式数据
   * @param {Object} data geoJson格式数据
   * @return {Void} 无返回值
   * @example
   * acolUtil.downLoadGeoJsonData(geoJson_data);
   */
  downLoadGeoJsonData(data) {
    if (!data) return;

    let conten = JSON.stringify(data);
    let blob = new Blob([conten]);
    let url = URL.createObjectURL(blob);

    let el = document.createElement('a');
    el.style.display = 'none';
    el.download = 'result.json';
    el.href = url;
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  }
  /**
   * @function
   * @description	geoJson数据克隆
   * @param {Object} data geoJson格式数据（需严格遵守 geoJson数据格式）
   * @return {Object} 返回 geoJson结果对象
   * @example
   * acolUtil.geoJsonClone(geoJson_data);
   */
  geoJsonClone(data) {
    return turf.clone(data);
  }
  /**
   * @function
   * @description	geoJson 转 ol.Feature数组
   * @param {Object} options 参数对象
   * @param {Object} options.data geoJson格式数据（需严格遵守 geoJson数据格式）
   * @param {String} [options.projection] 坐标系，default: 'EPSG:4326'
   * @return {Object} 返回 ol.Feature数组
   * @example
   * acolUtil.geoJsonToFeatures({ data: geoJson_data });
   */
  geoJsonToFeatures({ data, projection = 'EPSG:4326' }) {
    if (data && Object.prototype.toString.call(data) === '[object Object]') {
      return new ol.format.GeoJSON().readFeatures(data, { featureProjection: projection });
    } else {
      throw new Error('方法传参有误');
    }
  }
  /**
   * @function
   * @description	ol.Feature 转 geoJson数据
   * @param {Object} options 参数对象
   * @param {Object} options.feature ol.Feature对象
   * @param {String} [options.projection] 坐标系，default: 'EPSG:4326'
   * @return {Object} 返回 geoJson格式数据
   * @example
   * acolUtil.featureToGeoJson({feature: feature});
   */
  featureToGeoJson({ feature, projection = 'EPSG:4326' }) {
    // 判断对象数据类型
    if (feature instanceof ol.Feature) {
      return new ol.format.GeoJSON().writeFeatureObject(feature, { featureProjection: projection });
    } else {
      throw new Error('方法传参有误，必须为要素对象');
    }
  }
  /**
   * @function
   * @description	ol.Feature数组转geoJson数据
   * @param {Object} options 参数对象
   * @param {Array.<ol.Feature>} options.features ol.Feature对象数组
   * @param {String} [options.projection] 坐标系，default: 'EPSG:4326'
   * @return {Object} 返回 geoJson格式数据
   * @example
   * acolUtil.featuresToGeoJson({features: [feature]});
   */
  featuresToGeoJson({ features, projection = 'EPSG:4326' }) {
    // 仅判断数组格式，不判断内部对象数据类型
    if (Array.isArray(features)) {
      return new ol.format.GeoJSON().writeFeaturesObject(features, { featureProjection: projection });
    } else {
      throw new Error('方法传参有误，必须为数组类型');
    }
  }
  /**
   * @function
   * @description	ol.Feature 转字符串数据
   * @param {Object} options 参数对象
   * @param {Object} options.feature ol.Feature对象
   * @param {String} [options.projection] 坐标系，default: 'EPSG:4326'
   * @return {String} 返回 字符串格式数据
   * @example
   * acolUtil.featureToText({feature: feature});
   */
  featureToText({ feature, projection = 'EPSG:4326' }) {
    // 判断对象数据类型
    if (feature instanceof ol.Feature) {
      return new ol.format.GeoJSON().writeFeature(feature, { featureProjection: projection });
    } else {
      throw new Error('方法传参有误，必须为要素对象');
    }
  }
  /**
   * @function
   * @description	ol.Feature数组转字符串数据
   * @param {Object} options 参数对象
   * @param {Array.<ol.Feature>} options.features ol.Feature对象数组
   * @param {String} [options.projection] 坐标系，default: 'EPSG:4326'
   * @return {String} 返回 字符串格式数据
   * @example
   * acolUtil.featuresToText({features: [feature]});
   */
  featuresToText({ features, projection = 'EPSG:4326' }) {
    // 仅判断数组格式，不判断内部对象数据类型
    if (Array.isArray(features)) {
      return new ol.format.GeoJSON().writeFeatures(features, { featureProjection: projection });
    } else {
      throw new Error('方法传参有误，必须为数组类型');
    }
  }
  /**
   * @function
   * @description	通过从第一个多边形中剪裁第二个多边形来查找两个多边形之间的差异
   * @param {Object} G1 geoJson格式数据
   * @param {Object} G2 geoJson格式数据
   * @return {Object} 返回geoJson结果对象
   * @example
   * acolUtil.differenceByTurf(data, data1);
   */
  differenceByTurf(G1, G2) {
    if (G1.features.length === 1 && G2.features.length === 1) {
      let res_diff = turf.difference(G1.features[0], G2.features[0]);
      res_diff.properties = { TURF: 'difference' };
      // 返回 -> geoJson
      return turf.featureCollection([res_diff]);
    } else {
      return null;
    }
  }
  /**
   * @function
   * @description	通过从第一个多边形中相交第二个多边形来查找两个多边形之间的交集
   * @param {Object} G1 geoJson格式数据
   * @param {Object} G2 geoJson格式数据
   * @return {Object} 返回geoJson结果对象
   * @example
   * acolUtil.intersectByTurf(data, data1);
   */
  intersectByTurf(G1, G2) {
    let G1JsonCollect = turf.flatten(G1);
    let G2JsonCollect = turf.flatten(G2);
    // 临时结果要素集合
    let tempFeatures = [];
    // 相交分析
    G1JsonCollect.features.forEach(function (layer1) {
      G2JsonCollect.features.forEach(function (layer2) {
        let intersection = null;
        try {
          intersection = turf.intersect(layer1, layer2);
        } catch (e) {
          layer1 = turf.buffer(layer1, 0);
          intersection = turf.intersect(layer1, layer2);
          console.warn('警告! intersect catch', err);
        }
        if (intersection != null) {
          // 结果赋值
          intersection.properties['TURF'] = 'intersect';
          tempFeatures.push(intersection);
        }
      });
    });
    // 合并 -> geoJson
    let tempFeaturesCollect = turf.featureCollection(tempFeatures);
    return tempFeaturesCollect;
  }
  /**
   * @function
   * @description	基于turf.js，获取geoJson数据bbox
   * @param {Object} data geoJson格式数据
   * @return {Array.<Number>} bbox [minX, minY, maxX, maxY]
   * @example
   * acolUtil.geoJsonBboxByTurf(geoJson_data);
   */
  geoJsonBboxByTurf(data) {
    return turf.bbox(data);
  }
  /**
   * @function
   * @description	基于turf.js，获取geoJson数据顶点多边形
   * @param {Object} data geoJson格式数据
   * @return {Object} geoJson格式数据 Polygon
   * @example
   * acolUtil.geoJsonEnvelopeByTurf(geoJson_data);
   */
  geoJsonEnvelopeByTurf(data) {
    return turf.envelope(data);
  }
  /**
   * @function
   * @description	基于turf.js，获取geoJson多边形表面一点
   * @param {Object} options 参数
   * @param {Object} options.data geoJson格式数据(面数据)
   * @return {Object} geoJson格式数据 Point
   * @example
   * acolUtil.geoJsonPointOnFeatureByTurf({ data: geoJson_data });
   */
  geoJsonPointOnFeatureByTurf({ data }) {
    return turf.pointOnFeature(data);
  }
  /**
   * @function
   * @description	基于turf.js，获取geoJson多边形面内随机点
   * @param {Object} options 参数
   * @param {Object} options.data geoJson格式数据(面数据)
   * @param {Number} options.pointNum 随机点个数
   * @return {Object} geoJson格式数据 Point
   * @example
   * acolUtil.geoJsonRandomPointsInPolygonByTurf({ data: geoJson_data, pointNum: 10 });
   */
  geoJsonRandomPointsInPolygonByTurf({ data, pointNum = 1 }) {
    let points = [];
    let res_points = [];
    let bbox = turf.bbox(data);
    while (res_points.length < pointNum) {
      points = turf.randomPoint(pointNum, { bbox: bbox });
      for (let i = 0; i < points.features.length; ++i) {
        if (turf.booleanPointInPolygon(points.features[i], data.features[0])) {
          points.features[i].properties['TURF'] = 'randomPoint';
          res_points.push(points.features[i]);
          if (res_points.length === pointNum) break;
        }
      }
    }
    return turf.featureCollection(res_points);
  }
  /**
   * @function
   * @description	geoJson数据偏移
   * @param {Object} options 参数
   * @param {Object} options.data geoJson格式数据
   * @param {Number} options.distance 距离，默认单位公里
   * @param {Number} options.direction 角度，正北开始顺时针递增
   * @param {Object} [options.options] 参数配置，options: { units: 'kilometers' }
   * @return {Object} geoJson格式数据 Polygon
   * @example
   * acolUtil.geoJsonTransformTranslate({
   *  data: geoJson_data,
   *  distance: 1,
   *  direction: 180
   * });
   */
  geoJsonTransformTranslate({ data, distance = 0, direction = 0, options = null }) {
    return turf.transformTranslate(data, distance, direction, options);
  }
  /**
   * @function
   * @description	基于turf.js，获取geoJson数据质心
   * @param {Object} data geoJson格式数据
   * @return {Object} geoJson格式数据 Point
   * @example
   * acolUtil.geoJsonCenterOfMassByTurf(geoJson_data);
   */
  geoJsonCenterOfMassByTurf(data) {
    return turf.centerOfMass(data);
  }
  /**
   * @function
   * @description	基于turf.js，获取geoJson数据顶点平均中心
   * @param {Object} data geoJson格式数据
   * @return {Object} geoJson格式数据 Point
   * @example
   * acolUtil.geoJsonCentroidByTurf(geoJson_data);
   */
  geoJsonCentroidByTurf(data) {
    return turf.centroid(data);
  }
  /**
   * @function
   * @description	基于turf.js，获取geoJson数据绝对中心点
   * @param {Object} data geoJson格式数据
   * @return {Object} geoJson格式数据 Point
   * @example
   * acolUtil.geoJsonCenterByTurf(geoJson_data);
   */
  geoJsonCenterByTurf(data) {
    return turf.center(data);
  }
}
