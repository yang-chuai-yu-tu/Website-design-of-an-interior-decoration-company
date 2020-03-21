//获取表单弹窗页面数据
function showCase(data) {
    if(data != null ) {
        var applyUrl = layui.config.base_server+layui.config.caseInfoUrl+data.id;
        infJsonReq(applyUrl, {}, 'GET', function (caseInfo) {
            if(caseInfo.status == 200 && caseInfo.data != null) {
                showCaseModel(caseInfo.data);
            } else {
                layer.msg((caseInfo.error == null || caseInfo.error == undefined) ? ("未查到流水号[" + data.id + "]案例") : (caseInfo.status + '-' + caseInfo.error), {icon: 2});
            }
        });
    }
    else{
        showCaseModel();
    }
}

function deleteCase(data){
    if(data != null ) {
        var applyUrl = layui.config.base_server+layui.config.caseDeleteUrl+"?id="+data.id;
        infJsonReq(applyUrl, {}, 'GET', function (caseInfo) {
            if(caseInfo.status == 200 ) {
                layer.msg(data.id+"号案例已删除");
                if (parent.$('#searchBtn')[0]) {
                    parent.$('#searchBtn').click();
                } else {
                    parent.location.reload();
                }
            } else {
                layer.msg((caseInfo.error == null || caseInfo.error == undefined) ? ("未查到流水号[" + data.id + "]案例") : (caseInfo.status + '-' + caseInfo.error), {icon: 2});
            }
        });
    }
}

function showAndEnableBtn(btn) {
    btn.removeClass("layui-hide layui-btn-disabled").attr("lay-submit","").removeAttr("disabled");
}


function showCaseModel(data) {
    if (data==null) {
        var childLayerIndex = layui.layer.open({
            title: ("案例管理") ,
            type: 2,
            content: layui.config.caseInfoPage,
            success: function(layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                var applyPassCls = body.find(".applyPass");
                showAndEnableBtn(applyPassCls);

                layui.form.render();

                setTimeout(function() {
                    layui.layer.tips('点击此处返回案例列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500);
            }
        });
    }
    else {
        var childLayerIndex = layui.layer.open({
            title: ("案例管理"),
            type: 2,
            content: layui.config.caseInfoPage,
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                body.find("#id").val(data.id);
                eachSelect("style", data.style, body);
                body.find(".idBiz").val(nullData(data.id));
                body.find(".designerIdBiz").val(nullData(data.designerId));
                body.find(".nameBiz").val(nullData(data.name));
                body.find(".areaBiz").val(nullData(data.area));
                body.find(".cityBiz").val(nullData(data.city));
                body.find(".priorityBiz").val(data.priority);
                body.find(".bedroomNumBiz").val(nullData(data.bedroomNum));
                body.find("#concept").val(nullData(data.concept));
                var applyPassCls = body.find(".applyPass");
                showAndEnableBtn(applyPassCls);


                layui.form.render();
                layui.form.render('select');

                setTimeout(function () {
                    layui.layer.tips('点击此处返回案例列表', '.layui-layer-setwin .layui-layer-close', {
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