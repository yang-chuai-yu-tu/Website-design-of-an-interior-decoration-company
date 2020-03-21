//获取表单弹窗页面数据
function showVote(data) {
    if(data != null ) {
        var applyUrl = layui.config.base_server+layui.config.voteInfoUrl+data.id;
        infJsonReq(applyUrl, {}, 'GET', function (vote) {
            if(vote.status == 200 && vote.data != null) {
                showVoteModel(vote.data);
            } else {
                layer.msg((vote.error == null || vote.error == undefined) ? ("未查到流水号[" + data.id + "]投票") : (vote.status + '-' + vote.error), {icon: 2});
            }
        });
    }
    else{
        showVoteModel();
    }
}

function deleteVote(data){
    if(data != null ) {
        var applyUrl = layui.config.base_server+layui.config.voteDeleteUrl+"?id="+data.id;
        infJsonReq(applyUrl, {}, 'GET', function (vote) {
            if(vote.status == 200 ) {
                layer.msg(data.id+"号投票已删除");
                if (parent.$('#searchBtn')[0]) {
                    parent.$('#searchBtn').click();
                } else {
                    parent.location.reload();
                }
            } else {
                layer.msg((vote.error == null || vote.error == undefined) ? ("未查到流水号[" + data.id + "]投票") : (vote.status + '-' + vote.error), {icon: 2});
            }
        });
    }
}

function showAndEnableBtn(btn) {
    btn.removeClass("layui-hide layui-btn-disabled").attr("lay-submit","").removeAttr("disabled");
}


function showVoteModel(data) {
    if (data==null) {
        var childLayerIndex = layui.layer.open({
            title: ("投票管理") ,
            type: 2,
            content: layui.config.voteInfoPage,
            success: function(layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                var applyPassCls = body.find(".applyPass");
                showAndEnableBtn(applyPassCls);

                layui.form.render();

                setTimeout(function() {
                    layui.layer.tips('点击此处返回投票列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500);
            }
        });
    }
    else {
        var childLayerIndex = layui.layer.open({
            title: ("投票管理"),
            type: 2,
            content: layui.config.voteInfoPage,
            success: function (layero, index) {
                var body = layui.layer.getChildFrame('body', index);
                body.find("#id").val(data.id);
                body.find(".idBiz").val(nullData(data.id));
                body.find(".titleBiz").val(nullData(data.title));
                body.find(".nameBiz").val(nullData(data.name));
                eachSelect("flag", data.flag, body);
                var applyPassCls = body.find(".applyPass");
                showAndEnableBtn(applyPassCls);


                layui.form.render();
                layui.form.render('select');

                setTimeout(function () {
                    layui.layer.tips('点击此处返回投票列表', '.layui-layer-setwin .layui-layer-close', {
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