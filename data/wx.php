<?php
header("Access-Control-Allow-Origin:*");
header("Content_type:text/html;charset=utf-8");
// 获取code和openid
$redirecturl= urlencode("http://wxcom.panoon.com.cn/index.html");

$appid='wxab6ef39d2222b152';

$url = 'https://open.weixin.qq.com/connect/qrconnect?appid='.$appid.'&redirect_uri='.$redirecturl.'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';

// header("Location:$url");
// 自动跳转到code界面获取code值。
// https://open.weixin.qq.com/connect/qrconnect?appid=wxab6ef39d2222b152&redirect_uri=http://wxcom.panoon.com.cn/index.html&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
// 获取code界面：

$code= $_GET['code'];//前端传来的code值

$appid= "wxab6ef39d2222b152";

$appsecret= "7159e1042b9eabeea1ee051502ef3091";

//获取openid

$url="https://api.weixin.qq.com/sns/oauth2/access_token?appid=$appid&secret=$appsecret&code=$code&grant_type=authorization_code";

$result = https_request($url);

$jsoninfo = json_decode($result, true);
$openid = $jsoninfo["openid"];//从返回json结果中读出openid

$callback=$_GET['callback'];  
// echo $callback."({result:'".$openid."'})"; 
echo $code;
echo $openid; //把openid 送回前端

function https_request($url,$data = null){
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
	if (!empty($data)){
		curl_setopt($curl, CURLOPT_POST, 1);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
	}
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	$output = curl_exec($curl);
	curl_close($curl);
	return $output;
}



?>