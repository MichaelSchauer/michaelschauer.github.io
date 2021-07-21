function login(){
	var password;
	var pass1="mysharedmoments";
	password = document.getElementById("userinput").value;
	if (password == pass1){
    document.getElementById("homecard").style.display = "none";
    document.getElementById("infolink").style.display = "none";
    document.getElementById("homecardunlocked").style.display = "block";
    document.getElementById("expanav").style.display = "block";
    document.getElementById("footerexp").style.display = "block";
    document.getElementById("wrongpass").innerHTML = "";
    document.getElementById("Regenradar").setAttribute("onClick", "window.location='rainmap.html';");
	}
	else
   {
    document.getElementById("wrongpass").innerHTML="FALSCHES PASSWORT";
    document.getElementById('userinput').value ='';
  }
}

$('#checkmark-svg').on('click', function(){
  svg = $(this);
  svg.removeClass('run-animation').width();
  svg.addClass('run-animation');
  return false;
})

function opennav(){
  document.getElementById("expanav").style.height = "100%";
  document.getElementById("footerexp").style.height = "0px";
  document.getElementById("closenav").style.height = "60px";
  document.getElementById("menuitemcontainer").style.height = "320px"; //change to height of 80px x list items
}

function closenav(){
  document.getElementById("expanav").style.height = "0%";
  document.getElementById("footerexp").style.height = "60px";
  document.getElementById("closenav").style.height = "0px";
  document.getElementById("menuitemcontainer").style.height = "0px";
}