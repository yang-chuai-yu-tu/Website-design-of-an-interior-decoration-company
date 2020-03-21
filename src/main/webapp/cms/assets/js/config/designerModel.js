//获取表单弹窗页面数据
function showDesigner(data) {
    if(data != null ) {
        var applyUrl = layui.config.base_server+layui.config.designerInfoUrl+data.id;
        infJsonReq(applyUrl, {}, 'GET', function (designer) {
            if(designer.status == 200 && designer.data != null) {
                showDesignerModel(designer.data);
            } else {
                layer.msg((designer.error == null || designer.error == undefined) ? ("未查到流水号[" + data.id + "]设计师") : (designer.status + '-' + designer.error), {icon: 2});
            }
        });
    }
    else{
        showDesignerModel();
    }
}

function deleteDesigner(data){
    if(data != null ) {
        var applyUrl = layui.config.base_server+layui.config.designerDeleteUrl+"?id="+data.id;
        infJsonReq(applyUrl, {}, 'GET', function (designer) {
            if(designer.status == 200 ) {
                layer.msg(data.id+"号设计师已删除");
                if (parent.$('#searchBtn')[0]) {
                    parent.$('#searchBtn').click();
                } else {
                    parent.location.reload();
                }
            } else {
                layer.msg((designer.error == null || designer.error == undefined) ? ("未查到流水号[" + data.id + "]设计师") : (designer.status + '-' + designer.error), {icon: 2});
            }
        });
    }
}

function showAndEnableBtn(btn) {
    btn.removeClass("layui-hide layui-btn-disabled").attr("lay-submit","").removeAttr("disabled");
}


function showDesignerModel(data) {
    if (data==null) {
        var childLayerIndex = layui.layer.open({
            title: ("设计师管理") ,
            type: 2,
            content: layui.config.designerInfoPage,
            success: function(layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                var applyPassCls = body.find(".applyPass");
                showAndEnableBtn(applyPassCls);

                layui.form.render();

                setTimeout(function() {
                    layui.layer.tips('点击此处返回设计师列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500);
            }
        });
    }
    else {
        var childLayerIndex = layui.layer.open({
            title: ("设计师管理"),
            type: 2,
            content: layui.config.designerInfoPage,
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                body.find("#id").val(data.id);
                eachSelect("rank", data.rank, body);
                body.find(".idBiz").val(nullData(data.id));
                body.find(".styleBiz").val(nullData(data.style));
                body.find(".nameBiz").val(nullData(data.name));
                body.find(".expBiz").val(nullData(data.exp));
                body.find("#intro").val(nullData(data.intro));
                var applyPassCls = body.find(".applyPass");
                showAndEnableBtn(applyPassCls);


                layui.form.render();
                layui.form.render('select');

                setTimeout(function () {
                    layui.layer.tips('点击此处返回设计师列表', '.layui-layer-setwin .layui-layer-close', {
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