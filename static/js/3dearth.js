(function () {
    'use strict';
    var earthchart = echarts.init(document.getElementById('earth'));

    Papa.parse("./static/data/新冠感染全球病例和死亡人数统计.csv", {
        download: true,
        header: true,
        complete: function(results) {
            let mapData = results.data.map(item => ({
                name: item.CountryOrRegion,  // 国家列
                case: parseInt(item.Cases), // Cases列
                deaths: item.Deaths, // 死亡数据列
                CaseFatality: item.CaseFatality // 每十万人病例
            }));

            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        if(params.data) {
                            return `国家：${params.name}<br/>
                                   经纬度：${params.data.value}<br/>
                                   病例：${params.data.case}<br/>
                                   死亡人数：${params.data.deaths}<br/>
                                   病死率: ${params.data.CaseFatality}`;
                        }
                        return '暂无数据';
                    }
                },
                globe: {
                    baseTexture: './static/images/world.topo.bathy.200401.jpg', // 地球纹理图
                    heightTexture: './static/images/bathymetry_bw_composite_4k.jpg', // 地球高度图
                    shading: 'lambert',
                    environment: './static/images/starfield.jpg', // 背景图
                    light: {
                        ambient: {
                            intensity: 0.4
                        },
                        main: {
                            intensity: 0.4
                        }
                    },
                    viewControl: {
                        autoRotate: true
                    }
                },
                series: [
                    {
                        type: 'scatter3D',
                        coordinateSystem: 'globe',
                        symbolSize: 12,
                        itemStyle: {
                            color: 'red'
                        },
                        data: [
                            {name:'某某国',value: [37, 95], case: 100, deaths: 10, CaseFatality: 0.1},
                            {name:'某某国',value: [-95., 37], case: 100, deaths: 10, CaseFatality: 0.1},
                            {name:'某某国',value: [55, -3], case: 200, deaths: 20, CaseFatality: 0.1},
                            {name:'某某国',value: [101, 3], case: 150, deaths: 15, CaseFatality: 0.1}
                        ],
                    },
                    {
                        type: 'lines3D',
                        coordinateSystem: 'globe',
                        effect: {
                            show: true,
                            trailWidth: 2,
                            trailLength: 0.2,
                            trailOpacity: 1,
                            trailColor: 'green'
                        },
                        lineStyle: {
                            width: 2,
                            color: '#23B1FF',
                            opacity: 0.6
                        },
                        data: [
                            {coords: [[-95, 37],[37, 95]]},
                            {coords: [[37, 95],[55, -3]]},
                            {coords: [[55, -3],[101, 3]]},
                            {coords: [[101, 3],[-95, 37]]}
                        ]
                    }
                ]
            };
            
            earthchart.setOption(option);
            window.addEventListener('resize', function() {
                earthchart.resize();
            });
        }
    });
})();