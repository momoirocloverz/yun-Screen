export const mapBoxStyle3 = {
    version: 8,
    name: "Blank",
    metadata: {
        "mapbox:autocomposite": true,
        "mapbox:type": "template",
        "mapbox:sdk-support": {
            android: "10.0.0",
            ios: "10.0.0",
            js: "2.6.0"
        },
        "mapbox:groups": {},
        "mapbox:uiParadigm": "layers"
    },
    center: [0, 2.842170943040401e-14],
    zoom: 0.805743851693628,
    bearing: 0,
    pitch: 0,
    sources: {
        "mapbox://mapbox.satellite": {
            url: "mapbox://mapbox.satellite",
            type: "raster",
            tileSize: 256
        },
        "mapbox://coding-cheng.82jwnjpv": {
            url: "mapbox://coding-cheng.82jwnjpv",
            type: "raster",
            tileSize: 256
        }
    },
    sprite: "http://127.0.0.1:8088/static/mapBoxData/sprite/sprite",
    glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
    layers: [{
            id: "background",
            type: "background",
            paint: { "background-color": "hsl(232, 81%, 18%)" }
        },
        {
            id: "mapbox-satellite",
            type: "raster",
            source: "mapbox://mapbox.satellite",
            layout: {},
            paint: {}
        },
        {
            id: "coding-cheng.82jwnjpv",
            type: "raster",
            source: "mapbox://coding-cheng.82jwnjpv",
            layout: {},
            paint: {
                "raster-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    0,
                    1,
                    13,
                    1,
                    14,
                    0
                ]
            }
        }
    ],
    created: "2022-06-09T06:17:38.292Z",
    modified: "2022-06-09T06:22:16.021Z",
    id: "cl46mob83000c15pklead869l",
    owner: "coding-cheng",
    visibility: "private",
    protected: false,
    draft: false
};