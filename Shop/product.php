<?php 
	session_start();
	if(!isset($_SESSION['user'])){
		header("location: login.php");	exit();
	}

	if($_SESSION['user'] != "admin"){
		header("location: index.php");	exit();
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
	<link rel="stylesheet" href="lib/css/main.css">
	<link rel="stylesheet" href="lib/css/product.css">


    <script src="lib/js/main.js"></script>
	<script src="lib/js/product.js"></script>

    

</head>
<script>
	
	function changeColor(){
  		$("#selectType").css("color", "black");
	};

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

	//Return content from items.json
	function getJSON(){
		var json = <?php echo json_encode(json_decode(file_get_contents("res/items.json"), true))?>; 
		return json;
	}

	//Call PHP function with ajax request to update items.json
	function updateProducts(data){
	var data = data;
	console.log(data)
	var dataString = JSON.stringify(data);

	if(getObjectLength(data)>2){
		console.log("File length check success")
		$.ajax({
			url: 'updateItems.php',
			data: {data: dataString},
			type: 'POST',
			success: function(response) {
				console.log("updated Item")
				console.log(response);
				location.reload();
			}
		})
	}	
	else console.log("File length error")
	}

	function saveImage(filename){
		var data = document.querySelector("#canvas").toDataURL().replace(/^data:image\/png;base64,/, "");
		console.log(data);
		var dataURL = canvas;		
		$.ajax({
			type: "POST",
			url: "saveIcon.php",
			data: { 
				data: data,
				name: filename
			}
		}).done(function(o) {
			console.log('saved'); 
    	});
	}

	function getJSON(){
		var json = <?php echo json_encode(json_decode(file_get_contents("res/items.json"), true))?>; 
		return json;
	}

	function deleteImage(filename){
		$.ajax({
			url: 'removeImage.php',
			data: {data: filename},
			type: 'POST',
			success: function(response) {
				console.log(response);
			}
		})
	}
</script>

<style>
	body{
		padding:0; margin:0; text-align:center; background-color: #4338ca;
	}

	section{
		height: 100vh; top: 0px; right: 0; margin: 0;
	}

	mobileNav{
		background: #f3f4f6;
	}

	.addFormWrap p{
		font-size: 14px;
		margin-bottom: 20px;
		color:grey;
	}
</style>
    
<body onload="showProductTable()">
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
	<div class="sidebar_item"><a href="order.php"><img src="res/icons/order.svg"/>Bestellungen</a></div>
	<div id="productAdmin" class="sidebar_item"><a href="#"><img src="res/icons/plus.svg"/>Bearbeiten</a></div>
	<div class="sidebar_item"><a href="?logout"><img src="res/icons/exit.svg">Abmelden</a></div>
</sidebar>

<section>
    <div class="section_wrap">

        <h3>Produktverwaltung</h3>
		<h4>Produkt hinzufügen</h4>

			<div class="addWrap">
				<div class="addImageWrap" id="addImage">
				<label for="imageLoader">
					<img id="addThumb" src="res/icons/kamera.svg">
					<canvas id="canvas"></canvas>
				</label>
				</div>
				<div class="addFormWrap">
					<input style="display:none"type="file" id="imageLoader" name="imageLoader" />
					<p>maximale Bildgröße: 2 MB</p>
					<select id="selectType" onchange="changeColor()">
						<option selected hidden >Produktart</option>
						<option value="1">Getränk</option>
						<option value="2">Essen</option>
					</select>
					<input type="text" id="inputName" placeholder="Produktname" maxlength="20">
					<input type="text" id="inputSize" placeholder="Größe" maxlength="7">
					<input type="number" id="inputStock" placeholder="Lagerbestand" maxlength="9">
				</div>
			</div>
			<div class="addButton"><button id="addItem" onclick="saveItem()">Speichern</button></div>

		<h4>Produkt löschen</h4>
		<div class='prodItem prodItemFirst'><div class='tc'>Nr.</div><div class='tcpf'><input id="searchProduct" type="text" placeholder="Suchen" onkeyup="showProductTableFilter()"></div><div class='tc'>Größe</div><div class='remF'></div></div>
		<div id="products"></div>
		<button class="buttonSave" onclick="saveDeletedItems()">Speichern</button>
      
    </div>
</section>

<!-- Nav -->

<nav>
    <div id="linkIndex" class="navLink" onclick="location.href='index.php'"><img src="res/icons/home.svg"><span>Home</span></div>
    <div id="linkCart" class="navLink" onclick="location.href='cart.php'"><img src="res/icons/bag.svg"><span>Warenkorb</span></div>
    <div id="linkOrder" class="navLink" onclick="location.href='order.php'"><img src="res/icons/order.svg"><span>Bestellungen</span></div>
	<div id="linkProduct" class="navLink" onclick="location.href='#'"><img src="res/icons/plus.svg"><span>Produkte</span></div>
</nav>

<script>

var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


function handleImage(e) {
  var reader = new FileReader();
  reader.onload = function(event) {
    onReaderLoad(event);
  }
  reader.readAsDataURL(e.target.files[0]);
}

var onReaderLoad = function(event) {
  var image = new Image();
  image.onload = function() {
    onImageLoad(image);
  }
  image.src = event.target.result;
}

var onImageLoad = function(img) {
	$('#addThumb').css("display", "none")
	$('#canvas').css("display", "flex")
	canvas.width = img.width;
	console.log(img.width)
	canvas.height = img.height;
	console.log(img.height)

	ctx.drawImage(img, 0, 0);
}

//check admin rights
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