(function () {
    'use strict';
    var mapchart = echarts.init(document.getElementById('map'));

    Papa.parse("./static/data/新冠感染全球病例和死亡人数统计.csv", {
        download: true,
        header: true,
        complete: function(results) {
            let mapData = results.data.map(item => ({
                name: item.CountryOrRegion,  // 国家列
                value: parseInt(item.Cases), // Cases列
                deaths: item.Deaths, // 死亡数据列
                CaseFatality: item.CaseFatality // 每十万人病例
            }));

            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        if(params.data) {
                            return `国家：${params.name}<br/>
                                   确诊病例：${params.data.value}<br/>
                                   死亡人数：${params.data.deaths}<br/>
                                   病死率: ${params.data.CaseFatality}`;
                        }
                        return '暂无数据';
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: { show: true, title: 'Save' },
                        restore: { show: true, title: 'Restore' },
                        dataView: { show: true, title: 'Data View' }
                    }
                },
                visualMap: {
                    min: 0,
                    max: 1400000,
                    text: ['High', 'Low'],
                    textStyle: {
                        color: 'rgb(74,141,247)'
                    },
                    realtime: false,
                    calculable: true,
                    itemHeight: 100,
                    inRange: {
                        color: ['rgb(160, 251, 193)', 'rgb(12, 59, 213)']
                    }
                },
                series: [{
                    name: 'World Map',
                    type: 'map',
                    map: 'world',
                    roam: true,
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#111'
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    },
                    data: mapData
                }]
            };
            
            mapchart.setOption(option);
            window.addEventListener('resize',function(){
                mapchart.resize();
            })
        }
    });
})();