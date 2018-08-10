<?php
// echo "<pre>"; 
// print_r($_FILES); 
// echo "</pre>";

//获取文件的大小  
    $file_size=$_FILES['file']['size'];  
    if($file_size>2*1024*1024) {  
        echo "文件过大，不能上传大于2M的文件";  
        exit();  
    }
    // 文件名  
    //判断是否上传成功（是否使用post方式上传）  
    if(is_uploaded_file($_FILES['file']['tmp_name'])) {  
        //把文件转存到你希望的目录（不要使用copy函数）  
        $uploaded_file=$_FILES['file']['tmp_name'];  
        echo $uploaded_file;
        echo "<br>";
        // //我们给每个用户动态的创建一个文件夹  
        // $user_path=$_SERVER['DOCUMENT_ROOT']."/wxplat/file/up/".$username;  
        // //判断该用户文件夹是否已经有这个文件夹  
        // if(!file_exists($user_path)) {  
        //     mkdir($user_path);  
        // }  
        $user_path=$_SERVER['DOCUMENT_ROOT']."/wxplat/images";
        echo "<br>";

        // echo $user_path;
        //$move_to_file=$user_path."/".$_FILES['myfile']['name'];  
        $file_true_name=$_FILES['file']['name'];
           // echo "<br>".$file_true_name."hshgl"."<br>";
        $move_to_file=$user_path."/".$file_true_name; 
        // $move_to_file=$user_path."/".time().rand(1,1000).substr($file_true_name,strrpos($file_true_name,"."));  
        //echo "$uploaded_file   $move_to_file";  
        $name = trim(strrchr($move_to_file, '/'),'/');
        if(move_uploaded_file($uploaded_file,$move_to_file)) {  
            // echo $_FILES['file']['name']."上传成功";
            // require('init.php');
            // $sql = "INSERT INTO `active`(`id`,`cover1`) VALUES (null,'$name')";
            echo $move_to_file;
             // if( $_POST["location"] )
             //  {
             //     $location = $_POST["location"];
             //     header( "Location:$location" );
             //     exit();
             //  }
        } else {  
            echo "上传失败";  
        }  
    } else {  
        echo "上传失败";  
    }  
?>