layui.use(['form'], function() {
	var form = layui.form,
	config = layui.config;
	
	if (config.getToken()) {
        //location.replace('./');
        location.replace('/'+config.indexPage);
        return;
    }
	
	//提交
	form.on('submit(LAY-user-login-submit)', function(obj) {
		var loginUrl = config.base_server+config.loginUrl;
		var loginData = ("get"==config.loginMethod.toLowerCase())?obj.field:JSON.stringify(obj.field);

		layer.load(2);
		$.ajax({
			url: loginUrl,
			data: loginData,
			type: config.loginMethod,
			dataType: 'json',
			headers: {
				"Content-type": "application/json;charset=UTF-8",
				"Accept": "application/json"
			},
			success: function(loginInfo) {
				layer.closeAll('loading');
				if(loginInfo.status == 200 && loginInfo.data != null && loginInfo.data) {
					config.putToken(loginInfo.data);
					layer.msg("用户登录成功",{icon: 1}, function () {
                        //location.replace('./');
                        location.replace(config.indexPage);
                    });
				} else {
					layer.msg((loginInfo.error == null || loginInfo.error == undefined) ? ("登录失败，请重试") : (loginInfo.status + '-' + loginInfo.error), {icon: 5});
				}
			},
			error: function(xhr) {
				layer.closeAll('loading');
                if (xhr.status == 400) {
                    layer.msg('账号或密码错误', {icon: 5});
                } else {
                    layer.msg((xhr.status + '-' + xhr.statusText), {icon: 5});
                }
			}
		});
		return false;
	});
});
