$(function () {
    var height = $("#my-navbar").height()
    $(".col").css("marginTop", height)

    function GetRequest(){
        var url = location.search;
        if(url.indexOf("?")!=-1){
            var str = url.substr(1);
            var strs = str.split("=");
            return strs[1];
        }
    }

    var designerId = GetRequest();
    var baseUrl='/';
    var designerUrl = baseUrl+'designer/getdesigner?designerid='+designerId;
    $.get(designerUrl,function (data) {
        var designer = data.data;
        $(".infobox").empty();
        $(".infobox").append("<div class=\"img fl\"> <img src=\""+designer.url+"\" alt=\""+designer.name+"\" width=\"350\" " +
            "height=\"350\" style=\"border-radius: 8px;\"> </div> <div class=\"info fl\">\n" +
            " <div class=\"name\"><strong style=\"color:#333;font-weight:500\">"+designer.name+"</strong></div>" +
            "<p>"+designer.rank+"</p><p class=\"bg_3\"><span>从业时间：</span>"+designer.experience+"年</p>" +
            "<p class=\"bg_2\"><span>擅长风格：</span>"+designer.style+"</p><p style=\"margin-top: 20px; border-bottom: 1px solid red;\">个人介绍：</p><div class=\"desc\">"+designer.introduce+
            "</div></div>");
    });

    var caseUrl = baseUrl+ 'case/getcases3?id='+designerId;
    $.get(caseUrl,function (data) {
        if (data.status==200 && data.count>0)  {
            var cases = data.data;
            //首先清空已有数据
            $("#designerCase").empty();
            var length=cases.length<4?cases.length:4;
            for (var i = 0; i < length; i++) {
                //填充案例内容
                $("#designerCase").append("<div class=\"guess-favorite-modal\"> <a href=\"casedetail.html?id="+cases[i].id+"\"> <img src=\""+cases[i].url+"\"> </a>" +
                    "<div style=\"text-align: center;background: #f0f0f0;padding:10px 5px;font-size:12px; \">"+cases[i].name+"</div>" +
                    "</div>"
                );
            }
        }
    });
});

