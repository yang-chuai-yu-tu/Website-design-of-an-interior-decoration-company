$(function() {
	layui.define(function (exports) {

	    var applyConfig = {
	    	//接口访问配置
	        base_server: 'http://localhost:10101/', // 接口根地址
	        loginUrl: 'cmslogin', //登录 接口地址
	        logoutUrl: 'cmslogout', //登出 接口地址
	        loginMethod: 'POST', //登录/登出  接口异步调用方法类型

	        appointmentListUrl: 'appointment/list', //预约列表 接口地址
            pictureListUrl:'picture/list',//图片列表 接口地址
            designerListUrl:'designer/list',//设计师列表 接口地址
            caseListUrl:'case/list',//设计师列表 接口地址
            tipListUrl:'tip/list',//小贴士列表 接口地址
            voteListUrl:'vote/list',//投票列表 接口地址
            optionListUrl:'option/list',//选项列表 接口地址
            activityListUrl:'activity/list',//活动列表 接口地址

            appointmentInfoUrl: 'appointment/info/', //查询预约详情 接口地址
            pictureInfoUrl: 'picture/info/', //查询图片详情 接口地址
            designerInfoUrl: 'designer/info/', //查询设计师详情 接口地址
            caseInfoUrl: 'case/info/', //查询案例详情 接口地址
            tipInfoUrl: 'tip/gettip/', //查询贴士详情 接口地址
            voteInfoUrl: 'vote/info/', //查询投票详情 接口地址
            optionInfoUrl: 'option/info/', //查询选项详情 接口地址
            activityInfoUrl: 'activity/info/', //查询活动详情 接口地址

            pictureDeleteUrl: 'picture/delete/', //删除图片 接口地址
            designerDeleteUrl: 'designer/delete/', //删除设计师 接口地址
            caseDeleteUrl: 'case/delete/', //删除案例 接口地址
            voteDeleteUrl: 'vote/delete/', //删除投票 接口地址
            tipDeleteUrl: 'tip/delete/', //删除贴士 接口地址
            optionDeleteUrl: 'option/delete/', //删除选项 接口地址
            activityDeleteUrl: 'activity/delete/', //删除活动 接口地址

            appointmentApproveUrl:'appointment/saveappointment',//保存预约详情接口地址
            pictureApproveUrl:'picture/savepicture',//保存图片详情接口地址
            designerApproveUrl:'designer/savedesigner',//保存设计师详情接口地址
            caseApproveUrl:'case/savecase',//保存设计师详情接口地址
            tipApproveUrl:'tip/savetip',//保存小贴士详情接口地址
            voteApproveUrl:'vote/savevote',//保存小贴士详情接口地址
            optionApproveUrl:'option/saveoption',//保存小贴士详情接口地址
            activityApproveUrl:'activity/saveactivity',//保存活动详情接口地址
	        //页面访问配置
	        loginPage: '/cms/login.html', //登录页 页面地址
	        indexPage: '/cms/index.html', //首页 页面地址

            appointmnetInfoPage: '/cms/views/appointment/appointmentProcess.html', //预约详情弹出页 页面地址
			pictureInfoPage:'/cms/views/config/pictureConfig.html',//图片管理页 页面地址
			designerInfoPage:'/cms/views/config/designerConfig.html',//设计师管理页 页面地址
			caseInfoPage:'/cms/views/config/caseConfig.html',//案例管理页 页面地址
			tipInfoPage:'/cms/views/config/tipConfig.html',//小贴士管理页 页面地址
			voteInfoPage:'/cms/views/config/voteConfig.html',//投票管理页 页面地址
            optionInfoPage:'/cms/views/config/optionConfig.html',//选项管理页 页面地址
            activityInfoPage:'/cms/views/config/activityConfig.html',//活动管理页 页面地址

	        tokenSotreItemName: 'decorationcms_token', //令牌存储名
	        tableName: 'decorationcms',  // 全局变量存储表名
			// 获取缓存的token
	        getToken: function () {
	            var t = layui.data(layui.config.tableName).token;
	            if (t) {
	                return JSON.parse(t);
	            }
	        },
	        // 清除缓存的token
	        removeToken: function () {
	            layui.data(layui.config.tableName, {
	                key: 'token',
	                remove: true
	            });
	        },
	        // 缓存token
	        putToken: function (token, isRemember) {
	            layui.data(layui.config.tableName, {
	                key: 'token',
	                value: JSON.stringify(token)
	            });
	        },
	        // 左侧导航菜单设置
	        menus: [{
				"permissionId": "10K27xEi",
				"parentId": "0",
				"permissionName": "家装配置",
				"permissionValue": null,
				"isDelete": 0,
				"permissionIcon": "&#xe716;",
				"orderNumber": 0,
				"permissionType": 0,
				"parentName": null,
				"subMenus": [{
					"permissionId": "1ow0AXFF",
					"parentId": "10K27xEi",
					"permissionName": "图片列表",
					"permissionValue": "config/pictureList",
					"isDelete": 0,
					"permissionIcon": null,
					"orderNumber": 1,
					"permissionType": 0,
					"parentName": null,
					"subMenus": null
				},{
					"permissionId": "1ow0BXFF",
					"parentId": "10K27xEi",
					"permissionName": "案例列表",
					"permissionValue": "config/caseList",
					"isDelete": 0,
					"permissionIcon": null,
					"orderNumber": 2,
					"permissionType": 0,
					"parentName": null,
					"subMenus": null
				},{
                    "permissionId": "1ow0CXFF",
                    "parentId": "10K27xEi",
                    "permissionName": "设计师列表",
                    "permissionValue": "config/designerList",
                    "isDelete": 0,
                    "permissionIcon": null,
                    "orderNumber": 3,
                    "permissionType": 0,
                    "parentName": null,
                    "subMenus": null
                },{
                    "permissionId": "1ow0DXFF",
                    "parentId": "10K27xEi",
                    "permissionName": "小贴士列表",
                    "permissionValue": "config/tipList",
                    "isDelete": 0,
                    "permissionIcon": null,
                    "orderNumber": 4,
                    "permissionType": 0,
                    "parentName": null,
                    "subMenus": null
                },{
                    "permissionId": "1ow0EXFF",
                    "parentId": "10K27xEi",
                    "permissionName": "投票列表",
                    "permissionValue": "config/voteList",
                    "isDelete": 0,
                    "permissionIcon": null,
                    "orderNumber": 5,
                    "permissionType": 0,
                    "parentName": null,
                    "subMenus": null
                },{
                    "permissionId": "1ow0FXFF",
                    "parentId": "10K27xEi",
                    "permissionName": "选项列表",
                    "permissionValue": "config/optionList",
                    "isDelete": 0,
                    "permissionIcon": null,
                    "orderNumber": 6,
                    "permissionType": 0,
                    "parentName": null,
                    "subMenus": null
                },{
                    "permissionId": "1ow0GXFF",
                    "parentId": "10K27xEi",
                    "permissionName": "活动列表",
                    "permissionValue": "config/activityList",
                    "isDelete": 0,
                    "permissionIcon": null,
                    "orderNumber": 7,
                    "permissionType": 0,
                    "parentName": null,
                    "subMenus": null
                }]
			},
                {
                    "permissionId": "10K27xEj",
                    "parentId": "0",
                    "permissionName": "预约订单",
                    "permissionValue": null,
                    "isDelete": 0,
                    "permissionIcon": "&#xe63c;",
                    "orderNumber": 0,
                    "permissionType": 0,
                    "parentName": null,
                    "subMenus": [{
                        "permissionId": "1ow0DXFF",
                        "parentId": "10K27xEj",
                        "permissionName": "预约管理",
                        "permissionValue": "appointment/list",
                        "isDelete": 0,
                        "permissionIcon": null,
                        "orderNumber": 4,
                        "permissionType": 0,
                        "parentName": null,
                        "subMenus": null
                    }]
                }]

	    };
	    exports('config', applyConfig);	
	});
})
