/**
 * Created by zonesion on 2017/5/12.
 */
//曲线图显示
function showChart(obj, ctype, unit, step, data) {
    obj.parents(".chart_").find(".chart_plot").highcharts({
        chart: {
            //renderTo: 'chart_1',
            type: ctype,
            animation: false,
            zoomType: 'x'
        },
        legend: {
            enabled: false
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: ''
            },

            minorGridLineWidth: 0,
            gridLineWidth: 1,
            alternateGridColor: null
        },
        tooltip: {
            formatter: function () {
                return '' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br><b>' + getValue(this.y) + unit + '</b>';
            }
        },
        plotOptions: {
            spline: {
                lineWidth: 2,
                states: {
                    hover: {
                        lineWidth: 3
                    }
                },
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            symbol: 'circle',
                            radius: 3,
                            lineWidth: 1
                        }
                    }
                }

            },
            line: {
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            symbol: 'circle',
                            radius: 3,
                            lineWidth: 1
                        }
                    }
                }

            }
        },
        series: [{

            data: data,
            //data: [[1385546455000,18.7],[1385546516000,18.6],[1385546577000,18.6],[1385546638000,18.7]],
            step: step

        }]
        ,
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }
    });
}

function getValue(y) {
    return y;
    if (y == 1)
        return "关闭";
    else
        return y;
}

//曲线图动态添加数据点
function addPlot(obj, yValue) {
    var state = obj.find(".chart_label").find('li').first().hasClass('c_current_li');
    if (state == true)//非‘实时’不更新曲线
    {
        var chart = obj.find(".chart_plot").highcharts();
        var series = chart.series[0];
        var point = {	//获取新的点，并返回给动态图表
            x: (new Date()).getTime() + 28800000,
            y: parseFloat(yValue)
        };
        series.addPoint([point.x, point.y], true, true);
    }
}


//曲线图绘制
function drawcurve(obj, linetype, dataunit, data) {
    var step = false;
    if (linetype == null || linetype == "smoothedLine")
        linetype = "spline";
    if (linetype == "step") {
        linetype = "", step = "left"
    };
    //数据为空
    if (data == "[]" || data == "" || data == undefined || data == null) {
        obj.parents(".chart_").find(".chart_plot").html('<div style="color:gray;padding-top:80px;">您查询的时间段没有数据</div>');
        return;
    }
    showChart(obj, linetype, dataunit, step, eval(data));
}

//数据分析，将JSON数据转换成二维数组字符串
function DataAnalysis(data) {
    var str = '';
    var len = data.datapoints.length;

    $.each(data.datapoints, function (i, ele) {
        if (ele.value.indexOf("http") != -1) {
            str = str + '[' + Date.parse(ele.at) + ',"' + ele.value + '"]';
        } else {
            str = str + '[' + Date.parse(ele.at) + ',' + ele.value + ']';
        }
        if (i != len - 1)
            str = str + ',';
    });
    return "["+str+"]";
}
//第n个指定字符的位置
function placeOfChar(str, n, char) {
    var index = str.indexOf(char);
    var i = 0;
    while (index != -1) {
        i++;
        if (i == n)
            break;
        index = str.indexOf(char, index + 1);
    }
    return index;
}
//获取系统当前时间
function getTheDate() {
    var myDate = new Date();
    var year = (myDate.getFullYear());
    var month = (myDate.getMonth() + 1);
    var date = (myDate.getDate());
    var hours = (myDate.getHours());
    var minutes = (myDate.getMinutes());
    var seconds = (myDate.getSeconds());
    return (year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds);
}

