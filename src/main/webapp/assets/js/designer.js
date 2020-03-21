$(function () {
    var height=$("#my-navbar").height()
    $(".cation-middle").css("marginTop",height)

    $(".cation-list li a").click(function(event) {

        var baseurl = '/';
        $(this).addClass('on');
        $(this).parents('li').children('a').not(this).removeClass('on');
        var rank=$("#rank li .on").prop('name');
        var style=$("#style li .on").prop('name');
        var url = baseurl + 'designer/getdesigner2?style='+style+'&rank='+rank;

        $.get(url, function (data) {
            if (data.status==200 && data.count>0)  {
                var designers = data.data;
                $("#caseContainer").empty();
                for (var i = 0; i < designers.length; i++) {
                    //填充案例内容
                    $("#caseContainer").append("<div class=\"col-sm-6 col-md-4\"><div class=\"thumbnail\">" +
                        "<a class=\"lightbox\" href=\"designerdetail.html?id="+designers[i].id+"\"><img src=\""+designers[i].url+"\" alt=\""+designers[i].name+"\"></a>"+
                        "<div class=\"caption\"><h3>"+designers[i].name+"</h3>"+
                        " <p>擅长风格:"+designers[i].style+"</p>" +
                        " <p>设计师级别:"+designers[i].rank+"</p>" +
                        " <p>从业经验:"+designers[i].experience+"年</p>" +
                        "</div></div></div>"
                    );
                }
            }
            else if (data.status==200 && data.count==0) {
                $("#caseContainer").empty();
                $("#caseContainer").append("<div class=\"not-find\">" +
                    "<div class=\"pic\">" +
                    "<img src=\"assets/images/notfind/search-null_03.png\" alt=\"\" style=\"width: auto;\">" +
                    "</div>" +
                    "<div class=\"title mt10\">没找到您<span>喜欢</span>的设计师哦,换个分类<span>看一看</span>吧！</div>" +
                    "</div>");
            }
        });
        return false;
    });

    document.getElementById("alldesigner").click();

});
