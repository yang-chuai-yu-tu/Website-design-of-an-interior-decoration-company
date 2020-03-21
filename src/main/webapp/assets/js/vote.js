
    //在每个投票选项后面写了个div，用div的宽度来代表当前该选项的投票数。
    function vote(voteName,voteId){  //函数vote，当点击确认投票的时候，调用vote方法

    var sum=0;
    var width=0;
        //for循环的条件是，所有投票选项的个数。
        for(var i = 0; i < document.getElementsByName(voteName).length; i++){
            var label = "label"+voteName+i;//lable标签里面写的是当前的投票数目。
            var txt = "txt"+voteName+i;//lable标签里面写的是当前的选项内容。
            var num = document.getElementById(label).innerText;//获取到当前的票数
            var optionName = document.getElementById(txt).innerText;
            //查找到是哪个投票选项被选中
            if(document.getElementsByName(voteName)[i].checked == true){
                var voteUrl = 'option/updateoption?name='+optionName+'&id='+voteId;
                $.get(voteUrl);
                num++;
                document.getElementById(label).innerText = num;//票数加1，并修改原值

            }
            sum +=Number(num);
        }
        for(var i = 0; i < document.getElementsByName(voteName).length; i++){
            var label = "label"+voteName+i;//lable标签里面写的是当前的投票数目。
            var num = document.getElementById(label).innerText;
            width=num/sum*100;
            document.getElementById(voteName+i).style.width = width+"%";
            document.getElementById(voteName+i).innerText = width.toFixed(2)+"%";
        }
        $("#"+voteName+"Submit").css('display','none');
        $("."+voteName).css('display','block');
        //alert("投票成功");

    }

