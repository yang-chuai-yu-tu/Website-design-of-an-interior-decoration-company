$(function () {
    var height=$("#my-navbar").height()
    $(".cation-middle").css("marginTop",height)
    //搜索框属性点击事件
    $(".cation-list li a").click(function(event) {

        var baseurl = '/';
        //选中属性高亮，其他普通
        $(this).addClass('on');
        $(this).parents('li').children('a').not(this).removeClass('on');
        //提取选中属性
        var bedroomnum=$("#bedroomnum li .on").prop('name');
        var style=$("#style li .on").prop('name');
        var area1=$("#area li .on").data("area1");
        var area2=$("#area li .on").data("area2");
        //补全查询url参数
        var url = baseurl + 'case/getcases2?style='+style+'&bedroomnum='+bedroomnum+'&area1='+area1+'&area2='+area2;
        //$.get() 方法使用 HTTP GET 请求从服务器加载数据 function(data,status,xhr)可选。规定当请求成功时运行的函数。data - 包含来自请求的返回结果数据
        $.get(url, function (data) {
            if (data.status==200 && data.count>0)  {
                var cases = data.data;
                $("#caseContainer").empty();
                for (var i = 0; i < cases.length; i++) {
                    //填充案例内容
                    $("#caseContainer").append("<div class=\"col-sm-6 col-md-3\"><div class=\"thumbnail\">" +
                        "<a class=\"lightbox\" href=\"casedetail.html?id="+cases[i].id+"\"><img width=\"250px\" height=\"192.5px\" src=\""+cases[i].url+"\" alt=\""+cases[i].name+"\"></a>"+
                        "<div class=\"caption\"><h3>"+cases[i].name+"</h3>"+
                        " <p>"+cases[i].style+"|"+cases[i].area+"平米|"+cases[i].city+"</p>" +
                        "</div></div></div>"
                    );
                }
            }
            //没有相关案例的情况
            else if (data.status==200 && data.count==0) {
                $("#caseContainer").empty();
                $("#caseContainer").append("<div class=\"not-find\">" +
                    "<div class=\"pic\">" +
                    "<img src=\"assets/images/notfind/search-null_03.png\" alt=\"\" style=\"width: auto;\">" +
                    "</div>" +
                    "<div class=\"title mt10\">没找到您<span>喜欢</span>的案例吗？找个设计师<span>聊一聊</span>吧！</div>" +
                    "</div>");
            }
        });
        return false;
    });

    document.getElementById("allcase").click();

});

