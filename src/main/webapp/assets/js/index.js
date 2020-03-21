function initCity(city, index) {
    if (typeof returnCitySN!=="undefined" && city.cityCode.substr(0,2)==returnCitySN.cid.substr(0,2)) {
        $("#location").append("<option value='"+city.cityname+"' selected>"+city.cityname+"</option>");
    } else {
        $("#location").append("<option value='"+city.cityname+"'>"+city.cityname+"</option>");
    }
}

function initToday(){
    var now=new Date();
    //格式化日，如果小于9，前面补0
    var day = ("0" + now.getDate()).slice(-2);
    //格式化月，如果小于9，前面补0
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var currentdate= now.getFullYear()+"-"+month+"-"+day;

    if($("#orderDate").val()==""){
        $("#orderDate").val(currentdate);
    }
}
$(function () {

    citynames.forEach(initCity);
    initToday();

    var baseurl = '/';
    var args = {
        "time": new Date()
    };
    $.get(baseurl + 'activity/getbanners', args, function (data) {
        if (data.status==200 && data.count>0)  {
            var activities = data.data;
            //首先清空已有数据
            $("#carouselIndicator").empty();
            $("#carouselContent").empty();
            for (var i = 0; i < activities.length; i++) {
                var imgStr = "<img src='" + activities[i].img + "' alt='" + activities[i].name + "'";
                if (activities[i].link!=null) {
                    imgStr += " onClick='location.href=\""+activities[i].link + "\"'";
                }
                imgStr += ">";
                if (i == 0) {//初始显示帧
                    //填充轮播图指标（导航圆点）数
                    $("#carouselIndicator").append("<li data-target='#activityCarousel' data-slide-to='0'  class='active'></li>")
                    //填充每幅图每一帧的具体信息
                    $("#carouselContent").append("<div class='item active'>" + imgStr +"</div>");
                } else {
                    //填充轮播图指标（导航圆点）数
                    $("#carouselIndicator").append("<li data-target='#activityCarousel' data-slide-to='" + i + "'></li>")
                    //填充每幅图每一帧的具体信息
                    $("#carouselContent").append("<div class='item'>" + imgStr +"</div>");
                }
            }
        }
    });


    $('#activityCarousel').carousel({interval: 3000});
    // $('#activityCarousel').on('slid.bs.carousel', function () {
    //     $('#activeContainer').removeClass();
    //     var slideNo = $('#carouselIndicator li.active').data('slide-to');
    //     var newCls = "container active_bgcolor"+slideNo;
    //     $('#activeContainer').addClass(newCls);
    // });

    $("#submitId").click(
        function (e) {
            // Prevent form submission
            e.preventDefault();

            var phoneNum=$("#phoneNum").val();
            if(!/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(phoneNum)){
                alert("手机号码有误");
                return false;
            }

            initToday();

            if ($("#location").val()!=null && $("#location").val()!="") {
                $("#province").val($("#location   option:selected").text());
            }

            var data = $("#orderForm").serializeObject(); //自动将form表单封装成json

            $.ajax({
                type: "POST",
                dataType: "json",
                url:baseurl +'appointment/saveappointment',
                data:JSON.stringify(data),
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                    "Accept": "application/json"
                },
                success: function(msg){
                    if (msg.status==200){  //修改成功
                        alert("预约成功");
                    }else {  //修改失败
                        //修改失败处理代码...
                        alert(msg.error);
                    }
                },
                error: function (msg) {
                    alert(msg)
                }
            });
            return false;
        }
    );

    var caseUrl = baseurl + 'picture/gethomepagepictures?type=case&size=8';
    $.get(caseUrl, args, function (data) {
        if (data.status==200 && data.count>0)  {
            var pictures = data.data;
            //首先清空已有数据
            $("#case_ul").empty();
            for (var i = 0; i < pictures.length; i++) {
                var imgStr = "<img  width=\"280px\" height=\"280px\" src='" + pictures[i].url + "' alt='" + pictures[i].name + "'";
                if (pictures[i].title!=null) {
                    imgStr += " onClick='location.href=\""+pictures[i].type+"detail.html?id="+pictures[i].relatedId+"\"'";
                }
                imgStr += ">";
                //填充案例内容
                $("#case_ul").append("<li>"+imgStr+"<div class=\"caption\"> <div class=\"blur\"></div>" +
                    " <div class=\"caption-text\"><h1>"+pictures[i].title+"</h1>" +
                    "<p>"+pictures[i].dsc+"</p></div></div></li>"
                );
            }
        }
    });

    var voteUrl = baseurl + 'vote/getvotes';
    $.get(voteUrl, args, function (data) {
        if (data.status==200 && data.count>0)  {
            var votes = data.data;
            //首先清空已有数据
            $(".vote").empty();
            for (var i = 0; i < votes.length; i++) {
                //填充投票内容
                $(".vote").append(" <h2>"+votes[i].title+"</h2><table id=\""+votes[i].name+"main\" cellspacing=\"10\"></table>");
                for (var j = 0; j < votes[i].options.length; j++) {
                    $("#"+votes[i].name+"main").append("<tr ><td>" +
                        "<input class=\"radio-btn\" type=\"radio\" name=\"" + votes[i].name + "\"/>" +
                        "<label id=\"txt"+votes[i].name+j+"\" class=\"txt\">" + votes[i].options[j].name + "</label>" +
                        "</td></tr>"+
                        "<tr style=\"display: none\" class=\""+votes[i].name+"\"><td class=\"progress \" style=\"width:550px\">" +
                        " <div id=\""+votes[i].name+j+"\" class=\"progress-bar progress-bar-success\" role=\"progressbar\" aria-valuenow=\"40\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"min-width: 5em;\">" +
                        "0.00%</div></td>" +
                        "<td>" +
                        "<label id=\"label"+votes[i].name+j+"\">"+votes[i].options[j].amount+"</label>票" +
                        "</td></tr>");
                }
                $("#"+votes[i].name+"main").append("<tr>" +
                    "<td><p>" +
                    "<input id=\""+votes[i].name+"Submit\" type=\"submit\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"left\"" +
                    "data-content=\"\" class=\"apply\" value=\"确认投票\" onclick=\'vote(\""+votes[i].name+"\","+votes[i].id+")\' style=\"background-color: #00B83F\"/>" +
                    "</td></tr><tr>"+
                    "<td style=\"display: none\" class=\""+votes[i].name+"\"><p>" +
                    "<h4>谢谢您的参与</h4>\n" +
                    "</td>"+
                    "</tr>");
            }
        }
    });


});

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [ o[this.name] ];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}
