(function () {
    'use strict';
    var piechart = echarts.init(document.getElementById('left-mid-nong'));

    // 指定图表的配置项和数据
    var option = {
        tooltip: {},
        legend: [{
                // 设置布局方向
                orient: 'vertical',
                // 文字和图形对齐方式
                align: 'left',
                right: '5%',
                top: '15%',
                // 图形形状
                icon: 'circle',
                textStyle: {
                    color:'#fff'
                },
                type: 'scroll',
                height: '65%',
                data: ["China", 'India', "United States", "Indonesia", "Brazil", "Pakistan", "Bangladesh", "Japan", "Mexico", "Vietnam"]
            },
        ],
        series: [{
            name: '至少接种一剂疫苗人数',
            type: 'pie',
            radius: '50%',
            right: '25%',
            bottom:'10%',
            // 添加阴影
            itemStyle: {
                shadowBlur: 200,
                shadowColor: 'rgba(0, 131, 246, 0.59)'
            },
            //增加颜色
            color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
            data: [{
                    value: 1310292000,
                    name: 'China'
                },
                {
                    value: 1027379945,
                    name: 'India'
                },
                {
                    value: 269554116,
                    name: 'United States'
                },
                {
                    value: 203657535,
                    name: 'Indonesia'
                },
                {
                    value: 189395212,
                    name: 'Brazil'
                },
                {
                    value: 162219717,
                    name: 'Pakistan'
                },
                {
                    value: 151190373,
                    name: 'Bangladesh'
                },
                {
                    value: 104675948,
                    name: 'Japan'
                },
                {
                    value: 99071001,
                    name: 'Mexico'
                },
                {
                    value: 90466947,
                    name: 'Vietnam'
                }
            ]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    piechart.setOption(option);
    window.piechart = piechart;
    // 与bar.js的window.barchart = barchart进行联动
    echarts.connect([piechart, window.barchart]);
    
    window.addEventListener('resize',function(){
        piechart.resize();
    })

    
})()