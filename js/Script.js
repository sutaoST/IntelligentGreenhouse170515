var datetime, nighttime, wd1, wd2, wd3, wd4, sd1, sd2, sd3, sd4, trwd1, trwd2, trwd3, trwd4, trsd1, trsd2, trsd3, trsd4, CO21, CO22, CO23, CO24, light1, light2, light3, light4;
var color = 0;

//定义本地存储参数
var localData = {
    daytime1: "",
    daytime2: "",
    nighttime1: "",
    nighttime2: "",
    tem1: "",
    tem2: "",
    tem3: "",
    tem4: "",
    hum1: "",
    hum2: "",
    hum3: "",
    hum4: "",
    soiltem1: "",
    soiltem2: "",
    soiltem3: "",
    soiltem4: "",
    soilhum1: "",
    soilhum2: "",
    soilhum3: "",
    soilhum4: "",
    CO2value1: "",
    CO2value2: "",
    CO2value3: "",
    CO2value4: "",
    lightvalue1: "",
    lightvalue2: "",
    lightvalue3: "",
    lightvalue4: "",
}


$(document).ready(function() {
    // // 获取本地存储
    get_localStorage();

    //主菜单Tab切换
    var $tab_li = $('#main li');
    $tab_li.click(function() {
        $(this).addClass('selected').siblings().removeClass('selected');
        var index = $(this).index();
        console.log(index);
        $('div.tab_box > div').eq(index).removeClass("hide").siblings("div").addClass("hide");
    });

    //$('.slick').slick();
    //阈值系统滑动条
    $('#motorNstSlider').nstSlider({
        "crossable_handles": false,
        "left_grip_selector": ".leftGrip",
        "right_grip_selector": ".rightGrip",
        "value_bar_selector": ".bar",
        "value_changed_callback": function(cause, leftValue, rightValue) {
            $(this).parent().find("#value3").text(leftValue);
            datetime = leftValue;
            $(this).parent().find('#value4 ').text(rightValue);
            nighttime = rightValue;
        }
    });
    $('#TemNstSlider').nstSlider({
        "crossable_handles": false,
        "left_grip_selector": ".leftGrip",
        "right_grip_selector": ".rightGrip",
        "value_bar_selector": ".bar",
        "value_changed_callback": function(cause, leftValue, rightValue) {
            $(this).parent().find("#valueTem1").text(leftValue);
            wd1 = leftValue;
            $(this).parent().find('#valueTem2 ').text(rightValue);
            wd2 = rightValue;
        }
    });
    $('#nightTemNstSlider').nstSlider({
        "crossable_handles": false,
        "left_grip_selector": ".leftGrip",
        "right_grip_selector": ".rightGrip",
        "value_bar_selector": ".bar",
        "value_changed_callback": function(cause, leftValue, rightValue) {
            $(this).parent().find("#valueTem3").text(leftValue);
            wd3 = leftValue;
            $(this).parent().find('#valueTem4 ').text(rightValue);
            wd4 = rightValue;
        }
    });
    $('#HumNstSlider').nstSlider({
        "crossable_handles": false,
        "left_grip_selector": ".leftGrip",
        "right_grip_selector": ".rightGrip",
        "value_bar_selector": ".bar",
        "value_changed_callback": function(cause, leftValue, rightValue) {
            $(this).parent().find("#valueHum1").text(leftValue);
            sd1 = leftValue;
            $(this).parent().find('#valueHum2 ').text(rightValue);
            sd2 = rightValue;
        }
    });
    $('#nightHumNstSlider').nstSlider({
        "crossable_handles": false,
        "left_grip_selector": ".leftGrip",
        "right_grip_selector": ".rightGrip",
        "value_bar_selector": ".bar",
        "value_changed_callback": function(cause, leftValue, rightValue) {
            $(this).parent().find("#valueHum3").text(leftValue);
            sd3 = leftValue;
            $(this).parent().find('#valueHum4 ').text(rightValue);
            sd4 = rightValue;
        }
    });
    $('#soilTemNstSlider').nstSlider({
        "crossable_handles": false,
        "left_grip_selector": ".leftGrip",
        "right_grip_selector": ".rightGrip",
        "value_bar_selector": ".bar",
        "value_changed_callback": function(cause, leftValue, rightValue) {
            $(this).parent().find("#valueSoilTem1").text(leftValue);
            trwd1 = leftValue;
            $(this).parent().find('#valueSoilTem2 ').text(rightValue);
            trwd2 = rightValue;
        }
    });
    $('#nightSoilTemNstSlider').nstSlider({
        "crossable_handles": false,
        "left_grip_selector": ".leftGrip",
        "right_grip_selector": ".rightGrip",
        "value_bar_selector": ".bar",
        "value_changed_callback": function(cause, leftValue, rightValue) {
            $(this).parent().find("#valueSoilTem3").text(leftValue);
            trwd3 = leftValue;
            $(this).parent().find('#valueSoilTem4 ').text(rightValue);
            trwd4 = rightValue;
        }

    });
    $('#soilHumNstSlider').nstSlider({
        "crossable_handles": false,
        "left_grip_selector": ".leftGrip",
        "right_grip_selector": ".rightGrip",
        "value_bar_selector": ".bar",
        "value_changed_callback": function(cause, leftValue, rightValue) {
            $(this).parent().find("#valueSoilHum1").text(leftValue);
            trsd1 = leftValue;
            $(this).parent().find('#valueSoilHum2 ').text(rightValue);
            trsd2 = rightValue;
        }
    });
    $('#nightSoilHumNstSlider').nstSlider({
        "crossable_handles": false,
        "left_grip_selector": ".leftGrip",
        "right_grip_selector": ".rightGrip",
        "value_bar_selector": ".bar",
        "value_changed_callback": function(cause, leftValue, rightValue) {
            $(this).parent().find("#valueSoilHum3").text(leftValue);
            trsd3 = leftValue;
            $(this).parent().find('#valueSoilHum4 ').text(rightValue);
            trsd4 = rightValue;
        }
    });
    $('#co2NstSlider').nstSlider({
        "crossable_handles": false,
        "left_grip_selector": ".leftGrip",
        "right_grip_selector": ".rightGrip",
        "value_bar_selector": ".bar",
        "value_changed_callback": function(cause, leftValue, rightValue) {
            $(this).parent().find("#valueco21").text(leftValue);
            CO21 = leftValue;
            $(this).parent().find('#valueco22 ').text(rightValue);
            CO22 = rightValue;
        }
    });
    $('#nightco2NstSlider').nstSlider({
        "crossable_handles": false,
        "left_grip_selector": ".leftGrip",
        "right_grip_selector": ".rightGrip",
        "value_bar_selector": ".bar",
        "value_changed_callback": function(cause, leftValue, rightValue) {
            $(this).parent().find("#valueco23").text(leftValue);
            CO23 = leftValue;
            $(this).parent().find('#valueco24 ').text(rightValue);
            CO24 = rightValue;
        }
    });
    $('#LightNstSlider').nstSlider({
        "crossable_handles": false,
        "left_grip_selector": ".leftGrip",
        "right_grip_selector": ".rightGrip",
        "value_bar_selector": ".bar",
        "value_changed_callback": function(cause, leftValue, rightValue) {
            $(this).parent().find("#valuelight1").text(leftValue);
            light1 = leftValue;
            $(this).parent().find('#valuelight2 ').text(rightValue);
            light2 = rightValue;
        }
    });
    $('#nightNstSlider').nstSlider({
        "crossable_handles": false,
        "left_grip_selector": ".leftGrip",
        "right_grip_selector": ".rightGrip",
        "value_bar_selector": ".bar",
        "value_changed_callback": function(cause, leftValue, rightValue) {
            $(this).parent().find("#valuelight3").text(leftValue);
            light3 = leftValue;
            $(this).parent().find('#valuelight4 ').text(rightValue);
            light4 = rightValue;
        }
    });
    //主菜单点击变化
    $("#menuImg1").click(
        function() {
            $("#menuImg1").addClass("change");
            $("#menuImg2").removeClass("change");
            $("#menuImg3").removeClass("change");
            $("#menuImg4").removeClass("change");
        }
    );
    $("#menuImg2").click(
        function() {
            $("#menuImg2").addClass("change");
            $("#menuImg1").removeClass("change");
            $("#menuImg3").removeClass("change");
            $("#menuImg4").removeClass("change");
        }
    );
    $("#menuImg3").click(
        function() {
            $("#menuImg3").addClass("change");
            $("#menuImg1").removeClass("change");
            $("#menuImg2").removeClass("change");
            $("#menuImg4").removeClass("change");
        }
    );

    //补光灯开关
    // $(".switchColorSelect").on("click", function () {
    //     if ($(this).attr("title") == "off") {
    //         $(this).attr("title", "on");
    //     } else {
    //         $(this).attr("title", "off");
    //     }
    // });
    //色块选择打勾效果

    // $("#colorWhite").click(function () {
    //     $("#dui1").removeClass("duigou");
    //     $("#dui2").addClass("duigou");
    //     $("#dui3").addClass("duigou");
    //     $("#dui4").addClass("duigou");
    //     $("#dui5").addClass("duigou");
    //     $("#dui6").addClass("duigou");
    //     $("#dui7").addClass("duigou");
    //     color=0;
    // });
    // $("#colorRed").click(function () {
    //     $("#dui1").addClass("duigou");
    //     $("#dui2").removeClass("duigou");
    //     $("#dui3").addClass("duigou");
    //     $("#dui4").addClass("duigou");
    //     $("#dui5").addClass("duigou");
    //     $("#dui6").addClass("duigou");
    //     $("#dui7").addClass("duigou");
    //     color=1;
    // });
    //
    // $("#colorFf").click(function () {
    //     $("#dui1").addClass("duigou");
    //     $("#dui2").addClass("duigou");
    //     $("#dui3").removeClass("duigou");
    //     $("#dui4").addClass("duigou");
    //     $("#dui5").addClass("duigou");
    //     $("#dui6").addClass("duigou");
    //     $("#dui7").addClass("duigou");
    //     color=2;
    // });
    // $("#colorBlue").click(function () {
    //     $("#dui1").addClass("duigou");
    //     $("#dui2").addClass("duigou");
    //     $("#dui3").addClass("duigou");
    //     $("#dui4").removeClass("duigou");
    //     $("#dui5").addClass("duigou");
    //     $("#dui6").addClass("duigou");
    //     $("#dui7").addClass("duigou");
    //     color=3;
    // });
    // $("#color02").click(function () {
    //     $("#dui1").addClass("duigou");
    //     $("#dui2").addClass("duigou");
    //     $("#dui3").addClass("duigou");
    //     $("#dui4").addClass("duigou");
    //     $("#dui5").removeClass("duigou");
    //     $("#dui6").addClass("duigou");
    //     $("#dui7").addClass("duigou");
    //     color=4;
    // });
    // $("#color06").click(function () {
    //     $("#dui1").addClass("duigou");
    //     $("#dui2").addClass("duigou");
    //     $("#dui3").addClass("duigou");
    //     $("#dui4").addClass("duigou");
    //     $("#dui5").addClass("duigou");
    //     $("#dui6").removeClass("duigou");
    //     $("#dui7").addClass("duigou");
    //     color=5;
    // });
    // $("#colorYellow").click(function () {
    //     $("#dui1").addClass("duigou");
    //     $("#dui2").addClass("duigou");
    //     $("#dui3").addClass("duigou");
    //     $("#dui4").addClass("duigou");
    //     $("#dui5").addClass("duigou");
    //     $("#dui6").addClass("duigou");
    //     $("#dui7").removeClass("duigou");
    //     color=6;
    // });
    //进度条
    $(".ystep").loadStep({
        size: "large",
        color: "blue",
        steps: [{
            title: "1级",
        }, {
            title: "2级",
        }, {
            title: "3级",
        }, {
            title: "4级",
        }, {
            title: "5级",
        }]
    });
    $(".ystep").setStep(2);

    //滚幕滑动效果
    $(".afficheInform").hide();
    $("#affiche").click(function() {
        $(".afficheInform").slideToggle("slow");
    });

    //生长记录图片
    // $("#picture1").click(function(){
    //     message_show("暂无本地图片")
    // });
    // $("#picture2").click(function(){
    //     message_show("暂无本地图片")
    // });
    // $("#picture3").click(function(){
    //     message_show("暂无本地图片")
    // });

    //获取系统时间
    document.getElementById('istime').innerHTML = new Date().toLocaleTimeString();
    setInterval("document.getElementById('istime').innerHTML=new Date().toLocaleTimeString();", 1000);

    $(".modeloff img").on("click", function() {
        $(".off").attr("title", "off").css("background-color", "rgba(153, 153, 153, 0.55)").text("关");
    });
    $(".modeloff span").on("click", function() {
        $(".off").attr("title", "off").css("background-color", "rgba(153, 153, 153, 0.55)").text("关");
    });
    $(".timesure").click(function() {
        message_show("拍照时间设置成功")
    });
    $("#look").click(function() {
        $(".lookhide").slideToggle("slow")
    });
    //下拉框
    $(".list").click(function() {
        var listname = $(this).text();
        console.log(listname);
        $("#select").text(listname);
        $("#punchTitle").text(listname + "生长环境");
        reload();
    });
    var curIndex = 0;
    //下拉框的添加
    $("#suertianjia").click(function() {
        message_show("新作物添加成功！");
        var newname = $("#name").val();
        $("<li class='newone'>" + newname + "<img class='delete' data-toggle='modal' data-target='#myModal6' src='images/delete1.png'/></li>").insertBefore("#tianjia");
        $(".delete").on("click", function(event) {

        });
        $(".newone").click(function() {
            var newonename = $(this).text();
            $("#select").text(newonename);
            $("#punchTitle").text(newonename + "生长环境");
            reload();
        });
    });
    //下拉框的删除
    $("#myModal6").on("show.bs.modal", function(e) {
        curIndex = $(e.relatedTarget).parent("li").index();
        $("#changename").text("确认删除" + $(e.relatedTarget).parent("li").text() + "？");
    });
    $("#suerdelete").click(function(event) {
        $(".dropdown-menu li:eq(" + curIndex + ")").remove();
        $("#select").text("菜苔");
        $("#punchTitle").text("菜苔生长环境");
        message_show("删除成功！")
    });
    $("#suretime").click(function() {
        $("#daytime1").val(datetime);
        $("#daytime2").val(nighttime);
        $("#nighttime1").val(nighttime);
        $("#nighttime2").val(datetime);
    });
    $("#sureTem").click(function() {
        $("#tem1").val(wd1);
        $("#tem2").val(wd2);
        $("#tem3").val(wd3);
        $("#tem4").val(wd4);
    });
    $("#sureHum").click(function() {
        $("#hum1").val(sd1);
        $("#hum2").val(sd2);
        $("#hum3").val(sd3);
        $("#hum4").val(sd4);
    });
    $("#sureSoilTem").click(function() {
        $("#soiltem1").val(trwd1);
        $("#soiltem2").val(trwd2);
        $("#soiltem3").val(trwd3);
        $("#soiltem4").val(trwd4);
    });
    $("#sureSoilHum").click(function() {
        $("#soilhum1").val(trsd1);
        $("#soilhum2").val(trsd2);
        $("#soilhum3").val(trsd3);
        $("#soilhum4").val(trsd4);
    });
    $("#sureCO2").click(function() {
        $("#CO2value1").val(CO21);
        $("#CO2value2").val(CO22);
        $("#CO2value3").val(CO23);
        $("#CO2value4").val(CO24);
    });
    $("#sureLight").click(function() {
        $("#lightvalue1").val(light1);
        $("#lightvalue2").val(light2);
        $("#lightvalue3").val(light3);
        $("#lightvalue4").val(light4);
    });
    //将对象解析成字符串并且赋值
    $("#suretime").click(function() {
        localData.daytime1 = $("#daytime1").val();
        localData.daytime2 = $("#daytime2").val();
        localData.nighttime1 = $("#nighttime1").val();
        localData.nighttime2 = $("#nighttime2").val();
        // console.log(localData.daytime1);
        // console.log(localData.daytime2);
        localStorage.greenhouse = JSON.stringify(localData);
    })
    $("#sureTem").click(function() {
        localData.tem1 = $("#tem1").val();
        localData.tem2 = $("#tem2").val();
        localData.tem3 = $("#tem3").val();
        localData.tem4 = $("#tem4").val();
        localStorage.greenhouse = JSON.stringify(localData);
    })
    $("#sureHum").click(function() {
        localData.hum1 = $("#hum1").val();
        localData.hum2 = $("#hum2").val();
        localData.hum3 = $("#hum3").val();
        localData.hum4 = $("#hum4").val();
        localStorage.greenhouse = JSON.stringify(localData);
    })

    $("#sureSoilTem").click(function() {
        localData.soiltem1 = $("#soiltem1").val();
        localData.soiltem2 = $("#soiltem2").val();
        localData.soiltem3 = $("#soiltem3").val();
        localData.soiltem4 = $("#soiltem4").val();
        localStorage.greenhouse = JSON.stringify(localData);
    })

    $("#sureSoilHum").click(function() {
        localData.soilhum1 = $("#soilhum1").val();
        localData.soilhum2 = $("#soilhum2").val();
        localData.soilhum3 = $("#soilhum3").val();
        localData.soilhum4 = $("#soilhum4").val();
        localStorage.greenhouse = JSON.stringify(localData);
    })

    $("#sureCO2").click(function() {
        localData.CO2value1 = $("#CO2value1").val();
        localData.CO2value2 = $("#CO2value2").val();
        localData.CO2value3 = $("#CO2value3").val();
        localData.CO2value4 = $("#CO2value4").val();
        localStorage.greenhouse = JSON.stringify(localData);
    })

    $("#sureLight").click(function() {
            localData.lightvalue1 = $("#lightvalue1").val();
            localData.lightvalue2 = $("#lightvalue2").val();
            localData.lightvalue3 = $("#lightvalue3").val();
            localData.lightvalue4 = $("#lightvalue4").val();
            localStorage.greenhouse = JSON.stringify(localData);
        })
        //     if(localStorage.greenhouse){
        //     localData=JSON.parse(localStorage.greenhouse);
        //     console.log("读取:localStorage:local="+JSON.stringify(localData));
        //     if(localData){
        //         var newObj=localData;
        //         for(var i in newObj){
        //             // console.log("i="+i+"---newObj[i]="+newObj[i])
        //             $('#'+i).val(newObj[i]);
        //         }
        //
        //     }
        // }

    //获取本地localStorage缓存数据
    function get_localStorage() {
        if (localStorage.greenhouse) {
            localData = JSON.parse(localStorage.greenhouse);
            console.log("localData=" + localData);
            for (var i in localData) {
                if (!localData[i] == "") {
                    eval("$('#" + i + "').val(localData." + i + ")");
                    console.log("i=" + i + ";;  data1:" + localData[i]);
                }
            }
        }
    }
    //查询数据
    // var arr=["daytime1","daytime2","nighttime1","nighttime2"];
    // var arr1 = [
    //     {start:$("#daytime1").val(),end: $("#daytime2").val()},
    //     {start:$("#daytime1").val(),end: $("#daytime2").val()},
    //     {start:'3',end:'4'},
    //     {start:'4',end:'5'},
    // ]
    // var arr2=[
    //     {start:$("#nighttime1").val(),end: $("#nighttime2").val()}
    // ]
    // var  obj=$(".dropdown-menu .list");
    //
    // obj.on("click",function(){
    //     var index = obj.index(this);
    //     $('#Datetime input').eq(0).val(arr1[index].start);
    //     $('#Datetime input').eq(1).val(arr1[index].end);
    //     $('#nighttime input').eq(0).val(arr2[index].start);
    //     $('#nighttime input').eq(1).val(arr2[index].end);
    // });

    $("#suermoshi").click(function() {
        message_show($("#select").text() + "模式使用成功！");
        $("#informzuowu").val($("#select").text());
    });

    //点击刷新图表事件
    $("#label4").click(function() {
        setTimeout(function() {
            $('#container').highcharts({
                chart: {
                    type: 'spline'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: { // don't display the dummy year
                        month: '%e. %b',
                        year: '%b'
                    },
                    title: {
                        text: 'Date'
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    min: 0
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
                },
                plotOptions: {
                    spline: {
                        marker: {
                            enabled: true
                        }
                    }
                },
                series: [{
                        name: '温度历史记录',
                        // Define the data points. All series have a dummy year
                        // of 1970/71 in order to be compared on the same x axis. Note
                        // that in JavaScript, months start at 0 for January, 1 for February etc.
                        data: [
                            [Date.UTC(1970, 9, 27), 0],
                            [Date.UTC(1970, 10, 10), 0.6],
                            [Date.UTC(1970, 10, 18), 0.7],
                            [Date.UTC(1970, 11, 2), 0.8],
                            [Date.UTC(1970, 11, 9), 0.6],
                            [Date.UTC(1970, 11, 16), 0.6],
                            [Date.UTC(1970, 11, 28), 0.67],
                            [Date.UTC(1971, 0, 1), 0.81],
                            [Date.UTC(1971, 0, 8), 0.78],
                            [Date.UTC(1971, 0, 12), 0.98],
                            [Date.UTC(1971, 0, 27), 1.84],
                            [Date.UTC(1971, 1, 10), 1.80],
                            [Date.UTC(1971, 1, 18), 1.80],
                            [Date.UTC(1971, 1, 24), 1.92],
                            [Date.UTC(1971, 2, 4), 2.49],
                            [Date.UTC(1971, 2, 11), 2.79],
                            [Date.UTC(1971, 2, 15), 2.73],
                            [Date.UTC(1971, 2, 25), 2.61],
                            [Date.UTC(1971, 3, 2), 2.76],
                            [Date.UTC(1971, 3, 6), 2.82],
                            [Date.UTC(1971, 3, 13), 2.8],
                            [Date.UTC(1971, 4, 3), 2.1],
                            [Date.UTC(1971, 4, 26), 1.1],
                            [Date.UTC(1971, 5, 9), 0.25],
                            [Date.UTC(1971, 5, 12), 0]
                        ]
                    }, {
                        name: '湿度历史记录',
                        data: [
                            [Date.UTC(1970, 9, 18), 0.6],
                            [Date.UTC(1970, 9, 26), 0.52],
                            [Date.UTC(1970, 11, 1), 0.47],
                            [Date.UTC(1970, 11, 11), 0.55],
                            [Date.UTC(1970, 11, 25), 1.38],
                            [Date.UTC(1971, 0, 8), 1.38],
                            [Date.UTC(1971, 0, 15), 1.38],
                            [Date.UTC(1971, 1, 1), 1.38],
                            [Date.UTC(1971, 1, 8), 1.48],
                            [Date.UTC(1971, 1, 21), 1.5],
                            [Date.UTC(1971, 2, 12), 1.89],
                            [Date.UTC(1971, 2, 25), 2.0],
                            [Date.UTC(1971, 3, 4), 1.94],
                            [Date.UTC(1971, 3, 9), 1.91],
                            [Date.UTC(1971, 3, 13), 1.75],
                            [Date.UTC(1971, 3, 19), 1.6],
                            [Date.UTC(1971, 4, 25), 0.6],
                            [Date.UTC(1971, 4, 31), 0.35],
                            [Date.UTC(1971, 5, 7), 0]
                        ]
                    }, {
                        name: '土壤温度历史记录',
                        data: [
                            [Date.UTC(1970, 9, 9), 0],
                            [Date.UTC(1970, 9, 14), 0.15],
                            [Date.UTC(1970, 10, 28), 0.35],
                            [Date.UTC(1970, 11, 12), 0.26],
                            [Date.UTC(1971, 0, 1), 0.39],
                            [Date.UTC(1971, 0, 24), 0.28],
                            [Date.UTC(1971, 1, 1), 0.42],
                            [Date.UTC(1971, 1, 7), 0.55],
                            [Date.UTC(1971, 1, 23), 0.17],
                            [Date.UTC(1971, 2, 8), 0.07],
                            [Date.UTC(1971, 2, 14), 0.29],
                            [Date.UTC(1971, 2, 24), 0.36],
                            [Date.UTC(1971, 3, 4), 0.48],
                            [Date.UTC(1971, 3, 18), 0.54],
                            [Date.UTC(1971, 3, 24), 0.69],
                            [Date.UTC(1971, 4, 16), 0.79],
                            [Date.UTC(1971, 4, 21), 0]
                        ]
                    }, {
                        name: '土壤湿度度历史记录',
                        data: [
                            [Date.UTC(1970, 9, 9), 1.00],
                            [Date.UTC(1970, 9, 14), 1.06],
                            [Date.UTC(1970, 10, 28), 1.2],
                            [Date.UTC(1970, 11, 12), 1],
                            [Date.UTC(1971, 0, 1), 0.50],
                            [Date.UTC(1971, 0, 24), 0.56],
                            [Date.UTC(1971, 1, 1), 0.9],
                            [Date.UTC(1971, 1, 7), 0.97],
                            [Date.UTC(1971, 1, 23), 0.77],
                            [Date.UTC(1971, 2, 8), 0.77],
                            [Date.UTC(1971, 2, 14), 0.89],
                            [Date.UTC(1971, 2, 24), 0.86],
                            [Date.UTC(1971, 3, 4), 0.8],
                            [Date.UTC(1971, 3, 18), 0.94],
                            [Date.UTC(1971, 3, 24), 0.9],
                            [Date.UTC(1971, 4, 16), 0.39],
                            [Date.UTC(1971, 4, 21), 0]
                        ]
                    }, {
                        name: 'CO2浓度历史记录',
                        data: [
                            [Date.UTC(1970, 9, 9), 0],
                            [Date.UTC(1970, 9, 14), 0.15],
                            [Date.UTC(1970, 10, 28), 0.35],
                            [Date.UTC(1970, 11, 12), 0.46],
                            [Date.UTC(1971, 0, 1), 0.59],
                            [Date.UTC(1971, 0, 24), 0.58],
                            [Date.UTC(1971, 1, 1), 0.62],
                            [Date.UTC(1971, 1, 7), 0.65],
                            [Date.UTC(1971, 1, 23), 0.77],
                            [Date.UTC(1971, 2, 8), 0.77],
                            [Date.UTC(1971, 2, 14), 0.79],
                            [Date.UTC(1971, 2, 24), 0.86],
                            [Date.UTC(1971, 3, 4), 0.8],
                            [Date.UTC(1971, 3, 18), 0.94],
                            [Date.UTC(1971, 3, 24), 0.9],
                            [Date.UTC(1971, 4, 16), 0.39],
                            [Date.UTC(1971, 4, 21), 0]
                        ]
                    }, {
                        name: '光照度历史记录',
                        data: [
                            [Date.UTC(1970, 9, 9), 0],
                            [Date.UTC(1970, 9, 14), 0.25],
                            [Date.UTC(1970, 10, 28), 0.15],
                            [Date.UTC(1970, 11, 12), 0.26],
                            [Date.UTC(1971, 0, 1), 0.49],
                            [Date.UTC(1971, 0, 24), 0.68],
                            [Date.UTC(1971, 1, 1), 0.72],
                            [Date.UTC(1971, 1, 7), 0.85],
                            [Date.UTC(1971, 1, 23), 0.77],
                            [Date.UTC(1971, 2, 8), 0.67],
                            [Date.UTC(1971, 2, 14), 0.59],
                            [Date.UTC(1971, 2, 24), 0.46],
                            [Date.UTC(1971, 3, 4), 0.38],
                            [Date.UTC(1971, 3, 18), 0.24],
                            [Date.UTC(1971, 3, 24), 0.9],
                            [Date.UTC(1971, 4, 16), 0.19],
                            [Date.UTC(1971, 4, 21), 0]
                        ]
                    }

                ]
            });
        }, 0)
    })
});
//大棚安全摄像头
function show() {
    if ($("#turnon").attr("title") == "off") {
        document.getElementById("turnon").title = "on";
        document.getElementById("turnon").style.backgroundImage = "url(images/on.png)";
        $("#up1").removeAttr("disabled");
        $("#left1").removeAttr("disabled");
        $("#right1").removeAttr("disabled");
        $("#under1").removeAttr("disabled");

        $("#ct_v").removeAttr("disabled");
        $("#ct_h").removeAttr("disabled");
        $("#ct_c").removeAttr("disabled");
        $("#ct_paizhao").removeAttr("disabled");

        $("#vidioDiv").animate({ width: "0", height: "0" }, 300);

    } else if ($("#turnon").attr("title") == "on") {
        document.getElementById("turnon").title = "off";
        document.getElementById("turnon").style.backgroundImage = "url(images/off.png)";
        $("#up1").removeAttr("disabled");
        $("#left1").removeAttr("disabled");
        $("#right1").removeAttr("disabled");
        $("#under1").removeAttr("disabled");

        $("#ct_v").attr("disabled", "disabled");
        $("#ct_h").attr("disabled", "disabled");
        $("#ct_c").attr("disabled", "disabled");
        $("#ct_paizhao").attr("disabled", "disabled");

        $("#vidioDiv").animate({ width: "100%", height: "100%" }, 300);
    }
}
//生长记录摄像头
function show1() {
    if ($("#turnon1").attr("title") == "off") {
        document.getElementById("turnon1").title = "on";
        document.getElementById("turnon1").style.backgroundImage = "url(images/on.png)";
        $("#up").removeAttr("disabled");
        $("#left").removeAttr("disabled");
        $("#right").removeAttr("disabled");
        $("#under").removeAttr("disabled");

        $("#ct_v2").removeAttr("disabled");
        $("#ct_h2").removeAttr("disabled");
        $("#ct_c2").removeAttr("disabled");
        $("#ct_paizhao2").removeAttr("disabled");

        $("#img1").animate({ width: "0", height: "0" }, 300);
    } else if ($("#turnon1").attr("title") == "on") {
        document.getElementById("turnon1").title = "off";
        document.getElementById("turnon1").style.backgroundImage = "url(images/off.png)";
        $("#up").removeAttr("disabled");
        $("#left").removeAttr("disabled");
        $("#right").removeAttr("disabled");
        $("#under").removeAttr("disabled");

        $("#ct_v2").attr("disabled", "disabled");
        $("#ct_h2").attr("disabled", "disabled");
        $("#ct_c2").attr("disabled", "disabled");
        $("#ct_paizhao2").attr("disabled", "disabled");

        $("#img1").animate({ width: "100%", height: "100%" }, 300);
    }
}

//消息弹出框
var message_timer = null;

function message_show(t) {
    if (message_timer) {
        clearTimeout(message_timer);
    }
    message_timer = setTimeout(function() {
        $("#toast").hide();
    }, 3000);
    $("#toast_txt").text(t);
    $("#toast").show();
}



var loading_timer = null;

function reload() {
    if (loading_timer) {
        clearTimeout(loading_timer);
    }
    loading_timer = setTimeout(function() {
        $("#bonfire-pageloader").hide();
    }, 500);
    $("#bonfire-pageloader").show();
}

function showChart(sid, ctype, unit, step, data) {
    $(sid).highcharts({
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
            formatter: function() {
                return '' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br><b>' + this.y + unit + '</b>';
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
            marker: {
                symbol: 'square'
            },
            data: data,
            step: step

        }],
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }
    });
}

//将JSON格式的数据转换成[x1,y1],[x2,y2],[x3,y3]...格式的数组
function DataAnalysis(data, timezone) {
    var str = '';
    var temp;
    var len = data.datapoints.length;
    if (timezone == null) {
        timezone = "+8";
    }
    var zoneOp = timezone.substring(0, 1);
    var zoneVal = timezone.substring(1);
    //var tzSecond = zoneVal*3600000; 修改于2015年2月1日 连接自己的数据服务器没用到时区参数
    var tzSecond = 0;
    $.each(data.datapoints, function(i, ele) {
        if (zoneOp == '+') {
            temp = Date.parse(ele.at) + tzSecond;
        }
        if (zoneOp == '-') {
            temp = Date.parse(ele.at) - tzSecond;
        }
        if (ele.value.indexOf("http") != -1) {
            str = str + '[' + temp + ',"' + ele.value + '"]';
        } else {
            str = str + '[' + temp + ',' + ele.value + ']';
        }
        if (i != len - 1)
            str = str + ',';
    });
    return "[" + str + "]";
}
$("#myTab li").click(function() {
    $("#myTab li a").css("background", "#ddd");

})

/**
 * Created by zonesion on 2017/2/24.
 */