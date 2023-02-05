//main.js
//Author: Michael Schauer, 01.2023

function loadSectionFilter(){ 
        var keyword = document.getElementById("search").value.toLowerCase();
        var data = getJSON();
        $("#drinks").empty();
        for(i=0; i < Object.keys(data.drinks).length; i++){
            var name = data.drinks[i].name;
            var size = data.drinks[i].size
            //1 = drink, 2 = food
            if(name.toLowerCase().includes(keyword)){
                $("#drinks").append(genItem(1, name, size, i, data));
            }
            
        };

        $("#food").empty();
        for(i=0; i < Object.keys(data.food).length; i++){
            var name = data.food[i].name;
            var size = data.food[i].size
            //1 = drink, 2 = food
            if(name.toLowerCase().includes(keyword)){
                $("#food").append(genItem(2, name, size, i, data));
            }
        };
}

//writes a String data to the log file
function log(data){
        var d = new Date();
        var time = d.toLocaleString();
        var user = getUser();
        var log = time + " | " + user + " | " + data;
        $.ajax({
            url: 'log.php',
            data: {data: log},
            type: 'POST',
            success: function(response) {
                //console.log(response);
            }
        })

}

//loads the drinks and food section at index.php
function loadSection(products, data){
    var JSON = getJSON();
    if(products == "drinks"){
        $("#drinks").empty();
        for(i=0; i < Object.keys(data.drinks).length; i++){
            var name = data.drinks[i].name;
            var size = data.drinks[i].size
            //1 = drink, 2 = food
            $("#drinks").append(genItem(1, name, size, i, JSON));
        };

    } else if(products == "food"){
        $("#food").empty();

        for(i=0; i < Object.keys(data.food).length; i++){
            var name = data.food[i].name;
            var size = data.food[i].size
            //1 = drink, 2 = food
            $("#food").append(genItem(2, name, size, i, JSON));
        };

    } else console.log("error")
}

//generates the html markup for the items in index.php
function genItem(typ, title, size, laufnummer, JSON){
    var type;
    if(typ == 1){
        type = 'd';
        var icon = JSON.drinks[laufnummer].icon;
        //console.log(icon);
    } 
    else if(typ == 2){
        type = 'f';
        var icon = JSON.food[laufnummer].icon;
        //console.log(icon);
    }

    var content =  '<div class="item" id="item'+laufnummer+'" onclick="addToCart('+typ+","+laufnummer+')"><div class="itemImg"><img src="res/thumb/'+icon+'"></div><div class="desc"><p>'+title+
    '</p><p>'+size+'</p></div></div>';
    return content;
}

//adds a product of a certain type(d=drinks, f=food) and a number to the shopping cart
function addToCart(typ, laufnummer){
    //Drink or Food
    var type;
    if(typ == 1) type = 'd';
    else if(typ == 2) type = 'f';
    //ID in JSON
    var ID = laufnummer
    var cartItem = {
		type: type,
		id: ID,
	}
	var cartItemJSON = JSON.stringify(cartItem);
    var cartArray = new Array();
	if (sessionStorage.getItem('shopping-cart')) {
		cartArray = JSON.parse(sessionStorage.getItem('shopping-cart'));
	}
	cartArray.push(cartItemJSON);
	var cartJSON = JSON.stringify(cartArray);
	sessionStorage.setItem('shopping-cart', cartJSON);
    showNoOrders();
}

//removes a certain item from the object in session storage
function removeItem(index){
    var itemsArr = getItemsForUpdate();
    itemsArr.splice(index,1);
    updateItems(itemsArr);
    showNoOrders();
}

//removes shopping-cart object from session storage
function clearCart(){
    if (sessionStorage.getItem('shopping-cart')) {
		// Clear JavaScript sessionStorage by index
		sessionStorage.removeItem('shopping-cart');
        location.reload();
	}
}

//sets a new object to session storage "shopping-cart"
function updateItems(Array){
    var cartJSON = JSON.stringify(Array);
    sessionStorage.removeItem('shopping-cart');
	sessionStorage.setItem('shopping-cart', cartJSON);
    showCartTable();
}

//generates shopping cart and displays it to the section in cart.php
function showCartTable(){
    if (sessionStorage.getItem('shopping-cart')) {
        $("#cartItems").empty();
        var itemsArr = getJSON();
        var cartArr = getItemsFromSession();

        for(i=0; i<cartArr.length; i++){
            var type = cartArr[i].type;
            var index = cartArr[i].id;

            if(type == "d"){
                var product = itemsArr.drinks[index].name;
                var size = itemsArr.drinks[index].size;
            }
            else{
                var product = itemsArr.food[index].name;
                var size = itemsArr.food[index].size;
            }
            var nr = i+1
            $("#cartItems").append("<div class='cartItem'><div class='tc'>"+nr+"</div><div class='tc'>"+product+"</div><div class='tc'>"+size+"</div><div class='rem' onclick='removeItem("+i+")'>Löschen</div></div></div>");
        }
	}
    else  $("#cartItems").empty();
    showNoOrders();
}

//returns array from session storage "shopping-cart"
function getItemsFromSession(){
    var cart = sessionStorage.getItem('shopping-cart');
	var shoppingCart = JSON.parse(cart);
    var Arr = new Array;
    for(i = 0; i<shoppingCart.length; i++){
        Arr.push(JSON.parse(shoppingCart[i]));
    }
    return Arr;
}

