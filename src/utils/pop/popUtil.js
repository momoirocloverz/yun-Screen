import Vue from "vue";

// 萧山文物
import CultureWaring_Pop from "./components/pop-CultureWaring.vue";
import CultureWaringJSC_Pop from "./components/pop-CultureWaringJSC.vue";

import CulturalPoiTip_Pop from "./components/poiTip.vue";
import WarningBox_Pop from "./components/warningBox.vue";
import WarningMarker_Pop from "./components/warningMarker.vue";
import ClusterBox_Pop from "./components/clusterBox.vue";
import PeopleBox_Pop from "./components/peopleBox.vue";

export default {
    installMapPop() {
        return {
            // 萧山文物
            cultureWaring_Pop: this.init_CultureWaring_Pop.bind(this),
            cultureWaringJSC_Pop: this.init_CultureWaringJSC_Pop.bind(this),
            CulturalPoiTip_Pop: this.init_CulturalPoiTip_Pop.bind(this),
            WarningBox_Pop: this.init_WarningBox_Pop.bind(this),
            WarningMarker_Pop: this.init_WarningMarker_Pop.bind(this),
            ClusterBox_Pop: this.init_ClusterBox_Pop.bind(this),
            PeopleBox_Pop: this.init_PeopleBox_Pop.bind(this)
        };
    },

    // 文物点位tip
    init_CulturalPoiTip_Pop(options) {
        // console.log(options);
        options.levelNum = 1;
        let Pop = Vue.extend(CulturalPoiTip_Pop);
        let component = new Pop({
            data: options
        }).$mount();
        document.querySelector("body").appendChild(component.$el);
    },
    // 文物预警弹框
    init_WarningBox_Pop(options) {
        // console.log(options);
        options.levelNum = 2;
        let Pop = Vue.extend(WarningBox_Pop);
        let component = new Pop({
            data: options
        }).$mount();
        document.querySelector("body").appendChild(component.$el);
    },
    // 文物预警标签
    init_WarningMarker_Pop(options) {
        // console.log(options);
        options.levelNum = 3;
        let Pop = Vue.extend(WarningMarker_Pop);
        let component = new Pop({
            data: options
        }).$mount();
        document.querySelector("body").appendChild(component.$el);
    },
    // 文物点聚合box
    init_ClusterBox_Pop(options) {
        // console.log(options);
        options.levelNum = 4;
        let Pop = Vue.extend(ClusterBox_Pop);
        let component = new Pop({
            data: options
        }).$mount();
        document.querySelector("body").appendChild(component.$el);
    },
    // 巡查员box
    init_PeopleBox_Pop(options) {
        // console.log(options);
        options.levelNum = 5;
        let Pop = Vue.extend(PeopleBox_Pop);
        let component = new Pop({
            data: options
        }).$mount();
        document.querySelector("body").appendChild(component.$el);
    },

    // 文物预警
    init_CultureWaring_Pop(options) {
        // console.log(options);
        options.levelNum = 43;
        let Pop = Vue.extend(CultureWaring_Pop);
        let component = new Pop({
            data: options
        }).$mount();
        document.querySelector("body").appendChild(component.$el);
    },
    // 驾驶舱限时整改
    init_CultureWaringJSC_Pop(options) {
        // console.log(options);
        options.levelNum = 44;
        let Pop = Vue.extend(CultureWaringJSC_Pop);
        let component = new Pop({
            data: options
        }).$mount();
        document.querySelector("body").appendChild(component.$el);
    }
};