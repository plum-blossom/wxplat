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
 