//product.js
//Author: Michael Schauer, 01.2023

//saves Item that is configured within product.php
function saveItem(){
    //data
    var select = document.getElementById("selectType").value;
    var product = document.getElementById("inputName").value;
    var size = document.getElementById("inputSize").value;
    var stock = parseInt(document.getElementById("inputStock").value);
    //image
    var filename = getImageCode()+".png";
    //build object
    var childObj = {
        name : product,
        size : size,
        icon : filename,
        stock : stock
    }
    var obj = getJSON();
    if(select==1) obj.drinks.push(childObj);
    else obj.food.push(childObj);
    //save item
    updateProducts(obj);
    saveImage(filename);
    //toast
    toastGood("Produkt hinzugefügt")
    //log
    log("Produkt hinzugefügt: Name: "+product+" Größe:"+size+" Lagerbestand:"+ stock)
}

//delete product with specific name
function deleteOrderName(name){
    var index = getNameIndex(name);
    var itemsFile = getJSON();
    var imageName;
    var logItemName;
    if(index[0]==1){
        logItemName = itemsFile.drinks[index[1]].name;
        imageName = itemsFile.drinks[index[1]].icon;
        itemsFile.drinks.splice(index[1],1);
    } else if(index[0]==2){
        logItemName = itemsFile.food[index[1]].name;
        imageName = itemsFile.food[index[1]].icon;
        itemsFile.food.splice(index[1],1);
    } else {
        console.log("error")
    }

    console.log(imageName)
    updateProducts(itemsFile);
    deleteImage(imageName)
    log("Produkt gelöscht: "+logItemName)
    toastGood("Produkt gelöscht");
    showProductTable()
    location.reload();
}

//returns index of parent element with given name
function getNameIndex(name){
    var arr = getJSON();
    for(i=0; i<arr.drinks.length; i++){
        if(String(arr.drinks[i].name)==name){
            //console.log("matching name")
            return [1, i]
        }  
    }
    for(i=0; i<arr.food.length; i++){
        if(String(arr.food[i].name)==name){
            //console.log("matching name")
            return [2, i]
        }  
    }
    return false;
}

//returns 
// function getNextIndex(name){
//     var name = name;
//     var JSON = getJSON();
//     if(name == "drinks") return Object.keys(JSON.drinks).length;
//     else return Object.keys(JSON.food).length;
// }

//returns unique name for image (YYYYMMDDHHMMSS)
function getImageCode(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var result = ""+year+month+day+hours+minutes+seconds;
    return result;
}

//generates product list and appends it to products.php
function showProductTable(){
        $("#products").empty();
        var obj = getJSON();
        var nr = 0;
        for(i=0; i<obj.drinks.length; i++){
                var product = obj.drinks[i].name;
                var size = obj.drinks[i].size;
            nr++;
            $("#products").append("<div class='prodItem'><div class='tc'>"+nr+"</div><div class='tc'>"+product+"</div><div class='tc'>"+size+"</div><div class='rem' onclick='deleteOrderName(\""+product+"\");'>&#x2715</div></div></div>");
        }
        for(i=0; i<obj.food.length; i++){
                var product = obj.food[i].name;
                var size = obj.food[i].size;
            nr++;
            $("#products").append("<div class='prodItem'><div class='tc'>"+nr+"</div><div class='tc'>"+product+"</div><div class='tc'>"+size+"</div><div class='rem' onclick='deleteOrderName(\""+product+"\");'>&#x2715</div></div></div>");
        }
}

//generates filtered product list and appends it to products.php
function showProductTableFilter(){
    //get keyword from input
    var keyword = document.getElementById("searchProduct").value.toLowerCase();
    $("#products").empty();
    var obj = getJSON();
    var nr = 1;
    for(i=0; i<obj.drinks.length; i++){
        var product = obj.drinks[i].name;
        var size = obj.drinks[i].size;
        if(obj.drinks[i].name.toLowerCase().includes(keyword)){
            $("#products").append("<div class='prodItem'><div class='tc'>"+nr+"</div><div class='tc'>"+product+"</div><div class='tc'>"+size+"</div><div class='rem' onclick='deleteOrderName(\""+product+"\");'>&#x2715</div></div></div>");
            nr++;
        }
    }
    for(i=0; i<obj.food.length; i++){
        var product = obj.food[i].name;
        var size = obj.food[i].size;
        if(obj.food[i].name.toLowerCase().includes(keyword)){
            $("#products").append("<div class='prodItem'><div class='tc'>"+nr+"</div><div class='tc'>"+product+"</div><div class='tc'>"+size+"</div><div class='rem' onclick='deleteOrderName(\""+product+"\");'>&#x2715</div></div></div>");
            nr++;

        }
    }
}