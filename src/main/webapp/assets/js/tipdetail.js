$(document).ready(function(){

    var height = $("#my-navbar").height()
    $(".mbx").css("marginTop", height)

    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        if (url.indexOf("?") != -1) {    //判断是否有参数
            var str = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
            strs = str.split("=");   //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
            return strs[1];          //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
        }
    }
    var tipid =GetRequest();
    var baseurl = '/';
    var caseUrl = baseurl + 'tip/gettip/'+tipid;
    $.get(caseUrl, function (response) {
        if (response.status==200 && response.count>0)  {
            var tip = response.data;
            var myDate = new Date(tip.crateTime);
            $(".article_title").empty();
            $(".artcon ").empty();
            $(".article_title").append("<div class=\"article_title_info\">"+tip.title+"</div>\n" +
                "<div class=\"article_title_right\"> <span style=\"color:#515151\"> 发布时间："+myDate.toLocaleString( )+" &nbsp;|&nbsp;作者："+tip.author+"</span> </div>");
            $(".artcon").append(tip.content);

            $(".mbx").append("<a href=\"javascript:void(0)\">"+tip.title+"</a>");
        }
    });


})
