//获取表单弹窗页面数据
function showPicture(data) {
	if(data != null ) {
		var applyUrl = layui.config.base_server+layui.config.pictureInfoUrl+data.id;
		infJsonReq(applyUrl, {}, 'GET', function (picture) {
			if(picture.status == 200 && picture.data != null) {
				showPictureModel(picture.data);
			} else {
				layer.msg((picture.error == null || picture.error == undefined) ? ("未查到流水号[" + data.id + "]图片") : (picture.status + '-' + picture.error), {icon: 2});
			}
		});
	}
	else{
        showPictureModel();
	}
}

function deletePicture(data){
    if(data != null ) {
        var applyUrl = layui.config.base_server+layui.config.pictureDeleteUrl+"?id="+data.id;
        infJsonReq(applyUrl, {}, 'GET', function (picture) {
            if(picture.status == 200 ) {
                layer.msg(data.id+"号图片已删除");
                if (parent.$('#searchBtn')[0]) {
                    parent.$('#searchBtn').click();
                } else {
                    parent.location.reload();
                }
            } else {
                layer.msg((picture.error == null || picture.error == undefined) ? ("未查到流水号[" + data.id + "]图片") : (picture.status + '-' + picture.error), {icon: 2});
            }
        });
    }
}
    
function showAndEnableBtn(btn) {
    btn.removeClass("layui-hide layui-btn-disabled").attr("lay-submit","").removeAttr("disabled");
}


function showPictureModel(data) {
	if (data==null) {
        var childLayerIndex = layui.layer.open({
            title: ("图片管理") ,
            type: 2,
            content: layui.config.pictureInfoPage,
            success: function(layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                var applyPassCls = body.find(".applyPass");
                showAndEnableBtn(applyPassCls);

                layui.form.render();

                setTimeout(function() {
                    layui.layer.tips('点击此处返回图片列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500);
            }
        });
	}
	else {
        var childLayerIndex = layui.layer.open({
            title: ("图片管理"),
            type: 2,
            content: layui.config.pictureInfoPage,
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                body.find("#id").val(data.id);
                eachSelect("category", data.category, body);
                body.find(".idBiz").val(nullData(data.id));
                // body.find(".categoryBiz").selected(nullData(data.category));
                body.find("#dsc").val(nullData(data.dsc));
                body.find("#order").val(data.displayOrder);
                body.find(".nameBiz").val(nullData(data.name));
                body.find(".relatedIdBiz").val(nullData(data.relatedId));
                body.find(".titleBiz").val(nullData(data.title));
                eachSelect("type", data.type, body);
                body.find(".urlBiz").val(nullData(data.url));
                var applyPassCls = body.find(".applyPass");
                showAndEnableBtn(applyPassCls);

                layui.form.render();
                layui.form.render('select');

                setTimeout(function () {
                    layui.layer.tips('点击此处返回图片列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500);
            }
        });
    }

	layui.layer.full(childLayerIndex);


	//改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
	layui.jquery(window).on("resize", function() {
		layui.layer.full(childLayerIndex);
	})

}