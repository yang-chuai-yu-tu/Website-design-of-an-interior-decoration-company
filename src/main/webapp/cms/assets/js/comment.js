//var sideNavExpand = true;  //导航栏是否展开
$(function() {
	//切换导航栏按钮点击事件
	$("#switchNav").click(function(){
		var sideNavExpand = !$('body').hasClass('nav-mini');
		switchNav(!sideNavExpand);
	});
	//导航栏全屏按钮点击事件
	$("#fullScreen").click(function(){
		fullScreenNav();
	});

	//手机遮罩层点击事件
	$('.site-mobile-shade').click(function(){
		switchNav(true);
	});
})

// 封装ajax请求
function infJsonReq(url, jsonData, method, successFunction, loadingLayerIdx, msgLayer) {
	if(msgLayer == undefined) {
		msgLayer = layui.layer;
	}

	if(loadingLayerIdx == undefined) {
		msgLayer.load(1);
	}
	var token = layui.config.getToken();
    if (token) {
        jsonData.access_token = token.ultk;
    }
	$.ajax({
		url: url,
		data: jsonData,
		type: method,
		dataType: 'json',
		headers: {
			"Content-type": "application/json;charset=UTF-8",
			"Accept": "application/json",
	  		"user-jwt" : jsonData.access_token
		},
		success: function(resultData) {
			if(loadingLayerIdx == undefined) {
				msgLayer.closeAll('loading');
			} else {
				msgLayer.close(loadingLayerIdx);
			}
			if (resultData.status == 401) {
                layui.config.removeToken();
                layer.msg((resultData.error!=null&&resultData.error!=undefined)?res.error:'登录过期',{icon: 2}, function () {
                    location.href = '/'+layui.config.loginPage;
                });
           	} else {
				successFunction(resultData);           	
           	}
		},
		error: function(xhr) {
			if(loadingLayerIdx == undefined) {
				msgLayer.closeAll('loading');
			} else {
				msgLayer.close(loadingLayerIdx);
			}
			if (xhr.status == 401) {
                layui.config.removeToken();
                layer.msg('登录过期', {icon: 2}, function () {
                    location.href = '/'+layui.config.loginPage;
                });
            } else {
                successFunction({
					status: xhr.status,
					error: xhr.statusText
				});
            }	
		},
        beforeSend: function (xhr) {
            var token = layui.config.getToken();
            if (token) {
                xhr.setRequestHeader('user-jwt', token.ultk);
            }
        }
	});
}

//弹出显示原图
function showImg(imgUrl) {
	var that = this;
	var imgcontent = "<img src='" + imgUrl + "' alt='图片' ";
	var setting = {
		type: 1,
		title: false,
		closeBtn: 0,
		skin: 'layui-layer-nobg', //没有背景色
		shadeClose: true,
		shade: 0.6, //遮罩透明度
		content: imgcontent
	}

	var windowH = $(window).height() - 10;
	var windowW = $(window).width() - 10;

	getImageWidth(imgUrl, function(w, h) {
		if(w > windowW || h > windowH) {
			// 调整图片大小
			if(windowW / windowH <= w / h) { //原图片宽高比例 大于 图片框宽高比例
				h = windowW * (h / w);
				w = windowW; //以框的宽度为标准
			} else { //原图片宽高比例 小于 图片框宽高比例
				w = windowH * (w / h);
				h = windowH; //以框的高度为标准
			}
			setting.area = [w + "px", h + "px"];
			setting.content = setting.content + " height='" + h + "' width='" + w + "' ";
		} else {
			setting.area = [w + "px", h + "px"];
		}
		setting.content = setting.content + " />";
		// 设置layer
		top.layer.open(setting);
	});
}

function getImageWidth(url, callback) {
	var img = new Image();
	img.src = url;

	// 如果图片被缓存，则直接返回缓存数据
	if(img.complete) {
		callback(img.width, img.height);
	} else {
		// 完全加载完毕的事件
		img.onload = function() {
			callback(img.width, img.height);
		}
	}
}

