<?php 
	session_start();
	if(!isset($_SESSION['user'])){
		header("location: login.php");	exit();
	}

	if(isset($_GET['logout'])){
		unset($_SESSION['user']);
		header("location: login.php");	exit();
	}
 ?>

<!DOCTYPE html>
<html lang="de">
	<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, content='viewport-fit=cover, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <title>Shop</title>
    <!-- <link rel="icon" href="resources/favicon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="resources/favicon.ico" type="image/x-icon"/>
    <link rel="apple-touch-startup-image" href="resources/Icon.png">
    <link rel="apple-touch-icon-precomposed" href="resources/Icon.png"/>
    <link rel="apple-touch-icon" href="resources/Icon.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="resources/72.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="resources/114.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="resources/144.png" /> -->
    <!-- <link rel="manifest" href="resources/cam.webmanifest"> -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <link rel="stylesheet" href="shop.css">
	<link rel="stylesheet" href="main.css">

    <script src="main.js"></script>
    

</head>
<script>
	function getUser(){
		var user = "<?php echo $_SESSION['user']; ?>";
		return user;
	}

	var user = "<?php echo $_SESSION['user']; ?>";

	var obj;
	$.getJSON('./data.json', function(object) {
		obj = object;
    	//console.log(obj);
		var names = getNames(name, obj);
		var initials = names[0].slice(0,1)+names[1].slice(0,1);
		$("#userInitials").html(initials);
		$(".user_header_inits").html(initials);
	});
	
	function getNames(key, obj){
		var arr = [];
		var index = 0;
		for(var i = 0; i<obj.length; i++){
			if(obj[i].username == user) index = i;
		}
		//console.log(index);
		arr.push(obj[index].name);
		arr.push(obj[index].surname);
		return arr;
	}

	var opened = false;
	function toggleHeader() {
		if(!opened){
			$("#user_header").show();
			opened = true
		} else {
			$("#user_header").hide();
			opened = false;
		}
	}

	function loadItems(){
		var json = getJSON(); 
		loadSection("drinks", json);
		loadSection("food", json);
		console.log(json);
	}

	function getJSON(){
		var json = <?php echo json_encode(json_decode(file_get_contents("res/items.json"), true))?>; 
		return json;
	}

	var order = [];
	function addToOrder(type, id){
		order.push({user, type, id});
		console.log(order);
		document.cookie = order+"; expires=Thu, 18 Dec 2013 12:00:00 UTC";
	}

	var filter


</script>
    
<body style="padding:0; margin:0; text-align:center; background-color: #f2f2f2;" onload="loadItems()">
<toastGood><div class="toastMessage"></div><div class="toastTime"><div class="timerGood"></div></div></toastGood>
<toastBad><div class="toastMessage"></div><div class="toastTime"><div class="timerBad"></div></div></toastBad>
<mobileNav>
	<div id="productAdmin"><img src="res/icons/plus.svg"></div>
	<div id="mobileLogOut"><a href="?logout"><img src="res/icons/exit.svg"></a></div>
</mobileNav>
<header>
    <div class="header_bottom">
        <div class="search_container"> 
            <div class="search_icon"><img src="res/icons/loupe.svg"></div>
            <input id="search" class="input_sarch" type="text" placeholder="Suchen" onkeyup="loadSectionFilter()">
        </div>
    </div>
</header>

<sidebar>
	<div class="logo"><div>HAK</div></div>
	<div class="sidebar_item"><a href="#"><img src="res/icons/home.svg"/></a></div>
	<div class="sidebar_item orders" ><a href="cart.php"><img src="res/icons/bag.svg"/></a></div>
	<div class="sidebar_item"><a href="order.php"><img src="res/icons/order.svg"/></a></div>
	<div id="productAdmin" class="sidebar_item"><a href="product.php"><img src="res/icons/plus.svg"/></a></div>
	<div class="sidebar_item"><a href="?logout"><img src="res/icons/exit.svg"></a></div>


</sidebar>

<section>
    <div class="section_wrap">

        <h3>Produkte</h3>
		<h4>Getränke</h4>
        <div id="drinks">
        </div>
		<h4>Essen</h4>
		<div id="food">
        </div>
    </div>
</section>

<!-- Nav -->

<!-- <nav>
    <div><img src="res/icons/home.svg"></div>
    <div><img src="res/icons/cart.svg"></div>
    <div><img src="res/icons/history.svg"></div>
</nav> -->
<script>
	//check admin rights
	if(getUser()!="admin"){
		$("#productAdmin").hide();
	}
</script>
</body>
<!-- <h2>Willkommen <?php echo $_SESSION['user']; ?><h2> -->