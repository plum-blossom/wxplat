$(function(){
    var file ={};
    var filename="";
    // 保存按钮
    $btn = $('#save-btn');
    // // 图片预览
    $("#file_upload_cover1").change(function(){
        var objUrl = getObjectURL(this.files[0]) ;
        if (objUrl) {
            $("#cover1_img").attr("src", objUrl) ;
            var imgUrl = $("#cover1_img").attr('src');
            // 左侧活动图片相应的改变
            var vcoverImgUrl =$('#defaultconver').attr('src',imgUrl);
            // 右侧图片改变
            var cover1 =$('#cover1').attr('value',objUrl);
            // 获取图片名称
            // file对象
            file = this.files[0];
            // 图片名称
            filename = file.name;
        }
    }) ;

    //建立一個可存取到該file的url
    function getObjectURL(file) {
        var url = null ; 
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    };
    
    // 保存 btn
    $('#save-btn').click(function(){
        // 获取选项下所有name=option的值放置到数组中
        var arr= new Array();
        $(".controls input[name='option']").each(function(){
            arr.push($(this).val());
        });
        var option ="";
        arr.length>0 ? option = arr.join(",") : "";
        //获取图片
       
        // 遍历获取form表单的值
        var data= $('#surveyform').serializeArray();
        // console.log(data);
        let newData = {};
        $.each(data,function(index,item){
            if(!newData[item.value]){
                newData[item.name] = {};
            }
            newData[item.name] = item.value;
        });
        // console.log(newData);
        // 图片 images/
        // filename = 'images/'+filename;
        newData.cover1 = 'images/'+filename;
        // console.log(newData.cover1);
        // 将name=option的值赋值给新数组
        newData.option=option;
        // 0--结束  1--未开始 2--进行中
        newData.states =1;
        // file对象
        // newData.file = file;
        // console.log(newData);
        var activityname = $('#activityname').val();
        var file_upload_cover1 = $('#file_upload_cover1').val();
        var option = $("input[type='option']").val();
        var maxsel = $('#maxsel').val();
        var keyword = $('#keyword').val();
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
        // 计算一周后的日期
        var weektime =parseInt(startDate.trim().split(" ")[0].split("-")[2])+7; //一周后的天数
        var time = startDate.trim().split(" ")[1];//时分秒
        var weektimey =startDate.trim().split(" ")[0].split("-")[2]; //开始天数
        var timeArr = startDate.trim().split(" ")[0].split("-");//年月日
        // 替换 一周后的天数-开始的天数
        timeArr.splice(2,1,weektime.toString());
        // 一周后的时间
        var week = timeArr.join('-')+" "+time;
        // console.log(week);
        
        // 最多选项不能大于选项 最多项获取
        var optionArr =[];
        $(".option-group .option").each(function () {
            if($(this).find("input").val() != ""){
                optionArr.push($(this).find("input").val());
            }
        });
        // console.log(optionArr);
       
        // 活动说明不能超过200字
        // console.log($('#activityname').val());
         // 关键词不包含标点符号
        var keyword =  $('#keyword').val();
        //匹配这些中文标点符号 @ * 。 ？ ！ ， 、 ； ： “ ” ‘ ' （ ） 《 》 〈 〉 【 】 『 』 「 」 ﹃ ﹄ 〔 〕 … — ～ ﹏ ￥
        var reg = /[\u0040|\u002a|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
        // 表单验证
        if($('#activityname').val() == "" || $('#activityname').val().length > 64){
            alert("请填写活动名称或活动名称不能超过200字");
        }else if(isEmptyObject(file) == true || $('#file_upload_cover1').val()== ""){
            alert("请选择上传图片");
        }else if(optionArr.length < 2){
            alert("请填写选项中内容");
        }else if(parseInt($("#maxsel").val()) > optionArr.length ||$("#maxsel").val() == ""){
            alert("请选择最多项或最多选项已大于选项");
        }else if(reg.test(keyword) || keyword == ""){
          alert('关键词不能为空或包含标点符号');
        }else if($('#summary').val().length > 200 || $('#summary').val() == ""){// 活动说明不能超过200字
            alert("请填写说明或活动说明不能超过200字");
        }else if(endDate == '' || endDate <= startDate){
            alert("请选择时间或活动结束时间小于开始时间");
        }else if(endDate > week){
            alert("活动持续时间不能超过7天");
        }else{
            // 添加数据到库
            $.ajax({
                type: "POST",
                url: "data/active.php",
                data: newData,
                success: function (data) {
                    file = null;
                    // console.log(data);
                    window.location = "index.html";
                },
                error: function () {
                    console.log("网络出现故障，请检查您的网络!");
                }
            });
        }
        // 判断file对象是否为空
        function isEmptyObject(e){
            var t;
            for(t in e) return !1;
                return !0;
        }
    });
});
// 删除选项
$(function(){
    // 日期
    var startDate = new Date();
    startDate.setTime(startDate.getTime());
    $('#startDate').datetimepicker({ minDateTime: startDate });
    $('#endDate').datetimepicker({ minDateTime: startDate });
    // 右侧活动名称与左侧活动标题同步
    $("#activityname").bind("keyup", function () {
        $(".vtitle").text($(this).val());
    });
    // 右侧summary与左侧vsummary同步
    $("#summary").bind("keyup", function () {
        $(".vsummary").text($(this).val());
    });
    // 增加选项
    $("#add-option").click(function () {
        var html = '<div class="option">' +
            '<input type="text" name="option" /> ' +
            '<a class="del-option" href="javascript:;">删除</a>' +
            '</div>';
        $(this).before($(html));
        $(".voption-cont").append('<label class="checkbox"><input type="checkbox" name="cb"/><span></span></label>');
        if ($(".option-group .option").size() >= 100) {
            $(this).hide();
        }
        // 选择checkbox 最多两个  
        $(".voption-cont .checkbox input:checkbox").click(function() {
            var radio_len = $("input:checkbox:checked").length;
            console.log(radio_len);
            if (radio_len > 2) {
            alert('最多只能选二个-.-');
            return false;
            }
        });
    });
    // 删除选项 至少包含两个选项
    $(".option-group").delegate("a.del-option", "click", function () {
        var $option = $(this).parent();
        var index = $option.index();
        if ($option.parent().find(".option").size() == 2) {
            alert("至少包含两个选项");
            return false;
        }
        if ($(".oid", $option).size() > 0) {
            window.delOptionId.push($(".oid", $option).val());
        }
        $option.remove();
        $(".voption-cont").find(".checkbox").eq(index).remove();
        if ($(".option-group .option").size() < 100) {
            $("#add-option").show();
        }
    });
    // 左侧添加对应的选项的删除
    $(".option-group").delegate("input[name='option']", "keyup", function () {
        var $input = $(this);
        var index = $input.parent().index();
        $(".voption-cont").find(".checkbox span").eq(index).text($input.val());
    });
    // 左侧添加对应的选项
    function synOption() {
        var $voption = $(".voption-cont");
        $voption.empty();
        $(".option-group .option").each(function () {
            $voption.append('<label class="checkbox"><input type="checkbox" name="cb"/><span>' + $(this).find("input").val() + '</span></label>');
        });
    }
    synOption();

});
// 图片上传 --start
function uploadFiles(){
    var file = document.querySelector("#file_upload_cover1");
    file.onchange = function(){
        var files = this.files;
        for(var i=0;i<files.length;i++){
            ajax('data/upload_file.php',files[i],function(data){
                // console.log(data)
                // console.log('fn')
            })
        }
    }
 }
function ajax(url,data,fn){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4&&xhr.status==200){
                fn(xhr.responseText)
            }
        }
        var formData = new FormData();
        formData.append('file',data);
        xhr.open('POST',url,true);
        //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(formData);
};
uploadFiles();
// 图片上传 --end
