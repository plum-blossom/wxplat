<?php
header("Content-Type:text/plain;charset=utf-8");
require('init.php');
$id= $_REQUEST['id'];
$sql="DELETE FROM `active` WHERE id=$id";
$result=mysqli_query($conn,$sql);
if($result){
	echo "删除成功";
}else{
	echo "删除失败";
}
?>
