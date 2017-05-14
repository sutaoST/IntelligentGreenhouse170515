//var connectFlag = 0, macFlag = 0;
//var myZCloudID = "12345678"; //���к�
//var myZCloudKey = "12345678"; //��Կ
//var myZCloudServer = "12345678";//ʵʱ���ݽӿ�
//var rtc = 0;
////��������������
//var tempHumMac, temperData, humidityData;
//var windDirectionMac, directionData;
//var windSpeedMac, speedData;
//var co2Mac, co2Data;
//var lightMac, lightData;

//$("#idkeyInput").click(function() {
//    console.log("22222222222222");
//    myZCloudID = $("#id").val();
//    myZCloudKey = $("#key").val();
//    myZCloudServer = $("#server").val();
//    console.log(myZCloudID);
//    console.log(myZCloudKey);
//    console.log(myZCloudServer);
//    rtc = new WSNRTConnect(myZCloudID, myZCloudKey); //�����������ӷ������
//    rtc.setServerAddr(myZCloudServer + ":28080");
//    rtc.connect();
//
//    rtc.onConnect = function () { //���ӳɹ��ص�����
//        //$("#ConnectState").text("���ݷ������ӳɹ���");
//        connectFlag = 1;
//        message_show("���ݷ������ӳɹ���");
//    };
//});
    //
    //rtc.onConnectLost = function () { //���ݷ�����߻ص�����
    //    $("#ConnectState").text("���ݷ������ӵ��ߣ�");
    //    connectFlag = 0;
    //    message_show("���ݷ�������ʧ�ܣ���������IDKEY");
    //    //message_show("error");
    //    $("#temperStatus").text("����").css("color", "#e75d59");
    //    $("#humidityStatus").text("����").css("color", "#e75d59");
    //    $("#directionStatus").text("����").css("color", "#e75d59");
    //    $("#speedStatus").text("����").css("color", "#e75d59");
    //    $("#co2Status").text("����").css("color", "#e75d59");
    //    $("#lightStatus").text("����").css("color", "#e75d59");
    //};
