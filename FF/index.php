<?php

?>
<!DOCTYPE html>
<html lang="de">
	<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, content='viewport-fit=cover, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <title>FFINFO</title>
  <!--   <link rel="icon" href="res/favicon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="resources/favicon.ico" type="image/x-icon"/>
    <link rel="apple-touch-startup-image" href="res/icon.png">
    <link rel="apple-touch-icon-precomposed" href="res/icon.png"/>
    <link rel="apple-touch-icon" href="res/icon.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="res/72.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="res/114.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="res/144.png" /> 
    <link rel="manifest" href="res/manifest.webmanifest"> -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

	<link rel="stylesheet" href="style.css">

    <script src="main.js"></script>
    

</head>
<script>
/* 	function getJSON(){
		var json = <?php echo json_encode(json_decode(file_get_contents("https://cf-intranet.ooelfv.at/webext2/rss/json_laufend.txt"), true))?>; 
		return json;
	} */
	//0 = laufend, 1 = 6h, 2 = täglich, 3 = 2 Tage
	function getJSON(type){
		const URL = [
			"'https://cf-intranet.ooelfv.at/webext2/rss/json_laufend.txt'",
			"http://intranet.ooelfv.at/webext2/rss/json_6stunden.txt",
			"http://intranet.ooelfv.at/webext2/rss/json_taeglich.txt",
			"http://intranet.ooelfv.at/webext2/rss/json_2tage.txt"
		]
		
		var link = URL[0];	
		console.log(link);	
		$.ajax({
			type: "POST",
			url: "getJSON.php",
			data: { 
				url: link,
			},
			success: function(response) {
				console.log(response);
			}
		})
	}

</script>
    
<body>

</body>
