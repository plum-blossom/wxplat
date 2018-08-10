$(function(){
    // 获取当前页面url    
    var url = window.location.href;
    var urlObj = getSearchString(url);//调用函数处理url
    var timer = null;//定时器
    // 获取id
    var id = urlObj.id;
    // 加载投票数据函数
    function loadVoteData(id){
        $.ajax({
            type: "POST",
            url: "../data/sel.php",
            data:{id:id},
            success: function (data) {
                data  = $.parseJSON(data);
                $.each(data, function (k, v) {
                   // 加载活动标题
                var activename = $('.title-cont .title').empty().append(v.activename);
                    document.title = v.activename;
                // // 加载图片
                var cimg = $('.cover .cimg').attr('src',"../"+v.cover1);
                // // console.log(activename);
                // // 加载summary
                $('.summary').empty().append(v.summary);
                var options = v.option.split(',');
                        // console.log(options);
                        // 加载选项
                        for(var i=0;i<options.length;i++){
                                var op =`<div class="option fn-clear option-statis" data-value="3">
                                    <img class="checkimg" src="images/checkimg.png" />
                                    <img class="checkimg-check" src="images/checkimg_check.png" />
                                    <div class="options">${options[i]}</div>
                                </div>
                                <img class="sep" src="images/option_sep.jpg" />`
                                // 添加到dom
                                $('.option-proportion').before(op);
                            }
                });
                // 选择
                $(".option").on("click",function(){
                    var $option = $(this);
                    $option.toggleClass("option-sel");
                    $("#musicClick")[0].play();
                });
            },
            error: function() {
                alert("网络故障，请检查");
            }
        });
    }
    // 获取参数人数
    function loadparameters(id){
        $.ajax({
                type : "POST",
                url : "../data/votesel.php",
                data : {id:id},
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success : function(data){
                    data = JSON.parse(data);
                    let choicesum = data.length;
                    $('.count').empty().text(choicesum);
                },
                error : function(){
                    alert("网络故障，请检查");
                }
        });
    }
    // 获取活动结束时间
    function getEndTime(id){
        $.ajax({
                type : "POST",
                url : "../data/sel.php",
                data : {id:id},
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success : function(data){
                    data = JSON.parse(data);
                    endDate = data[0].endDate;
                    // console.log(endDate);
                    var timeArr = endDate.trim().split(" ")[0].split("-");//年月日
                    year = timeArr[0]*1;
                    month = timeArr[1]*1;
                    day = timeArr[2]*1;
                    hour = endDate.trim().split(" ")[1].split(':')[0]*1;//时分秒
                    minute = endDate.trim().split(" ")[1].split(':')[1]*1;
                    second = endDate.trim().split(" ")[1].split(':')[2]*1;
                    leftTimer(year,month,day,hour,minute,second);
                   
                },
                error : function(){
                    alert("网络故障，请检查");
                }
        });
    }
    // 倒计时
    function leftTimer (year,month,day,hour,minute,second){
        timer = window.setInterval(function(){ 
          var leftTime = (new Date(year,month-1,day,hour,minute,second)) - (new Date()); //计算剩余的毫秒数 
          var days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数 
          var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时 
          var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
          var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
          days = checkTime(days); 
          hours = checkTime(hours); 
          minutes = checkTime(minutes); 
          seconds = checkTime(seconds); 
          //如果结束时间为负数 就显示0
            if (leftTime > 0) {
                text = days+"天" + hours+"小时" + minutes+"分"+seconds+"秒";
            } else {
                text = 0 + "天" + 0 + "小时" + 0 + "分" + 0 + "秒";
            }
            $(".timeout .text").text("距离投票结束还有" + text);
            // 清除定时器
            if(days == 0 && hours ==0 && minutes == 0 && seconds == 0){
                clearInterval(timer);
            }
        },1000);
        
    } 
    function checkTime(i){ //将0-9的数字前面加上0，例1变为01 
      if(i<10) 
      { 
        i = "0" + i; 
      } 
      return i; 
    } 
    
    getEndTime(id);
    // 加载数据
    loadVoteData(id);
    // 加载参数人数
    loadparameters(id);
    // 获取url函数--start
    function getSearchString(Url) {
        // 获取URL中?之后的字符
        var str = Url;
        str = url.split('?')[1];
        // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
        var arr = str.split("&");
        var obj = new Object();

        // 将每一个数组元素以=分隔并赋给obj对象 
        for(var i = 0; i < arr.length; i++) {
        var tmp_arr = arr[i].split("=");
        obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
        }
        return obj;
    }
    // 获取url函数--end
    
    var maxsel = "1";

    // 提交数据
    $("#submit").on("click",function(){
        // 比例数组
        var barArr = [];
        // 按钮
        var $btn = $(this);
        // 播放音频
        $("#musicClick")[0].play();
        // 按钮禁用判断
        if($btn.hasClass("disabled")) return;
        // 选项
        var $answer = $(".option-cont .option-sel");
        // console.log($answer);
        // 选项验证
        if($answer.size() == 0){
            alert("请选择一个答案!");
            return;
        }
        if($answer.size() > maxsel){
            alert("本题最多只能选择个"+maxsel+"答案!");
            return;
        }
        var i=0;
        var ans = "";
        $answer.each(function(index,o){
            if(i++ != 0){
                ans += ",";
            }
            ans += $(o).attr("data-value");
        });
        
        // 禁用按钮
        $btn.addClass("disabled");
        // 获取选项
        var optionArr = [];
        $('.option .options').each(function(){
            optionArr.push($(this).text());
        })
        var options = optionArr.join(',');
        // 获取选中选项的值
        var choice = $('.option-sel .options').text();
        var choiceArr = [];
        $('.option-sel .options').each(function(index, el) {
            choiceArr.push($(this));
        });
        var choicesum = choiceArr.length;
        // 要提交的数据
        var submitData = {
            "vid":id,
            "wxid": "ojLZl1CTdr487g624_mB_pZ5_Mxg",
            "nickname" : "杜xx",
            "options":options,
            "choice":choice,
            "choicesum":choicesum,
        };
        // 提交时修改页面为已投票的页面
        function voteUpdate(id){
            // 移除元素
                // 投票提示
            $('.tip-cont').remove();
                // 选项图片
            $('.option img').remove();
            // 获取数据
             $.ajax({
                type : "POST",
                url : "../data/votesel.php",
                data : {id:id},
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success : function(data){
                    data  = $.parseJSON(data);
                    // 投票总数
                    var choicesum = data.length;
                    // 参数人数
                    $('.count').empty().text(choicesum);
                    // 选项总数
                    var choiceArr = [];
                    for(var j=0;j<optionArr.length;j++){
                        for(var i=0;i<data.length;i++){
                            if(optionArr[j]== data[i].choice){
                                choiceArr.push(data[i].choice);

                            }
                        }
                       getSameNum(optionArr[j],choiceArr); 
                    }
                    function getSameNum(val,arr){
                        processArr = arr.filter(function(value) {
                            return value == val;
                        });
                        var len = processArr.length;
                        // 添加比例条
                        $('.option .options').each(function(){
                            var bar = "";
                            if($(this).text()*1 == val){
                                 bar = Math.ceil((len/choicesum)*100);
                                // console.log(bar);
                                barArr.push(bar);
                                $(this).after(`
                                    <div class="progress"><div data-per="${bar}" class="bar bar0" style="width: 0%;"></div></div>
                                    <span class="per">${choicesum}(${bar}%)</span>
                                    `) ;
                            }
                            // 比例条显示
                            $(".option").each(function(item,index){
                                var $option = $(this);
                                var $bar = $option.find(".bar");
                                var per = $bar.attr("data-per");
                                $bar.css("width",per+"%");
                                var left = $option.find(".progress").width() * per/100 + 18;
                                $(this).find(".per").css("left",left + "px");
                            }); 
                            
                        });
                    }
                    
                    // 更改图片 投票-已投票
                    $("#submit").attr('src',"images/vote_off.png").removeAttr("id");
                },
                error : function(data){
                    alert("抱歉,服务器繁忙");
                }
            });
        }
        // 提交数据
        function subData(submitData){
            $.ajax({
                type : "POST",
                url : "../data/votepost.php",
                data : submitData,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success : function(data){
                    // console.log(data);
                    $btn.removeClass("disabled");
                    if (data == "添加成功") {
                        alert("投票成功，谢谢您的参与！");
                        // window.location.reload();
                        voteUpdate(id);
                    } else {
                        $("#loading").hide();
                        alert("网络故障，请稍后再试试 -_-!");
                    }
                },
                error : function(data){
                    $btn.removeClass("disabled");
                    $("#loading").hide();
                    alert("抱歉,服务器繁忙");
                }
            });
        }
        subData(submitData);
    });
    // 再发送请求前后加载load图片 --Zepto
    $(document).on('ajaxBeforeSend', function(e, xhr, options){
        $("#loading").show();
    }).on("ajaxComplete ",function(e, xhr, options){
        $("#loading").hide();
    });

    

});