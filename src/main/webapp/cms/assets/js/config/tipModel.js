//获取表单弹窗页面数据
function showTip(data) {
    if(data != null ) {
        var applyUrl = layui.config.base_server+layui.config.tipInfoUrl+data.id;
        infJsonReq(applyUrl, {}, 'GET', function (tip) {
            if(tip.status == 200 && tip.data != null) {
                showTipModel(tip.data);
            } else {
                layer.msg((tip.error == null || tip.error == undefined) ? ("未查到流水号[" + data.id + "]小贴士") : (tip.status + '-' + tip.error), {icon: 2});
            }
        });
    }
    else{
        showTipModel();
    }
}

function deleteTip(data){
    if(data != null ) {
        var applyUrl = layui.config.base_server+layui.config.tipDeleteUrl+"?id="+data.id;
        infJsonReq(applyUrl, {}, 'GET', function (tip) {
            if(tip.status == 200 ) {
                layer.msg(data.id+"号贴士已删除");
                if (parent.$('#searchBtn')[0]) {
                    parent.$('#searchBtn').click();
                } else {
                    parent.location.reload();
                }
            } else {
                layer.msg((tip.error == null || tip.error == undefined) ? ("未查到流水号[" + data.id + "]设计师") : (tip.status + '-' + tip.error), {icon: 2});
            }
        });
    }
}

function showAndEnableBtn(btn) {
    btn.removeClass("layui-hide layui-btn-disabled").attr("lay-submit","").removeAttr("disabled");
}


function showTipModel(data) {
    if (data==null) {
        var childLayerIndex = layui.layer.open({
            title: ("小贴士管理") ,
            type: 2,
            content: layui.config.tipInfoPage,
            success: function(layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                var applyPassCls = body.find(".applyPass");
                showAndEnableBtn(applyPassCls);

                layui.form.render();

                setTimeout(function() {
                    layui.layer.tips('点击此处返回贴士列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500);
            }
        });
    }
    else {
        var childLayerIndex = layui.layer.open({
            title: ("小贴士管理"),
            type: 2,
            content: layui.config.tipInfoPage,
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                body.find("#id").val(data.id);
                body.find(".idBiz").val(nullData(data.id));
                body.find(".titleBiz").val(nullData(data.title));
                body.find(".authorBiz").val(nullData(data.author));
                body.find(".imageBiz").val(nullData(data.image));
                body.find("#content").val(nullData(data.content));
                var applyPassCls = body.find(".applyPass");
                showAndEnableBtn(applyPassCls);


                layui.form.render();
                layui.form.render('select');

                setTimeout(function () {
                    layui.layer.tips('点击此处返回小贴士列表', '.layui-layer-setwin .layui-layer-close', {
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