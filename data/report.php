<?php
header("Content-Type:text/plain;charset=utf-8");
require('init.php');
$id= $_REQUEST['id'];
// 查询选项
$sql = "SELECT activename,option FROM `active` WHERE id=$id";
$result=mysqli_query($conn,$sql);
$list = array();
  while($row = mysqli_fetch_assoc($result)) {
      $list[]=$row;
  }
echo json_encode($list);
?>