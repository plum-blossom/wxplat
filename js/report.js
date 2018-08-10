 $(function(){
            // 获取url
            var url = window.location.href;
            // 获取url的id值
            var id = url.split('=')[1];
            // 请求数据并渲染
            $.ajax({
                type: "POST",
                url: "data/votesel.php",
                data:{id:id},
                success: function (data) {
                    data = JSON.parse(data);
                   var html = "";
                   console.log(data);
                   // 获取选项值数组
                   var optionArr = data[0].option.split(',');
                    // 投票总数
                    let choicesum = data.length;
                    // 投票选中项
                    // var arr = [1,1,0];
                     var choiceArr = [];
                     // 比例条数组
                     var barArr = [];
                     // 小计数组
                     var totalArr = [];
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
                        totalArr.push(len);
                        bar = Math.ceil((len/choicesum)*100);
                                barArr.push(bar);
                    }
                    for(var i=0;i<optionArr.length;i++){
                        //     // 渲染获取的选项
                            html = `
                                <tr>
                                    <td>${optionArr[i]}</td>
                                    <td class="subtotal">${totalArr[i]}</td>
                                    <td>
                                        <div class="progress">
                                            <div class="bar" style='width: ${barArr[i]}%;'></div>
                                        </div>
                                        ${barArr[i]}%
                                    </td>
                                </tr>
                                `;
                            $('#chart .tbody').append(html);
                    };
                    $('.span12 h2').html(`参与投票用户总数：${choicesum}人`);
                    $.each(data,function(k,v){
                        // console.log();
                        $('#userinfo #testlist tbody').append(`
                            <tr>
                                <td>${v.wxnickname}</td>
                                <td>${v.wxid}</td>
                            </tr>
                        `);
                    })
                },
                error: function () {
                    console.log("网络出现故障，请检查您的网络!");
                }
            });
        });