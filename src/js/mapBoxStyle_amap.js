export const mapBoxStyle = {
    version: 8,
    name: "xsww",
    metadata: {
        "mapbox:type": "default",
        "mapbox:origin": "basic-v1",
        "mapbox:sdk-support": {
            android: "10.0.0",
            ios: "10.0.0",
            js: "2.3.0"
        },
        "mapbox:autocomposite": true,
        "mapbox:groups": {
            "Transit, transit-labels": {
                name: "Transit, transit-labels",
                collapsed: true
            },
            "Administrative boundaries, admin": {
                name: "Administrative boundaries, admin",
                collapsed: true
            },
            "Buildings, building-labels": {
                name: "Buildings, building-labels",
                collapsed: true
            },
            "Road network, bridges": {
                name: "Road network, bridges",
                collapsed: true
            },
            "Land, water, & sky, water": {
                name: "Land, water, & sky, water",
                collapsed: true
            },
            "Road network, tunnels": {
                name: "Road network, tunnels",
                collapsed: true
            },
            "Road network, road-labels": {
                name: "Road network, road-labels",
                collapsed: true
            },
            "Buildings, built": { name: "Buildings, built", collapsed: true },
            "Natural features, natural-labels": {
                name: "Natural features, natural-labels",
                collapsed: true
            },
            "Road network, surface": {
                name: "Road network, surface",
                collapsed: true
            },
            "Land, water, & sky, built": {
                name: "Land, water, & sky, built",
                collapsed: true
            },
            "Walking, cycling, etc., barriers-bridges": {
                name: "Walking, cycling, etc., barriers-bridges",
                collapsed: true
            },
            "Place labels, place-labels": {
                name: "Place labels, place-labels",
                collapsed: true
            },
            "Buildings, extruded": {
                name: "Buildings, extruded",
                collapsed: true
            },
            "Point of interest labels, poi-labels": {
                name: "Point of interest labels, poi-labels",
                collapsed: true
            },
            "Walking, cycling, etc., tunnels": {
                name: "Walking, cycling, etc., tunnels",
                collapsed: true
            },
            "Walking, cycling, etc., walking-cycling-labels": {
                name: "Walking, cycling, etc., walking-cycling-labels",
                collapsed: true
            },
            "Walking, cycling, etc., surface": {
                name: "Walking, cycling, etc., surface",
                collapsed: true
            },
            "Transit, built": { name: "Transit, built", collapsed: true },
            "Land, water, & sky, land": {
                name: "Land, water, & sky, land",
                collapsed: true
            },
            "Satellite imagery, land": {
                name: "Satellite imagery, land",
                collapsed: true
            }
        },
        "mapbox:uiParadigm": "layers",
        "mapbox:trackposition": true,
        "mapbox:decompiler": {
            id: "cl25fi5jq00hu15ozxvk9ui91",
            componentVersion: "11.1.1",
            strata: [{
                id: "basic-v1",
                order: [
                    ["land-and-water", "land"],
                    ["land-and-water", "water"],
                    ["land-and-water", "built"],
                    ["transit", "built"],
                    ["buildings", "built"],
                    ["satellite", "land"],
                    ["road-network", "tunnels-case"],
                    ["walking-cycling", "tunnels"],
                    ["road-network", "tunnels"],
                    ["transit", "ferries"],
                    ["walking-cycling", "surface"],
                    ["road-network", "surface"],
                    ["transit", "surface"],
                    ["road-network", "surface-icons"],
                    ["walking-cycling", "barriers-bridges"],
                    ["road-network", "bridges"],
                    ["transit", "bridges"],
                    ["road-network", "traffic-and-closures"],
                    ["buildings", "extruded"],
                    ["transit", "elevated"],
                    ["admin-boundaries", "admin"],
                    ["buildings", "building-labels"],
                    ["road-network", "road-labels"],
                    ["walking-cycling", "walking-cycling-labels"],
                    ["transit", "ferry-aerialway-labels"],
                    ["natural-features", "natural-labels"],
                    ["point-of-interest-labels", "poi-labels"],
                    ["transit", "transit-labels"],
                    ["place-labels", "place-labels"],
                    ["land-and-water", "sky"]
                ]
            }],
            overrides: {
                "land-and-water": {
                    land: {
                        paint: { "background-color": "hsl(219, 100%, 19%)" }
                    },
                    water: { paint: { "fill-color": "#09152b" } },
                    landuse: {
                        paint: {
                            "fill-color": [
                                "interpolate", ["linear"],
                                ["zoom"],
                                15, [
                                    "match", ["get", "class"],
                                    "park",
                                    "hsl(213, 88%, 31%)",
                                    "airport",
                                    "hsl(225, 89%, 94%)",
                                    "cemetery",
                                    "hsl(203, 84%, 44%)",
                                    "glacier",
                                    "hsl(205, 93%, 69%)",
                                    "hospital",
                                    "hsl(216, 33%, 48%)",
                                    "pitch",
                                    "hsl(226, 57%, 66%)",
                                    "sand",
                                    "hsl(219, 53%, 38%)",
                                    "school",
                                    "hsl(219, 63%, 36%)",
                                    "hsl(206, 59%, 43%)"
                                ],
                                16, [
                                    "match", ["get", "class"],
                                    "park",
                                    "hsl(78, 50%, 73%)",
                                    "airport",
                                    "hsl(225, 100%, 92%)",
                                    "cemetery",
                                    "hsl(60, 76%, 79%)",
                                    "glacier",
                                    "hsl(205, 56%, 88%)",
                                    "hospital",
                                    "hsl(3, 54%, 92%)",
                                    "pitch",
                                    "hsl(78, 51%, 68%)",
                                    "sand",
                                    "hsl(7, 59%, 91%)",
                                    "school",
                                    "hsl(40, 71%, 84%)",
                                    "hsl(0, 88%, 88%)"
                                ]
                            ]
                        }
                    },
                    "national-park": {
                        paint: { "fill-color": "hsl(206, 50%, 73%)" }
                    }
                },
                "place-labels": {
                    "settlement-major-label": {
                        layout: {
                            "text-field": [
                                "coalesce", ["get", "name_zh-Hans"],
                                ["get", "name"]
                            ],
                            "text-size": [
                                "interpolate", ["cubic-bezier", 0.2, 0, 0.9, 1],
                                ["zoom"],
                                3, ["step", ["get", "symbolrank"], 15, 6, 14],
                                6, ["step", ["get", "symbolrank"], 20, 6, 19, 7, 20],
                                8, ["step", ["get", "symbolrank"], 18, 9, 17, 10, 22],
                                11, [
                                    "interpolate", ["linear"],
                                    ["get", "symbolrank"],
                                    0,
                                    30,
                                    9,
                                    28,
                                    10,
                                    26,
                                    11,
                                    24,
                                    12,
                                    22,
                                    13,
                                    21,
                                    15,
                                    19
                                ],
                                15, [
                                    "step", ["get", "symbolrank"],
                                    23,
                                    9,
                                    22,
                                    10,
                                    20,
                                    11,
                                    18,
                                    12,
                                    16,
                                    13,
                                    15,
                                    15,
                                    13
                                ]
                            ]
                        },
                        paint: {
                            "text-color": "hsl(210, 100%, 86%)",
                            "text-halo-color": "hsla(0, 0%, 0%, 0)"
                        }
                    },
                    "settlement-minor-label": {
                        layout: {
                            "text-field": [
                                "coalesce", ["get", "name_zh-Hans"],
                                ["get", "name"]
                            ],
                            "text-size": [
                                "interpolate", ["cubic-bezier", 0.2, 0, 0.9, 1],
                                ["zoom"],
                                3, [
                                    "step", ["get", "symbolrank"],
                                    12,
                                    9,
                                    11,
                                    10,
                                    10.5,
                                    12,
                                    9.5,
                                    14,
                                    8.5,
                                    16,
                                    6.5,
                                    17,
                                    4
                                ],
                                13, [
                                    "step", ["get", "symbolrank"],
                                    25,
                                    9,
                                    23,
                                    10,
                                    21,
                                    11,
                                    19,
                                    12,
                                    18,
                                    13,
                                    17,
                                    15,
                                    15
                                ]
                            ]
                        },
                        paint: {
                            "text-color": "hsl(209, 98%, 80%)",
                            "text-halo-color": "hsla(0, 0%, 0%, 0)"
                        }
                    },
                    "state-label": {
                        layout: {
                            "text-field": [
                                "step", ["zoom"],
                                [
                                    "step", ["get", "symbolrank"],
                                    ["coalesce", ["get", "name_en"],
                                        ["get", "name"]
                                    ],
                                    5, [
                                        "coalesce", ["get", "abbr"],
                                        ["get", "name_en"],
                                        ["get", "name"]
                                    ]
                                ],
                                5, ["coalesce", ["get", "name_zh-Hans"],
                                    ["get", "name"]
                                ]
                            ]
                        }
                    }
                },
                "point-of-interest-labels": {
                    "poi-label": {
                        layout: {
                            "text-field": [
                                "coalesce", ["get", "name_zh-Hans"],
                                ["get", "name"]
                            ]
                        },
                        paint: {
                            "text-color": [
                                "step", ["zoom"],
                                [
                                    "step", ["get", "sizerank"],
                                    [
                                        "match", ["get", "class"],
                                        "food_and_drink",
                                        "hsl(213, 61%, 57%)",
                                        "park_like",
                                        "hsl(206, 63%, 52%)",
                                        "education",
                                        "hsl(206, 55%, 54%)",
                                        "medical",
                                        "hsl(203, 70%, 44%)",
                                        "hsl(203, 63%, 49%)"
                                    ],
                                    5, [
                                        "match", ["get", "class"],
                                        "food_and_drink",
                                        "#094986",
                                        "park_like",
                                        "#094986",
                                        "education",
                                        "#094986",
                                        "medical",
                                        "#094986",
                                        "#094986"
                                    ]
                                ],
                                17, [
                                    "step", ["get", "sizerank"],
                                    [
                                        "match", ["get", "class"],
                                        "food_and_drink",
                                        "hsl(20, 42%, 58%)",
                                        "park_like",
                                        "hsl(76, 51%, 26%)",
                                        "education",
                                        "hsl(40, 18%, 45%)",
                                        "medical",
                                        "hsl(3, 18%, 55%)",
                                        "hsl(26, 30%, 45%)"
                                    ],
                                    13, [
                                        "match", ["get", "class"],
                                        "food_and_drink",
                                        "hsl(20, 74%, 41%)",
                                        "park_like",
                                        "hsl(76, 50%, 15%)",
                                        "education",
                                        "hsl(40, 45%, 25%)",
                                        "medical",
                                        "hsl(3, 24%, 45%)",
                                        "hsl(26, 35%, 35%)"
                                    ]
                                ]
                            ]
                        }
                    }
                },
                "walking-cycling": {
                    "path-pedestrian-label": {
                        layout: {
                            "text-field": [
                                "coalesce", ["get", "name_zh-Hans"],
                                ["get", "name"]
                            ]
                        },
                        paint: { "text-color": "hsl(216, 86%, 44%)" }
                    }
                },
                "road-network": {
                    "road-label-simple": {
                        layout: {
                            "text-field": [
                                "coalesce", ["get", "name_zh-Hans"],
                                ["get", "name"]
                            ],
                            "text-size": [
                                "interpolate", ["linear"],
                                ["zoom"],
                                10, [
                                    "match", ["get", "class"],
                                    ["motorway", "trunk", "primary", "secondary", "tertiary"],
                                    14,
                                    13
                                ],
                                18, [
                                    "match", ["get", "class"],
                                    ["motorway", "trunk", "primary", "secondary", "tertiary"],
                                    20,
                                    18
                                ]
                            ]
                        },
                        paint: {
                            "text-color": "hsl(206, 90%, 43%)",
                            "text-opacity": [
                                "match", ["get", "class"],
                                ["primary", "motorway"],
                                1,
                                0
                            ],
                            "text-halo-color": "hsl(209, 0%, 94%)"
                        }
                    },
                    "road-simple": {
                        paint: {
                            "line-color": [
                                "match", ["get", "class"],
                                [
                                    "primary_link",
                                    "secondary_link",
                                    "tertiary_link",
                                    "street",
                                    "street_limited",
                                    "service",
                                    "track"
                                ],
                                "hsl(209, 79%, 54%)",
                                "hsl(206, 79%, 54%)"
                            ],
                            "line-opacity": ["interpolate", ["linear"],
                                ["zoom"], 9, 0, 15, 1
                            ]
                        }
                    },
                    "bridge-simple": {
                        paint: {
                            "line-color": [
                                "match", ["get", "class"],
                                [
                                    "primary_link",
                                    "secondary_link",
                                    "tertiary_link",
                                    "street",
                                    "street_limited",
                                    "service",
                                    "track"
                                ],
                                "hsl(213, 84%, 84%)",
                                "hsl(206, 94%, 39%)"
                            ]
                        }
                    },
                    "tunnel-simple": {
                        paint: { "line-color": "hsl(216, 82%, 65%)" }
                    },
                    "bridge-case-simple": {
                        paint: { "line-color": "hsl(193, 0%, 95%)" }
                    }
                },
                "natural-features": {
                    "waterway-label": {
                        layout: {
                            "text-field": [
                                "coalesce", ["get", "name_zh-Hans"],
                                ["get", "name"]
                            ],
                            "text-size": ["interpolate", ["linear"],
                                ["zoom"], 13, 20, 18, 24
                            ]
                        },
                        paint: { "text-color": "hsl(205, 15%, 19%)" }
                    },
                    "water-point-label": {
                        layout: {
                            "text-field": [
                                "coalesce", ["get", "name_zh-Hans"],
                                ["get", "name"]
                            ]
                        },
                        paint: {
                            "text-color": [
                                "match", ["get", "class"],
                                ["bay", "ocean", "sea"],
                                "hsl(205, 0%, 16%)",
                                "hsl(205, 0%, 13%)"
                            ]
                        }
                    }
                },
                transit: {
                    "airport-label": {
                        layout: {
                            "text-field": [
                                "step", ["get", "sizerank"],
                                ["coalesce", ["get", "name_zh-Hans"],
                                    ["get", "name"]
                                ],
                                15, ["get", "ref"]
                            ]
                        }
                    }
                }
            },
            components: {
                "road-network": "11.2.0",
                "natural-features": "11.1.1",
                "place-labels": "11.1.1",
                "admin-boundaries": "11.1.1",
                "point-of-interest-labels": "11.1.1",
                "walking-cycling": "11.1.1",
                transit: "11.1.1",
                satellite: "11.1.1",
                "land-and-water": "11.2.0",
                buildings: "11.1.1"
            },
            propConfig: {
                "road-network": {
                    colorBase: "hsl(0, 88%, 96%)",
                    colorRoad: "hsl(38, 82%, 72%)",
                    roadNetwork: "Simple",
                    language: "Simplified Chinese",
                    fadeOutRoadsOnZoom: false
                },
                "natural-features": {
                    colorBase: "hsl(0, 88%, 96%)",
                    colorWater: "hsl(205, 76%, 70%)",
                    colorPoi: "hsl(26, 35%, 35%)",
                    density: 0
                },
                "place-labels": {
                    colorBase: "hsl(0, 88%, 96%)",
                    colorPlaceLabel: "hsl(0, 44%, 11%)",
                    settlementSubdivisionsDensity: 3,
                    settlementLabelStyle: "Text only",
                    countryLabelStyle: "Text only",
                    states: true
                },
                "admin-boundaries": {
                    admin0Disputed: false,
                    admin0: false,
                    admin1: false,
                    admin2: false,
                    admin0Width: 1,
                    colorPlaceLabel: "hsl(0, 44%, 11%)",
                    colorBase: "hsl(0, 88%, 96%)",
                    worldview: "CN",
                    admin2DashPattern: "Dot dash"
                },
                "point-of-interest-labels": {
                    colorBase: "hsl(0, 88%, 96%)",
                    colorGreenspace: "hsl(78, 50%, 73%)",
                    colorGreenspaceLabel: "hsl(76, 50%, 16%)",
                    colorHospital: "hsl(3, 45%, 55%)",
                    colorSchool: "hsl(40, 45%, 45%)",
                    colorPoi: "hsl(26, 35%, 35%)",
                    density: 2
                },
                "walking-cycling": {
                    colorBase: "hsl(0, 88%, 96%)",
                    colorRoad: "hsl(38, 82%, 72%)",
                    colorGreenspace: "hsl(78, 50%, 73%)",
                    colorGreenspaceLabel: "hsl(76, 50%, 16%)",
                    walkingCyclingPisteBackground: false,
                    golfHoleLabelLine: false,
                    pedestrianPolygonFeatures: false
                },
                transit: {
                    colorRoad: "hsl(38, 82%, 72%)",
                    colorAirport: "hsl(225, 87%, 24%)",
                    aerialways: false,
                    colorTransit: "hsl(345, 6%, 40%)",
                    transitLabels: false,
                    colorBase: "hsl(0, 88%, 96%)",
                    colorWater: "hsl(205, 76%, 70%)",
                    railways: false,
                    ferries: false
                },
                satellite: {
                    satelliteStyle: "Standard",
                    fadeInOnZoom: true
                },
                "land-and-water": {
                    landType: "Landuse only",
                    colorGreenspace: "hsl(78, 50%, 73%)",
                    colorAirport: "hsl(225, 87%, 24%)",
                    transitionLandOnZoom: false,
                    colorBase: "hsl(0, 88%, 96%)",
                    colorWater: "hsl(205, 76%, 70%)",
                    colorSchool: "hsl(40, 45%, 45%)",
                    waterStyle: "Simple",
                    colorHospital: "hsl(3, 45%, 55%)"
                },
                buildings: {
                    colorBase: "hsl(0, 88%, 96%)",
                    houseNumbers: true,
                    "3D": true,
                    underground: true
                }
            }
        }
    },
    center: [120.36393556352266, 30.169348778484704],
    zoom: 11.161505813183036,
    bearing: 0,
    pitch: 0,
    sources: {
        "raster-tiles": {
            type: "raster",
            tiles: [
                // wprd0{1-4}
                // scl=1&style=7 为矢量图（含路网和注记）
                // scl=2&style=7 为矢量图（含路网但不含注记）
                // scl=1&style=6 为影像底图（不含路网，不含注记）
                // scl=2&style=6 为影像底图（不含路网、不含注记）
                // scl=1&style=8 为影像路图（含路网，含注记）
                // scl=2&style=8 为影像路网（含路网，不含注记）
                "http://wprd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&style=6"
            ],
            tileSize: 256
        },
        composite: {
            url: "https://webapi.amap.com/v4/map/styles2?styleid=8ba311b2a4424d7a1db552bd2050e9c7&s=rsv3&key=75572ea9f3526eb7c09a21c4e8c05505&jscode=03b318ecbcb71b6db65db284ec251f1e&callback=jsonp_166347_1653617190930",
            type: "raster",
            tileSize: 256
        }
    },
    sprite: "http://127.0.0.1:8089/static/mapBoxData/sprite/sprite",
    glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
    layers: [{
            id: "simple-tiles",
            type: "raster",
            source: "raster-tiles",
            minzoom: 0
        }
        // {
        //     "id": "simple-tiles",
        //     "type": "raster",
        //     "source": "composite",
        //     "minzoom": 0,
        // }
    ],
    created: "2022-04-19T00:49:42.830Z",
    modified: "2022-04-19T03:05:01.200Z",
    id: "cl25fi5jq00hu15ozxvk9ui91",
    owner: "coding-cheng",
    visibility: "private",
    protected: false,
    draft: false
};