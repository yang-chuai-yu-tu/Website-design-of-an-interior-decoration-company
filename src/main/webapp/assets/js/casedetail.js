$(document).ready(function(){

    var height = $("#my-navbar").height()
    $(".case-bg-box").css("marginTop", height)

    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        if (url.indexOf("?") != -1) {    //判断是否有参数
            var str = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
            strs = str.split("=");   //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
            return strs[1];          //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
        }
    }
    var caseid =GetRequest();
    var baseurl = '/';
    var caseUrl = baseurl + 'case/getcases/'+caseid;
    $.get(caseUrl, function (data) {
        if (data.status==200 && data.count>0)  {
            var cases = data.data;
            $("#caseImg").empty();
            $("#cSlideUl ul").empty();
            var yn = new yPreview();
            var elem = [];
            for (var i = 0; i < cases.casePicture.length; i++){
                elem.push({'url':cases.casePicture[i].url,'category':cases.casePicture[i].category});
            }
            yn.init({
                name: 'imgnav',//最外层组件ID
                yPreviewAreaId: 'img',//预览大图DIV ID
                yNavBarId: 'cbtn', //导航缩略图DIV ID
                yNavBarPrevCls: 'picSildeLeft',//导航 前向按钮类
                yNavBarPrevImg: 'assets/images/test/ico/picSlideLeft.gif',//导航 前向按钮图片
                yNavBarNextCls: 'picSildeRight',//导航 后向按钮类
                yNavBarNextImg: 'assets/images/test/ico/picSlideRight.gif',//导航 后向按钮图片
                yNavBarImgAreaId: 'cSlideUl', //导航 缩略图DIV ID
                elem:elem
                //图片数组/JSON 每张图片至少有一个url键值对，样例数据[{'url':'images/a.gif'},{'url':'images/b.gif'}]
            });
            // for (var i = 0; i < cases.casePicture.length; i++) {
            //     //填充案例内容
            //     if (i!=0) {
            //     $("#caseImg").append("<img src=\""+cases.casePicture[i].url+"\" width=\"780\" height=\"570\" alt=\""+cases.casePicture[i].name+"\"style=\"display: none\">");}
            //     else{ $("#caseImg").append("<img src=\""+cases.casePicture[i].url+"\" width=\"780\" height=\"570\" alt=\""+cases.casePicture[i].name+"\">");}
            //     $("#cSlideUl ul").append("<li><img src=\""+cases.casePicture[i].url+"\" alt=\""+cases.casePicture[i].name+"\"></li>");
            // }

            $(".case-inner-left-2").append("<img src=\""+cases.designerPicture[0].url+"\">"+
                "<h4>姓名:"+cases.designerName+"</h4>" +
                "<p>职位:"+cases.rank+"</p>" +
                "<div class=\"case-inner-2-btn-box\"> <a class=\"anli\" href=\"designerdetail.html?id="+cases.designerId+"\">更多案例</a> <a class=\"sheji reservationDesign\" href=\"index.html\" designerid=\"1484\">预约设计</a> </div> ")

            $(".mbx").append("<a href=\"javascript:void(0)\">"+cases.name+"</a>")

            $("#caseStyle").html(cases.style);
            $("#caseCity").html(cases.city);
            $("#caseArea").html(cases.area);
            $("#caseName").html(cases.name);
            $("#caseDesigner").html(cases.designerName);
            $("#caseBedroom").html(cases.bedroomNum);
            $(".case-good-linian div").html(cases.concept);
        }
    });

    var style = document.getElementById("caseStyle").innerText;
    var bedroomnum = document.getElementById("caseBedroom").innerText;
    var caseUrl = baseurl+ 'case/getcases2?style='+style+'&bedroomnum='+bedroomnum+'&area1=0&area2=100';
    $.get(caseUrl,function (data) {
        if (data.status==200 && data.count>0)  {
            var cases = data.data;
            //首先清空已有数据
            $(".guess-favorite-content").empty();
            var length=cases.length<4?cases.length:4;
            for (var i = 0; i < length; i++) {
                //填充案例内容
                $(".guess-favorite-content").append("<div class=\"guess-favorite-modal\"> <a href=\"casedetail.html?id="+cases[i].id+"\"> <img src=\""+cases[i].url+"\"> </a>" +
                    "<div style=\"text-align: center;background: #f0f0f0;padding:10px 5px;font-size:12px; \">"+cases[i].name+"</div>" +
                    "</div>"
                );
            }
        }
    });

})
