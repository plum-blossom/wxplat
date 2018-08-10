$(function(){
	var id =4;
	$.ajax({
        type: "POST",
        url: "../data/sel.php",
        data:{id:id},
        success: function (data) {
            data  = $.parseJSON(data);
            $.each(data, function (k, v) {
               // 加载活动标题
            	var activename = $('.title-cont .title').empty().append(v.activename);
            	// 修改title
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
	                    // console.log(options[i]);
	                    var op =`<div class="option fn-clear option-statis" data-value="11">
			                <div>${options[i]}</div>
			                <div class="progress"><div data-per="50" class="bar bar0" style="width: 0%;"></div></div>
			                <span class="per">1(50%)</span>
			            </div>
			            <img class="sep" src="images/option_sep.jpg" />`
	                    $('.option-proportion').before(op);
	            }
            });
            // 比例
            $(".option").each(function(item,index){
                var $option = $(this);
                var $bar = $option.find(".bar");
                var per = $bar.attr("data-per");
                $bar.css("width",per+"%");
                var left = $option.find(".progress").width() * per/100 + 18;
                $(this).find(".per").css("left",left + "px");
            });


        },
        error: function() {
            alert("网络故障，请检查");
        }
    });
	var maxsel = "2";
	
	$(document).on('ajaxBeforeSend', function(e, xhr, options){
		$("#loading").show();
	}).on("ajaxComplete ",function(e, xhr, options){
		//$("#loading").hide();
	});
	function ShowCountDown() {
		var now = new Date();
		var endDate = new Date('2018', '7', '12', '9', '18');
		var leftTime = endDate.getTime() - now.getTime();
		var leftsecond = parseInt(leftTime / 1000);
		var day1 = Math.floor(leftsecond / (60 * 60 * 24));
		var hour1 = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
		var hour = Math.floor((leftsecond - 60 * 60) / 3600);
		//如果小时为负数 显示0
		if (hour < 0) {
			hour = 0;
		}
		if (day1 < 0) {
		hour = hour1;
		}
		var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour1 * 3600) / 60);
		var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour1 * 3600 - minute * 60);
		var text = "";
		//如果结束时间为负数 就显示0
		if (leftTime > 0) {
			text = day1 + "天" + hour1 + "小时" + minute + "分" + second + "秒";
		} else {
			text = 0 + "天" + 0 + "小时" + 0 + "分" + 0 + "秒";
		}
		$(".timeout .text").text("距离投票结束还有" + text);
	}
	window.setInterval(function () { ShowCountDown(); }, 1000);
	ShowCountDown();
});
