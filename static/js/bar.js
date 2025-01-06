(function () {
    'use strict';
    var barchart = echarts.init(document.getElementById('left-header-nong'));

    Papa.parse("./static/data/新冠感染全球病例和死亡人数统计.csv", {
        download: true,
        header: true,
        complete: function(results) {
            // 处理CSV数据
            let mapData = results.data.map(item => ({
                name: item.CountryOrRegion,
                cases: parseInt(item.Cases),
                deaths: parseInt(item.Deaths),
                recovered: parseInt(item.Recovered)
            }));

            // 数据排序处理
            const sortedByCases = [...mapData]
                .sort((a, b) => b.cases - a.cases)
                .slice(0, 10);
            
            const sortedByDeaths = [...mapData]
                .sort((a, b) => b.deaths - a.deaths)
                .slice(0, 10);

            const sortedByRecovered = [...mapData]
                .sort((a, b) => b.recovered - a.recovered)
                .slice(0, 10);

            // 基础配置
            const getOption = (type) => {
                let data;
                let titleText;
                let yAxisName;
                if (type === 'cases') {
                    data = sortedByCases;
                    titleText = '确诊病例排名Top10';
                    yAxisName = '确诊病例数';
                } else if (type === 'deaths') {
                    data = sortedByDeaths;
                    titleText = '死亡病例排名Top10';
                    yAxisName = '死亡病例';
                } else {
                    data = sortedByRecovered;
                    titleText = '康复病例排名Top10';
                    yAxisName = '康复病例';
                }
                return {
                    title: {
                        text: titleText,
                        left: 'center',
                        // 白色
                        textStyle: {
                            color: '#fff',
                            fontSize: 16
                        }
                    },
                    grid: {
                        left: '20%',
                        bottom: '32%'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: data.map(item => item.name),
                        axisLabel: {
                            rotate: 0,
                            fontSize: 10,
                        },
                    },
                    yAxis: {
                        type: 'value',
                        name: yAxisName
                    },
                    series: [{
                        data: data.map(item => ({
                            value: type === 'cases' ? item.cases : 
                                   type === 'deaths' ? item.deaths : 
                                   item.recovered,
                            name: item.name
                        })
                        ),
                        type: 'bar',
                        itemStyle: {
                            color: function(params) {
                                // 第一名使用特殊颜色
                                return params.dataIndex === 0 ? '#ffd700' : '#5470c6';
                            }
                        },
                        markPoint: {
                            data: [
                                {
                                    type: 'max',
                                    symbol: 'pin',
                                    symbolSize: 20,
                                }
                            ]
                        }
                    }]
                };
            };
            barchart.setOption(getOption('cases'));
            window.barchart = barchart;
            echarts.connect([barchart, window.piechart]);
            // 监听下拉框变化
            document.getElementById('barSwitch').addEventListener('change', function(e) {
                barchart.setOption(getOption(e.target.value));
            });

            // 响应式调整
            window.addEventListener('resize', function() {
                barchart.resize();
            });
        }
    });
})();

