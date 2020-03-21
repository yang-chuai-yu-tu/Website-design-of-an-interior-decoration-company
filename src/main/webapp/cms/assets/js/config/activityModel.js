//获取表单弹窗页面数据
function showActivity(data){
    if(data != null){
        var applyUrl = layui.config.base_server+layui.config.activityInfoUrl+data.id;
        infJsonReq(applyUrl,{},'GET',function (activity) {
            if(activity.status == 200 && activity.data != null){
                showActivityModel(activity.data);
            }else{
                layer.msg((activity.error == null || activity.error == undefined) ? ("未查到流水号["+data.id+"]活动") : (activity.status+"-"+activity.error),{icon:2});
            }
        });  
    }
    else{
        showActivityModel();
    }
}

function deleteActivity(data){
    if(data != null){
        var applyUrl = layui.config.base_server+layui.config.activityDeleteUrl+"?id="+data.id;
        infJsonReq(applyUrl,{},'GET',function (activity) {
            if(activity.status==200){
                layer.msg(data.id+"号活动已删除");
                if(parent.$('#serchBtn')[0]){
                    parent.$('#serchBtn').click();
                }else{
                    parent.location.reload();
                }
            }else{
                layer.msg((activity.error == null || activity.error == undefined)?("未查到流水号["+data.id+"]活动") : (activity.status+"-"+activity.error),{icon:2});
            }
        });
    }
}

function showAndEnableBtn(btn) {
    btn.removeClass("layui-hide layui-btn-disabled").attr("lay-submit","").removeAttr("disabled");
}


function showActivityModel(data) {
    if (data==null) {
        var childLayerIndex = layui.layer.open({
            title: ("活动管理") ,
            type: 2,
            content: layui.config.activityInfoPage,
            success: function(layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                var applyPassCls = body.find(".applyPass");
                showAndEnableBtn(applyPassCls);

                layui.form.render();

                setTimeout(function() {
                    layui.layer.tips('点击此处返回活动列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500);
            }
        });
    }
    else {
        var childLayerIndex = layui.layer.open({
            title: ("活动管理"),
            type: 2,
            content: layui.config.activityInfoPage,
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                body.find("#id").val(data.id);
                body.find(".idBiz").val(nullData(data.id));
                body.find(".linkBiz").val(nullData(data.link));
                body.find(".nameBiz").val(nullData(data.name));
                body.find(".imgBiz").val(nullData(data.img));
                body.find(".dscBiz").val(nullData(data.dsc));
                eachSelect("flag", data.flag, body);
                var applyPassCls = body.find(".applyPass");
                showAndEnableBtn(applyPassCls);


                layui.form.render();
                layui.form.render('select');

                setTimeout(function () {
                    layui.layer.tips('点击此处返回活动列表', '.layui-layer-setwin .layui-layer-close', {
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