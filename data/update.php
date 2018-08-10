<?php
header("Content-Type:text/plain;charset=utf-8");
require('init.php');
$states= $_REQUEST['states'];
$id= $_REQUEST['id'];

$sql = "UPDATE `active` SET  states=$states WHERE id=$id";
$result=mysqli_query($conn,$sql);
if($result){
	echo "更改成功";
}else{
	echo "更改失败";
}
?>