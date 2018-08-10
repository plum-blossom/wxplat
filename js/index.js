$(function(){

    // 加载列表函数
    function loadList(){
        $.ajax({
            type: "POST",
            url: "data/index.php",
            success: function (data) {
                var  newdata = JSON.parse(data);
                var html = "";
                var del= "";
                // 遍历获取到的数据 data
              	$.each(newdata, function (k, v) {
                    // 获取当前时间
                        var d = new Date();
                        var vYear = d.getFullYear()
                        var vMon = d.getMonth() + 1
                        var vDay = d.getDate()
                        var h = d.getHours();
                        var m = d.getMinutes();
                        var se = d.getSeconds();
                        // 时间格式为2018-08-14 16:21:56
                        var localtime = vYear + '-' +(vMon < 10 ? "0" + vMon : vMon) + '-' +(vDay < 10 ? "0" + vDay : vDay) + ' ' +(h < 10 ? "0" + h : h) + ':' +(m < 10 ? "0" + m : m) + ':' +(se < 10 ? "0" + se : se);
                        // 比较当前时间和活动结束时间
                        // 如果活动结束时间小于当前时间,状态改为已结束
                        if(v.endDate <=localtime){
                            v.states = 0;
                            // 调用修改状态函数
                            updateStates(v.id,v.states); 
                        }
                        // 状态显示 0-已结束-删除- 1-进行中-停止
                        if(v.states == 0){
                            v.states = '已结束';
                            del= "删除";
                        }else if(v.states == 1){
                          v.states = '进行中';
                          del = "停止";
                        }
                        // 要渲染的html
    		            html +=`
    			    <tr>
    			            <td>${v.activename}</td>
    			            <td>${v.keyword}</td>
    			            <td>${v.startDate} <span class="time-sep">&nbsp;~&nbsp;</span>${v.endDate}</td>
    			            <td>${v.states}</td>
    			            <td id="${v.id}">
    			                <span>
    			                [<a href="details.html?id=${v.id}">查看</a>]
    			                [<a href="report.html?id=${v.id}">统计图表</a>]
    			                [<a class="opt-del" href="javascript:void(0);">${del}</a>]
    			                [<a href="vote/vote.html?id=${v.id}" onclick="" title="查看二维码地址">查看二维码地址</a>]
    			                </span>
    			            </td>
    			        </tr>
    			    `
    			});
                // onclick="openQrcodeDialog('vote.html?id=${v.id}')"
                // 将加载的数据添加到html中
              	$('#tbody').html(html);
            },
            error: function () {
                console.log("网络出现故障，请检查您的网络!");
            }
        });       
    }

    // 加载列表
    loadList();

    //操作中的 删除处理 停止-进行中 删除-已结束
    $("#tbody ").on('click','td a.opt-del',function(){
       let id = $(this).parent().parent().attr('id');
       var text = $(this).text();
       // 停止活动，修改文字停止改为删除
        if(text == "停止"){
            if (confirm("确认停止这个活动？")) {
                text ="删除";
                $(this).empty().append(text);
                // 改变状态重新加载列表
                loadList();
                // 获取状态
                let states =  $(this).parent().parent().prev().text();
                states = 0;
                $(this).parent().parent().prev().empty().append(states);
                updateStates(id,states,loadList());
            }
        }else{
            // 删除活动 
            if(confirm("确认删除这个活动？")){
               $.ajax({
                    type: "POST",
                    url: "data/del.php",
                    data:{id:id},
                    success: function (data) {
                        // 刷新列表
                        loadList();
                    },
                    error: function () {
                        console.log("网络出现故障，请检查您的网络!");
                    }
                });
            }
        }
    });

});
// 修改状态 states--封装函数
function updateStates(id,states,fun){
    $.ajax({
        type: "POST",
        url: "data/update.php",
         data:{id:id,states:states},
         success: function (data) {
            // console.log(data);
            // 加载列表
            fun;
        },
        error: function () {
            console.log("网络出现故障，请检查您的网络!");
        }
    });
}

// 获取当前页面code的值  处理函数
function getUrlParams(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式 
    var r = window.location.search.substr(1).match(reg);  
    if (r != null) return unescape(r[2]); 
  return null; 
}
// var code = getUrlParams("code");
// console.log(code);

// 获取token
// https://api.weixin.qq.com/sns/oauth2/access_token?appid= wxab6ef39d2222b152&secret=7159e1042b9eabeea1ee051502ef3091&code=011rhKuF0dhidl20ayrF0FiOuF0rhKuT&grant_type=authorization_code
// 获取用户信息
function getUserMessage (){
    // 获取code值
    var code = "011rhKuF0dhidl20ayrF0FiOuF0rhKuT";
    // 请求获取用户信息
    $.ajax({ 
          // async: false, 
          url: "data/wx.php", //这是我的服务端处理文件php的
          type: "GET", 
          //下面几行是jsoup，如果去掉下面几行的注释，后端对应的返回结果也要去掉注释
          dataType: 'jsonp', 
          // jsonp: 'callback', //jsonp的值自定义,如果使用jsoncallback,那么服务器端,要返回一个jsoncallback的值对应的对象. 
          // jsonpCallback:'callback',
          data: {code:code}, //传递本页面获取的code到后台，以便后台获取openid
          timeout: 5000, 
          success: function (result) { 
            console.log(result);
          }, 
          error: function (jqXHR, textStatus, errorThrown) { 
              // alert(textStatus); 
          } 
    });
}
    
function openQrcodeDialog(url) {
    // 支持$.$.browser.mise --start
    jQuery.browser = {}; 
    (function () { 
    jQuery.browser.msie = false; 
    jQuery.browser.version = 0; 
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) { 
    jQuery.browser.msie = true; 
    jQuery.browser.version = RegExp.$1; 
    } 
    })();
    // 支持$.$.browser.mise --end

    if ($.browser.msie) {
        alert("不支持在IE浏览器下预览，建议使用谷歌浏览器或者360极速浏览器或者直接在微信上预览。");
        return;
    }
    // console.info(url);
    // var fullurl = "/qrcode/get?data=" + encodeURIComponent(url);
    var left = ($(window).width() - 450) / 2;
    var top = ($(window).height() - 450) / 2;
    var w = window.open(url, "微信预览地址二维码", "height=490,width=490,top=" + top + ",left=" + left + ",toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no");
}
