//获取表单弹窗页面数据
function showOption(data) {
    if(data != null ) {
        var applyUrl = layui.config.base_server+layui.config.optionInfoUrl+data.id;
        infJsonReq(applyUrl, {}, 'GET', function (option) {
            if(option.status == 200 && option.data != null) {
                showOptionModel(option.data);
            } else {
                layer.msg((option.error == null || option.error == undefined) ? ("未查到流水号[" + data.id + "]选项") : (option.status + '-' + option.error), {icon: 2});
            }
        });
    }
    else{
        showOptionModel();
    }
}

function deleteOption(data){
    if(data != null ) {
        var applyUrl = layui.config.base_server+layui.config.optionDeleteUrl+"?id="+data.id;
        infJsonReq(applyUrl, {}, 'GET', function (option) {
            if(option.status == 200 ) {
                layer.msg(data.id+"号选项已删除");
                if (parent.$('#searchBtn')[0]) {
                    parent.$('#searchBtn').click();
                } else {
                    parent.location.reload();
                }
            } else {
                layer.msg((option.error == null || option.error == undefined) ? ("未查到流水号[" + data.id + "]选项") : (option.status + '-' + option.error), {icon: 2});
            }
        });
    }
}

function showAndEnableBtn(btn) {
    btn.removeClass("layui-hide layui-btn-disabled").attr("lay-submit","").removeAttr("disabled");
}


function showOptionModel(data) {
    if (data==null) {
        var childLayerIndex = layui.layer.open({
            title: ("选项管理") ,
            type: 2,
            content: layui.config.optionInfoPage,
            success: function(layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                var applyPassCls = body.find(".applyPass");
                showAndEnableBtn(applyPassCls);

                layui.form.render();

                setTimeout(function() {
                    layui.layer.tips('点击此处返回选项列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500);
            }
        });
    }
    else {
        var childLayerIndex = layui.layer.open({
            title: ("选项管理"),
            type: 2,
            content: layui.config.optionInfoPage,
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                body.find("#id").val(data.id);
                body.find(".idBiz").val(nullData(data.id));
                body.find(".amountBiz").val(data.amount);
                body.find(".nameBiz").val(nullData(data.name));
                body.find(".relatedIdBiz").val(nullData(data.relatedId));
                var applyPassCls = body.find(".applyPass");
                showAndEnableBtn(applyPassCls);


                layui.form.render();
                layui.form.render('select');

                setTimeout(function () {
                    layui.layer.tips('点击此处返回选项列表', '.layui-layer-setwin .layui-layer-close', {
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