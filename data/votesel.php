<?php
require('init.php');
$vid= $_REQUEST['id'];
$sql = "SELECT * FROM `vote` WHERE vid=$vid";
$result=mysqli_query($conn,$sql);
$list = array();
  while($row = mysqli_fetch_assoc($result)) {
      $list[]=$row;
  }
echo json_encode($list);
?>