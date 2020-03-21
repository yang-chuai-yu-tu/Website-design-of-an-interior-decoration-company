$(function() {
	var form = layui.form,
	layer = parent.layer === undefined ? layui.layer : top.layer,
	config = layui.config,
    laypage = layui.laypage,
    $ = layui.jquery;


    
	form.on("submit(applyFail)",function(data){
		// * 按钮禁用
		var isDisabled = $(".applyFail").hasClass('layui-btn-disabled');
		if (isDisabled) {
		    return false;
		}
		data.field.status='FAIL';
        applyProcess(data);
        return false;
    })
	
	form.on("submit(applyPass)",function(data){
        // * 按钮禁用
        var isDisabled = $(".applyPass").hasClass('layui-btn-disabled');
        if (isDisabled) {
            return false;
        }
        data.field.status='SUCCESS';
        applyProcess(data);
        return false;
    })
	
	form.on("submit(applyCancel)",function(data){
        // * 按钮禁用
        var isDisabled = $(".applyCancel").hasClass('layui-btn-disabled');
        if (isDisabled) {
            return false;
        }
        data.field.status='CANCEL';
        applyProcess(data);
        return false;
    })
	
	function applyProcess(data) {
		//弹出loading
        var index = top.layer.msg('处理提交中，请稍候',{icon: 16,time:false,shade:0.8});
        var processUrl = config.base_server+config.appointmentApproveUrl;
        if(data.field.processDate == ''){
        	var Pdate = new Date().toLocaleDateString();
            data.field.processDate = Pdate;
		}
        var applyProcessData = JSON.stringify(data.field);
        //console.log(applyProcessData);
        
        infJsonReq(processUrl, applyProcessData, 'POST', function (appointment) {
        	applyOpSuccess(appointment, "申请处理");
		}, index, top.layer);
	}
	
	function applyOpSuccess(appointment, msgPrefix) {
		if (appointment.status == 200 && appointment.data) {
			top.layer.msg(msgPrefix+"成功", {icon: 1,time:1000});
	        layer.closeAll("iframe");
			//刷新父页面
	        if (parent.$('#searchBtn')[0]) {
	            parent.$('#searchBtn').click();
	        } else {
	            parent.location.reload();
	        }
		} else {
			top.layer.msg(msgPrefix+"失败"+((appointment.error!=null&&appointment.error!=undefined)?(appointment.status+'-'+appointment.error):""), {icon: 2, time:1000});
		}
	}

});
