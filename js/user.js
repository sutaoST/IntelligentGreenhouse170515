var connectFlag = 0;
var ModeFlag = 1;
var fanMac, fanData;
var thMac, co2Mac, relayMac, magneticMac, alarmMac, lightMac, infraredMac, rgbMac, stepMac, windSpeedMac;
var fanFlag;
var humfanFlag;
var temfanFlag;
var penlinFlag;
var direFlag;
var diguangFlag;
var ganbinFlag;
var buguandengFlag;
var zheyanFlag = 0;
var timenow;
var myDate = new Date();

var timenametem = null;
var timenamehum = null;
var timenamesoiltem = null;
var timenamesoilhum = null;
var timenameCO2 = null;
var timenamelight = null;

timenow = myDate.getHours();

$(document).ready(function() {
    function onConnect() {
        connectFlag = 1;
        message_show('已连接到' + wsn_config.application.aid);
        rtc._connect = true;
    }

    function onConnectLost() {
        message_show('实时连接断开');
        rtc._connect = false;
        setTimeout(rtc.connect, 3000);
        $("marquee").text("未连接")
    }

    function onmessageArrive(mac, dat) {
        console.log(mac + " >>> " + dat);
        if (dat[0] == '{' && dat[dat.length - 1] == '}') {
            dat = dat.substr(1, dat.length - 2);
            var its = dat.split(',');
            for (var i = 0; i < its.length; i++) {
                var it = its[i].split('=');
                if (it.length == 2) {
                    var tag = it[0];
                    var val = it[1];
                    process_tag(mac, tag, val);
                }
            }
            if (!mac2type[mac]) { //如果没有获取到TYPE值，主动去查询
                rtc.sendMessage(mac, "{TYPE=?,A0=?,A1=?,A2=?,A3=?,A4=?,A5=?,A6=?,A7=?,D1=?}");
            }
        }
    }
    /*
     * title2type:将不同的按钮转换成对应的指令，并根据type字段可以找到对应节点mac地址
     */
    //var title2type = {
    //    "温湿度":{
    //        type:"002",
    //        cmd:{
    //            query:"{A0=?,A1=?}"
    //        }
    //    },
    //    "光照度":{
    //        type:"001",
    //        cmd:{
    //            query:"{A0=?}"
    //        }
    //    },
    //    "CO2传感器":{
    //        type:"028",
    //        cmd:{
    //            query:"{A0=?}"
    //        }
    //    },
    //    "人体红外":{
    //        type:"004",
    //        cmd:{
    //            query:"{A0=?}"
    //        }
    //    },
    //    "LED":	{
    //        type:"003",
    //        cmd:{
    //            on:"{OD1=1,D1=?}",
    //            off:"{CD1=1,D1=?}",
    //            query:"{D1=?}"
    //        }
    //    },
    //    "声光报警":{
    //        type:"008",
    //        cmd:{
    //            on:"{OD1=1,D1=?}",
    //            off:"{CD1=1,D1=?}",
    //            query:"{D1=?}"
    //        }
    //    },
    //    "排风扇":		{
    //        type:"007",
    //        cmd:{
    //            on:"{OD1=1,D1=?}",
    //            off:"{CD1=1,D1=?}",
    //            query:"{D1=?}"
    //        }
    //    },
    //    "电热风机":	{
    //        type:"810",
    //        cmd:{
    //            on:"{OD1=255,D1=?}",
    //            off:"{CD1=255,D1=?}",
    //            query:"{D1=?}"
    //        }
    //    },
    //    "湿帘风机":	{
    //        type:"810",
    //        cmd:{
    //            on:"{OD1=255,D1=?}",
    //            off:"{CD1=255,D1=?}",
    //            query:"{D1=?}"
    //        }
    //    },
    //    "地热管道":	{
    //        type:"810",
    //        cmd:{
    //            on:"{OD1=255,D1=?}",
    //            off:"{CD1=255,D1=?}",
    //            query:"{D1=?}"
    //        }
    //    },
    //    "补光灯":	{
    //        type:"810",
    //        cmd:{
    //            on:"{OD1=255,D1=?}",
    //            off:"{CD1=255,D1=?}",
    //            query:"{D1=?}"
    //        }
    //    },
    //    "喷淋":{
    //        type:"850",
    //        cmd:{
    //            on:"{OD1=2,D1=?}",
    //            off:"{CD1=2,D1=?}",
    //            query:"{D1=?}"
    //        }
    //    },
    //    "干冰添加器":{
    //        type:"850",
    //        cmd:{
    //            on:"{OD1=1,D1=?}",
    //            off:"{CD1=1,D1=?}",
    //            query:"{D1=?}"
    //        }
    //    },
    //    "遮阳机":	{
    //        type:"851",
    //        cmd:{
    //            "正转":"{CD1=8,OD1=4,D1=?}",
    //            "反转":"{OD1=12,D1=?}",
    //            "停":"{CD1=4,D1=?}",
    //            query:"{D1=?}"
    //        }
    //    },
    //    "滴灌":	{
    //        type:"851",
    //        cmd:{
    //            on:"{OD1=2,D1=?}",
    //            off:"{CD1=2,D1=?}",
    //            query:"{D1=?}"
    //        }
    //    },
    //    "风速":	{
    //        type:"860",
    //        cmd:{
    //            query:"{A0=?}"
    //        }
    //    },
    //    "土壤温湿度":	{
    //        type:"862",
    //        cmd:{
    //            query:"{A0=?,A1=?}"
    //        }
    //    }
    //};
    var mac2type = {};
    var type2mac = {};
    var timestart = $("#daytime1").val();
    var timeend = $("#daytime2").val();
    var temmedian1 = (parseInt($("#tem1").val()) + parseInt($("#tem2").val())) / 2;
    var temmedian2 = (parseInt($("#tem3").val()) + parseInt($("#tem4").val())) / 2;
    var hummedian1 = (parseInt($("#hum1").val()) + parseInt($("#hum2").val())) / 2;
    var hummedian2 = (parseInt($("#hum3").val()) + parseInt($("#hum4").val())) / 2;
    var soiltemmedian1 = (parseInt($("#soiltem1").val()) + parseInt($("#soiltem2").val())) / 2;
    var soiltemmedian2 = (parseInt($("#soiltem3").val()) + parseInt($("#soiltem4").val())) / 2;
    var soilhummedian1 = (parseInt($("#soilhum1").val()) + parseInt($("#soilhum2").val())) / 2;
    var soilhummedian2 = (parseInt($("#soilhum3").val()) + parseInt($("#soilhum4").val())) / 2;
    var co2median1 = (parseInt($("#CO2value1").val()) + parseInt($("#CO2value2").val())) / 2;
    var co2median2 = (parseInt($("#CO2value3").val()) + parseInt($("#CO2value4").val())) / 2;
    var lightmedian1 = (parseInt($("#lightvalue1").val()) + parseInt($("#lightvalue2").val())) / 2;
    var counttem = new Array();
    var counthum = new Array();
    var countsoiltem = new Array();
    var countsoilhum = new Array();
    var countCO2 = new Array();
    var countlight = new Array();

    function process_tag(mac, tag, val) {
        if (tag == "TYPE") {
            var t = val.substr(2, 3);
            //console.log(t);

            mac2type[mac] = t;
            type2mac[t] = mac;
            if (wsn_config[t]) {
                wsn_config[t].online();
            }
            var id = "type_" + t;
            $("#" + id).val(mac);

            if (id == "type_007") {
                fanMac = mac;
                rtc.sendMessage(fanMac, "{D1=?}")
            }
            if (id == "type_002") {
                thMac = mac;
                rtc.sendMessage(thMac, "{A0=?,A1=?}")
            }
            if (id == "type_028") {
                co2Mac = mac;
                rtc.sendMessage(co2Mac, "{A0=?}")
            }
            if (id == "type_810") {
                relayMac = mac;
                rtc.sendMessage(relayMac, "{D1=?}")
            }
            if (id == "type_850") {
                magneticMac = mac;
                rtc.sendMessage(magneticMac, "{D1=?}")
            }
            if (id == "type_008") {
                alarmMac = mac;
                rtc.sendMessage(alarmMac, "{D1=?}")
            }
            if (id == "type_001") {
                lightMac = mac;
                rtc.sendMessage(lightMac, "{A0=?}")
            }
            if (id == "type_004") {
                infraredMac = mac;
                rtc.sendMessage(infraredMac, "{D1=?}")
            }
            if (id == "type_003") {
                rgbMac = mac;
                rtc.sendMessage(rgbMac, "{D1=?}")
            }
            if (id == "type_851") {
                stepMac = mac;
                rtc.sendMessage(stepMac, "{D1=?}")
            }
            if (id == "type_860") {
                windSpeedMac = mac;
                rtc.sendMessage(windSpeedMac, "{A0=?}")
            }

        }
        var t = mac2type[mac];
        if (t && wsn_config[t]) {
            wsn_config[t].pro(tag, val);
        }
    }
    var rtc = new WSNRTConnect();
    rtc.onConnect = onConnect;
    rtc.onConnectLost = onConnectLost;
    rtc.onmessageArrive = onmessageArrive;
    rtc._connect = false;

    setInterval(function() {
        if (rtc._connect) {
            rtc.sendMessage("FF:FF:FF:FF:FF:FF:FF:FF", "{TPN=6/2}");
        }
    }, 15000);

    var wsn_config = {
        application: {
            aid: "",
            akey: "",
            server: ""
        },
        "002": {
            online: function() { //环境温度
            },
            pro: function(tag, val) {
                if (tag == "A0") {
                    $("#tem").text(val + "℃");
                    $(".hexIn img").removeClass("names-all");
                    $("#ttem").text(val);
                    if (ModeFlag == 1) {
                        if (timenow >= timestart && timenow < timeend) { //白天
                            if (val <= parseInt($("#tem1").val())) { //小于最小值
                                if (temfanFlag == 0) {
                                    rtc.sendMessage(relayMac, "{OD1=1,D1=?}");
                                }
                            } else if (val > parseInt($("#tem1").val()) && val < temmedian1) { //大于最小值小于中间值
                                if (humfanFlag == 1) {
                                    rtc.sendMessage(relayMac, "{CD1=2,D1=?}");
                                }
                            } else if (val >= temmedian1 && val < parseInt($("#tem2").val())) { //大于中间值小于最大值
                                if (temfanFlag == 1) {
                                    rtc.sendMessage(relayMac, "{CD1=1,D1=?}");
                                }
                            } else if (val > parseInt($("#tem2").val())) { //大于最大值
                                if (humfanFlag == 0) {
                                    rtc.sendMessage(relayMac, "{OD1=2,D1=?}");
                                }
                            }
                        } else { //夜晚
                            if (val <= parseInt($("#tem3").val())) { //小于最小值
                                if (temfanFlag == 0) {
                                    rtc.sendMessage(relayMac, "{OD1=1,D1=?}");
                                }
                            } else if (val > parseInt($("#tem3").val()) && val < temmedian2) { //大于最小值小于中间值
                                if (humfanFlag == 1) {
                                    rtc.sendMessage(relayMac, "{CD1=2,D1=?}");
                                }
                            } else if (val >= temmedian2 && val < parseInt($("#tem4").val())) { //大于中间值小于最大值
                                if (temfanFlag == 1) {
                                    rtc.sendMessage(relayMac, "{CD1=1,D1=?}");
                                }
                            } else if (val > parseInt($("#tem4").val())) { //大于最大值
                                if (humfanFlag == 0) {
                                    rtc.sendMessage(relayMac, "{OD1=2,D1=?}");
                                }
                            }
                        }
                    }
                    counttem.push(val);
                    if (counttem.length >= 6) {
                        counttem.splice(0, 1);
                    }
                    console.log("counttem=" + counttem + "----------length=" + counttem.length);
                    if (timenametem) {
                        window.clearInterval(timenametem);
                    }
                    timenametem = setInterval(function() {
                        if (counttem[0] < counttem[4]) {
                            $("#imgtem").attr("src", "images/topArrows.png");
                        } else if (counttem[0] > counttem[4]) {
                            $("#imgtem").attr("src", "images/downArrows.png");
                        } else { $("#imgtem").attr("src", "images/hengxian1.png"); }
                    }, 3000);
                }
                if (tag == "A1") {
                    $("#hum").text(val + "%");
                    $(".hexIn img").removeClass("names-all");
                    $("#thum").text(val);
                    if (ModeFlag == 1) {
                        if (timenow >= timestart && timenow < timeend) { //白天
                            if (val <= parseInt($("#hum1").val())) { //小于最小值
                                if (ganbinFlag == 0) {
                                    rtc.sendMessage(magneticMac, "{OD1=2,D1=?}"); //喷淋开
                                }
                            } else if (val > parseInt($("#hum1").val()) && val < hummedian1) { //大于最小值小于中间值
                                if (temfanFlag == 1) {
                                    rtc.sendMessage(relayMac, "{CD1=1,D1=?}"); //电热风机开
                                }
                                if (fanFlag == 1) {
                                    rtc.sendMessage(fanMac, "{CD1=1,D1=?}");
                                }
                            } else if (val >= hummedian1 && val < parseInt($("#hum2").val())) { //大于中间值小于最大值
                                if (ganbinFlag == 1) {
                                    rtc.sendMessage(magneticMac, "{CD1=2,D1=?}"); //喷淋开
                                }
                            } else if (val > parseInt($("#hum2").val())) { //大于最大值
                                if (temfanFlag == 0) {
                                    rtc.sendMessage(relayMac, "{OD1=1,D1=?}"); //电热风机开
                                }
                                if (fanFlag == 0) {
                                    rtc.sendMessage(fanMac, "{OD1=1,D1=?}");
                                }
                            }
                        } else { //夜晚
                            if (val <= parseInt($("#hum3").val())) { //小于最小值
                                if (penlinFlag == 0) {
                                    rtc.sendMessage(magneticMac, "{OD1=2,D1=?}"); //喷淋开
                                }
                            } else if (val > parseInt($("#hum3").val()) && val < hummedian2) { //大于最小值小于中间值
                                if (temfanFlag == 1) {
                                    rtc.sendMessage(relayMac, "{CD1=1,D1=?}"); //电热风机开
                                }
                                if (fanFlag == 1) {
                                    rtc.sendMessage(fanMac, "{CD1=1,D1=?}");
                                }
                            } else if (val >= hummedian2 && val < parseInt($("#hum4").val())) { //大于中间值小于最大值
                                if (penlinFlag == 1) {
                                    rtc.sendMessage(magneticMac, "{CD1=2,D1=?}"); //喷淋
                                }
                            } else if (val > parseInt($("#hum4").val())) { //大于最大值
                                if (temfanFlag == 0) {
                                    rtc.sendMessage(relayMac, "{OD1=1,D1=?}"); //电热风机开
                                }
                                if (fanFlag == 0) {
                                    rtc.sendMessage(fanMac, "{OD1=1,D1=?}");
                                }
                            }
                        }
                    }
                    counthum.push(val);
                    if (counthum.length >= 6) {
                        counthum.splice(0, 1);
                    }
                    console.log("counthum=" + counthum + "----length=" + counthum.length);
                    if (timenamehum) {
                        window.clearInterval(timenamehum);
                    }
                    timenamehum = setInterval(function() {
                        if (counthum[0] < counthum[4]) {
                            $("#imghum").attr("src", "images/topArrows.png");
                        } else if (counthum[0] > counthum[4]) {
                            $("#imghum").attr("src", "images/downArrows.png");
                        } else { $("#imghum").attr("src", "images/hengxian1.png"); }
                    }, 3000);
                }
            }
        },
        "001": { //光照度
            online: function() {},
            pro: function(tag, val) {
                if (tag == "A0") {
                    $("#light").text(val + "lux");
                    $(".hexIn img").removeClass("names-all");
                    $("#tlight").text(val);
                    if (ModeFlag == 1) {
                        if (timenow >= timestart && timenow < timeend) { //白天
                            if (val <= parseInt($("#lightvalue1").val())) { //小于最小值
                                if (zheyanFlag == 0) {
                                    rtc.sendMessage(magneticMac, "{V1=360,OD1=4,D1=?}");
                                }
                                if (buguandengFlag == 0) {
                                    rtc.sendMessage(relayMac, "{OD1=8,D1=?}"); //向传感器发送数据
                                }
                            } else if (val > parseInt($("#CO2value1").val()) && val < lightmedian1) { //大于最小值小于中间值
                                if (fanFlag == 1) {
                                    rtc.sendMessage(fanMac, "{CD1=1,D1=?}"); //排风扇打开
                                }
                            } else if (val >= lightmedian1 && val < parseInt($("#CO2value2").val())) { //大于中间值小于最大值
                                if (zheyanFlag == 1) {
                                    rtc.sendMessage(magneticMac, "{V1=360,CD1=4,D1=?}");
                                }
                                if (buguandengFlag == 1) {
                                    rtc.sendMessage(relayMac, "{CD1=8,D1=?}"); //向传感器发送数据
                                }
                            } else if (val > parseInt($("#CO2value2").val())) { //大于最大值
                                if (zheyanFlag == 0) {
                                    rtc.sendMessage(magneticMac, "{V1=360,OD1=4,D1=?}");
                                }
                            }
                        } else { //夜晚
                            if (val <= parseInt($("#CO2value3").val())) { //小于最小值
                                if (ganbinFlag == 0) {
                                    rtc.sendMessage(magneticMac, "{OD1=1,D1=?}"); //干冰添加器打开
                                }
                            } else if (val > parseInt($("#CO2value3").val()) && val < co2median2) { //大于最小值小于中间值
                                if (fanFlag == 1) {
                                    rtc.sendMessage(fanMac, "{CD1=1,D1=?}"); //排风扇打开
                                }
                            } else if (val >= co2median2 && val < parseInt($("#CO2value4").val())) { //大于中间值小于最大值
                                if (ganbinFlag == 1) {
                                    rtc.sendMessage(magneticMac, "{CD1=1,D1=?}"); //干冰添加器
                                }
                            } else if (val > parseInt($("#CO2value4").val())) { //大于最大值
                                if (fanFlag == 0) {
                                    rtc.sendMessage(fanMac, "{OD1=1,D1=?}"); //排风扇打开
                                }
                            }
                        }
                    }
                    countlight.push(val);
                    if (countlight.length >= 6) {
                        countlight.splice(0, 1);
                    }
                    console.log("countlight=" + countlight + "----------length=" + countlight.length);
                    if (timenamelight) {
                        window.clearInterval(timenamelight);
                    }
                    timenamelight = setInterval(function() {
                        if (countlight[0] < countlight[4]) {
                            $("#imglight").attr("src", "images/topArrows.png");
                        } else if (countlight[0] > countlight[4]) {
                            $("#imglight").attr("src", "images/downArrows.png");
                        } else { $("#imglight").attr("src", "images/hengxian1.png"); }
                    }, 3000);
                }
            }
        },
        "028": { //CO2
            online: function() {},
            pro: function(tag, val) {
                if (tag == "A0") {
                    $("#carbon").text(val + "ppm");
                    $(".hexIn img").removeClass("names-all");
                    $("#tcarbon").text(val);
                    if (ModeFlag == 1) {
                        if (timenow >= timestart && timenow < timeend) { //白天
                            if (val <= parseInt($("#CO2value1").val())) { //小于最小值
                                if (ganbinFlag == 0) {
                                    rtc.sendMessage(magneticMac, "{OD1=1,D1=?}"); //干冰添加器打开
                                }
                            } else if (val > parseInt($("#CO2value1").val()) && val < co2median1) { //大于最小值小于中间值
                                if (fanFlag == 1) {
                                    rtc.sendMessage(fanMac, "{CD1=1,D1=?}"); //排风扇打开
                                }
                            } else if (val >= co2median1 && val < parseInt($("#CO2value2").val())) { //大于中间值小于最大值
                                if (ganbinFlag == 1) {
                                    rtc.sendMessage(magneticMac, "{CD1=1,D1=?}"); //干冰添加器
                                }
                            } else if (val > parseInt($("#CO2value2").val())) { //大于最大值
                                if (fanFlag == 0) {
                                    rtc.sendMessage(fanMac, "{OD1=1,D1=?}"); //排风扇打开
                                }
                            }
                        } else { //夜晚
                            if (val <= parseInt($("#CO2value3").val())) { //小于最小值
                                if (ganbinFlag == 0) {
                                    rtc.sendMessage(magneticMac, "{OD1=1,D1=?}"); //干冰添加器打开
                                }
                            } else if (val > parseInt($("#CO2value3").val()) && val < co2median2) { //大于最小值小于中间值
                                if (fanFlag == 1) {
                                    rtc.sendMessage(fanMac, "{CD1=1,D1=?}"); //排风扇打开
                                }
                            } else if (val >= co2median2 && val < parseInt($("#CO2value4").val())) { //大于中间值小于最大值
                                if (ganbinFlag == 1) {
                                    rtc.sendMessage(magneticMac, "{CD1=1,D1=?}"); //干冰添加器
                                }
                            } else if (val > parseInt($("#CO2value4").val())) { //大于最大值
                                if (fanFlag == 0) {
                                    rtc.sendMessage(fanMac, "{OD1=1,D1=?}"); //排风扇打开
                                }
                            }
                        }
                    }
                    countCO2.push(val);
                    if (countCO2.length >= 6) {
                        countCO2.splice(0, 1);
                    }
                    console.log("countCO2=" + countCO2 + "----------length=" + countCO2.length);
                    if (timenameCO2) {
                        window.clearInterval(timenameCO2);
                    }
                    timenameCO2 = setInterval(function() {
                        if (countCO2[0] < countCO2[4]) {
                            $("#imgCO2").attr("src", "images/topArrows.png");
                        } else if (countCO2[0] > countCO2[4]) {
                            $("#imgCO2").attr("src", "images/downArrows.png");
                        } else { $("#imgCO2").attr("src", "images/hengxian1.png"); }
                    }, 3000);
                }
            }
        },

        "004": {
            online: function() {
                //var index = get_index("人体红外");
                //var $hexIn = $(".board:eq("+index+")");
                //$hexIn.removeClass("off-line");
            },
            pro: function(tag, val) {
                if (tag == "A0") {
                    if (val == "0") {
                        $("#peple").attr("src", "images/Invasion.gif");
                    } else {
                        $("#peple").attr("src", "images/peopleSensor.png");
                    }
                }
            }
        },

        "003": { //rgb灯
            online: function() {},
            pro: function(tag, val) {
                if (tag == "D1") {
                    if (val & 0x01) {

                    } else {

                    }
                }
            }
        },

        /////////////////////////////////////////////////////////////////////
        "008": { //声光报警
            online: function() {
                //var index = get_index("声光报警");
                //var $hexIn = $(".board:eq("+index+")");
                //$hexIn.removeClass("off-line");
            },
            pro: function(tag, val) {
                //if (tag == "D1") {
                //    var index = get_index("声光报警");
                //    var $hexIn = $(".board:eq("+index+")");
                //    var status = 'off';
                //    if (val & 0x01) {
                //        //$hexIn.find(".status").removeClass("status-off");
                //        //status = 'on';
                //        $hexIn.find("input").bootstrapSwitch('state', true, true);
                //    }else{
                //        $hexIn.find("input").bootstrapSwitch('state', false, true);
                //    }
                //}
            }
        },
        "007": { //排风扇
            online: function() {
                $("#img04").attr("src", "images/fna.png");
                $("#off4").css("background-color", "rgba(153, 153, 153, 0.54902)");
            },
            pro: function(tag, val) {
                if (tag == "D1") {
                    if (val & 0x01) {
                        $("#img04").attr("src", "images/fan.gif");
                        $("#off4").css("background-color", "rgb(74, 156, 226)").text("开");
                        fanFlag = 1;
                    } else {
                        $("#img04").attr("src", "images/fna.png");
                        $("#off4").css("background-color", "rgba(153, 153, 153, 0.54902)").text("关");
                        fanFlag = 0;
                    }
                }
            }
        },
        "810": { //4路继电器组
            online: function() {
                $("#img01").attr("src", "images/dianreji.png");
                $("#off1").css("background-color", "rgba(153, 153, 153, 0.54902)");
                $("#img02").attr("src", "images/HumFan.png");
                $("#off2").css("background-color", "rgba(153, 153, 153, 0.54902)");
                $("#img05").attr("src", "images/diWorm.png");
                $("#off5").css("background-color", "rgba(153, 153, 153, 0.54902)");
                $("#img08").attr("src", "images/buguangdeng.png");
                $("#off8").css("background-color", "rgba(153, 153, 153, 0.54902)");
            },
            pro: function(tag, val) {
                if (tag == "D1") {
                    if (val & 0x01) {
                        $("#img01").attr("src", "images/dianreji.gif");
                        $("#off1").css("background-color", "rgb(74, 156, 226)").text("开");
                        temfanFlag = 1;
                    } else {
                        $("#img01").attr("src", "images/dianreji.png");
                        $("#off1").css("background-color", "rgba(153, 153, 153, 0.54902)").text("关");
                        temfanFlag = 0;
                    }
                    if (val & 0x02) {
                        $("#img02").attr("src", "images/HumFan.gif");
                        $("#off2").css("background-color", "rgb(74, 156, 226)").text("开");
                        humfanFlag = 1;
                    } else {
                        $("#img02").attr("src", "images/HumFan.png");
                        $("#off2").css("background-color", "rgba(153, 153, 153, 0.54902)").text("关");
                        humfanFlag = 0;
                    }
                    if (val & 0x04) {
                        $("#img05").attr("src", "images/diWorm.gif");
                        $("#off5").css("background-color", "rgb(74, 156, 226)").text("开");
                        direFlag = 1;
                    } else {
                        $("#img05").attr("src", "images/diWorm.png");
                        $("#off5").css("background-color", "rgba(153, 153, 153, 0.54902)").text("关");
                        direFlag = 0;
                    }
                    if (val & 0x08) {
                        $("#img08").attr("src", "images/buguangdeng.gif");
                        $("#off8").css("background-color", "rgb(74, 156, 226)").text("开");
                        buguandengFlag = 1;
                    } else {
                        $("#img08").attr("src", "images/buguangdeng.png");
                        $("#off8").css("background-color", "rgba(153, 153, 153, 0.54902)").text("关");
                        buguandengFlag = 0;
                    }
                }
            }
        },
        "850": { //电磁阀，接近开关，直流电机
            online: function() {
                $("#img07").attr("src", "images/ganBing.png");
                $("#off7").css("background-color", "rgba(153, 153, 153, 0.54902)");
                $("#img03").attr("src", "images/penlin.png");
                $("#off3").css("background-color", "rgba(153, 153, 153, 0.54902)");
            },
            pro: function(tag, val) {
                if (tag == "D1") {
                    if (val & 0x01) {
                        $("#img07").attr("src", "images/ganBing.gif");
                        $("#off7").css("background-color", "rgb(74, 156, 226)").text("开");
                        ganbinFlag = 1;
                    } else {
                        $("#img07").attr("src", "images/ganBing.png");
                        $("#off7").css("background-color", "rgba(153, 153, 153, 0.54902)").text("关");
                        ganbinFlag = 0;
                    }
                    if (val & 0x02) {
                        $("#img03").attr("src", "images/penlin.gif");
                        $("#off3").css("background-color", "rgb(74, 156, 226)").text("开");
                        penlinFlag = 1;
                    } else {
                        $("#img03").attr("src", "images/penlin.png");
                        $("#off3").css("background-color", "rgba(153, 153, 153, 0.54902)").text("关");
                        penlinFlag = 0;
                    }
                }
            }
        },
        "851": { //步进电机，气泵，水泵
            online: function() {
                $("#img06").attr("src", "images/diguang.png");
                $("#off6").css("background-color", "rgba(153, 153, 153, 0.54902)");
                $("#img09").attr("src", "images/zheyangp.png");
                $("#off9").css("background-color", "rgba(153, 153, 153, 0.54902)");
            },
            pro: function(tag, val) {
                if (tag == "D1") {
                    if (val & 0x02) {
                        $("#img06").attr("src", "images/diguang.gif");
                        $("#off6").css("background-color", "rgb(74, 156, 226)").text("开");
                        diguangFlag = 1;
                    } else {
                        $("#img06").attr("src", "images/diguang.png");
                        $("#off6").css("background-color", "rgba(153, 153, 153, 0.54902)").text("关");
                        diguangFlag = 0;
                    }
                    if (val & 0x04) {
                        if (val & 0x08) { //反转
                            $("#img09").attr("src", "images/zheyangp.png");
                            $("#off9").css("background-color", "rgb(74, 156, 226)").text("关");
                            zheyanFlag = 0;
                        } else { //正转
                            $("#img09").attr("src", "images/zheyangpeng.gif");
                            $("#off9").css("background-color", "rgb(74, 156, 226)").text("开");
                            zheyanFlag = 1;
                        }
                    } else { //关
                        $("#img09").attr("src", "images/zheyangp.png");
                        $("#off9").css("background-color", "rgba(153, 153, 153, 0.54902)").text("关");
                    }
                }
            }
        },
        "860": { //风速
            online: function() {},
            pro: function(tag, val) {
                if (tag == "A0") {
                    $("#fengsu").text(val + "m/s");
                    $(".hexIn div").removeClass("names-all");
                }
            }
        },
        "100": { //红外遥控
            online: function() {

            },
            pro: function(tag, val) {},
        },
        "862": {
            online: function() {

            },
            pro: function(tag, val) {
                if (tag == "A1") { //土壤温度
                    $("#soiltem").text(val + "℃");
                    $(".hexIn div").removeClass("names-all");
                    $("#tsoiltem").text(val);
                    if (ModeFlag == 1) {
                        if (timenow >= timestart && timenow < timeend) { //白天
                            if (val <= parseInt($("#soiltem1").val())) { //小于最小值
                                if (direFlag == 0) {
                                    rtc.sendMessage(relayMac, "{OD1=4,D1=?}"); //地热管道开
                                }
                            } else if (val > parseInt($("#soiltem1").val()) && val < soiltemmedian1) { //大于最小值小于中间值
                                if (fanFlag == 1) {
                                    rtc.sendMessage(fanMac, "{CD1=1,D1=?}"); //风扇关
                                }
                                if (diguangFlag == 1) {
                                    rtc.sendMessage(stepMac, "{CD1=2,D1=?}"); //滴灌关
                                }
                            } else if (val >= soiltemmedian1 && val < parseInt($("#soiltem2").val())) { //大于中间值小于最大值
                                if (direFlag == 1) {
                                    rtc.sendMessage(relayMac, "{CD1=4,D1=?}"); //地热管道开
                                }
                            } else if (val > parseInt($("#soiltem2").val())) { //大于最大值
                                if (fanFlag == 0) {
                                    rtc.sendMessage(fanMac, "{OD1=1,D1=?}"); //风扇开
                                }
                                if (diguangFlag == 0) {
                                    rtc.sendMessage(stepMac, "{OD1=2,D1=?}"); //滴灌开
                                }
                            }
                        } else { //夜晚
                            if (val <= parseInt($("#soiltem3").val())) { //小于最小值
                                if (direFlag == 0) {
                                    rtc.sendMessage(relayMac, "{OD1=4,D1=?}"); //地热管道开
                                }
                            } else if (val > parseInt($("#soiltem3").val()) && val < soiltemmedian2) { //大于最小值小于中间值
                                if (fanFlag == 1) {
                                    rtc.sendMessage(fanMac, "{CD1=1,D1=?}"); //风扇关
                                }
                                if (diguangFlag == 1) {
                                    rtc.sendMessage(stepMac, "{CD1=2,D1=?}"); //滴灌关
                                }
                            } else if (val >= soiltemmedian2 && val < parseInt($("#soiltem4").val())) { //大于中间值小于最大值
                                if (direFlag == 1) {
                                    rtc.sendMessage(relayMac, "{CD1=4,D1=?}"); //地热管道
                                }
                            } else if (val > parseInt($("#soiltem4").val())) { //大于最大值
                                if (fanFlag == 0) {
                                    rtc.sendMessage(fanMac, "{OD1=1,D1=?}"); //风扇开
                                }
                                if (diguangFlag == 0) {
                                    rtc.sendMessage(stepMac, "{OD1=2,D1=?}"); //滴灌开
                                }
                            }
                        }
                    }
                    countsoiltem.push(val);
                    if (countsoiltem.length >= 6) {
                        countsoiltem.splice(0, 1);
                    }
                    console.log("countCO2=" + countsoiltem + "----------length=" + countsoiltem.length);
                    if (timenamesoiltem) {
                        window.clearInterval(timenamesoiltem);
                    }
                    timenamesoiltem = setInterval(function() {
                        if (countsoiltem[0] < countsoiltem[4]) {
                            $("#imgsoliltem").attr("src", "images/topArrows.png");
                        } else if (countsoiltem[0] > countsoiltem[4]) {
                            $("#imgsoiltem").attr("src", "images/downArrows.png");
                        } else { $("#imgsoiltem").attr("src", "images/hengxian1.png"); }
                    }, 3000);
                }
                if (tag == "A0") { //土壤湿度
                    $("#soilhum").text(val + "%");
                    $(".hexIn div").removeClass("names-all");
                    $("#tsoilhum").text(val);
                    if (ModeFlag == 1) {
                        if (timenow >= timestart && timenow < timeend) { //白天
                            if (val <= parseInt($("#soilhum1").val())) { //小于最小值
                                if (diguangFlag == 0) {
                                    rtc.sendMessage(stepMac, "{OD1=2,D1=?}"); //滴灌开
                                }
                            } else if (val > parseInt($("#soilhum1").val()) && val < soilhummedian1) { //大于最小值小于中间值
                                if (fanFlag == 1) {
                                    rtc.sendMessage(fanMac, "{CD1=1,D1=?}"); //风扇关
                                }
                                if (temfanFlag == 1) {
                                    rtc.sendMessage(relayMac, "{CD1=1,D1=?}"); //电热风
                                }
                            } else if (val >= soilhummedian1 && val < parseInt($("#soilhum2").val())) { //大于中间值小于最大值
                                if (diguangFlag == 1) {
                                    rtc.sendMessage(stepMac, "{CD1=2,D1=?}"); //滴灌关
                                }
                            } else if (val > parseInt($("#soilhum2").val())) { //大于最大值
                                if (fanFlag == 0) {
                                    rtc.sendMessage(fanMac, "{OD1=1,D1=?}"); //风扇开
                                }
                                if (temfanFlag == 0) {
                                    rtc.sendMessage(relayMac, "{OD1=1,D1=?}"); //电热风机开
                                }
                            }
                        } else { //夜晚
                            if (val <= parseInt($("#soilhum3").val())) { //小于最小值
                                if (diguangFlag == 0) {
                                    rtc.sendMessage(stepMac, "{OD1=2,D1=?}"); //滴灌开
                                }
                            } else if (val > parseInt($("#soilhum3").val()) && val < soilhummedian2) { //大于最小值小于中间值
                                if (fanFlag == 1) {
                                    rtc.sendMessage(fanMac, "{CD1=1,D1=?}"); //风扇关
                                }
                                if (temfanFlag == 1) {
                                    rtc.sendMessage(relayMac, "{CD1=1,D1=?}"); //电热风
                                }
                            } else if (val >= soilhummedian2 && val < parseInt($("#soilhum4").val())) { //大于中间值小于最大值
                                if (diguangFlag == 1) {
                                    rtc.sendMessage(stepMac, "{CD1=2,D1=?}"); //滴灌关
                                }
                            } else if (val > parseInt($("#soilhum4").val())) { //大于最大值
                                if (fanFlag == 0) {
                                    rtc.sendMessage(fanMac, "{OD1=1,D1=?}"); //风扇开
                                }
                                if (temfanFlag == 0) {
                                    rtc.sendMessage(relayMac, "{OD1=1,D1=?}"); //电热风机开
                                }
                            }
                        }
                    }
                    countsoilhum.push(val);
                    if (countsoilhum.length >= 6) {
                        countsoilhum.splice(0, 1);
                    }
                    console.log("countCO2=" + countsoilhum + "----------length=" + countsoilhum.length);
                    if (timenamesoilhum) {
                        window.clearInterval(timenamesoilhum);
                    }
                    timenamesoilhum = setInterval(function() {
                        if (countsoilhum[0] < countsoilhum[4]) {
                            $("#imgsoilhum").attr("src", "images/topArrows.png");
                        } else if (countsoilhum[0] > countsoilhum[4]) {
                            $("#imgsoilhum").attr("src", "images/downArrows.png");
                        } else { $("#imgsoilhum").attr("src", "images/hengxian1.png"); }
                    }, 3000);
                }
            }
        }
    };
    //

    $("#autoMode").click(function() {
        $("marquee").text("fffffffff");
        if (connectFlag) {
            if ($("#autoMode").attr("title") == "modelSmart") {
                ModeFlag = 0;
                console.log(ModeFlag);
                $("#autoMode").attr("title", "modelHand").css("background-color", " #cec277").text("人工模式");
                $(".modeloff").css("display", "block");

                $("#informmodel").val("人工模式");
                message_show("人工模式设置成功！");
            } else {
                ModeFlag = 1;
                console.log(ModeFlag);
                $("#autoMode").attr("title", "modelSmart").css("background-color", "#428bca").text("智能模式");
                $(".modeloff").css("display", "none");
                $("#informmodel").val("智能模式");
                message_show("智能模式设置成功！");
            }
        } else {
            message_show("请正确输入IDKEY连接智云数据中心");
        }
    });
    //人工控制，开关按钮
    $("#off1").on("click", function() {
        if (connectFlag) {
            if (ModeFlag == 1) {
                message_show("当前为智能模式,请切换至人工模式进行操作.");
            } else if (ModeFlag == 0) {
                if (temfanFlag == 1) {
                    rtc.sendMessage(relayMac, "{CD1=1,D1=?}"); //向传感器发送数据
                } else {
                    rtc.sendMessage(relayMac, "{OD1=1,D1=?}"); //向传感器发送数据
                }
            }
        } else {
            message_show("实时数据连接断开！");
        }
    });
    $("#off2").on("click", function() {
        if (connectFlag) {
            if (ModeFlag == 1) {
                message_show("当前为智能模式,请切换至人工模式进行操作.");
            } else if (ModeFlag == 0) {
                if (humfanFlag == 1) {
                    rtc.sendMessage(relayMac, "{CD1=2,D1=?}"); //向传感器发送数据
                } else {
                    rtc.sendMessage(relayMac, "{OD1=2,D1=?}"); //向传感器发送数据
                }
            }
        } else {
            message_show("实时数据连接断开！");
        }
    });
    $("#off8").on("click", function() {
        if (connectFlag) {
            if (ModeFlag == 1) {
                message_show("当前为智能模式,请切换至人工模式进行操作.");
            } else if (ModeFlag == 0) {
                if (buguandengFlag == 1) {
                    rtc.sendMessage(relayMac, "{CD1=8,D1=?}"); //向传感器发送数据
                } else {
                    rtc.sendMessage(relayMac, "{OD1=8,D1=?}"); //向传感器发送数据
                }
            }
        } else {
            message_show("实时数据连接断开！");
        }
    });
    $("#off5").on("click", function() {
        if (connectFlag) {
            if (ModeFlag == 1) {
                message_show("当前为智能模式,请切换至人工模式进行操作.");
            } else if (ModeFlag == 0) {
                if (direFlag == 1) {
                    rtc.sendMessage(relayMac, "{CD1=4,D1=?}"); //向传感器发送数据
                } else {
                    rtc.sendMessage(relayMac, "{OD1=4,D1=?}"); //向传感器发送数据
                }
            }
        } else {
            message_show("实时数据连接断开！");
        }
    });
    $("#off4").on("click", function() {
        if (connectFlag) {
            if (ModeFlag == 1) {
                message_show("当前为智能模式,请切换至人工模式进行操作.");
            } else if (ModeFlag == 0) {
                if (fanFlag == 1) {
                    rtc.sendMessage(fanMac, "{CD1=1,D1=?}");
                } else {
                    rtc.sendMessage(fanMac, "{OD1=1,D1=?}");
                }
            }
        } else {
            message_show("实时数据连接断开！");
        }
    });
    $("#off6").on("click", function() {
        if (connectFlag) {
            if (ModeFlag == 1) {
                message_show("当前为智能模式,请切换至人工模式进行操作.");
            } else if (ModeFlag == 0) {
                if (diguangFlag == 1) {
                    rtc.sendMessage(stepMac, "{CD1=2,D1=?}");
                } else {
                    rtc.sendMessage(stepMac, "{OD1=2,D1=?}");
                }
            }
        } else {
            message_show("实时数据连接断开！");
        }
    });
    $("#off7").on("click", function() {
        if (connectFlag) {
            if (ModeFlag == 1) {
                message_show("当前为智能模式,请切换至人工模式进行操作.");
            } else if (ModeFlag == 0) {
                if (ganbinFlag == 1) {
                    rtc.sendMessage(magneticMac, "{CD1=1,D1=?}");
                } else {
                    rtc.sendMessage(magneticMac, "{OD1=1,D1=?}");
                }
            }
        } else {
            message_show("实时数据连接断开！");
        }
    });
    $("#off3").on("click", function() {
        if (connectFlag) {
            if (ModeFlag == 1) {
                message_show("当前为智能模式,请切换至人工模式进行操作.");
            } else if (ModeFlag == 0) {
                if (penlinFlag == 1) {
                    rtc.sendMessage(magneticMac, "{CD1=2,D1=?}");
                } else {
                    rtc.sendMessage(magneticMac, "{OD1=2,D1=?}");
                }
            }
        } else {
            message_show("实时数据连接断开！");
        }
    });
    $("#off9").on("click", function() {
        if (connectFlag) {
            if (ModeFlag == 1) {
                message_show("当前为智能模式,请切换至人工模式进行操作.");
            } else if (ModeFlag == 0) {
                if (zheyanFlag == 0) {
                    rtc.sendMessage(magneticMac, "{V1=360,OD1=4,D1=?}");
                } else if (zheyanFlag == 1) {
                    rtc.sendMessage(magneticMac, "{V1=360,OD1=8,D1=?}");
                }
            }
        } else {
            message_show("实时数据连接断开！");
        }
    });

    //bootstrap switch
    $("#buttonYuzhi").bootstrapSwitch();

    $("#buttonYuzhi").on('switchChange.bootstrapSwitch', function(event, status) {
        console.log("en");
        var by = 'off';
        if (status == true) {
            by = 'on';
        } else {}
        console.log(by);
    });
    $("#buttonJilu").bootstrapSwitch();

    $("#buttonJilu").on('switchChange.bootstrapSwitch', function(event, status) {
        console.log("en");
        var bj = 'off';
        if (status == true) {
            bj = 'on';
        } else {}
        console.log(bj);
    });
    /* 函数名: on_get_aid_akey
     * 功能: 浏览器初始化，读取到id和key后调用
     */
    function on_get_aid_akey(ak) {
        ak = ak ? ak : "";
        // console.log('get sv, aid, akey', ak);
        var a = ak.split(",");
        wsn_config.application.server = a[0] ? a[0] : "127.0.0.1:28080";
        wsn_config.application.aid = a[1] ? a[1] : "";
        wsn_config.application.akey = a[2] ? a[2] : "";

        $("#id_address").val(wsn_config.application.aid);
        $("#key_address").val(wsn_config.application.akey);
        $("#server_address").val(wsn_config.application.server);

        if (wsn_config.application.aid && wsn_config.application.akey) {

            rtc.setServerAddr(wsn_config.application.server);
            rtc.setIdKey(wsn_config.application.aid, wsn_config.application.akey);

            rtc.connect();
        }
    }

    /* 函数名: on_scan_idkey
     * 功能: 扫描到id和key后调用
     */
    function on_scan_idkey(idkey) {
        var it = idkey.split(",");
        if (it.length == 2) {
            var aid = it[0].split(':')[1];
            var akey = it[1].split(':')[1];
            $("#id_address").val(aid);
            $("#key_address").val(akey);
        }
    }

    function save_id_key() {
        var aid = $("#id_address").val();
        var akey = $("#key_address").val();
        var sv = $("#server_address").val();

        wsn_config.application.aid = aid;
        wsn_config.application.akey = akey;
        wsn_config.application.server = sv;

        rtc.setIdKey(aid, akey);
        if (sv.search(":") < 0) sv += ":28080";
        rtc.setServerAddr(sv);
        if (rtc._connect) {
            rtc.disconnect();
        } else {
            if (aid && akey) {
                rtc.connect();
            }
        }
        //断开后会自动重连
        if (window.droid) {
            window.droid.setProperty("aid_akey_sxgw", sv + "," + aid + "," + akey);
        } else {
            localStorage.aid_akey_sxgw = sv + "," + aid + "," + akey;
        }

    }
    $(function() {
        if (window.droid) {
            window.droid.getProperty("aid_akey_sxgw", "on_get_aid_akey");
            //window.droid.getProperty("devices_macs", "on_get_device_macs");
        } else {
            //on_get_device_macs(localStorage.devices_macs);
            on_get_aid_akey(localStorage.aid_akey_sxgw);
        }
        $("#id_scan").click(function() {
            /*mac1,mac2,mac3*/
            if (window.droid) {
                window.droid.requestScanQR("on_scan_idkey");
            }
        });
        $("#id_confirm").click(function() {
            save_id_key();
        });
        $("#id_share").click(function() {

        });
    });
    //摄像头
    /////////////////////////////////////////////////
    $(function() {
        $(".camera_btn").click(function() {
            var title = $(this).parents(".board").find(".board_title").text();
            var addre = $(this).attr("data-addr");
            console.log("data-addr:" + addre);
            //console.log(title);
            $("#cameraModal_title").text(title);
            $("#camera_address").val(addre);
            onOpenVideoWindow(title, addre);
        });

        if (window.droid) {
            window.droid.getProperty("_gw_camera", "on_get_gw_camera");
            //window.droid.getProperty("devices_macs", "on_get_device_macs");
        } else {
            //on_get_device_macs(localStorage.devices_macs);
            on_get_gw_camera(localStorage._gw_camera);
        }
        $("#switch").click(function() {
            $(this).button('loading');
            if (!openCamera) {
                open_video();
            } else { //关闭摄像头
                openCamera.closeVideo();
                openCamera = null;
                setTimeout(function() {
                    $("#img1").attr("src", "img/camera.jpg").css("display", "block");
                }, 200);
                $("#switch").button("reset").text("打开");
            }
        });
        $("#ct_up").click(function() {
            if (openCamera) openCamera.control("UP");
        });
        $("#ct_left").click(function() {
            if (openCamera) openCamera.control("LEFT");
        });
        $("#ct_down").click(function() {
            if (openCamera) openCamera.control("DOWN");
        });
        $("#ct_right").click(function() {
            if (openCamera) openCamera.control("RIGHT");
        });
        $("#ct_v").click(function() {
            if (openCamera) openCamera.control("VPATROL");
        });
        $("#ct_h").click(function() {
            if (openCamera) openCamera.control("HPATROL");
        });
        $("#ct_c").click(function() {
            if (openCamera) openCamera.control("360PATROL");
        });
    });
    var camera_cfg = {};
    var openCamera = null;
    var cwTitle = null;

    function on_get_gw_camera(s) {
        if (s) {
            camera_cfg = JSON.parse(s);
        }
    }

    function onOpenVideoWindow(title, addre) {
        cwTitle = title;
        if (camera_cfg[title]) {
            $("#camera_address").val(camera_cfg[title].addr);
            $("#camera_select").val(camera_cfg[title].type);
            $("#camera_name").val(camera_cfg[title].user);
            $("#camera_password").val(camera_cfg[title].pwd);
        } else {
            $("#camera_address").val(addre);
            $("#camera_select").val("H3-Series");
            $("#camera_name").val("admin");
            $("#camera_password").val("admin");
        }
    }

    function onCloseVideoWindow(title) {
        if (openCamera) {
            openCamera.closeVideo();
            openCamera = null;
        }
        $("#switch").button("reset");
    }


    function open_video() {
        var ca = $("#camera_address").val();
        var type = $("#camera_select").val();
        var user = $("#camera_name").val();
        var pwd = $("#camera_password").val();

        var myipcamera = new WSNCamera();
        openCamera = myipcamera;

        myipcamera.setDiv("img1"); //设置图像显示的位置
        console.log(ca, type, user, pwd);
        myipcamera.setServerAddr("zhiyun360.com:8002");
        myipcamera.initCamera(ca, user, pwd, type); //摄像头初始化
        myipcamera.checkOnline(function(state) {
            console.log('camera online', state);
            if (state == 1) {
                if (openCamera) {
                    openCamera.openVideo(); //打开摄像头并显示
                    $("#switch").button("reset").text("关闭");
                }
            } else {
                message_show("摄像头[" + ca + "]不在线！");
                $("#img1").attr("src", "img/camera.jpg").css("display", "block");
                $("#switch").button("reset").text("打开");
                openCamera = null;
            }
        });
        //保存摄像头信息
        cam = {
            addr: ca,
            type: type,
            user: user,
            pwd: pwd
        };
        camera_cfg[cwTitle] = cam;
        if (window.droid) {
            window.droid.setProperty("_gw_camera", JSON.stringify(camera_cfg));
        } else {
            localStorage._gw_camera = JSON.stringify(camera_cfg);
        }
    }
    //查询历史数据
    $("#HistoryDisplay").click(function() {
        /*
        // 实例化历史数据
        var myHisData = new WSNHistory(wsn_config.application.aid, wsn_config.application.akey);
        // 服务器接口查询
        myHisData.setServerAddr(wsn_config.application.server + ":8080");
        var time = $("#timeSet").val();
        var thMac = $("#type_002").val();
        // 设置时间
        console.log(time);
        // 设置数据通道
        var channel = thMac + "_A0";
        console.log(channel);
        myHisData[time](channel, function(dat) {
            if (dat.datapoints.length > 0) {
                var data = DataAnalysis(dat);
                showChart('#tem-number', 'spline', '', false, eval(data));
            } else {
                message_show("该时间段没有数据");
            }
        });
    })
    */
        selectCell($('#timeSet :selected').val());
    });
});

function selectCell(cell) {
    //cells 
    console.log(cell);
    $.ajax('/data/' + cell + '.json', {
        success: function(data) {
            $('#container').highcharts(data);
        }
    })
    $('#container').highcharts();



}