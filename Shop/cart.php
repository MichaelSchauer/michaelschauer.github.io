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

    <title>Warenkorb</title>
    <link rel="icon" href="resources/favicon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="resources/favicon.ico" type="image/x-icon"/>
    <link rel="apple-touch-startup-image" href="resources/Icon.png">
    <link rel="apple-touch-icon-precomposed" href="resources/Icon.png"/>
    <link rel="apple-touch-icon" href="resources/Icon.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="resources/72.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="resources/114.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="resources/144.png" />
    <!-- <link rel="manifest" href="resources/cam.webmanifest"> -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <link rel="stylesheet" href="shop.css">
	<link rel="stylesheet" href="cart.css">
	<link rel="stylesheet" href="main.css">


    <script src="main.js"></script>
    

</head>
<script>

	//Call PHP function to retrieve username from Session Storage
	function getUser(){
		var user = "<?php echo $_SESSION['user']; ?>";
		return user;
	}

	//Call PHP function to retrieve avaliable Items from items.json
	function getJSON(){
		var json = <?php echo json_encode(json_decode(file_get_contents("res/items.json"), true))?>; 
		return json;
	}

	//enable or disable submitbutton based on if the roomnumber is entered or not
	function enableSubmit(){
		let inputs = document.getElementsByClassName('required');
		let btn = document.getElementById("orderbtn");
		let isValid = true;
			for (var i = 0; i < inputs.length; i++){
			let changedInput = inputs[i];
			if (changedInput.value.trim() === "" || changedInput.value === null){
				isValid = false;
				break;
			}
		}
		btn.disabled = !isValid;
	}

	//Call PHP function with ajax request to write order from session storage to orders.json
	function postOrder(){
		var dataPost = getOrder();
		console.log(dataPost)
		var dataString = JSON.stringify(dataPost);

		if(getObjectLength(dataPost)>2){
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

	//Call PHP function to retrieve Orders JSON from orders.json
	function getOrdersFromFile(){
		var orders = <?php echo json_encode(json_decode(file_get_contents("orders.json"), true))?>; 
		return orders;
	}

</script>
    
<body style="padding:0; margin:0; text-align:center; background-color: #f2f2f2;" onload="showCartTable()">
<toastGood><div class="toastMessage"></div><div class="toastTime"><div class="timerGood"></div></div></toastGood>
<toastBad><div class="toastMessage"></div><div class="toastTime"><div class="timerBad"></div></div></toastBad>

<sidebar>
	<div class="logo"><div>HAK</div></div>
	<div class="sidebar_item"><a href="index.php"><img src="res/icons/home.svg"/></a></div>
	<div class="sidebar_item orders"><a href="#"><img src="res/icons/bag.svg"/></a></div>
	<div class="sidebar_item"><a href="order.php"><img src="res/icons/order.svg"/></a></div>
	<div id="productAdmin" class="sidebar_item"><a href="product.php"><img src="res/icons/plus.svg"/></a></div>
	<div class="sidebar_item"><a href="?logout"><img src="res/icons/exit.svg"></a></div>
</sidebar>

<section style="height: 100vh; top: 0; right: 0; margin: 0;">
    <div class="section_wrap">

        <h3>Warenkorb</h3>
		<div class="cartItem cartItemFirst"><div class="tc">Nr.</div><div class="tc">Produkt</div><div class="tc">Größe</div></div>
        <div id="cartItems">			
        </div>		
		<div class="buttoncontainer"><button class="buttonClear" onclick="clearCart()">Verwerfen</button></div>
		
		<div class="form" method="post">
			<input id="location" type="text" class="required" placeholder="Lieferort" onkeyup="enableSubmit()">
			<button name="button1" id="orderbtn" class="buttonOrder" onclick="order()" disabled >Bestellen</button>
		</div>
    </div>

</section>
<script>
	//check admin rights
	if(getUser()!="admin"){
		$("#productAdmin").hide();
	}
</script>
<!-- Nav -->

<!-- <nav>
    <div><img src="res/icons/home.svg"></div>
    <div><img src="res/icons/cart.svg"></div>
    <div><img src="res/icons/history.svg"></div>
</nav> -->

</body>

<!-- <h2>Willkommen <?php echo $_SESSION['user']; ?><h2> -->