/**
 * @desc 地图封装类
 * @author LZZ
 * @version 1.1.0
 * @example
 * let acMap = new acol_map();
 */
class acol_map {
  constructor() {
    this.map = null;
    this.acolLayer = null;
    this.mapEventType = {
      LEFT_CLICK: 'singleclick',
      LEFT_DOUBLE_CLICK: 'dblclick',
      MOUSE_WHEEL: 'moveend',
      MOUSE_MOVE: 'pointermove',
      MOUSE_DRAG: 'pointerdrag',
      // 特殊处理
      SELECT: 'select',
    };
  }
  /**
   * @function
   * @description	map 初始化方法
   * @param {Object} options 参数
   * @param {String} options.id 地图的容器，可以是元素本身，也可以是元素id
   * @param {Array.<Number>} options.center 地图中心点经纬度数组
   * @param {String} [options.projection] 坐标系，default: 'EPSG:4326'
   * @param {Number} options.zoom 地图当前比例尺等级，default: 7
   * @param {Number} [options.minZoom] 地图最小比例尺等级，default: 6
   * @param {Number} [options.maxZoom] 地图最大比例尺等级，default: 18
   * @param {Boolean} [options.constrainResolution] 是否使地图缩放保持整数级别，default: true
   * @return {Void} 无返回值
   * @example
   * acMap.initMap({ id: 'map', center: [119.5729, 29.8411], zoom: 11, minZoom: 10, maxZoom: 15 });
   */
  initMap({ id = '', center = [120.49, 29.12], padding = [0, 0, 0, 0], projection = 'EPSG:4326', zoom = 7, minZoom = 6, maxZoom = 18, extent = null, constrainResolution = true, rotation = 0 }) {
    if (this.map) return this.map;
    // 实例化Map对象
    this.map = new ol.Map({
      // 移除控件
      controls: ol.control.defaults({ attribution: false, zoom: false }),
      target: id,
      //地图视图设置
      view: extent
        ? new ol.View({
            center: center,
            projection: projection,
            zoom: zoom,
            minZoom: minZoom,
            maxZoom: maxZoom,
            extent: extent,
            constrainResolution: constrainResolution,
            rotation,
            padding,
          })
        : new ol.View({
            center: center,
            projection: projection,
            zoom: zoom,
            minZoom: minZoom,
            maxZoom: maxZoom,
            constrainResolution: constrainResolution,
            rotation,
            padding,
          }),
      interactions: new ol.interaction.defaults({
        doubleClickZoom: false,
      }),
    });
    this.acolLayer = new acol_layer(this.map);
    return this.map;
  }
  /**
   * @function
   * @description	map 添加图层方法
   * @param {Object} layerObj 图层对象
   * @param {Number} zIndex 图层层级
   * @return {Void} 无返回值
   * @example
   * acMap.addLayer(layer, 1);
   */
  addLayer(layerObj, zIndex) {
    if (!(layerObj && typeof layerObj === 'object')) return;
    // 添加图层
    let layerName = layerObj.getProperties()['name'];
    // 避免重复添加图层，如果图层存在，则显示图层
    if (!this.acolLayer.isLayerExistByName(layerName)) {
      if (this.map) this.map.addLayer(layerObj);
    } else {
      this.showLayer(layerObj);
    }
    // 设置图层层级
    if (zIndex && typeof zIndex === 'number') layerObj.setZIndex(zIndex);
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
    if (!Array.isArray(layerArray)) return;
    // 循环添加
    for (let i = 0; i < layerArray.length; ++i) {
      this.addLayer(layerArray[i]);
    }
  }
  /**
   * @function
   * @description	通过配置信息，添加图层数组
   * @param {Array.<Object>} optionArray 图层配置信息对象数组
   * @param {Function} fnc 回调函数，{ name: 图层名称, layer: 图层对象 }
   * @return {Void} 无返回值
   * @example
   * let layerOptions = [
   *	{ name: 'tdtImg', layer: 'tdtLayer', type: 'img', sourceType: 'XYZ', isLabel: false, zIndex: 0 },
   *	{ name: 'area', layer: 'vectorLayer', type: 'polygon', dataOption: { data: geoJsonData_village },style: { fill: {}, stroke: { color: 'rgba(0, 255, 255, 1)', width: 1 } }, zIndex: 1 },
   *	{ name: 'wms', layer: 'wmsLayer', mapUrl: 'http://geoserver.zjsszxc.com/geoserver/FHJSC/wms', mapName: 'FHJSC:TAOSHU', zIndex: 2 }
   * ];
   * acMap.addLayersByOptions(layerOptions,function({ name, layer }){
   *	......
   * });
   */
  addLayersByOptions(optionArray, fnc) {
    if (!Array.isArray(optionArray)) return;
    optionArray.forEach((e) => {
      let temp_layer;
      switch (e.layer) {
        case 'tdtLayer':
          temp_layer = this.acolLayer.tdtLayer(e);
          break;
        case 'wmsLayer':
          temp_layer = this.acolLayer.wmsLayer(e);
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
  }
  /**
   * @function
   * @description	map 移除图层方法
   * @param {Object} layerObj 图层对象
   * @return {Void} 无返回值
   * @example
   * acMap.removeLayer(layer);
   */
  removeLayer(layerObj) {
    if (!(layerObj && typeof layerObj === 'object')) return;
    // 移除图层
    if (this.map) this.map.removeLayer(layerObj);
  }
  /**
   * @function
   * @description	map 移除图层数组方法
   * @param {Array.<Object>} layerArray 图层对象数组
   * @return {Void} 无返回值
   * @example
   * acMap.removeLayers([layer, layer1]);
   */
  removeLayers(layerArray) {
    if (!Array.isArray(layerArray)) return;
    // 循环移除
    for (let i = 0; i < layerArray.length; ++i) {
      this.removeLayer(layerArray[i]);
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
    if (!(layerName && typeof layerName === 'string')) return;
    // 获取图层
    let layer = this.acolLayer.getLayerByName(layerName);
    if (layer) this.removeLayer(layer);
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
    if (!Array.isArray(layerNameArray)) return;
    // 循环移除
    for (let i = 0; i < layerNameArray.length; ++i) {
      this.removeLayerByName(layerNameArray[i]);
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
    if (!(layer && typeof layer === 'object')) return;
    layer.setVisible(true);
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
    if (!(layerName && typeof layerName === 'string')) return;
    // 获取图层
    let layer = this.acolLayer.getLayerByName(layerName);
    if (layer) this.showLayer(layer);
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
    if (!Array.isArray(layerNameArray)) return;
    // 循环显示
    for (let i = 0; i < layerNameArray.length; ++i) {
      this.showLayerByName(layerNameArray[i]);
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
    if (!(layer && typeof layer === 'object')) return;
    layer.setVisible(false);
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
    if (!(layerName && typeof layerName === 'string')) return;
    // 获取图层
    let layer = this.acolLayer.getLayerByName(layerName);
    if (layer) this.hideLayer(layer);
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
    if (!Array.isArray(layerNameArray)) return;
    // 循环显示
    for (let i = 0; i < layerNameArray.length; ++i) {
      this.hideLayerByName(layerNameArray[i]);
    }
  }
  /**
   * @function
   * @description	事件添加
   * @param {Function} fnc 回调函数
   * @param {String} eventType 事件类型，'LEFT_CLICK': '单击','LEFT_DOUBLE_CLICK': '双击','MOUSE_WHEEL': '滚轮','MOUSE_MOVE': '移动','MOUSE_DRAG': '拖拽','SELECT': '要素选择'
   * @return {Object} 监听事件对象
   * @example
   * acMap.mapEventOn(function(e){
   * 	......
   * },'LEFT_CLICK');
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
        return this.map.on(this.mapEventType[eventType], fnc);
      }
    }
  }
  /**
   * @function
   * @description	事件移除
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
        let listenerArr = this.map.listeners_[this.mapEventType[eventType]];
        if (listenerArr && listenerArr.length) this.map.un(this.mapEventType[eventType], listenerArr[0]);
      }
    }
  }
}
/**
 * @desc 配置类，常量参数配置
 * @author LZZ
 * @version 1.1.0
 * @example
 * let acolConfig = new acol_config();
 */
class acol_config {
  constructor() {
    this.resolutions_4326 = [
      1.40625, 0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125e-4, 3.4332275390625e-4,
      1.71661376953125e-4, 8.58306884765625e-5, 4.291534423828125e-5, 2.1457672119140625e-5, 1.0728836059570312e-5, 5.364418029785156e-6, 2.682209014892578e-6, 1.341104507446289e-6,
      6.705522537231445e-7, 3.3527612686157227e-7,
    ];
    this.matrixIds_4326 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  }
}
/**
 * @desc 图层封装类
 * @author LZZ
 * @version 1.1.0
 * @param {Object} map ol.map地图对象
 * @example
 * let acolLayer = new acol_layer(acMap.map);
 */
class acol_layer {
  constructor(map) {
    this.map = map;
    this.acolConfig = new acol_config();
    this.acolUtil = new acol_util();
  }
  /**
   * @function
   * @description	初始化天地图图层
   * @param {Object} options 参数
   * @param {String} options.name 图层名称，default: 'tdtLayer'
   * @param {String} options.type 天地图图层类型(vec:矢量图层，img:影像图层，ter:地形图层)，default: 'img'
   * @param {String} [options.sourceType] 资源类型('WMTS'，'XYZ')，default: 'WMTS'
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
    sourceType = 'WMTS',
    key = '887589c1776c20e51814bbd9009666d0',
    isLabel = false,
    projection = 'EPSG:4326',
    visible = true,
    minZoom = 0,
    maxZoom = 18,
    zIndex = 0,
  }) {
    switch (sourceType) {
      case 'WMTS':
        return new ol.layer.Tile({
          name: name,
          type: 'tdtLayer',
          opacity: opacity,
          source: new ol.source.Tianditu({
            layerType: type,
            key: key,
            isLabel: isLabel,
            projection: projection,
          }),
          visible: visible,
          minZoom: minZoom,
          maxZoom: maxZoom,
          zIndex: zIndex,
        });
      case 'XYZ':
        let layerType = isLabel ? (type === 'img' ? 'cia' : type === 'vec' ? 'cva' : type === 'ter' ? 'cta' : 'cia') : type;
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
   * @description	基于GeoJson格式数据裁剪天地图服务
   * @param {Object} options 参数
   * @param {Object} options.layer 被裁剪图层对象
   * @param {Object} options.data GeoJson格式数据
   * @return {Void} 无返回值
   * @example
   * acolLayer.tdtLayerMaskByGeoJson({ layer: tdtLayer, data: geoJson });
   */
  tdtLayerMaskByGeoJson({ layer, data }) {
    // 掩膜要素
    let maskFeatures = new ol.format.GeoJSON().readFeatures(data, {
      featureProjection: 'EPSG:4326',
    });
    layer.on('postrender', function (e) {
      let vectorContext = ol.render.getVectorContext(e);
      e.context.globalCompositeOperation = 'destination-in';
      // feature 为桐庐面要素
      vectorContext.drawFeature(
        maskFeatures[0],
        new ol.style.Style({
          fill: new ol.style.Fill({
            // 必需设置颜色
            color: 'rgba(255, 255, 255, 1)',
          }),
        }),
      );
      e.context.globalCompositeOperation = 'source-over';
    });
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
   *		data: diff_data,
   *	},
   *	style: {
   *		fill: { color: 'rgba(0, 255, 255, 0.2 )' },
   *		stroke: { color: 'rgba(0, 255, 255, 1)', width: 1 }
   *	},
   *	zIndex: 1
   * });
   */
  vectorLayer({ name = 'vectorLayer', type, dataOption = {}, style = null, projection = 'EPSG:4326', visible = true, minZoom = 0, maxZoom = 18, zIndex = 0 }) {
    // 矢量图层
    let vectorLayer = new ol.layer.Vector({
      name: name,
      type: 'vectorLayer',
      source: new ol.source.Vector({
        projection,
      }),
      // 创建图层时，不设置图层样式
      style: null,
      visible: visible,
      minZoom: minZoom,
      maxZoom: maxZoom,
      zIndex: zIndex,
      declutter: type === 'text' ? true : false,
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
        // 设置样式
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
                  radius: circle.radius || 10,
                  fill: circle.fill ? new ol.style.Fill(circle.fill) : new ol.style.Fill({ color: 'rgba(0, 191, 255, 1)' }),
                  stroke: circle.stroke ? new ol.style.Stroke(circle.stroke) : new ol.style.Stroke({ color: 'rgba(255, 255, 255, 1)', width: 2 }),
                  displacement: circle.displacement || [0, 0],
                })
              : null,
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
            // stroke: stroke ? (!Object.keys(stroke).length ? null : new ol.style.Stroke(stroke)) : new ol.style.Stroke({ color: 'rgba(255, 255, 0, 1)', width: 1 }),
            stroke: stroke ? (!Object.keys(stroke).length ? null : new ol.style.Stroke(stroke)) : null,
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
   * @param {Boolean} [options.tiled] 是否开启缓存，default: false
   * @return {Object} ol.layer.Tile
   * @example
   * acolLayer.wmsLayer({
   *	name: 'WMS图层',
   *	mapUrl: 'http://geoserver.zjsszxc.com/geoserver/FHJSC/wms',
   *	mapName: 'FHJSC:TAOSHU',
   *	zIndex: 2
   * });
   */
  wmsLayer({ name = 'wmsLayer', opacity = 1, mapUrl, mapName, projection = 'EPSG:4326', visible = true, minZoom = 0, maxZoom = 18, zIndex = 0, tiled = false }) {
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
  wmtsLayer({ name = 'wmtsLayer', opacity = 1, mapUrl, layer = null, matrixSet = null, tkOption = null, projection = 'EPSG:4326', visible = true, minZoom = 0, maxZoom = 18, zIndex = 0 }) {
    return new ol.layer.Tile({
      name: name,
      type: 'wmtsLayer',
      source: new ol.source.WMTS({
        url: tkOption ? mapUrl + '?' + tkOption.tkField + '=' + tkOption.key : mapUrl,
        layer: layer,
        matrixSet: matrixSet,
        format: 'tiles',
        projection: projection,
        tileGrid: new ol.tilegrid.WMTS({
          origin: ol.extent.getTopLeft(ol.proj.get(projection).getExtent()),
          resolutions: this.acolConfig.resolutions_4326,
          matrixIds: this.acolConfig.matrixIds_4326,
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
    resolutions = this.acolConfig.resolutions_4326,
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
      extent,
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
   * @param {Boolean} [options.autoPan] default: true，是否开启自动平移 弹出窗口在边缘点击时候可能不完整 设置自动平移效果
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
    let olLyrs = this.map.getOverlays().getArray();
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
    let olLyrs = this.map.getOverlays().getArray();
    let olLyrsLength = olLyrs.length;
    // 由大 --> 小循环
    for (let i = olLyrsLength - 1; i >= 0; i--) {
      if (olLyrs[i].id === id) {
        this.map.removeOverlay(olLyrs[i]);
      }
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
    if (!(layerName && typeof layerName === 'string')) return null;
    // 判断 map 对象
    if (this.map) {
      //获取地图中所有图层
      let layers = this.map.getLayers();
      for (let i = 0; i < layers.getLength(); ++i) {
        if (layers.item(i).get('name') && layers.item(i).get('name') === layerName) {
          return layers.item(i);
        }
      }
    }
    return null;
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
    if (!(layerName && typeof layerName === 'string')) return false;
    // 返回结果
    return this.getLayerByName(layerName) ? true : false;
  }
  /**
   * @function
   * @description	图层层级设置
   * @param {Object} layer 图层对象
   * @param {Number} ZIndex 层级数，数值越大层级越高
   * @return {Void} 无返回值
   * @example
   * acolLayer.setZIndex(tdtLayer,1);
   */
  setZIndex(layer, ZIndex) {
    if (arguments.length === 2 && typeof arguments[0] === 'object' && typeof arguments[1] === 'number') {
      layer.setZIndex(ZIndex < 0 ? 0 : ZIndex);
    }
  }
  /**
   * @function
   * @description	通过名称设置图层层级
   * @param {String} layerName 图层名称
   * @param {Number} ZIndex 层级数，数值越大层级越高
   * @return {Void} 无返回值
   * @example
   * acolLayer.setZIndexByName('tdtImg',1);
   */
  setZIndexByName(layerName, ZIndex) {
    if (arguments.length === 2 && typeof arguments[0] === 'string' && typeof arguments[1] === 'number') {
      let layer = this.getLayerByName(layerName);
      if (layer) layer.setZIndex(ZIndex < 0 ? 0 : ZIndex);
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
    let layers = this.map.getLayers();
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
   * },function(){
   *  ......
   * });
   */
  panToByExtent({ extent, zoomNum = 0, duration }, fnc) {
    // 为保证已加载矢量要素渲染效果，默认延迟100毫秒后执行
    setTimeout(() => {
      // fit
      this.map.getView().fit(this.acolUtil.extentZoomByNum({ extent: extent, zoomNum: zoomNum }), {
        duration: duration || undefined,
        callback: function () {
          // 回调函数
          if (fnc && Object.prototype.toString.call(fnc) === '[object Function]') fnc();
        },
      });
    }, 100);
  }
}
/**
 * @desc 数据加密算法类 - Data Encryption Algorithm
 * @author LZZ
 * @version 1.1.0
 * @example
 * let acolDea = new acol_dea();
 */
class acol_dea {
  constructor() {
    this.UTF8Scale = 8192;
    this.UTF8Level = 1;
    this.acolUtil = new acol_util();
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
    let geo = this.acolUtil.objDeepCopy(data);
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
    if (downLoad) this.acolUtil.downLoadGeoJsonData(geo);
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
    let geo = this.acolUtil.objDeepCopy(data);
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
    if (downLoad) this.acolUtil.downLoadGeoJsonData(geo);
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
 * @desc 地图量测类
 * @author LZZ
 * @version 1.1.0
 * @param {Object} map ol.map地图对象
 * @example
 * let acolMeasure = new acol_measure(acMap.map);
 */
class acol_measure {
  constructor(map) {
    this.map = map;
    this.acolUtil = new acol_util();
    this.acolLayer = new acol_layer(this.map);
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
    // Tooltip - 量测框
    this.measureTooltipElement = null;
    this.measureTooltip = null;
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
    // base64
    this.base64Img =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABEhJREFUWEfNmH1oVWUcxz+/c869m3O4mqNwRKVUJCkWtRZU0yRy/WPv5Qv+09skd6+6wKI3VkITHM3dm6TkCGJpOtAoCC3EMpRAN2yJkQgRZZNVskhc2z3nPHGurdy45znPubtR59/n9/v+Ps/3eT/C//yTkvFtVRWMcgmch2TFEE1yvhTaxQO2qxrK/EdB3YuiDuHycUBKBhB1BCUf41o9tMjZYoDjA7YPX0VZ4lVgCVBmWHQYxXu4distctowJx8WDzAz2oRYbwAVcYr8Hav4HWgm7bxrmm8GuEvZnPHeQVhhKqyPky00W88goqL0zAAzbhfC41FiMduzpJx0VE40YNZbCyoY1n/je5KU06UT1gNm1UzwTgDlUSLzamDOdMH14eig4tRvBv0J5qRtX8cqORMWrQfsdLdh8YSuVEMtbFlgMbt6vNRnpxUrD/h8OxQB6qsOVida4gNuUFVM9QaAKWHJD8yCnY0WCatwP4dGFHft8Tn2iwZSMcTZH2bQOvOPQlHhDmbchxF6wqRrp8I3yy2mJfWDcHJIMXe7z6ivgRT7Hprl05iAuQ2IPBcmu75eeKnOMphosGSvx85TOhfVi6QTr8cEdLsRlofJHnzQ4s7a6E0gyN/c79N8ULPlKd4m7TwdDzDr7vjrOCvIeHyZxQ0TFkZYZ94/6bP0E+2evIOUsyweYCbXjsizYUX3LrZYdKWZgxv7fNYd1jkoG0nb6+IBZt1HgF1hgKvmwpvzbaM5uGC3x+c/aVfyQ6Sd3fEAt6oqRrxBhGShxCkO9C+1uKZK7+K+730aP9IO7zCWfRmr5Fw8wCA66wYOBk4W/OZUw77FFrWVhSGP/axY9KHP4LDW6G5STuglJOKoyy0E2a+TrymHYMt57Frh0vILcj+eU3SdULT1Kka8qFmg7iCVOBQWFT3Ls7kjILdElQmErqgkfxYPmF72lTpMOnG7TtsA0L0f2BMFWFS7pxpZk9g3OcAgO+MdRdTNRUGEJSn2k3bujtKMdjC/WNRC8LRzMarQhHYf37+V1cneqDwzwLyL7gcI90UJGrZvJ+WEHqMXa5gDdqhZON5x3fXLCC64pLr2bNPXnTlgfqhzL4O8ZgQSOvdkLWl7k6lGPMBWlaTa/QqR600LjItT0ssXVj09Erk7juXFAwyyNuUasOUAYHYZHKukcLHsepqlL07n4gNe2HY6ERX5ZBwPIutJ2a/EgQtiiwPcrCrxvK8RrjYrKH0krdtokpxZ/D9RxQHmXczNR/LntP7OpRjF9+pYU9YfF654B8cqdebasOR5bWFfXmC13VYM3OQBg1U93f8S1E0hAIf41W6gVXRvOi178UM8JtsxMhvb7kUmvJ+DDVnseaTku2Ldm7yDY5Wz3kpQb00AWUHK6Z4MXOkAA6WLX4FKtpG2n5osXGkBM2oauIeBJGXOjf/9P+pC9rSqcmZglQqutA6WYjwLaPwJ8DY/OGtB8MgAAAAASUVORK5CYII=';
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
      positioning: 'center-left',
    });
    this.map.addOverlay(this.helpTooltip);
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
      positioning: 'bottom-center',
    });
    this.map.addOverlay(this.measureTooltip);
  }
  /**
   * @function
   * @description	量测功能初始化方法
   * @param {Object} options 参数
   * @param {String} options.color 矢量渲染颜色，default: '#ffcc33'
   * @return {Void} 无返回值
   * @example
   * acolMeasure.measureInit({ color: '#ffcc33' });
   */
  measureInit({ color = '#ffcc33' }) {
    if (color) this.color = this.acolUtil.hexToRGB(color);
    // 创建样式
    this.createCSSStyle();
    // 初始化创建tooltip
    this.createHelpTooltip();
    this.createMeasureTooltip();
    // 添加矢量图层
    // 判断图层是否存在
    if (!this.acolLayer.isLayerExistByName('ext_measure')) {
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
      this.map.addLayer(this.measure_vector);
    }
  }
  /**
   * @function
   * @description	根据类型添加量测交互
   * @param {String} type (LineString: 距离量测，Polygon: 多边形量测，Circle: 圆量测，Rectangle: 矩形量测，Point: 点位绘制)
   * @param {Function} fnc 回调函数，{ measureType, measureResult }，measureType: 测量类型，measureResult: 测量结果(距离单位：米，面积单位：平方米，点位：经纬度数组)
   * @return {Void} 无返回值
   * @example
   * acolMeasure.addInteractionByType('LineString', ({ measureType, measureResult }) => {});
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
    this.pointerMoveHandler = this.map.on('pointermove', (evt) => {
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
      this.helpTooltipElement.innerHTML = helpMsg;
      this.helpTooltip.setPosition(evt.coordinate);
      this.helpTooltipElement.classList.remove('hidden');
    });
    // 移除draw
    if (this.draw) this.map.removeInteraction(this.draw);
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
    this.map.addInteraction(this.draw);

    let listener;
    // drawstart
    this.draw.on('drawstart', (evt) => {
      // set sketch
      this.sketch = evt.feature;
      let tooltipCoord = null;
      // 点逻辑判断
      if (this.sketch.getGeometry() instanceof ol.geom.Point) {
        let geom = this.sketch.getGeometry();
        this.measureResult = geom.getCoordinates();
        tooltipCoord = geom.getCoordinates();

        this.measureTooltipElement.innerHTML = tooltipCoord[0].toFixed(6) + '，' + tooltipCoord[1].toFixed(6);
        this.measureTooltip.setOffset([0, -15]);
        this.measureTooltip.setPosition(tooltipCoord);
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
            let centerLogLat = geom.getCenter();
            let lastLogLat = geom.getLastCoordinate();
            let radius = ol.sphere.getDistance(centerLogLat, lastLogLat, 6378137);

            output = formatAreaCircle(radius);
            this.measureResult = formatAreaCircle(radius);
            tooltipCoord = centerLogLat;
          }
          // 单位转换
          if (type === 'LineString') {
            output = output && output > 100 ? Math.round((output / 1000) * 100) / 100 + ' ' + 'km' : Math.round(output * 100) / 100 + ' ' + 'm';
          } else {
            output = output && output > 100000 ? Math.round((output / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>' : Math.round(output * 100) / 100 + ' ' + 'm<sup>2</sup>';
          }
          this.measureTooltipElement.innerHTML = output;
          // 偏移
          this.measureType === 'LineString' ? this.measureTooltip.setOffset([0, -15]) : this.measureTooltip.setOffset([0, 0]);
          this.measureTooltip.setPosition(tooltipCoord);
        });
      }
    });
    // drawend
    this.draw.on('drawend', () => {
      this.measureTooltipElement.className = 'ol-ext-tooltip ol-ext-tooltip-static';
      // 置空
      this.sketch = null;
      this.measureTooltipElement = null;
      // 再次创建·
      this.createMeasureTooltip();
      // 移除监听事件
      ol.Observable.unByKey(listener);
      // 回调函数
      if (this.callBack) this.callBack({ measureType: this.measureType, measureResult: this.measureResult });
    });

    /**
     * @private
     * @function
     * @description	计算圆面积
     * @param {Number} radius - 半径
     * return {Number} - 平方米
     */
    function formatAreaCircle(radius) {
      if (arguments.length === 1 && typeof arguments[0] === 'number') {
        let circle_area = Math.PI * radius * radius;
        let output = Math.round(circle_area * 100) / 100;
        return output;
      } else {
        return null;
      }
    }
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
    if (this.draw) this.map.removeInteraction(this.draw);
    // 移除
    ol.Observable.unByKey(this.pointerMoveHandler);
    this.pointerMoveHandler = null;
    // 隐藏
    this.helpTooltip.setPosition(undefined);
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
    let olLyrs = this.map.getOverlays().getArray();
    let olLyrsLength = olLyrs.length;
    // 由大到小循环
    for (let i = olLyrsLength - 1; i >= 0; i--) {
      if (olLyrs[i].id === 'measure_marker' || olLyrs[i].id === 'measure_help') this.map.removeOverlay(olLyrs[i]);
    }
    // 重新创建overlay图层
    this.createMeasureTooltip();
    this.createHelpTooltip();
  }
}
/**
 * @desc 查询方法类
 * @author LZZ
 * @version 1.1.0
 * @example
 * let acolSearch = new acol_search();
 */
class acol_search {
  constructor() {}
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
   * @description	根据SQL条件，从超图数据服务中获取feature要素，geoJson格式数据
   * @param {Object} options 参数
   * @param {String} options.dataUrl 超图数据服务地址 例：'http://10.10.11.96:8090/iserver/services/data-CeShi/rest/data'
   * @param {Array.<String>} options.datasetNames 数据集集合中的数据集名称列表 例：['data:LOG']
   * @param {Array.<String>} [options.fields] 查询字段数组 例：['序号','网点名称']
   * @param {Number} [options.fromIndex] default 0，查询结果的最小索引号
   * @param {Number} [options.toIndex] default -1，查询结果的最大索引号
   * @param {String} [options.attributeFilter] 属性过滤条件 例：'网点名称 like '%营业厅%''
   * @param {String} [options.name] 查询数据集名称或者图层名称 例：'LOG@data'
   * @param {Array.<SuperMap.JoinItem>} [options.joinItems] 与外部表的连接信息 SuperMap.JoinItem 数组
   * @param {Array.<SuperMap.LinkItem>} [options.linkItems] 与外部表的关联信息 SuperMap.LinkItem 数组
   * @param {Array.<string>} [options.ids] 查询 id 数组，即属性表中的 SmID 值
   * @param {String} [options.orderBy] 查询排序的字段，orderBy 的字段须为数值型的
   * @param {String} [options.groupBy] 查询分组条件的字段
   * @param {Function} fnc 回调函数，geoJson格式数据
   * @return {Void} 无返回值
   * @example
   * acolSearch.getSPFeaturesBySQL({
   * 	dataUrl: 'http://10.10.10.39:8090/iserver/services/data-TLYZT/rest/data',
   * 	datasetNames: ['fpfa:FPFA_2011_PROPS'],
   *	fields: ['认定编号', '认定名称'],
   * 	attributeFilter: '认定编号 = 'TL-10-001'',
   * },function(e){
   * 	......
   * });
   */
  getSPFeaturesBySQL(
    { dataUrl, datasetNames, fields = null, fromIndex = 0, toIndex = -1, attributeFilter = null, name = null, joinItems = null, linkItems = null, ids = null, orderBy = null, groupBy = null },
    fnc,
  ) {
    // toIndex为0时，返回空要素GeoJson格式数据
    if (toIndex === 0) {
      fnc(turf.featureCollection([]));
      return;
    }
    // 查询参数设置
    let sqlParam = new SuperMap.GetFeaturesBySQLParameters({
      queryParameter: {
        attributeFilter: attributeFilter,
        name: name,
        joinItems: joinItems,
        linkItems: linkItems,
        ids: ids,
        orderBy: orderBy,
        groupBy: groupBy,
        fields: fields,
      },
      fromIndex: fromIndex,
      toIndex: toIndex == -1 ? -1 : toIndex - 1 < 0 ? -1 : toIndex - 1 + '',
      datasetNames: datasetNames,
    });
    // sql服务查询
    new ol.supermap.FeatureService(dataUrl).getFeaturesBySQL(sqlParam, function (e) {
      //回调函数
      fnc(e.result.features);
    });
  }
  /**
   * @function
   * @description	根据几何图形，从超图数据服务中获取feature要素
   * @param {Object} options 参数
   * @param {Object} options.geometry 用于查询的几何对象
   * @param {String} options.gdataUrl 超图数据服务地址 例：'http://10.10.11.96:8090/iserver/services/data-CeShi/rest/data'
   * @param {Array.<String>} options.gdatasetNames 数据集集合中的数据集名称列表 例：['data:LOG']
   * @param {Array.<String>} [options.gfields] 查询字段数组 例：['序号','网点名称']
   * @param {Number} [options.gfromIndex] default 0，查询结果的最小索引号
   * @param {Number} [options.gtoIndex] default -1，查询结果的最大索引号
   * @param {String} [options.gattributeFilter] 属性过滤条件 例：'网点名称 like '%营业厅%''
   * @param {String} [options.gspatialQueryMode] 空间查询模式常量，例：CONTAIN：包含关系，INTERSECT：相交关系，WITHIN：被包含关系
   * @param {Function} fnc 回调函数，geoJson格式数据
   * @return {Void} 无返回值
   * @example
   * acolSearch.getSPFeaturesByGeometry({
   * 	geometry: new ol.geom.Point([119.5729,29.841]),
   * 	dataUrl: 'http://10.10.10.39:8090/iserver/services/data-TLYZT/rest/data',
   * 	datasetNames: ['fpfa:FPFA_2010'],
   * 	spatialQueryMode: 'INTERSECT',
   * 	fields: ['认定编号', '认定名称'],
   * },function(e){
   * 	......
   * });
   */
  getSPFeaturesByGeometry({ geometry, dataUrl, datasetNames, fields = null, fromIndex = 0, toIndex = -1, attributeFilter = null, spatialQueryMode = 'INTERSECT' }, fnc) {
    // toIndex为0时，返回空要素GeoJson格式数据
    if (toIndex === 0) {
      fnc(turf.featureCollection([]));
      return;
    }
    // 几何查询参数设置
    let geometryParam = new SuperMap.GetFeaturesByGeometryParameters({
      geometry: geometry,
      datasetNames: datasetNames,
      attributeFilter: attributeFilter,
      fields: fields,
      spatialQueryMode: spatialQueryMode,
      fromIndex: fromIndex,
      toIndex: toIndex == -1 ? -1 : toIndex - 1 < 0 ? -1 : toIndex - 1 + '',
    });
    // 几何服务查询
    new ol.supermap.FeatureService(dataUrl).getFeaturesByGeometry(geometryParam, function (e) {
      //回调函数
      fnc(e.result.features);
    });
  }
  /**
   * @function
   * @description	根据经纬度数组，从超图数据服务中获取feature要素
   * @param {Object} options 参数
   * @param {Array.<Number>} options.lonLat 经纬度数组 例：[119.37734709301657, 29.894118795823193]
   * @param {String} options.dataUrl 超图数据服务地址 例：'http://10.10.11.96:8090/iserver/services/data-CeShi/rest/data'
   * @param {Array.<String>} options.datasetNames 数据集集合中的数据集名称列表 例：['data:LOG']
   * @param {Array.<String>} [options.fields] 查询字段数组 例：['序号','网点名称']
   * @param {Number} [options.fromIndex] default 0，查询结果的最小索引号
   * @param {Number} [options.toIndex] default -1，查询结果的最大索引号
   * @param {String} [options.attributeFilter] 属性过滤条件 例：'网点名称 like '%营业厅%''
   * @param {String} [options.spatialQueryMode] 空间查询模式常量，例：CONTAIN：包含关系，INTERSECT：相交关系，WITHIN：被包含关系
   * @param {Function} fnc 回调函数，geoJson格式数据
   * @return {Void} 无返回值
   * @example
   * acolSearch.getSPFeaturesByLonlat({
   * 	lonLat: [119.5729,29.841],
   * 	dataUrl: 'http://10.10.10.39:8090/iserver/services/data-TLYZT/rest/data',
   * 	datasetNames: ['fpfa:FPFA_2010'],
   * 	fields: ['认定编号', '认定名称'],
   * },function(e){
   * 	......
   * });
   */
  getSPFeaturesByLonlat({ lonLat, dataUrl, datasetNames, fields = null, fromIndex = 0, toIndex = -1, attributeFilter = null, spatialQueryMode = 'INTERSECT' }, fnc) {
    // 几何点转换
    let pt = new ol.geom.Point(lonLat);
    this.getSPFeaturesByGeometry(
      { geometry: pt, dataUrl: dataUrl, datasetNames: datasetNames, attributeFilter: attributeFilter, fields: fields, spatialQueryMode: spatialQueryMode, fromIndex: fromIndex, toIndex: toIndex },
      fnc,
    );
  }
}
/**
 * @desc 工具方法类
 * @author LZZ
 * @version 1.1.0
 * @example
 * let acolUtil = new acol_util();
 */
class acol_util {
  constructor() {}
  /**
   * @function
   * @description	根据图片Url获取size
   * @param {String} imgUrl url地址
   * @param {Function} fnc 回调函数
   * @return {Void} 无返回值
   * @example
   * acolUtil.getImgSizeByUrl('./data/image/ICON.png', function({ width, height }){
   *  .....
   * });
   */
  getImgSizeByUrl(imgUrl, fnc) {
    let start_time = new Date().getTime(); // 记录当前时间戳
    let img = new Image();
    img.src = imgUrl + '?' + start_time;
    // 定时执行获取宽高
    let checkImg = function () {
      // 只要任何一方大于0
      // 表示已经服务器已经返回宽高
      if (img.width > 0 || img.height > 0) {
        clearInterval(setTime);
        // 回调
        fnc({ width: img.width, height: img.height });
      }
    };
    let setTime = setInterval(checkImg, 20);
  }
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
   * @description	对象key值转小写格式
   * @param {Object} obj 传入对象
   * @return {Object} 结果对象
   * @example
   * acolUtil.objKeysToLowerCase(obj);
   */
  objKeysToLowerCase(obj) {
    for (let key in obj) {
      let newKey = key.toLowerCase();
      // 删除超图默认字段
      if (newKey.slice(0, 2) === 'sm') {
        delete obj[key];
        continue;
      } else if (newKey != key) {
        obj[newKey] = obj[key];
        delete obj[key];
      }
    }
    return obj;
  }
  /**
   * @function
   * @description	对象key值转大写格式
   * @param {Object} obj 传入对象
   * @return {Object} 结果对象
   * @example
   * acolUtil.objKeysToUpperCase(obj);
   */
  objKeysToUpperCase(obj) {
    for (let key in obj) {
      let newKey = key.toUpperCase();
      // 删除超图默认字段
      if (newKey.slice(0, 2) === 'SM') {
        delete obj[key];
        continue;
      } else if (newKey != key) {
        obj[newKey] = obj[key];
        delete obj[key];
      }
    }
    return obj;
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
   * @description	geoJson数据克隆
   * @param {Object} data geoJson格式数据（需严格遵守geoJson数据格式）
   * @return {Object} 返回geoJson结果对象
   * @example
   * acolUtil.geoJsonClone(data);
   */
  geoJsonClone(data) {
    return turf.clone(data);
  }
  /**
   * @private
   * @function
   * @description	geoJson数据偏移
   * @param {Object} options 参数
   * @param {Object} options.data geoJson格式数据
   * @param {Array.<Number>} options.offset 偏移数组，默认[0,0]，单位度°(左负右正，下负上正)
   * @return {Object} 返回geoJson结果对象
   * @example
   * acolUtil.geoJsonOffset({ data: geoJson, offset: [0, -0.001] });
   */
  geoJsonOffset({ data, offset = [0, 0] }) {
    let geoJsonData = this.objDeepCopy(data);
    // 加偏移，临时写法，具体实现方式待定
    for (let j = 0; j < geoJsonData.features.length; ++j) {
      let tempFeature = geoJsonData.features[j];
      let tempCoordinates = tempFeature.geometry.coordinates;
      for (let k = 0; k < tempCoordinates.length; ++k) {
        for (let m = 0; m < tempCoordinates[k].length; ++m) {
          tempCoordinates[k][m][0] += offset[0];
          tempCoordinates[k][m][1] += offset[1];
        }
      }
    }
    return geoJsonData;
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
    let G1JsonCollect = turf.flatten(G1);
    let G2JsonCollect = turf.flatten(G2);
    // 临时结果要素集合
    let tempFeatures = [];
    // 相交分析
    G1JsonCollect.features.forEach(function (layer1) {
      G2JsonCollect.features.forEach(function (layer2) {
        let difference = null;
        try {
          difference = turf.difference(layer1, layer2);
        } catch (e) {
          console.log('--- difference catch ---');
        }
        if (difference != null) {
          // 结果赋值
          difference.properties['TURF'] = 'difference';
          tempFeatures.push(difference);
        }
      });
    });
    // 合并 -> geoJson
    let tempFeaturesCollect = turf.featureCollection(tempFeatures);
    return tempFeaturesCollect;
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
          console.log('--- intersect catch ---');
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
   * acolUtil.geoJsonBboxByTurf(data);
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
   * acolUtil.geoJsonEnvelopeByTurf(data);
   */
  geoJsonEnvelopeByTurf(data) {
    return turf.envelope(data);
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
   *  data: geoJson,
   *  distance: 1,
   *  direction: 180
   * });
   */
  geoJsonTransformTranslate({ data, distance = 0, direction = 0, options = null }) {
    return turf.transformTranslate(data, distance, direction, options);
  }
  /**
   * @private
   * @function
   * @description	extent数据缩放
   * @param {Object} options 参数
   * @param {Array.<Number>} options.extent [minX, minY, maxX, maxY]
   * @param {Number}  options.zoomNum 放大(正)、缩小(负)参数，单位度°
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
   * acolUtil.downLoadGeoJsonData(data);
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
}
