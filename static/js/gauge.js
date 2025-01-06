(function () {
    'use strict';
    var myChart = echarts.init(document.getElementById('left-bottom-nong'));
    // 指定图表的配置项和数据
    // 全球疫苗接种率71.92% 确诊人数 4630386
    var option = {
        tooltip: {},
        series: [
            {
                name: '全球疫苗接种率',
                type: 'gauge',
                center: ['70%', '59%'],
                startAngle: 180,
                endAngle: 0,
                radius: '80%',
                splitNumber: 5,
                axisLine: {
                    lineStyle: {
                        color: [
                            [0.2, '#ff0000'],
                            [0.3, '#ff3300'], 
                            [0.4, '#ff6600'],
                            [0.5, '#ff9900'],        
                            [0.6, '#ffcc00'],      
                            [0.7, '#ffff00'],       
                            [0.8, '#99ff00'],      
                            [0.9, '#66ff00'],      
                            [1, '#00ff00']     
                        ],
                        width: 10
                    }
                },
                axisLabel: {
                    distance: 15,  // 标签与刻度线距离
                    color: '#fff',  // 标签文字颜色
                    fontSize: 10,   // 标签文字大小
                    formatter: function(value) {  // 自定义标签显示内容
                        return value + '%';
                    }
                },
                splitLine: {
                    length: 4,    // 分隔线长度
                    lineStyle: {
                        width: 1,  // 分隔线宽度
                        color: '#fff'  // 分隔线颜色
                    }
                },
                detail: {
                    formatter: '{value}%',
                    fontSize: 15,
                    color: '#99ff00'
                },
                axisTick: {
                    distance: 5, 
                },
                data: [{ value: 71.92, name: '疫苗接种率', title: {color: '#F7F7B9'}}],
                pointer: {
                    length: '50%',
                    width: 5,
                },
                anchor: {
                    show: true,
                    showAbove: true,
                    size: 10,
                    itemStyle: {
                    borderWidth: 5,
                    
                    },
                },
            },
            {
                name: '确诊人数',
                type: 'gauge',
                center: ['37%', '43%'],
                startAngle: 225,
                endAngle: 30,
                splitNumber: 5,
                min: 0,
                max: 1000,
                axisTick: {
                    distance: 5, 
                },
                detail: { formatter: '{value}w', fontSize: 15,color: '#F76D37' },
                data: [{ value: 463, name: '确诊人数', title: {color: '#F7F7B9'}}],
                pointer: {
                    length: '50%',
                    width: 3,
                    color: '#0000FF'
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener('resize',function(){
        myChart.resize();
    })
})()