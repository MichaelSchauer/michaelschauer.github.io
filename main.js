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
  map.removeLayer(Rain);
  map.removeLayer(Snow)
  map.removeLayer(Precipitation)
  map.addLayer(Clouds);
  map.addLayer(Precipitation);
  document.getElementById("activeLayerP").innerHTML="Wolken";
  closeweather();  
  hidelegend();
};

function activeRain(){
  map.removeLayer(Clouds);
  map.removeLayer(Snow)
  map.removeLayer(Precipitation)
  map.addLayer(Rain);
  document.getElementById("activeLayerP").innerHTML="Regen";
  closeweather();  
  showlegend()
};

function activeSnow(){
  map.removeLayer(Clouds);
  map.removeLayer(Rain)
  map.removeLayer(Precipitation)
  map.addLayer(Snow);
  document.getElementById("activeLayerP").innerHTML="Schnee";
  closeweather();  
  hidelegend();
};

function activePrecipitation(){
  map.removeLayer(Clouds);
  map.removeLayer(Snow)
  map.removeLayer(Rain)
  map.addLayer(Precipitation);
  document.getElementById("activeLayerP").innerHTML="Niederschlag";
  closeweather();  
  hidelegend();
};