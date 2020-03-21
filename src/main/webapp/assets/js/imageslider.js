;(function (global) {

    "use strict";

    //预览图插件类
    var yPreview = function () { }

    // 插件构造函数，有必要调用到插件本身this的，就放在prototype上边，功能函数尽量放在下方工具中
    yPreview.prototype = {
        //插件类属性/配置
        options: {
            name: 'yPreview',//最外层组件ID
            yPreviewAreaId: 'yPreviewArea',//预览大图DIV ID
            yNavBarId: 'yNavBar', //导航缩略图DIV ID
            yNavBarPrevCls: 'prev',//导航 前向按钮类
            yNavBarPrevImg: 'ico/picSlideLeft.gif',//导航 前向按钮图片
            yNavBarNextCls: 'next',//导航 后向按钮类
            yNavBarNextImg: 'ico/picSlideRight.gif',//导航 后向按钮图片
            yNavBarImgAreaId: 'yNavBarImgArea', //导航 缩略图DIV ID
            elem: []//图片数组/JSON 每张图片至少有一个url键值对，样例数据[{'url':'images/a.gif'},{'url':'images/b.gif'}]
        },
        /**
         * @method 初始化
         * @param { object } 由@method config() 提供的配置参数
         */
        init: function (opts) {
            var _this = this;
            var option = config(opts, _this.options);//用户配置
            var pictures = option.elem;
            if (isEmpty(pictures) || !pictures.length || pictures.length<1) {
                return false;
            }

            //预览组件最外层元素
            var yPreviewEle = document.getElementById(option.name);
            //预览大图DIV
            initPreviewArea(option.yPreviewAreaId, yPreviewEle, pictures);
            //预览大图IMG
            var yPreviewImage = document.getElementById(option.yPreviewAreaId+'Image');

            //导航缩略图栏
            initNavBar(option, yPreviewEle, yPreviewImage);
        }
    };

    /**
     * 隐藏一个元素
     * @param elem 元素
     */
    function hide(elem) {
        elem.style.display = 'none';
    }

    /**
     * 显示一个元素
     * @param elem 元素
     */
    function show(elem) {
        elem.style.display = 'block';
    }

    /**
     * 设置元素的样式
     * @param elem 元素
     * @param styles 样式
     */
    function setStyle(elem, styles) {
        for (var key in styles) {
            elem.style[key] = styles[key];
        }
    }

    /**
     * 检查一个元素是否有class定义
     * @param cla class
     * @param element 元素
     * @returns {boolean} true：有；false： 无
     */
    function hasClass(cla, element) {
        if (element.className.trim().length === 0) return false;
        var allClass = element.className.trim().split(" ");
        return allClass.indexOf(cla) > -1;
    }

    /**
     * 为一个元素添加class
     * @param cla class
     * @param element 元素
     */
    function addClass(cla, element) {
        if (!hasClass(cla, element)) {
            if (element.setAttribute) {
                var oCls = element.getAttribute("class");
                if (isEmpty(oCls)) {
                    element.setAttribute("class", cla);
                } else {
                    element.setAttribute("class", oCls + " " + cla);
                }
            } else {
                var oCls = element.className;
                if (isEmpty(oCls)) {
                    element.className = cla;
                } else {
                    element.className = element.className + " " + cla;
                }
                element.className = oCls + " " + cla;
            }
        }
    }

    /**
     * 初始化大浏览图区域
     * @param yPreviewAreaId 预览大图DIV ID
     * @param yPreviewEle 预览组件最外层元素
     * @param pictures 用户传入的图片数组
     * @returns {HTMLDivElement} 预览大图DIV元素
     */
    function initPreviewArea(yPreviewAreaId, yPreviewEle, pictures) {
        var firstPicture = pictures[0];
        var div = document.createElement('div');
        div.setAttribute('id', yPreviewAreaId);
        var divStyle = {
            overflow: 'hidden' ,
            zIndex: 10,
            width: '788px',
            position: 'relative',
            textAlign: 'center',
            margin: '0 auto'
        };
        var img = document.createElement('img');
        img.setAttribute('id', yPreviewAreaId+'Image');
        img.setAttribute('src', firstPicture.url);
        img.setAttribute('data-id', '0');
        var imgStyle = {
            height: '570px'
        };
        setStyle(img, imgStyle);
        //img.style.transform = 'translate(-50%, -50%)';
        div.appendChild(img);
        setStyle(div, divStyle);
        yPreviewEle.appendChild(div);
        return div;
    }

    /**
     * 初始化导航缩略图栏
     * @param option 用户传入的配置，包括图片数组
     * @param yPreviewEle 预览组件最外层元素
     * @param yPreviewImage 预览大图IMG元素
     */
    function initNavBar(option, yPreviewEle, yPreviewImage) {
        var pictures = option.elem;
        var picArrLength = pictures.length;

        //第一步，建立导航缩略图栏DIV
        var div = document.createElement('div');
        div.setAttribute('id', option.yNavBarId);
        div.setAttribute('data-pos', '1');
        var divStyle = {
            background: '#EAEBF0',
            position: 'relative',
            height: '122px',
            border: '1px solid #D6D9DC',
            marginTop: '12px'
        };
        setStyle(div, divStyle);
        yPreviewEle.appendChild(div);

        //第二步，建立前向、后向按钮
        var prev = document.createElement('i');
        addClass(option.yNavBarPrevCls, prev);
        var prevStyle = {
            cursor: 'pointer',
            position: 'absolute',
            top: '32px',
            left: '10px',
            zIndex: 9
        };
        setStyle(prev, prevStyle);
        div.appendChild(prev);

        var previmg = document.createElement('img');
        previmg.setAttribute('src',option.yNavBarPrevImg);
        prev.appendChild(previmg);

        var next = document.createElement('i');
        addClass(option.yNavBarNextCls, next);
        var nextStyle = {
            cursor: 'pointer',
            position: 'absolute',
            top: '32px',
            right: '10px',
            zIndex: 9
        };
        setStyle(next, nextStyle);
        div.appendChild(next);

        var nextimg = document.createElement('img');
        nextimg.setAttribute('src',option.yNavBarNextImg);
        next.appendChild(nextimg);

        //第三步，建立缩略图DIV
        var yNavBarImgArea = document.createElement('div');
        yNavBarImgArea.setAttribute('id', option.yNavBarImgAreaId);
        var barImfAreaStyle = {
            width: '690px',
            height: '116px',
            overflow: 'hidden',
            position: 'relative',
            top: '10px',
            margin: '0 auto'
        };
        setStyle(yNavBarImgArea, barImfAreaStyle);
        div.appendChild(yNavBarImgArea);

        //第四步，建立缩略图DIV下UL/LI
        var ul = document.createElement('ul');
        var ulStyle = {
            position:'relative',
            width:'10000px',
            height:'122px',
            listStyleType:'none'
        };
        setStyle(ul, ulStyle);
        yNavBarImgArea.appendChild(ul);

        var liStyle = {
            listStyleType:'none',
            float:'left',
            padding:'8px 3px 3px 3px',
            width:'116px',
            height:'86px',
            cursor:'pointer',
            textAlign:'center',
            marginRight:'20px',
            position:'relative'
        };

        var imgStyle = {
            width:'116px',
            height:'86px',
            display:'block'

        };

        var ttStyle = {
            background:'#000',
            color:'#FFF',
            position:'absolute',
            right:'4px',
            bottom:'4px',
            zIndex:'20',
            fontFamily:"宋体",
            fontSize:'12px',
            lineHeight:'16px',
            padding:'0 5px'
        };

        var imgEles = [];
        for (var i = 0; i < picArrLength; i++) {
            var li = document.createElement('li');
            setStyle(li, liStyle);
            ul.appendChild(li);
            var img = document.createElement('img');
            setStyle(img, imgStyle);
            var tt = document.createElement('tt');
            setStyle(tt, ttStyle);
            li.appendChild(img);
            li.appendChild(tt);
            img.setAttribute('data-id', i);
            img.setAttribute('src',pictures[i].url);
            tt.innerText = pictures[i].category;

            img.addEventListener('click', function () {
                showImg(yPreviewImage, this);
            });

            imgEles.push(img);
        }

        prev.addEventListener('click', function () {
            var idx = parseInt(yPreviewImage.getAttribute('data-id'));
            if (idx >= 1 ) {
                --idx;
                showImg(yPreviewImage, imgEles[idx]);
            }
            var i = parseInt(div.getAttribute('data-pos'));
            if(i<2 || i>picArrLength+5) {return false;}

            $('#'+option.yNavBarId+' ul').animate({ "left": "+=142px" },200);
            i--;
            div.setAttribute('data-pos', i+"");

        });

        next.addEventListener('click', function () {
            var idx = parseInt(yPreviewImage.getAttribute('data-id'));
            var i = parseInt(div.getAttribute('data-pos'));

            if (idx >= 0 && idx < picArrLength-1) {
                ++idx;
                showImg(yPreviewImage, imgEles[idx]);
            } else{
                if(confirm("已经是最后一张,点击确定重新浏览！")){
                    showImg(yPreviewImage, imgEles[0]);
                    //var aniPx=(picArrLength-5)*142+'px'; //所有图片数 - 可见图片数 * 每张的距离 = 最后一张滚动到第一张的距离
                    $('#'+option.yNavBarId+' ul').animate({ "left": "+="+aniPx },200);
                    i=1;
                    div.setAttribute('data-pos', i+"");
                }
                return false;
            }

            if(i<0 || i>picArrLength-5) {
                return false;
            }

            $('#'+option.yNavBarId+' ul').animate({ "left": "-=142px" },200);
            i++;
            div.setAttribute('data-pos', i+"");
        })

    }

    function showImg(yPreviewImage, img) {
        var src = img.getAttribute('src');
        $('#'+yPreviewImage.getAttribute('id')).stop(true,true);
        //yPreviewImage.stop(true,true);
        yPreviewImage.setAttribute('src', src);
        yPreviewImage.setAttribute('data-id', img.getAttribute('data-id'));
        $('#'+yPreviewImage.getAttribute('id')).show().fadeIn(800);
    }

    function getNodeClass(className) {
        var _elems = document.getElementsByClassName(className);
        return _elems
    }

    // 工具函数
    // 检查非空
    function isEmpty(val) {
        return val != '' && val != null && val != undefined ? false : true;
    }

    /**
     * @method 配置
     * @param opts { object } 用户提供的参数，在没有提供参数的情况下使用默认参数
     * @param options { object } 默认参数
     * @return options { object } 返回一个配置对象
     */
    function config(opts, options) {
        //默认参数
        if (!opts) return options;
        for (var key in opts) {
            if (!!opts[key]) {
                options[key] = opts[key];
            }
        }
        return options;
    }

    global.yPreview = yPreview;//注册到全局中， 届时可以直接new yPreview() 实例化对象

}(this))