//returns array from session storage "shopping-cart"
function getItemsForUpdate(){
    var cart = sessionStorage.getItem('shopping-cart');
	var shoppingCart = JSON.parse(cart);
    var Arr = new Array;
    for(i = 0; i<shoppingCart.length; i++){
        Arr.push(shoppingCart[i]);
    }
    return Arr;
}

//Order items to location
function order(room){
    delOrder();
    var user = getUser();
    var location = document.getElementById("location").value;
    var d = new Date();
    var time = d.toLocaleTimeString();
    var orderItem;
    if(sessionStorage.getItem('shopping-cart')){
        var cart = getItemsFromSession();
        //build new object
        orderItem = {
            user: user,
            location: location,
            time: time,
            order: cart,
        }
        document.getElementById("location").value = "";
        clearCart();
    }
	var cartItemJSON = JSON.stringify(orderItem);
    var cartArray = new Array();
	if (sessionStorage.getItem('orders')) {
		cartArray = JSON.parse(sessionStorage.getItem('orders'));
	}
	cartArray.push(cartItemJSON);
    var newOrder = JSON.parse(cartArray[0]);
    var addedOrder = addOrder(newOrder);
    var cartJSON = JSON.stringify(addedOrder);
	sessionStorage.setItem('orders', cartJSON);
    postOrder();
    showNoOrders();
    
    var logData ="";
    for(var i = 0; i<cart.length; i++){
        var itemName = "-"+getItemName(cart[i].type, cart[i].id)
        var itemSize = getItemSize(cart[i].type, cart[i].id)
        logData+= itemName + "("+itemSize+") "
    }
    log("Bestellung aufgegeben: "+logData)
    // toastGood("Bestellung gesendet");
}

//get order from session storage as JSON object
function getOrder(){
    var order = sessionStorage.getItem('orders');
    order = JSON.parse(order);
    return order;
}

//get order from session storage as string
function getOrderString(){
    var order = sessionStorage.getItem('orders');
    order = JSON.parse(order);
    order0 = JSON.parse(order[0]);
    var post = JSON.stringify(order0);
    return JSON.stringify(order);
}

//clear orders from session storage
function delOrder(){
    if (sessionStorage.getItem('orders')) {
		sessionStorage.removeItem('orders');
	}
}

//get orders from JSON file and push new Order JSON into Object
function addOrder(arr){
    var newOrder = arr;
    var recentOrders = getOrdersFromFile();
    if(recentOrders != null) var data = recentOrders;
    else var data = new Array()
    data.push(newOrder);

    return data
}

//delete order with specific timestamp
function deleteOrder(timestamp){
    delOrder();
    var index = getTimeIndex(timestamp);
    var ordersFile = getOrdersFromFile();
    var logDataT = ordersFile[0].order;
    ordersFile.splice(index,1);
    var cartJSON = JSON.stringify(ordersFile);
	sessionStorage.setItem('orders', cartJSON);
    postOrder();
    var logData ="";
    for(var i = 0; i<logDataT.length; i++){
        var itemName = "-"+getItemName(logDataT[i].type, logDataT[i].id)
        var itemSize = getItemSize(logDataT[i].type, logDataT[i].id)
        logData+= itemName + "("+itemSize+") "
    }
    log("Bestellung abgeschlossen: "+logData)
    location.reload();
}

//returns index of parent element with given timestamp
function getTimeIndex(timestamp){
    var arr = getOrdersFromFile();
    var index = false;
    for(i=0; i<arr.length; i++){
        if(String(arr[i].time)==timestamp){
            index = i;
            return index
        }  
    }
    return false;
}

//returns the difference in character in form of Object 2 (new) - Object 1 (old)
function compareOrderLength(obj){
    var obj1 = getObjectLength(getOrdersFromFile());
    var obj2 = getObjectLength(obj);
    return obj2 - obj1;
}

//returns number of characters of a object
function getObjectLength(obj){
    var length = JSON.stringify(obj).length;
    return length;
}

//returns item name
function getItemName(type, number){
    var items = getJSON();
    var res = ""; 
    if(type == "d"){
        res = items.drinks[number].name;
    } else  res = items.food[number].name;
    return res;
}

//returns item size
function getItemSize(type, number){
    var items = getJSON();
    var res = ""; 
    if(type == "d"){
        res = items.drinks[number].size;
    } else  res = items.food[number].size;
    return res;
}

//triggers green toast message
function toastGood(text){
    $(".toastMessage").html(text);
    $("toastGood").css("display", "flex");
    setTimeout(function() { $("toastGood").fadeOut(500); }, 3500)
}

//triggers red toast message
function toastBad(text){
    $(".toastMessage").html(text);
    $("toastBad").css("display", "flex");
    setTimeout(function() { $("toastBad").fadeOut(500); }, 3500)
}

//displays badge with number of orders in sidebar
function showNoOrders(){
    var orders = JSON.parse(sessionStorage.getItem('shopping-cart'));
    if(orders!=null) orders = orders.length;
    if(orders > 0){
        $("#pill").css("display","flex");
        $("#pill").empty();
        $("#pill").html(orders);
    }
    else{
        $("#pill").css("display","none");

    }
}

