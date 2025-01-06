(function () {
    'use strict';
    const files = [
        { path: './static/data/全球确诊人数.csv', name: '确诊人数', color: '#FF0000' },
        { path: './static/data/全球死亡人数.csv', name: '死亡人数', color: '#0000FF' },
        { path: './static/data/全球治愈人数.csv', name: '治愈人数', color: '#00FF00' }
    ];

    const loadData = (file) => {
        return new Promise((resolve, reject) => {
            Papa.parse(file.path, {
                download: true,
                header: true,
                complete: (results) => {
                    const xData = [];
                    const yData = [];
                    results.data.forEach(item => {
                        if(item.day && item.Num){
                            xData.push(item.day);
                            yData.push(parseInt(item.Num, 10));
                        }
                    });
                    resolve({ xData, yData, name: file.name, color: file.color });
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    };

    Promise.all(files.map(loadData))
        .then(datasets => {
            const myChart = echarts.init(document.getElementById('line'));
            const option = {
                grid: {
                    left: '10%',
                    top: '10%',
                    bottom: '13%',
                    right: '3%'
                },
                tooltip: { trigger: 'axis' },
                legend: {
                    data: datasets.map(d => d.name),
                    textStyle: { color: '#fff' }
                },
                xAxis: { type: 'category', data: datasets[0].xData },
                yAxis: { type: 'value' },
                series: datasets.map(d => ({
                    type: 'line',
                    name: d.name,
                    data: d.yData,
                    lineStyle: { color: d.color },
                    // 为“确诊人数”系列添加最高点标志
                    markPoint: d.name === '确诊人数' ? {
                        symbolSize: 24,
                        data: [
                            { type: 'max', name: '最高点' }
                        ],
                        label: {
                            formatter: '最高: {@[1]}',
                            position: 'left',
                        },
                        itemStyle: {
                            color: '#FF0000', // 标志颜色
                            // 标志大小
                        }
                    } : {}
                }))
            };
            myChart.setOption(option);
            window.addEventListener('resize', function() {
                myChart.resize();
            });
        })
})();