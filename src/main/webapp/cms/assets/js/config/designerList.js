$(function() {
    var layer = parent.layer === undefined ? layui.layer : top.layer;
    var config = layui.config;
    var searchBtnObj = $("#searchBtn");
    var addBtnObj = $("#addBtn");
    var listTableUrl = config.base_server + config.designerListUrl;

    // 检查是否登录
    if (!config.getToken() || config.getToken() == '') {
        location.replace(config.base_server + config.loginPage);
        return;
    }



    //渲染表格
    var tableIns = layui.table.render({
        elem: '#designerList',
        url: listTableUrl,
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Accept": "application/json",
            "user-jwt": config.getToken().ultk
        },
        page: true,
        cellMinWidth: 100,
        height: "full-250",
        cols: [
            [{field: 'id', sort: true, title: '编号', width: 100, fixed: 'left'},
                {field: 'name', sort: true, title: '姓名', width: 100},
                {field: 'exp', sort: true, title: '经验', width: 100},
                {field: 'intro', sort: true, title: '简介', width: 720},
                {field: 'rank', sort: true, title: '头衔', width: 100},
                {field: 'style', sort: true, title: '擅长风格', width: 100},
                {fixed: 'right', align: 'center', toolbar: '#barTpl', width: 160, title: '操作'}
            ]
        ],
        response: {
            statusName: 'status', //数据状态的字段名称，默认：code
            statusCode: 200, //成功的状态码，默认：0
            msgName: 'error', //状态信息的字段名称，默认：msg
            countName: 'count', //数据总数的字段名称，默认：count
            dataName: 'data' //数据列表的字段名称，默认：data
        },
        done: function (res, curr, count) {
            if (res.status == 401) {
                layui.config.removeToken();
                layer.msg((res.error != null && res.error != undefined) ? res.error : '登录过期', {icon: 2}, function () {
                    location.href = '/' + layui.config.loginPage;
                });
            }
        }
    });

    //工具条点击事件
    layui.table.on('tool(designerList)', function (obj) {
        var data = obj.data;
        //var layEvent = obj.event;
        if(obj.event=="edit"){
            showDesigner(data);
        }
        else if (obj.event=="delete"){
            layer.alert('您确定要删除这条数据吗？', {
                skin: '' //样式类名  自定义样式
                ,closeBtn: 1    // 是否显示关闭按钮
                ,anim: 1 //动画类型
                ,btn: ['确定','取消'] //按钮
                ,icon: 3    // icon
                ,yes:function(){
                    deleteDesigner(data);
                }
                ,btn2:function(){
                    layer.close();
                }});
        }
    });

    //搜索按钮点击事件
    if (searchBtnObj[0]) {
        searchBtnObj.click(function () {
            doSearch();
        });
    }

    if (addBtnObj[0]) {
        addBtnObj.click(function () {
            showDesigner();
        });
    }
});

//搜索
function doSearch() {
    var searchRank = $("#searchRank").val();
    var requestWhere = {};
    if (nullData(searchRank) != "") {
        requestWhere.rank = searchRank;
    }
        layui.table.reload('designerList', {
            where: requestWhere,
            page: {
                curr: 1 //重新从第 1 页开始
            },
            done: function(res, curr, count){
                this.where={};
            }
        });
}