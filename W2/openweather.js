var keyOW = "848839334eec6011ffa613e5c346b1d0";
var JSONdataOW = ""; 

var OW_tempmin ="";
var OW_tempmax ="";
var OW_percipation_prop ="";
var OW_condition ="";
var OW_condition_icon ="";

function API_Call_OW(){  
  var urlOW =  "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&exclude=current,minutely,hourly&units=metric&lang=de&appid="+ keyOW;

  $.ajax({
    url: urlOW,
    //url: "OW.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      
      console.log(data);
      JSONdataOW = data;    
      OW_extractData();     
    },
    error: function(){
      console.log("Error")
    }
  });
}

function OW_extractData(){
  if(JSONdataOW.hasOwnProperty('alerts')){

    for (var i = 0; i < Object(JSONdataOW.alerts).length; i++){
      
      var options = { weekday: 'short', year: '2-digit', month: '2-digit', day: '2-digit' };

      var alert_start_date = new Date(JSONdataOW.alerts[i].start * 1000);
      var alert_start_time = alert_start_date.toLocaleTimeString('de-DE', options).slice(5, -3);

      var alert_end_date = new Date(JSONdataOW.alerts[i].end * 1000);
      var alert_end_time = alert_end_date.toLocaleTimeString('de-DE', options).slice(5, -3);
      
      var alert_text = JSONdataOW.alerts[i].description;
      var alert_event = JSONdataOW.alerts[i].event;
      var alert_sender = JSONdataOW.alerts[i].sender_name;
      $('#alerts').append('<div class="alert"><div class="alert_event">'+alert_event+'</div>'+alert_text+'<div class="alert_sender">Start: '+alert_start_time+' <br/>Ende: '+alert_end_time+' <br/><br/>Quelle: '+alert_sender+'</div></div>')
    }
 }
    
  for(var i = 0; i < 1; i++){
    OW_tempmin = Math.round(JSONdataOW.daily[i].temp.min) + "°";
    OW_tempmax = Math.round(JSONdataOW.daily[i].temp.max) + "°";
    OW_condition = JSONdataOW.daily[i].weather[0].description;
    OW_condition_icon = JSONdataOW.daily[i].weather[0].icon;
    OW_percipation_prop = Math.round(JSONdataOW.daily[i].pop * 100);
    //Weekday
    var weekday = "Heute";

    //Append HTML
    $('#weather_forecast_week').append('<div class="dailyforecast_tile"><div class="forecast_inline_weekday">'+weekday+'</div><div class="forecast_inline_icon">' +
    '<div class="forecast_inline_icon_svg"><img class="weather_icon_7day" src="resources/OW_weathericons/'+OW_condition_icon+'.svg">' +
    '</div><div class="forecast_inline_icon_prob">'+ OW_percipation_prop + '%</div></div><div class="forecast_inline_condition">'+OW_condition+'</div>' + 
    '<div class="forecast_inline_minmax">'+OW_tempmin+' - '+OW_tempmax+'</div></div>')
  }
    for(var i = 1; i < Object(JSONdataOW.daily).length; i++){
        OW_tempmin = Math.round(JSONdataOW.daily[i].temp.min) + "°";
        OW_tempmax = Math.round(JSONdataOW.daily[i].temp.max) + "°";
        OW_condition = JSONdataOW.daily[i].weather[0].description;
        OW_condition_icon = JSONdataOW.daily[i].weather[0].icon;
        OW_percipation_prop = Math.round(JSONdataOW.daily[i].pop * 100);
        //Weekday
        var date = new Date(JSONdataOW.daily[i].dt * 1000);
        var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        var weekday = date.toLocaleDateString('de-DE', options).slice(0,2);

        //Append HTML
        $('#weather_forecast_week').append('<div class="dailyforecast_tile"><div class="forecast_inline_weekday">'+weekday+'</div><div class="forecast_inline_icon">' +
        '<div class="forecast_inline_icon_svg"><img class="weather_icon_7day" src="resources/OW_weathericons/'+OW_condition_icon+'.svg">' +
        '</div><div class="forecast_inline_icon_prob">' + OW_percipation_prop + '%</div></div><div class="forecast_inline_condition">'+OW_condition+'</div>' + 
        '<div class="forecast_inline_minmax">'+OW_tempmin+' - '+OW_tempmax+'</div></div>')
      }
}
 