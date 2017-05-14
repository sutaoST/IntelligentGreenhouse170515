/**
 * Created by zonesion on 2017/5/12.
 */
///////////////////////////////传感器js
serviceConStatus = 0; //初始化服务连接状态为0
//时间间隔处理
function getIntervalValue(querytime) {
    var interval = 0;
    switch (querytime) {
        case "1hour":
            interval = 120; return interval;//间隔2分钟
        case "1day":
            interval = 1800; return interval;//间隔30分钟
        case "5days":
            interval = 10800; return interval;//间隔3小时
        case "14days":
            interval = 21600; return interval;//间隔6小时
        case "1month":
            interval = 43200; return interval;//间隔12小时
        case "3months":
            interval = 86400; return interval;//间隔1天
        default: return interval;
    }
}
//根据查询时间获取图片曲线库的时间单位
function getPhotoDataTimeUnit(querytime) {
    switch (querytime) {
        case "1hour":
            return "1H";
        case "1day":
            return "1D";
        case "5days":
            return "5D";//间隔3小时
        case "14days":
            return "14D";//间隔6小时
        case "1month":
            return "1M";//间隔12小时
        case "3months":
            return "3M";//间隔1天
        default: return;
    }
}
//时间检测，在小于10时，前面+“0”
function checkTime(i) {
    if (i < 10)
    { i = "0" + i }
    return i
}
// UTF8字符集实际长度计算
function getStrLeng(str) {
    var realLength = 0;
    var len = str.length;
    var charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode > 32) {
            realLength += 1;
        }
    }
    return realLength;
}

