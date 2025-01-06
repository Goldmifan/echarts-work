$(document).ready(function() {
    let recoveryData = [];

    // 读取 CSV 文件
    $.ajax({
        url: 'static/data/各国每天康复数据.csv',
        dataType: 'text',
    }).done(function(data) {
        // 解析 CSV 文件
        Papa.parse(data, {
            header: true,
            complete: function(results) {
                recoveryData = results.data;
                const countryList = results.data.map(row => row['Country/Region']);
                const datalist = $('#country-list');
                countryList.forEach(country => {
                    datalist.append(`<option value="${country}">`);
                });
            }
        });
    });

    $('#search-btn').click(function() {
        const countryName = $('#country-name').val();
        const date = $('#time').val();

        if (!countryName || !date) {
            alert('请输入国家和日期');
            return;
        }

        // 格式化日期为 YYYY/M/D
        const formattedDate = new Date(date);
        const formattedDateString = `${formattedDate.getFullYear()}/${formattedDate.getMonth() + 1}/${formattedDate.getDate()}`;

        // 查找对应的康复数
        const countryData = recoveryData.find(row => row['Country/Region'] === countryName);
        if (!countryData) {
            alert('未找到该国家的数据');
            return;
        }

        const recoveryCount = countryData[formattedDateString];
        if (recoveryCount === undefined) {
            alert('未找到该日期的数据');
            return;
        }

        // 更新查询结果显示区域
        $('#recovery-count').text(recoveryCount);
    });
});