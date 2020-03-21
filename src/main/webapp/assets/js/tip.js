$(function () {
    var height=$("#my-navbar").height()
    $(".mbx").css("marginTop",height)


        var baseurl = '/';
        var url = baseurl + 'tip/gettips';

        $.get(url, function (data) {
            if (data.status==200 && data.count>0)  {
                var tip = data.data;
                $(".listbox").empty();
                for (var i = 0; i < tip.length; i++) {
                    //填充案例内容
                    var myDate = new Date(tip[i].crateTime);
                    $(".listbox").append("<div class=\"item\">\n" +
                        "<div class=\"img fl\"> <a href=\"tipdetail.html?id="+tip[i].id+"\"  title=\""+tip[i].title+"\"> <img src=\""+tip[i].image+"\" width=\"300\" height=\"200\" alt=\""+tip[i].title+"\"> </a> </div>\n" +
                        "<div class=\"info fr rel\">\n" +
                        "<h1 class=\"t\"> <a href=\"tipdetail.html?id="+tip[i].id+"\"  title=\""+tip[i].title+"\"><b>"+tip[i].title+"</b></a> </h1>\n" +
                        "<p class=\"num\">"+myDate.toLocaleString( )+"</p>\n" +
                        "<p class=\"desc\">"+tip[i].content+"</p>\n" +
                        "<p class=\"desc2\">...</p>\n" +
                        "<div class=\"btnbox abs\"> <a href=\"tipdetail.html?id="+tip[i].id+"\" >查看详情</a> </div>\n" +
                        "</div>\n" +
                        "</div>"
                    );
                }
            }
        });
        return false;

});
