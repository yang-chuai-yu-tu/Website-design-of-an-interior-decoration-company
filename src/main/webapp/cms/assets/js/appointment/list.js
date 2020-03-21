$(function() {
    var layer = parent.layer === undefined ? layui.layer : top.layer;
    var config = layui.config;
    var searchBtnObj = $("#searchBtn");
    var listTableUrl = config.base_server + config.appointmentListUrl;

    // 检查是否登录
    if (!config.getToken() || config.getToken() == '') {
        location.replace(config.base_server + config.loginPage);
        return;
    }


    layui.use('laydate', function () {
        var laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
            elem: '#searchOrderDate' //指定元素
        });
    });

        //console.log(citynames);
        citynames.forEach(initCity);
        layui.form.render('select');

        //渲染表格
        var tableIns = layui.table.render({
            elem: '#appointmentList',
            url: listTableUrl,
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Accept": "application/json",
                "user-jwt": config.getToken().ultk
            },
            page:true,
            cellMinWidth: 100,
            height: "full-250",
            cols: [
                [{field: 'id', sort: true, title: '编号', width: 100, fixed: 'left'},
                    {
                        field: 'orderDate', sort: true, templet: function (d) {
                            return layui.util.toDateString(d.orderDate, 'yyyy年MM月dd日');
                        }, title: '预约时间', width: 150
                    },
                    {field: 'province', sort: true, title: '地区', width: 100},
                    {field: 'customerName', sort: true, title: '顾客姓名', width: 100},
                    {field: 'phoneNum', sort: true, title: '顾客电话', width: 200},
                    {
                        field: 'processDate', sort: true, templet: function (d) {
                            return layui.util.toDateString(d.processDate, 'yyyy年MM月dd日');
                        }, title: '处理时间', width: 150
                    },
                    {field: 'designerName', sort: true, title: '设计师', width: 100},
                    {field: 'status', sort: true, templet: '#statusTpl', width: 80, title: '状态'},
                    {field: 'note', sort: true, title: '批注', width: 238},
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
        layui.table.on('tool(appointmentList)', function (obj) {
            var data = obj.data;
            //var layEvent = obj.event;

            showAppointment(data);
        });

        //搜索按钮点击事件
        if (searchBtnObj[0]) {
            searchBtnObj.click(function () {
                doSearch();
            });
        }
    });

//搜索
    function doSearch() {
        var searchStat = $("#searchStat").val();
        var searchOrderDate = $("#searchOrderDate").val();
        var searchLocation = $("#searchLocation").val();
        var requestWhere = {};
        if (nullData(searchStat) != "") {
            requestWhere.status = searchStat;
        }
        if (nullData(searchOrderDate) != "") {
            requestWhere.orderDate = searchOrderDate;
        }
        if (nullData(searchLocation) != "") {
            requestWhere.location = searchLocation;
        }
        layui.table.reload('appointmentList', {
            where: requestWhere,
            page: {
                    curr: 1 //重新从第 1 页开始
            },
            done: function(res, curr, count){
                this.where={};
            }
        });
    }

    function initCity(city, index) {
        $("#searchLocation").append("<option value='" + city.cityname + "'>" + city.cityname + "</option>");
    }

