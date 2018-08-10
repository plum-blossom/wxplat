<?php
 // header('Access-Control-Allow-Origin:*');
 // header("Content-Type:text/json;charset=utf-8");
 // echo json_encode($_FILES);
$activename= $_REQUEST['activityname'];
$cover1 = $_REQUEST['cover1'];
$option = $_REQUEST['option'];
$maxsel = $_REQUEST['maxsel'];
$keyword = $_REQUEST['keyword'];
$summary = $_REQUEST['summary'];
$startDate = $_REQUEST['startDate'];
$endDate = $_REQUEST['endDate'];
$states = $_REQUEST['states'];

require('init.php');
$sql = "INSERT INTO `active`(`id`, `activename`, `cover1`, `option`, `maxsel`, `keyword`, `summary`, `startDate`, `endDate`, `states`) VALUES (null,'$activename','$cover1','$option','$maxsel','$keyword','$summary','$startDate','$endDate', '$states')";
// $sql = "INSERT INTO `active`(`id`, `activename`, `cover1`, `option`, `maxsel`, `keyword`, `summary`, `startDate`, `endDate`,`states`) VALUES (null,'activename2','cover12','option2','maxsel2','keyword2','summary2','startDate2','endDate2','states')";
$result=mysqli_query($conn,$sql);
// echo $result;
  if($result){
    echo "添加成功";
  }else{
    echo "网络故障，稍后再试";
  }
?>

