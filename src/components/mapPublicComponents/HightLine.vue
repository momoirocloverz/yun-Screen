<template>
  <div id="canvas" class="canvas" />
</template>
<script>
import BpmnModeler from 'bpmn-js/lib/Modeler';

import { get, gethighLine, getDefinitions } from '../../api/activiti';

export default {
  props: {
    value: {
      type: Object,
      default: () => Object.create({}),
    },
  },
  data() {
    return {
      bpmnModeler: null,
      fileList: [],
    };
  },
  mounted() {
    this.containerEl = document.getElementById('container');
    this.bpmnModeler = new BpmnModeler({
      container: '#canvas',
      keyboard: { bindTo: document },
      additionalModules: [
        {
          zoomScroll: ['value', ''], // 禁用滚轮滚动
          bendpoints: ['value', ''], // 禁止拖动线
          paletteProvider: ['value', ''], // 禁用左侧面板
          contextPadProvider: ['value', ''], // 禁止点击节点出现contextPad
          labelEditingProvider: ['value', ''], // 禁止双击节点出现label编辑框
        },
      ],
    });
    // this.create()
  },
  created() {
    let instanceId = 'd489f0f9-dc10-11ec-800b-989096aec582';
    // instanceId = this.value.instanceId
    this.get(instanceId);
  },
  methods: {
    create() {
      this.bpmnModeler.createDiagram(() => {
        this.bpmnModeler.get('canvas').zoom('fit-viewport');
      });
    },
    handleRemove(file) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (file.name === this.fileList[i].name) {
          this.fileList.splice(i, 1);
        }
      }
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleOnchangeFile(file) {
      const reader = new FileReader();
      let data = '';
      reader.readAsText(file.raw);
      reader.onload = event => {
        data = event.target.result;
        this.bpmnModeler.importXML(data, err => {
          if (err) {
            this.$message.info('导入失败');
          } else {
            this.$message.success('导入成功');
          }
        });
      };
    },
    setColor(json, bpmnModeler) {
      //   console.log('jdon12313220', json)
      var modeling = bpmnModeler.get('modeling');
      var elementRegistry = bpmnModeler.get('elementRegistry');

      var elementToColor = elementRegistry.get(json.name);
      if (elementToColor) {
        // console.log('555666666999', elementToColor)
        modeling.setColor([elementToColor], {
          stroke: json.stroke,
          fill: json.fill,
        });
      }
    },
    getByColor(data) {
      var ColorJson = [];
      for (var k in data['highLine']) {
        // if (!data["highLine"][k] instanceof String) return;
        var par = {
          name: data['highLine'][k],
          stroke: 'green',
          fill: 'green',
        };
        ColorJson.push(par);
      }
      for (const k in data['highPoint']) {
        // if (!data["highPoint"][k] instanceof String) return;
        const par = {
          name: data['highPoint'][k],
          stroke: 'gray',
          fill: '#eae9e9',
          // fill: "#a3d68e"
        };
        ColorJson.push(par);
      }
      for (const k in data['iDo']) {
        // if (!data["iDo"][k] instanceof String) return;
        const par = {
          name: data['iDo'][k],
          stroke: 'green',
          fill: '#a3d68e',
        };
        ColorJson.push(par);
      }
      for (const k in data['waitingToDo']) {
        // if (!data["waitingToDo"][k] instanceof String) return;
        const par = {
          name: data['waitingToDo'][k],
          stroke: 'green',
          fill: 'yellow',
        };
        ColorJson.push(par);
      }
      return ColorJson;
    },
    // 07a9a156-c1ed-11ec-95dc-84ef187d0d9c 流程资源id
    // 1c480bec-dca9-11ec-9ada-989096aec582 流程实例id
    async get(instanceId) {
      const definition = await getDefinitions(instanceId);
      const resu = await get(definition.deploymentId);
      let xml = resu.data.data.stringBPMN;
      this.bpmnModeler.importXML(xml);
      const res = await gethighLine(instanceId);
      //   console.log('00000', JSON.stringify(res))
      var ColorJson = this.getByColor(res.data.data);

      let arr = [];
      ColorJson.map(item => {
        // console.log('8898550', item.name == 'null')
        if (item.name != null) {
          if (typeof item.name != 'function') {
            arr.push(item);
          }
        }
      });
      arr.map(item => {
        this.setColor(item, this.bpmnModeler);
      });
    },
  },
};
</script>
<style lang="less" scoped>
/*左边工具栏以及编辑节点的样式*/
@import 'bpmn-js/dist/assets/diagram-js.css';

.canvas {
  position: absolute;
  right: 10px;
  top: 80px;
  width: 990px;
  height: 610px;
  background: #fff;
}
</style>
