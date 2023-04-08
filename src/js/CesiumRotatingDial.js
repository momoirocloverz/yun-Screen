export default class {
    constructor(viewer, position, radius, height) {
        this.viewer = viewer;
        this.position = position;
        this.radius = radius;
        this.height = height;
        this.entities = [];
        this.addEntities();
    }

    addEntities() {
        let t = 0;

        let n = 4;
        let i = [{
                range: this.radius,
                url: "static/images/kedu/dimian.png",
                color: new Cesium.Color(0.4, 0.4, 0.4, 1)
            }
            // {
            //     range: this.radius,
            //     url: "static/images/kedu/kedu.png",
            //     color: new Cesium.Color(0.4, 0.4, 0.4, 0.4)
            // },
            // {
            //     range: this.radius * 0.92,
            //     url: "static/images/kedu/fangxiang.png",
            //     st: -0.05,
            //     color: new Cesium.Color(0.4, 0.4, 0.4, 0.8)
            // },
            // {
            //     range: this.radius * 0.85,
            //     url: "static/images/kedu/keduzhi.png",
            //     color: new Cesium.Color(1, 1, 1, 0.2)
            // },
            // {
            //     range: this.radius,
            //     url: "static/images/kedu/faguang.png",
            //     color: new Cesium.Color(1, 1, 1, 0.5)
            // }
        ];
        let e;
        // i.forEach(t => {
        //     let r = 0;
        //     e = this.viewer.entities.add({
        //         position: this.position,
        //         show: false,
        //         ellipse: {
        //             height: this.height,
        //             semiMajorAxis: t.range,
        //             semiMinorAxis: t.range,
        //             // semiMajorAxis: new Cesium.CallbackProperty(function() {
        //             //     // console.log("res", r);
        //             //     if (r >= t.range) {
        //             //         return t.range;
        //             //     } else {
        //             //         return (r += 50);
        //             //     }
        //             // }, false),
        //             // semiMinorAxis: new Cesium.CallbackProperty(function() {
        //             //     // console.log("res", r);
        //             //     if (r >= t.range) {
        //             //         return t.range;
        //             //     } else {
        //             //         return (r += 50);
        //             //     }
        //             // }, false),

        //             material: new Cesium.ImageMaterialProperty({
        //                 image: t.url,
        //                 transparent: !0,
        //                 color: t.color ? t.color : new Cesium.Color(1, 1, 1, 0.7)
        //             }),
        //             stRotation: t.st ? t.st : 0
        //         }
        //     });
        //     this.entities.push(e);
        // });

        e = this.viewer.entities.add({
            id: "rotatingDial",
            position: this.position,
            show: false,
            ellipse: {
                height: this.height,
                semiMajorAxis: this.radius * 0.9,
                semiMinorAxis: this.radius * 0.9,
                // material: new Cesium.ImageMaterialProperty({
                //     image: "static/images/kedu/banyuan.png",
                //     transparent: !0,
                //     color: new Cesium.Color(0.4, 0.4, 0.4, 0.4)
                // }),
                material: new Cesium.ImageMaterialProperty({
                    image: "static/images/kedu/dimian.png",
                    transparent: !0
                        // color: new Cesium.Color(255, 255, 255, 1)
                }),
                stRotation: new Cesium.CallbackProperty(function() {
                    return (t += 0.005);
                }, !1)
            }
        });
        this.entities.push(e);

        setTimeout(() => {
            this.show();
        }, 5000);
    }

    remove() {
        this.entities.forEach(item => {
            this.viewer.entities.remove(item);
        });

        this.entities = undefined;
    }

    hidden() {
        this.entities.forEach(item => {
            item.show = false;
        });
    }
    show() {
        this.entities.forEach(item => {
            item.show = true;
        });
    }
}