//设置选中导航栏
function activeNav(path_name){
	$(".layui-side ul.layui-nav li.layui-nav-item .layui-nav-child dd").removeClass("layui-this");
	$(".layui-side ul.layui-nav li.layui-nav-item").removeClass("layui-nav-itemed");
	var $a = $(".layui-side ul.layui-nav>li.layui-nav-item>.layui-nav-child>dd>a[href='#!"+path_name+"']");
	$a.parent("dd").addClass("layui-this");
	$a.parent("dd").parent("dl.layui-nav-child").parent("li.layui-nav-item").addClass("layui-nav-itemed");
	layui.element.render('nav', 'index-nav');
}

//折叠显示导航栏
function switchNav(expand){
	var sideNavExpand = !$('body').hasClass('nav-mini');
	if(expand==sideNavExpand){
		return;
	}
	if (!expand) {
        //$('.layui-side .layui-nav .layui-nav-item.layui-nav-itemed').removeClass('layui-nav-itemed');
        $('body').addClass('nav-mini');
    }else{
        $('body').removeClass('nav-mini');
    }
	$('.nav-mini .layui-side .layui-nav .layui-nav-item').hover(function(){
		var tipText = $(this).find('span').text();
		if($('body').hasClass('nav-mini')&&document.body.clientWidth>750){
			layer.tips(tipText, this);
		}
	},function(){
		layer.closeAll('tips');
	});
}

//导航栏展开
function openNavItem(){
	if($('body').hasClass('nav-mini')&&document.body.clientWidth>750){
		switchNav(true);
	}
}

// 全屏
function fullScreenNav() {  
    var ac = 'layui-icon-screen-full', ic = 'layui-icon-screen-restore';
    var ti = $(this).find('i');

    var isFullscreen = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || false;
    if (isFullscreen) {
        var efs = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
        if (efs) {
            efs.call(document);
        } else if (window.ActiveXObject) {
            var ws = new ActiveXObject('WScript.Shell');
            ws && ws.SendKeys('{F11}');
        }
        ti.addClass(ac).removeClass(ic);
    } else {
        var el = document.documentElement;
        var rfs = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
        if (rfs) {
            rfs.call(el);
        } else if (window.ActiveXObject) {
            var ws = new ActiveXObject('WScript.Shell');
            ws && ws.SendKeys('{F11}');
        }
        ti.addClass(ic).removeClass(ac);
    }
}

//转换Long型毫秒数为yyyy-MM-dd格式日期
function parseTimeMs(timeMs, format){
    if(timeMs==null || timeMs == '' || timeMs == "undefined"){
        return "";
    }else{
        return format?layui.util.toDateString(timeMs,format):layui.util.toDateString(timeMs,'yyyy年MM月dd日');
    }
}
//判断字段数据是否存在
function nullData(paraData){
    if(paraData==null || paraData == '' || paraData == "undefined"){
        return "";
    }else{
        return paraData;
    }
}

/* 下拉菜单选中
* @param id select的id
* @param val 选中的值
* @param body	弹出层body
*/
function eachSelect(id, val, body) {
    var selVal="";
    // 0、设置select的值
    body.find("#" + id).attr("value", val);
    body.find("#" + id).children("option").each(function() {
        //console.log($(this).val());
        if ($(this).val() == val) {
            selVal=$(this).text()
            $(this).attr("selected", "selected");
        } else {
            if ($(this).attr("selected") == "selected") {
                $(this).removeAttr("selected");
            }
        }
    });
    //console.log(selVal);

    // 1、首先设置输框
    body.find("#" + id).siblings("div[class='layui-unselect layui-form-select']")
        .children("div[class='layui-select-title']").children("input").val(
        selVal);
    body.find("#" + id).siblings("div[class='layui-unselect layui-form-select']")
        .children("dl").children("dd").each(function() {
        if ($(this).val() == val) {
            if (!$(this).hasClass("layui-this")) {
                $(this).addClass("layui-this");
                $(this).click();
            }
            return true;
        } else {
            if ($(this).hasClass("layui-this")) {
                $(this).removeClass("layui-this");
            }
        }
    });
}

