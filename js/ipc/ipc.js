	var BasicAuthorizationCode = function(username, password){
		"use strict";
    	var safeStr = unescape(encodeURIComponent(username + ':' + password));
    	var btoaCode = btoa(safeStr);
    	return 'Basic ' + btoaCode;
	};
	
	
	/*
	 * ����ͷ�����캯������Ҫ��������ͷid���û���������
	 */		
	var HIKIPCamera = function(id, user, pwd, cb){
		"use strict";
		var thiz = this;
		thiz.id = id;	
		thiz.user = user;
		thiz.pwd = pwd;
		
		
		thiz.PTZStatus={
			absoluteZoom:10,
			elevation:0,
			azimuth:0
		};
		
		thiz.status = {};
		thiz.getStatus(function(){
			if (thiz.status.online) {
		    	thiz.getPTZStatus(cb);
		    }
		});
		//thiz.getPTZStatus();
	};
	
	/*
	 * ��ȡ����ͷ��ǰ�Ƿ����ߣ�ip��ַ����Ϣ
	 */
	HIKIPCamera.prototype.getStatus = function(cb){
		"use strict";
		var thiz = this;
		$.ajax({
		    url: '/i/hikipc/devices?id='+thiz.id,
		    type: 'GET',
		    success:function(st){
		    	console.log(st);
		    	thiz.status = JSON.parse(st);
		    	if (cb){
		    	  //cb.apply(thiz);
		    	  cb.call(thiz);
		    	  //cb();
		    	}
		    }
		});
	};
	/*
	 *  ��ȡ����ͷ��ǰ��̨״̬
	 */
	HIKIPCamera.prototype.getPTZStatus = function(cb){
		"use strict";
		var thiz = this;
		$.ajax({
		    url: '/i/hikipc/status?id='+thiz.id,
		    type: 'GET',
		    beforeSend: function (xhr) {
		    	var username = thiz.user;
		    	var password = thiz.pwd;
		    	//console.log(username, password);
    			xhr.setRequestHeader ('Authorization', BasicAuthorizationCode(username, password));
			},
		    success: function( response ) {
		    	console.log(response);
		    	var camData = JSON.parse(response);
		    	thiz.PTZStatus = camData;
		    	if (cb) {
		    		//cb.apply(thiz, camData);
		    		cb.apply(thiz, camData);
		    		//cb(camData);
		    	}
		    },
		});
	}
	
	/*
	 * ��ȡ����ͷ��Ƶ����ַ�������ַ��
	 */
	HIKIPCamera.prototype.getAVStreamMain = function(){
		"use strict";
		var thiz = this;
		//rtsp://admin:zonesion0@192.168.0.106:554/ch1/main/av_stream
		
		if (thiz.status['ip']) {
			var url = "rtsp://"+thiz.user+":"+thiz.pwd+"@"+thiz.status['ip']+":554/ch1/main/av_stream";	
			return url;
		}
		return null;
	};
	/*
	 * ��ȡ����ͷ��Ƶ����ַ�������ַ��
	 */
	HIKIPCamera.prototype.getAVStreamSub = function(){
		"use strict";
		var thiz = this;
		if (thiz.status['ip']) {
			var url = "rtsp://"+thiz.user+":"+thiz.pwd+"@"+thiz.status['ip']+":554/ch1/sub/av_stream";	
			return url;
		}
		return null;
	};
	
	
	/*
	 * ����ͷ��̨���ƽӿ�
	 */
	 HIKIPCamera.prototype.PTZCtrl = function(){
	 	"use strict";
	 	var thiz = this;
	 	$.ajax({
		    url: '/i/hikipc/status?id='+thiz.id,
		    type: 'PUT',
		    data:JSON.stringify(thiz.PTZStatus),
		    beforeSend: function (xhr) {
		    	var username = thiz.user;
		    	var password = thiz.pwd;
		    	//console.log(username, password);
    			xhr.setRequestHeader ('Authorization', BasicAuthorizationCode(username, password));
			}
		});
	};
	/*
	 * ����ͷ��̨zoom���ƣ�������3������ȡֵ��Χ	
	//absoluteZoom 10 -- 200  
	*/
	HIKIPCamera.prototype.PTZCtrlZoom = function(d){
		"use strict";
		var thiz = this;
		if (!thiz.status['ip']) return;
		thiz.PTZStatus.absoluteZoom += d;
		if (thiz.PTZStatus.absoluteZoom<10) thiz.PTZStatus.absoluteZoom = 10;
		if (thiz.PTZStatus.absoluteZoom>200) thiz.PTZStatus.absoluteZoom = 200;
		thiz.PTZCtrl();
	};
	/*
	 * ��̨������� //azimuth 0 -- 3600  ��λ��
	 */
	HIKIPCamera.prototype.PTZCtrlAzimuth = function(d){
		"use strict";
		var thiz = this;
		if (!thiz.status['ip']) return;
		thiz.PTZStatus.azimuth += d;
		if (thiz.PTZStatus.azimuth>=3600) thiz.PTZStatus.azimuth %= 3600;
		if (thiz.PTZStatus.azimuth<0) thiz.PTZStatus.azimuth = 3600 - thiz.PTZStatus.azimuth;
		thiz.PTZCtrl();
	};
	/*
	 * ��̨��ֱ������� //elevation    0 -- 900  ��ֱ
	 */
	HIKIPCamera.prototype.PTZCtrlElevation = function(d){
		"use strict";
		var thiz = this;
		if (!thiz.status['ip']) return;
		thiz.PTZStatus.elevation += d;
		if (thiz.PTZStatus.elevation>=900) thiz.PTZStatus.elevation %= 900;
		if (thiz.PTZStatus.elevation<0) thiz.PTZStatus.elevation = 0;
		thiz.PTZCtrl();
	};
	