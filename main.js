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
/*
$('#checkmark-svg').on('click', function(){
  svg = $(this);
  svg.removeClass('run-animation').width();
  svg.addClass('run-animation');
  return false;
})
*/
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

function openweather(){
  document.getElementById("weatheritemcontainer").style.top = "44px";
  document.getElementById("settings").removeAttribute("onClick", "openweather()");
  document.getElementById("settings").setAttribute("onClick", "closeweather()");
  spin();
}

function closeweather(){
  document.getElementById("weatheritemcontainer").style.top = "-276px";
  document.getElementById("settings").removeAttribute("onClick", "closeweather()");
  document.getElementById("settings").setAttribute("onClick", "openweather()");
  document.getElementById('spinani').className = 'spin';
  spin();
}

function spin(){
  var runningimg = document.getElementById("spinani");
  runningimg.classList.add("spin");
  setTimeout("removespin()", 1000);
 }

function removespin() {
  var element = document.getElementById("spinani");
  element.classList.remove("spin");
}

function hidelegend() {
  document.getElementById("legendWeather").classList.add('legendWeatherHidden');
  document.getElementById("legendWeather").classList.remove('legendWeatherShow');
}

function showlegend() {
  document.getElementById("legendWeather").classList.remove('legendWeatherHidden');
  document.getElementById("legendWeather").classList.add('legendWeatherShow');
}

function activeClouds(){
  removeradar();
  map.removeLayer(Rain);
  map.removeLayer(Snow)
  map.removeLayer(Precipitation)
  map.addLayer(Clouds);
  map.addLayer(Precipitation);
  hideplaypause();
};

function activeRain(){
  removeradar();
  map.removeLayer(Clouds);
  map.removeLayer(Snow)
  map.removeLayer(Precipitation)
  map.addLayer(Rain)
  hideplaypause(); 
};

function activeSnow(){
  removeradar();
  map.removeLayer(Clouds);
  map.removeLayer(Rain)
  map.removeLayer(Precipitation)
  map.addLayer(Snow);
  hideplaypause();
};

function activePrecipitation(){
  removeradar();
  map.removeLayer(Clouds);
  map.removeLayer(Snow);
  map.removeLayer(Rain);
  map.addLayer(Precipitation);
  hideplaypause(); 
};

$('.no-zoom').bind('touchend', function(e) {
  e.preventDefault();
  // Add your code here. 
  $(this).click();
  // This line still calls the standard click event, in case the user needs to interact with the element that is being clicked on, but still avoids zooming in cases of double clicking.
})

function expandmenu(){
  document.getElementById("menuexpandable").style.width="260px";
  document.getElementById("menu").setAttribute("onClick", "hidemenu()");
  document.getElementById("menuicon").src="resources/close.svg";
  document.getElementById("getGPSlocmobile").style.right="-80px";
  hidefloatweather();
}

function hidemenu(){
  document.getElementById("menu").setAttribute("onClick", "expandmenu()");
  //document.getElementById("menuexpandable").style.width="6px";
  document.getElementById("menuexpandable").style.width="0px";
  document.getElementById("menuicon").src="resources/settings.svg";
  document.getElementById("getGPSlocmobile").style.right="30px";
  showfloatweather();
}

function openweatherpanel(){
  var heightviewport = window.innerHeight;
  var height =  heightviewport - 300;
  var heightpanel = "-" + height + "px";
  document.getElementById("weatherpanel").style.bottom=heightpanel;
  document.getElementById("getGPSlocmobile").style.bottom = "320px";
  document.getElementById("menu").style.bottom = "320px";
  document.getElementById("closeweatherpanelbutton").style.bottom = "70px";
}

function expandweatherpanel(){
  document.getElementById("weatherpanel").style.bottom= "0px";
  document.getElementById("getGPSlocmobile").style.bottom = "100vh";
  document.getElementById("menu").style.bottom = "100vh";
}

function closeweatherpanel(){
  document.getElementById("weatherpanel").style.bottom= "-100vh";
  document.getElementById("getGPSlocmobile").style.bottom = "70px";
  document.getElementById("menu").style.bottom = "70px";
  document.getElementById("closeweatherpanelbutton").style.bottom = "-70px";
}