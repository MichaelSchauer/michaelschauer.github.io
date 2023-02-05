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

	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <title>Shop</title>
    <link rel="icon" href="res/favicon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="resources/favicon.ico" type="image/x-icon"/>
    <link rel="apple-touch-startup-image" href="res/icon.png">
    <link rel="apple-touch-icon-precomposed" href="res/icon.png"/>
    <link rel="apple-touch-icon" href="res/icon.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="res/72.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="res/114.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="res/144.png" /> 
    <link rel="manifest" href="res/manifest.webmanifest">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <link rel="stylesheet" href="lib/css/shop.css">
	<link rel="stylesheet" href="lib/css/order.css">
	<link rel="stylesheet" href="lib/css/main.css">


    <script src="lib/js/main.js"></script>
    

</head>
<script>

	function getUser(){
		var user = "<?php echo $_SESSION['user']; ?>";
		return user;
	}
	function getJSON(){
		var json = <?php echo json_encode(json_decode(file_get_contents("res/items.json"), true))?>; 
		return json;
	}

	function getOrders(){
		var json = <?php echo json_encode(json_decode(file_get_contents("orders.json"), true))?>; 
		return json;
	}
	
	//Call PHP function to retrieve Orders JSON from orders.json
	function getOrdersFromFile(){
		var orders = <?php echo json_encode(json_decode(file_get_contents("orders.json"), true))?>; 
		return orders;
	}

	//Call PHP function with ajax request to write order from session storage to orders.json
	function postOrder(){
		var dataPost = getOrder();
		console.log(dataPost)
		var dataString = JSON.stringify(dataPost);

		if(getObjectLength(dataPost)>1){
			console.log("File length check success")
			$.ajax({
				url: 'postOrder.php',
				data: {data: dataString},
				type: 'POST',
				success: function(response) {
					console.log(response);
				}
			})
		}	
		else console.log("File length error")

	}

	//Displays orders
	function displayOrders(){
		showNoOrders();
		$("#orderItems").empty();
		var json = getOrdersFromFile();
		console.log(json);
		for(var i = 0; i<json.length; i++){

			var orderitems = "<div class = 'orderitemcontainer'>";
			for(var a = 0; a < json[i].order.length; a++){
				var id = json[i].order[a].id;
				var type = json[i].order[a].type;
				orderitems+='<div class="orderItem">'+getItemName(type, id)+'</div>';
			}
			orderitems+="</div>"

			var ordersizes = "<div class='orderSizes'>";
			for(var a = 0; a < json[i].order.length; a++){
				var id = json[i].order[a].id;
				var type = json[i].order[a].type;
				ordersizes += '<div class="orderSize">'+getItemSize(type, id) + '</div>';
			}
			ordersizes+="</div>";

			var id = i+1;
			var time = '&quot;'+json[i].time+'&quot;';
			var text = "<div class='order'><div class='orderFrom'>Bestellung von "+json[i].user+" nach "+json[i].location+"</div>"
			// text+= "<div class='orderNr'><p>"+id+"<p></div>"
			text+= "<div class='orderItems'>"+orderitems+ordersizes+"</div>"
			// text+= "<div class='orderDetails'>"+json[i].user+"</div>"
			// text+= "<div class='orderRoom'>"+json[i].location+"</div>"
			text+= "<div class='orderCheck'><button class='ordercheckbutton' onclick='deleteOrder("+time+")'><img class='ordercheckimg' src='res/icons/prufen.svg'></button></div></div>"
			
			$("#orderItems").append(text);	
		}
	}

</script>

<style>
	body{
		padding:0; margin:0; text-align:center; background-color: #4338ca;
	}

	section{
		height: 100vh; top: 40px; right: 0; margin: 0;
	}

	mobileNav{
		background: #f3f4f6;
	}
</style>
    
<body onload="displayOrders()">
<mobileNav>
	<div class="mobileHeader" id="productAdmin"><img src="res/icons/plus.svg"></div>
	<div class="mobileHeader"id="mobileLogOut"><a href="?logout"><img src="res/icons/exit.svg"></a></div>
</mobileNav>
<toastGood><div class="toastMessage"></div><div class="toastTime"><div class="timerGood"></div></div></toastGood>
<toastBad><div class="toastMessage"></div><div class="toastTime"><div class="timerBad"></div></div></toastBad>



<sidebar>
	<div class="logo"><div>HAK</div></div>
	<div class="sidebar_item"><a href="index.php"><img src="res/icons/home.svg"/>Startseite</a></div>
	<div class="sidebar_item orders" ><a href="cart.php"><img src="res/icons/bag.svg"/>Warenkorb</a><div id="pill"></div></div>
	<div class="sidebar_item"><a href="#"><img src="res/icons/order.svg"/>Bestellungen</a></div>
	<div id="productAdmin" class="sidebar_item"><a href="product.php"><img src="res/icons/plus.svg"/>Bearbeiten</a></div>
	<div class="sidebar_item"><a href="?logout"><img src="res/icons/exit.svg">Abmelden</a></div>
</sidebar>

<section>
    <div class="section_wrap">

        <h3>Offene Bestellungen</h3>
        <div id="orderItems">			
        </div>	
    </div>
</section>

<!-- Nav -->

<nav>
    <div id="linkIndex" class="navLink" onclick="location.href='index.php'"><img src="res/icons/home.svg"><span>Home</span></div>
    <div id="linkCart" class="navLink" onclick="location.href='cart.php'"><img src="res/icons/bag.svg"><span>Warenkorb</span></div>
    <div id="linkOrder" class="navLink" onclick="location.href='#'"><img src="res/icons/order.svg"><span>Bestellungen</span></div>
	<div id="linkProduct" class="navLink" onclick="location.href='product.php'"><img src="res/icons/plus.svg"><span>Produkte</span></div>
</nav>
<script>
	//check admin rights
	if(getUser()!="admin"){
		document.getElementById("productAdmin").remove();
		const element = document.getElementById("productAdmin");
		element.remove();

		//document.getElementById("linkProduct").remove();
		const element2 = document.getElementById("linkProduct");
		element2.remove();
	}

</script>
</body>

<!-- <h2>Willkommen <?php echo $_SESSION['user']; ?><h2> -->