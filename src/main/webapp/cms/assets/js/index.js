var refreshNav = true;
$(function() {
	var config = layui.config;

	// 检查是否登录
    if (!config.getToken() || config.getToken() == '') {
        location.replace(config.loginPage);
        return;
    }
        
	initNav();  //获取导航栏
	
	//路由注册
	Q.reg('home',function(){
		load('appointment/list');
	}).reg('config',function(path){
		load('config/'+path);
    }).reg('appointment',function(path){
        load('appointment/'+path);
	}).init({
		index: 'home'
	});
	
	//点击导航切换页面时不刷新导航,其他方式切换页面要刷新导航
	layui.element.on('nav(index-nav)', function(elem){
		refreshNav = false;
		if(document.body.clientWidth<=750){
			switchNav(true);
		}
	});
});

//异步加载子页面
function load(path) {
	if(refreshNav){
		activeNav(path);
	}
	refreshNav = true;
	$("#main-content").load("/cms/views/" + path +".html",function(){
		layui.element.render('breadcrumb');
		layui.form.render('select');
	});
}

//获取左侧导航栏
function initNav(){
	var indexNav = layui.config.menus;
		
	layui.laytpl(sideNav.innerHTML).render(indexNav, function(html){
		$("#index-nav").html(html);
		layui.element.render('nav', 'index-nav');
	});
}

//退出登录
function loginOut(){
	layer.confirm('确定退出登录？', function (i) {
        layer.close(i);       
        infJsonReq(layui.config.base_server+layui.config.logoutUrl, {}, layui.config.loginMethod, function (loginInfo) {
			if(loginInfo.status == 200 && loginInfo.data != null && loginInfo.data) {
				layui.config.removeToken();
				location.replace(layui.config.loginPage);
			} else {
				layer.msg((loginInfo.error == null || loginInfo.error == undefined) ? ("登出失败，请稍后再试") : (loginInfo.status + '-' + loginInfo.error), {icon: 2});
			}
		});
   });
}