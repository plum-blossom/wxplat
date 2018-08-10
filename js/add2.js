$(function(){// 图片预览
    var file ={};
var filename="";
    $("#file_upload_cover1").change(function(){

        var objUrl = getObjectURL(this.files[0]) ;
        // console.log("objUrl = "+objUrl) ;
        if (objUrl) {
            $("#cover1_img").attr("src", objUrl) ;
            var imgUrl = $("#cover1_img").attr('src');
            var vcoverImgUrl =$('#defaultconver').attr('src',imgUrl);
            // var file = this.files[0];
            // var url = URL.createObjectURL($(this)[0].files[0]);
            // console.log(objUrl);
            var cover1 =$('#cover1').attr('value',objUrl);
            // console.log(cover1);
            // 获取图片名称
            // file对象
            file = this.files[0];
            // 图片名称
            filename = file.name;
            // console.log(file.size);
            if(file.size > 2*1024*1024){
                alert("文件过大，不能上传大于2M的文件");
            }
            // console.log(file);
            // console.log(filename);
            
            // console.log(file.name);
            
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
// 保存
$('#save-btn').click(function(){
    // 获取所有name=option的值
    var arr= new Array();
    $(".controls input[name='option']").each(function(){
        arr.push($(this).val());
     });
    var option ="";
    arr.length>0 ? option = arr.join(",") : "";
    //获取图片
   
    // 遍历获取form表单的值
    var data= $('#surveyform').serializeArray();
    let newData = {};
    $.each(data,function(index,item){
        if(!newData[item.value]){
            newData[item.name] = {};
        }
        newData[item.name] = item.value;
    })
    // console.log(newData);
    // formData = newData;
    // 图片 images/
    filename = 'images/'+filename;
    newData.cover1 = filename;
    // console.log(newData.cover1);
    // 将name=option的值赋值给新数组
    newData.option=option;
    // 0--结束  1--未开始 2--进行中
    newData.states =1;
    console.log(newData);
    var activityname = $('#activityname').val();
    var file_upload_cover1 = $('#file_upload_cover1').val();
    var option = $("input[type='option']").val();
    var maxsel = $('#maxsel').val();
    var keyword = $('#keyword').val();
    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();
    // console.log(activityname+","+cover1_img+","+option+","+maxsel+","+keyword+","+startDate)
    if(activityname != '' && file_upload_cover1 != '' && option != '' && maxsel != '' && keyword != '' && startDate != '' && endDate!=''){
       // 添加数据到库
        $.ajax({
            type: "POST",
            url: "data/active.php",
            data: newData,
            success: function (data) {
                console.log(data);
            },
            error: function () {
                console.log("网络出现故障，请检查您的网络!");
            }
        });
        
    }else{
        // alert('请填完必写项，再提交');
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
        $(".voption-cont").append('<label class="checkbox"><input type="checkbox" /><span></span></label>');
        if ($(".option-group .option").size() >= 100) {
            $(this).hide();
        }
    });
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
            $voption.append('<label class="checkbox"><input type="checkbox" /><span>' + $(this).find("input").val() + '</span></label>');
        });
    }
    synOption();

});
