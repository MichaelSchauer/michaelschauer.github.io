function login(){
	var password;
	var pass1="mysharedmoments";
	password = document.getElementById("userinput").value;
	if (password == pass1){
    document.getElementById("homecard").style.display = "none";
    document.getElementById("infolink").style.display = "none";
    document.getElementById("homecardunlocked").style.display = "block";
    document.getElementById("footerboth").style.display = "flex";
    document.getElementById("wrongpass").innerHTML = "";
    addCookie(30);
	}
	else
   {
    document.getElementById("wrongpass").innerHTML="FALSCHES PASSWORT";
    document.getElementById('userinput').value ='';
    deleteAllCookies();
  }
}

$('#checkmark-svg').on('click', function(){
  svg = $(this);
  svg.removeClass('run-animation').width();
  svg.addClass('run-animation');
  return false;
})

/* function openNav() {
	document.getElementById("open").style.display = "none";
	document.getElementById("nav").style.width = "100vw";
	document.getElementById("title").style.display = "none";
}

function closeNav() {
	document.getElementById("nav").style.width = "0";
	document.getElementById("open").style.display = "block";
	document.getElementById("title").style.display = "block";
	document.getElementById("open").style.display = "inline-block";
}  */