//
//    rtc.onmessageArrive = function (mac, dat) { //��Ϣ����ص�����
//        if (mac == tempHumMac) { // �жϴ�����Mac��ַ
//            if (dat[0] == '{' && dat[dat.length - 1] == '}') { // �ж��ַ�����β�Ƿ�Ϊ{}
//                dat = dat.substr(1, dat.length - 2); // ��ȡ{}�ڵ��ַ���
//                var its = dat.split(','); // �ԡ�,�����ָ��ַ���
//                for (var x in its) {
//                    var t = its[x].split('='); // �ԡ�=�����ָ��ַ���
//                    if (t.length != 2) continue;
//                    if (t[0] == "A0") { // �жϲ���A0
//                        temperData = parseInt(t[1]);
//                        temperDisplay(temperData);
//                        //$("#temperStatus").text("����").css("color", "#96ba5c");
//                        //����ͼ��
//                        console.log("temperData=" + temperData);
//                    }
//                    if (t[0] == "A1") { // �жϲ���A0
//                        humidityData = parseInt(t[1]);
//                        humidityDisplay(humidityData);
//                        //$("#humidityStatus").text("����").css("color", "#96ba5c");
//                        //����ͼ��
//                        console.log("humidityData=" + humidityData);
//                    }
//                }
//            }
//        }
//        else if (mac == windDirectionMac) { // �жϴ�����Mac��ַ
//            if (dat[0] == '{' && dat[dat.length - 1] == '}') { // �ж��ַ�����β�Ƿ�Ϊ{}
//                dat = dat.substr(1, dat.length - 2); // ��ȡ{}�ڵ��ַ���
//                var its = dat.split(','); // �ԡ�,�����ָ��ַ���
//                for (var x in its) {
//                    var t = its[x].split('='); // �ԡ�=�����ָ��ַ���
//                    if (t.length != 2) continue;
//                    if (t[0] == "A0") { // �жϲ���A0
//                        directionData = parseInt(t[1]);
//                        windDirectionDisplay(directionData);
//                        //$("#directionStatus").text("����").css("color", "#96ba5c");
//                        ////����ͼ��
//                        console.log("directionData=" + directionData);
//                    }
//                }
//            }
//        }
//        else if (mac == windSpeedMac) { // �жϴ�����Mac��ַ
//            if (dat[0] == '{' && dat[dat.length - 1] == '}') { // �ж��ַ�����β�Ƿ�Ϊ{}
//                dat = dat.substr(1, dat.length - 2); // ��ȡ{}�ڵ��ַ���
//                var its = dat.split(','); // �ԡ�,�����ָ��ַ���
//                for (var x in its) {
//                    var t = its[x].split('='); // �ԡ�=�����ָ��ַ���
//                    if (t.length != 2) continue;
//                    if (t[0] == "A0") { // �жϲ���A0
//                        speedData = parseInt(t[1]);
//                        windSpeedDisplay(speedData);
//                        //$("#speedStatus").text("����").css("color", "#96ba5c");
//                        //����ͼ��
//                        console.log("speedData=" + speedData);
//                    }
//                }
//            }
//        }
//        else if (mac == co2Mac) { // �жϴ�����Mac��ַ
//            if (dat[0] == '{' && dat[dat.length - 1] == '}') { // �ж��ַ�����β�Ƿ�Ϊ{}
//                dat = dat.substr(1, dat.length - 2); // ��ȡ{}�ڵ��ַ���
//                var its = dat.split(','); // �ԡ�,�����ָ��ַ���
//                for (var x in its) {
//                    var t = its[x].split('='); // �ԡ�=�����ָ��ַ���
//                    if (t.length != 2) continue;
//                    if (t[0] == "A0") { // �жϲ���A0
//                        co2Data = parseInt(t[1]);
//                        CO2Display(co2Data);
//                        //$("#co2Status").text("����").css("color", "#96ba5c");
//                        //����ͼ��
//                        console.log("co2Data=" + co2Data);
//                    }
//                }
//            }
//        }
//        else if (mac == lightMac) { // �жϴ�����Mac��ַ
//            if (dat[0] == '{' && dat[dat.length - 1] == '}') { // �ж��ַ�����β�Ƿ�Ϊ{}
//                dat = dat.substr(1, dat.length - 2); // ��ȡ{}�ڵ��ַ���
//                var its = dat.split(','); // �ԡ�,�����ָ��ַ���
//                for (var x in its) {
//                    var t = its[x].split('='); // �ԡ�=�����ָ��ַ���
//                    if (t.length != 2) continue;
//                    if (t[0] == "A0") { // �жϲ���A0
//                        lightData = parseInt(t[1]);
//                        lightDisplay(lightData);
//                        //$("#lightStatus").text("����").css("color", "#96ba5c");
//                        //����ͼ��
//                        console.log("lightData=" + lightData);
//                    }
//                }
//            }
//        }
//    }
//});

//$("#setUp").click(function(){
//    message_show("��ǰ�������°汾");
//});
//
//$("#CO2HistoryDisplay").click(function(){
//    //��ʼ��api
//    var myHisData = new WSNHistory(myZCloudID, myZCloudKey);          //ʵ������ʷ����
//    myHisData.setServerAddr(myZCloudServer+":8080");                                 //�������ӿڲ�ѯ
//    var time = $("#CO2Set").val();                                                          //����ʱ��
//    console.log(time);
//    var channel = co2Mac+"_A0";                                                                                 //��������ͨ��
//    console.log(channel);
//    myHisData[time](channel, function(dat){
//        if(dat.datapoints.length >0) {
//            var data = DataAnalysis(dat);
//            //console.log(data);
//            showChart('#her_CO2', 'spline', '', false, eval(data));
//        } else {
//            message_show("��ʱ���û������");
//        }
//    });
//});

//��Ϣ������
/**
 * Created by zonesion on 2017/3/25.
 */
