function login(){
	var password;
	var pass1="mysharedmoments";
	password = document.getElementById("userinput").value;
	if (password == pass1){
    document.getElementById("infolink").style.display = "none";
    document.getElementById("expanav").style.display = "block";
    document.getElementById("footerexp").style.display = "block";
    document.getElementById("Regenradar").setAttribute("onClick", "window.location='rainmap.html';");
    unlockcircle();
    document.getElementById('lockcirc').onclick = '';
	}
	else
   {
    document.getElementById('userinput').value ='';
    wrongpasscircle();
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

function unlockcircle(){
  document.getElementById("lockcirc").style.marginLeft = "45px";
  document.getElementById("lockcirc").style.backgroundColor = "#c7ffc7";
 }

 function wrongpasscircle(){
  var element = document.getElementById("lockcirc");
  element.classList.add("lockcircwrong");
  setTimeout("removeanim()", 1000);
 }

 function removeanim() {
  var element = document.getElementById("lockcirc");
  element.classList.remove("lockcircwrong");
}