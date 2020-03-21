$(function() {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        config = layui.config,
        laypage = layui.laypage,
        $ = layui.jquery;

    layui.use('upload', function(){
        var upload = layui.upload;

        //执行实例
        var uploadInst = upload.render({
            elem: '#upload' //绑定元素
            ,url: '/upload/' //上传接口
            ,done: function(res){
                //上传完毕回调
            }
            ,error: function(){
                //请求异常回调
            }
        });
    });


    form.on("submit(applyPass)",function(data){
        applyProcess(data);
        return false;
    })


    function applyProcess(data) {
        //弹出loading
        var index = top.layer.msg('处理提交中，请稍候',{icon: 16,time:false,shade:0.8});
        var processUrl = config.base_server+config.pictureApproveUrl;
        var pictureData = JSON.stringify(data.field);
        //console.log(applyProcessData);

        infJsonReq(processUrl, pictureData, 'POST', function (picture) {
            applyOpSuccess(picture, "图片保存");
        }, index, top.layer);
    }

    function applyOpSuccess(picture, msgPrefix) {
        if (picture.status == 200 && picture.data) {
            top.layer.msg(msgPrefix+"成功", {icon: 1,time:1000});
            layer.closeAll("iframe");
            //刷新父页面
            if (parent.$('#searchBtn')[0]) {
                parent.$('#searchBtn').click();
            } else {
                parent.location.reload();
            }
        } else {
            top.layer.msg(msgPrefix+"失败"+((picture.error!=null&&picture.error!=undefined)?(picture.status+'-'+picture.error):""), {icon: 2, time:1000});
        }
    }

});