//入口函数
$(function () {
    $("#data_mode").click(function () {
        $("#data_layer").show();
        $("#video_layer").hide();
        $("#photoData_layer").hide();
        $("#actuator_layer").hide();
        $(this).attr("disabled", "disabled");
        $("#video_mode").removeAttr("disabled");
        $("#actuator_mode").removeAttr("disabled");
        $("#photoData_mode").removeAttr("disabled");
    });
    $("#video_mode").click(function () {
        $("#data_layer").hide();
        $("#actuator_layer").hide();
        $("#photoData_layer").hide();
        $("#video_layer").show();
        $(this).attr("disabled", "disabled");
        $("#data_mode").removeAttr("disabled");
        $("#actuator_mode").removeAttr("disabled");
        $("#photoData_mode").removeAttr("disabled");
    });
    $("#actuator_mode").click(function () {
        $("#data_layer").hide();
        $("#video_layer").hide();
        $("#photoData_layer").hide();
        $("#actuator_layer").show();
        $(this).attr("disabled", "disabled");
        $("#data_mode").removeAttr("disabled");
        $("#video_mode").removeAttr("disabled");
        $("#photoData_mode").removeAttr("disabled");
    });

    //登陆切换
    // $("#logout").click(function () {
    //     $("#logged").hide();
    //     $("#login").show();
    // });
    // $("#log").click(function () {
    //     $("#login").hide();
    //     $("#logged").show();
    // });

    //时间段切换显示效果
    $(".chart_label li").click(function () {
        var i=$(this).index();
        $(this).parent().children("li").removeClass("c_current_li");
        $(this).addClass("c_current_li");
        $(".photoData-box  #photoData_40").css("display","none");
        $(".photoData-box #photoData_40").eq(i).css("display","block");
    });

    $.ajax({
        url: '/data/getProIdKey?proId=15&randData=45499',
        success: function (data) {
            if (data != "error") {
                //初始化实时数据推送服务
                window.rtc = new WSNRTConnect(data.substring(data.indexOf("ID:") + 3, data.indexOf(",KEY")), data.substring(data.indexOf("KEY:") + 4));
                rtc.setServerAddr("api.zhiyun360.com" + ":8080");
                //数据推送服务连接
                rtc.connect();
                //回调函数，连接成功处理函数
                rtc.onConnect = function () {
                    $("#tips").text("数据推送服务已连接。");

                    serviceConStatus = 1;//将服务连接状态置为1

                    //刷新在线效果
                    $(".refresh").find("img").click(function () {
                        if (serviceConStatus == 1) {
                            $(this).attr("src", "../../images/refresh.gif");
                            var obj = $(this);
                            var chan = $(this).parents(".sensorDiv").attr("mac");
                            if (chan.indexOf('_') != -1) {//传感器设备
                                var mac = chan.substring(0, chan.indexOf('_'));
                                console.log(mac + "  <--  " + "{D0=?}");
                                rtc.sendMessage(mac, "{D0=?}");
                            }
                            else {//执行器设备
                                rtc.sendMessage(chan, "{D0=?}");
                                console.log(chan + "  <--  " + "{D0=?}");
                                rtc.sendMessage(chan, "{D1=?}");
                                console.log(chan + "  <--  " + "{D1=?}");
                            }
                            var t = setTimeout(function () {
                                obj.attr("src", "../../images/refresh.jpg");
                            }, 1000);
                        }
                    });
                };

                //回调函数，掉线处理函数
                rtc.onConnectLost = function () {
                    serviceConStatus = 0;//将服务连接状态置为0
                    $("tips").text("数据服务已掉线，正在重新连接...");
                    rtc.connect();//掉线之后重新连接
                };

                //回调函数，消息到达处理函数
                rtc.onmessageArrive = function (mac, dat) {
                    console.log(mac + "  -->  " + dat);
                    //值域
                    $(".sensorDiv").each(function () {
                        var obj = $(this);
                        if (obj.attr("mac") == mac) {//执行器模块数据显示处理
                            var today = new Date();
                            var h = checkTime(today.getHours());
                            var m = checkTime(today.getMinutes());
                            var s = checkTime(today.getSeconds());
                            obj.find(".act_log").find("textarea").val(h + ":" + m + ":" + s + " <-- " + dat + "\r\n" + $(this).find(".act_log").find("textarea").val());
                            ////需要将上次执行的计时器删除
                            clearTimeout(this.temp);
                            ////

                            //接收到数据后，将执行器的状态设置为在线120s的时间
                            this.temp = setTimeout(function () { obj.find(".sensor_title").find("img").attr("src", "../../images/s_title_close.png"); }, 180000);
                            obj.find(".sensor_title").find("img").attr("src", "../../images/s_title_open.png");
                        }
                        else {//数据采集模块数据处理
                            var subValueField;
                            var subChannel;
                            var dataChannel;
                            var value;
                            var valueField = dat;

                            var divSensorChan = $(this).attr("mac");
                            //处理在线状态
                            if (divSensorChan.substring(0, divSensorChan.indexOf('_')) == mac) {
                                clearTimeout(this.temp);
                                this.temp = setTimeout(function () { obj.find(".sensor_title").find("img").attr("src", "../../images/s_title_close.png"); }, 180000);
                                obj.find(".sensor_title").find("img").attr("src", "../../images/s_title_open.png");
                            }
                            while (1) {
                                //退出条件
                                if (valueField.indexOf(',') == -1) {//处理{A0=1}这种情况
                                    subValueField = valueField;
                                    subChannel = subValueField.substring(1, placeOfChar(subValueField, 1, '='));
                                    dataChannel = mac + '_' + subChannel;
                                    value = subValueField.substring(placeOfChar(subValueField, 1, '=') + 1, placeOfChar(subValueField, 1, '}'));
                                    if (dataChannel == divSensorChan) {
                                        //显示实时数据
                                        obj.find(".s_c_data").find("span").text(value);
                                        obj.find(".s_c_time").text(getTheDate());

                                        //在动态曲线上画点
                                        addPlot(obj, value);
                                    }
                                    break;
                                } else {//处理{A0=1，A1=2,...}这种情况
                                    subValueField = valueField.substring(0, placeOfChar(valueField, 1, ',')) + "}";
                                    valueField = valueField.substring(placeOfChar(valueField, 1, ',') + 1);
                                    valueField = "{" + valueField;
                                    subChannel = subValueField.substring(1, placeOfChar(subValueField, 1, '='));
                                    dataChannel = mac + '_' + subChannel;
                                    value = subValueField.substring(placeOfChar(subValueField, 1, '=') + 1, placeOfChar(subValueField, 1, '}'));

                                    if (dataChannel == divSensorChan) {

                                        //显示实时数据
                                        obj.find(".s_c_data").find("span").text(value);
                                        obj.find(".s_c_time").text(getTheDate());

                                        //在动态曲线上画点
                                        addPlot(obj, value);
                                    }
                                }
                            }
                        }
                    });

                };

                //历史数据查询
                //初始化历史数据查询服务
                var hisData = new WSNHistory(data.substring(data.indexOf("ID:") + 3, data.indexOf(",KEY")), data.substring(data.indexOf("KEY:") + 4));
                hisData.setServerAddr("api.zhiyun360.com" + ":8080");
                //初始查询所有传感器的最近1小时数据、并查询最新历史数据
                $(".c_li_live").each(function () {
                    var obj = $(this);
                    var obj_sensordiv = $(this).parents(".sensorDiv");
                    var datachannel = obj_sensordiv.attr("mac");
                    var dataunit = obj_sensordiv.attr("unit");
                    var linetype = obj_sensordiv.attr("linetype");
                    var querytime = $(this).attr("querytime");
                    var param = "duration=" + querytime;
                    //显示数据加载按钮
                    $(this).parents(".chart_").find(".sensorDiv").html('<img src="../../content/images/loading.gif" align="center" style="margin-top:80px;" />');

                    //查询最近1小时
                    hisData.queryLast1H(datachannel, function (data) {
                        drawcurve(obj, linetype, dataunit, DataAnalysis(data));//绘制曲线
                    });
                    //查询最新历史数据
                    hisData.queryLast(datachannel, function (data) {
                        //显示实时数据
                        var str = data.at;
                        var dateVal = str.substring(0, 10) + ' ' + str.substring(11, 19);
                        obj_sensordiv.find(".s_c_data").find("span").text(data.current_value);
                        obj_sensordiv.find(".s_c_time").text(dateVal);
                    }, "");
                });
                $(".sensor_li").click(function () {
                    //时间段切换显示效果
                    $(this).parent().children("li").removeClass("c_current_li");
                    $(this).addClass("c_current_li");

                    var obj = $(this);
                    var obj_sensordiv = $(this).parents(".sensorDiv");
                    var datachannel = obj_sensordiv.attr("mac");
                    var dataunit = obj_sensordiv.attr("unit");
                    var linetype = obj_sensordiv.attr("linetype");
                    var querytime = $(this).attr("querytime");
                    var param = "duration=" + querytime;
                    //显示数据加载按钮
                    $(this).parents(".chart_").find(".chart_plot").html('<img src="../../content/images/loading.gif" align="center" style="margin-top:80px;" />');

                    hisData.queryLast(datachannel, function (data) {
                        drawcurve(obj, linetype, dataunit, DataAnalysis(data));//绘制曲线
                    }, param);
                });

                //查询历史图片曲线
                $("#photoData_mode").click(function () {
                    $("#data_layer").hide();
                    $("#video_layer").hide();
                    $("#actuator_layer").hide();
                    $("#photoData_layer").show();
                    $(this).attr("disabled", "disabled");
                    $("#data_mode").removeAttr("disabled");
                    $("#video_mode").removeAttr("disabled");
                    $("#actuator_mode").removeAttr("disabled");

                    //初始查询所有摄像头的最近1小时图片数据
                    $(".c_li_live_photo").each(function () {
                        var obj = $(this);
                        var obj_photoShow = obj.parent(".chart_label").siblings("div");
                        var photoShowDivID = obj_photoShow.attr("id");
                        var obj_sensordiv = $(this).parents(".photoDataDiv");
                        var datachannel = "Camera:" + obj_sensordiv.attr("mac");
                        var querytime = $(this).attr("querytime");
                        var interval = 120;

                        var param = "duration=" + querytime + "&interval=" + interval;
                        //显示数据加载按钮
                        $(this).parents(".chart_").find(".photoDataDiv").html('<img src="../../content/images/loading.gif" align="center" style="margin-top:80px;" />');
                        hisData.queryLast(datachannel, function (data) {
                            console.log(JSON.stringify(data));
                            //数据为空
                            if (data.datapoints == "[]" || data.datapoints == "" || data == undefined || data == null) {
                                obj_photoShow.html('<div style="color:gray;padding-top:80px; font-size:16px">您查询的时间段没有数据</div>');
                                return;
                            }
                            photoShow(photoShowDivID, JSON.parse(DataAnalysis(data)), "1H");//画曲线
                        }, param);
                    });
                    //查询其它历史图片数据
                    $(".photo_li").click(function () {
                        //时间段切换显示效果
                        $(this).parent().children("li").removeClass("c_current_li");
                        $(this).addClass("c_current_li");

                        var obj = $(this);
                        var obj_photoShow = obj.parent(".chart_label").siblings("div");
                        var photoShowDivID = obj_photoShow.attr("id");
                        var obj_sensordiv = $(this).parents(".photoDataDiv");
                        var datachannel = "Camera:" + obj_sensordiv.attr("mac");
                        var querytime = $(this).attr("querytime");
                        var interval = getIntervalValue(querytime);//获取时间间隔为

                        var param = "duration=" + querytime + "&interval=" + interval;
                        //显示数据加载按钮
                        $(this).parents(".chart_").find(".photoDataDiv").html('<img src="../../content/images/loading.gif" align="center" style="margin-top:80px;" />');
                        hisData.queryLast(datachannel, function (data) {
                            //数据为空
                            if (data.datapoints == "[]" || data.datapoints == "" || data == undefined || data == null) {
                                obj_photoShow.html('<div style="color:gray;padding-top:80px;font-size:16px">您查询的时间段没有数据</div>');
                                return;
                            }
                            photoShow(photoShowDivID, JSON.parse(DataAnalysis(data)), getPhotoDataTimeUnit(querytime));//画曲线
                        }, param);
                    });

                });

            }
        }//////////////////////////////
    });
});

