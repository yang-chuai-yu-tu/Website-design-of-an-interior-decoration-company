//获取表单弹窗页面数据
function showAppointment(data) {
	if(data == null || data.id == null || data.id == "") {
		layer.msg('预约编号为空', {
			icon: 2
		});
	} else {
		var applyUrl = layui.config.base_server+layui.config.appointmentInfoUrl+data.id;
		infJsonReq(applyUrl, {}, 'GET', function (appointment) {
			if(appointment.status == 200 && appointment.data != null) {
				showApplyModel(appointment.data);
			} else {
				layer.msg((appointment.error == null || appointment.error == undefined) ? ("未查到流水号[" + data.id + "]预约") : (appointment.status + '-' + appointment.error), {icon: 2});
			}
		});
	}
}

function showAndDisableBtn(btn) {
    btn.removeClass("layui-hide").removeAttr("lay-submit").addClass("layui-btn-disabled").attr("disabled","disabled");
}
    
function showAndEnableBtn(btn) {
    btn.removeClass("layui-hide layui-btn-disabled").attr("lay-submit","").removeAttr("disabled");
}

//显示表单弹窗
function showApplyModel(data) {
           
	var childLayerIndex = layui.layer.open({
		title: (data.status == 'CREATE' ? "预约处理" : "预约查看") ,
		type: 2,
		content: layui.config.appointmnetInfoPage,
		success: function(layero, index) {
			var body = layui.layer.getChildFrame('body', index);
			body.find("#id").val(data.id);
			body.find("#status").val(data.status);
            body.find(".idBiz").val(nullData(data.id));
            body.find(".nameBiz").val(nullData(data.customerName));
            body.find(".adateBiz").val(nullData(data.orderDate));
            body.find(".phoneBiz").val(nullData(data.phoneNum));
            body.find(".locationBiz").val(nullData(data.province));
            body.find(".designerBiz").val(nullData(data.designerName));
			var applyPassCls = body.find(".applyPass");
			var applyFailCls = body.find(".applyFail");
			var applyCancelCls = body.find(".applyCancel");
			var applyProcessNoteEle = body.find("#apply_process_note");
			if(data.status == 'CREATE') { //创建状态
				showAndEnableBtn(applyPassCls);
				showAndEnableBtn(applyFailCls);
				showAndEnableBtn(applyCancelCls);
				applyProcessNoteEle.removeAttr("disabled");
			} else {
				applyProcessNoteEle.attr("disabled", "disabled");
				if(data.status == 'CANCEL') { //预约取消
					//显示“预约取消”状态，但不可点
					showAndDisableBtn(applyCancelCls);
                    applyPassCls.addClass("layui-hide");
                    applyFailCls.addClass("layui-hide");
				} else if(data.status == 'SUCCESS') { //预约成功
                    applyCancelCls.addClass("layui-hide");
					showAndDisableBtn(applyPassCls);
                    applyFailCls.addClass("layui-hide");
				} else {//预约失败
                    applyCancelCls.addClass("layui-hide");
                    applyPassCls.addClass("layui-hide");
                    showAndDisableBtn(applyFailCls);
                }
			}

			
			applyProcessNoteEle.text(nullData(data.note));

			layui.form.render();
			
			setTimeout(function() {
				layui.layer.tips('点击此处返回申请列表', '.layui-layer-setwin .layui-layer-close', {
					tips: 3
				});
			}, 500);
		}
	});

	layui.layer.full(childLayerIndex);


	//改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
	layui.jquery(window).on("resize", function() {
		layui.layer.full(childLayerIndex);
	})

}