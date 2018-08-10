<?php
$vid= $_REQUEST['vid'];
$wxid = $_REQUEST['wxid'];
$option = $_REQUEST['options'];
$wxnickname = $_REQUEST['nickname'];
$choice = $_REQUEST['choice'];
$choicesum = $_REQUEST['choicesum'];


require('init.php');
$sql = "INSERT INTO `vote`(`id`, `vid`, `option`, `choice`, `choicesum`, `wxnickname`, `wxid`) VALUES (null,'$vid','$option','$choice', '$choicesum','$wxnickname','$wxid')";
// $sql = "INSERT INTO `active`(`id`, `activename`, `cover1`, `option`, `maxsel`, `keyword`, `summary`, `startDate`, `endDate`,`states`) VALUES (null,'activename2','cover12','option2','maxsel2','keyword2','summary2','startDate2','endDate2','states')";
$result=mysqli_query($conn,$sql);
// echo $result;
  if($result){
    echo "添加成功";
  }else{
    echo "网络故障，稍后再试";
  }
?>