<?php
header("Access-Control-Allow-Origin:*");
header("Content_type:text/html;charset=utf-8");
$conn = mysqli_connect("localhost","root","","wxplat");
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);
?>
