var key = "775b9725cd124d28a2d44904210209";
var JSONdata = "";
function API_Call(){  
  var loc = document.getElementById("search_input").value;
  if (loc == ""){
    loc = "Linz"
  }
  var url = "http://api.weatherapi.com/v1/forecast.json?key="+ key +"&q="+ loc +"&days=4&lang=de&aqi=no&alerts=yes";
  

  $.ajax({
    url: url,
    //url: "data.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      JSONdata = data;         
      extractData();
      //console.log(data)
      $("#search").hide();
      $("#search").removeClass("search_active")
    },
    error: function(){
      console.log("Error")
    }
  });
}

var temp = "";
var village = "";
var timestamp = "";
var hightemp = "";
var lowtemp = "";
var hightemp = "";
var condition = "";
var lon = "";
var lat = "";

function extractData(){

  $("#weather_now").empty()
  $("#weather_forecast_scroll").empty(); 

  temp = Math.round(JSONdata.current.temp_c);
  village = JSONdata.location.name;
  timestamp = JSONdata.location.localtime;
  hightemp = Math.round(JSONdata.forecast.forecastday[0].day.maxtemp_c);
  lowtemp = Math.round(JSONdata.forecast.forecastday[0].day.mintemp_c);
  condition = JSONdata.current.condition.text;
  lon = JSONdata.location.lon;
  lat = JSONdata.location.lat;


  //Current Condition Icon
  var tile_icon_now = "";
  var is_day_now = JSONdata.current.is_day;
  if (is_day_now == 1){
    day_night_now = "day"
    tile_icon_now = JSONdata.current.condition.icon.slice(39,46)
  } else{
    day_night_now = "night"
    tile_icon_now = JSONdata.current.condition.icon.slice(41,48)
  }
  icon_path_now = "resources/weathericons/weather/64x64/"+day_night_now+"/"+tile_icon_now;

  $("#weather_now").append("<p class='weather_current_p'>"+village+"</p><h1 class='weather_current_h1'>"+temp+"°</h1><p class='weather_current_p'>"+condition+"</p><p class='weather_current_p'>H:"+hightemp+"°  T:"+lowtemp+"°</p>")
  $("#weather_forecast_scroll").append("<div class='forecast_tile'><p class='forecast_p'>Jetzt</p><img src='"+icon_path_now+"'><p class='forecast_p'>"+temp+"°</p></div>")

  // Log current time to count until 24 hours

  time_num_now = parseInt(timestamp.slice(11,13));

  //24 H forecast  
   
    var hours_counted_0 = 0;
    var day_night = ""
    var icon_path = ""
    var tile_icon = ""

    for (var e = time_num_now + 1; e < JSONdata.forecast.forecastday[0].hour.length; e++){
      
      //console.log(JSONdata.forecast.forecastday[0].hour[e].time)

      var tile_temperature = Math.round(JSONdata.forecast.forecastday[0].hour[e].temp_c);
      tile_icon = JSONdata.forecast.forecastday[0].hour[e].condition.icon.slice(39,46)      
      //console.log(tile_icon);
      //console.log(JSONdata.forecast.forecastday[0].hour[e])
     

      //ICON
      var is_day_at_hour = JSONdata.forecast.forecastday[0].hour[e].is_day
      if (is_day_at_hour == 1){
        day_night = "day"
        tile_icon = JSONdata.forecast.forecastday[0].hour[e].condition.icon.slice(39,46)
        } else{
          day_night = "night"
          tile_icon = JSONdata.forecast.forecastday[0].hour[e].condition.icon.slice(41,48)
        }
        icon_path = "resources/weathericons/weather/64x64/"+day_night+"/"+tile_icon; 
        hours_counted_0++;
        $("#weather_forecast_scroll").append("<div class='forecast_tile'><p class='forecast_p'>"+JSONdata.forecast.forecastday[0].hour[e].time.slice(11,16)+"</p><img src='"+icon_path+"'><p class='forecast_p'>"+tile_temperature+"°</p></div>")
      }

      if (hours_counted_0 < 24){
      var hours_counted_1 = 24 - hours_counted_0;
      
        for (var i = 0; i < hours_counted_1; i++){
          //console.log(JSONdata.forecast.forecastday[1].hour[i].time)
          //console.log(JSONdata.forecast.forecastday[1].hour[i])
          var tile_temperature_2 = Math.round(JSONdata.forecast.forecastday[1].hour[i].temp_c);
          //Current Condition Icon
          var is_day_at_hour_day2 = JSONdata.forecast.forecastday[1].hour[i].is_day

          if (is_day_at_hour_day2 == 1){
              day_night_2 = "day"
              tile_icon = JSONdata.forecast.forecastday[1].hour[i].condition.icon.slice(39,46)
            } else{
              day_night_2 = "night"
              tile_icon_2 = JSONdata.forecast.forecastday[1].hour[i].condition.icon.slice(41,48)
            }

          icon_path_day2 = "resources/weathericons/weather/64x64/"+day_night_2+"/"+tile_icon_2; 

          hours_counted_0++;
          $("#weather_forecast_scroll").append("<div class='forecast_tile'><p class='forecast_p'>"+JSONdata.forecast.forecastday[1].hour[i].time.slice(11,16)+"</p><img src='"+icon_path_day2+"'><p class='forecast_p'>"+tile_temperature_2+"°</p></div>")

          }
      }

      API_Call_OW();
}